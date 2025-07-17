import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
  {
    text: 'Express Analytics has enabled us to use data analytics as an effective base for all re-marketing programs. The efficiencies gained have allowed us to redeploy marketing dollars for timely customized offers to more productive customer segments. The result: more engaged customers and higher return on marketing dollars invested.',
    name: 'Lamps Plus',
    title: 'VP of Marketing',
  },
  {
    text: 'Express Analytics is super nimble, so much more responsive. These guys are super easy to work with, they are super dedicated, very easy to get in touch with.',
    name: 'Beachbody, LLC.',
    title: 'Sr. Director Database Marketing',
  },
  {
    text: 'Thanks to Express Analytics, our Solar Turbines enterprise data warehouse was modernized, which paved the way for our master data management and data quality programs. That has accelerated our ability to deliver high-return analytics projects for our company. I give you guys a well-deserved “10”.',
    name: 'Solar Turbines',
    title: 'Analytics Group Leader',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const handlePrev = () => setActive((prev) => (prev - 1 + total) % total);
  const handleNext = () => setActive((prev) => (prev + 1) % total);

  const t = testimonials[active];

  return (
    <section className="py-16 bg-white">
      {/* Custom icon font style for quote icon */}
      <style>{`
        @font-face {
          font-family: 'icomoon';
          src: url('/fonts/icomoon.woff2') format('woff2'), url('/fonts/icomoon.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
        .quote-icon {
          font-family: 'icomoon' !important;
          font-size: 4.5rem;
          color: #1a1a1a;
          display: inline-block;
          vertical-align: top;
          line-height: 1;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16">
        {/* Left: Title & Actions */}
        <div className="flex-1 flex flex-col justify-center items-start md:pl-8">
          <span className="inline-block mb-4 px-5 py-2 rounded-full bg-gray-100 text-xs font-semibold tracking-widest text-gray-700">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-5xl font-light mb-6 text-left leading-tight">
            Client <span className="text-red-600 font-semibold">Experiences</span> That<br />
            Speak for Themselves
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            <a href="#" className="bg-red-600 text-white rounded-full px-8 py-3 font-semibold text-base shadow hover:bg-red-700 transition flex items-center gap-2">
              Free Consultation
            </a>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                <img src="/google-color-svgrepo-com.svg" alt="Google" className="w-7 h-7" />
              </span>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-lg text-black leading-none flex items-center gap-1">
                  5.0
                </span>
                <span className="text-xs text-gray-500 leading-none">GOOGLE REVIEWS</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Testimonial Card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative bg-gray-50 rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-xl min-h-[380px] flex flex-col justify-between h-full">
            <div className="flex items-start gap-4">
              <img src="/quote-up-svgrepo-com.svg" alt="Qoutes" className="w-12 h-12" />
              <p className="text-lg md:text-xl text-gray-800 mb-8 inline-block align-top max-w-2xl">{t.text}</p>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400"><circle cx="12" cy="8" r="4" strokeWidth="2" /><path strokeWidth="2" d="M4 20c0-4 4-7 8-7s8 3 8 7" /></svg>
              </span>
              <div>
                <div className="font-bold text-black text-base">{t.name}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t.title}</div>
              </div>
            </div>
            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 flex gap-4">
              <button onClick={handlePrev} className="w-14 h-14 rounded-full bg-gray-200 shadow flex items-center justify-center hover:bg-gray-300 transition" aria-label="Previous">
                <FaArrowLeft className="text-2xl text-gray-800" />
              </button>
              <button onClick={handleNext} className="w-14 h-14 rounded-full bg-gray-200 shadow flex items-center justify-center hover:bg-gray-300 transition" aria-label="Next">
                <FaArrowRight className="text-2xl text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
