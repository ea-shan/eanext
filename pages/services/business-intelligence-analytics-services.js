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

const localizer = momentLocalizer(moment);
const Map = dynamic(() => import('../../components/ContactMap'), { ssr: false });

const chartData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  datasets: [
    {
      label: 'Business Intelligence ROI',
      data: [150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400, 420],
      backgroundColor: 'rgba(155, 81, 224, 0.8)',
      borderRadius: 8,
      barPercentage: 0.6,
    },
    {
      label: 'Analytics Adoption',
      data: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
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

export default function BusinessIntelligenceAnalyticsServices() {
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

  const faqList = [
    {
      question: 'Why Choose Express Analytics for Business Intelligence?',
      answer: 'We offer comprehensive business intelligence solutions that transform raw data into actionable insights. Our advanced BI capabilities include data warehousing, analytics dashboards, and reporting solutions designed to help businesses make better decisions and drive growth through data-driven strategies.'
    },
    {
      question: 'What is business intelligence and why is it important?',
      answer: 'Business intelligence (BI) is the process of collecting, analyzing, and presenting business data to support decision-making. It is important because it provides organizations with insights into performance, trends, and opportunities, enabling data-driven decisions that improve efficiency and drive growth.'
    },
    {
      question: 'How does Express Analytics help improve business performance?',
      answer: 'Express Analytics uses advanced BI tools and techniques to collect, analyze, and visualize business data. By providing comprehensive dashboards, automated reporting, and predictive analytics, we help businesses identify opportunities, optimize operations, and make informed strategic decisions.'
    },
    {
      question: 'What types of businesses benefit from business intelligence?',
      answer: 'Any business that wants to make data-driven decisions can benefit from business intelligence, including enterprises, mid-size companies, and startups. Our solutions are designed for organizations looking to improve performance, optimize operations, and gain competitive advantages through better data insights.'
    },
  ];
  const [openFAQ, setOpenFAQ] = useState(null);

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
              Drive Growth with Data-Driven Insights
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
              Business Intelligence Analytics Services
            </h1>
            <p className="max-w-2xl mx-auto mb-6 text-base md:text-lg text-center text-gray-700 font-medium fade-up-3">
              Use Express Analytics' proven BI solutions to transform your data into actionable insights. We provide strategic business intelligence consulting along with experienced resources to implement complete BI solutions.
            </p>
            <button
              className="fade-up-4 flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-bold text-lg shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{
                background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)',
                color: '#fff',
                boxShadow: '0 4px 24px 0 rgba(155,81,224,0.10)',
                minWidth: 280,
                marginBottom: '6.5rem',
              }}
            >
              <DiamondIcon /> Schedule a Consultation
            </button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-full flex justify-center pointer-events-none">
            <img
              src="/dashboard2_main.webp"
              alt="Business Intelligence Hero"
              className="w-[690px] max-w-full rounded-3xl shadow-lg object-cover object-bottom slide-in"
              style={{
                marginBottom: '8px',
                background: 'white',
              }}
            />
          </div>
        </section>

        {/* Express Analytics' Approach Section */}
        <section className="py-16 px-4 text-center bg-white">
          <h3 className="text-3xl md:text-4xl font-semibold mb-4" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Express Analytics' Approach</h3>
          <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">Why Choose Express Analytics?</h4>
          <p className="max-w-4xl mx-auto text-lg md:text-2xl text-gray-700 font-medium">
            We offer comprehensive business intelligence solutions that transform raw data into actionable insights. Our advanced BI capabilities include data warehousing, analytics dashboards, and reporting solutions designed to help businesses make better decisions and drive growth through data-driven strategies.
          </p>
        </section>

        {/* Our Services Section */}
        <section className="py-16 px-4 bg-gray-50">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-16" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Our Services</h3>
          <div className="flex flex-col gap-16 max-w-6xl mx-auto">
            {/* Data Warehousing */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                  <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                    <img src="/dashboard2_main.webp" alt="Data Warehousing" className="block w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="mb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase opacity-80">Data Warehousing</div>
                <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Centralized Data Management</div>
                <div className="text-base md:text-lg text-gray-700 font-medium">Our data warehousing solutions provide a centralized repository for all your business data. We design and implement scalable data warehouses that enable efficient data storage, retrieval, and analysis for comprehensive business intelligence.</div>
              </div>
            </div>
            {/* Analytics Dashboards */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                  <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                    <img src="/Visual-Dashboards-1.webp" alt="Analytics Dashboards" className="block w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="mb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase opacity-80">Analytics Dashboards</div>
                <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Real-Time Performance Monitoring</div>
                <div className="text-base md:text-lg text-gray-700 font-medium">Create interactive analytics dashboards that provide real-time visibility into key business metrics. Our dashboards enable users to monitor performance, identify trends, and make data-driven decisions quickly and effectively.</div>
              </div>
            </div>
            {/* Reporting Solutions */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                  <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                    <img src="/Visual-Dashboards-Insights-1.webp" alt="Reporting Solutions" className="block w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="mb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase opacity-80">Reporting Solutions</div>
                <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Automated Insight Delivery</div>
                <div className="text-base md:text-lg text-gray-700 font-medium">Develop comprehensive reporting solutions that automatically generate and deliver insights to stakeholders. From executive summaries to detailed operational reports, we ensure the right information reaches the right people at the right time.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Intelligence Solutions Include Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-4xl font-semibold text-center mb-4 text-white">Business intelligence solutions include</h3>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white font-medium mb-12 text-center opacity-90">
                Transform data into insights, optimize operations, and drive growth with Express Analytics' business intelligence solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                {/* Data Integration */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="Data Integration icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Data Integration</h4>
                  <p className="text-white opacity-90">Connect and integrate data from multiple sources to create a unified view for comprehensive analysis.</p>
                </div>
                {/* Performance Analytics */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/Performance-Optimization.webp" alt="Performance Analytics icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Performance Analytics</h4>
                  <p className="text-white opacity-90">Monitor and analyze business performance metrics to identify opportunities for improvement and optimization.</p>
                </div>
                {/* Predictive Analytics */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/Predictive-Power.webp" alt="Predictive Analytics icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Predictive Analytics</h4>
                  <p className="text-white opacity-90">Forecast future trends and outcomes to support proactive decision-making and strategic planning.</p>
                </div>
                {/* KPI Monitoring */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="KPI Monitoring icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">KPI Monitoring</h4>
                  <p className="text-white opacity-90">Track key performance indicators in real-time to ensure alignment with business goals and objectives.</p>
                </div>
                {/* Data Governance */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="Data Governance icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Data Governance</h4>
                  <p className="text-white opacity-90">Implement data governance frameworks to ensure data quality, security, and compliance across the organization.</p>
                </div>
                {/* Self-Service Analytics */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="Self-Service Analytics icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Self-Service Analytics</h4>
                  <p className="text-white opacity-90">Empower users with self-service analytics tools to explore data and generate insights independently.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Analytics and Visualisation Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-white">Business Intelligence Performance Analytics</h3>
              <div className="w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative mt-8" style={{ background: 'linear-gradient(120deg, #f3e6fa 0%, #fff 100%)', border: '1px solid #e5e7eb', zIndex: 2 }}>
                <div className="p-6">
                  <div className="absolute top-0 left-0 w-full px-6 py-4 flex items-center gap-3 text-gray-800 text-lg font-semibold" style={{ background: 'rgba(255,255,255,0.85)', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 3L2 9l10 12 10-12-10-6zm0 2.236L18.618 9 12 19.764 5.382 9 12 5.236zM7.5 9l4.5 8.118L16.5 9H7.5z" fill="#DC1B36" /></svg>
                    Business Intelligence Impact by Industry (2022-2025)
                  </div>
                  <Bar
                    data={chartData}
                    options={chartOptions}
                    className="pt-10"
                  />
                </div>
              </div>
              {/* Analytics Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Data Integration</h4>
                  <p className="text-gray-700 mb-2">Connect and integrate data from multiple sources to create a unified view for comprehensive analysis.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Performance Monitoring</h4>
                  <p className="text-gray-700 mb-2">Monitor business performance in real-time with interactive dashboards and automated alerts.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Predictive Insights</h4>
                  <p className="text-gray-700 mb-2">Forecast future trends and outcomes to support proactive decision-making and strategic planning.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">KPI Tracking</h4>
                  <p className="text-gray-700 mb-2">Track key performance indicators to ensure alignment with business goals and objectives.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Data Governance</h4>
                  <p className="text-gray-700 mb-2">Implement data governance frameworks to ensure data quality, security, and compliance.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Self-Service Analytics</h4>
                  <p className="text-gray-700 mb-2">Empower users with self-service analytics tools to explore data and generate insights independently.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Needs Business Intelligence Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who needs business intelligence?</h3>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-medium mb-8 text-center">Read about how we work and then let's book a call to chat about your project.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Enterprise Organizations</h4>
                <p className="text-gray-700 mb-2">Large organizations looking to centralize data management and gain comprehensive insights across departments.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Mid-Size Companies</h4>
                <p className="text-gray-700 mb-2">Growing companies seeking to improve decision-making and optimize operations through data-driven insights.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Executive Leadership</h4>
                <p className="text-gray-700 mb-2">C-level executives and business leaders wanting strategic insights to drive growth and competitive advantage.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Operations Teams</h4>
                <p className="text-gray-700 mb-2">Operations and management teams looking to monitor performance and identify improvement opportunities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>FAQ's</h3>
            <div className="space-y-4">
              {faqList.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 rounded-t-xl font-semibold text-lg md:text-xl transition-all duration-200 focus:outline-none text-gradient-main"
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                    aria-expanded={openFAQ === idx}
                  >
                    <span>{faq.question}</span>
                    <span className="text-2xl font-bold">{openFAQ === idx ? '−' : '+'}</span>
                  </button>
                  {openFAQ === idx && (
                    <div className="px-6 pb-6 text-base md:text-lg text-gray-700 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
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
              <p className="text-center text-gray-300 mb-8">Don't submit a contact form for guest posts. For guest post inquiries, please reach out to <a href="mailto:marketing@expressanalytics.net" className="text-pink-400 underline">marketing@expressanalytics.net</a></p>
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
                <h4 className="text-2xl font-semibold mb-2" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who Can Benefit from Business Intelligence?</h4>
                <ul className="list-disc list-inside text-base text-white/90">
                  <li>Enterprise Organizations: Centralize data management and gain comprehensive insights across departments.</li>
                  <li>Mid-Size Companies: Improve decision-making and optimize operations through data-driven insights.</li>
                  <li>Executive Leadership: Access strategic insights to drive growth and competitive advantage.</li>
                  <li>Operations Teams: Monitor performance and identify improvement opportunities.</li>
                  <li>Data Teams: Implement comprehensive BI solutions and data governance frameworks.</li>
                </ul>
                <div className="mt-4 text-pink-300 font-semibold text-center">Ready to Transform Your Business? → Book a Free Demo of Our BI Platform</div>
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
