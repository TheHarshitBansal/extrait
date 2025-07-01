import {
  containerVariants,
  itemVariants,
  listVariant,
  pricingPlans,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import React from "react";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";
import { currentUser } from "@clerk/nextjs/server";
import { getPriceIdForActiveUsers, hasActiveSubscription } from "@/lib/user";
import Link from "next/link";

export type PricingCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const PricingSection = () => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden"
      id="pricing"
    >
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <MotionDiv
          variants={itemVariants}
          className="flex items-center justify-center w-full pb-12"
        >
          <h2 className="uppercase font-extrabold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </MotionDiv>
        <div className="relative flex justify-center flex-col lg:flex-row gap-8 items-center lg:items-stretch">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

const PricingCard = async ({
  name,
  id,
  description,
  price,
  items,
  paymentLink,
}: PricingCardProps) => {
  const user = await currentUser();
  const hasSubscribed = await hasActiveSubscription(
    user?.emailAddresses?.[0]?.emailAddress!
  );

  const priceId = await getPriceIdForActiveUsers(
    user?.emailAddresses?.[0]?.emailAddress!
  );

  const activePlanName = pricingPlans.find((plan) => plan.priceId === priceId);

  return (
    <MotionDiv
      variants={listVariant}
      whileHover={{ scale: 1.02 }}
      className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"
    >
      <div
        className={cn(
          "relative flex flex-col gap-4 lg:gap-8 h-full z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <MotionDiv
          variants={listVariant}
          className="flex justify-between items-center gap-4"
        >
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base mt-2">{description}</p>
          </div>
        </MotionDiv>
        <div className="flex gap-x-2">
          <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">INR</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <MotionDiv
          variants={listVariant}
          className="space-y-2.5 leading-relaxed text-base flex-1"
        >
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-x-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </MotionDiv>
        <div className="space-y-2 flex justify-center w-full">
          <Link
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:bg-linear-to-l text-white border-2 py-2",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
            href={
              hasSubscribed && activePlanName?.id === "pro"
                ? "/dashboard"
                : activePlanName?.id === "basic" && id === "basic"
                ? "/dashboard"
                : paymentLink
            }
            target={
              hasSubscribed && activePlanName?.id === "pro"
                ? "_self"
                : activePlanName?.id === "basic" && id === "basic"
                ? "_self"
                : "_blank"
            }
          >
            {hasSubscribed && activePlanName?.id === "pro"
              ? "Explore"
              : activePlanName?.id === "basic" && id === "basic"
              ? "Explore"
              : "Buy Now"}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </MotionDiv>
  );
};
export default PricingSection;
