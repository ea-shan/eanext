import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

// Hero stats for White Papers
const heroStats = [
  { label: 'White Papers Published', value: '18+', icon: '📄', color: 'from-indigo-400 to-indigo-600' },
  { label: 'Industry Sectors', value: '12+', icon: '🏢', color: 'from-teal-400 to-teal-600' },
  { label: 'Research Hours', value: '500+', icon: '🔬', color: 'from-purple-400 to-purple-600' },
  { label: 'Expert Authors', value: '35+', icon: '👨‍🎓', color: 'from-cyan-400 to-cyan-600' },
];

// White papers data from the website
const whitePapers = [
  {
    id: 1,
    title: 'Benefits of Targeted Email Marketing',
    subtitle: 'Maximizing ROI Through Personalization',
    description: 'There are many benefits to email marketing. Customizing your email campaigns and creating targeted content are two advantages of email marketing. Engaging an already engaged audience is another. What\'s more, it is extremely low cost compared to other marketing channels.',
    category: 'Email Marketing',
    readTime: '12 min read',
    pages: '28 pages',
    image: '/dashboard1.webp',
    featured: true,
    downloadCount: '3,240',
    publishDate: 'June 19, 2025',
    author: 'Marketing Analytics Team'
  },
  {
    id: 2,
    title: 'Multi-channel Integration Strategy',
    subtitle: 'Unified Customer Experience Across Touchpoints',
    description: 'Learn how to create seamless customer experiences across multiple channels. This white paper explores strategies for integrating marketing efforts and maintaining consistent messaging.',
    category: 'Marketing Strategy',
    readTime: '15 min read',
    pages: '32 pages',
    image: '/dashboard2.webp',
    featured: true,
    downloadCount: '2,890',
    publishDate: 'June 19, 2025',
    author: 'Customer Analytics Team'
  },
  {
    id: 3,
    title: 'Why Brick & Mortar Grocers Should Leverage Their Data',
    subtitle: 'Digital Transformation in Retail',
    description: 'Discover how traditional grocery retailers can use data analytics to compete with online giants and enhance customer loyalty through personalized experiences.',
    category: 'Retail Analytics',
    readTime: '18 min read',
    pages: '38 pages',
    image: '/dashboard3.webp',
    featured: false,
    downloadCount: '2,150',
    publishDate: 'June 19, 2025',
    author: 'Retail Analytics Team'
  },
  {
    id: 4,
    title: 'Use of Analytics in QSRs',
    subtitle: 'Fast Food Industry Data Insights',
    description: 'Explore how Quick Service Restaurants are leveraging analytics to optimize operations, improve customer satisfaction, and increase profitability.',
    category: 'QSR Analytics',
    readTime: '14 min read',
    pages: '26 pages',
    image: '/video-bg.webp',
    featured: false,
    downloadCount: '1,980',
    publishDate: 'June 19, 2025',
    author: 'Industry Analytics Team'
  },
  {
    id: 5,
    title: 'Do Direct Mailers Still Work?',
    subtitle: 'The Evolution of Traditional Marketing',
    description: 'An in-depth analysis of direct mail effectiveness in the digital age, including integration strategies with digital marketing channels.',
    category: 'Direct Marketing',
    readTime: '10 min read',
    pages: '22 pages',
    image: '/dashboard1.webp',
    featured: false,
    downloadCount: '1,750',
    publishDate: 'June 19, 2025',
    author: 'Marketing Research Team'
  },
  {
    id: 6,
    title: 'Customer Lifetime Value Optimization',
    subtitle: 'Maximizing Long-term Customer Relationships',
    description: 'Learn advanced strategies for calculating, predicting, and optimizing customer lifetime value to drive sustainable business growth.',
    category: 'Customer Analytics',
    readTime: '16 min read',
    pages: '34 pages',
    image: '/dashboard2.webp',
    featured: false,
    downloadCount: '2,420',
    publishDate: 'May 20, 2025',
    author: 'Customer Analytics Team'
  },
  {
    id: 7,
    title: 'Predictive Analytics in Healthcare',
    subtitle: 'Improving Patient Outcomes Through Data',
    description: 'Explore how healthcare organizations are using predictive analytics to improve patient care, reduce costs, and enhance operational efficiency.',
    category: 'Healthcare Analytics',
    readTime: '20 min read',
    pages: '42 pages',
    image: '/dashboard3.webp',
    featured: false,
    downloadCount: '1,890',
    publishDate: 'May 15, 2025',
    author: 'Healthcare Analytics Team'
  },
  {
    id: 8,
    title: 'Data Quality Management Framework',
    subtitle: 'Building Trust in Your Data Assets',
    description: 'A comprehensive framework for establishing and maintaining high data quality standards across your organization.',
    category: 'Data Quality',
    readTime: '14 min read',
    pages: '30 pages',
    image: '/video-bg.webp',
    featured: false,
    downloadCount: '2,100',
    publishDate: 'May 10, 2025',
    author: 'Data Management Team'
  }
];

// Categories for filtering
const categories = ['All', 'Email Marketing', 'Marketing Strategy', 'Retail Analytics', 'QSR Analytics', 'Direct Marketing', 'Customer Analytics', 'Healthcare Analytics', 'Data Quality'];

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

    const targetValues = [18, 12, 500, 35];
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
                {animatedValues[index]}{stat.label === 'Research Hours' ? '+' : '+'}
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

function WhitePaperCard({ paper, index }) {
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
          src={paper.image}
          alt={paper.title}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale-110' : 'scale(100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {paper.category}
          </span>
        </div>
        {paper.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-sm opacity-90">{paper.pages}</div>
        </div>
        <div className="absolute bottom-4 right-4 text-white">
          <div className="text-sm opacity-90">📥 {paper.downloadCount}</div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-sm text-indigo-600 font-semibold mb-2">{paper.publishDate}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{paper.title}</h3>
        <p className="text-sm text-gray-600 mb-3 italic">{paper.subtitle}</p>

        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-3">{paper.description}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">⏱️ {paper.readTime}</span>
            <span>📄 {paper.pages}</span>
          </div>
          <div className="text-xs text-gray-400">
            By {paper.author}
          </div>
        </div>

        <button className="w-full bg-gradient-main text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Download White Paper
        </button>
      </div>
    </div>
  );
}

export default function WhitePapers() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPapers, setFilteredPapers] = useState(whitePapers);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPapers(whitePapers);
    } else {
      setFilteredPapers(whitePapers.filter(paper => paper.category === selectedCategory));
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
              White Papers
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl mb-8 animate-fadeInUp">
              In-depth research and analysis on critical business topics. Our white papers provide actionable insights backed by data and industry expertise.
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

        {/* White Papers Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Research & Insights
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Access our comprehensive collection of white papers covering industry trends, best practices, and innovative strategies across various business domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPapers.map((paper, index) => (
                <WhitePaperCard key={paper.id} paper={paper} index={index} />
              ))}
            </div>

            {filteredPapers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No white papers found</h3>
                <p className="text-gray-600">Try selecting a different category or check back later for new white papers.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-main">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Custom Research?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let our research team create a custom white paper tailored to your specific industry challenges and business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Request Custom Research
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
