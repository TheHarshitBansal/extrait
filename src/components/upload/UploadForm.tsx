"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { generatePdfSummary } from "@/actions/uploadActions";

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
  const { startUpload, isUploading } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (res && res.length > 0) {
        toast.success("PDF uploaded successfully!");
      } else {
        toast.error("Failed to upload PDF.");
      }
    },
    onUploadProgress: () => {
      toast("Uploading PDF...");
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

    toast.loading("Hang On! While our AI is processing your PDF 📄", {
      richColors: true,
    });

    const summary = await generatePdfSummary(response as any);
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input type="file" id="file" name="file" accept="application/pdf" />
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isUploading}
          >
            Upload PDF
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
