import React from "react";


interface Stat {
  value: string;
  label: string;
  description: string;
  trend?: string;
  sublabel?: string;
  details?: string;
  linkText?: string;
  linkUrl?: string;
}

const stats: Stat[] = [
  {
    value: "10M+",
    label: "Active Users",
    sublabel: "Global Reach",
    description: "Growing community worldwide",
    details: "Our user base spans over 120 countries, with active engagement in forums and events.",
    trend: "+12% this month",
    linkText: "See user map",
    linkUrl: "#users",
  },
  {
    value: "4.9/5",
    label: "User Rating",
    sublabel: "Customer Satisfaction",
    description: "Based on 50,000+ reviews",
    details: "Consistently rated above 4.8 for the past 18 months. Feedback drives our improvements.",
    trend: "Excellent",
    linkText: "Read reviews",
    linkUrl: "#reviews",
  },
  {
    value: "2.5M",
    label: "Downloads",
    sublabel: "Platform Adoption",
    description: "Across all platforms",
    details: "Available on iOS, Android, Windows, and Mac. 500K new downloads in the last quarter.",
    trend: "+8% weekly",
    linkText: "Get the app",
    linkUrl: "#download",
  },
];


const tiltClasses = [
  'hover:-rotate-3 hover:scale-105',
  'hover:rotate-2 hover:scale-105',
  'hover:-rotate-2 hover:scale-105',
  'hover:rotate-3 hover:scale-105',
];

const StatCard: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => {
  const { value, label, sublabel, description, details, trend } = stat;
  const tilt = tiltClasses[index % tiltClasses.length];

  return (
    <div className={`bg-white rounded-lg border border-gray-300 p-2 relative flex flex-col transition-transform duration-300 ease-out hover:border-gray-400 ${tilt}`}>
      {trend && (
        <span className="absolute -top-2 -right-2 z-10 bg-gray-900 text-white px-3 py-1 rounded-md text-xs font-medium border border-gray-700 shadow-md">
          {trend}
        </span>
      )}
      <div className="mb-6">
  <div className="rounded-md p-4 text-left relative border border-gray-200 bg-white">
          <div className="flex flex-col items-start gap-1">
            <span className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{value}</span>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">{label}</h3>
            {sublabel && <div className="text-xs text-gray-500 font-medium">{sublabel}</div>}
          </div>
        </div>
        <div className="mt-4 text-left pl-2">
          <p className="text-gray-600 text-sm leading-relaxed mb-2">{description}</p>
          {details && <div className="text-gray-500 text-xs mb-2">{details}</div>}
        </div>
      </div>
      {/* Button/Link removed as requested */}
    </div>
  );
};

const StatsCards: React.FC = () => (
  <section className="py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsCards;