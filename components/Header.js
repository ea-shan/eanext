import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { FaPhoneAlt, FaChartBar, FaBook, FaInfoCircle, FaHeadset, FaChevronDown, FaUsers, FaCogs, FaChartPie, FaPaintBrush, FaDatabase, FaArrowRight, FaTimes, FaMicrophone } from 'react-icons/fa';
import Vapi from '@vapi-ai/web';

const menu = [
  {
    label: 'What we do',
    icon: <FaChartBar className="inline-block mr-1 text-red-600" />,
    mega: [
      {
        heading: 'Analytics Solutions',
        items: [
          { icon: <FaUsers className="inline-block mr-1" />, label: <Link href="/solutions/voice-of-customer-analytics">Voice of Customer Analytics</Link> },
          { icon: <FaCogs className="inline-block mr-1" />, label: <Link href="/solutions/multi-touch-attribution">Multi-Touch Attribution</Link> },
          { icon: <FaChartPie className="inline-block mr-1" />, label: <Link href="/solutions/customer-lifetime-value">Customer Lifetime Value</Link> },
          { icon: <FaChartBar className="inline-block mr-1" />, label: <Link href="/solutions/marketing-mix-modeling-analytics">Marketing Mix-Modeling</Link> },
          { icon: <FaPaintBrush className="inline-block mr-1" />, label: <Link href="/solutions/recommendation-engine">Recommendation Engine</Link> },
        ],
      },
      {
        heading: 'Analytics Services',
        items: [
          {
            icon: <FaUsers className="inline-block mr-1" />,
            label: (
              <Link href="/services/customer-analytics" className="hover:text-red-600">Customer Analytics</Link>
            ),
            sub: [
              'Customer Segmentation',
              'Lookalike Modeling',
              'Sentiment Analysis',
            ],
          },
          {
            icon: <FaChartBar className="inline-block mr-1" />,
            label: 'Marketing Analytics',
            sub: [
              'Predictive Analytics',
              'Churn Prediction',
            ],
          },
          {
            icon: <FaPaintBrush className="inline-block mr-1" />,
            label: 'Data Visualization',
            sub: [
              'Data Reporting and Visualisation',
            ],
          },
          { icon: <FaDatabase className="inline-block mr-1" />, label: 'Business Intelligence' },
          { icon: <FaCogs className="inline-block mr-1" />, label: 'Data Cleansing' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    icon: <FaBook className="inline-block mr-1 text-red-600" />,
    submenu: ['Case Studies', 'eBook', 'White Papers', 'Blogs'],
  },
  {
    label: 'Who we are',
    icon: <FaInfoCircle className="inline-block mr-1 text-red-600" />,
    submenu: ['About us', 'Leadership', 'Our Partners', 'Work with us', 'Write for us'],
  },
  {
    label: 'Contact Us',
    icon: <FaHeadset className="inline-block mr-1 text-red-600" />,
    // submenu: ['Call Sales/Support'],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState({}); // { [colIdx-subIdx]: true }
  const closeTimeout = useRef();
  const [vapiOpen, setVapiOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [callActive, setCallActive] = useState(false);
  const [error, setError] = useState('');
  const vapiApiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
  const vapiAssistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  const vapiRef = useRef();

  useEffect(() => {
    if (!vapiRef.current && vapiApiKey) {
      vapiRef.current = new Vapi({ apiKey: vapiApiKey });
    }
  }, [vapiApiKey]);

  const handleStartCall = useCallback(() => {
    setError('');
    setTranscript('');
    setCallActive(true);
    setIsListening(true);
    if (vapiRef.current && vapiAssistantId) {
      vapiRef.current.start({ assistant: vapiAssistantId });
      vapiRef.current.on('transcript', (data) => {
        setTranscript((prev) => prev + (prev ? '\n' : '') + data.transcript);
      });
      vapiRef.current.on('error', (err) => {
        setError('Voice AI error: ' + (err?.message || 'Unknown error'));
        setCallActive(false);
        setIsListening(false);
      });
      vapiRef.current.on('end', () => {
        setCallActive(false);
        setIsListening(false);
      });
    } else {
      setError('Vapi not initialized or Assistant ID missing.');
      setCallActive(false);
      setIsListening(false);
    }
  }, [vapiAssistantId]);

  const handleEndCall = useCallback(() => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
    setCallActive(false);
    setIsListening(false);
    setTranscript('');
  }, []);

  const closeVapi = () => {
    setVapiOpen(false);
    setCallActive(false);
    setIsListening(false);
    setTranscript('');
    setError('');
  };

  // Helper to handle hover with delay for smooth submenu
  const handleMenuEnter = (idx) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMenu(idx);
  };
  const handleMenuLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 120);
  };

  // Toggle submenu open/close
  const handleSubToggle = (colIdx, subIdx) => {
    setOpenSub((prev) => ({ ...prev, [`${colIdx}-${subIdx}`]: !prev[`${colIdx}-${subIdx}`] }));
  };

  return (
    <>
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S6D5DMTZ4J"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S6D5DMTZ4J');
          `,
        }} />
      </Head>
      <header className="bg-white shadow-md sticky top-0 z-40 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image src="/ea-main.webp" alt="Express Analytics Logo" width={48} height={48} className="w-12 h-12 object-contain group-hover:opacity-80 transition" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-lg" style={{ color: '#DC1B36' }}>express<span style={{ color: '#686b6f' }}> analytics</span></span>
              <span className="text-xs text-gray-500">AI-Powered Smarter Marketing</span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex space-x-8 text-base font-medium text-gray-700">
              {menu.map((item, idx) => (
                <li
                  key={item.label}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleMenuEnter(idx)}
                  onMouseLeave={handleMenuLeave}
                >
                  {item.label === 'Contact Us' ? (
                    <Link href="/contact-us" className="flex items-center">
                      {item.icon} {item.label}
                    </Link>
                  ) : (
                    <span className="flex items-center">
                      {item.icon} {item.label} <FaChevronDown className="ml-1 text-xs" />
                    </span>
                  )}
                  {/* Mega Menu */}
                  {item.mega && openMenu === idx && (
                    <div
                      className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-2xl p-0 flex gap-0 min-w-[1000px] z-50 transition-all duration-200 opacity-100 visible animate-fade-in"
                      onMouseEnter={() => handleMenuEnter(idx)}
                      onMouseLeave={handleMenuLeave}
                      style={{ pointerEvents: 'auto' }}
                    >
                      {/* Left: Dark Card */}
                      <div className="flex flex-col justify-between bg-black rounded-l-xl p-6 min-w-[320px] max-w-[340px] h-full" style={{ minHeight: '340px' }}>
                        <div>
                          <div className="text-lg font-semibold text-red-500 mb-4">Fresh Perspectives, Unmatched Solutions</div>
                          {/* Vapi Agent Support Icon and Text */}
                          <div className="flex flex-col items-center mb-6 mt-2 cursor-pointer group" onClick={() => setVapiOpen(true)}>
                            <FaHeadset className="w-8 h-8 text-white animate-zoom-in-out group-hover:scale-110 transition-transform" />
                            <span className="text-xs mt-2 font-semibold text-white">Agent Support</span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <Link href="/solutions" className="flex items-center gap-1 text-white font-semibold text-base mt-8 group hover:underline">
                            View All <span className="ml-1 inline-block bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white"><FaArrowRight className="text-xs" /></span>
                          </Link>
                        </div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-600 rounded-br-xl" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)', zIndex: 1 }} />
                      </div>
                      {/* Right: Fluid Grid Columns */}
                      <div className="flex-1 flex flex-row gap-12 p-8 bg-white rounded-r-xl min-w-[660px]">
                        {/* Analytics Solutions */}
                        <div className="flex-1 min-w-[260px]">
                          <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Analytics Solutions</div>
                          <ul className="space-y-2">
                            {item.mega[0].items.map((sub, sidx) => (
                              <li key={sub.label} className="flex items-center gap-2 text-base font-medium text-gray-900 hover:text-red-600 transition cursor-pointer">
                                {sub.icon} {sub.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Analytics Services */}
                        <div className="flex-1 min-w-[260px]">
                          <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Analytics Services</div>
                          <ul className="space-y-2">
                            {item.mega[1].items.map((sub, sidx) => {
                              const hasSub = !!sub.sub;
                              const subKey = `1-${sidx}`;
                              return (
                                <li key={sub.label} className="flex flex-col">
                                  <div className="flex items-center gap-2 text-base font-medium text-gray-900 hover:text-red-600 transition cursor-pointer">
                                    {sub.icon} {sub.label}
                                    {hasSub && (
                                      <span
                                        className={`ml-1 text-xs text-gray-400 transition-transform duration-200 ${openSub[subKey] ? 'rotate-180' : ''}`}
                                        onClick={e => { e.stopPropagation(); handleSubToggle(1, sidx); }}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    )}
                                  </div>
                                  {hasSub && openSub[subKey] && (
                                    <ul className="ml-4 mt-1 text-sm text-gray-600 space-y-1 bg-white rounded shadow border border-gray-100 py-2 px-3 z-10">
                                      {sub.sub.map((sublabel) => (
                                        <li key={sublabel} className="hover:text-red-600 cursor-pointer whitespace-nowrap">{sublabel}</li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Simple Submenu */}
                  {item.submenu && openMenu === idx && (
                    <div
                      className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-xl p-4 min-w-[320px] z-50 transition-all duration-200 opacity-100 visible animate-fade-in"
                      onMouseEnter={() => handleMenuEnter(idx)}
                      onMouseLeave={handleMenuLeave}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <ul className="space-y-2">
                        {item.label === 'Who we are'
                          ? [
                            <li key="About us"><Link href="/about-us" className="hover:text-red-600">About us</Link></li>,
                            <li key="Leadership"><Link href="/leadership" className="hover:text-red-600">Leadership</Link></li>,
                            <li key="Our Partners"><Link href="/our-partners" className="hover:text-red-600">Our Partners</Link></li>,
                            <li key="Work with us"><Link href="/careers" className="hover:text-red-600">Work with us</Link></li>,
                            <li key="Write for us"><Link href="/write-for-us" className="hover:text-red-600">Write for us</Link></li>,
                          ]
                          : item.submenu.map((sublabel) => (
                            sublabel === 'Contact Us'
                              ? <li key={sublabel}><Link href="/contact-us" className="hover:text-red-600">Contact Us</Link></li>
                              : <li key={sublabel} className="hover:text-red-600 cursor-pointer">{sublabel}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          {/* Hamburger for Mobile */}
          <button className="lg:hidden flex flex-col justify-center items-center w-10 h-10 border-2 border-red-400 rounded-md" onClick={() => setMobileOpen((v) => !v)} aria-label="Open menu">
            <span className={`block w-6 h-0.5 bg-red-600 mb-1 transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-red-600 mb-1 ${mobileOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-red-600 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          {/* Phone Number */}
          <div className="hidden md:flex border-2 border-red-400 rounded-lg px-4 py-2 items-center space-x-2 text-red-600 font-semibold text-base ml-4">
            <FaPhoneAlt className="inline-block mr-1" />
            <span>+1 (618) 224 3573</span>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white shadow-2xl rounded-b-xl px-6 py-4 animate-fade-in">
            <ul className="flex flex-col space-y-2 text-base font-medium text-gray-700">
              {menu.map((item, idx) => (
                <li key={item.label} className="flex flex-col w-full">
                  <div className="flex items-center justify-between w-full">
                    {item.label === 'Contact Us' ? (
                      <Link href="/contact-us" className="flex items-center w-full">
                        {item.icon} {item.label}
                      </Link>
                    ) : (
                      <span className="flex items-center w-full">
                        {item.icon} {item.label}
                        {(item.mega || item.submenu) && (
                          <span
                            className={`ml-auto text-xs text-gray-400 transition-transform duration-200 ${openMenu === idx ? 'rotate-180' : ''}`}
                            onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === idx ? null : idx); }}
                            style={{ cursor: 'pointer', marginLeft: 'auto' }}
                          >
                            <FaChevronDown />
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  {/* Mobile Mega Menu */}
                  {item.mega && openMenu === idx && (
                    <div className="pl-4 mt-2 flex flex-col gap-4">
                      {item.mega.map((col, cidx) => (
                        <div key={col.heading} className="mb-2">
                          <h4 className="text-red-600 font-bold text-base mb-1">{col.heading}</h4>
                          <ul className="space-y-1">
                            {col.items.map((sub, sidx) => {
                              const hasSub = !!sub.sub;
                              const subKey = `${cidx}-${sidx}`;
                              return (
                                <li key={sub.label} className="flex flex-col w-full">
                                  <div className="flex items-center w-full">
                                    <span className="flex items-center w-full">
                                      {sub.icon} {sub.label}
                                    </span>
                                    {hasSub && (
                                      <span
                                        className={`ml-auto text-xs text-gray-400 transition-transform duration-200 ${openSub[subKey] ? 'rotate-180' : ''}`}
                                        onClick={e => { e.stopPropagation(); handleSubToggle(cidx, sidx); }}
                                        style={{ cursor: 'pointer', marginLeft: 'auto' }}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    )}
                                  </div>
                                  {hasSub && openSub[subKey] && (
                                    <ul className="ml-4 mt-1 text-sm text-gray-600 space-y-1 bg-gray-50 rounded shadow border border-gray-100 py-2 px-3 z-10">
                                      {sub.sub.map((sublabel) => (
                                        <li key={sublabel} className="hover:text-red-600 cursor-pointer whitespace-nowrap">{sublabel}</li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Mobile Submenu */}
                  {item.submenu && openMenu === idx && (
                    <ul className="pl-4 mt-2 space-y-1">
                      {item.label === 'Who we are'
                        ? [
                          <li key="About us"><Link href="/about-us" className="hover:text-red-600">About us</Link></li>,
                          <li key="Leadership"><Link href="/leadership" className="hover:text-red-600">Leadership</Link></li>,
                          <li key="Our Partners"><Link href="/our-partners" className="hover:text-red-600">Our Partners</Link></li>,
                          <li key="Work with us"><Link href="/careers" className="hover:text-red-600">Work with us</Link></li>,
                          <li key="Write for us"><Link href="/write-for-us" className="hover:text-red-600">Write for us</Link></li>,
                        ]
                        : item.submenu.map((sublabel) => (
                          sublabel === 'Contact Us'
                            ? <li key={sublabel}><Link href="/contact-us" className="hover:text-red-600">Contact Us</Link></li>
                            : <li key={sublabel} className="hover:text-red-600 cursor-pointer">{sublabel}</li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="flex items-center border-t pt-4 mt-4 text-gray-600 font-semibold">
                <FaPhoneAlt className="inline-block mr-2" /> +1 (618) 224 3573
              </li>
            </ul>
          </div>
        )}
      </header>
      {vapiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative text-left">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={closeVapi}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <FaHeadset className="text-pink-600 text-2xl" />
              <span className="font-bold text-lg text-gray-900">Express Analytics Voice Support</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={callActive ? handleEndCall : handleStartCall}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition
                  ${callActive ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600'}`}
                disabled={isListening && !callActive}
              >
                <FaMicrophone /> {callActive ? 'End Call' : 'Start Voice Call'}
              </button>
              <div className="mt-2 p-3 bg-gray-100 rounded-lg min-h-[60px] text-gray-800 text-sm font-mono whitespace-pre-wrap">
                {error ? (
                  <span className="text-red-600">{error}</span>
                ) : callActive ? (transcript || 'Listening...') : 'Click "Start Voice Call" to begin.'}
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">Real-time transcript will appear here.</div>
          </div>
        </div>
      )}
    </>
  );
}
