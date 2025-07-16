import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FaDatabase, FaChartLine, FaSyncAlt, FaCogs, FaGem } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const localizer = momentLocalizer(moment);

const partnerLogos = [
  '/walmart-1.png.webp',
  '/dermalogica.png.webp',
  '/solar-turbines-1.png.webp',
  '/sempra-1.png.webp',
  '/towerdata1.png.webp',
  '/bbdex1-1.png.webp',
  '/saas-1.png.webp',
  '/igram.png.webp',
  '/databricks_logo.webp',
];

const benefits = [
  {
    title: 'Reach new audiences',
    desc: `Expand your reach and connect with businesses looking for AI-powered analytics solutions. As an Express Analytics partner, you’ll gain access to a network of forward-thinking enterprises eager to harness data-driven insights for more intelligent decision-making.`
  },
  {
    title: 'Drive Revenue',
    desc: `Offering cutting-edge data solutions unlocks new revenue streams. Our AI-driven analytics, customer insights, and marketing intelligence help businesses maximize ROI, allowing you to deliver value while growing your bottom line.`
  },
  {
    title: 'Advance your Business',
    desc: `You can enhance your service offerings with industry-leading analytics capabilities. Whether you specialize in marketing, business intelligence, or technology consulting, partnering with us empowers you with tools to drive innovation and improve client outcomes in a data-driven world.`
  },
];

const whyPartner = [
  {
    title: 'Advanced Data Solution',
    icon: <FaDatabase className="text-pink-600 text-3xl mb-2" />,
    desc: `Leverage AI-powered analytics and business intelligence tools to transform raw data into actionable insights. Our solutions enhance decision-making, optimize marketing strategies, and improve operational efficiency.`
  },
  {
    title: 'Competitive Advantage',
    icon: <FaChartLine className="text-pink-600 text-3xl mb-2" />,
    desc: `Stay ahead in a data-driven market with predictive analytics that provide deeper insights into customer behavior, industry trends, and business performance. Make informed decisions that give you a strategic edge.`
  },
  {
    title: 'Effortless Data Optimization',
    icon: <FaSyncAlt className="text-pink-600 text-3xl mb-2" />,
    desc: `Leverage AI-powered solutions that enhance data accuracy, unify sources, and drive meaningful insights. With our expertise in data transformation, you can eliminate inefficiencies and make every data point work to your advantage.`
  },
  {
    title: 'Scalable and Customizable',
    icon: <FaCogs className="text-pink-600 text-3xl mb-2" />,
    desc: `We offer flexible, scalable solutions that adapt to your evolving business requirements. Whether you need tailored analytics, customized reporting, or advanced data visualization, Express Analytics ensures a perfect fit for your organization.`
  },
];

// Example: No unavailable slots, but you can add events for booked slots
const events = [];

export default function OurPartners() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    // Hubspot form logic (unchanged)
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
              formId: 'd97b4636-bb43-421e-9a51-521f73a8d25a',
              region: 'na1',
              target: '#hubspot-form-placeholder',
            });
          }
        };
        document.body.appendChild(script);
      } else {
        window.hbspt.forms.create({
          portalId: '287495',
          formId: 'd97b4636-bb43-421e-9a51-521f73a8d25a',
          region: 'na1',
          target: '#hubspot-form-placeholder',
        });
      }
      // Inject custom CSS for Hubspot form dark mode
      const style = document.createElement('style');
      style.innerHTML = `
        #hubspot-form-placeholder form {
          background: transparent !important;
          color: #fff !important;
          width: 100% !important;
          padding: 0 !important;
        }
        #hubspot-form-placeholder .hs-form-field {
          width: 100% !important;
          margin-bottom: 1.25rem !important;
        }
        #hubspot-form-placeholder .hs_phone.hs-form-field {
          display: flex !important;
          flex-direction: column !important;
        }
        #hubspot-form-placeholder .hs_phone.hs-form-field label {
          margin-bottom: 0.5rem !important;
          width: 100% !important;
        }
        #hubspot-form-placeholder .hs_phone.hs-form-field > div {
          display: flex !important;
          flex-direction: row !important;
          gap: 0.5rem !important;
          width: 100% !important;
        }
        #hubspot-form-placeholder .hs_phone.hs-form-field select,
        #hubspot-form-placeholder .hs_phone.hs-form-field input {
          width: 50% !important;
          margin-bottom: 0 !important;
        }
        @media (max-width: 640px) {
          #hubspot-form-placeholder .hs_phone.hs-form-field > div {
            flex-direction: column !important;
            gap: 0 !important;
          }
          #hubspot-form-placeholder .hs_phone.hs-form-field select,
          #hubspot-form-placeholder .hs_phone.hs-form-field input {
            width: 100% !important;
            margin-bottom: 0.5rem !important;
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
        @media (max-width: 640px) {
          #hubspot-form-placeholder form {
            padding: 0.5rem !important;
          }
          #hubspot-form-placeholder .hs-form-field {
            margin-bottom: 1rem !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Time options (every 30 min from 9am to 6pm)
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

  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-main pt-16 pb-8 px-4 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2">Express Analytics Partners</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Driving Innovation Together</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl mb-6">
            Express Analytics collaborates with industry leaders to deliver cutting-edge data-driven solutions, AI-powered insights, and customer intelligence. Our strategic partnerships enhance innovation, helping businesses unlock their data’s full potential and drive growth.
          </p>
          <div className="w-full flex justify-center mt-4">
            <Image src="/Innovation-Together-1.webp" alt="Driving Innovation Together" width={600} height={220} className="rounded-2xl shadow-xl object-cover w-full max-w-2xl" />
          </div>
        </section>
        {/* Partners Logos Section */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-700">Our Partners</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
              {partnerLogos.map((logo, idx) => (
                <div key={logo} className="flex items-center justify-center p-4 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
                  <Image src={logo} alt={`Partner ${idx + 1}`} width={120} height={60} className="object-contain w-full h-16" />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-700">Boost Your Outcomes with Partner Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b) => (
                <div key={b.title} className="bg-white rounded-2xl shadow p-8 flex flex-col items-start hover:shadow-xl transition">
                  <h4 className="text-xl font-bold text-pink-700 mb-2">{b.title}</h4>
                  <p className="text-gray-700 text-base">{b.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-main text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform">
                <FaGem className="text-2xl" /> Join Our Partner Network
              </button>
            </div>
          </div>
        </section>
        {/* Why Partner with Us Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-700">Why Partner with Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyPartner.map((w) => (
                <div key={w.title} className="bg-gray-50 rounded-2xl shadow p-8 flex flex-col items-start hover:shadow-xl transition">
                  {w.icon}
                  <h4 className="text-xl font-bold text-pink-700 mb-2">{w.title}</h4>
                  <p className="text-gray-700 text-base">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-extrabold text-center text-pink-700 mb-2">Fill out the contact form below to get in touch !</h3>
            <p className="text-center text-gray-700 mb-8">Don’t submit a contact form for guest posts. For guest post inquiries, please reach out to <a href="mailto:marketing@expressanalytics.net" className="text-pink-600 underline">marketing@expressanalytics.net</a></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Hubspot Form */}
              <div>
                <div className="bg-black rounded-2xl shadow-2xl p-8 mb-4">
                  <div className="hubspot-form-wrapper">
                    <div id="hubspot-form-placeholder"></div>
                  </div>
                </div>
              </div>
              {/* Booking Calendar */}
              <div>
                <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center">
                  <h4 className="text-lg font-bold text-gray-700 mb-4">Book a Consultation with us!</h4>
                  <div className="w-full mb-4">
                    <Calendar
                      localizer={localizer}
                      events={events}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 400, background: 'white', borderRadius: '1rem' }}
                      selectable
                      onSelectSlot={slotInfo => setSelectedDate(slotInfo.start)}
                      views={['month']}
                    />
                  </div>
                  <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 font-semibold mb-1">Select Date</label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        minDate={new Date()}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholderText="Choose a date"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700 font-semibold mb-1">Select Time</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
                    className="w-full mt-2 px-6 py-3 rounded-lg bg-gradient-main text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
