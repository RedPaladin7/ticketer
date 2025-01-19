import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// using id for event and string for user because we are querying the tickets table

export const getUserTicketForEvent = query({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
  },
  handler: async (ctx, { eventId, userId }) => {
    const ticket = await ctx.db
      .query("tickets")
      .withIndex("by_user_event", (q) =>
        q.eq("userId", userId).eq("eventId", eventId),
      )
      .first();
    return ticket;
  },
});
