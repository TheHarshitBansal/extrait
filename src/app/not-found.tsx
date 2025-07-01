import React from "react";
import BgGradient from "../components/common/bg-gradient";
import { Ghost, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BgGradient className="from-rose-300 via-rose-200 to-orange-200" />

      <div className="absolute -top-40 -left-20 h-[500px] w-[500px] bg-rose-200 rounded-full filter blur-[160px] opacity-30 pointer-events-none" />
      <div className="absolute -bottom-32 -right-10 h-[400px] w-[400px] bg-orange-100 rounded-full filter blur-[120px] opacity-25 pointer-events-none" />

      <div className="container px-6 py-24 relative z-10">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-rose-500 animate-pulse">
            <Ghost className="w-6 h-6" />
            <span className="text-base font-bold uppercase tracking-wider">
              404 - Not Found
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text drop-shadow-md">
            This page vanished into thin air...
          </h1>

          <p className="text-lg leading-8 text-gray-600 bg-white/50 border border-rose-100 rounded-xl p-6 backdrop-blur-md shadow-md">
            Sorry, we couldn't find what you were looking for. It might have
            been moved or deleted.
          </p>

          <Button
            asChild
            className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white shadow-lg"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
