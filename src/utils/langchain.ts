import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const fetchAndExtractPdfText = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        return {
            success: false,
            message: "Failed to fetch PDF",
            data: null
        }
    }
    const pdfBlob = await response.blob();
    const arrayBuffer = await pdfBlob.arrayBuffer();

    const loader = new PDFLoader(new Blob([arrayBuffer]));
    const documents = await loader.load();

    return documents.map(doc => doc.pageContent).join("\n");
}