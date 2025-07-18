import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const localizer = momentLocalizer(moment);

const modelingTypes = [
  {
    title: 'Behavioral Lookalike Modeling',
    subtitle: 'Find prospects with similar behaviors',
    desc: 'Identify potential customers who exhibit similar browsing patterns, purchase behaviors, and engagement levels as your best customers.',
    image: '/Look-alike-Modeling.webp',
  },
  {
    title: 'Demographic Lookalike Modeling',
    subtitle: 'Target similar demographic profiles',
    desc: 'Find prospects who share key demographic characteristics with your most valuable customers for targeted marketing campaigns.',
    image: '/Look-alike-Modeling.webp',
  },
  {
    title: 'Interest-Based Lookalike Modeling',
    subtitle: 'Connect with similar interests',
    desc: 'Identify prospects who share similar interests, hobbies, and lifestyle preferences with your existing customer base.',
    image: '/Look-alike-Modeling.webp',
  },
  {
    title: 'Purchase Intent Lookalike Modeling',
    subtitle: 'Target high-intent prospects',
    desc: 'Find prospects who are likely to make similar purchases based on their browsing history and online behavior patterns.',
    image: '/Look-alike-Modeling.webp',
  },
  {
    title: 'Geographic Lookalike Modeling',
    subtitle: 'Expand to similar markets',
    desc: 'Identify geographic areas with populations that share characteristics with your current successful markets.',
    image: '/Look-alike-Modeling.webp',
  },
  {
    title: 'Firmographic Lookalike Modeling (B2B)',
    subtitle: 'Find similar business profiles',
    desc: 'Identify businesses with similar size, industry, revenue, and growth patterns as your best B2B customers.',
    image: '/Look-alike-Modeling.webp',
  },
];

const benefits = [
  'Expanded Reach: Scale your marketing efforts by finding new prospects who resemble your best customers.',
  'Improved Conversion Rates: Target audiences with higher likelihood of conversion based on proven customer patterns.',
  'Cost Efficiency: Reduce customer acquisition costs by focusing on high-potential prospects.',
  'Better ROI: Achieve higher returns on marketing spend through more targeted campaigns.',
  'Data-Driven Decisions: Make informed marketing decisions backed by advanced analytics and machine learning.',
  'Scalable Growth: Systematically expand your customer base while maintaining quality and relevance.',
];

const processSteps = [
  {
    title: 'Data Collection & Analysis',
    desc: 'Gather comprehensive data about your existing customers including demographics, behaviors, and purchase patterns.',
  },
  {
    title: 'Seed Audience Definition',
    desc: 'Define your best customer segments that will serve as the foundation for finding similar prospects.',
  },
  {
    title: 'Model Development',
    desc: 'Develop advanced machine learning models to identify patterns and characteristics of your target audience.',
  },
  {
    title: 'Validation & Optimization',
    desc: 'Test and refine the model to ensure accuracy and optimize for maximum conversion potential.',
  },
];

const relatedServices = [
  {
    title: 'Customer Segmentation',
    desc: 'Group your audience for smarter targeting',
    image: '/customer-segmentation.webp',
    link: '/services/customer-analytics/customer-segmentation',
  },
  {
    title: 'Sentiment Analysis',
    desc: 'Understand customer emotions and feedback',
    image: '/Sentiment-Analysis-1.webp',
    link: '/services/customer-analytics/sentiment-analysis',
  },
  {
    title: 'Customer Analytics Services',
    desc: 'Comprehensive customer insights',
    image: '/customer-segmentation.webp',
    link: '/services/customer-analytics',
  },
];

export default function LookalikeModeling() {
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
          <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center py-12 md:py-20">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>
              Find Your Perfect Prospects | Lookalike Modeling Services
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 font-medium mb-6 max-w-2xl mx-auto">
              Scale Your Customer Base with AI-Powered Lookalike Modeling<br />
              Express Analytics helps you identify and target prospects who share characteristics with your best customers.
            </p>
            <a href="#contact" className="inline-block px-8 py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg hover:scale-105 transition-transform mb-8">Schedule a Consultation</a>
            {/* Hero Image Placeholder */}
            <div className="w-full flex justify-center">
              <img
                src="/Look-alike-Modeling.webp"
                alt="Lookalike Modeling Hero"
                className="w-full max-w-md md:max-w-lg h-auto rounded-2xl shadow-xl object-cover bg-gray-200"
              />
            </div>
          </div>
        </section>

        {/* How Express Analytics helps Section */}
        <section className="py-16 px-4 text-center bg-white">
          <h3 className="text-3xl md:text-4xl font-semibold mb-4" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Lookalike Modeling Services</h3>
          <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">How Express Analytics helps with Lookalike Modeling?</h4>
          <div className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-700 font-medium mb-8">
            Our advanced lookalike modeling services use machine learning algorithms to identify prospects who share characteristics with your most valuable customers. This data-driven approach helps you –
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-pink-500">
              <img src="/Improving-personalization-and-campaign-effectiveness.webp" alt="Targeting Icon" className="w-14 h-14 object-contain rounded-xl shadow mb-4" />
              <h5 className="text-xl font-bold mb-2 text-gradient-main">Expand your target audience</h5>
              <p className="text-gray-700">Identify new prospects who are likely to convert based on similarities with your existing customers.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-purple-500">
              <img src="/Identifying-niche-markets.webp" alt="Efficiency Icon" className="w-14 h-14 object-contain rounded-xl shadow mb-4" />
              <h5 className="text-xl font-bold mb-2 text-gradient-main">Improve marketing efficiency</h5>
              <p className="text-gray-700">Reduce customer acquisition costs by targeting prospects with higher conversion potential.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-blue-500">
              <img src="/Understanding-where-customers-are-in-their-journey.webp" alt="ROI Icon" className="w-14 h-14 object-contain rounded-xl shadow mb-4" />
              <h5 className="text-xl font-bold mb-2 text-gradient-main">Increase marketing ROI</h5>
              <p className="text-gray-700">Achieve better returns on marketing spend through more targeted and effective campaigns.</p>
            </div>
          </div>
        </section>

        {/* Modeling Types Grid */}
        <section className="py-16 px-4 bg-gray-50">
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-16" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Our Lookalike Modeling Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {modelingTypes.map((type) => (
              <div key={type.title} className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl shadow-xl p-8">
                <img src={type.image} alt={type.title} className="w-40 h-40 object-contain rounded-2xl shadow-lg mb-4 md:mb-0" />
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">{type.title}</h4>
                  <div className="text-md font-semibold mb-1 text-pink-700">{type.subtitle}</div>
                  <p className="text-gray-700">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Value and Benefits */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(120deg, #DC1B36 0%, #9B51E0 100%)' }}>
            <div className="py-16 px-4 md:px-16 flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-white">Business Value and Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {benefits.map((b, i) => (
                  <div key={i} className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
                    <h4 className="text-xl font-bold mb-2 text-gradient-main">{b.split(':')[0]}</h4>
                    <p className="text-gray-700">{b.split(':').slice(1).join(':').trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Implementation Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {processSteps.map((step) => (
                <div key={step.title} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-start">
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">{step.title}</h4>
                  <p className="text-gray-700">{step.desc}</p>
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
            {/* Right side: Who Benefits + Calendar Booking (light) */}
            <div className="flex flex-col gap-8 items-stretch">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-white flex flex-col gap-4 mb-4">
                <h4 className="text-2xl font-semibold mb-2" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Who Benefits from Lookalike Modeling?</h4>
                <ul className="list-disc list-inside text-base text-white/90">
                  <li>Marketing teams looking to expand their target audience efficiently.</li>
                  <li>Businesses wanting to reduce customer acquisition costs.</li>
                  <li>Companies seeking to improve marketing ROI and conversion rates.</li>
                </ul>
                <div className="mt-4 text-pink-300 font-semibold text-center">Book a Consultation with us!</div>
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

        {/* Related Services Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8" style={{ background: 'linear-gradient(90deg, #DC1B36, #9B51E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent' }}>Related Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((service) => (
                <a key={service.title} href={service.link} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform border-t-4 border-pink-500">
                  <img src={service.image} alt={service.title} className="w-24 h-24 object-contain rounded-xl shadow mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gradient-main">{service.title}</h4>
                  <p className="text-gray-700 mb-2">{service.desc}</p>
                  <span className="text-pink-600 font-semibold mt-2">Learn More →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
