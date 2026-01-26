import React, { useState, useCallback, useEffect } from "react";

interface StoryStep {
  title: string;
  description: string;
  image?: string;
}

interface DynamicStoryCardProps {
  steps?: StoryStep[];
}

const defaultSteps: StoryStep[] = [
  {
    title: "Welcome to thezer0company",
    description: "The ultra-compact React component library built exclusively for light mode. Tiny, dependency-free primitives that supercharge your workflow.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop&crop=center",
  },
  {
    title: "Pure Light-Mode Design",
    description: "Zero overhead from dark themes, maximum focus on your content. Clean, auditable code that delivers stunning, laser-focused UIs.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center",
  },
  {
    title: "Performance & Simplicity",
    description: "Micro-sized components with minimal DOM footprint and negligible bundle size. Perfect for performance-critical apps at lightning speed.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
  },
];

const DynamicStoryCard: React.FC<DynamicStoryCardProps> = ({ steps = defaultSteps }) => {
  const [current, setCurrent] = useState(0);

  const handleNext = useCallback(() => setCurrent((prev) => (prev + 1) % steps.length), [steps.length]);
  const handlePrev = useCallback(() => setCurrent((prev) => (prev - 1 + steps.length) % steps.length), [steps.length]);
  const handleStepClick = useCallback((idx: number) => setCurrent(idx), []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  }, [handlePrev, handleNext]);

  useEffect(() => {
    // Focus management for accessibility
    // Could add focus to the card or buttons if needed
  }, [current]);

  const { title, description, image } = steps[current];

  return (
    <div className="flex flex-col items-center" onKeyDown={handleKeyDown} tabIndex={0} role="region" aria-label="Dynamic Story Card">
      <div className="relative w-[32rem] md:w-[40rem] h-[28rem] rounded-2xl overflow-hidden border border-gray-300 shadow-lg bg-white transition-all duration-500 group focus-within:ring-2 focus-within:ring-gray-900">
        {image && (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end h-full p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow mb-2 animate-fade-in">
            {title}
          </h3>
          <p className="text-white/90 text-sm md:text-base mb-4 animate-fade-in delay-100 line-clamp-3">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="border border-gray-300 text-gray-900 rounded-md hover:bg-gray-300 active:scale-[0.97] px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous step"
          disabled={steps.length <= 1}
        >
          ← Prev
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Story steps">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleStepClick(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none active:scale-[0.97] ${
                idx === current ? "bg-gray-900 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to step ${idx + 1}`}
              role="tab"
              aria-selected={idx === current}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="border border-gray-300 text-gray-900 rounded-md hover:bg-gray-300 active:scale-[0.97] px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next step"
          disabled={steps.length <= 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DynamicStoryCard;
