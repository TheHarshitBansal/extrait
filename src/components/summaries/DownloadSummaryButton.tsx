"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { marked } from "marked";
// @ts-ignore
import html2pdf from "html2pdf.js";

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
    const mdContent = `# ${title}\n\n${summaryText}\n\n**Created At:** ${createdAt}`;
    const htmlContent = marked(mdContent);

    // Wrapper element
    const element = document.createElement("div");
    element.innerHTML = htmlContent as string;
    element.style.minHeight = "100vh";
    element.style.width = "100%";
    element.style.padding = "2rem";
    element.style.boxSizing = "border-box";
    element.style.backgroundColor = "#fff1f2"; // rose-50
    element.style.fontFamily = "sans-serif";
    element.style.color = "#881337";
    element.style.overflow = "hidden";
    element.style.position = "relative";
    element.style.backgroundImage = `
    repeating-linear-gradient(
      45deg,
      rgba(252, 165, 175, 0.15) 0px,
      rgba(252, 165, 175, 0.15) 200px,
      transparent 200px,
      transparent 400px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(252, 165, 175, 0.15) 0px,
      rgba(252, 165, 175, 0.15) 200px,
      transparent 200px,
      transparent 400px
    )
  `;

    // Create watermark
    const watermark = document.createElement("div");
    watermark.innerText = "Extrait AI";
    watermark.style.position = "absolute";
    watermark.style.top = "50%";
    watermark.style.left = "50%";
    watermark.style.transform = "translate(-50%, -50%) rotate(-30deg)";
    watermark.style.fontSize = "5rem";
    watermark.style.color = "#fb7185"; // rose-400
    watermark.style.opacity = "0.2";
    watermark.style.pointerEvents = "none";
    watermark.style.zIndex = "0";
    watermark.style.userSelect = "none";
    watermark.style.whiteSpace = "nowrap";
    watermark.style.fontWeight = "bold";
    watermark.style.textShadow = "1px 1px 2px #f43f5e";
    element.appendChild(watermark);

    // Custom styles
    const style = document.createElement("style");
    style.innerHTML = `
    * {
      box-sizing: border-box;
      max-width: 100%;
      word-wrap: break-word;
    }

    h1 {
      font-size: 1.5rem;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      color: #be123c;
      border-bottom: 2px solid #f43f5e;
      padding-bottom: 0.2rem;
    }

    h2 {
      font-size: 1.25rem;
      margin-top: 1.25rem;
      margin-bottom: 0.4rem;
      color: #be123c;
    }

    p {
      margin-bottom: 1rem;
      font-size: 0.95rem;
      line-height: 1.6;
    }

    strong {
      color: #9f1239;
    }

    ul {
      margin-left: 1.5rem;
      list-style-type: disc;
    }

    code {
      background-color: #fecdd3;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.85rem;
      display: inline-block;
      margin: 2px 0;
    }

    blockquote {
      border-left: 4px solid #f43f5e;
      padding-left: 1rem;
      color: #7f1d1d;
      margin: 1rem 0;
      font-style: italic;
    }
  `;
    element.prepend(style);

    html2pdf()
      .from(element)
      .set({
        margin: [0, 0, 0, 0], // Use full page
        filename: `${fileName || "summary.pdc"}`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .save();
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
