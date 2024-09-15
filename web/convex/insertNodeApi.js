/* eslint-disable @typescript-eslint/no-var-requires */
"use node";

import { action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import yahooFinance from "yahoo-finance2";
import { startOfWeek } from "date-fns";

async function getHistoricalData(ticker) {
  const company = await yahooFinance.quoteSummary(ticker, {
    modules: ["assetProfile", "price"],
  });
  console.log(company);
  const startDate = startOfWeek(new Date("2022-01-01T00:00:00-04:00"), {
    weekStartsOn: 1,
  });
  const history = (
    await yahooFinance.chart(ticker, {
      period1: startDate,
      interval: "1wk",
    })
  ).quotes;

  const closes = [];
  for (const entry of history) {
    closes.push(entry.close ?? 0);
  }
  return {
    ticker: ticker,
    closes: closes,
    industry: company.assetProfile.industry,
    sector: company.assetProfile.sector,
    price: company.price.regularMarketPrice,
    company: company.price.shortName,
  };
}

function getStockCorrelation(x, y, timePeriod) {
  /**
   * Finds the correlation of two stocks
   * Use SPY or S&P 500 Equal weight index for stock y if you want to find beta
   * Average correlation between two stocks is 0.3
   */
  let sigma1 = 0;
  let meanX = 0;
  let meanY = 0;

  for (let i = 0; i < timePeriod; i++) {
    meanX += x[i];
    meanY += y[i];
  }

  meanX = meanX / timePeriod;
  meanY = meanY / timePeriod;

  let sigma2 = 0;
  let sigma3 = 0;

  for (let i = 0; i < timePeriod; i++) {
    sigma1 += (x[i] - meanX) * (y[i] - meanY);
    sigma2 += Math.pow(x[i] - meanX, 2);
    sigma3 += Math.pow(y[i] - meanY, 2);
  }

  return sigma1 / Math.sqrt(sigma2 * sigma3);
}

export const insertNode = action({
  args: { ticker: v.string() },
  handler: async (ctx, args) => {
    const companiesData = await ctx.runQuery(
      internal.getCompanies.getCompanyListData
    );

    const data = await getHistoricalData(args.ticker);

    // const companies = await ctx.runQuery(internal.getCompanies.getCompany, {
    //   name: "bro",
    // });

    let companyAdded = false;
    for (const companyData of companiesData) {
      const correlation = getStockCorrelation(
        companyData.historical,
        data.closes,
        100
      );
      if (correlation > 0.7 || correlation < -0.3) {
        if (!companyAdded) {
          await ctx.runMutation(internal.insertNode.createCompany, {
            name: args.ticker,
            historical: data.closes,
            industry: data.industry,
            sector: data.sector,
            group: companyData.group,
            price: data.price,
            company: data.company,
          });
          companyAdded = true;
        }
        await ctx.runMutation(internal.insertEdge.createCompanyEdge, {
          company1: args.ticker,
          company2: companyData.id,
          correlation: correlation,
        });
      }
    }
    if (!companyAdded) {
      await ctx.runMutation(internal.insertNode.createCompany, {
        name: args.ticker,
        historical: data.closes,
        industry: data.industry,
        sector: data.sector,
        group: "none",
        price: data.price,
        company: data.company,
      });
    }
  },
});
