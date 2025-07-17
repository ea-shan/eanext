import { useState, useEffect, useRef } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

const sliderImages = [
  {
    src: '/dashboard1.webp',
    alt: 'Customer Analytics Dashboard',
    title: 'Customer Analytics',
  },
  {
    src: '/dashboard2.webp',
    alt: 'Business Intelligence Dashboard',
    title: 'Business Intelligence',
  },
  {
    src: '/dashboard3.webp',
    alt: 'Marketing Analytics Dashboard',
    title: 'Marketing Analytics',
  },
];

// Dashboard data
const summaryData = [
  { title: 'Active Customers', value: '152K', change: '+11% vs previous period' },
  { title: 'Loans', value: '$3.5M', change: '+15% vs previous period' },
  { title: 'Investments', value: '$2.1M', change: '+7% vs previous period' },
  { title: 'Churn Rate', value: '4.3%', change: '-0.5% vs previous period' },
];
const riskData = [
  { name: 'Jan', low: 20, medium: 30, high: 50 },
  { name: 'Mar', low: 25, medium: 35, high: 40 },
  { name: 'May', low: 15, medium: 40, high: 45 },
];
const growthData = [
  { name: 'Mar 23', active: 4500, investment: 8000 },
  { name: 'Sep 23', active: 8000, investment: 12000 },
  { name: 'Jan 24', active: 130000, investment: 1800000 },
  { name: 'Mar 24', active: 152000, investment: 2100000 },
];
const investmentData = [
  { name: 'Actual Investment', value: 2100000 },
  { name: 'Max Incremental Investment', value: 517000 },
];
const loanStatusData = [
  { month: 'Jan', Outstanding: 20000, Current: 10000, Paid: 30000 },
  { month: 'Feb', Outstanding: 22000, Current: 11000, Paid: 32000 },
  { month: 'Mar', Outstanding: 25000, Current: 12000, Paid: 35000 },
];
const loanReasons = [
  { name: 'home', value: 50000 },
  { name: 'auto', value: 45000 },
  { name: 'business', value: 30000 },
  { name: 'education', value: 25000 },
  { name: 'medical', value: 20000 },
  { name: 'wedding', value: 15000 },
  { name: 'travel', value: 12000 },
  { name: 'debt', value: 10000 },
  { name: 'renovation', value: 8000 },
  { name: 'other', value: 5000 },
];
const COLORS = ['#FF6384', '#FFCE56'];

function CustomerAnalyticsDashboard() {
  return (
    <div className="p-4 md:p-8 font-sans">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient-main">Customer Analytics Dashboard</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {summaryData.map((item, idx) => (
          <div key={idx} className="flex-1 min-w-[180px] bg-gray-100 rounded-xl p-4 shadow text-center">
            <div className="font-semibold text-gray-700">{item.title}</div>
            <div className="text-2xl font-bold text-red-700">{item.value}</div>
            <div className="text-xs text-green-600 mt-1">{item.change}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-2">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={riskData} stackOffset="expand">
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="low" stackId="1" stroke="#FFCDD2" fill="#FFCDD2" />
              <Area type="monotone" dataKey="medium" stackId="1" stroke="#EF9A9A" fill="#EF9A9A" />
              <Area type="monotone" dataKey="high" stackId="1" stroke="#E57373" fill="#E57373" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Growth of Key Metrics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={growthData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="active" stroke="#F44336" />
              <Line type="monotone" dataKey="investment" stroke="#BA68C8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Top 10 Investment Products Potential</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={investmentData} dataKey="value" outerRadius={60} label>
                {investmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Loan Status Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={loanStatusData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Outstanding" fill="#F06292" />
              <Bar dataKey="Current" fill="#9575CD" />
              <Bar dataKey="Paid" fill="#4DB6AC" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Top 10 Loan Reasons</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={loanReasons}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#E57373" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Business Analytics Dashboard Data and Component
const businessTrafficData = [
  { name: '2022-Q3', organic: 200000, ad: 100000, unbranded: 150000 },
  { name: '2025-Q4', organic: 250000, ad: 120000, unbranded: 170000 },
  { name: '2025-Q1', organic: 300000, ad: 150000, unbranded: 200000 },
  { name: '2025-Q2', organic: 320000, ad: 160000, unbranded: 210000 },
  { name: '2025-Q3', organic: 350000, ad: 180000, unbranded: 230000 },
];
const businessCtrCostData = [
  { name: '2022-Q3', ctr: 3.2, cost: 20000 },
  { name: '2025-Q1', ctr: 2.8, cost: 45000 },
  { name: '2025-Q2', ctr: 2.1, cost: 60000 },
  { name: '2025-Q3', ctr: 1.5, cost: 80000 },
  { name: '2026-Q1', ctr: 2.5, cost: 99000 },
];
const businessBrandKeywords = [
  { name: 'search', organic: 450000, ad: 200000, total: 650000 },
  { name: 'search2', organic: 350000, ad: 150000, total: 500000 },
  { name: 'search3', organic: 300000, ad: 100000, total: 400000 },
];
const businessPieData = [
  { name: 'Top Keyword', value: 2900000 },
  { name: 'Incremental Brand', value: 1100000 },
];
const BUSINESS_COLORS = ['#FF4C4C', '#333'];

function BusinessAnalyticsDashboard() {
  return (
    <div className="p-4 md:p-8 font-sans bg-[#121212] text-white rounded-xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient-main">Business Analytics Dashboard</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {[
          ['Total Traffic', '4.0M', '+5.8% vs previous period'],
          ['Organic Traffic', '2.9M', '-3.5% vs previous period'],
          ['Paid Traffic', '1.1M', '+38.0% vs previous period'],
          ['Ad Cost', '$259.2K', '+7.1% vs previous period']
        ].map(([title, value, note]) => (
          <div key={title} className="flex-1 min-w-[180px] bg-[#1E1E1E] rounded-xl p-4 shadow text-center">
            <div className="font-semibold text-gray-300">{title}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className={`text-xs mt-1 ${value.includes('-') ? 'text-red-400' : 'text-green-400'}`}>{note}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#1E1E1E] rounded-xl p-4">
          <h3 className="font-semibold mb-2">Branded Traffic Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={businessTrafficData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="organic" stackId="a" fill="#32CD32" name="Organic Branded Traffic" />
              <Bar dataKey="ad" stackId="a" fill="#8884d8" name="Ad Traffic" />
              <Bar dataKey="unbranded" stackId="a" fill="#444" name="Unbranded Traffic" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#1E1E1E] rounded-xl p-4">
          <h3 className="font-semibold mb-2">Blended CTR & Ad Cost</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={businessCtrCostData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis yAxisId="left" orientation="left" stroke="#ccc" />
              <YAxis yAxisId="right" orientation="right" stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="ctr" fill="#FFD700" name="Blended CTR" />
              <Line yAxisId="right" dataKey="cost" stroke="#fff" name="Ad Cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1E1E1E] rounded-xl p-4">
          <h3 className="font-semibold mb-2">Top Brand Keywords Traffic Potential</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={businessPieData} dataKey="value" outerRadius={70} label>
                {businessPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BUSINESS_COLORS[index % BUSINESS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#1E1E1E] rounded-xl p-4">
          <h3 className="font-semibold mb-2">Top 20 Branded Keywords</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={businessBrandKeywords}>
              <XAxis type="number" stroke="#ccc" />
              <YAxis dataKey="name" type="category" stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="organic" stackId="a" fill="#32CD32" name="Organic Traffic" />
              <Bar dataKey="ad" stackId="a" fill="#8884d8" name="Ad Traffic" />
              <Bar dataKey="total" stackId="a" fill="#ccc" name="Total Traffic" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Marketing Analytics Dashboard Data and Component
const marketingSummaryCards = [
  { title: 'Website Visitors', value: '820K', change: '-15%' },
  { title: 'New Customers', value: '41.5K', change: '-15%' },
  { title: 'Conversion Rate', value: '5.1%', change: '-15%' },
  { title: 'Revenue', value: '$970K', change: '-15%' }
];
const marketingVisitorConversionData = [
  { date: '09/22', visitors: 300, rate: 2 },
  { date: '10/22', visitors: 700, rate: 3 },
  { date: '12/22', visitors: 450, rate: 4 },
  { date: '03/23', visitors: 680, rate: 5 },
  { date: '06/23', visitors: 900, rate: 6 },
  { date: '08/23', visitors: 750, rate: 5.5 }
];
const marketingCustomersByAge = [
  { age: '18-24', customers: 10000 },
  { age: '25-34', customers: 12500 },
  { age: '35-44', customers: 11000 },
  { age: '45-54', customers: 9000 },
  { age: '55-64', customers: 7000 },
  { age: '65-64', customers: 5000 },
  { age: '55+', customers: 3000 }
];
const marketingRevenueByCategory = [
  { name: 'apparel', revenue: 2300000 },
  { name: 'electronics', revenue: 2100000 },
  { name: 'home', revenue: 1600000 },
  { name: 'beauty', revenue: 1200000 },
  { name: 'sports', revenue: 800000 },
  { name: 'other', revenue: 300000 }
];

function MarketingAnalyticsDashboard() {
  return (
    <div className="p-4 md:p-8 font-sans bg-gray-100 text-gray-900 rounded-xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient-main">Marketing Analytics Dashboard</h2>
      {/* Metric Cards */}
      <div className="flex flex-wrap gap-4 mb-8">
        {marketingSummaryCards.map((card) => (
          <div key={card.title} className="flex-1 min-w-[180px] bg-white rounded-xl p-4 shadow text-center">
            <div className="font-semibold text-gray-700">{card.title}</div>
            <div className="text-2xl font-bold text-red-700">{card.value}</div>
            <div className="text-xs text-red-500 mt-1">▼ {card.change} vs previous period</div>
          </div>
        ))}
      </div>
      {/* Website Visitors & Conversion Rate */}
      <div className="bg-white rounded-xl p-4 mb-8">
        <h3 className="font-semibold mb-2">Website Visitors & Conversion Rate</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={marketingVisitorConversionData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="visitors" stroke="#ff6b6b" fill="#ff6b6b" name="Visitors (K)" />
            <Area type="monotone" dataKey="rate" stroke="#7e57c2" fill="#7e57c2" name="Conversion Rate (%)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* New Customers by Age */}
      <div className="bg-white rounded-xl p-4 mb-8">
        <h3 className="font-semibold mb-2">New Customers by Age</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={marketingCustomersByAge}>
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="customers" fill="#ff5252" name="New Customers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Revenue by Category */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="font-semibold mb-2">Revenue by Category</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart layout="vertical" data={marketingRevenueByCategory}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="revenue" fill="#7e57c2" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoSlideRef = useRef();

  // Auto-slide every 4 seconds
  useEffect(() => {
    autoSlideRef.current = () => setCurrent((prev) => (prev + 1) % sliderImages.length);
  });
  useEffect(() => {
    const interval = setInterval(() => {
      autoSlideRef.current();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Drag handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
  };
  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    setDragDelta(clientX - dragStartX);
  };
  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragDelta > 60) {
      setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    } else if (dragDelta < -60) {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }
    setDragDelta(0);
  };

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-16 px-4 gap-8">
      {/* Left Side */}
      <div className="flex-1">
        <h5 className="text-sm font-bold text-red-700 mb-2 uppercase">From Chaos to Clarity</h5>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-700 mb-4 leading-tight">
          Is Your Business<br />
          Struggling to Make<br />
          Data-Driven Decisions?
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          We convert raw data into actionable insights, enabling enterprises and organizations to make smarter decisions and drive sustainable growth with AI-powered solutions in data management, marketing analytics, and business intelligence.
        </p>
        <button className="mt-4 px-8 py-3 rounded-full bg-red-600 text-white font-semibold text-lg shadow-lg hover:bg-red-700 transition">
          <span className="mr-2 text-white"></span> Free Consultation
        </button>
      </div>
      {/* Right Side: Slider */}
      <div className="flex-1 flex flex-col items-center select-none w-full relative">
        <div
          className="relative w-full max-w-[95vw] sm:max-w-[420px] md:max-w-[540px] h-[320px] sm:h-[320px] md:h-[420px] flex items-center justify-center overflow-visible"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => isDragging && handleDragEnd()}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab', maxWidth: '100vw', overflow: 'hidden' }}
        >
          {sliderImages.map((img, idx) => {
            // Card stacking effect
            let offset = idx - current;
            if (offset < -1) offset += sliderImages.length;
            if (offset > 1) offset -= sliderImages.length;
            const isActive = idx === current;
            const z = 10 - Math.abs(offset);
            const scale = isActive ? 1 : 0.92;
            const translateX = isActive ? dragDelta : offset * 40 + (isActive ? 0 : dragDelta * 0.2);
            const rotate = isActive ? dragDelta * 0.05 : offset * 5;
            return (
              <div
                key={img.src}
                className={`absolute top-0 left-0 h-[300px] sm:h-[300px] md:h-[400px] w-full sm:w-[380px] md:w-[500px] rounded-xl border-2 border-dashed border-red-400 shadow-lg bg-white transition-all duration-300 ease-in-out ${isActive ? 'cursor-pointer' : 'pointer-events-none opacity-80'}`}
                style={{
                  zIndex: z,
                  transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`
                }}
                onClick={() => isActive && openModal(img)}
                draggable={false}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-fill rounded-xl max-w-full max-h-full"
                  draggable={false}
                />
                {/* Animated indicator for active card */}
                {isActive && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center select-none">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <span className="text-xs text-gray-500 animate-fadeInUp font-medium">Click to see live dashboard</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Modern flat slider dots centered below */}
        <div className="flex justify-center mt-6 gap-2 w-full items-center">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${idx === current ? 'bg-red-600' : 'bg-gray-300'}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{ outline: 'none', border: 'none' }}
            />
          ))}
        </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 md:p-6 max-w-6xl w-full max-h-[90vh] relative overflow-y-auto shadow-lg">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl z-20 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-gray-200">&times;</button>
            {modalImg?.title === 'Customer Analytics' ? (
              <CustomerAnalyticsDashboard />
            ) : modalImg?.title === 'Business Intelligence' ? (
              <BusinessAnalyticsDashboard />
            ) : modalImg?.title === 'Marketing Analytics' ? (
              <MarketingAnalyticsDashboard />
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-500 to-red-500 bg-clip-text text-transparent">{modalImg?.title} Dashboard</h2>
                <img src={modalImg?.src} alt={modalImg?.alt} className="w-full h-64 object-contain mb-4 rounded" />
                {/* Dummy chart area */}
                <div className="w-full h-40 bg-gray-100 border-2 border-dashed border-red-400 rounded flex items-center justify-center">
                  <span className="text-gray-400">[Charts will appear here]</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
