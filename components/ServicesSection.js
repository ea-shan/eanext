import { useState, useEffect, useRef } from 'react';
import { FaUserFriends, FaChartLine, FaChartBar, FaLightbulb, FaBroom, FaUsers, FaChartPie, FaUserCheck, FaSmile, FaBrain, FaBullseye, FaProjectDiagram, FaChartArea, FaMapMarkedAlt, FaCogs, FaSync, FaCheckCircle, FaExclamationTriangle, FaRobot, FaArrowRight } from 'react-icons/fa';

const services = [
  {
    key: 'customer',
    label: 'Customer Analytics',
    icon: <FaUserFriends className="w-6 h-6 text-white" />, // white icon
    summary: 'Understand Customer Behavior with Data-Driven Insights',
    video: '/customer-analytics.mp4',
    features: [
      { icon: <FaUsers className="text-white w-6 h-6" />, title: 'Customer Segmentation' },
      { icon: <FaChartPie className="text-white w-6 h-6" />, title: 'Customer Lifetime Value' },
      { icon: <FaUserCheck className="text-white w-6 h-6" />, title: 'Lookalike Modeling' },
      { icon: <FaSmile className="text-white w-6 h-6" />, title: 'Sentiment Analysis' },
      { icon: <FaBrain className="text-white w-6 h-6" />, title: 'Behavioral Analytics' },
    ],
  },
  {
    key: 'marketing',
    label: 'Marketing Analytics',
    icon: <FaChartLine className="w-6 h-6 text-white" />, // white icon
    summary: 'Optimize Marketing Efforts with Data-Backed Strategies',
    video: '/marketing-analytics.mp4',
    features: [
      { icon: <FaProjectDiagram className="text-white w-6 h-6" />, title: 'Attribution Modeling' },
      { icon: <FaChartBar className="text-white w-6 h-6" />, title: 'Marketing Mix Modeling' },
      { icon: <FaChartArea className="text-white w-6 h-6" />, title: 'Predictive Analytics' },
      { icon: <FaBullseye className="text-white w-6 h-6" />, title: 'Personalized Recommendations' },
      { icon: <FaUserCheck className="text-white w-6 h-6" />, title: 'Churn Prediction' },
    ],
  },
  {
    key: 'visualization',
    label: 'Data Visualization',
    icon: <FaChartBar className="w-6 h-6 text-white" />, // white icon
    summary: 'Transform Complex Data into Clear, Actionable Insights',
    video: '/visualization.mp4',
    features: [
      { icon: <FaChartBar className="text-white w-6 h-6" />, title: 'Interactive Dashboards' },
      { icon: <FaChartArea className="text-white w-6 h-6" />, title: 'Predictive Analytics' },
      { icon: <FaSync className="text-white w-6 h-6" />, title: 'Live Data Tracking' },
      { icon: <FaMapMarkedAlt className="text-white w-6 h-6" />, title: 'Geospatial Mapping' },
      { icon: <FaCogs className="text-white w-6 h-6" />, title: 'Self-Service Analytics' },
    ],
  },
  {
    key: 'business',
    label: 'Business Intelligence',
    icon: <FaLightbulb className="w-6 h-6 text-white" />, // white icon
    summary: 'Leverage Data-Driven Strategies for Smarter Decision-Making',
    video: '/businessi.mp4',
    features: [
      { icon: <FaChartBar className="text-white w-6 h-6" />, title: 'Digital Dashboard' },
      { icon: <FaChartArea className="text-white w-6 h-6" />, title: 'Predictive Analytics' },
      { icon: <FaCheckCircle className="text-white w-6 h-6" />, title: 'Ad Hoc Analytics' },
      { icon: <FaCogs className="text-white w-6 h-6" />, title: 'Online Analytical Processing (OLAP)' },
      { icon: <FaBullseye className="text-white w-6 h-6" />, title: 'Enterprise Performance Management' },
    ],
  },
  {
    key: 'cleaning',
    label: 'Data Cleaning',
    icon: <FaBroom className="w-6 h-6 text-white" />, // white icon
    summary: 'Ensure Data Accuracy for Reliable Business Insights',
    video: '/datacleaning.mp4',
    features: [
      { icon: <FaSync className="text-white w-6 h-6" />, title: 'Data Integration & Transformation' },
      { icon: <FaCheckCircle className="text-white w-6 h-6" />, title: 'Data Validation' },
      { icon: <FaBroom className="text-white w-6 h-6" />, title: 'Data Hygiene' },
      { icon: <FaExclamationTriangle className="text-white w-6 h-6" />, title: 'Outlier Treatment' },
      { icon: <FaRobot className="text-white w-6 h-6" />, title: 'Synthetic Data Generation' },
    ],
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev
  const timeoutRef = useRef(null);
  const service = services[active];

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % services.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Animation logic
  useEffect(() => {
    setAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAnimating(false), 600);
    return () => clearTimeout(timeoutRef.current);
  }, [active]);

  return (
    <section className="relative w-full overflow-hidden bg-black min-h-[320px] md:min-h-[500px] lg:min-h-[600px]">
      {/* Video Background with dark overlay - covers entire section, no border radius or border */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          key={service.video}
          src={service.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 w-full h-full bg-black/60" />
      </div>
      <div className="relative w-full z-10 h-full min-h-[320px] md:min-h-[500px] lg:min-h-[600px] flex flex-col">
        <div className="flex flex-col items-center justify-center flex-1 h-full">
          {/* Service Navigation Buttons (top, responsive, content-aligned on desktop, scrollable on mobile) */}
          <div className="w-full flex justify-center mt-4 mb-2">
            <div className="w-full">
              <div
                className="mx-auto max-w-4xl px-2 md:px-4"
              >
                <div
                  className="flex gap-2 md:gap-4 overflow-x-auto md:overflow-visible scrollbar-hide w-full"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {services.map((s, idx) => (
                    <button
                      key={s.key}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-medium text-xs md:text-sm transition-all duration-200 shadow-md backdrop-blur-md border border-white/30 whitespace-nowrap w-full md:w-auto justify-center ${active === idx ? 'bg-red-600 text-white scale-105' : 'bg-white/20 text-white hover:bg-white/40 hover:text-red-600'}`}
                      onClick={() => {
                        setDirection(idx > active ? 1 : -1);
                        setActive(idx);
                      }}
                      aria-label={`Go to ${s.label}`}
                    >
                      {s.icon}
                      <span className="truncate">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Service Logo, Title, and Sub-services (bottom left overlay) */}
          <div className="flex-1 flex flex-col items-start justify-end h-full w-full max-w-4xl mx-auto px-4 md:px-10 pb-16 md:pb-24">
            <div
              className={`transition-all duration-600 ease-in-out w-full ${animating ? (direction === 1 ? 'animate-slide-in-right' : 'animate-slide-in-left') : ''}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-main shadow-lg">{service.icon}</span>
                <span className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">{service.label}</span>
              </div>
              <div className="text-base md:text-lg font-medium text-white mb-4 drop-shadow-lg max-w-lg text-left opacity-90">{service.summary}</div>
              <div className="flex flex-row flex-wrap gap-2 md:gap-4">
                {service.features.map((f, fidx) => (
                  <div
                    key={f.title}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow text-white font-medium text-xs md:text-sm transition hover:bg-white/30 hover:text-red-600 cursor-pointer min-w-[120px] md:min-w-[150px]"
                  >
                    {f.icon}
                    <span className="truncate text-left">{f.title}</span>
                    <FaArrowRight className="w-4 h-4 ml-1 text-white group-hover:text-red-600 transition" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
