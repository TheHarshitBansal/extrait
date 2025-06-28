'use server'

import { getDbConnection } from "@/utils/db";
import { revalidatePath } from "next/cache";

export const deleteSummary = async ({userId, summaryId}:{userId:string, summaryId:string}) => {
    const sql = await getDbConnection();
    try {
        const result = await sql`
            DELETE FROM pdf_summaries
            WHERE id = ${summaryId} AND user_id = ${userId}
            RETURNING *;
        `;

        if (result.length === 0) {
            throw new Error("Summary not found or already deleted.");
        }
        revalidatePath('/dashboard')
        return { success: true, message: "Summary deleted successfully." };
    } catch (error) {
        console.error("Error deleting summary:", error);
        return { success: false, message:  "Failed to delete summary." };
    }
}