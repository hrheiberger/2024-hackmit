import { mutation } from "./_generated/server";
import { v } from "convex/values";

// inserts node of company
export const createCompany = mutation({
  args: {
    name: v.string(),
    historical: v.array(v.number()),
    industry: v.string(),
    sector: v.string(),
    group: v.string(),
  },
  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity())?.name;
    if (args.group == "none") {
      await ctx.db.insert("companies", {
        user: user,
        name: args.name,
        historical: args.historical,
        industry: args.industry,
        sector: args.sector,
        group: args.name,
      });
    } else {
      await ctx.db.insert("companies", {
        user: user,
        name: args.name,
        historical: args.historical,
        industry: args.industry,
        sector: args.sector,
        group: args.group,
      });
    }

    return "success";
  },
});

export const createUser = mutation({
  args: { ticker: v.string() },
  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity())?.name;
    const users = await ctx.db
      .query("userHistory")
      .filter((q) => q.eq(q.field("username"), user))
      .take(1);
    if (users.length != 0) {
      const userId = users[0]._id;
      const tickers = users[0].tickers;
      await ctx.db.patch(userId, {
        tickers: [...tickers, args.ticker],
      });
    } else {
      await ctx.db.insert("userHistory", {
        username: user,
        tickers: [args.ticker],
      });
    }

    return "success";
  },
});

export const deleteTicker = mutation({
  args: { ticker: v.string() },
  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity())?.name;
    const users = await ctx.db
      .query("userHistory")
      .filter((q) => q.eq(q.field("username"), user))
      .take(1);
    const companies = await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("user"), user))
      .filter((q) => q.eq(q.field("name"), args.ticker))
      .collect();
    for (const company of companies) {
      const id = company._id;
      await ctx.db.delete(id);
    }
    const companyEdges = await ctx.db
      .query("companyEdges")
      .filter((q) => q.eq(q.field("user"), user))
      .filter((q) =>
        q.or(
          q.eq(q.field("company1"), args.ticker),
          q.eq(q.field("company2"), args.ticker)
        )
      )
      .collect();
    for (const companyEdge of companyEdges) {
      const id = companyEdge._id;
      await ctx.db.delete(id);
    }
    const userId = users[0]._id;
    const tickers = users[0].tickers;
    await ctx.db.patch(userId, {
      tickers: tickers.filter((element) => !element.includes(args.ticker)),
    });

    return "success";
  },
});
