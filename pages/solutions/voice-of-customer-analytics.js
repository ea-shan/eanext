import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Diamond SVG Icon
const DiamondIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 align-middle">
    <path d="M12 3L2 9l10 12 10-12-10-6zm0 2.236L18.618 9 12 19.764 5.382 9 12 5.236zM7.5 9l4.5 8.118L16.5 9H7.5z" fill="#fff" />
  </svg>
);

const features = [
  {
    title: 'Sentiment Analysis',
    subtitle: 'Understand Public Opinion',
    description: 'Track positive, neutral, and negative sentiments across text, audio, and image formats to understand public perception. This helps improve satisfaction, brand loyalty, and retention.',
    image: '/Sentiment-Analysis-1.webp',
    alt: 'Sentiment Analysis',
  },
  {
    title: 'Emotion Analysis',
    subtitle: 'Go Beyond Sentiment',
    description: 'Move beyond simple sentiment by identifying core emotions like Joy, Trust, Surprise, Anger, Sadness, and Fear. Emotional Analysis enables you to tailor experiences and content strategies more effectively.',
    image: '/Emotion-Analysis-1.webp',
    alt: 'Emotion Analysis',
  },
  {
    title: 'Emoji & Multilingual Support',
    subtitle: 'Speak Global, Feel Local',
    description: 'Facilitate global communication and emotional relevance by detecting sentiment from emojis and supporting multiple languages.',
    image: '/Emoji-Multilingual-Support-1.webp',
    alt: 'Emoji & Multilingual Support',
  },
  {
    title: 'Topic Modeling',
    subtitle: 'Reveal Key Themes',
    description: 'Using NLP, identify trending topics and hidden data patterns, and train models with your specific data to refine strategies and marketing efforts.',
    image: '/Topic-Modeling-1.webp',
    alt: 'Topic Modeling',
  },
  {
    title: 'Visual Dashboards & Insights',
    subtitle: 'See What Matters Most',
    description: 'Gain real-time clarity with interactive dashboards that track timelines, KPIs, and sentiment metrics, enabling confident decision-making.',
    image: '/Visual-Dashboards-Insights-1.webp',
    alt: 'Visual Dashboards & Insights',
  },
  {
    title: 'Keyword Extraction',
    subtitle: 'Capture Core Conversations',
    description: 'Identify recurring keywords in customer feedback to enhance content, SEO, and product development strategies.',
    image: '/Keyword-extraction.webp',
    alt: 'Keyword Extraction',
  },
];

const localizer = momentLocalizer(moment);
const Map = dynamic(() => import('../../components/ContactMap'), { ssr: false });

const advancedFeatures = [
  {
    title: 'Google Maps Integration',
    desc: 'Integrate your VOCA output with Google Maps to improve local marketing performance without increasing ad spend.',
    image: '/Google-Maps-Integration-1.png.webp',
  },
  {
    title: 'Reviews Classification',
    desc: 'Classify reviews based on location, identify & filter out fake and paid reviews to stay at the top of your game.',
    image: '/Reviews-Classification.webp',
  },
  {
    title: 'Sarcasm Detection',
    desc: 'Make use of Advanced Sarcasm Detection in social media comments & user reviews to never miss out on those hidden implications.',
    image: '/Sarcasm-Detection-1.png.webp',
  },
  {
    title: 'Net Promoter Score',
    desc: 'Raise your brand equity with Net Promoter Score (NPS), a metric used to measure public perception of a brand on social media.',
    image: '/Net-Promoter-Score-1.png.webp',
  },
  {
    title: 'Industry Benchmarks',
    desc: 'Deploy dashboards on key consumer sentiments delivered as a corporate dashboard and utilize localized intelligence for franchisees/locations on performance relative to regional/industry benchmarks.',
    image: '/Industry-Benchmarks-1.png.webp',
  },
];

export default function VoiceOfCustomerAnalytics() {
  // Parallax effect for hero background
  const heroRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.backgroundPosition = `center ${-scrolled * 0.2}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chart data and options
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Website Blog',
        data: [320, 450, 380, 600, 420, 500, 700, 650, 480, 520, 610, 700],
        backgroundColor: 'rgba(155, 81, 224, 0.8)',
        borderRadius: 8,
        barPercentage: 0.6,
      },
      {
        label: 'Social Media',
        data: [180, 300, 250, 400, 320, 410, 600, 550, 380, 420, 510, 600],
        backgroundColor: 'rgba(220, 27, 54, 0.8)',
        borderRadius: 8,
        barPercentage: 0.6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#222',
          font: { size: 16, weight: 'bold' },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#222',
        bodyColor: '#333',
        borderColor: '#e5e7eb',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#222', font: { size: 14 } },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
      y: {
        ticks: { color: '#222', font: { size: 14 } },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
    },
  };

  // VOCA Process icons
  const processIcons = [
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Data Ingestion
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2" /></svg>, // AI/ML Analysis
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 16h12M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2" /></svg>, // Contextual Tagging
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 22l6-12 6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Dashboard Deployment
  ];
  const processSteps = [
    {
      title: 'Data Ingestion',
      desc: 'Collect content from multiple feedback channels, including online reviews, chat logs, social media, and surveys.',
    },
    {
      title: 'AI/ML Analysis',
      desc: 'Apply predictive models and NLP for sentiment tagging, emotion scoring, and topic modeling.',
    },
    {
      title: 'Contextual Tagging',
      desc: 'Identify subtleties like sarcasm, regional expressions, and brand-specific keywords.',
    },
    {
      title: 'Dashboard Deployment',
      desc: 'Visualize outputs using customized dashboards that offer location-level and industry-specific views.',
    },
  ];

  // Calendar booking logic (from contact-us.js)
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmation, setConfirmation] = useState('');
  const events = [];
  // Fix: define timeOptions inside the component
  const timeOptions = Array.from({ length: 18 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const min = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${min}`;
  });
  function handleBooking() {
    if (selectedDate && selectedTime) {
      setConfirmation(`Your meeting is scheduled for ${moment(selectedDate).format('MMMM Do, YYYY')} at ${selectedTime}`);
    } else {
      setConfirmation('Please select a date and time.');
    }
  }

  // HubSpot form loader (like contact-us.js)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.hbspt) {
        const script = document.createElement('script');
        script.src = '//js.hsforms.net/forms/embed/v2.js';
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => {
          if (window.hbspt) {
            window.hbspt.forms.create({
              portalId: '287495',
              formId: 'c4777f71-73fd-42e3-b3ad-0b4c9c273ec1',
              region: 'na1',
              target: '#hubspot-form-placeholder',
            });
          }
        };
        document.body.appendChild(script);
      } else {
        window.hbspt.forms.create({
          portalId: '287495',
          formId: 'c4777f71-73fd-42e3-b3ad-0b4c9c273ec1',
          region: 'na1',
          target: '#hubspot-form-placeholder',
        });
      }
    }
  }, []);

  return (
    <div className="bg-white text-gray-900 flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Parallax and Animated Transitions */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex flex-col items-center justify-center min-h-[480px] md:min-h-[600px] px-4"
          style={{
            background: 'linear-gradient(120deg, #fbeff2 0%, #f3e6fa 50%, #f5f7fa 100%)',
            backgroundSize: '200% 200%',
            backgroundAttachment: 'fixed',
            transition: 'background-position 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <style>{`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient {
              animation: gradientMove 8s ease-in-out infinite;
            }
            .fade-up {
              opacity: 0;
              transform: translateY(40px);
              animation: fadeUpAnim 1s 0.2s forwards;
            }
            .fade-up-2 {
              opacity: 0;
              transform: translateY(40px);
              animation: fadeUpAnim 1s 0.4s forwards;
            }
            .fade-up-3 {
              opacity: 0;
              transform: translateY(40px);
              animation: fadeUpAnim 1s 0.6s forwards;
            }
            .fade-up-4 {
              opacity: 0;
              transform: translateY(40px);
              animation: fadeUpAnim 1s 0.8s forwards;
            }
            @keyframes fadeUpAnim {
              to {
                opacity: 1;
                transform: none;
              }
            }
            .slide-in {
              opacity: 0;
              transform: translateY(60px) scale(0.98);
              animation: slideInAnim 1.2s 1s cubic-bezier(0.4,0,0.2,1) forwards;
            }
            @keyframes slideInAnim {
              to {
                opacity: 1;
                transform: none;
              }
            }
          `}</style>
          <div className="absolute inset-0 z-0 animate-gradient" style={{ background: 'inherit' }} />
          <div className="relative z-10 flex flex-col items-center w-full pt-12 pb-80 md:pb-[400px]">
            <span
              className="inline-block px-6 py-2 mb-6 rounded-full text-base font-semibold shadow fade-up"
              style={{
                background: 'rgba(220, 27, 54, 0.08)',
                color: '#DC1B36',
                fontWeight: 600,
              }}
            >
              Your Brand’s Ultimate Solution for Social Listening, Review Analysis, and Deep Understanding
            </span>
            <h1
              className="text-3xl md:text-6xl font-semibold text-center mb-4 fade-up-2"
              style={{
                background: 'linear-gradient(90deg, #DC1B36, #9B51E0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              }}
            >
              Voice of Customer<br className="hidden md:block" /> Analytics (VOCA)
            </h1>
            <p className="max-w-2xl mx-auto mb-6 text-base md:text-lg text-center text-gray-700 font-medium fade-up-3">
              At Express Analytics, we empower you to better understand your customers and react faster. Our Voice of Customer Analytics (VOCA) Engine leverages advanced NLP, emotion recognition, and multilingual capabilities to transform unstructured customer feedback into actionable insights. From social media reviews and product ratings to support chats, VOCA reveals your customers’ true sentiments.
            </p>
            {/* Gradient Button with Diamond Icon */}
            <button
              className="fade-up-4 flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-bold text-lg shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{
                background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)',
                color: '#fff',
                boxShadow: '0 4px 24px 0 rgba(155,81,224,0.10)',
                minWidth: 280,
              }}
            >
              <DiamondIcon /> Schedule a Consultation
            </button>
          </div>
          {/* Hero Image attached to bottom, at least 690px wide, fully rounded, responsive */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-full flex justify-center pointer-events-none">
            {/* Animated Arrows - left and right, only on md+ screens */}
            <div className="hidden md:block absolute left-0 bottom-12 z-20 animate-arrow-bounce">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrowLeftGradient" x1="0" y1="40" x2="80" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#DC1B36" />
                    <stop offset="1" stopColor="#9B51E0" />
                  </linearGradient>
                </defs>
                <path d="M70 40H20M20 40l18-18M20 40l18 18" stroke="url(#arrowLeftGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="hidden md:block absolute right-0 bottom-12 z-20 animate-arrow-bounce-reverse">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrowRightGradient" x1="80" y1="40" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#DC1B36" />
                    <stop offset="1" stopColor="#9B51E0" />
                  </linearGradient>
                </defs>
                <path d="M10 40h50M60 40l-18-18M60 40l-18 18" stroke="url(#arrowRightGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <style>{`
              @keyframes arrowBounce {
                0%, 100% { transform: translateY(0); opacity: 0.7; }
                50% { transform: translateY(-18px) scale(1.08); opacity: 1; }
              }
              .animate-arrow-bounce {
                animation: arrowBounce 1.6s infinite cubic-bezier(0.4,0,0.2,1);
              }
              .animate-arrow-bounce-reverse {
                animation: arrowBounce 1.6s infinite cubic-bezier(0.4,0,0.2,1) reverse;
              }
            `}</style>
            <img
              src="/Voice-of-Customer-Analytics_Featured-Image.webp"
              alt="VOCA Hero"
              className="w-[690px] max-w-full rounded-3xl shadow-lg object-cover object-bottom slide-in"
              style={{
                marginBottom: '8px',
                background: 'white',
              }}
            />
          </div>
        </section>

        {/* Express Analytics’ Approach Section - Large Text */}
        <section className="py-16 px-4 text-center bg-white">
          <h3 className="text-3xl md:text-4xl font-semibold mb-4" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Express Analytics’ Approach</h3>
          <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">What is VOCA?</h4>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-700 font-medium">
            VOCA systematically gathers and analyzes customer feedback from various channels to uncover their expectations, preferences, and feelings. Express Analytics’ VOCA Engine goes beyond basic text mining, providing deep semantic and emotional insights powered by AI, machine learning, and language processing tools.
          </p>
        </section>

        {/* Key Features and Tools - Alternating Layout */}
        <section className="py-16 px-4 bg-gray-50">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-16" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Key Features and Tools of EA’s VOCA</h3>
          <div className="flex flex-col gap-24 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <div key={feature.title} className={`flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-10 md:gap-16`}>
                {/* Image with gradient border/shadow */}
                <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                  <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                    <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                      <img src={feature.image} alt={feature.alt} className="block w-full h-auto rounded-2xl" />
                    </div>
                  </div>
                </div>
                {/* Text */}
                <div className="w-full md:w-1/2">
                  <div className="mb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase opacity-80">{feature.title}</div>
                  <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>{feature.subtitle}</div>
                  <div className="text-base md:text-lg text-gray-700 font-medium">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits of VOCA Section - Two Column Animated */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
              {[
                {
                  title: 'Real-Time Customer Insights',
                  desc: 'Stay abreast of evolving customer moods and trends.',
                },
                {
                  title: 'Data-Driven Strategy',
                  desc: 'Utilize generative AI for enhanced voice of the customer analysis to boost campaigns and improve customer experience (CX).',
                },
                {
                  title: 'Faster Response Times',
                  desc: 'Address emerging issues proactively, preventing customer churn.',
                },
                {
                  title: 'Multilingual & Cultural Understanding:',
                  desc: 'Grasp nuances across different regions, languages, and audiences.',
                },
                {
                  title: 'Innovative Personalization',
                  desc: 'Shape product and service offerings based on genuine customer needs identified through VOC analysis.',
                },
                {
                  title: 'Better Brand Positioning',
                  desc: 'Align your brand messaging with market sentiment using VOCA insights.',
                },
              ].map((benefit, i) => (
                <div key={benefit.title} className={`flex items-start gap-6 fade-up`} style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                  {/* Animated Blue Checkmark Icon */}
                  <span className="flex flex-col items-center pt-1">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-2 animate-pulse">
                      <circle cx="24" cy="24" r="18" stroke="#3B82F6" strokeWidth="3" fill="none" />
                      <path d="M17 25l5 5 9-11" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span className="block w-0.5 h-8 bg-blue-400" />
                  </span>
                  <div>
                    <div className="text-xl md:text-2xl font-semibold mb-1" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>{benefit.title}</div>
                    <div className="text-base md:text-lg text-gray-700 font-medium">{benefit.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features - Bento Grid Gradient Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-white">Gain a unique competitive advantage with the advanced features of EA’s VOCA module</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                {advancedFeatures.map((feature, idx) => (
                  <div key={feature.title} className="flex flex-col items-center text-center">
                    <span className="mb-4">
                      <img src={feature.image} alt={feature.title + ' icon'} className="w-16 h-16 object-contain rounded-xl bg-white/10" />
                    </span>
                    <div className="text-xl font-semibold text-white mb-2">{feature.title}</div>
                    <div className="text-white text-base opacity-90">{feature.desc}</div>
                  </div>
                ))}
              </div>
              {/* ChartJS Bar Chart attached to the bottom of the bento grid */}
              <div className="w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative mt-16" style={{ background: 'linear-gradient(120deg, #f3e6fa 0%, #fff 100%)', border: '1px solid #e5e7eb', zIndex: 2 }}>
                <div className="p-6">
                  <div className="absolute top-0 left-0 w-full px-6 py-4 flex items-center gap-3 text-gray-800 text-lg font-semibold" style={{ background: 'rgba(255,255,255,0.85)', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 3L2 9l10 12 10-12-10-6zm0 2.236L18.618 9 12 19.764 5.382 9 12 5.236zM7.5 9l4.5 8.118L16.5 9H7.5z" fill="#DC1B36" /></svg>
                    Advanced Analytics and Visualisation
                  </div>
                  <Bar data={chartData} options={chartOptions} className="pt-10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Auto-scrolling Marquee Section */}
        <section className="py-10 bg-white">
          <div className="overflow-hidden w-full">
            <div className="whitespace-nowrap animate-marquee text-4xl md:text-5xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>
              <span className="mx-8">Voice of Customer Analytics (VOCA)</span>
              <span className="mx-8">Sentiment Analysis</span>
              <span className="mx-8">Emotion Analysis</span>
              <span className="mx-8">Multilingual Support</span>
              <span className="mx-8">Topic Modeling</span>
              <span className="mx-8">Dashboards & Insights</span>
              <span className="mx-8">Keyword Extraction</span>
              <span className="mx-8">Google Maps Integration</span>
              <span className="mx-8">Reviews Classification</span>
              <span className="mx-8">Sarcasm Detection</span>
              <span className="mx-8">Net Promoter Score</span>
              <span className="mx-8">Industry Benchmarks</span>
              <span className="mx-8">Advanced Analytics</span>
              <span className="mx-8">Data Visualization</span>
              <span className="mx-8">Customer Experience</span>
            </div>
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                display: inline-block;
                min-width: 200%;
                animation: marquee 30s linear infinite;
              }
            `}</style>
          </div>
        </section>

        {/* VOCA Process Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold mb-4" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>The VOCA Process</h3>
              <p className="text-lg md:text-xl text-gray-700 mb-8">Gain a unique competitive advantage with the advanced features of EA’s VOCA module</p>
              <button className="mt-8 px-8 py-3 rounded-2xl font-bold text-lg shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400" style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', color: '#fff', boxShadow: '0 4px 24px 0 rgba(155,81,224,0.10)', minWidth: 280 }}><DiamondIcon /> Schedule a Consultation</button>
            </div>
            <div className="flex flex-col gap-8">
              {processSteps.map((step, i) => (
                <div key={step.title} className="flex items-center gap-6 group">
                  <div className="transition-transform duration-500 group-hover:translate-x-4 group-hover:rotate-12" style={{ willChange: 'transform' }}>
                    {processIcons[i]}
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-semibold mb-1" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>{step.title}</div>
                    <div className="text-base md:text-lg text-gray-700 font-medium">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Who Benefits Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Hubspot Form - dark mode */}
            <div className="bg-black rounded-2xl shadow-2xl p-8 mb-4 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Fill up the contact form below to get in touch!</h3>
              <p className="text-center text-gray-300 mb-8">Don’t submit a contact form for guest posts. For guest post inquiries, please reach out to <a href="mailto:marketing@expressanalytics.net" className="text-pink-400 underline">marketing@expressanalytics.net</a></p>
              <div className="hubspot-form-wrapper w-full max-w-lg mx-auto">
                <div id="hubspot-form-placeholder"></div>
              </div>
              <style>{`
                #hubspot-form-placeholder form {
                  background: transparent !important;
                  color: #fff !important;
                  width: 100% !important;
                  padding: 0 !important;
                  display: flex !important;
                  flex-wrap: wrap !important;
                  gap: 1.5rem !important;
                }
                #hubspot-form-placeholder .hs-form-field {
                  width: 48% !important;
                  min-width: 220px !important;
                  margin-bottom: 1.5rem !important;
                }
                /* Make Work Email and Message fields full width */
                #hubspot-form-placeholder .hs_email.hs-form-field,
                #hubspot-form-placeholder .hs_emailaddress.hs-form-field,
                #hubspot-form-placeholder .hs_message.hs-form-field,
                #hubspot-form-placeholder textarea,
                #hubspot-form-placeholder input[type="email"] {
                  width: 100% !important;
                  min-width: 100% !important;
                }
                /* Make phone number input match other input widths */
                #hubspot-form-placeholder .hs_phone.hs-form-field,
                #hubspot-form-placeholder input[type="tel"] {
                  width: 48% !important;
                  min-width: 220px !important;
                }
                /* Make submit button full width */
                #hubspot-form-placeholder .hs-button {
                  width: 100% !important;
                  min-width: 100% !important;
                }
                @media (max-width: 768px) {
                  #hubspot-form-placeholder form {
                    flex-direction: column !important;
                    gap: 0.5rem !important;
                  }
                  #hubspot-form-placeholder .hs-form-field {
                    width: 100% !important;
                  }
                  #hubspot-form-placeholder .hs_phone.hs-form-field,
                  #hubspot-form-placeholder input[type="tel"] {
                    width: 100% !important;
                  }
                }
                #hubspot-form-placeholder label {
                  color: #fff !important;
                  font-weight: 600;
                }
                #hubspot-form-placeholder input, #hubspot-form-placeholder textarea, #hubspot-form-placeholder select {
                  background: #18181b !important;
                  color: #fff !important;
                  border-radius: 0.5rem !important;
                  border: 1px solid #333 !important;
                  width: 100% !important;
                  padding: 0.75rem 1rem !important;
                  font-size: 1rem !important;
                  margin-bottom: 0.5rem !important;
                }
                #hubspot-form-placeholder input::placeholder, #hubspot-form-placeholder textarea::placeholder {
                  color: #bbb !important;
                }
                #hubspot-form-placeholder .hs-button {
                  background: linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%) !important;
                  color: #fff !important;
                  font-weight: bold;
                  border-radius: 0.5rem !important;
                  border: none !important;
                  width: 100% !important;
                  padding: 0.85rem 0 !important;
                  font-size: 1.15rem !important;
                  margin-top: 1.25rem !important;
                  margin-bottom: 0.5rem !important;
                }
                #hubspot-form-placeholder .hs-error-msgs, #hubspot-form-placeholder .hs-error-msg {
                  color: #ffb4b4 !important;
                }
                #hubspot-form-placeholder .actions {
                  width: 100% !important;
                }
                #hubspot-form-placeholder .hs-form-booleancheckbox-display {
                  margin-bottom: 1.25rem !important;
                }
                #hubspot-form-placeholder .hs-form {
                  width: 100% !important;
                }
              `}</style>
            </div>
            {/* Right side: Who Can Benefit + Calendar Booking (light) */}
            <div className="flex flex-col gap-8 items-stretch">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-white flex flex-col gap-4 mb-4">
                <h4 className="text-2xl font-semibold mb-2" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who Can Benefit from VOCA?</h4>
                <ul className="list-disc list-inside text-base text-white/90">
                  <li>CMOs & Brand Strategists: Craft more impactful messaging using the voice of customer analysis.</li>
                  <li>Product & CX Teams: Pinpoint pain points and customize experiences based on real-time feedback.</li>
                  <li>Support & CRM Leaders: Enhance Net Promoter Score (NPS) and response effectiveness with early warning signals.</li>
                  <li>Agencies & Consultants: Provide white-labeled voice of customer solutions with compelling visual impact.</li>
                  <li>Retail, Hospitality, Healthcare, BFSI Brands: Decipher regional trends, improve reviews, and optimize services.</li>
                </ul>
              </div>
              {/* Calendar Booking - light theme, smaller */}
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center w-full max-w-md mx-auto">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Book a Consultation with us!</h4>
                <div className="w-full mb-4">
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 250, background: '#fff', borderRadius: '1rem', color: '#222', fontSize: '0.95rem' }}
                    selectable
                    onSelectSlot={slotInfo => setSelectedDate(slotInfo.start)}
                    views={['month']}
                  />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-gray-900 font-semibold mb-1">Select Date</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={date => setSelectedDate(date)}
                      minDate={new Date()}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                      placeholderText="Choose a date"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-900 font-semibold mb-1">Select Time</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                      value={selectedTime || ''}
                      onChange={e => setSelectedTime(e.target.value)}
                    >
                      <option value="">Choose a time</option>
                      {timeOptions.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  className="w-full mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-700 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
                  onClick={handleBooking}
                >
                  Schedule Booking
                </button>
                {confirmation && (
                  <div className="mt-4 text-green-600 font-semibold text-center">{confirmation}</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Related Solutions & Services Section */}
      <section className="py-16 bg-gradient-to-br from-white via-purple-50 to-pink-50 border-t-2 border-b-2 border-gradient-main">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Related Solutions & Services</h3>
          <RelatedSolutionsServices />
        </div>
      </section>
      <Footer />
    </div>
  );
}

import AnalyticsSolutions from '../../components/AnalyticsSolutions';
import ServicesSection from '../../components/ServicesSection';

const analyticsSolutions = [
  {
    key: 'voca',
    label: 'VOCA',
    image: '/Voice-of-Customer-Analytics-2.webp',
    category: 'Solution',
    summary: 'Voice of Customer Analytics',
    desc: 'Decode sentiment and trends from customer feedback.'
  },
  {
    key: 'multi',
    label: 'Multi-Touch Attribution',
    image: '/Multi-Touch-Attribution-2.webp',
    category: 'Solution',
    summary: 'Know What’s Working. Cut What’s Not.',
    desc: 'Track every customer interaction and invest where it matters.'
  },
  {
    key: 'clv',
    label: 'Customer Lifetime Value',
    image: '/Customer-Lifetime-Value-2-1.webp',
    category: 'Solution',
    summary: 'Find Your Best Customers—and Keep Them.',
    desc: 'Identify high-value customers and optimize marketing spend.'
  },
  {
    key: 'mix',
    label: 'Marketing Mix Modeling',
    image: '/Marketing-Mix-Modeling-2.webp',
    category: 'Solution',
    summary: 'Optimize Marketing Performance with Data-Driven Analysis',
    desc: 'Measure, predict, and optimize marketing performance.'
  },
  {
    key: 'recommend',
    label: 'Recommendation Engine',
    image: '/Recommendation-Engine-2.webp',
    category: 'Solution',
    summary: 'Smart Suggestions. Bigger Sales. Happier Customers.',
    desc: 'Deliver personalized product suggestions that boost conversions.'
  },
];

const analyticsServices = [
  {
    key: 'customer',
    label: 'Customer Analytics',
    image: '/customer-analytics.mp4',
    category: 'Service',
    summary: 'Understand Customer Behavior with Data-Driven Insights',
    desc: 'Identify purchasing patterns, preferences, and future actions.'
  },
  {
    key: 'marketing',
    label: 'Marketing Analytics',
    image: '/marketing-analytics.mp4',
    category: 'Service',
    summary: 'Optimize Marketing Efforts with Data-Backed Strategies',
    desc: 'Know what’s working, where to invest, and how to reach your audience.'
  },
  {
    key: 'visualization',
    label: 'Data Visualization',
    image: '/visualization.mp4',
    category: 'Service',
    summary: 'Transform Complex Data into Clear, Actionable Insights',
    desc: 'Turn raw numbers into intuitive dashboards and insights.'
  },
  {
    key: 'business',
    label: 'Business Intelligence',
    image: '/businessi.mp4',
    category: 'Service',
    summary: 'Leverage Data-Driven Strategies for Smarter Decision-Making',
    desc: 'Track performance, predict trends, and make informed decisions.'
  },
  {
    key: 'cleaning',
    label: 'Data Cleaning',
    image: '/datacleaning.mp4',
    category: 'Service',
    summary: 'Ensure Data Accuracy for Reliable Business Insights',
    desc: 'Clean, validate, and transform your data for trustworthy insights.'
  },
];

function RelatedSolutionsServices() {
  const cards = [...analyticsSolutions, ...analyticsServices];
  const CARDS_PER_PAGE = 4;
  const [page, setPage] = useState(0);
  const numPages = Math.ceil(cards.length / CARDS_PER_PAGE);
  const paginated = cards.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {paginated.map(card => (
          <div key={card.key} className="bg-white rounded-2xl shadow-xl border-2 border-gradient-main p-4 flex flex-col items-center transition-transform hover:scale-105 group">
            <div className="w-full h-36 flex items-center justify-center mb-4">
              {card.image.endsWith('.mp4') ? (
                <video src={card.image} className="rounded-xl w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                <img src={card.image} alt={card.label} className="rounded-xl w-full h-full object-cover" />
              )}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-gradient-main mb-1">{card.category}</div>
            <div className="text-lg font-semibold text-gray-900 mb-1 text-center group-hover:text-pink-600 transition-colors">{card.label}</div>
            <div className="text-sm text-gray-600 text-center mb-2">{card.summary}</div>
            <div className="text-xs text-gray-400 text-center mb-2">{card.desc}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold border-2 border-gradient-main bg-white text-pink-600 shadow transition disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: numPages }).map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === page ? 'bg-gradient-main' : 'bg-gray-300'} transition-all`}
              onClick={() => setPage(idx)}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
        <button
          className={`px-4 py-2 rounded-lg font-semibold border-2 border-gradient-main bg-white text-pink-600 shadow transition disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => setPage(page + 1)}
          disabled={page === numPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
