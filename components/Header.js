import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPhoneAlt, FaChartBar, FaBook, FaInfoCircle, FaHeadset, FaChevronDown, FaUsers, FaCogs, FaChartPie, FaPaintBrush, FaDatabase } from 'react-icons/fa';

const menu = [
  {
    label: 'What we do',
    icon: <FaChartBar className="inline-block mr-1 text-pink-600" />,
    mega: [
      {
        heading: 'Analytics Solutions',
        items: [
          { icon: <FaUsers className="inline-block mr-1" />, label: <Link href="/solutions/voice-of-customer-analytics">Voice of Customer Analytics</Link> },
          { icon: <FaCogs className="inline-block mr-1" />, label: <Link href="/solutions/multi-touch-attribution">Multi-Touch Attribution</Link> },
          { icon: <FaChartPie className="inline-block mr-1" />, label: <Link href="/solutions/customer-lifetime-value">Customer Lifetime Value</Link> },
          { icon: <FaChartBar className="inline-block mr-1" />, label: <Link href="/solutions/marketing-mix-modeling-analytics">Marketing Mix-Modeling</Link> },
          { icon: <FaPaintBrush className="inline-block mr-1" />, label: 'Recommendation Engine' },
        ],
      },
      {
        heading: 'Analytics Services',
        items: [
          { icon: <FaUsers className="inline-block mr-1" />, label: 'Customer Analytics', sub: ['Customer Segmentation', 'Lookalike Modeling', 'Sentiment Analysis'] },
          { icon: <FaChartBar className="inline-block mr-1" />, label: 'Marketing Analytics', sub: ['Predictive Analytics', 'Churn Prediction'] },
          { icon: <FaPaintBrush className="inline-block mr-1" />, label: 'Data Visualization', sub: ['Data Reporting and Visualisation'] },
          { icon: <FaDatabase className="inline-block mr-1" />, label: 'Business Intelligence' },
          { icon: <FaCogs className="inline-block mr-1" />, label: 'Data Cleansing' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    icon: <FaBook className="inline-block mr-1 text-pink-600" />,
    submenu: ['Case Studies', 'eBook', 'White Papers', 'Blogs'],
  },
  {
    label: 'Who we are',
    icon: <FaInfoCircle className="inline-block mr-1 text-pink-600" />,
    submenu: ['About us', 'Leadership', 'Our Partners', 'Work with us', 'Write for us'],
  },
  {
    label: 'Contact Us',
    icon: <FaHeadset className="inline-block mr-1 text-pink-600" />,
    submenu: ['Call Sales/Support'],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState({}); // { [colIdx-subIdx]: true }
  const closeTimeout = useRef();

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
                    className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-2xl p-6 flex gap-12 min-w-[800px] z-50 transition-all duration-200 opacity-100 visible animate-fade-in"
                    onMouseEnter={() => handleMenuEnter(idx)}
                    onMouseLeave={handleMenuLeave}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {item.mega.map((col, cidx) => (
                      <div key={col.heading} className="min-w-[300px]">
                        <h4 className="text-lg font-bold text-pink-600 mb-2">{col.heading}</h4>
                        <ul className="space-y-2">
                          {col.items.map((sub, sidx) => {
                            const hasSub = !!sub.sub;
                            const subKey = `${cidx}-${sidx}`;
                            return (
                              <li key={sub.label} className="bg-gray-50 rounded px-2 py-1 hover:bg-pink-50 transition flex flex-col">
                                <span className="flex items-center font-medium text-gray-800 cursor-pointer" onClick={() => hasSub && handleSubToggle(cidx, sidx)}>
                                  {sub.icon} {sub.label}
                                  {hasSub && (
                                    <FaChevronDown className={`ml-1 text-xs text-gray-400 transition-transform duration-200 ${openSub[subKey] ? 'rotate-180' : ''}`} />
                                  )}
                                </span>
                                {hasSub && openSub[subKey] && (
                                  <ul className="ml-6 mt-1 text-sm text-gray-600 space-y-1">
                                    {sub.sub.map((sublabel) => (
                                      <li key={sublabel} className="hover:text-pink-600 cursor-pointer">{sublabel}</li>
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
                          <li key="About us"><Link href="/about-us" className="hover:text-pink-600">About us</Link></li>,
                          <li key="Leadership"><Link href="/leadership" className="hover:text-pink-600">Leadership</Link></li>,
                          <li key="Our Partners"><Link href="/our-partners" className="hover:text-pink-600">Our Partners</Link></li>,
                          <li key="Work with us"><Link href="/careers" className="hover:text-pink-600">Work with us</Link></li>,
                          <li key="Write for us"><Link href="/write-for-us" className="hover:text-pink-600">Write for us</Link></li>,
                        ]
                        : item.submenu.map((sublabel) => (
                          sublabel === 'Contact Us'
                            ? <li key={sublabel}><Link href="/contact-us" className="hover:text-pink-600">Contact Us</Link></li>
                            : <li key={sublabel} className="hover:text-pink-600 cursor-pointer">{sublabel}</li>
                        ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Hamburger for Mobile */}
        <button className="lg:hidden flex flex-col justify-center items-center w-10 h-10 border-2 border-pink-400 rounded-md" onClick={() => setMobileOpen((v) => !v)} aria-label="Open menu">
          <span className={`block w-6 h-0.5 bg-pink-600 mb-1 transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-pink-600 mb-1 ${mobileOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-pink-600 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Phone Number */}
        <div className="hidden md:flex border-2 border-pink-400 rounded-lg px-4 py-2 items-center space-x-2 text-pink-600 font-semibold text-base ml-4">
          <FaPhoneAlt className="inline-block mr-1" />
          <span>+1 (618) 224 3573</span>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-2xl rounded-b-xl px-6 py-4 animate-fade-in">
          <ul className="flex flex-col space-y-4 text-base font-medium text-gray-700">
            {menu.map((item, idx) => (
              <li key={item.label} className="flex flex-col">
                {item.label === 'Contact Us' ? (
                  <Link href="/contact-us" className="flex items-center">
                    {item.icon} {item.label}
                  </Link>
                ) : (
                  <span className="flex items-center">
                    {item.icon} {item.label}
                    {(item.mega || item.submenu) && <FaChevronDown className="ml-1 text-xs" />}
                  </span>
                )}
                {/* Mobile Mega Menu */}
                {item.mega && (
                  <div className="pl-4 mt-2">
                    {item.mega.map((col) => (
                      <div key={col.heading} className="mb-2">
                        <h4 className="text-pink-600 font-bold text-base mb-1">{col.heading}</h4>
                        <ul className="space-y-1">
                          {col.items.map((sub) => (
                            <li key={sub.label} className="flex flex-col">
                              <span className="flex items-center font-medium text-gray-800">{sub.icon} {sub.label}</span>
                              {sub.sub && (
                                <ul className="ml-6 mt-1 text-sm text-gray-600 space-y-1">
                                  {sub.sub.map((sublabel) => (
                                    <li key={sublabel} className="hover:text-pink-600 cursor-pointer">{sublabel}</li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {/* Mobile Submenu */}
                {item.submenu && (
                  <ul className="pl-4 mt-2 space-y-1">
                    {item.label === 'Who we are'
                      ? [
                        <li key="About us"><Link href="/about-us" className="hover:text-pink-600">About us</Link></li>,
                        <li key="Leadership"><Link href="/leadership" className="hover:text-pink-600">Leadership</Link></li>,
                        <li key="Our Partners"><Link href="/our-partners" className="hover:text-pink-600">Our Partners</Link></li>,
                        <li key="Work with us"><Link href="/careers" className="hover:text-pink-600">Work with us</Link></li>,
                        <li key="Write for us"><Link href="/write-for-us" className="hover:text-pink-600">Write for us</Link></li>,
                      ]
                      : item.submenu.map((sublabel) => (
                        sublabel === 'Contact Us'
                          ? <li key={sublabel}><Link href="/contact-us" className="hover:text-pink-600">Contact Us</Link></li>
                          : <li key={sublabel} className="hover:text-pink-600 cursor-pointer">{sublabel}</li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="flex items-center border-t pt-4 mt-4 text-pink-600 font-semibold">
              <FaPhoneAlt className="inline-block mr-2" /> +1 (618) 224 3573
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
