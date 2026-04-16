import { FEATURES } from "@/constants";
import FeatureIcon from "@/components/shared/FeatureIcon";

export default function FeaturesGrid() {
  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Development
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to write better code and ship with confidence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FeatureIcon
                  icon={feature.icon}
                  className="w-6 h-6 text-blue-600"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
