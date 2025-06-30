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
    <div className="flex gap-4 mb-8 justify-between">
      <div className="flex flex-col gap-2">
        <MotionH1
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
        >
          <Skeleton className="h-10 w-48 bg-rose-500/20" />
        </MotionH1>
        <MotionP variants={itemVariants} initial="hidden" animate="visible">
          <Skeleton className="h-6 w-96 bg-rose-500/20" />
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
      <section className="container px-10 py-24 mx-auto flex flex-col gap-4">
        <HeaderSkeleton />
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {Array.from({ length: 3 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
