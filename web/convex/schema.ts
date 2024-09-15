// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    documents: defineTable({
      fieldOne: v.string(),
      fieldTwo: v.object({
        subFieldOne: v.array(v.number()),
      }),
    }),
    // This definition matches the example query and mutation code:
    numbers: defineTable({
      value: v.number(),
    }),

    companies: defineTable({
      user: v.string(),
      name: v.string(),
      historical: v.array(v.number()),
      industry: v.string(),
      sector: v.string(),
      group: v.string(),
    }),

    companyEdges: defineTable({
      user: v.string(),
      company1: v.string(),
      company2: v.string(),
      correlation: v.number(),
    }),

    userHistory: defineTable({
      username: v.string(),
      tickers: v.array(v.string()),
    }),
  },
  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!
  { schemaValidation: true }
);
