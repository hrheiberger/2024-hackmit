import { query } from "./_generated/server";
import { v } from "convex/values";

// Return the array of company edges
export const getCompanyEdgesList = query({
  handler: async (ctx) => {
    const user = (await ctx.auth.getUserIdentity())?.name;
    const companiesEdgesDocuments = await ctx.db
      .query("companyEdges")
      .filter((q) => q.eq(q.field("user"), user))
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
