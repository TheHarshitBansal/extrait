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

export const containerVariants = {
  hidden: {opacity:0},
  visible:{
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  }
}

export const itemVariants:any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 15,
      duration: 0.8,
    }
  }
}

export const buttonVariants:any = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
  }
}

export const listVariant:any = {
  hidden: {opacity: 0, x: -20},
  visible: {opacity: 1, x: 0, transition:{
    type: 'spring',
    stiffness: 100,
    damping: 20,
  }}
}