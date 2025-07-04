import { getDbConnection } from "@/utils/db"

export const getSummaries = async (userId: string) => {
    const sql = await getDbConnection();
    const summaries = await sql`
        SELECT * FROM pdf_summaries
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
    `;
    return summaries;
}