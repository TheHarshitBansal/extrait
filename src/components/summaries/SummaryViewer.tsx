"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import NavigationControls from "./NavigationControls";
import ProgressBar from "./ProgressBar";
import {
  parseEmojiContent,
  parsePoint,
  parseSection,
} from "@/utils/formatUtils";
import { MotionDiv } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/lib/constants";

const RegularPoint = ({ point, index }: { point: string; index: number }) => (
  <MotionDiv
    variants={itemVariants}
    key={`point-${index}`}
    className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
  >
    <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
      {point}
    </p>
  </MotionDiv>
);

const EmojiPoint = ({
  emoji,
  text,
  index,
}: {
  emoji: string;
  text: string;
  index: number;
}) => (
  <MotionDiv
    variants={itemVariants}
    key={`${index}`}
    className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
  >
    <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    <div className="relative flex items-center gap-3">
      <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
      <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
        {text}
      </p>
    </div>
  </MotionDiv>
);

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
    <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
      {title}
    </h2>
  </div>
);

const SectionContent = ({ content }: { content: String[] }) => (
  <MotionDiv
    variants={containerVariants}
    key={content.join(" ")}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="space-y-4"
  >
    {content.map((paragraph, index) => {
      const { isEmpty, isMainPoint, hasEmoji } = parsePoint(
        paragraph as string
      );
      if (isEmpty) return null;

      const { emoji, text }: any = parseEmojiContent(paragraph as string);
      if (hasEmoji || isMainPoint) {
        return (
          <EmojiPoint
            emoji={emoji as string}
            text={text}
            index={index}
            key={index}
          />
        );
      }
      return (
        <RegularPoint point={paragraph as string} key={index} index={index} />
      );
    })}
  </MotionDiv>
);

const SummaryViewer = ({ summary_text }: { summary_text: string }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary_text.split("\n\n").map(parseSection);

  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-bg from-background via-background/95 to-rose-500/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-rose-500/10">
      <ProgressBar
        currentSection={currentSection}
        totalSections={sections.length}
      />
      <MotionDiv
        key={currentSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24"
      >
        <div className="px-4 sm:px-6 cursor-default">
          <SectionTitle title={sections[currentSection]?.title || "Summary"} />
          <SectionContent content={sections[currentSection]?.content} />
        </div>
      </MotionDiv>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={() => setCurrentSection((prev) => Math.max(prev - 1, 0))}
        onNext={() =>
          setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1))
        }
        onSectionSelect={(index) => setCurrentSection(index)}
      />
    </Card>
  );
};

export default SummaryViewer;
