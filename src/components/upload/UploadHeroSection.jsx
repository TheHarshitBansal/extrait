import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const UploadHeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      <div className="flex">
        <div className="relative p-[1px] rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x">
          <Badge
            variant={"secondary"}
            className="relative cursor-default px-6 py-2 text-base font-medium bg-white hover:bg-rose-100 rounded-full transition-colors duration-200"
          >
            <Sparkles className="min-h-6 min-w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">AI powered PDF insights</p>
          </Badge>
        </div>
      </div>
      <div className="capitalize text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Start Uploading{" "}
        <span className="relative inline-block py-2">
          <span className="relative z-10 px-2">your PDFs</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden={true}
          ></span>
        </span>
      </div>
      <div className="text-lg leading-8 text-gray-600 max-w-2xl text-center">
        <p>
          Drop your PDF here and watch Extrait work its magic—turning pages into
          powerful insights in seconds ✨
        </p>
      </div>
    </div>
  );
};

export default UploadHeroSection;
