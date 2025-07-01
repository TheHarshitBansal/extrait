import BgGradient from "@/components/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { itemVariants } from "@/lib/constants";

function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex flex-col gap-2">
        <MotionH1
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
        >
          <Skeleton className="h-10 w-48 bg-rose-500/20" />
        </MotionH1>
        <MotionP variants={itemVariants} initial="hidden" animate="visible">
          <Skeleton className="h-6 w-72 sm:w-96 bg-rose-500/20" />
        </MotionP>
      </div>
      <MotionDiv
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="self-start"
      >
        <Skeleton className="h-10 w-32 bg-rose-500/20" />
      </MotionDiv>
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="rounded-lg shadow-sm"
    >
      <Skeleton className="h-48 w-full rounded-lg bg-rose-500/20" />
    </MotionDiv>
  );
}

export default function LoadingSummaries() {
  return (
    <div className="min-h-screen relative">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="px-4 sm:px-8 py-12 sm:py-24 max-w-7xl mx-auto">
        <section className="flex flex-col gap-4">
          <HeaderSkeleton />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <SummaryCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
