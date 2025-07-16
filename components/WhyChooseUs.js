import { useState } from 'react';
import { FaGem, FaBolt, FaPaperPlane } from 'react-icons/fa';

const features = [
  {
    key: 'innovation',
    icon: <FaGem className="text-white text-2xl mr-2" />, // diamond
    title: 'Innovation',
    image: '/innovation-modified.webp',
    desc: 'We believe that innovation is the heartbeat of progress. By continuously evolving our AI-powered analytics platform, we stay ahead of emerging trends and anticipate future business needs. From predictive insights to intelligent automation, we are committed to developing cutting-edge solutions that empower our clients to make smarter, faster, and more strategic decisions.'
  },
  {
    key: 'customer',
    icon: <FaBolt className="text-white text-2xl mr-2" />, // lightning
    title: 'Customer-First Approach',
    image: '/customer-first-modified.webp',
    desc: 'Our customers are at the center of everything we do. We invest time in understanding their challenges, goals, and workflows to deliver deeply personalized and value-driven solutions. Every engagement is built on trust, collaboration, and a shared vision for measurable success—because your growth is our mission.'
  },
  {
    key: 'security',
    icon: <FaPaperPlane className="text-white text-2xl mr-2" />, // paper plane
    title: 'Scalability & Security',
    image: '/security-modified.webp',
    desc: 'Our platforms are designed to grow with you. Whether you’re a startup or an enterprise, we provide secure and scalable analytics infrastructure that adapts to your evolving needs. With enterprise-grade data protection and cloud-ready scalability, we ensure your operations are future-proof, resilient, and compliant at every step.'
  },
];

export default function WhyChooseUs() {
  const [open, setOpen] = useState(1);
  return (
    <section className="py-16 bg-gray-50">
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose Express Analytics?</h3>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-stretch px-4">
        {/* Left: Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={features[open].image}
            alt={features[open].title}
            className="rounded-3xl w-full max-w-xl aspect-[4/3] object-cover shadow-lg"
          />
        </div>
        {/* Right: Accordion */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          {features.map((f, i) => (
            <div key={f.key}>
              <button
                className={`w-full flex items-center justify-between px-6 py-4 rounded-t-xl font-semibold text-lg md:text-xl transition-all duration-200 focus:outline-none ${open === i ? 'bg-gradient-to-r from-pink-600 to-purple-500 text-white' : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500'}`}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="flex items-center">{f.icon}{f.title}</span>
                <span className="text-2xl font-bold">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="bg-black text-white px-6 py-6 rounded-b-xl text-base md:text-lg animate-fadeIn">
                  {f.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
