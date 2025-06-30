import { PricingCardProps } from "@/components/home/PricingSection";

export const pricingPlans: PricingCardProps[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for occasional users",
    price: 99,
    items: ["5 PDFs per month", "Basic processing", "Email support"],
    paymentLink: "https://buy.stripe.com/test_bJebJ39gZ6RT9Lf8Es28800",
    priceId: "price_1RfJvNRwGbSKS9AkKs7xUPNx",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Ideal for professionals or teams",
    price: 499,
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown export",
    ],
    paymentLink: "https://buy.stripe.com/test_4gM8wR1Oxfop4qV7Ao28801",
    priceId: "price_1RfJyZRwGbSKS9AkMnxvDxav",
  },
];
