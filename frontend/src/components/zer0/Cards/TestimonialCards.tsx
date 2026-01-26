import React from "react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content: "Boosted our productivity with an intuitive and powerful platform.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateLabs",
    content: "Reliable, fast, and improved our efficiency by 40%.",
  },
  {
    name: "Emily Rodriguez",
    role: "Designer",
    company: "Creative Studio",
    content: "Beautiful design and a great user experience.",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const { name, role, company, content } = testimonial;

  const getColor = (name: string) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'];
    if (name === 'Emily Rodriguez') return 'bg-orange-500';
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-2 flex flex-col transition-all duration-200 ease-out hover:border-gray-400">
      <div className="flex-1 flex flex-col justify-between">
        <div className="rounded-md p-4 text-left border border-gray-300 mb-4 h-[180px] flex items-start">
          <p className="text-gray-800 text-2xl md:text-3xl font-normal w-full">{content}</p>
        </div>
        <div className="flex items-center gap-4 rounded-md p-3">
          <div className={`w-12 h-12 ${getColor(name)} rounded-full flex items-center justify-center`}>
            <span className="text-white font-semibold text-lg">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">{role} at {company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCards: React.FC = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what industry leaders have to say about our platform.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialCards;