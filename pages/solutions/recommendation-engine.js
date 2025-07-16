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

const DiamondIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 align-middle">
    <path d="M12 3L2 9l10 12 10-12-10-6zm0 2.236L18.618 9 12 19.764 5.382 9 12 5.236zM7.5 9l4.5 8.118L16.5 9H7.5z" fill="#fff" />
  </svg>
);

const features = [
  {
    title: 'Advanced Filtering Algorithms',
    subtitle: 'Content & Collaborative Precision',
    description: 'Our platform utilizes content-based filtering for category or feature-driven recommendations and collaborative filtering to suggest items based on user similarities and purchasing behavior.',
    image: '/Increase-Average-Order-Value.png.webp',
    alt: 'Filtering Algorithms',
  },
  {
    title: 'Real-Time Personalization',
    subtitle: 'Instant Behavioral Responsiveness',
    description: 'The engine dynamically updates recommendations as users browse, ensuring immediate relevance and boosting engagement.',
    image: '/Deliver-more-Engaging-content.png.webp',
    alt: 'Real-Time Personalization',
  },
  {
    title: 'Demographic-Based Recommendations',
    subtitle: 'Audience Segment Understanding',
    description: 'Suggest items tailored to user profiles, including age, location, device type, and purchasing history.',
    image: '/Improve-User-Experience.png.webp',
    alt: 'Demographic Recommendations',
  },
  {
    title: 'Upsell & Cross-Sell Opportunities',
    subtitle: 'Increase Basket Size',
    description: 'Showcase frequently bundled products or trending items to drive upsell and cross-sell opportunities.',
    image: '/Drive-Higher-Profits.png.webp',
    alt: 'Upsell Cross-Sell',
  },
  {
    title: 'Seamless Integration',
    subtitle: 'Plug Into Any Platform',
    description: 'Effortlessly connect with your CMS, CRM, or eCommerce platforms for frictionless setup and scalability.',
    image: '/Plug-Into-Any-Platform.webp',
    alt: 'Seamless Integration',
  },
  {
    title: 'Optimization & Control',
    subtitle: 'Custom Rules & A/B Testing',
    description: 'Define custom recommendation rules and conduct A/B tests to improve personalization strategies continuously.',
    image: '/Custom-Rules-AB-Testing.webp',
    alt: 'Optimization Control',
  },
];

const localizer = momentLocalizer(moment);
const Map = dynamic(() => import('../../components/ContactMap'), { ssr: false });

const processIcons = [
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Data Collection
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2" /></svg>, // Filtering Models
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 16h12M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2" /></svg>, // Modeling and Analysis
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 22l6-12 6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Behavioral Analysis
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Real-Time Suggestions
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 22l6-12 6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Performance Optimization
];
const processSteps = [
  {
    title: 'Data Collection',
    desc: 'Gather comprehensive user data, including interaction logs, purchase history, browsing patterns, and preferences.',
  },
  {
    title: 'Filtering Models',
    desc: 'Implement advanced algorithms such as content-based and collaborative filtering to process collected data.',
  },
  {
    title: 'Modeling and Analysis',
    desc: 'Inspect user profiles to find similarities between products or users for content-backed recommendations.',
  },
  {
    title: 'Behavioral Analysis',
    desc: 'Conduct in-depth analysis of user behavior, examining session data, demographic information, and engagement signals.',
  },
  {
    title: 'Real-Time Suggestions',
    desc: 'Deliver personalized recommendations seamlessly across various touchpoints, including email, website, and mobile applications.',
  },
  {
    title: 'Performance Optimization',
    desc: 'Continuously monitor key performance indicators (KPIs) and utilize A/B testing to refine and enhance the effectiveness of different recommendation models.',
  },
];

const chartData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  datasets: [
    {
      label: 'Recommended Products',
      data: [120, 200, 180, 300, 250, 320, 400, 370, 290, 310, 350, 420],
      backgroundColor: 'rgba(155, 81, 224, 0.8)',
      borderRadius: 8,
      barPercentage: 0.6,
    },
    {
      label: 'User Engagement',
      data: [80, 150, 120, 220, 180, 210, 300, 270, 190, 210, 250, 320],
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

export default function RecommendationEngine() {
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

  // Calendar booking logic
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmation, setConfirmation] = useState('');
  const events = [];
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

  // HubSpot form loader
  useEffect(() => {
    if (typeof window !== 'undefined') {
      function customizeSubmissionMessage() {
        const observer = new MutationObserver(() => {
          const msg = document.querySelector('#hubspot-form-placeholder .submitted-message');
          if (msg) {
            msg.textContent = 'Thanks for submitting the form. Our Experts will get in touch soon.';
            msg.style.color = '#fff';
            msg.style.background = 'none';
            msg.style.fontSize = '1.2rem';
            msg.style.textAlign = 'center';
            msg.style.marginTop = '1.5rem';
            msg.style.fontWeight = 'bold';
          }
        });
        observer.observe(document.getElementById('hubspot-form-placeholder'), { childList: true, subtree: true });
      }
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
              onFormSubmitted: customizeSubmissionMessage,
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
          onFormSubmitted: customizeSubmissionMessage,
        });
      }
    }
  }, []);

  return (
    <div className="bg-white text-gray-900 flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
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
              Predict What They Want. Personalize What You Offer.
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
              Recommendation Engine
            </h1>
            <p className="max-w-2xl mx-auto mb-6 text-base md:text-lg text-center text-gray-700 font-medium fade-up-3">
              Express Analytics enhances customer engagement through predictive personalization. Our AI-powered Recommendation Engine analyzes real-time user behavior and preferences to proactively suggest relevant content or products. This leads to increased engagement, improved conversions, and stronger customer loyalty. Express Analytics’ best recommendation engine services are simple to set up and involve interest-specific, popular, and frequently seen and bought-together items.
            </p>
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
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-full flex justify-center pointer-events-none">
            <img
              src="/Recommendation-Engine.png.webp"
              alt="Recommendation Engine Hero"
              className="w-[690px] max-w-full rounded-3xl shadow-lg object-cover object-bottom slide-in"
              style={{
                marginBottom: '8px',
                background: 'white',
              }}
            />
          </div>
        </section>

        {/* Express Analytics’ Approach Section */}
        <section className="py-16 px-4 text-center bg-white">
          <h3 className="text-3xl md:text-4xl font-semibold mb-4" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Express Analytics’ Approach</h3>
          <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">What is a Recommendation Engine?</h4>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-700 font-medium">
            A recommendation engine is an AI-driven tool that leverages historical user interactions, preferences, and real-time behavior to suggest relevant content, products, or services. Express Analytics’ engine uniquely combines content-based and collaborative filtering to deliver hyper-personalized experiences at scale. Use artificial intelligence for quicker data processing and customer response.
          </p>
        </section>

        {/* Key Features and Tools - Alternating Layout */}
        <section className="py-16 px-4 bg-gray-50">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-16" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Key Features & Tools of Our Express Analytics’ Recommendation Platform</h3>
          <div className="flex flex-col gap-24 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <div key={feature.title} className={`flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-10 md:gap-16`}>
                <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                  <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                    <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                      <img src={feature.image} alt={feature.alt} className="block w-full h-auto rounded-2xl" />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="mb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase opacity-80">{feature.title}</div>
                  <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>{feature.subtitle}</div>
                  <div className="text-base md:text-lg text-gray-700 font-medium">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
              {[
                {
                  title: 'Drive Sales & Conversions',
                  desc: 'Boost conversions through highly relevant product and content suggestions.',
                },
                {
                  title: 'Boost User Engagement',
                  desc: 'Increase on-site time by facilitating discovery.',
                },
                {
                  title: 'Accelerate Buying Decisions',
                  desc: 'Reduce decision fatigue with precise recommendations.',
                },
                {
                  title: 'Enhance Customer Retention',
                  desc: 'Foster loyalty with personalized experiences.',
                },
              ].map((benefit, i) => (
                <div key={benefit.title} className={`flex items-start gap-6 fade-up`} style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
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

        {/* Process Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold mb-4" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>A Five-Step Approach of Recommendation Engine Process</h3>
              <p className="text-lg md:text-xl text-gray-700 mb-8">Ready to Deliver Personalization That Converts? → Book a Free Demo of Our AI-Based Recommendation Engine Today.</p>
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

        {/* Advanced Analytics and Visualisation Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-white">Advanced Analytics and Visualisation</h3>
              <div className="w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative mt-8" style={{ background: 'linear-gradient(120deg, #f3e6fa 0%, #fff 100%)', border: '1px solid #e5e7eb', zIndex: 2 }}>
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

        {/* Benefits Bento Grid Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #fbeff2 0%, #f3e6fa 50%, #f5f7fa 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-gradient-main">Benefits of Recommendation Engine</h3>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-medium mb-8 text-center">
                Recommender Engine is backed by powerful AI algorithms to deliver top-notch recommendations. Increase overall sales and customer satisfaction with our AI-enabled recommendations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Drive Sales & Conversions</h4>
                  <p className="text-gray-700 mb-2">Boost conversions through highly relevant product and content suggestions.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Boost User Engagement</h4>
                  <p className="text-gray-700 mb-2">Increase on-site time by facilitating discovery.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Accelerate Buying Decisions</h4>
                  <p className="text-gray-700 mb-2">Reduce decision fatigue with precise recommendations.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Enhance Customer Retention</h4>
                  <p className="text-gray-700 mb-2">Foster loyalty with personalized experiences.</p>
                </div>
                <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center text-white col-span-1 md:col-span-2">
                  <h4 className="text-xl font-bold mb-2">Want to book an intro call? We can do that!</h4>
                  <button className="mt-4 px-8 py-3 rounded-2xl font-bold text-lg shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-pink-600" style={{ minWidth: 220 }}>Schedule a Consultation</button>
                </div>
              </div>
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
                  flex-direction: column !important;
                  gap: 1rem !important;
                  align-items: stretch !important;
                }
                #hubspot-form-placeholder .hs-form-field {
                  width: 100% !important;
                  min-width: 100% !important;
                  margin-bottom: 1rem !important;
                }
                #hubspot-form-placeholder .hs_email.hs-form-field,
                #hubspot-form-placeholder .hs_emailaddress.hs-form-field,
                #hubspot-form-placeholder .hs_message.hs-form-field,
                #hubspot-form-placeholder textarea,
                #hubspot-form-placeholder input[type="email"] {
                  width: 100% !important;
                  min-width: 100% !important;
                }
                #hubspot-form-placeholder .hs_phone.hs-form-field,
                #hubspot-form-placeholder input[type="tel"] {
                  width: 100% !important;
                  min-width: 100% !important;
                }
                #hubspot-form-placeholder .hs-button {
                  width: 100% !important;
                  min-width: 100% !important;
                  padding-left: 2rem !important;
                  padding-right: 2rem !important;
                  padding-top: 1rem !important;
                  padding-bottom: 1rem !important;
                  background: linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%) !important;
                  color: #fff !important;
                  font-weight: bold;
                  border-radius: 0.5rem !important;
                  border: none !important;
                  font-size: 1.15rem !important;
                  margin-top: 1.25rem !important;
                  margin-bottom: 0.5rem !important;
                  transition: background 0.3s;
                }
                #hubspot-form-placeholder .hs-button:hover {
                  background: linear-gradient(90deg, #9B51E0 0%, #DC1B36 100%) !important;
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
                #hubspot-form-placeholder .submitted-message {
                  color: #fff !important;
                  background: none !important;
                  font-size: 1.2rem !important;
                  text-align: center !important;
                  margin-top: 1.5rem !important;
                  font-weight: bold !important;
                }
              `}</style>
            </div>
            {/* Right side: Who Can Benefit + Calendar Booking (light) */}
            <div className="flex flex-col gap-8 items-stretch">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-white flex flex-col gap-4 mb-4">
                <h4 className="text-2xl font-semibold mb-2" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who Can Benefit from Recommendation Engine Services?</h4>
                <ul className="list-disc list-inside text-base text-white/90">
                  <li>E-Commerce Retailers: Increase average cart size and reduce bounce rates through intelligent product suggestions.</li>
                  <li>Streaming and Media Platforms: Personalize content discovery by recommending shows, videos, or articles that align with user interests.</li>
                  <li>B2B Portals and Marketplaces: Offer tailored suggestions to business users based on industry, company size, and buying cycle.</li>
                  <li>Marketing & Growth Teams: Implement scalable personalization strategies across all customer touchpoints.</li>
                  <li>Agencies & SaaS Providers: Integrate our recommendation tools as embedded features or white-label solutions within your platforms.</li>
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
      <Footer />
    </div>
  );
}
