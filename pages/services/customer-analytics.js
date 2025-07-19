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
      label: 'Customer Satisfaction',
      data: [80, 120, 110, 150, 130, 170, 200, 180, 160, 170, 190, 210],
      backgroundColor: 'rgba(155, 81, 224, 0.8)',
      borderRadius: 8,
      barPercentage: 0.6,
    },
    {
      label: 'Engagement',
      data: [60, 90, 80, 120, 100, 140, 170, 150, 130, 140, 160, 180],
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

export default function CustomerAnalytics() {
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
      question: 'Why Choose Express Analytics?',
      answer: 'We offer different customer acquisition strategies as part of the customer acquisition process. By analyzing data like a customer’s historical transactions and interactions, Express Analytics helps you identify customers who may be at risk of discontinuing a product or service, thereby controlling the rate of customer attrition. Express Analytics uses advanced data analysis techniques to collect information related to your clients. The company provides customer analytics consulting services to improve customer retention, CLV and grow your business. We are engaged in offering customized solutions tailored to match your goals, and are available to provide continuous support.'
    },
    {
      question: 'What is customer segmentation and why is it important?',
      answer: 'Customer segmentation is the process of dividing customers into groups based on shared characteristics, behaviors, or value. It is important because it allows businesses to target marketing efforts, personalize experiences, and allocate resources more efficiently, ultimately increasing engagement and profitability.'
    },
    {
      question: 'How does Express Analytics help improve customer retention?',
      answer: 'Express Analytics uses advanced data analysis and machine learning to identify customers at risk of churning, understand their behavior, and recommend targeted actions. By monitoring satisfaction scores, conducting cohort analysis, and providing actionable insights, we help businesses retain more customers and maximize lifetime value.'
    },
    {
      question: 'What types of businesses benefit from customer analytics?',
      answer: 'Any business that interacts with customers can benefit from customer analytics, including e-commerce, retail, marketing teams, product teams, customer support, and sales. Our solutions are designed for CMOs, business leaders, and organizations looking to personalize campaigns, optimize spend, and drive growth.'
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
              Attract, Engage & Retain your best Customers
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
              Customer Analytics Services
            </h1>
            <p className="max-w-2xl mx-auto mb-6 text-base md:text-lg text-center text-gray-700 font-medium fade-up-3">
              Use Express Analytics’ proven AI solutions to increase customer research. We at Express Analytics offer strategic CX consulting along with experienced resources to implement complete data analytics solutions.
            </p>
            <button
              className="fade-up-4 flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-bold text-lg shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{
                background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)',
                color: '#fff',
                boxShadow: '0 4px 24px 0 rgba(155,81,224,0.10)',
                minWidth: 280,
                marginBottom: '6.5rem', // Add extra space below the button
              }}
            >
              <DiamondIcon /> Schedule a Consultation
            </button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-full flex justify-center pointer-events-none">
            <img
              src="/dashboard2_main.webp"
              alt="Customer Analytics Hero"
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
          <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">Why Choose Express Analytics?</h4>
          <p className="max-w-4xl mx-auto text-lg md:text-2xl text-gray-700 font-medium">
            We offer different customer acquisition strategies as part of the customer acquisition process. By analyzing data like a customer’s historical transactions and interactions, Express Analytics helps you identify customers at risk of discontinuing a product or service, thereby controlling customer attrition. Express Analytics uses advanced data analysis techniques to collect information related to your clients. The company provides customer analytics consulting services to improve customer retention and CLV and grow your business. We offer customized solutions tailored to your goals and are available to provide continuous support.
          </p>
        </section>

        {/* Our Services Section */}
        <section className="py-16 px-4 bg-gray-50">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-16" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Our Services</h3>
          <div className="flex flex-col gap-16 max-w-6xl mx-auto">
            {/* Customer Profiling Analytics */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                  <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                    <img src="/express-analytics.webp" alt="Customer Profiling Analytics" className="block w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-block mb-4 px-5 py-2 rounded-full bg-gray-100 text-xs font-semibold tracking-widest text-gray-700">Customer Profiling Analytics</div>
                <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Build Smarter Personas with Rich Data</div>
                <div className="text-base md:text-lg text-gray-700 font-medium">Express Analytics has mastered the art and science of profiling customers and modeling analytics based on their buying behavior. Our proprietary algorithms create a profile of your customers based on their long-term behavior and recent browsing activity. This dramatically decreases your cost of conversion and improves the return on marketing spend. We marry customer lifetime value with their journey stage and your product categories. Our algorithms detect which community they naturally align with, leading to micro-segmentation. We strive to achieve a solo segment based on the journey stage, community, and CLTV.</div>
              </div>
            </div>
            {/* Customer Segmentation */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                  <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                    <img src="/customer-segmentation2.webp" alt="Customer Segmentation" className="block w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-block mb-4 px-5 py-2 rounded-full bg-gray-100 text-xs font-semibold tracking-widest text-gray-700">Customer Segmentation</div>
                <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Group Your Audience, Grow Smarter</div>
                <div className="text-base md:text-lg text-gray-700 font-medium">In today’s competitive landscape, complete customer information is a powerful source of competitive advantage for any organization. Our machine learning-based customer analytics solutions segment your customers into personas. We create segments based on different attributes and advanced machine-learning algorithms. Need-based segmentation considers Customer needs & wants to make segments. Value-oriented segmentation makes customers groups based on their economic score (value). RFM segmentation divides customers into best, likely to churn, loyal, etc. based on Recency, frequency, and monetary value of past transactions.</div>
              </div>
            </div>
            {/* Behavioral Analysis */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 flex-shrink-0 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 32px 0 rgba(155,81,224,0.10)' }}>
                  <div style={{ background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)', padding: 4, borderRadius: 24 }}>
                    <img src="/behaviour-analysis1.webp" alt="Behavioral Analysis" className="block w-full h-auto rounded-2xl" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-block mb-4 px-5 py-2 rounded-full bg-gray-100 text-xs font-semibold tracking-widest text-gray-700">Behavioral Analysis</div>
                <div className="mb-2 text-2xl md:text-3xl font-semibold" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Decode What Drives Customer Actions</div>
                <div className="text-base md:text-lg text-gray-700 font-medium">We can predict customer actions with our behavioral analysis models that use machine learning algorithms on large data sets. We use predictive modeling and customer segmentation to get a deeper picture of a customer’s buying habits and preferences. This allows marketers to target each customer segment uniquely in an effective manner, and improve the response rate of campaigns.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Analytics Solutions Include Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-4xl font-semibold text-center mb-4 text-white">Customer analytics solutions include</h3>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white font-medium mb-12 text-center opacity-90">
                Personalize campaigns, predict results, and optimize spend with Express Analytics’ customer analytics solutions built for CMOs and business leaders.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                {/* Customer Satisfaction Scores */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/Customer-Satisfaction-Scores.webp" alt="Customer Satisfaction Scores icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Customer Satisfaction Scores</h4>
                  <p className="text-white opacity-90">Our solutions cover determining and monitoring customer satisfaction scores to understand how perfectly a business matches customer needs.</p>
                </div>
                {/* Cohort Analysis */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/Cohort-Analysis.webp" alt="Cohort Analysis icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Cohort Analysis</h4>
                  <p className="text-white opacity-90">We conduct cohort analysis to investigate customer behavior across the journey of every customer.</p>
                </div>
                {/* Conjoint Analysis */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/Conjoint-Analysis.webp" alt="Conjoint Analysis icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Conjoint Analysis</h4>
                  <p className="text-white opacity-90">Determine the predicted performance of your service or product in the future market.</p>
                </div>
                {/* Voice of customer analysis */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/Voice-of-customer-analysis.webp" alt="Voice of customer analysis icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Voice of customer analysis</h4>
                  <p className="text-white opacity-90">Our solution can gather and examine considerable amounts of VoC data rapidly and perfectly, from invisible market trends to customer preferences.</p>
                </div>
                {/* Look-alike Modeling */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/Look-alike-Modeling.webp" alt="Look-alike Modeling icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Look-alike Modeling</h4>
                  <p className="text-white opacity-90">Help you find and connect with possible customers who look and behave like your ‘absolute’ target group. Identify and effortlessly convert users who are identical to your target group.</p>
                </div>
                {/* Recommendation Engine */}
                <div className="flex flex-col items-center text-center">
                  <span className="mb-4">
                    <img src="/Recommendation-Engine-3.webp" alt="Recommendation Engine icon" className="w-16 h-16 object-contain rounded-xl shadow-lg" />
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-white">Recommendation Engine</h4>
                  <p className="text-white opacity-90">We use an analytics-based personalization system to suggest content according to the behavior and interests of identical visitors.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Analytics and Visualisation Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-white">Gen AI Usage Around the Globe</h3>
              <div className="w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative mt-8" style={{ background: 'linear-gradient(120deg, #f3e6fa 0%, #fff 100%)', border: '1px solid #e5e7eb', zIndex: 2 }}>
                <div className="p-6">
                  <div className="absolute top-0 left-0 w-full px-6 py-4 flex items-center gap-3 text-gray-800 text-lg font-semibold" style={{ background: 'rgba(255,255,255,0.85)', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 3L2 9l10 12 10-12-10-6zm0 2.236L18.618 9 12 19.764 5.382 9 12 5.236zM7.5 9l4.5 8.118L16.5 9H7.5z" fill="#DC1B36" /></svg>
                    Gen AI Usage by Region (2022-2025)
                  </div>
                  <Bar
                    data={{
                      labels: ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East', 'Africa'],
                      datasets: [
                        {
                          label: '2022',
                          data: [65, 50, 40, 20, 10, 5],
                          backgroundColor: 'rgba(155, 81, 224, 0.7)',
                        },
                        {
                          label: '2023',
                          data: [75, 60, 55, 28, 18, 10],
                          backgroundColor: 'rgba(220, 27, 54, 0.7)',
                        },
                        {
                          label: '2024',
                          data: [85, 70, 68, 36, 25, 15],
                          backgroundColor: 'rgba(51, 153, 255, 0.7)',
                        },
                        {
                          label: '2025',
                          data: [92, 80, 80, 45, 32, 20],
                          backgroundColor: 'rgba(0, 200, 83, 0.7)',
                        },
                      ],
                    }}
                    options={{
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
                          stacked: true,
                          ticks: { color: '#222', font: { size: 14 } },
                          grid: { color: 'rgba(0,0,0,0.05)' },
                        },
                        y: {
                          stacked: true,
                          ticks: { color: '#222', font: { size: 14 } },
                          grid: { color: 'rgba(0,0,0,0.05)' },
                          title: {
                            display: true,
                            text: 'Gen AI Adoption (%)',
                            color: '#222',
                            font: { size: 16, weight: 'bold' },
                          },
                          min: 0,
                          max: 100,
                        },
                      },
                    }}
                    className="pt-10"
                  />
                </div>
              </div>
              {/* Analytics Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Sentiment Analysis</h4>
                  <p className="text-gray-700 mb-2">Automatically find the moods and content of customer reviews, emails, or social media posts.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Personalized Marketing</h4>
                  <p className="text-gray-700 mb-2">Increase the productivity of your advertising efforts by personalized advertising.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Cross- and Up-selling</h4>
                  <p className="text-gray-700 mb-2">Shift your marketing efforts to customers where the preferred result is most likely to occur.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Marketing Attribution</h4>
                  <p className="text-gray-700 mb-2">The goal of marketing attribution is to know the value contribution of various marketing channels according to data.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Personalized Product Recommendations</h4>
                  <p className="text-gray-700 mb-2">Allow your customers to find their preferred products via personalized product recommendations.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">Price Optimization</h4>
                  <p className="text-gray-700 mb-2">By defining the best pricing according to past data analysis, businesses can implement dynamic pricing or create promotional campaigns.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Needs Customer Analytics Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who needs customer analytics?</h3>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-medium mb-8 text-center">Read about how we work and then let’s book a call to chat about your project.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Marketing Team</h4>
                <p className="text-gray-700 mb-2">Create lookalike audiences and segments. Deliver the exact message by grouping audiences perfectly and understanding target populations.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Product Team</h4>
                <p className="text-gray-700 mb-2">Measure features, customer journeys, and usage. The product team can test product changes with real audiences.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Customer Support Team</h4>
                <p className="text-gray-700 mb-2">Segregates ‘information’ from garbage data. The support team will get clear knowledge of what’s not working well and how you can enhance your service operations further.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2 text-gradient-main">Sales Team</h4>
                <p className="text-gray-700 mb-2">Identify which services or products are more popular across several market segments by looking at past sales data</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>FAQ’s</h3>
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
                <h4 className="text-2xl font-semibold mb-2" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who Can Benefit from Customer Analytics?</h4>
                <ul className="list-disc list-inside text-base text-white/90">
                  <li>Marketing Team: Create lookalike audiences and segments. Deliver the exact message by grouping audiences perfectly and understanding target populations.</li>
                  <li>Product Team: Measure features, customer journeys, and usage. Test product changes with real audiences.</li>
                  <li>Customer Support Team: Segregate information from noise. Gain clear knowledge of what’s not working and enhance service operations.</li>
                  <li>Sales Team: Identify popular services or products across market segments by analyzing past sales data.</li>
                  <li>Business Leaders & CMOs: Personalize campaigns, predict results, and optimize spend for growth.</li>
                </ul>
                <div className="mt-4 text-pink-300 font-semibold text-center">Ready to Unlock Customer Insights? → Book a Free Demo of Our Customer Analytics Platform</div>
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
