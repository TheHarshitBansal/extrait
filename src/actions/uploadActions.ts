"use server";

import { getDbConnection } from "@/utils/db";
import { formatFileNameAsTitle } from "@/utils/formatUtils";
import { fetchAndExtractPdfText } from "@/utils/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const generatePdfSummary = async (file: [{
    serverData:{
        userId: string;
        file:{
            name: string;
            url: string;
        }
    }
}]) => {
    if(!file) {
        return {
            success: false,
            message: "File not found",
            data: null
        };
    }

    const { serverData: {
        userId, 
        file: { name, url }
    } } = file[0];

    if(!url){
        return {
            success: false,
            message: "File URL not found",
            data: null
        };
    }

    try {
        const pdfText = await fetchAndExtractPdfText(url);
        const title = formatFileNameAsTitle(name)
        if (!pdfText) {
            return {
                success: false,
                message: "Failed to extract text from PDF",
                data: null
            };
        }
        return {
            success: true,
            message: "PDF summary generated successfully",
            data: {
                pdfText,
                title,
            }
        }
        
    } catch (error) {
        console.error("Error generating PDF summary:", error);
        return {
            success: false,
            message: "Failed to generate PDF summary",
            data: null
        };
    }
}

const savePdfSummary = async ({userId, fileUrl, summary, title, fileName} : {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) => {
  try {
    const sql = await getDbConnection();
    const [inserted] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        file_name,
        summary_text,
        original_file_url,
        title
      ) VALUES (
        ${userId},
        ${fileName},
        ${summary},
        ${fileUrl},
        ${title}
      )
      RETURNING id
    `;

    return {
      success: true,
      message: "PDF summary saved successfully",
      data: {
        id: inserted.id,
      },
    };
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    return {
      success: false,
      message: "Failed to save PDF summary",
    };
  }
};

export const storePdfSummary = async ({
    fileName, 
    summary, 
    fileUrl, 
    title
}:{fileName: string, summary: string, fileUrl:string, title:string}) => {
    try {
        const {userId} = await auth();
        if(!userId) {
            return {
                success: false,
                message: "User not authenticated",
            };
        }
        const savedPdfSummary = await savePdfSummary({
            userId,
            fileName,
            summary,
            fileUrl,
            title,
        })
        if (savedPdfSummary) {
            revalidatePath(`/summaries/${savedPdfSummary.data?.id}`);
            return {
                success: true,
                message: "PDF summary stored successfully",
                data: {
                    id: savedPdfSummary.data?.id,
                    title: title,
                    fileName: fileName,
                    fileUrl: fileUrl,
                }
            };
        } else {
            return {
                success: false,
                message: "Failed to store PDF summary",
            };
        }
    } catch (error) {
        console.error("Error storing PDF summary : ", error);
        return {
            success: false,
            message: "Failed to store PDF summary",
        };
    }
}