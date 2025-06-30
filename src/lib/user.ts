import { getDbConnection } from "@/utils/db"
import { pricingPlans } from "./constants";

export const getPriceIdForActiveUsers = async (email: string) => {
    const sql = await getDbConnection();
    const priceId = await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;
    return priceId?.[0]?.price_id || null;
}

export const hasReachedUploadLimit = async (userId: string) => {
    const sql = await getDbConnection();
    try {
        const uploadCount = await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;
        const count = uploadCount?.[0]?.count || 0;
        const priceId = await getPriceIdForActiveUsers(userId);
        const userPlan = pricingPlans.find(plan => plan.priceId === priceId);
        const uploadLimit:number = userPlan?.name === "Pro" ? 1000 : userPlan?.name === 'Basic' ? 5 : 0;
        return {hasReachedLimit: count >= uploadLimit, uploadCount: count, uploadLimit};
    } catch (error) {
        console.error("Error fetching upload count:", error);
        throw new Error("Failed to fetch upload count");
    }
}