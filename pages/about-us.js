import Header from '../components/Header';
import Footer from '../components/Footer';
import StatsBar from '../components/StatsBar';
import TestimonialsSection from '../components/TestimonialsSection';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const heroSlides = [
  { src: '/dashboard1.webp', alt: 'Customer Analytics Dashboard', caption: 'Customer Analytics' },
  { src: '/dashboard2.webp', alt: 'Business Intelligence Dashboard', caption: 'Business Intelligence' },
  { src: '/dashboard3.webp', alt: 'Marketing Analytics Dashboard', caption: 'Marketing Analytics' },
  { src: '/video-bg.webp', alt: 'Analytics Video', caption: 'AI-Powered Insights' },
];

function HeroHeadline() {
  // Simple fade-in animation for each line
  return (
    <div className="mb-4">
      <h2 className="text-4xl md:text-6xl font-extrabold text-white text-center leading-tight animate-fadeInUp" style={{ animationDelay: '0.1s', animationDuration: '0.8s' }}>
        About
      </h2>
      <h2 className="text-4xl md:text-6xl font-extrabold text-white text-center leading-tight animate-fadeInUp" style={{ animationDelay: '0.4s', animationDuration: '0.8s' }}>
        Express Analytics
      </h2>
    </div>
  );
}

function AboutHeroSlider() {
  // Card-style horizontal carousel, similar to ResourcesCarousel
  const scrollRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragScroll, setDragScroll] = useState(0);
  const [page, setPage] = useState(0);
  const CARDS_TO_SHOW = 3;
  const numPages = Math.ceil(heroSlides.length / CARDS_TO_SHOW);

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
    <div className="w-full max-w-7xl mx-auto px-4 relative mt-2">
      {/* Arrows */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-pink-50 transition disabled:opacity-40"
        onClick={() => handleArrow(-1)}
        disabled={page === 0}
        aria-label="Previous"
      >
        <svg className="text-pink-600 text-xl" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#DC1B36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-pink-50 transition disabled:opacity-40"
        onClick={() => handleArrow(1)}
        disabled={page === numPages - 1}
        aria-label="Next"
      >
        <svg className="text-pink-600 text-xl" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#DC1B36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-6"
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
        {heroSlides.map((img, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-xl p-4 flex-shrink-0 flex flex-col items-center snap-start border border-gray-100"
            style={{
              width: 'calc((100%/3) - 1.5rem)',
              minWidth: '260px',
              maxWidth: '340px',
            }}
          >
            <div className="w-full h-40 md:h-56 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200">
              <Image src={img.src} alt={img.alt} width={320} height={180} className="object-cover w-full h-full" />
            </div>
            <div className="font-semibold text-lg mb-1 text-center w-full text-pink-700">{img.caption}</div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2 w-full items-center">
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
  );
}

export default function AboutUs() {
  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section: About Us text first, then slider */}
        <section className="w-full bg-gradient-main pt-16 pb-4 px-4 flex flex-col items-center">
          <HeroHeadline />
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl mb-6 text-center animate-fadeInUp" style={{ animationDelay: '0.7s', animationDuration: '0.8s' }}>
            We specialize in AI-powered business intelligence and marketing analytics, helping companies transform raw data into actionable insights. By leveraging advanced analytics, businesses can understand customer behavior, optimize marketing performance, and make data-driven decisions with confidence.
          </p>
          <AboutHeroSlider />
        </section>
        {/* Vision, Mission, Passion (unchanged) */}
        <section className="py-16 bg-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-pink-700">Our Vision and Mission</h3>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="bg-pink-50 rounded-2xl p-8 shadow text-center">
              <div className="text-3xl mb-2">👁️</div>
              <h4 className="font-bold text-xl mb-2 text-pink-700">Vision</h4>
              <p className="text-gray-700">With a customer-centric approach, we deliver customized solutions tailored to unique business needs. Our expertise spans AI-driven intelligence, broad marketing analytics, and predictive modeling, ensuring companies optimize their strategies with precision.</p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-8 shadow text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-bold text-xl mb-2 text-pink-700">Mission</h4>
              <p className="text-gray-700">We help companies grow their business with AI-powered business intelligence and marketing analytics solutions. By turning raw data into actionable insights, companies can make smarter decisions, enhance customer engagement, and drive growth.</p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-8 shadow text-center">
              <div className="text-3xl mb-2">🔥</div>
              <h4 className="font-bold text-xl mb-2 text-pink-700">Passion</h4>
              <p className="text-gray-700">We are passionate about the power of data and its ability to drive success. Our team thrives on uncovering hidden business insights and translating them into real-world business impact. With a clear vision and unwavering dedication, we simplify complex analytics, making them accessible to all businesses.</p>
            </div>
          </div>
        </section>
        {/* Our Core Values with image and text */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
            <div className="flex justify-center">
              <Image src="/eaabout1.webp" alt="Express Analytics Team" width={480} height={600} className="rounded-2xl shadow-xl object-cover w-full max-w-md" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-pink-700">Our Core Values</h3>
              <p className="mb-6 text-gray-700 text-lg">We are guided by three key principles:</p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl p-4 flex items-center justify-center" style={{ background: '#dc1b36' }}>
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25Zm15.71-9.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Innovation</h4>
                    <p className="text-gray-700">Continuously evolving AI-powered analytics to meet business needs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-xl p-4 flex items-center justify-center" style={{ background: '#dc1b36' }}>
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Customer-First Approach</h4>
                    <p className="text-gray-700">Delivering tailored solutions that solve real business challenges.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-xl p-4 flex items-center justify-center" style={{ background: '#dc1b36' }}>
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm8-5c0-4.42-3.58-8-8-8S4 7.58 4 12c0 3.87 2.75 7.09 6.44 7.82.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.62.57-3.17-1.26-3.17-1.26-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.09-.24-4.29-1.04-4.29-4.62 0-1.02.36-1.85.95-2.5-.1-.24-.41-1.22.09-2.54 0 0 .78-.25 2.56.95.74-.21 1.54-.32 2.33-.32.79 0 1.59.11 2.33.32 1.78-1.2 2.56-.95 2.56-.95.5 1.32.19 2.3.09 2.54.59.65.95 1.48.95 2.5 0 3.59-2.2 4.38-4.3 4.61.36.31.68.92.68 1.85 0 1.33-.01 2.41-.01 2.74 0 .27.18.58.69.48C19.25 19.09 22 15.87 22 12Z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Scalability & Security</h4>
                    <p className="text-gray-700">Providing robust, secure, and scalable analytics platforms that grow with businesses.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Trusted by Brands, Marketing Teams, C-Level, Agencies with center image */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center px-4">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-xl font-bold text-pink-700 mb-2">Trusted by Global Brands</h4>
                <p className="text-gray-700">Our customers are world leaders in their respective sectors, ranging from tech innovators to high street retail giants, multinational banks, and hospitality chains.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-pink-700 mb-2">Marketing & Operations Teams</h4>
                <p className="text-gray-700">Developed for high-performance teams, Express Analytics provides marketing leaders and practitioners with the tools they need to drive impact and ROI.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image src="/eaabout3.webp" alt="Express Analytics Team Collaboration" width={320} height={420} className="rounded-2xl shadow-xl object-cover w-full max-w-xs" />
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-xl font-bold text-pink-700 mb-2">C-Level Executives</h4>
                <p className="text-gray-700">CEOs, CMOs, CTOs, and other top decision-makers rely on Express Analytics to unlock the power of data and get a competitive advantage.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-pink-700 mb-2">Built for Agencies</h4>
                <p className="text-gray-700">Agencies trust Express Analytics to deliver game-changing results with white-labeled dashboards and custom reporting.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Stats Bar */}
        <StatsBar />
        {/* Testimonials Section */}
        <TestimonialsSection />
        {/* CTA Section - homepage style */}
        <section className="w-full flex justify-center py-16 px-4 bg-transparent">
          <div className="bg-[#18181b] rounded-3xl shadow-2xl px-6 py-12 md:py-16 w-full max-w-7xl flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2 text-center">Analyze. Visualize. Take Actions.</h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gradient-main text-center">Unlock the Power of Data with Our Analytics Solutions.</h3>
            <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-main text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform">
              <span className="text-2xl">💎</span> Schedule a Consultation
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
