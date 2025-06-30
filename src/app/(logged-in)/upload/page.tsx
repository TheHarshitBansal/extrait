import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import UploadForm from "@/components/upload/UploadForm";
import UploadHeroSection from "@/components/upload/UploadHeroSection";
import { containerVariants } from "@/lib/constants";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user?.id) {
    return redirect("/sign-in");
  }
  const { hasReachedLimit } = await hasReachedUploadLimit(
    user.id as string,
    user.emailAddresses[0].emailAddress
  );
  if (hasReachedLimit) {
    redirect("/dashboard");
  }
  return (
    <section className="min-h-screen">
      <BgGradient />
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center gap-y-6 text-center">
          <UploadHeroSection />
          <UploadForm hasReachedLimit={hasReachedLimit} />
        </div>
      </MotionDiv>
    </section>
  );
};

export default page;
