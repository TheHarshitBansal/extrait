import UpgradeRequired from "@/components/common/UpgradeRequired";
import { hasActiveSubscription } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (!user?.id) {
    redirect("/sign-in");
  }
  const hasSubscribed = await hasActiveSubscription(
    user.emailAddresses[0].emailAddress
  );
  //todo: fix this logic
  if (hasSubscribed) {
    return <UpgradeRequired />;
  }
  return <>{children}</>;
};

export default Layout;
