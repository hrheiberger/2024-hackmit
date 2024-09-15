import { query } from "./_generated/server";
import { v } from "convex/values";

// Return the array of company names
export const getCompanyList = query({
  handler: async (ctx) => {
    const user = (await ctx.auth.getUserIdentity())?.name;
    const companiesDocuments = await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("user"), user))
      .collect();
    const companyNames = companiesDocuments.map((companyDocument) => {
      return {
        id: companyDocument.name,
        name: companyDocument.name,
        sector: companyDocument.sector,
        industry: companyDocument.industry,
        group: companyDocument.group,
        price: companyDocument.price,
        company: companyDocument.company,
      };
    });
    return companyNames;
  },
});

export const getCompanyListData = query({
  handler: async (ctx) => {
    const user = (await ctx.auth.getUserIdentity())?.name;
    const companiesDocuments = await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("user"), user))
      .collect();
    const companyNames = companiesDocuments.map((companyDocument) => {
      return {
        id: companyDocument.name,
        historical: companyDocument.historical,
        group: companyDocument.group,
      };
    });
    return companyNames;
  },
});

export const getCompany = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity())?.name;
    const companiesDocuments = await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("name"), args.name))
      .filter((q) => q.eq(q.field("user"), user))
      .take(1);
    const companyName = companiesDocuments.map((companyDocument) => {
      return {
        id: companyDocument.name,
      };
    });
    console.log(companyName);
    return companyName[0];
  },
});
