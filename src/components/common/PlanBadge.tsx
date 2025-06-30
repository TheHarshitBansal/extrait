import { pricingPlans } from "@/lib/constants";
import { getPriceIdForActiveUsers } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

const PlanBadge = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const priceId = await getPriceIdForActiveUsers(
    user?.emailAddresses?.[0]?.emailAddress
  );
  let planName = "Buy a Plan";
  let plan = pricingPlans.find((plan) => plan.priceId === priceId)!;
  if (plan) {
    planName = plan.name;
  }

  return (
    <Badge
      variant={"outline"}
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to amber-200 border border-amber-300 hidden lg:flex items-center",
        !priceId && "bg-linear-to-r from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-600",
          !priceId && "text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
};

export default PlanBadge;
