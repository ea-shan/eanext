import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'leaflet/dist/leaflet.css';
import { MdEmail, MdAccessTime } from 'react-icons/md';

const localizer = momentLocalizer(moment);
const Map = dynamic(() => import('../components/ContactMap'), { ssr: false });

const address = {
  line1: '300, Spectrum Centre Drive Suite 400, Irvine, California – 92618',
  lat: 33.659483,
  lng: -117.751526,
};

const infoCards = [
  {
    icon: '/write-us.svg',
    title: 'Write to us',
    desc: 'info@expressanalytics.com',
  },
  {
    icon: '/time-of-work.svg',
    title: 'Time of Work',
    desc: 'Monday - Saturday\n10:00 - 19:00',
  },
];

const events = [];

export default function ContactUs() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    // Hubspot form logic (same as our-partners.js)
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
      // Inject custom CSS for Hubspot form dark mode (same as our-partners.js)
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
        <section className="w-full bg-white pt-16 pb-8 px-4 text-left flex flex-col md:flex-row md:items-start md:justify-between max-w-7xl mx-auto">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-pink-700 font-bold text-lg uppercase mb-2 tracking-widest">Connect with us</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Schedule a Consultation</h1>
            <p className="text-lg text-gray-700 mb-4">{address.line1}</p>
            <div className="flex flex-col sm:flex-row gap-6 mt-6">
              <div className="flex items-center gap-3">
                <span className="inline-block bg-pink-100 p-2 rounded-full">
                  <MdEmail className="text-pink-700 text-2xl" />
                </span>
                <div>
                  <div className="font-semibold text-gray-900">Write to us</div>
                  <div className="text-pink-700 text-sm">info@expressanalytics.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-block bg-pink-100 p-2 rounded-full">
                  <MdAccessTime className="text-pink-700 text-2xl" />
                </span>
                <div>
                  <div className="font-semibold text-gray-900">Time of Work</div>
                  <div className="text-gray-700 text-sm">Monday - Saturday<br />10:00 - 19:00</div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col items-end">
            <div className="w-full max-w-md mb-4 bg-white rounded-xl shadow p-4 border border-gray-200">
              <div className="text-xs font-semibold text-gray-700 mb-1">Corporate Headquarters (USA)</div>
              <div className="text-sm text-gray-900 leading-tight">
                300, Spectrum Centre Drive Suite 400,<br />
                Irvine, California – 92618
              </div>
            </div>
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <Map lat={address.lat} lng={address.lng} />
            </div>
          </div>
        </section>
        {/* Contact Form & Booking */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-700">Fill out the contact form below to get in touch !</h3>
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
        {/* Pricing Section (reuse from screenshot) */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-2 text-pink-700">Pricing</h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-900">Enhanced Analytics at budget <span className="text-pink-600">Price</span></h2>
            <p className="text-center text-gray-700 mb-8">Start with a no-obligation life time free stater plan</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center text-white transition-all duration-300 hover:shadow-2xl hover:ring-4 hover:ring-pink-400/40 hover:ring-offset-2 hover:ring-offset-white">
                <h4 className="text-xl font-bold mb-2">Free</h4>
                <p className="mb-4">For individuals building simple Dashboards.</p>
                <div className="text-4xl font-extrabold mb-2">$0</div>
                <div className="mb-4">Free forever</div>
                <ul className="mb-6 text-left list-disc pl-5">
                  <li>Access to 300 Components</li>
                  <li>Free Analytics Kit</li>
                  <li>1 Project</li>
                  <li>Unlimited AI usage</li>
                  <li>Export Dashboard to Tableau</li>
                  <li>Share with others</li>
                  <li>More awesome features</li>
                </ul>
                <button className="w-full mt-auto px-6 py-3 rounded-lg bg-gradient-main text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform">Join for free</button>
              </div>
              {/* Starter Plan */}
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center text-white relative transition-all duration-300 hover:shadow-2xl hover:ring-4 hover:ring-pink-400/40 hover:ring-offset-2 hover:ring-offset-white">
                <span className="absolute top-4 right-4 bg-pink-600 text-xs font-bold px-3 py-1 rounded-full">Save 10%</span>
                <h4 className="text-xl font-bold mb-2">Starter</h4>
                <p className="mb-4">For teams building advanced Dashboards.</p>
                <div className="text-4xl font-extrabold mb-2">$32</div>
                <div className="mb-4">Per member/month, Billed yearly</div>
                <ul className="mb-6 text-left list-disc pl-5">
                  <li>Access to 300 Components</li>
                  <li>PRO Analytics Kit</li>
                  <li>3 Projects</li>
                  <li>Unlimited AI usage</li>
                  <li>Export Dashboard to Tableau or custom</li>
                  <li>Share with others</li>
                  <li>More awesome features</li>
                </ul>
                <button className="w-full mt-auto px-6 py-3 rounded-lg bg-gradient-main text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform">Try it for free for 7 days</button>
              </div>
              {/* Pro Plan */}
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center text-white relative transition-all duration-300 hover:shadow-2xl hover:ring-4 hover:ring-pink-400/40 hover:ring-offset-2 hover:ring-offset-white">
                <span className="absolute top-4 right-4 bg-pink-600 text-xs font-bold px-3 py-1 rounded-full">Save 25%</span>
                <h4 className="text-xl font-bold mb-2">Pro</h4>
                <p className="mb-4">For teams and professionals building Dashboards.</p>
                <div className="text-4xl font-extrabold mb-2">$40</div>
                <div className="mb-4">Per member/month, Billed yearly</div>
                <ul className="mb-6 text-left list-disc pl-5">
                  <li>Access to 300 Components</li>
                  <li>PRO Analytics Kit</li>
                  <li>Unlimited Project</li>
                  <li>Unlimited AI usage</li>
                  <li>Export Dashboard to Tableau, PDF, or self hosting</li>
                  <li>Share with others</li>
                  <li>More awesome features</li>
                </ul>
                <button className="w-full mt-auto px-6 py-3 rounded-lg bg-gradient-main text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform">Try it for free for 7 days</button>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 text-center bg-black rounded-2xl pt-12 pb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Analyze. Visualize. Take Actions.</h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gradient-main">Unlock the Power of Data with Our Analytics Solutions.</h3>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-10 mb-4 px-4 py-6">
              <span className="inline-block bg-gray-800 text-white px-6 py-3 rounded-xl font-bold">AI Enhanced</span>
              <button className="inline-block bg-gradient-main text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">Schedule a Consultation</button>
              <span className="inline-block bg-gray-800 text-white px-6 py-3 rounded-xl font-bold">Advanced Analytics</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
