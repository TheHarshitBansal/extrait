import { getDbConnection } from "@/utils/db"
import { pricingPlans } from "./constants";

export const getPriceIdForActiveUsers = async (email: string) => {
    const sql = await getDbConnection();
    const priceId = await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;
    return priceId?.[0]?.price_id || null;
}

export const hasReachedUploadLimit = async (userId: string, email:string) => {
    const sql = await getDbConnection();
    try {
        const uploadCount = await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;
        const count = uploadCount?.[0]?.count || 0;
        const priceId = await getPriceIdForActiveUsers(email); 
        const userPlan = pricingPlans.find(plan => plan.priceId === priceId);
        const uploadLimit:number = userPlan?.id === "pro" ? 1000 : userPlan?.id === 'basic' ? 5 : 0;
        return {hasReachedLimit: count >= uploadLimit, uploadCount: count, uploadLimit};
    } catch (error) {
        console.error("Error fetching upload count:", error);
        throw new Error("Failed to fetch upload count");
    }
}

export const hasActiveSubscription = async (email: string) => {
    const sql = await getDbConnection();
    try {
        const subscription = await sql`SELECT status FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL`;
        return subscription.length > 0;
    } catch (error) {
        console.error("Error checking active subscription:", error);
        throw new Error("Failed to check active subscription");
    }
}