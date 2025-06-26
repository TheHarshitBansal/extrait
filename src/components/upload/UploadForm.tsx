"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;

    //validate file type
    const result = fileSchema.safeParse({ file });

    if (!result.success) {
      console.log(
        result.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input type="file" id="file" name="file" accept="application/pdf" />
          <Button type="submit" className="cursor-pointer">
            Upload PDF
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
