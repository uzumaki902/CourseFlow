import React from "react";


interface Stat {
  value: string;
  label: string;
  description: string;
  image?: string;
}

const stats: Stat[] = [
  {
    value: "Explore",
    label: "New Horizons",
    description: "Discover uncharted territories of creativity.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center",
  },
  {
    value: "Create",
    label: "Your Masterpiece",
    description: "Bring your unique vision to life.",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop&crop=center",
  },
  {
    value: "Connect",
    label: "Shared Journeys",
    description: "Build bridges and foster collaboration.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&crop=center",
  },
];


const StatCard: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => {
  const { value, label, description, image } = stat;
  
  const rotations = ['rotate-[-6deg]', 'rotate-[4deg]', 'rotate-[-2deg]'];
  const rotation = rotations[index % rotations.length];

  return (
    <div 
      className={`relative rounded-2xl border border-gray-200 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:z-10 hover:rotate-0 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50 w-72 h-48 md:w-80 md:h-56 overflow-hidden ${index > 0 ? '-ml-12 md:-ml-16' : ''} ${rotation}`} 
      tabIndex={0}
    >
      {image && (
        <img 
          src={image} 
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <p className="text-sm md:text-base text-white font-medium leading-tight drop-shadow-sm">
          {value} <span className="text-white/90 font-normal">{label}</span>
        </p>
        <p className="text-xs md:text-sm text-white/80 mt-1 leading-tight drop-shadow-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

const OverlappingCards: React.FC = () => (
  <section className="py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-center items-start">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default OverlappingCards;