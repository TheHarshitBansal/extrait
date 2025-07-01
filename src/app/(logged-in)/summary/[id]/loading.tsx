import BgGradient from "@/components/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/upload/LoadingSkeleton";
import { FileText } from "lucide-react";

const HeaderSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-8 w-32 rounded-full bg-white/80" />
        <Skeleton className="h-5 w-40 rounded-full bg-white/80" />
        <Skeleton className="h-12 w-full sm:w-3/4 rounded-full bg-white/80" />
      </div>
    </div>
  );
};

export default function Loading() {
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 flex flex-col gap-8">
        <HeaderSkeleton />

        <div className="relative overflow-hidden">
          <div className="relative p-6 sm:p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-3xl pointer-events-none" />

            <div className="absolute top-4 right-4 text-rose-300/20">
              <FileText className="h-4 w-4 text-rose-400" />
            </div>

            <div className="relative">
              <LoadingSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
