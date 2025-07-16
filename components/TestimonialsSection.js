import { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    heading: 'Immediate Marketing & Revenue Impact',
    title: 'VP of Marketing',
    company: 'Lamps Plus',
    text: 'Express Analytics has enabled us to use data analytics as an effective base for all re-marketing programs. The efficiencies gained have allowed us to redeploy marketing dollars for timely customized offers to more productive customer segments. The result: more engaged customers and higher return on marketing dollars invested.'
  },
  {
    heading: 'Unbeatable Customer Success',
    title: 'Sr. Director Database Marketing',
    company: 'Beachbody, LLC.',
    text: 'Express Analytics is super nimble, so much more responsive. These guys are super easy to work with, they are super dedicated, very easy to get in touch with. Efficiencies gained have allowed us to redeploy marketing dollars for timely customized offers to more productive customer segments. The result: more engaged customers and higher return on marketing dollars invested.'
  },
  {
    heading: 'Solid Data Foundations',
    title: 'Analytics Group Leader',
    company: 'Solar Turbines',
    text: 'Thanks to Express Analytics, our Solar Turbines enterprise data warehouse was modernized, which paved the way for our master data management and data quality programs. That has accelerated our ability to deliver high-return analytics projects for our company. I give you guys a well-deserved “10”.'
  },
];

const getCardsToShow = () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 2.5 : 3);

export default function TestimonialsSection() {
  const scrollRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [page, setPage] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3); // Default to 3 for SSR
  const [mounted, setMounted] = useState(false);
  const numPages = Math.ceil(testimonials.length / cardsToShow);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setCardsToShow(getCardsToShow());
    setCardsToShow(getCardsToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (!mounted || isHovered) return;
    const container = scrollRef.current;
    if (!container) return;
    const scrollStep = container.offsetWidth / cardsToShow;
    const interval = setInterval(() => {
      if (container.scrollLeft + scrollStep >= container.scrollWidth - container.offsetWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
        setPage(0);
      } else {
        container.scrollTo({ left: container.scrollLeft + scrollStep, behavior: 'smooth' });
        setPage((prev) => (prev + 1) % numPages);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, cardsToShow, numPages, mounted]);

  // Dot navigation
  const handleDot = (idx) => {
    const container = scrollRef.current;
    const scrollStep = container.offsetWidth / cardsToShow;
    container.scrollTo({ left: idx * scrollStep, behavior: 'smooth' });
    setPage(idx);
  };

  return (
    <section className="py-16 bg-white">
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="text-2xl text-[#DC1B36]">&#x25C7;</span>
        <span className="text-xl md:text-2xl font-semibold text-[#DC1B36]">Value Proposition</span>
        <span className="text-2xl text-[#DC1B36]">&#x25C7;</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">See How Our Solutions Create Lasting Value</h3>
      <p className="text-gray-600 mb-8 text-center">Businesses across the US trust us because we bring AI-powered precision, real-world expertise, and results that matter.</p>
      <div className="max-w-7xl mx-auto px-4">
        {mounted && (
          <>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory justify-center"
              style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-start snap-start"
                  style={{
                    width: `calc((100%/${cardsToShow}) - 1.5rem)`,
                    minWidth: '260px',
                    maxWidth: '340px',
                  }}
                >
                  <div className="text-pink-700 font-semibold text-lg mb-2">{t.heading}</div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar key={idx} className="text-yellow-400 mr-1" />
                    ))}
                  </div>
                  <div className="text-gray-700 mb-4 text-left">"{t.text}"</div>
                  <div className="mt-auto">
                    <div className="text-sm text-gray-500">{t.title}<br />{t.company}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center mt-8 gap-2 w-full items-center">
              {Array.from({ length: numPages }).map((_, idx) => (
                <button
                  key={idx}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${idx === page ? 'bg-gradient-main' : 'bg-gray-300'}`}
                  onClick={() => handleDot(idx)}
                  aria-label={`Go to page ${idx + 1}`}
                  style={{ outline: 'none', border: 'none' }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
