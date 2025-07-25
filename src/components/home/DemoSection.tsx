import { Presentation } from "lucide-react";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
import SummaryViewer from "../summaries/SummaryViewer";
import { DEMO_SUMMARY } from "@/lib/demo";

const DemoSection = () => {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-rose-200 via-orange-200 to-red-200 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Presentation className="h-6 w-6 text-rose-500" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how Extrait transforms this{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                PDF
              </span>{" "}
              into an concise and easy-to-read summary.
            </MotionH3>
          </div>

          <div className="flex items-center justigy-center px-2 sm:px-4 lg:px-6">
            <MotionDiv
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SummaryViewer summary_text={DEMO_SUMMARY} />
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
