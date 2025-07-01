import { prompt } from "@/lib/prompt";
import { GoogleGenAI } from "@google/genai";
import { toast } from "sonner";

const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
})

export const generateAISummary = async (pdfText: string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            config:{
                temperature: 0.7,
            },
            contents: [
                {role: "user", parts: [{text: prompt}, {text:`Transform this document into engaging, easy-to-read summary with contextually relevanmt emojis and proper markdown formatting. Make sure to keep the summary concise and informative. Here is the document text: ${pdfText}`}]}
            ],
        })
        return response.text;
    } catch (error) {
        toast.error("Failed to generate AI summary. Please try again later.");
        console.error("Error generating AI summary:", error);
        throw Error("Failed to generate AI summary");
    }
}