import type { Metadata } from "next";
import { Lato as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], // Removed 100
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
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased grainy`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster visibleToasts={1} richColors={true} position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
