import { Card } from "@/components/ui/card";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { MotionDiv } from "../common/motion-wrapper";
import { itemVariants } from "@/lib/constants";

const SummaryCard = ({ summary }: any) => {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton userId={summary.user_id} summaryId={summary.id} />
        </div>
        <Link href={`/summary/${summary.id}`} className="block px-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-start gap-2 sm:gap-4">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
                  {summary.title || summary.file_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(summary.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary.summary_text}
            </p>
            <div className="flex items-center justify-between mt-2 sm:mt-4">
              <span
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full capitalize",
                  summary.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                )}
              >
                {summary.status}
              </span>
            </div>
          </div>
        </Link>
      </Card>
    </MotionDiv>
  );
};

export default SummaryCard;
