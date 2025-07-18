import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

// Hero stats for Webinars
const heroStats = [
  { label: 'Webinars Hosted', value: '45+', icon: '🎥', color: 'from-red-400 to-red-600' },
  { label: 'Attendees', value: '15K+', icon: '👥', color: 'from-blue-400 to-blue-600' },
  { label: 'Expert Speakers', value: '60+', icon: '🎤', color: 'from-green-400 to-green-600' },
  { label: 'Countries Reached', value: '25+', icon: '🌍', color: 'from-purple-400 to-purple-600' },
];

// Upcoming webinars data
const upcomingWebinars = [
  {
    id: 1,
    title: 'AI-Powered Customer Segmentation: Beyond Demographics',
    description: 'Learn how to leverage artificial intelligence to create more sophisticated customer segments that drive personalized marketing campaigns and increase conversion rates.',
    date: 'July 15, 2025',
    time: '2:00 PM EST',
    duration: '60 minutes',
    speaker: 'Dr. Sarah Chen',
    speakerTitle: 'Senior Data Scientist',
    speakerImage: '/dashboard1.webp',
    category: 'Customer Analytics',
    attendees: 234,
    maxAttendees: 500,
    featured: true,
    registrationRequired: true
  },
  {
    id: 2,
    title: 'Marketing Mix Modeling in the Digital Age',
    description: 'Discover how to adapt traditional marketing mix modeling techniques for today\'s complex digital landscape and measure true marketing ROI.',
    date: 'July 22, 2025',
    time: '1:00 PM EST',
    duration: '45 minutes',
    speaker: 'Michael Rodriguez',
    speakerTitle: 'Marketing Analytics Director',
    speakerImage: '/dashboard2.webp',
    category: 'Marketing Analytics',
    attendees: 189,
    maxAttendees: 300,
    featured: false,
    registrationRequired: true
  },
  {
    id: 3,
    title: 'Predictive Analytics for E-commerce Growth',
    description: 'Explore how predictive analytics can forecast customer behavior, optimize inventory, and drive revenue growth in e-commerce businesses.',
    date: 'July 29, 2025',
    time: '3:00 PM EST',
    duration: '75 minutes',
    speaker: 'Jennifer Park',
    speakerTitle: 'E-commerce Analytics Lead',
    speakerImage: '/dashboard3.webp',
    category: 'Predictive Analytics',
    attendees: 156,
    maxAttendees: 400,
    featured: true,
    registrationRequired: true
  },
  {
    id: 4,
    title: 'Data Quality Management: Best Practices',
    description: 'Learn essential strategies for maintaining high data quality standards and building trust in your analytics initiatives.',
    date: 'August 5, 2025',
    time: '11:00 AM EST',
    duration: '50 minutes',
    speaker: 'David Thompson',
    speakerTitle: 'Data Governance Expert',
    speakerImage: '/video-bg.webp',
    category: 'Data Quality',
    attendees: 98,
    maxAttendees: 250,
    featured: false,
    registrationRequired: true
  }
];

// Recorded webinars data
const recordedWebinars = [
  {
    id: 1,
    title: 'Customer Lifetime Value: The Complete Guide',
    description: 'A comprehensive overview of CLV calculation methods, predictive modeling techniques, and strategies for maximizing customer value.',
    date: 'June 10, 2025',
    duration: '65 minutes',
    speaker: 'Dr. Emily Watson',
    speakerTitle: 'Customer Analytics Specialist',
    speakerImage: '/dashboard1.webp',
    category: 'Customer Analytics',
    views: 1247,
    rating: 4.8,
    featured: true,
    thumbnail: '/dashboard1.webp'
  },
  {
    id: 2,
    title: 'Multi-Touch Attribution: Solving the Puzzle',
    description: 'Deep dive into multi-touch attribution models, their implementation challenges, and how to choose the right approach for your business.',
    date: 'May 28, 2025',
    duration: '55 minutes',
    speaker: 'Alex Johnson',
    speakerTitle: 'Attribution Analytics Lead',
    speakerImage: '/dashboard2.webp',
    category: 'Marketing Analytics',
    views: 892,
    rating: 4.6,
    featured: false,
    thumbnail: '/dashboard2.webp'
  },
  {
    id: 3,
    title: 'Voice of Customer Analytics Implementation',
    description: 'Step-by-step guide to implementing VoC analytics, from data collection to actionable insights and business impact.',
    date: 'May 15, 2025',
    duration: '70 minutes',
    speaker: 'Lisa Chen',
    speakerTitle: 'VoC Analytics Manager',
    speakerImage: '/dashboard3.webp',
    category: 'Customer Analytics',
    views: 1103,
    rating: 4.9,
    featured: true,
    thumbnail: '/dashboard3.webp'
  },
  {
    id: 4,
    title: 'Business Intelligence Dashboard Design',
    description: 'Learn the principles of effective dashboard design, user experience considerations, and how to create impactful visualizations.',
    date: 'May 8, 2025',
    duration: '60 minutes',
    speaker: 'Robert Kim',
    speakerTitle: 'BI Design Specialist',
    speakerImage: '/video-bg.webp',
    category: 'Data Visualization',
    views: 756,
    rating: 4.7,
    featured: false,
    thumbnail: '/video-bg.webp'
  },
  {
    id: 5,
    title: 'Churn Prediction Models: From Theory to Practice',
    description: 'Practical implementation of churn prediction models using machine learning techniques and real-world case studies.',
    date: 'April 30, 2025',
    duration: '80 minutes',
    speaker: 'Dr. Maria Garcia',
    speakerTitle: 'Machine Learning Engineer',
    speakerImage: '/dashboard1.webp',
    category: 'Predictive Analytics',
    views: 1342,
    rating: 4.8,
    featured: false,
    thumbnail: '/dashboard1.webp'
  },
  {
    id: 6,
    title: 'Data Cleaning Automation Strategies',
    description: 'Discover how to automate data cleaning processes, reduce manual effort, and maintain consistent data quality standards.',
    date: 'April 22, 2025',
    duration: '50 minutes',
    speaker: 'Tom Wilson',
    speakerTitle: 'Data Engineering Lead',
    speakerImage: '/dashboard2.webp',
    category: 'Data Quality',
    views: 623,
    rating: 4.5,
    featured: false,
    thumbnail: '/dashboard2.webp'
  }
];

// Categories for filtering
const categories = ['All', 'Customer Analytics', 'Marketing Analytics', 'Predictive Analytics', 'Data Quality', 'Data Visualization'];

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

    const targetValues = [45, 15, 60, 25];
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
                {animatedValues[index]}{stat.label === 'Attendees' ? 'K+' : '+'}
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

function UpcomingWebinarCard({ webinar, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const progress = (webinar.attendees / webinar.maxAttendees) * 100;

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
          src={webinar.speakerImage}
          alt={webinar.title}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale-110' : 'scale(100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {webinar.category}
          </span>
        </div>
        {webinar.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-sm opacity-90">📅 {webinar.date}</div>
          <div className="text-sm opacity-90">⏰ {webinar.time}</div>
        </div>
        <div className="absolute bottom-4 right-4 text-white">
          <div className="text-sm opacity-90">🎥 {webinar.duration}</div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{webinar.title}</h3>

        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-3">{webinar.description}</p>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image
              src={webinar.speakerImage}
              alt={webinar.speaker}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-800">{webinar.speaker}</div>
            <div className="text-xs text-gray-500">{webinar.speakerTitle}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Registration: {webinar.attendees}/{webinar.maxAttendees}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-main h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button className="w-full bg-gradient-main text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Register Now
        </button>
      </div>
    </div>
  );
}

function RecordedWebinarCard({ webinar, index }) {
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
          src={webinar.thumbnail}
          alt={webinar.title}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale-110' : 'scale(100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {webinar.category}
          </span>
        </div>
        {webinar.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-sm opacity-90">📅 {webinar.date}</div>
          <div className="text-sm opacity-90">🎥 {webinar.duration}</div>
        </div>
        <div className="absolute bottom-4 right-4 text-white">
          <div className="text-sm opacity-90">👁️ {webinar.views}</div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{webinar.title}</h3>

        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-3">{webinar.description}</p>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image
              src={webinar.speakerImage}
              alt={webinar.speaker}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-800">{webinar.speaker}</div>
            <div className="text-xs text-gray-500">{webinar.speakerTitle}</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">⭐ {webinar.rating}</span>
            <span>👁️ {webinar.views} views</span>
          </div>
        </div>

        <button className="w-full bg-gradient-main text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Watch Recording
        </button>
      </div>
    </div>
  );
}

export default function Webinars() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filteredUpcoming, setFilteredUpcoming] = useState(upcomingWebinars);
  const [filteredRecorded, setFilteredRecorded] = useState(recordedWebinars);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredUpcoming(upcomingWebinars);
      setFilteredRecorded(recordedWebinars);
    } else {
      setFilteredUpcoming(upcomingWebinars.filter(webinar => webinar.category === selectedCategory));
      setFilteredRecorded(recordedWebinars.filter(webinar => webinar.category === selectedCategory));
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
              Webinars
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl mb-8 animate-fadeInUp">
              Join our live webinars and access recorded sessions from industry experts. Learn from real-world case studies and practical implementations.
            </p>
            <HeroChart />
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
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

            {/* Tab Navigation */}
            <div className="flex justify-center">
              <div className="bg-white rounded-full p-1 shadow-lg">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'upcoming'
                      ? 'bg-gradient-main text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900'
                    }`}
                >
                  🎥 Upcoming Webinars
                </button>
                <button
                  onClick={() => setActiveTab('recorded')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'recorded'
                      ? 'bg-gradient-main text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900'
                    }`}
                >
                  📺 Recorded Sessions
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Webinars Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {activeTab === 'upcoming' ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Upcoming Live Webinars
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Register for our upcoming live webinars and interact with industry experts in real-time.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredUpcoming.map((webinar, index) => (
                    <UpcomingWebinarCard key={webinar.id} webinar={webinar} index={index} />
                  ))}
                </div>

                {filteredUpcoming.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎥</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No upcoming webinars found</h3>
                    <p className="text-gray-600">Try selecting a different category or check back later for new webinars.</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Recorded Webinars
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Access our library of recorded webinars and learn at your own pace from industry experts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredRecorded.map((webinar, index) => (
                    <RecordedWebinarCard key={webinar.id} webinar={webinar} index={index} />
                  ))}
                </div>

                {filteredRecorded.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📺</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No recorded webinars found</h3>
                    <p className="text-gray-600">Try selecting a different category or check back later for new recordings.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-main">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Connected with Our Webinars
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Get notified about upcoming webinars and receive exclusive content directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Subscribe to Webinar Updates
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
                Request Custom Webinar
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
