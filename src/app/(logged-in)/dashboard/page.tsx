import BgGradient from "@/components/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import EmptySummary from "@/components/summaries/EmptySummary";
import SummaryCard from "@/components/summaries/SummaryCard";
import { Button } from "@/components/ui/button";
import { itemVariants } from "@/lib/constants";
import { getSummaries } from "@/lib/summaries";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await currentUser();
  if (!user?.id) {
    return redirect("/sign-in");
  }
  const summaries = await getSummaries(user.id as string);
  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(
    user.id as string,
    user.emailAddresses[0].emailAddress
  );

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex flex-col gap-y-4"
      >
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <MotionH1
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"
              >
                Your Summaries
              </MotionH1>
              <MotionP
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-gray-600"
              >
                You can view and manage your extracted summaries here.
              </MotionP>
            </div>
            <MotionDiv
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              className="self-start"
            >
              <Button
                className="relative p-0 h-full w-fit bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300"
                disabled={hasReachedLimit}
              >
                <Link
                  href={"/upload"}
                  className="flex items-center h-full w-full px-4 py-2"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  New Summary
                </Link>
              </Button>
            </MotionDiv>
          </div>
          {hasReachedLimit && (
            <MotionDiv
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
                <p className="text-sm inline items-center gap-x-1">
                  You've reached the limit of {uploadLimit} uploads on the{" "}
                  {uploadLimit === 5 ? "Basic" : "Free"} plan.
                  <Link
                    href={"/#pricing"}
                    className="inline-flex items-center font-semibold"
                  >
                    Upgrade to Pro <ExternalLink className="h-4 w-4 mx-1" />
                  </Link>
                  for unlimited uploads.
                </p>
              </div>
            </MotionDiv>
          )}
          {summaries.length === 0 ? (
            <EmptySummary />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </MotionDiv>
    </main>
  );
};

export default page;
