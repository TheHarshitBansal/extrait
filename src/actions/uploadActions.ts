"use server";

import { fetchAndExtractPdfText } from "@/utils/langchain";

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
    } catch (error) {
        console.error("Error generating PDF summary:", error);
        return {
            success: false,
            message: "Failed to generate PDF summary",
            data: null
        };
    }
}