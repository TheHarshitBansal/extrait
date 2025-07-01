"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { generatePdfSummary, storePdfSummary } from "@/actions/uploadActions";
import { Loader2 } from "lucide-react";
import { generateAISummary } from "@/utils/gemini-ai";
import { redirect } from "next/navigation";
import { MotionDiv } from "../common/motion-wrapper";
import { Separator } from "../ui/separator";
import LoadingSkeleton from "./LoadingSkeleton";
import { deleteFiles } from "@/actions/summaryActions";

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

const UploadForm = ({ hasReachedLimit }: { hasReachedLimit: boolean }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const { startUpload, isUploading } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      toast.dismiss("uploading-pdf");
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
    setIsLoading(true);
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
    let savedSummary;
    const summary = await generatePdfSummary(response as any);
    if (summary?.success) {
      formRef.current?.reset();
    }
    const AISummary = await generateAISummary(
      summary?.data?.pdfText?.toString() || ""
    );
    if (AISummary && summary?.data) {
      savedSummary = await storePdfSummary({
        summary: AISummary,
        title: summary.data?.title,
        fileName: file.name,
        fileUrl: response[0].ufsUrl,
        fileKey: response[0].key,
      });
      if (!AISummary) {
        toast.dismiss("analyzing-pdf");
        await deleteFiles({ fileKey: response[0].key });
        toast.error("Failed to generate AI summary. Please try again later.");
      } else {
        toast.dismiss("analyzing-pdf");
        toast.success("AI summary generated successfully!");
        redirect(`/summary/${response[0].key}`);
      }
    } else {
      toast.dismiss("analyzing-pdf");
      await deleteFiles({ fileKey: response[0].key });
      toast.error("Failed to generate AI summary. Please try again later.");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center justify-center gap-x-2 mt-2 text-center w-full overflow-hidden"
      >
        <Separator className="w-full bg-gray-400/20" />
        <span className="text-nowrap text-gray-500 font-semibold text-[12px]">
          Upload PDF
        </span>
        <Separator className="w-full bg-gray-400/20" />
      </MotionDiv>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-end items-center gap-1.5"
        >
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            disabled={isUploading || hasReachedLimit || isLoading}
            className={`${
              isUploading || isLoading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          />
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isUploading || hasReachedLimit || isLoading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Upload PDF"
            )}
          </Button>
        </MotionDiv>
        {isLoading && <LoadingSkeleton />}
      </form>
    </div>
  );
};

export default UploadForm;
