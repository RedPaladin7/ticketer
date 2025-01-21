'use server'

import { stripe } from "@/lib/stripe"
import { log } from "console"

// used when the user wants to login to his profile

export async function createStripeConnectLoginLink(stripeAccountId: string){
    if(!stripeAccountId){
        throw new Error('No stripe account id provided')
    }

    try {
        const loginLink = await stripe.accounts.createLoginLink(stripeAccountId)
        return loginLink.url
    } catch (error) {
        console.error('Error creatiug Stripe connect login link: ', error)
        throw new Error('Failed to create stripe connect login link')        
    }
}