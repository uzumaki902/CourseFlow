import React from "react";
// Type for a single pricing plan
interface PricingPlan {
  name: string;
  description?: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

// Pricing plans data
const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    description: "For personal projects and small teams",
    price: "Free",
    period: "",
    features: [
      "Up to 5 projects",
      "Basic analytics",
      "Email support",
      "1GB storage",
    ],
  },
  {
    name: "Pro",
    description: "Best for professionals and growing teams",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    period: " Pricing",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Unlimited storage",
      "Custom development",
      "SLA guarantee",
    ],
  },
];

// Card for a single pricing plan
const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
  <div
    className={`rounded-lg border border-gray-300 p-2 relative flex flex-col transition-all duration-200 ease-out ${
      plan.popular ? 'border border-gray-900 ring-opacity-10' : ''
    }`}
  >
    <div className="mb-6">
      <div className={`rounded-md p-4 text-left relative ${plan.popular ? 'border border-gray-900' : 'border border-gray-300'}`}
      >
        {plan.popular && (
          <span className="absolute top-2 right-2 bg-gray-900 text-white px-3 py-1 rounded-md text-xs font-medium border border-gray-700">
            Most Popular
          </span>
        )}
        <div className="flex items-center gap-2">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">{plan.name}</h3>
        </div>
        {plan.description && (
          <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
        )}
      </div>
      <div className="mt-4 text-left pl-4">
        <div className="flex items-baseline">
          <span className="text-2xl md:text-3xl font-bold text-gray-900">{plan.price}</span>
          <span className="text-gray-600 ml-2">{plan.period}</span>
        </div>
      </div>
    </div>
    <ul className="space-y-4 mb-8 pl-4">
      {plan.features.map((feature, featureIndex) => (
        <li key={featureIndex} className="flex items-start text-gray-700">
          <svg className="w-5 h-5 text-gray-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
          <span className="ml-3">{feature}</span>
        </li>
      ))}
    </ul>
    <div className="mt-auto">
      <button
        className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-150 ease-out focus:outline-none cursor-pointer ${
          plan.popular ? 'bg-gray-900 text-white hover:bg-gray-700' : 'border border-gray-300 text-gray-900 hover:bg-gray-300'
        }`}
        aria-label={`Get started with ${plan.name}`}
        onClick={() => alert(`Get started with ${plan.name}`)}
      >
        {plan.name === "Enterprise" ? "Book a Call" : plan.price === "Free" ? "Get Started for Free" : "Get Started"}
      </button>
    </div>
  </div>
);

// Main pricing cards section
const PricingCards: React.FC = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your needs. Upgrade or downgrade at any time.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  </section>
);

export default PricingCards;