import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

// Hero stats for eBooks
const heroStats = [
  { label: 'eBooks Published', value: '25+', icon: '📚', color: 'from-blue-400 to-blue-600' },
  { label: 'Total Downloads', value: '10K+', icon: '⬇️', color: 'from-green-400 to-green-600' },
  { label: 'Industry Coverage', value: '15+', icon: '🏭', color: 'from-purple-400 to-purple-600' },
  { label: 'Expert Contributors', value: '50+', icon: '👨‍💼', color: 'from-orange-400 to-orange-600' },
];

// eBook data from the website
const ebooks = [
  {
    id: 1,
    title: 'Voice of Customer Analytics and Analysis',
    subtitle: 'The What, Why, And How',
    description: 'Voice of the Customer Analytics (VoCA) is about understanding how your customers feel about your products and services after using them, as well as what they expect from your company. Customers\' expectations are defined by this process, and products are developed to meet their needs.',
    category: 'Customer Analytics',
    readTime: '15 min read',
    pages: '45 pages',
    image: '/dashboard1.webp',
    featured: true,
    downloadCount: '2,450',
    publishDate: 'June 19, 2025'
  },
  {
    id: 2,
    title: 'Tackling The Challenges of Dirty Data',
    subtitle: 'A Comprehensive Guide to Data Quality',
    description: 'Learn how to identify, clean, and maintain high-quality data for better business decisions. This comprehensive guide covers data validation, deduplication, and best practices for data governance.',
    category: 'Data Quality',
    readTime: '12 min read',
    pages: '38 pages',
    image: '/dashboard2.webp',
    featured: true,
    downloadCount: '1,890',
    publishDate: 'June 19, 2025'
  },
  {
    id: 3,
    title: 'What Is A Customer Data Platform & How Do You Select The Right One?',
    subtitle: 'The Ultimate CDP Selection Guide',
    description: 'Discover what Customer Data Platforms are, how they work, and the key factors to consider when selecting the right CDP for your business needs and goals.',
    category: 'CDP',
    readTime: '18 min read',
    pages: '52 pages',
    image: '/dashboard3.webp',
    featured: false,
    downloadCount: '3,120',
    publishDate: 'June 19, 2025'
  },
  {
    id: 4,
    title: 'How Deep Learning Enhances Multi-Touch Attribution',
    subtitle: 'Advanced Attribution Modeling',
    description: 'Explore how deep learning algorithms are revolutionizing multi-touch attribution models, providing more accurate insights into customer journey and marketing effectiveness.',
    category: 'Customer Analytics',
    readTime: '20 min read',
    pages: '58 pages',
    image: '/video-bg.webp',
    featured: false,
    downloadCount: '1,750',
    publishDate: 'June 19, 2025'
  },
  {
    id: 5,
    title: 'The Future of Predictive Analytics in Marketing',
    subtitle: 'AI-Driven Marketing Strategies',
    description: 'Discover how predictive analytics is transforming marketing strategies and enabling businesses to anticipate customer needs and behaviors with unprecedented accuracy.',
    category: 'Marketing Analytics',
    readTime: '16 min read',
    pages: '42 pages',
    image: '/dashboard1.webp',
    featured: false,
    downloadCount: '2,100',
    publishDate: 'May 15, 2025'
  },
  {
    id: 6,
    title: 'Data Visualization Best Practices for Business Intelligence',
    subtitle: 'Creating Impactful Dashboards',
    description: 'Learn the principles of effective data visualization and how to create compelling dashboards that drive business decisions and stakeholder engagement.',
    category: 'Data Visualization',
    readTime: '14 min read',
    pages: '36 pages',
    image: '/dashboard2.webp',
    featured: false,
    downloadCount: '1,680',
    publishDate: 'May 10, 2025'
  }
];

// Categories for filtering
const categories = ['All', 'Customer Analytics', 'Data Quality', 'CDP', 'Marketing Analytics', 'Data Visualization'];

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

    const targetValues = [25, 10, 15, 50];
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
                {animatedValues[index]}{stat.label === 'Total Downloads' ? 'K+' : stat.label === 'eBooks Published' ? '+' : stat.label === 'Industry Coverage' ? '+' : '+'}
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

function EbookCard({ ebook, index }) {
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
          src={ebook.image}
          alt={ebook.title}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale-110' : 'scale(100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {ebook.category}
          </span>
        </div>
        {ebook.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-sm opacity-90">{ebook.pages}</div>
        </div>
        <div className="absolute bottom-4 right-4 text-white">
          <div className="text-sm opacity-90">📥 {ebook.downloadCount}</div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-sm text-blue-600 font-semibold mb-2">{ebook.publishDate}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{ebook.title}</h3>
        <p className="text-sm text-gray-600 mb-3 italic">{ebook.subtitle}</p>

        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-3">{ebook.description}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">⏱️ {ebook.readTime}</span>
            <span>📄 {ebook.pages}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-main text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Download eBook
        </button>
      </div>
    </div>
  );
}

export default function Ebooks() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredEbooks, setFilteredEbooks] = useState(ebooks);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEbooks(ebooks);
    } else {
      setFilteredEbooks(ebooks.filter(ebook => ebook.category === selectedCategory));
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
              eBooks
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl mb-8 animate-fadeInUp">
              Deep dive into analytics topics with our comprehensive eBooks. Expert insights, practical strategies, and actionable frameworks to accelerate your data-driven journey.
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

        {/* eBooks Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Knowledge Resources
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Access our library of expert-written eBooks covering the latest trends, best practices, and innovative strategies in analytics and business intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEbooks.map((ebook, index) => (
                <EbookCard key={ebook.id} ebook={ebook} index={index} />
              ))}
            </div>

            {filteredEbooks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No eBooks found</h3>
                <p className="text-gray-600">Try selecting a different category or check back later for new eBooks.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-main">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Updated with Our Latest Insights
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Get notified when we publish new eBooks and receive exclusive content directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Subscribe to Updates
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
                Request Custom eBook
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
