"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { generatePdfSummary } from "@/actions/uploadActions";
import { Loader2 } from "lucide-react";
import { generateAISummary } from "@/utils/gemini-ai";

const fileSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Please upload a valid PDF file.",
    })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024, //  20 MB limit
      "File size must be less than 20 MB."
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "Only PDF files are allowed."
    ),
});

const UploadForm = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { startUpload, isUploading } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      toast.dismiss("uploading-pdf");
      if (res && res.length > 0) {
        toast.success("PDF uploaded successfully!");
      } else {
        toast.error("Failed to upload PDF.");
      }
    },
    onUploadBegin: () => {
      toast.loading("Uploading PDF...", {
        id: "uploading-pdf",
      });
    },
    onUploadError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;

    //validate file type
    const result = fileSchema.safeParse({ file });

    if (!result.success) {
      toast.error(
        result.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }

    const response = await startUpload([file]);
    if (!response || response.length === 0) {
      toast.error("Failed to upload PDF.");
      return;
    }

    toast.loading("📄 Analyzing PDF...", {
      id: "analyzing-pdf",
      description: "Hang On! Extrait AI is doing its magic for you ✨",
    });

    const summary = await generatePdfSummary(response as any);
    if (summary?.success) {
      toast.success("PDF summary generated successfully!");
      formRef.current?.reset();
      const AISummary = await generateAISummary(
        summary?.data?.pdfText?.toString() || ""
      );
      if (!AISummary) {
        toast.error("Failed to generate AI summary. Please try again later.");
      } else {
        toast.dismiss("analyzing-pdf");
        toast.success("AI summary generated successfully!");
      }
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="flex justify-end items-center gap-1.5">
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            disabled={isUploading}
            className={`${
              isUploading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          />
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Upload PDF"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
