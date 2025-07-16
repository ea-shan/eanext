import { useState } from 'react';
import { FaComments, FaLink, FaChartPie, FaChartBar, FaRobot, FaChartLine, FaUserFriends, FaUsers, FaSync, FaMobileAlt, FaMoneyBillWave, FaBullseye, FaChartArea, FaCogs, FaLightbulb, FaUserCheck, FaSmile, FaBrain, FaProjectDiagram, FaCheckCircle } from 'react-icons/fa';

const solutions = [
  {
    key: 'voca',
    label: 'VOCA',
    icon: <FaComments className="w-6 h-6 text-white" />, // white icon
    image: '/Voice-of-Customer-Analytics-2.webp',
    summary: 'Voice of Customer Analytics',
    desc: 'Decode sentiment and trends from customer feedback.',
    features: [
      { icon: <FaSmile className="text-pink-600 mr-2" />, title: 'Sentiment Analysis', desc: 'Assess customer perceptions across multiple platforms.' },
      { icon: <FaBrain className="text-pink-600 mr-2" />, title: 'Emotion Detection', desc: 'Go beyond words—analyze trust, joy, anger, and more.' },
      { icon: <FaProjectDiagram className="text-pink-600 mr-2" />, title: 'Topic & Keyword Modeling', desc: 'Detect emerging trends in customer feedback.' },
      { icon: <FaChartBar className="text-pink-600 mr-2" />, title: 'Visual Dashboards', desc: 'Get real-time insights at a glance.' },
      { icon: <FaCheckCircle className="text-pink-600 mr-2" />, title: 'Sarcasm & Fake Review Detection', desc: 'No more misleading data—see the real picture.' },
    ],
    cta: 'Turn customer conversations into smarter business decisions',
    learn: 'Learn More',
  },
  {
    key: 'multi',
    label: 'Multi-Touch Attribution',
    icon: <FaLink className="w-6 h-6 text-white" />,
    image: '/Multi-Touch-Attribution-2.webp',
    summary: 'Know What’s Working. Cut What’s Not.',
    desc: 'Our Multi-Touch Attribution (MTA) model helps you track every customer interaction, so you can invest where it matters and stop wasting budget on what doesn’t.',
    features: [
      { icon: <FaChartLine className="text-pink-600 mr-2" />, title: 'Channel Performance Tracking', desc: 'See which touchpoints drive conversions.' },
      { icon: <FaSync className="text-pink-600 mr-2" />, title: 'Real-Time Analytics', desc: 'Continuously refine campaigns with real-time performance analytics.' },
      { icon: <FaCogs className="text-pink-600 mr-2" />, title: 'Data-Driven Attribution', desc: 'Assign accurate credit to every interaction.' },
      { icon: <FaMobileAlt className="text-pink-600 mr-2" />, title: 'Cross-Device Insights', desc: 'Track customer journeys across web, mobile, and offline channels.' },
      { icon: <FaMoneyBillWave className="text-pink-600 mr-2" />, title: 'Optimized Budget Allocation', desc: 'Maximize ROI by prioritizing high-performing channels.' },
    ],
    cta: 'Turn scattered touchpoints into a seamless strategy for better marketing decisions',
    learn: 'Learn More',
  },
  {
    key: 'clv',
    label: 'Customer Lifetime Value',
    icon: <FaChartPie className="w-6 h-6 text-white" />,
    image: '/Customer-Lifetime-Value-2-1.webp',
    summary: 'Find Your Best Customers—and Keep Them.',
    desc: 'Express Analytics helps you identify high-value customers, predict future revenue, and optimize marketing spend for long-term growth.',
    features: [
      { icon: <FaChartLine className="text-pink-600 mr-2" />, title: 'Predict Future Revenue', desc: 'Forecast customer value and retention over time.' },
      { icon: <FaUsers className="text-pink-600 mr-2" />, title: 'Customer Segmentation', desc: 'Group customers by spending patterns and loyalty.' },
      { icon: <FaUserCheck className="text-pink-600 mr-2" />, title: 'Churn Prediction', desc: 'Identify at-risk customers and re-engage them before they leave.' },
      { icon: <FaMoneyBillWave className="text-pink-600 mr-2" />, title: 'Optimized Acquisition Cost', desc: 'Ensure CLV always outweighs customer acquisition costs.' },
      { icon: <FaChartBar className="text-pink-600 mr-2" />, title: 'Real-Time CLV Insights', desc: 'Track customer behavior and lifetime value on live dashboards.' },
    ],
    cta: 'Know who’s worth the investment—and build relationships that last',
    learn: 'Learn More',
  },
  {
    key: 'mix',
    label: 'Marketing Mix Modeling',
    icon: <FaChartBar className="w-6 h-6 text-white" />,
    image: '/Marketing-Mix-Modeling-2.webp',
    summary: 'Optimize Marketing Performance with Data-Driven Analysis',
    desc: 'Don’t just spend—spend smarter. Express Analytics helps you measure, predict, and optimize marketing performance across every channel, online and offline.',
    features: [
      { icon: <FaChartLine className="text-pink-600 mr-2" />, title: 'Channel Performance Tracking', desc: 'Access real-time business performance insights' },
      { icon: <FaBullseye className="text-pink-600 mr-2" />, title: 'Budget Optimization', desc: 'Identify potential risks and opportunities early.' },
      { icon: <FaProjectDiagram className="text-pink-600 mr-2" />, title: 'Campaign Impact Analysis', desc: 'Access on-demand reports for informed decision-making.' },
      { icon: <FaChartArea className="text-pink-600 mr-2" />, title: 'Real-Time Dashboards', desc: 'Perform multi-dimensional data analysis efficiently.' },
      { icon: <FaLightbulb className="text-pink-600 mr-2" />, title: 'AI-Powered Insights', desc: 'Align strategy with execution for real impact.' },
    ],
    cta: 'Make data-backed decisions that drive real business growth',
    learn: 'Learn More',
  },
  {
    key: 'recommend',
    label: 'Recommendation Engine',
    icon: <FaRobot className="w-6 h-6 text-white" />,
    image: '/Recommendation-Engine-2.webp',
    summary: 'Smart Suggestions. Bigger Sales. Happier Customers.',
    desc: 'Know what your customers want—before they do. Express Analytics’ AI-powered Recommendation Engine helps you deliver personalized product suggestions that boost conversions, increase basket size, and keep users engaged.',
    features: [
      { icon: <FaChartPie className="text-pink-600 mr-2" />, title: 'Product-Based Recommendations', desc: 'Suggest items based on browsing history, price, and category.' },
      { icon: <FaUserFriends className="text-pink-600 mr-2" />, title: 'User-Based Recommendations', desc: 'Predict purchases using customer profiles and preferences.' },
      { icon: <FaBullseye className="text-pink-600 mr-2" />, title: 'Cross-Selling & Upselling', desc: 'Drive higher order values with smart product pairings.' },
      { icon: <FaLightbulb className="text-pink-600 mr-2" />, title: 'AI & NLP-Driven Insights', desc: 'Deliver hyper-relevant recommendations in real time.' },
      { icon: <FaSmile className="text-pink-600 mr-2" />, title: 'Better User Experience', desc: 'Reduce bounce rates by helping customers find what they need—fast.' },
    ],
    cta: 'Turn data into dynamic, high-converting recommendations',
    learn: 'Learn More',
  },
];

export default function AnalyticsSolutions() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-16 bg-white text-center">
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="text-2xl text-[#DC1B36]">&#x25C7;</span>
        <span className="text-xl md:text-2xl font-semibold text-[#DC1B36]">Analytics Solutions</span>
        <span className="text-2xl text-[#DC1B36]">&#x25C7;</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">Unlock Smarter Decisions with Express Analytics</h3>
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-gray-700 mb-2 text-lg text-center">We transform raw data into powerful business insights. Our AI-driven analytics solutions are designed to help organizations uncover patterns, predict trends, and make data-backed decisions with confidence. Whether you’re optimizing marketing campaigns, forecasting sales, or enhancing customer engagement, our platform delivers the precision, scalability, and intelligence you need to stay ahead in a data-driven world.</p>
        {/* Tabs */}
        <div className="w-full overflow-x-auto my-8 scrollbar-hide md:scrollbar-default">
          <div className="flex gap-3 min-w-max md:justify-center">
            {solutions.map((s, i) => (
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
        {/* Image */}
        <div className="flex-[1.2] min-w-0 flex items-center justify-center md:justify-end md:pr-0 pr-0">
          <img
            src={solutions[active].image}
            alt={solutions[active].label}
            className="rounded-3xl border-2 border-dashed border-pink-400 w-full max-w-[420px] aspect-[4/3] object-cover shadow-lg"
            style={{ minHeight: '600px', maxHeight: '600px' }}
          />
        </div>
        {/* Details */}
        <div className="flex-[2] min-w-0 flex flex-col items-start justify-center text-left max-w-2xl mx-auto">
          <h4 className="text-2xl md:text-3xl font-bold text-pink-700 mb-1">{solutions[active].summary}</h4>
          <div className="text-md md:text-lg font-semibold text-[#DC1B36] mb-2">{solutions[active].desc}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-4">
            {solutions[active].features.map((f, idx) => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1 shadow-sm">
                <div className="flex items-center font-bold text-pink-600 text-base">{f.icon}{f.title}</div>
                <div className="text-gray-600 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xl font-bold text-gradient-main mb-2">{solutions[active].cta}</div>
          <button className="mt-2 px-6 py-2 rounded-lg bg-[#DC1B36] text-white font-semibold flex items-center gap-2 shadow hover:bg-[#9B51E0] transition">
            <span className="text-lg">📊</span> {solutions[active].learn}
          </button>
        </div>
      </div>
    </section>
  );
}
