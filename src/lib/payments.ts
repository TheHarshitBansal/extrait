import { getDbConnection } from "@/utils/db";
import Stripe from "stripe";

export const handleCheckoutSessionCompleted = async ({session}:{session: Stripe.Checkout.Session}) => {
    const sql = await getDbConnection();
    await createOrUpdateUser({session, sql});
    await createPayment({session, sql});
}

const createOrUpdateUser = async ({session, sql}:{session: Stripe.Checkout.Session, sql:any}) => {
    try {
        const user = await sql`SELECT * FROM users WHERE email = ${session.customer_details?.email}`;
        if(user.length === 0){
            await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${session.customer_details?.email}, ${session.customer_details?.name}, ${session.customer}, ${session.line_items?.data[0].price?.id}, 'active')`;
        }
        else{
            await sql`UPDATE users SET status = 'active', price_id = ${session?.line_items?.data[0]?.price?.id} WHERE email = ${session.customer_details?.email}`;
        }
    } catch (error) {
        console.error("Error creating or updating user:", error);
        throw new Error("Database operation failed");
    }
}

const createPayment = async ({session, sql}:{session: Stripe.Checkout.Session, sql:any}) => {
    try {
        const payment = await sql`INSERT INTO payments (user_email, amount, stripe_payment_id, status, price_id) VALUES (${session.customer_details?.email}, ${session.amount_total}, ${session.id}, ${session.status}, ${session.line_items?.data[0].price?.id})`;
    } catch (error) {
        console.error("Error creating payment:", error);
        throw new Error("Database operation failed");
    }
}

export const handleSubscriptionDeleted = async ({subscriptionId, stripe}:{subscriptionId: string, stripe: Stripe}) => {
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const sql = await getDbConnection();
        await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
        console.log("User subscription status updated to cancelled:");
        
    } catch (error) {
        console.error("Error handling subscription deletion:", error);
        throw new Error("Database operation failed while handling subscription deletion" + error);
    }
}