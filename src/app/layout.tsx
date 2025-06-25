import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Extrait - AI-Powered PDF Summarization App",
  description:
    "Bored of reading long PDFs? Let Extrait summarize them for you! Extrait is an AI-powered PDF summarization app that helps you quickly understand the key points of any document. Upload your PDF, and Extrait will generate a concise summary, making it easier to digest complex information without the hassle of reading through entire documents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
