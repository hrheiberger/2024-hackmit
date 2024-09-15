import { mutation } from "./_generated/server";
import { v } from "convex/values";

// inserts node of company
export const createCompany = mutation({
  args: {
    name: v.string(),
    historical: v.array(v.number()),
    industry: v.string(),
    sector: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("companies", {
      name: args.name,
      historical: args.historical,
      industry: args.industry,
      sector: args.sector,
    });
    return "success";
  },
});

export const createUser = mutation({
  args: { username: v.string(), ticker: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("userHistory")
      .filter((q) => q.eq(q.field("username"), args.username))
      .take(1);
    if (users.length != 0) {
      const userId = users[0]._id;
      const tickers = users[0].tickers;
      await ctx.db.patch(userId, {
        tickers: [...tickers, args.ticker],
      });
    } else {
      await ctx.db.insert("userHistory", {
        username: args.username,
        tickers: [args.ticker],
      });
    }

    return "success";
  },
});

export const deleteTicker = mutation({
  args: { username: v.string(), ticker: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("userHistory")
      .filter((q) => q.eq(q.field("username"), args.username))
      .take(1);
    const userId = users[0]._id;
    const tickers = users[0].tickers;
    await ctx.db.patch(userId, {
      tickers: tickers.filter((element) => !element.includes(args.ticker)),
    });

    return "success";
  },
});
