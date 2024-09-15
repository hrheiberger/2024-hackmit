import { query } from "./_generated/server";
import { v } from "convex/values";

// Return the array of company names
export const getCompanyList = query({
  handler: async (ctx) => {
    const companiesDocuments = await ctx.db.query("companies").collect();
    const companyNames = companiesDocuments.map((companyDocument) => {
      return {
        id: companyDocument.name,
      };
    });
    return companyNames;
  },
});

export const getCompanyListData = query({
  handler: async (ctx) => {
    const companiesDocuments = await ctx.db.query("companies").collect();
    const companyNames = companiesDocuments.map((companyDocument) => {
      return {
        id: companyDocument.name,
        historical: companyDocument.historical,
      };
    });
    return companyNames;
  },
});

export const getCompany = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const companiesDocuments = await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("name"), args.name))
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
