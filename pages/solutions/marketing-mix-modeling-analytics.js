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

const features = [
  {
    title: 'Multi-Channel Attribution',
    subtitle: 'Understanding Media Impact',
    description: 'We evaluate the contribution of each marketing channel to your overall business outcomes using advanced regression-based models.',
    image: '/Multi-Channel-Attribution.webp',
    alt: 'Multi-Channel Attribution',
  },
  {
    title: 'ROI Measurement',
    subtitle: 'Quantifying True Performance',
    description: 'Get precise ROI estimates per channel, enabling you to identify where to increase or decrease investment for optimal results.',
    image: '/ROI.webp',
    alt: 'ROI Measurement',
  },
  {
    title: 'Seasonality & Trends Adjustments',
    subtitle: 'Normalizing Market Conditions',
    description: 'Our models account for seasonal fluctuations, economic cycles, and promotional spikes, ensuring accurate and reliable insights.',
    image: '/Normalizing-Market-Conditions.webp',
    alt: 'Seasonality & Trends Adjustments',
  },
  {
    title: 'Scenario Planning',
    subtitle: 'Simulating Budget Strategies',
    description: 'Model various media mix scenarios to understand trade-offs and forecast outcomes before committing to your budget.',
    image: '/Budget-Strategies-1.webp',
    alt: 'Scenario Planning',
  },
  {
    title: 'Integration-Ready',
    subtitle: 'Seamless Plug & Play',
    description: 'Integrate your existing ad platforms, CRM, and data warehouse to gain a comprehensive view of marketing performance.',
    image: '/Integrate-1.webp',
    alt: 'Integration-Ready',
  },
  {
    title: 'Visual Dashboards',
    subtitle: 'Insights Made Clear',
    description: 'Intuitive dashboards allow your teams to visualize performance, KPIs, and modeling outputs at a glance, making complex data easily digestible.',
    image: '/Visual-Dashboards-1.webp',
    alt: 'Visual Dashboards',
  },
];

const processIcons = [
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Data Collection
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2" /></svg>, // Normalization & Adjustment
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 16h12M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2" /></svg>, // Model Building
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 22l6-12 6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Insights Generation
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Decision Support
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#DC1B36" /><path d="M10 22l6-12 6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>, // Deployment
];
const processSteps = [
  {
    title: 'Data Collection',
    desc: 'Gather data across media spending, promotions, pricing, distribution, and sales.',
  },
  {
    title: 'Normalization & Adjustment',
    desc: 'Control for external factors like seasonality, holidays, or competitor activity.',
  },
  {
    title: 'Model Building',
    desc: 'Apply regression and ML algorithms to create predictive and explanatory models.',
  },
  {
    title: 'Insights Generation',
    desc: 'Interpret the output to provide clear budget, performance, and forecasting insights.',
  },
  {
    title: 'Decision Support',
    desc: 'Use reports and dashboards to plan future campaigns and allocate budgets.',
  },
  {
    title: 'Deployment',
    desc: 'Offer simulation and optimization insight and deploy outcomes to share suggestions',
  },
];

const localizer = momentLocalizer(moment);
const Map = dynamic(() => import('../../components/ContactMap'), { ssr: false });

export default function MarketingMixModeling() {
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
        label: 'MMM Output',
        data: [320, 450, 380, 600, 420, 500, 700, 650, 480, 520, 610, 700],
        backgroundColor: 'rgba(155, 81, 224, 0.8)',
        borderRadius: 8,
        barPercentage: 0.6,
      },
      {
        label: 'ROI',
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
              Measure What Matters. Optimize Every Marketing Dollar.
            </span>
            <h1
              className="text-3xl md:text-6xl font-semibold text-center mb-6 fade-up-2"
              style={{
                background: 'linear-gradient(90deg, #DC1B36, #9B51E0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              }}
            >
              Marketing Mix Modeling Analytics
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-base md:text-lg text-center text-gray-700 font-medium fade-up-3">
              Express Analytics decodes the effectiveness of your marketing activities. Our Marketing Mix Modeling (MMM) solutions utilize advanced statistical techniques and machine learning to quantify the impact of each marketing channel on sales performance. We transform data into clear guidance for budget allocation and strategy, encompassing everything from traditional media to digital campaigns.
            </p>
            {/* Gradient Button with Diamond Icon */}
            <button
              className="fade-up-4 flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-bold text-lg shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-8"
              style={{
                background: 'linear-gradient(90deg, #DC1B36 0%, #9B51E0 100%)',
                color: '#fff',
                boxShadow: '0 4px 24px 0 rgba(155,81,224,0.10)',
                minWidth: 280,
              }}
            >
              Schedule a Consultation
            </button>
          </div>
          {/* Hero Video attached to bottom, at least 690px wide, fully rounded, responsive */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-full flex justify-center">
            <div className="w-[690px] max-w-full rounded-3xl shadow-lg overflow-hidden aspect-video bg-black slide-in" style={{ marginBottom: '8px', background: 'white' }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/YPpS4vNDWK0?rel=0&autoplay=0&modestbranding=1&showinfo=0"
                title="Marketing Mix Modeling Intro"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-3xl"
                style={{ display: 'block' }}
              ></iframe>
            </div>
          </div>
        </section>

        {/* Express Analytics’ Approach Section - Large Text */}
        <section className="py-16 px-4 text-center bg-white">
          <h3 className="text-3xl md:text-4xl font-semibold mb-4" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Express Analytics’ Approach</h3>
          <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">What is Marketing Mix Modeling?</h4>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-700 font-medium">
            Marketing Mix Modeling Analytics is a data-driven technique that quantifies the impact of various marketing inputs, like TV, radio, print, digital, price, and promotions, on sales. Our Market Mix Modeling Module uses historical data and predictive analytics to uncover which levers drive ROI, empowering you to make informed decisions.
          </p>
        </section>

        {/* Key Features and Tools - Alternating Layout */}
        <section className="py-16 px-4 bg-gray-50">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-16" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Key Features & Tools of Express Analytics’ MMM Platform</h3>
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

        {/* MMM Process Section */}
        <section className="py-16 px-4 bg-white">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Marketing Mix Modeling Process</h3>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
            <div className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-pink-50 to-purple-50 p-8 flex flex-col items-center">
              <h4 className="text-xl md:text-2xl font-bold mb-4 text-pink-700">Advanced Analytics and Visualisation</h4>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </section>

        {/* What can you do with Our Market Mix Modeling Module? */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 bento-grid">
            {/* Main description cell - spans two rows on desktop */}
            <div className="md:row-span-2 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-xl p-8 flex flex-col justify-center md:col-span-2">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-pink-700">What can you do with Our Market Mix Modeling Module?</h3>
              <p className="text-lg md:text-xl text-gray-700 font-medium">
                With Market Mix Modeling, you can determine the historical impact of marketing activities on KPIs such as sales, revenue per customer, etc. You can also forecast the impact of a particular marketing campaign before execution and optimize your budget despite various business constraints.
              </p>
            </div>
            {/* Bento grid benefit cards */}
            <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-center border border-pink-100 hover:shadow-2xl transition">
              <div className="text-xl font-bold mb-2 text-pink-700">Channel Saturation</div>
              <div className="text-gray-700">Find out the saturation point of your different channels to improve your media spend across all channels for the best returns.</div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-center border border-purple-100 hover:shadow-2xl transition">
              <div className="text-xl font-bold mb-2 text-purple-700">Campaign Impact Forecast</div>
              <div className="text-gray-700">Estimate the impact of your marketing campaigns before execution based on the predictive models built using historical sales & marketing data.</div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-center border border-pink-100 hover:shadow-2xl transition">
              <div className="text-xl font-bold mb-2 text-pink-700">Reduce CPA</div>
              <div className="text-gray-700">Reduce your CPA by up to 30% by reallocating budgets to more effective channels and significantly improve your return on marketing spend.</div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-center border border-purple-100 hover:shadow-2xl transition">
              <div className="text-xl font-bold mb-2 text-purple-700">Faster Turnaround</div>
              <div className="text-gray-700">Enjoy faster turnaround time and accuracy with up to 50% reduction in turnaround time compared with other solutions in the market.</div>
            </div>
            {/* Arrange a Quick Call card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl shadow-xl p-8 flex flex-col justify-center items-center md:col-span-1 md:row-span-1">
              <div className="text-2xl font-bold mb-2 text-white">Arrange a Quick Call</div>
              <div className="text-gray-200 mb-4 text-center">Speak to our experts for a personalized demo or to get your questions answered in minutes.</div>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow hover:scale-105 transition text-lg">Book Now</button>
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
                <h4 className="text-2xl font-semibold mb-2" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who Can Benefit from MMM Analytics?</h4>
                <ul className="list-disc list-inside text-base text-white/90">
                  <li>CMOs & Marketing Leaders – Justify and optimize every dollar spent across channels.</li>
                  <li>Performance Marketers – Identify the proper drivers of results across digital and traditional media.</li>
                  <li>Finance & Strategy Teams – Align financial goals with marketing effectiveness data.</li>
                  <li>Media Planners & Buyers – Make smarter ad placement decisions backed by modeling.</li>
                  <li>Retail & Consumer Brands – Understand cross-channel interactions and drive profitable sales growth.</li>
                </ul>
                <div className="mt-4 text-pink-300 font-semibold text-center">Ready to Spend Smarter, Not More? → Book a Free Demo of Our Marketing Mix Modeling Solutions Today.</div>
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
