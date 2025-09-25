import { STATS_DATA } from "@/constants";

export default function StatsBar() {
  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS_DATA.map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
