import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/lib/constants";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/motion-wrapper";
import { hasActiveSubscription } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";

const HeroSection = async () => {
  const user = await currentUser();
  const hasSubscribed = await hasActiveSubscription(
    user?.emailAddresses?.[0]?.emailAddress!
  );
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl"
    >
      <MotionDiv variants={itemVariants} className="flex">
        <div className="relative p-[1px] rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x">
          <Badge
            variant={"secondary"}
            className="relative cursor-default px-6 py-2 text-base font-medium bg-white hover:bg-rose-100 rounded-full transition-colors duration-200"
          >
            <Sparkles className="min-h-6 min-w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </div>
      </MotionDiv>
      <MotionH1 variants={itemVariants} className="font-bold py-6 text-center">
        Get{" "}
        <span className="relative inline-block py-2">
          <MotionSpan
            whileHover={buttonVariants}
            className="relative z-10 px-2"
          >
            Insights
          </MotionSpan>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden={true}
          ></span>
        </span>{" "}
        from your PDFs Instantly
      </MotionH1>
      <MotionH2
        variants={itemVariants}
        className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600"
      >
        Generate clear, concise summaries of any document within seconds.
      </MotionH2>
      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
        <button className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:bg-linear-to-l transition-all duration-300 hover:no-underline font-bold shadow-lg">
          <Link
            href={hasSubscribed ? "/upload" : "/#pricing"}
            className="flex gap-2 items-center px-4 py-2 sm:px-8 sm:py-3 lg:px-12 lg:py-4"
          >
            <span>Try Extrait</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </button>
      </MotionDiv>
    </MotionSection>
  );
};

export default HeroSection;
