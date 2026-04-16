import { PROCESS_STEPS } from "@/constants";
import FeatureIcon from "@/components/shared/FeatureIcon";

const STEP_ICONS = ["upload", "lightning", "checkCircle"];
const STEP_COLORS = [
  { bg: "bg-blue-100", icon: "text-blue-600", number: "bg-blue-600" },
  { bg: "bg-purple-100", icon: "text-purple-600", number: "bg-purple-600" },
  { bg: "bg-green-100", icon: "text-green-600", number: "bg-green-600" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 text-sm font-medium rounded-full mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            Get a full code review in under 30 seconds — no setup, no config.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-0">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center px-6">
                {/* Connector line */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] right-0 h-px border-t-2 border-dashed border-gray-200 z-0" />
                )}

                {/* Icon */}
                <div className="relative z-10 mb-5">
                  <div className={`w-20 h-20 ${STEP_COLORS[idx].bg} rounded-2xl flex items-center justify-center mx-auto`}>
                    <FeatureIcon icon={STEP_ICONS[idx]} size={28} className={STEP_COLORS[idx].icon} />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 ${STEP_COLORS[idx].number} text-white rounded-full flex items-center justify-center text-xs font-bold`}>
                    {step.number}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
