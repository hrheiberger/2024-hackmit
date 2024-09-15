import { query } from "./_generated/server";
import { v } from "convex/values";

// Return the array of company edges
export const getCompanyEdgesList = query({
  handler: async (ctx) => {
    const companiesEdgesDocuments = await ctx.db
      .query("companyEdges")
      .collect();
    const companyEdges = companiesEdgesDocuments.map((companyEdge) => {
      return {
        source: companyEdge.company1,
        target: companyEdge.company2,
      };
    });
    console.log(companyEdges);
    return companyEdges;
  },
});
