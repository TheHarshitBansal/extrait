import { getSummary, getWordCount } from "@/actions/summaryActions";
import BgGradient from "@/components/common/bg-gradient";
import SourceInfo from "@/components/summaries/SourceInfo";
import SummaryHeader from "@/components/summaries/SummaryHeader";
import SummaryViewer from "@/components/summaries/SummaryViewer";
import { currentUser } from "@clerk/nextjs/server";
import { FileText } from "lucide-react";
import { notFound, redirect } from "next/navigation";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { params } = props;
  const id = (await params).id;
  const user = await currentUser();
  if (!user?.id) {
    return redirect("/sign-in");
  }

  const summary = await getSummary({
    userId: user?.id,
    summaryId: id,
  });
  if (!summary.success || !summary.summary) {
    notFound();
  }

  const { title, file_name, summary_text, created_at, original_file_url } =
    summary.summary;
  const word_count = await getWordCount({
    user_id: user.id,
    summary_id: id,
  });

  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-y-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader
              title={title}
              created_at={created_at}
              reading_time={Math.ceil(word_count / 200)}
            />
          </div>
          {file_name && (
            <SourceInfo
              file_name={file_name}
              originalFileUrl={original_file_url}
              created_at={created_at}
              title={title}
              summary_text={summary_text}
            />
          )}
          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                {word_count?.toLocaleString()} words
              </div>

              <div className="relative mt-8 sm:mt-6 flex justify-center">
                <SummaryViewer summary_text={summary_text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
