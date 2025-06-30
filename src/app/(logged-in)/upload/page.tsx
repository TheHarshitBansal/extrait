import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/upload/UploadForm";
import UploadHeroSection from "@/components/upload/UploadHeroSection";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user?.id) {
    return redirect("/sign-in");
  }
  const { hasReachedLimit } = await hasReachedUploadLimit(user.id as string);
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-y-6 text-center">
          <UploadHeroSection />
          <UploadForm hasReachedLimit={hasReachedLimit} />
        </div>
      </div>
    </section>
  );
};

export default page;
