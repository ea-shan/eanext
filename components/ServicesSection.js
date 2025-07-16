import { useState } from 'react';
import { FaUserFriends, FaChartLine, FaChartBar, FaLightbulb, FaBroom, FaUsers, FaChartPie, FaUserCheck, FaSmile, FaBrain, FaBullseye, FaProjectDiagram, FaChartArea, FaMapMarkedAlt, FaCogs, FaSync, FaCheckCircle, FaExclamationTriangle, FaRobot } from 'react-icons/fa';

const services = [
  {
    key: 'customer',
    label: 'Customer Analytics',
    icon: <FaUserFriends className="w-6 h-6 text-white" />, // white icon
    video: '/customer-analytics.mp4',
    summary: 'Understand Customer Behavior with Data-Driven Insights',
    desc: 'We transform scattered customer data into structured insights, enabling businesses to identify purchasing patterns, customer preferences, and future actions.',
    features: [
      { icon: <FaUsers className="text-pink-600 mr-2" />, title: 'Customer Segmentation', desc: 'Find patterns, group personas, and market smarter.' },
      { icon: <FaChartPie className="text-pink-600 mr-2" />, title: 'Customer Lifetime Value', desc: 'Focus on the customers that matter most.' },
      { icon: <FaUserCheck className="text-pink-600 mr-2" />, title: 'Lookalike Modeling', desc: 'Find new buyers who act just like your best ones.' },
      { icon: <FaSmile className="text-pink-600 mr-2" />, title: 'Sentiment Analysis', desc: 'Read between the lines of reviews and social chatter.' },
      { icon: <FaBrain className="text-pink-600 mr-2" />, title: 'Behavioral Analytics', desc: 'Predict what customers will do next (before they do).' },
    ],
    cta: 'Attract, engage & retain your best Customers',
    learn: 'Learn More',
  },
  {
    key: 'marketing',
    label: 'Marketing Analytics',
    icon: <FaChartLine className="w-6 h-6 text-white" />, // white icon
    video: '/marketing-analytics.mp4',
    summary: 'Optimize Marketing Efforts with Data-Backed Strategies',
    desc: 'Know exactly what’s working, where to invest, and how to reach your audience—without the marketing chaos.',
    features: [
      { icon: <FaProjectDiagram className="text-pink-600 mr-2" />, title: 'Attribution Modeling', desc: 'See what’s driving conversions and reduce the waste.' },
      { icon: <FaChartBar className="text-pink-600 mr-2" />, title: 'Marketing Mix Modeling', desc: 'Optimize channels, budgets, and campaigns for max impact.' },
      { icon: <FaChartArea className="text-pink-600 mr-2" />, title: 'Predictive Analytics', desc: 'Identify trends and make proactive decisions.' },
      { icon: <FaBullseye className="text-pink-600 mr-2" />, title: 'Personalized Recommendations', desc: 'Serve the right offer to the right customer at the right time.' },
      { icon: <FaUserCheck className="text-pink-600 mr-2" />, title: 'Churn Prediction', desc: 'Know who’s about to leave—and win them back.' },
    ],
    cta: 'Drive measurable marketing outcomes with data-backed decisions.',
    learn: 'Learn More',
  },
  {
    key: 'visualization',
    label: 'Data Visualization',
    icon: <FaChartBar className="w-6 h-6 text-white" />, // white icon
    video: '/visualization.mp4',
    summary: 'Transform Complex Data into Clear, Actionable Insights',
    desc: 'Complicated spreadsheets don’t drive decisions—clear visuals do. Express Analytics turns raw numbers into intuitive dashboards that highlight trends, uncover insights, and make decision-making effortless.',
    features: [
      { icon: <FaChartBar className="text-pink-600 mr-2" />, title: 'Interactive Dashboards', desc: 'Gain insights from comprehensive data views.' },
      { icon: <FaChartArea className="text-pink-600 mr-2" />, title: 'Predictive Analytics', desc: 'Identify patterns to enhance business strategies.' },
      { icon: <FaSync className="text-pink-600 mr-2" />, title: 'Live Data Tracking', desc: 'Make real-time decisions with up-to-the-minute insights.' },
      { icon: <FaMapMarkedAlt className="text-pink-600 mr-2" />, title: 'Geospatial Mapping', desc: 'See customer behavior in different regions.' },
      { icon: <FaCogs className="text-pink-600 mr-2" />, title: 'Self-Service Analytics', desc: 'Explore data without waiting on IT.' },
    ],
    cta: 'Convert data into clarity with our data analytics and visualization services',
    learn: 'Learn More',
  },
  {
    key: 'business',
    label: 'Business Intelligence',
    icon: <FaLightbulb className="w-6 h-6 text-white" />, // white icon
    video: '/businessi.mp4',
    summary: 'Leverage Data-Driven Strategies for Smarter Decision-Making',
    desc: 'No more data silos. Express Analytics brings all your business insights into one place—so you can track performance, predict trends, and make informed decisions, fast.',
    features: [
      { icon: <FaChartBar className="text-pink-600 mr-2" />, title: 'Digital Dashboard', desc: 'Access real-time business performance insights' },
      { icon: <FaChartArea className="text-pink-600 mr-2" />, title: 'Predictive Analytics', desc: 'Identify potential risks and opportunities early.' },
      { icon: <FaCheckCircle className="text-pink-600 mr-2" />, title: 'Ad Hoc Analytics', desc: 'Access on-demand reports for informed decision-making.' },
      { icon: <FaCogs className="text-pink-600 mr-2" />, title: 'Online Analytical Processing (OLAP)', desc: 'Perform multi-dimensional data analysis efficiently.' },
      { icon: <FaBullseye className="text-pink-600 mr-2" />, title: 'Enterprise Performance Management', desc: 'Align strategy with execution for real impact.' },
    ],
    cta: 'Transform fragmented data into strategic insights that drive business growth',
    learn: 'Learn More',
  },
  {
    key: 'cleaning',
    label: 'Data Cleaning',
    icon: <FaBroom className="w-6 h-6 text-white" />, // white icon
    video: '/datacleaning.mp4',
    summary: 'Ensure Data Accuracy for Reliable Business Insights',
    desc: 'Bad data leads to bad decisions. Express Analytics cleans, validates, and transforms your data so you can trust every number, every insight, and every strategy.',
    features: [
      { icon: <FaSync className="text-pink-600 mr-2" />, title: 'Data Integration & Transformation', desc: 'Combine and standardize data from multiple sources.' },
      { icon: <FaCheckCircle className="text-pink-600 mr-2" />, title: 'Data Validation', desc: 'Eliminate errors, duplicates, and inconsistencies.' },
      { icon: <FaBroom className="text-pink-600 mr-2" />, title: 'Data Hygiene', desc: 'Keep your datasets fresh, accurate, and ready for action.' },
      { icon: <FaExclamationTriangle className="text-pink-600 mr-2" />, title: 'Outlier Treatment', desc: 'Detect and correct anomalies before they derail your insights.' },
      { icon: <FaRobot className="text-pink-600 mr-2" />, title: 'Synthetic Data Generation', desc: 'Use AI-powered modeling to create safe, real-world-like datasets.' },
    ],
    cta: 'The first step toward smarter decisions? Clean data',
    learn: 'Learn More',
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl text-[#DC1B36]">&#x25C7;</span>
          <span className="text-xl md:text-2xl font-semibold text-[#DC1B36]">Our Services</span>
          <span className="text-2xl text-[#DC1B36]">&#x25C7;</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900">Delivering Excellence <span className="font-normal">Every Time</span></h3>
        <p className="text-gray-700 mb-2 text-lg text-center">We offer end-to-end data analytics services that turn raw data into actionable insights. <span className="font-bold">Unlock the Power of Data with Our Analytics Solutions.</span></p>
        {/* Tabs */}
        <div className="w-full overflow-x-auto my-8 scrollbar-hide md:scrollbar-default">
          <div className="flex gap-3 min-w-max md:justify-center">
            {services.map((s, i) => (
              <button
                key={s.key}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 ${active === i ? 'bg-gradient-main text-white shadow' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                onClick={() => setActive(i)}
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-main">
                  {s.icon}
                </span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Tab Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-stretch px-4">
        {/* Video */}
        <div className="flex-[1.2] min-w-0 flex items-center justify-center md:justify-end md:pr-0 pr-0">
          <video
            src={services[active].video}
            className="rounded-3xl border-2 border-dashed border-pink-400 w-full max-w-[420px] aspect-[4/3] object-cover shadow-lg"
            style={{ minHeight: '320px', maxHeight: '420px' }}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        {/* Details */}
        <div className="flex-[2] min-w-0 flex flex-col items-start justify-center text-left max-w-2xl mx-auto">
          <h4 className="text-2xl md:text-3xl font-bold text-pink-700 mb-1">{services[active].label}</h4>
          <div className="text-md md:text-lg font-semibold text-[#DC1B36] mb-2">{services[active].summary}</div>
          <div className="text-gray-700 mb-4">{services[active].desc}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-4">
            {services[active].features.map((f, idx) => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1 shadow-sm">
                <div className="flex items-center font-bold text-pink-600 text-base">{f.icon}{f.title}</div>
                <div className="text-gray-600 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xl font-bold text-gradient-main mb-2">{services[active].cta}</div>
          <button className="mt-2 px-6 py-2 rounded-lg bg-[#DC1B36] text-white font-semibold flex items-center gap-2 shadow hover:bg-[#9B51E0] transition">
            <span className="text-lg">📊</span> {services[active].learn}
          </button>
        </div>
      </div>
    </section>
  );
}
