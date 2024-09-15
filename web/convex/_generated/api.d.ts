/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
<<<<<<< HEAD
=======
import type * as getCompanies from "../getCompanies.js";
import type * as getCompanyEdges from "../getCompanyEdges.js";
import type * as insertEdge from "../insertEdge.js";
import type * as insertNode from "../insertNode.js";
import type * as insertNodeApi from "../insertNodeApi.js";
import type * as myFunctions from "../myFunctions.js";
>>>>>>> 3bf7124bd6d2fc4d1c34ef4a01c4bcc19defc184
import type * as YahooFinanceParser from "../YahooFinanceParser.js";
import type * as myFunctions from "../myFunctions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
<<<<<<< HEAD
=======
  getCompanies: typeof getCompanies;
  getCompanyEdges: typeof getCompanyEdges;
  insertEdge: typeof insertEdge;
  insertNode: typeof insertNode;
  insertNodeApi: typeof insertNodeApi;
  myFunctions: typeof myFunctions;
>>>>>>> 3bf7124bd6d2fc4d1c34ef4a01c4bcc19defc184
  YahooFinanceParser: typeof YahooFinanceParser;
  myFunctions: typeof myFunctions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
