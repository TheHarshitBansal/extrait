import { pricingPlans } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import React from "react";

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
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-extrabold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row gap-8 items-center lg:items-stretch">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({
  name,
  id,
  description,
  price,
  items,
  paymentLink,
}: PricingCardProps) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col gap-4 lg:gap-8 h-full z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base mt-2">{description}</p>
          </div>
        </div>
        <div className="flex gap-x-2">
          <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">INR</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-x-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>
        <div className="space-y-2 flex justify-center w-full">
          <a
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:bg-linear-to-l text-white border-2 py-2",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
            href={paymentLink}
            target="_blank"
          >
            Buy Now
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};
export default PricingSection;
