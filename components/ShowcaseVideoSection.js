import { useState, useEffect } from 'react';

const stats = [
  { label: 'Customer Analytics', value: 85 },
  { label: 'Business Intelligence', value: 80 },
  { label: 'Marketing Analytics', value: 95 },
];

export default function ShowcaseVideoSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState([0, 0, 0]);

  // Animate progress bars
  useEffect(() => {
    let raf;
    let start = [0, 0, 0];
    function animate() {
      let done = true;
      const next = stats.map((stat, i) => {
        if (start[i] < stat.value) {
          done = false;
          start[i] += 2;
          if (start[i] > stat.value) start[i] = stat.value;
        }
        return start[i];
      });
      setProgress([...next]);
      if (!done) raf = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24 px-4 overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/video-bgmain.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7b1b2e]/90 via-[#9B51E0]/80 to-[#2d0b16]/90 z-10" />
      <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Title, bars, button, stats */}
        <div className="flex-1 text-white flex flex-col justify-center items-start max-w-xl">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">Watch How Express Analytics Is Redefining Business</h2>
          <div className="w-full space-y-6 mb-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-base md:text-lg font-medium">{stat.label}</span>
                  <span className="text-base md:text-lg font-bold">{progress[i]}/100</span>
                </div>
                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-main rounded-full transition-all duration-700"
                    style={{ width: `${progress[i]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center px-6 py-3 rounded-lg bg-gradient-main text-white font-semibold shadow-md hover:from-[#DC1B36] hover:to-[#9B51E0] transition mb-8">
            <span className="mr-2">💎</span> Schedule a Consultation
          </button>
          <div className="flex gap-12 mt-4">
            <div>
              <div className="text-2xl md:text-3xl font-bold">100+</div>
              <div className="text-base md:text-lg text-white/80">Worldwide Partners</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">600+</div>
              <div className="text-base md:text-lg text-white/80">Awesome Reviews</div>
            </div>
          </div>
        </div>
        {/* Right: Video thumbnail */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer group" onClick={() => setModalOpen(true)}>
            <img src="/video-bg.webp" alt="Watch how Express Analytics is redefining business" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#DC1B36" fillOpacity="0.9" />
                  <polygon points="26,20 48,32 26,44" fill="#fff" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-white/90 text-lg mt-6 max-w-xl text-center">
            Explore the video to know how Express Analytics empowers businesses with AI-powered data solutions, transforming operations, enhancing customer engagement, and driving smarter business decisions
          </p>
        </div>
      </div>
      {/* Modal for video */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-black rounded-2xl p-2 max-w-3xl w-full relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-white text-3xl">&times;</button>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Qo8nCvUBkp8?autoplay=1"
                title="Watch how Express Analytics is redefining business"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
