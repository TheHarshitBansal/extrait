import { getDbConnection } from "@/utils/db"

export const getPriceIdForActiveUsers = async (email: string) => {
    const sql = await getDbConnection();
    const priceId = await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;
    return priceId?.[0]?.price_id || null;
}