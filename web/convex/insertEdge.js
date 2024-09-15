import { mutation } from "./_generated/server";
import { v } from "convex/values";

// inserts edge of company to company
export const createCompanyEdge = mutation({
  args: { company1: v.string(), company2: v.string() },
  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity())?.name;
    await ctx.db.insert("companyEdges", {
      user: user,
      company1: args.company1,
      company2: args.company2,
    });
    return "success";
  },
});
