import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

// Hero chart data - animated statistics
const heroStats = [
  { label: 'Success Rate', value: '95%', icon: '📈', color: 'from-green-400 to-green-600' },
  { label: 'Client Satisfaction', value: '98%', icon: '😊', color: 'from-blue-400 to-blue-600' },
  { label: 'ROI Improvement', value: '340%', icon: '💰', color: 'from-purple-400 to-purple-600' },
  { label: 'Time Saved', value: '60%', icon: '⏰', color: 'from-orange-400 to-orange-600' },
];

// Case studies data
const caseStudies = [
  {
    id: 1,
    title: 'E-commerce Customer Segmentation Success',
    industry: 'Retail & E-commerce',
    challenge: 'A leading e-commerce platform struggled with customer retention and personalized marketing campaigns.',
    solution: 'Implemented advanced customer segmentation using machine learning algorithms and behavioral analytics.',
    results: [
      '35% increase in customer retention',
      '42% improvement in conversion rates',
      '28% reduction in customer acquisition costs'
    ],
    image: '/dashboard1.webp',
    category: 'Customer Analytics',
    readTime: '5 min read',
    featured: true
  },
  {
    id: 2,
    title: 'Marketing Mix Modeling for FMCG Giant',
    industry: 'Fast Moving Consumer Goods',
    challenge: 'A multinational FMCG company needed to optimize their marketing spend across multiple channels and regions.',
    solution: 'Developed comprehensive marketing mix modeling with attribution analysis and budget optimization.',
    results: [
      '25% increase in marketing ROI',
      '18% reduction in marketing waste',
      '15% improvement in market share'
    ],
    image: '/dashboard2.webp',
    category: 'Marketing Analytics',
    readTime: '7 min read',
    featured: true
  },
  {
    id: 3,
    title: 'Predictive Analytics for Banking Sector',
    industry: 'Banking & Finance',
    challenge: 'A major bank wanted to predict customer churn and identify high-value customers for retention strategies.',
    solution: 'Built predictive models using machine learning to identify at-risk customers and recommend retention actions.',
    results: [
      '40% reduction in customer churn',
      '30% increase in customer lifetime value',
      '50% improvement in retention campaign effectiveness'
    ],
    image: '/dashboard3.webp',
    category: 'Predictive Analytics',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 4,
    title: 'Voice of Customer Analytics for Healthcare',
    industry: 'Healthcare',
    challenge: 'A healthcare provider needed to understand patient satisfaction and improve service quality.',
    solution: 'Implemented sentiment analysis and text mining to extract insights from patient feedback and reviews.',
    results: [
      '45% improvement in patient satisfaction scores',
      '32% reduction in patient complaints',
      '28% increase in patient retention'
    ],
    image: '/video-bg.webp',
    category: 'Sentiment Analysis',
    readTime: '4 min read',
    featured: false
  },
  {
    id: 5,
    title: 'Data Visualization for Manufacturing',
    industry: 'Manufacturing',
    challenge: 'A manufacturing company struggled with complex data visualization and real-time monitoring.',
    solution: 'Created interactive dashboards and real-time data visualization tools for operational insights.',
    results: [
      '60% faster decision-making process',
      '35% reduction in operational costs',
      '42% improvement in production efficiency'
    ],
    image: '/dashboard1.webp',
    category: 'Data Visualization',
    readTime: '5 min read',
    featured: false
  },
  {
    id: 6,
    title: 'Business Intelligence for Logistics',
    industry: 'Logistics & Supply Chain',
    challenge: 'A logistics company needed comprehensive business intelligence to optimize routes and reduce costs.',
    solution: 'Developed end-to-end BI solution with predictive route optimization and cost analysis.',
    results: [
      '30% reduction in delivery times',
      '25% decrease in fuel costs',
      '40% improvement in route efficiency'
    ],
    image: '/dashboard2.webp',
    category: 'Business Intelligence',
    readTime: '6 min read',
    featured: false
  }
];

// Categories for filtering
const categories = ['All', 'Customer Analytics', 'Marketing Analytics', 'Predictive Analytics', 'Sentiment Analysis', 'Data Visualization', 'Business Intelligence'];

function HeroChart() {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('hero-chart');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targetValues = [95, 98, 340, 60];
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues(
        targetValues.map((target, index) => {
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          return Math.round(target * easeOutQuart);
        })
      );

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div id="hero-chart" className="w-full max-w-6xl mx-auto px-4 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {heroStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl mb-4 mx-auto`}>
              {stat.icon}
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {animatedValues[index]}%
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseStudyCard({ study, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 ${isHovered ? 'scale-105 shadow-xl' : 'hover:shadow-xl'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale-110' : 'scale(100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {study.category}
          </span>
        </div>
        {study.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-sm opacity-90">{study.readTime}</div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-sm text-pink-600 font-semibold mb-2">{study.industry}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{study.title}</h3>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Challenge:</h4>
          <p className="text-gray-600 text-sm line-clamp-2">{study.challenge}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Solution:</h4>
          <p className="text-gray-600 text-sm line-clamp-2">{study.solution}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Key Results:</h4>
          <ul className="space-y-1">
            {study.results.slice(0, 2).map((result, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                {result}
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full bg-gradient-main text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Read Full Case Study
        </button>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredStudies, setFilteredStudies] = useState(caseStudies);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredStudies(caseStudies);
    } else {
      setFilteredStudies(caseStudies.filter(study => study.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-main pt-16 pb-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fadeInUp">
              Case Studies
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl mb-8 animate-fadeInUp">
              Discover how we've helped businesses across industries transform their data into actionable insights and achieve remarkable results.
            </p>
            <HeroChart />
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                      ? 'bg-gradient-main text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Success Stories
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore real-world examples of how our analytics solutions have driven measurable business impact across various industries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study, index) => (
                <CaseStudyCard key={study.id} study={study} index={index} />
              ))}
            </div>

            {filteredStudies.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No case studies found</h3>
                <p className="text-gray-600">Try selecting a different category or check back later for new case studies.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-main">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how our analytics solutions can help you achieve similar results. Schedule a consultation with our experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
                Download Brochure
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
