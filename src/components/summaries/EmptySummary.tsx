import { FileQuestion } from "lucide-react";

const EmptySummary = () => {
  return (
    <div className="text-center py-12">
      <div>
        <div className="flex flex-col items-center gap-2">
          <FileQuestion className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-600">
            No Summaries Yet
          </h2>
          <p className="max-w-md text-gray-500">
            Start by uploading a PDF to generate your first summary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptySummary;
