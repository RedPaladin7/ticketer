import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUsersStripeConnectId = query({
  args: {userId: v.string()},
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter((q)=>q.eq('userId', args.userId))
      .filter((q)=>q.neq('stripeConnectId', undefined))
      .first()
    return user?.stripeConnectId      
  }
})

export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();
    return user;
  },
});

export const updateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { userId, name, email }) => {
    // checking if the user exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      // update the existing user
      await ctx.db.patch(existingUser._id, {
        name,
        email,
      });
      return existingUser._id;
    }

    // creating a new user
    const newUserId = await ctx.db.insert("users", {
      userId,
      name,
      email,
      stripeConnectId: undefined,
    });
    return newUserId;
  },
});

export const updateOrCreateUserStripeConnectId = mutation({
  args: {userId: v.string(),
    stripeConnectId: v.string()
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_user_id', (q)=>q.eq('userId', args.userId))
      .first()

    if(!user){
      throw new Error('User not found')
    }
    await ctx.db.patch(user._id, {stripeConnectId: args.stripeConnectId})
  }
})
