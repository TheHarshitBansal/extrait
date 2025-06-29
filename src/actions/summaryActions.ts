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

export const getSummary = async ({userId, summaryId}:{userId:string, summaryId:string}) => {
    const sql = await getDbConnection();
    try {
        const summary = await sql`
            SELECT * FROM pdf_summaries
            WHERE user_id = ${userId} AND id = ${summaryId}
        `;
        return {
            success: true,
            summary: summary.length > 0 ? summary[0] : null,
            message: summary.length > 0 ? "Summary fetched successfully." : "No summary found."
        }
    } catch (error) {
        console.error("Error fetching summaries:", error);
        return { success: false, message: "Failed to fetch summaries." };
    }
}

export const getWordCount = async ({user_id, summary_id}:{user_id:string, summary_id:string}) => {
   const sql = await getDbConnection();
    try {
        const result = await sql`
            SELECT LENGTH(summary_text)-LENGTH(REPLACE(summary_text, ' ', ''))+1 as word_count
            FROM pdf_summaries
            WHERE user_id = ${user_id} AND id = ${summary_id}
        `;
        return result[0].word_count;
    } catch (error) {
        console.error("Error counting words:", error);
        return 0;  
    }
}