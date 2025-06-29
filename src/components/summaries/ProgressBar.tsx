import React from "react";

const ProgressBar = ({
  currentSection,
  totalSections,
}: {
  currentSection: number;
  totalSections: number;
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10">
      <div className="px-4 flex gap-1.5">
        {Array.from({ length: totalSections }).map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1.5 rounded-full overflow-hidden bg-rose-500/10"
          >
            <div
              className={`h-full bg-linear-to-r from-gray-500 to-rose-600 transition-all duration-500 ${
                index === currentSection
                  ? "w-full"
                  : currentSection > index
                  ? "w-full opacity-10"
                  : "w-0"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
