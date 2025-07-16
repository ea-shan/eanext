import { useState, useRef, useEffect } from 'react';

const sliderImages = [
  { src: '/dashboard1.webp', alt: 'Customer Analytics', label: 'Customer Analytics', link: '#' },
  { src: '/dashboard2.webp', alt: 'Data Management', label: 'Data Management', link: '#' },
  { src: '/dashboard3.webp', alt: 'Marketing Analytics', label: 'Marketing Analytics', link: '#' },
  { src: '/dashboard1.webp', alt: 'Business Intelligence', label: 'Business Intelligence', link: '#' },
  { src: '/dashboard2.webp', alt: 'Data Visualization', label: 'Data Visualization', link: '#' },
  { src: '/dashboard3.webp', alt: 'Data Cleansing', label: 'Data Cleansing', link: '#' },
];

const SLIDES_TO_SHOW = 3;

export default function TransformDataSection() {
  const sliderRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const titleClass = "w-full max-w-7xl mx-auto px-4 text-3xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight";

  // Drag handlers for slider
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleTouchEnd = () => setIsDragging(false);

  // Animation for "AI-Powered"
  const [aiColor, setAiColor] = useState('#9B51E0');
  useEffect(() => {
    const colors = ['#9B51E0', '#DC1B36', '#686b6f'];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % colors.length;
      setAiColor(colors[i]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logic (setInterval, pause on hover)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let speed = 1; // px per tick
    let intervalId;
    if (!isDragging && !isHovered) {
      intervalId = setInterval(() => {
        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 1) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft += speed;
        }
        // Update current group for dots
        const group = Math.round(slider.scrollLeft / (slider.offsetWidth / SLIDES_TO_SHOW));
        setCurrentGroup(group);
      }, 16); // ~60fps
    }
    return () => clearInterval(intervalId);
  }, [isDragging, isHovered]);

  // Dots logic
  const numGroups = Math.ceil(sliderImages.length / SLIDES_TO_SHOW);
  const handleDotClick = (groupIdx) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollTo = groupIdx * slider.offsetWidth / SLIDES_TO_SHOW;
    slider.scrollTo({ left: scrollTo, behavior: 'smooth' });
    setCurrentGroup(groupIdx);
  };

  return (
    <section className="py-20 bg-white text-center w-full">
      <h2 className={titleClass}>
        Transform Data into Actionable Insights with{' '}
        <span
          style={{ color: aiColor, transition: 'color 0.5s' }}
          className="font-semibold"
        >
          AI-Powered
        </span>{' '}
        Smarter Marketing
      </h2>
      <p className="max-w-2xl mx-auto text-xl text-gray-700 mb-8">
        What makes Express Analytics the right partner for your business? Businesses across the US trust us because we bring AI-powered precision, real-world expertise, and results that matter.
      </p>
      <div className="flex justify-center mb-12">
        <button className="px-8 py-3 rounded-lg bg-gradient-main text-white font-semibold shadow-md flex items-center justify-center gap-2 text-lg">
          <span className="text-white">💎</span> Schedule a Consultation
        </button>
      </div>
      {/* Continuous horizontal image slider with dots */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide py-2 cursor-grab select-none"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={(e) => { handleMouseLeave(); setIsHovered(false); }}
          onMouseEnter={() => setIsHovered(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {sliderImages.map((img, idx) => (
            <a
              key={img.src + idx}
              href={img.link}
              className="relative flex-shrink-0 h-[100px] sm:h-[130px] md:h-[150px] w-[140px] sm:w-[180px] md:w-[220px] rounded-2xl shadow-xl bg-white group transition-transform duration-300"
              style={{}}
              draggable={false}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-2xl z-0"
                draggable={false}
              />
              <span className="absolute bottom-0 left-0 right-0 z-10 w-full text-white text-base md:text-lg font-bold px-2 py-1 bg-black/60 rounded-b-2xl text-center group-hover:bg-gradient-main group-hover:text-white transition-colors duration-300 cursor-pointer">
                {img.label}
              </span>
            </a>
          ))}
        </div>
        {/* Slider dots */}
        <div className="flex justify-center mt-8 gap-2 w-full items-center">
          {Array.from({ length: numGroups }).map((_, idx) => (
            <button
              key={idx}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${idx === currentGroup ? 'bg-gradient-main' : 'bg-gray-300'}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide group ${idx + 1}`}
              style={{ outline: 'none', border: 'none' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
