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
      label: 'Data Quality Improvement',
      data: [85, 90, 92, 95, 97, 98, 99, 99, 99, 99, 99, 99],
      backgroundColor: 'rgba(155, 81, 224, 0.8)',
      borderRadius: 8,
      barPercentage: 0.6,
    },
    {
      label: 'Data Processing Efficiency',
      data: [70, 75, 80, 85, 88, 90, 92, 94, 95, 96, 97, 98],
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

export default function DataCleaningServices() {
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
      question: 'Why Choose Express Analytics for Data Cleaning?',
      answer: 'We offer comprehensive data cleaning services that ensure your data is accurate, consistent, and ready for analysis. Our advanced data cleaning capabilities include duplicate removal, error correction, standardization, and validation to help businesses make better decisions with reliable data.'
    },
    {
      question: 'What is data cleaning and why is it important?',
      answer: 'Data cleaning is the process of identifying and correcting errors, inconsistencies, and inaccuracies in datasets. It is important because clean data ensures accurate analysis, reliable insights, and better decision-making. Poor data quality can lead to incorrect conclusions and poor business outcomes.'
    },
    {
      question: 'How does Express Analytics help improve data quality?',
      answer: 'Express Analytics uses advanced data cleaning techniques and tools to identify and fix data quality issues. By removing duplicates, correcting errors, standardizing formats, and validating data, we ensure your datasets are clean, consistent, and ready for analysis.'
    },
    {
      question: 'What types of businesses benefit from data cleaning?',
      answer: 'Any business that works with data can benefit from data cleaning services, including marketing teams, sales organizations, operations departments, and data science teams. Our solutions are designed for organizations looking to ensure data quality and reliability for better decision-making.'
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
              Ensure Data Quality & Accuracy
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
              Data Cleaning Services
            </h1>
            <p className="max-w-2xl mx-auto mb-6 text-base md:text-lg text-center text-gray-700 font-medium fade-up-3">
              Use Express Analytics' proven data cleaning solutions to ensure your data is accurate, consistent, and ready for analysis. We provide strategic data cleaning consulting along with experienced resources to implement complete data quality solutions.
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
              alt="Data Cleaning Hero"
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
            We offer comprehensive data cleaning services that ensure your data is accurate, consistent, and ready for analysis. Our advanced data cleaning capabilities include duplicate removal, error correction, standardization, and validation to help businesses make better decisions with reliable data.
          </p>
        </section>

        {/* Our Services Section */}
        <section className="py-16 px-4 bg-gray-50">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-16" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Our Services</h3>
          <div className="flex flex-col gap-16 max-w-6xl mx-auto">
            {/* Duplicate Removal */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                  <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                    <img src="/dashboard2_main.webp" alt="Duplicate Removal" className="block w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="mb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase opacity-80">Duplicate Removal</div>
                <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Eliminate Redundant Data</div>
                <div className="text-base md:text-lg text-gray-700 font-medium">Our duplicate removal services identify and eliminate redundant records from your datasets. Using advanced algorithms and fuzzy matching techniques, we ensure your data is clean and free from duplicates that can skew analysis results.</div>
              </div>
            </div>
            {/* Error Correction */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                  <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                    <img src="/dashboard2_main.webp" alt="Error Correction" className="block w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="mb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase opacity-80">Error Correction</div>
                <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Fix Data Inconsistencies</div>
                <div className="text-base md:text-lg text-gray-700 font-medium">Identify and correct errors, inconsistencies, and inaccuracies in your data. Our error correction services use validation rules, pattern recognition, and data quality checks to ensure your datasets are accurate and reliable.</div>
              </div>
            </div>
            {/* Data Standardization */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                  <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                    <img src="/dashboard2_main.webp" alt="Data Standardization" className="block w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="mb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase opacity-80">Data Standardization</div>
                <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Consistent Data Formats</div>
                <div className="text-base md:text-lg text-gray-700 font-medium">Standardize data formats, values, and structures across your datasets. Our data standardization services ensure consistency in naming conventions, date formats, address formats, and other data elements for better analysis and reporting.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Cleaning Solutions Include Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-4xl font-semibold text-center mb-4 text-white">Data cleaning solutions include</h3>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white font-medium mb-12 text-center opacity-90">
                Ensure data quality, improve accuracy, and enable better decision-making with Express Analytics' data cleaning solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                {/* Data Validation */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="Data Validation icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Data Validation</h4>
                  <p className="text-white opacity-90">Validate data against predefined rules and constraints to ensure accuracy and completeness.</p>
                </div>
                {/* Missing Data Handling */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="Missing Data Handling icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Missing Data Handling</h4>
                  <p className="text-white opacity-90">Identify and handle missing data through imputation, deletion, or other appropriate methods.</p>
                </div>
                {/* Outlier Detection */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="Outlier Detection icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Outlier Detection</h4>
                  <p className="text-white opacity-90">Identify and handle outliers that may skew analysis results and affect data quality.</p>
                </div>
                {/* Data Profiling */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="Data Profiling icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Data Profiling</h4>
                  <p className="text-white opacity-90">Analyze data structure, content, and quality to understand data characteristics and issues.</p>
                </div>
                {/* Data Transformation */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="Data Transformation icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Data Transformation</h4>
                  <p className="text-white opacity-90">Transform data into the required format for analysis, reporting, and integration.</p>
                </div>
                {/* Quality Monitoring */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/dashboard2_main.webp" alt="Quality Monitoring icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Quality Monitoring</h4>
                  <p className="text-white opacity-90">Continuously monitor data quality and implement automated checks to maintain data integrity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Analytics and Visualisation Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-white">Data Quality Performance Analytics</h3>
              <div className="w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative mt-8" style={{ background: 'linear-gradient(120deg, #f3e6fa 0%, #fff 100%)', border: '1px solid #e5e7eb', zIndex: 2 }}>
                <div className="p-6">
                  <div className="absolute top-0 left-0 w-full px-6 py-4 flex items-center gap-3 text-gray-800 text-lg font-semibold" style={{ background: 'rgba(255,255,255,0.85)', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 3L2 9l10 12 10-12-10-6zm0 2.236L18.618 9 12 19.764 5.382 9 12 5.236zM7.5 9l4.5 8.118L16.5 9H7.5z" fill="#DC1B36" /></svg>
                    Data Quality Improvement Over Time (2022-2025)
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
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Data Validation</h4>
                  <p className="text-gray-700 mb-2">Validate data against predefined rules and constraints to ensure accuracy and completeness.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Duplicate Removal</h4>
                  <p className="text-gray-700 mb-2">Identify and eliminate redundant records to ensure data integrity and accuracy.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Error Correction</h4>
                  <p className="text-gray-700 mb-2">Fix data inconsistencies and errors to improve data quality and reliability.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Data Standardization</h4>
                  <p className="text-gray-700 mb-2">Standardize data formats and values for consistency across datasets.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Quality Monitoring</h4>
                  <p className="text-gray-700 mb-2">Continuously monitor data quality and implement automated checks.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Data Transformation</h4>
                  <p className="text-gray-700 mb-2">Transform data into required formats for analysis and integration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Needs Data Cleaning Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who needs data cleaning?</h3>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-medium mb-8 text-center">Read about how we work and then let's book a call to chat about your project.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Data Science Teams</h4>
                <p className="text-gray-700 mb-2">Ensure data quality and accuracy for machine learning models and advanced analytics projects.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Business Intelligence Teams</h4>
                <p className="text-gray-700 mb-2">Clean and prepare data for reporting, dashboards, and business intelligence solutions.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Marketing & Sales Teams</h4>
                <p className="text-gray-700 mb-2">Ensure customer data quality for accurate targeting, segmentation, and campaign analysis.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Operations Teams</h4>
                <p className="text-gray-700 mb-2">Clean operational data for process optimization and performance monitoring.</p>
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
                <h4 className="text-2xl font-semibold mb-2" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who Can Benefit from Data Cleaning?</h4>
                <ul className="list-disc list-inside text-base text-white/90">
                  <li>Data Science Teams: Ensure data quality for machine learning models and analytics projects.</li>
                  <li>Business Intelligence Teams: Clean data for reporting, dashboards, and BI solutions.</li>
                  <li>Marketing & Sales Teams: Ensure customer data quality for accurate targeting and analysis.</li>
                  <li>Operations Teams: Clean operational data for process optimization and monitoring.</li>
                  <li>Data Teams: Implement data quality frameworks and automated cleaning processes.</li>
                </ul>
                <div className="mt-4 text-pink-300 font-semibold text-center">Ready to Improve Your Data Quality? → Book a Free Demo of Our Data Cleaning Platform</div>
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
