import { useRef, useState, useEffect } from 'react';
import { FaBookOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const resources = [
  {
    title: 'The Growing Importance of Data Cleansing',
    category: 'Analytics Solutions',
    date: 'July 9, 2025',
  },
  {
    title: 'Data Analytics in the Food and Beverage Sector',
    category: 'Analytics Solutions',
    date: 'July 9, 2025',
  },
  {
    title: 'How to Use Propensity Modeling to Predict Customer Behavior?',
    category: 'Marketing Analytics',
    date: 'July 9, 2025',
  },
  {
    title: 'How ML Enhances Psychographic Customer Profiling',
    category: 'AI in Marketing',
    date: 'July 9, 2025',
  },
  {
    title: 'The Power of Data Visualization',
    category: 'AI in Marketing',
    date: 'July 9, 2025',
  },
];

const CARDS_TO_SHOW = 3;

export default function ResourcesCarousel() {
  const scrollRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragScroll, setDragScroll] = useState(0);
  const [page, setPage] = useState(0);
  const numPages = Math.ceil(resources.length / CARDS_TO_SHOW);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;
    const container = scrollRef.current;
    if (!container) return;
    const scrollStep = container.offsetWidth / CARDS_TO_SHOW;
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
  }, [isHovered, numPages]);

  // Mouse drag logic
  const handleMouseDown = (e) => {
    setDragStart(e.pageX);
    setDragScroll(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (dragStart !== null) {
      const dx = dragStart - e.pageX;
      scrollRef.current.scrollLeft = dragScroll + dx;
    }
  };
  const handleMouseUp = () => setDragStart(null);

  // Touch drag logic
  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].pageX);
    setDragScroll(scrollRef.current.scrollLeft);
  };
  const handleTouchMove = (e) => {
    if (dragStart !== null) {
      const dx = dragStart - e.touches[0].pageX;
      scrollRef.current.scrollLeft = dragScroll + dx;
    }
  };
  const handleTouchEnd = () => setDragStart(null);

  // Arrow navigation
  const handleArrow = (dir) => {
    const container = scrollRef.current;
    const scrollStep = container.offsetWidth / CARDS_TO_SHOW;
    let newPage = page + dir;
    if (newPage < 0) newPage = 0;
    if (newPage > numPages - 1) newPage = numPages - 1;
    container.scrollTo({ left: newPage * scrollStep, behavior: 'smooth' });
    setPage(newPage);
  };

  // Dot navigation
  const handleDot = (idx) => {
    const container = scrollRef.current;
    const scrollStep = container.offsetWidth / CARDS_TO_SHOW;
    container.scrollTo({ left: idx * scrollStep, behavior: 'smooth' });
    setPage(idx);
  };

  return (
    <section className="py-16 bg-white text-center">
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="text-2xl text-[#DC1B36]">&#x25C7;</span>
        <span className="text-xl md:text-2xl font-semibold text-[#DC1B36]">Discover our Resources</span>
        <span className="text-2xl text-[#DC1B36]">&#x25C7;</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-2">A Plethora of Analytics Insights at Your Fingertips</h3>
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Arrows */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-pink-50 transition disabled:opacity-40"
          onClick={() => handleArrow(-1)}
          disabled={page === 0}
          aria-label="Previous"
        >
          <FaChevronLeft className="text-pink-600 text-xl" />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-pink-50 transition disabled:opacity-40"
          onClick={() => handleArrow(1)}
          disabled={page === numPages - 1}
          aria-label="Next"
        >
          <FaChevronRight className="text-pink-600 text-xl" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeaveCapture={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {resources.map((r, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl shadow p-4 flex-shrink-0 flex flex-col items-center snap-start"
              style={{
                width: 'calc((100%/3) - 1.5rem)', // 3 cards in view, minus gap
                minWidth: '260px',
                maxWidth: '340px',
              }}
            >
              <div className="w-full h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded mb-3 flex items-center justify-center">
                <FaBookOpen className="text-pink-600 text-4xl" />
              </div>
              <div className="font-semibold text-lg mb-1 text-left w-full">{r.title}</div>
              <div className="text-xs text-pink-600 mb-1 text-left w-full">{r.category}</div>
              <div className="text-xs text-gray-500 text-left w-full">{r.date}</div>
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
      </div>
      {/* CTA Section */}
      <div className="w-full flex justify-center mt-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="bg-[#18181b] rounded-3xl py-14 px-4 md:px-16 flex flex-col items-center justify-center shadow-2xl animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Analyze. Visualize. Take Actions.</h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gradient-main text-center">Unlock the Power of Data with Our Analytics Solutions.</h3>
            <button className="bg-red-600 text-white rounded-full px-8 py-3 font-semibold text-base shadow hover:bg-red-700 transition flex items-center gap-2">
              <span className="text-2xl"></span> Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
