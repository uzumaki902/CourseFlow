import React, { useState, useCallback, useEffect } from "react";

interface StoryStep {
  title: string;
  description: string;
}

interface DynamicStoryCardNoImagesProps {
  steps?: StoryStep[];
}

const defaultSteps: StoryStep[] = [
  {
    title: "Welcome to thezer0company",
    description: "The ultra-compact React component library built exclusively for light mode. Tiny, dependency-free primitives that supercharge your workflow and deliver stunning, laser-focused UIs at lightning speed. Experience the future of component development with our meticulously crafted library designed for modern web applications.",
  },
  {
    title: "Pure Light-Mode Design",
    description: "Zero overhead from dark themes, maximum focus on your content. Clean, auditable code that delivers stunning, laser-focused UIs. Our components are built with performance in mind, ensuring your applications run smoothly without unnecessary bloat or complex theming systems.",
  },
  {
    title: "Performance & Simplicity",
    description: "Micro-sized components with minimal DOM footprint and negligible bundle size. Perfect for performance-critical apps at lightning speed. Each component is optimized for speed, accessibility, and developer experience, making it easy to build beautiful interfaces without compromising on performance.",
  },
];

const DynamicStoryCardNoImages: React.FC<DynamicStoryCardNoImagesProps> = ({ steps = defaultSteps }) => {
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
  }, [current]);

  const { title, description } = steps[current];

  return (
    <div className="flex flex-col items-center" onKeyDown={handleKeyDown} tabIndex={0} role="region" aria-label="Dynamic Story Card">
      <div className="bg-white rounded-lg border border-gray-300 p-2 relative flex flex-col transition-transform duration-300 ease-out hover:border-gray-400 max-w-lg h-[24rem] group">
        <div className="mb-6">
          <div className="rounded-md p-6 text-left relative border border-gray-200 bg-white group-hover:border-gray-400 transition-colors duration-300 ease-out">
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{title}</h3>
            </div>
          </div>
          <div className="mt-4 text-left pl-6 pr-6">
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
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

export default DynamicStoryCardNoImages;