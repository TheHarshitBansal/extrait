import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req:NextRequest) => {
    const payload = await req.text();
    
    const signature = req.headers.get('stripe-signature');
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
        
        switch (event.type) {
            case 'checkout.session.completed':
                const sessionId = event.data.object.id;
                const session = await stripe.checkout.sessions.retrieve(sessionId, {
                    expand: ['line_items']
                });
                await handleCheckoutSessionCompleted({session});
                break;
            case 'customer.subscription.deleted':
                const subscriptionId = event.data.object.id;
                await handleSubscriptionDeleted({subscriptionId, stripe});
                break;
            default:
                console.warn(`Unhandled event type: ${event.type}`);
                return NextResponse.json({ message: "Event type not handled" }, { status: 200 });
        }
    } catch (err) {
        console.error(`Webhook Error: ${err}`);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    return NextResponse.json({
        success: true,
    });
}