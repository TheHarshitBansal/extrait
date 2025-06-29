"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DownloadSummaryButton = ({
  title,
  summaryText,
  fileName,
  createdAt,
}: {
  title: string;
  summaryText: string;
  fileName: string;
  createdAt: string;
}) => {
  const handleDownload = () => {
    const summaryContent = `Title: ${title}\n\nSummary:\n${summaryText}\n\nCreated At: ${createdAt}`;
    const blob = new Blob([summaryContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName || "summary"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      size={"sm"}
      className="h-8 px-3 bg-rose-100 text-rose-600 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
      onClick={handleDownload}
    >
      <Download className="h-4 w-4 mr-1" />
      Download Summary
    </Button>
  );
};

export default DownloadSummaryButton;
