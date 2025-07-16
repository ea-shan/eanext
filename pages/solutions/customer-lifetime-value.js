import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, { useEffect, useRef, useState } from 'react';
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
    title: 'Predictive CLV Modeling',
    subtitle: 'Forecast Customer Value',
    description: 'Utilize machine learning to calculate future customer value based on historical data, purchase patterns, and engagement metrics.',
    image: '/Forecast-Customer-Value-1.webp',
    alt: 'Predictive CLV Modeling',
  },
  {
    title: 'Customer Segmentation',
    subtitle: 'Prioritize High-Value Audiences',
    description: 'Segment customers by their projected value to concentrate on acquisition and retention strategies where they will have the most significant impact.',
    image: '/Prioritize-High-Value-Audiences-1.webp',
    alt: 'Customer Segmentation',
  },
  {
    title: 'Cohort & RFM Analysis',
    subtitle: 'Understand Retention Trends',
    description: 'Track customer behavior over time by grouping them into cohorts or applying Recency, Frequency, and Monetary (RFM) value metrics.',
    image: '/Understand-Retention-Trends-1.webp',
    alt: 'Cohort & RFM Analysis',
  },
  {
    title: 'Real-Time Dashboards',
    subtitle: 'Monitor CLV in Action',
    description: 'Visualize trends and monitor customer lifetime value across various segments, regions, and channels.',
    image: '/Monitor-CLV-in-Action-1.webp',
    alt: 'Real-Time Dashboards',
  },
  {
    title: 'Integration Ready',
    subtitle: 'Connect Across Systems',
    description: 'Our CLV platform seamlessly integrates with CRMs, marketing platforms, and BI tools for effortless data flow.',
    image: '/Connect-Across-Systems-1.webp',
    alt: 'Integration Ready',
  },
  {
    title: 'Churn & Upsell Prediction',
    subtitle: 'Prevent Loss, Maximize Gain',
    description: 'Identify potential churn risks and lucrative upsell opportunities by analyzing behavioral patterns and real-time scoring.',
    image: '/Prevent-Loss-Maximize-Gain-1.webp',
    alt: 'Churn & Upsell Prediction',
  },
];

const benefits = [
  {
    title: 'Better Retention',
    desc: 'Engage customers effectively based on their predicted value and churn risk.',
  },
  {
    title: 'Informed Acquisition',
    desc: 'Allocate budget towards leads with high potential CLTV.',
  },
  {
    title: 'Marketing Efficiency',
    desc: 'Design campaigns tailored to the most profitable customer segments.',
  },
  {
    title: 'Smarter Forecasting',
    desc: 'Project revenue with increased confidence using reliable CLV analysis.',
  },
  {
    title: 'Strategic Decision-Making',
    desc: 'Align teams around long-term growth metrics for cohesive strategies.',
  },
  {
    title: 'Improved Profitability',
    desc: 'Maximize return on investment by concentrating on factors that drive customer lifetime value.',
  },
];

const applications = [
  {
    title: 'Reduce Churn',
    desc: 'Identify customers at high risk of leaving and offer timely incentives to encourage retention.',
    icon: '/Reduce-Churn.webp',
  },
  {
    title: 'Optimize Marketing',
    desc: 'Segment customers by their value and direct marketing efforts towards high-CLV groups for improved return on investment.',
    icon: '/Optimize-Marketing.webp',
  },
  {
    title: 'Inform Product Strategy',
    desc: 'Prioritize the development and enhancement of products that cater to high-value customer segments.',
    icon: '/Inform-Product-Strategy.webp',
  },
  {
    title: 'Guide Pricing',
    desc: 'Adjust pricing strategies based on insights into customers’ long-term profitability.',
    icon: '/Guide-Pricing.webp',
  },
  {
    title: 'Design Loyalty Programs',
    desc: 'Create loyalty initiatives specifically designed to align with top-tier customers’ behaviors and potential lifetime value.',
    icon: '/Design-Loyalty.webp',
  },
  {
    title: 'Forecast Customer Behavior',
    desc: 'Predict future revenue potential from customers to make more informed decisions regarding acquisition and budgeting.',
    icon: '/Forecast-Customer.webp',
  },
];

const localizer = momentLocalizer(moment);
const Map = dynamic(() => import('../../components/ContactMap'), { ssr: false });

export default function CustomerLifetimeValue() {
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

  // Chart data and options (dummy data for now)
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Predicted CLV',
        data: [320, 450, 380, 600, 420, 500, 700, 650, 480, 520, 610, 700],
        backgroundColor: 'rgba(155, 81, 224, 0.8)',
        borderRadius: 8,
        barPercentage: 0.6,
      },
      {
        label: 'Churn Risk',
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

  // CLV Process steps
  const processIcons = [
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Data Aggregation
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2" /></svg>, // Behavioral Modeling
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 16h12M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2" /></svg>, // CLV Calculation
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 22l6-12 6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Segmentation & Targeting
  ];
  const processSteps = [
    {
      title: 'Data Aggregation',
      desc: 'Consolidate data from purchases, CRM systems, loyalty programs, and customer touchpoints.',
    },
    {
      title: 'Behavioral Modeling',
      desc: 'Analyze spending habits, purchase frequency, and engagement signals to understand customer behavior.',
    },
    {
      title: 'CLV Calculation',
      desc: 'Employ statistical and machine learning models to predict future customer value accurately.',
    },
    {
      title: 'Segmentation & Targeting',
      desc: 'Categorize customers based on their value, loyalty, and propensity to churn.',
    },
  ];

  // Calendar booking logic (from contact-us.js)
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

  // Extra Card Section (hover effect)
  const [hovered, setHovered] = useState(-1);
  const cardData = [
    {
      title: 'Better Retention',
      desc: 'Engage customers effectively based on their predicted value and churn risk.',
      color: 'from-pink-600 to-purple-500',
      icon: (
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" /><path d="M17 13v-2a5 5 0 10-10 0v2a2 2 0 002 2h6a2 2 0 002-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 17v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      ),
    },
    {
      title: 'Informed Acquisition',
      desc: 'Allocate budget towards leads with high potential CLTV.',
      color: 'from-blue-600 to-cyan-500',
      icon: (
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" /><path d="M8 17l4-4 4 4M12 13V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ),
    },
    {
      title: 'Marketing Efficiency',
      desc: 'Design campaigns tailored to the most profitable customer segments.',
      color: 'from-green-600 to-lime-500',
      icon: (
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" /><path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      ),
    },
    {
      title: 'Smarter Forecasting',
      desc: 'Project revenue with increased confidence using reliable CLV analysis.',
      color: 'from-yellow-500 to-orange-500',
      icon: (
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" /><path d="M16 17l-4-4-4 4M12 13V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ),
    },
    {
      title: 'Strategic Decision-Making',
      desc: 'Align teams around long-term growth metrics for cohesive strategies.',
      color: 'from-purple-600 to-pink-400',
      icon: (
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" /><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ),
    },
    {
      title: 'Improved Profitability',
      desc: 'Maximize return on investment by concentrating on factors that drive customer lifetime value.',
      color: 'from-amber-600 to-yellow-400',
      icon: (
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" /><path d="M12 17c1.657 0 3-1.343 3-3s-1.343-3-3-3-3-1.343-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      ),
    },
  ];

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
              Know Your Best Customers. Predict Profitability. Grow Smarter.
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
              Customer Lifetime Value Analytics
            </h1>
            <p className="max-w-2xl mx-auto mb-6 text-base md:text-lg text-center text-gray-700 font-medium fade-up-3">
              Express Analytics’ Customer Lifetime Value (CLV) Analytics platform goes beyond the initial sale, empowering businesses to understand, predict, and act on customer value across their entire lifecycle. Our CLV solutions optimize marketing efforts, enhance customer retention, and pinpoint the most profitable customer segments.
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
            <img
              src="/Customer-Lifetime-Value.png.webp"
              alt="Customer Lifetime Value Analytics Hero"
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
          <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">What is Customer Lifetime Value (CLV) Analytics?</h4>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-700 font-medium">
            Customer Lifetime Value Analytics quantifies a customer’s total worth over their entire relationship with your brand. Our platform leverages historical data, predictive analytics, and behavior tracking to construct accurate CLV models. This insight lets you focus on what truly matters: increasing retention, intelligently upselling, and boosting long-term revenue.
          </p>
        </section>

        {/* Key Features and Tools - Alternating Layout */}
        <section className="py-16 px-4 bg-gray-50">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-16" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Key Features & Tools of Express Analytics’ CLV Platform</h3>
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

        {/* Benefits of CLV Section - Card Hover Effect */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center items-center">
            {cardData.map((card, i) => {
              const isHovered = hovered === i;
              const iconColor = isHovered ? '#fff' : '#222';
              return (
                <div
                  key={card.title}
                  className={`flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 w-full aspect-[4/3] min-w-[260px] max-w-[370px] mx-auto group rounded-2xl shadow-lg bg-gray-50 border border-gray-200 hover:shadow-2xl ${isHovered ? 'bg-gradient-to-br ' + card.color + ' text-white scale-105' : 'text-gray-900 hover:bg-gradient-to-br hover:' + card.color + ' hover:text-white hover:scale-105'}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(-1)}
                  style={{ minHeight: 260, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem' }}
                >
                  <div className="mb-4">
                    {React.cloneElement(card.icon, { stroke: iconColor })}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-2">{card.title}</div>
                  <div className="text-base md:text-lg font-medium flex-1 flex items-center justify-center">{card.desc}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Applications of CLV Analytics - Gradient Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-white">How Customer Lifetime Value Analytics Can Be Applied?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                {applications.map((app, idx) => (
                  <div key={app.title} className="flex flex-col items-center text-center">
                    <span className="mb-4">
                      <img src={app.icon} alt={app.title + ' icon'} className="w-16 h-16 object-contain" />
                    </span>
                    <div className="text-xl font-semibold text-white mb-2">{app.title}</div>
                    <div className="text-white text-base opacity-90">{app.desc}</div>
                  </div>
                ))}
              </div>
              {/* ChartJS Bar Chart attached to the bottom of the grid */}
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

        {/* CLV Process Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold mb-4" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Customer Lifetime Value Process</h3>
              <p className="text-lg md:text-xl text-gray-700 mb-8">Want to book an intro call? We can do that!</p>
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
                  flex-direction: column !important;
                  gap: 1.25rem !important;
                }
                #hubspot-form-placeholder .hs-form-field {
                  width: 100% !important;
                  min-width: 100% !important;
                  margin-bottom: 0.75rem !important;
                }
                #hubspot-form-placeholder .hs_email.hs-form-field,
                #hubspot-form-placeholder .hs_emailaddress.hs-form-field,
                #hubspot-form-placeholder .hs_message.hs-form-field,
                #hubspot-form-placeholder textarea,
                #hubspot-form-placeholder input[type="email"] {
                  width: 100% !important;
                  min-width: 100% !important;
                  grid-column: 1 / -1 !important;
                }
                #hubspot-form-placeholder .hs-form-field input,
                #hubspot-form-placeholder .hs-form-field textarea {
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
                  font-size: 1.15rem !important;
                  margin-top: 1.25rem !important;
                  margin-bottom: 0.5rem !important;
                  border-radius: 0.75rem !important;
                  background: linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%) !important;
                  color: #fff !important;
                  font-weight: bold !important;
                  border: none !important;
                  box-shadow: 0 4px 24px 0 rgba(155,81,224,0.10) !important;
                  transition: background 0.2s, box-shadow 0.2s, transform 0.2s !important;
                }
                #hubspot-form-placeholder .hs-button:hover {
                  background: linear-gradient(90deg, #9B51E0 0%, #DC1B36 100%) !important;
                  box-shadow: 0 6px 32px 0 rgba(155,81,224,0.18) !important;
                  transform: scale(1.03) !important;
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
                #hubspot-form-placeholder .submitted-message, #hubspot-form-placeholder .hs-form__thankyou, #hubspot-form-placeholder .hs-form__thank-you, #hubspot-form-placeholder .hs-form__success {
                  color: #fff !important;
                  background: none !important;
                  font-size: 1.15rem !important;
                  font-weight: 600 !important;
                  text-align: center !important;
                  margin-top: 1.5rem !important;
                  margin-bottom: 1.5rem !important;
                }
              `}</style>
            </div>
            {/* Right side: Who Can Benefit + Calendar Booking (light) */}
            <div className="flex flex-col gap-8 items-stretch">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-white flex flex-col gap-4 mb-4">
                <h4 className="text-2xl font-semibold mb-2" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who Can Benefit from CLV Analytics?</h4>
                <ul className="list-disc list-inside text-base text-white/90">
                  <li>E-commerce & Retail Brands: Prioritize and nurture loyal, high-spending shoppers.</li>
                  <li>Marketing & Growth Teams: Execute cost-effective campaigns directly linked to customer value rather than superficial metrics.</li>
                  <li>CX & CRM Leaders: Enhance customer journeys by focusing on long-term value and satisfaction.</li>
                  <li>Financial Planners: Forecast recurring revenue with greater precision and reliability.</li>
                  <li>Subscription Businesses: Effectively reduce churn rates and optimize Lifetime Value to Customer Acquisition Cost (LTV-to-CAC) ratios.</li>
                </ul>
                <div className="mt-4 text-pink-300 font-semibold text-center">Ready to Grow With the Customers Who Matter Most? → Book a Free Demo of Our Customer Lifetime Value Analytics Platform.</div>
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
