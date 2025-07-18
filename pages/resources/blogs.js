import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

// Hero stats for Blogs
const heroStats = [
  { label: 'Blog Posts Published', value: '150+', icon: '📝', color: 'from-emerald-400 to-emerald-600' },
  { label: 'Monthly Readers', value: '25K+', icon: '👀', color: 'from-amber-400 to-amber-600' },
  { label: 'Expert Contributors', value: '40+', icon: '✍️', color: 'from-rose-400 to-rose-600' },
  { label: 'Categories Covered', value: '20+', icon: '🏷️', color: 'from-violet-400 to-violet-600' },
];

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Customer Analytics: AI-Driven Insights',
    excerpt: 'Discover how artificial intelligence is revolutionizing customer analytics and enabling businesses to predict customer behavior with unprecedented accuracy.',
    content: 'Customer analytics has evolved significantly over the past decade, moving from basic demographic segmentation to sophisticated AI-powered predictive models. This transformation is enabling businesses to understand their customers at a deeper level than ever before...',
    author: 'Dr. Sarah Johnson',
    authorTitle: 'Senior Analytics Consultant',
    authorImage: '/dashboard1.webp',
    category: 'Customer Analytics',
    tags: ['AI', 'Customer Analytics', 'Predictive Modeling'],
    publishDate: 'June 20, 2025',
    readTime: '8 min read',
    views: 3247,
    likes: 156,
    comments: 23,
    featured: true,
    image: '/dashboard1.webp'
  },
  {
    id: 2,
    title: 'Marketing Mix Modeling: A Complete Guide for 2025',
    excerpt: 'Learn the fundamentals of marketing mix modeling and how to implement it effectively in today\'s complex digital marketing landscape.',
    content: 'Marketing Mix Modeling (MMM) remains one of the most powerful tools for understanding marketing effectiveness and optimizing budget allocation. As digital channels continue to proliferate, the complexity of attribution has increased exponentially...',
    author: 'Michael Chen',
    authorTitle: 'Marketing Analytics Director',
    authorImage: '/dashboard2.webp',
    category: 'Marketing Analytics',
    tags: ['Marketing Mix Modeling', 'Attribution', 'ROI'],
    publishDate: 'June 18, 2025',
    readTime: '12 min read',
    views: 2891,
    likes: 134,
    comments: 18,
    featured: true,
    image: '/dashboard2.webp'
  },
  {
    id: 3,
    title: 'Data Quality: The Foundation of Successful Analytics',
    excerpt: 'Explore the critical importance of data quality and learn practical strategies for maintaining high standards across your organization.',
    content: 'Data quality is the cornerstone of any successful analytics initiative. Without clean, accurate, and reliable data, even the most sophisticated analytics models will produce misleading results. In this comprehensive guide...',
    author: 'Lisa Rodriguez',
    authorTitle: 'Data Quality Specialist',
    authorImage: '/dashboard3.webp',
    category: 'Data Quality',
    tags: ['Data Quality', 'Data Governance', 'Best Practices'],
    publishDate: 'June 15, 2025',
    readTime: '10 min read',
    views: 2156,
    likes: 98,
    comments: 15,
    featured: false,
    image: '/dashboard3.webp'
  },
  {
    id: 4,
    title: 'Predictive Analytics in E-commerce: Driving Growth',
    excerpt: 'How e-commerce businesses are leveraging predictive analytics to optimize inventory, personalize experiences, and increase conversion rates.',
    content: 'E-commerce has become increasingly competitive, with businesses constantly seeking new ways to gain an edge. Predictive analytics offers powerful capabilities for understanding customer behavior and optimizing business operations...',
    author: 'David Kim',
    authorTitle: 'E-commerce Analytics Lead',
    authorImage: '/video-bg.webp',
    category: 'Predictive Analytics',
    tags: ['E-commerce', 'Predictive Analytics', 'Personalization'],
    publishDate: 'June 12, 2025',
    readTime: '9 min read',
    views: 1987,
    likes: 87,
    comments: 12,
    featured: false,
    image: '/video-bg.webp'
  },
  {
    id: 5,
    title: 'Voice of Customer Analytics: Beyond Sentiment Analysis',
    excerpt: 'Discover advanced techniques for extracting actionable insights from customer feedback and reviews.',
    content: 'Voice of Customer (VoC) analytics has evolved far beyond simple sentiment analysis. Modern approaches combine natural language processing, machine learning, and advanced text mining techniques...',
    author: 'Emily Watson',
    authorTitle: 'VoC Analytics Manager',
    authorImage: '/dashboard1.webp',
    category: 'Customer Analytics',
    tags: ['VoC', 'Sentiment Analysis', 'NLP'],
    publishDate: 'June 10, 2025',
    readTime: '11 min read',
    views: 1765,
    likes: 76,
    comments: 9,
    featured: false,
    image: '/dashboard1.webp'
  },
  {
    id: 6,
    title: 'Business Intelligence Dashboard Design Principles',
    excerpt: 'Learn the essential principles for creating effective and user-friendly business intelligence dashboards.',
    content: 'A well-designed business intelligence dashboard can transform how organizations make decisions. However, creating an effective dashboard requires careful consideration of user needs, data visualization principles...',
    author: 'Robert Thompson',
    authorTitle: 'BI Design Expert',
    authorImage: '/dashboard2.webp',
    category: 'Data Visualization',
    tags: ['BI', 'Dashboard Design', 'UX'],
    publishDate: 'June 8, 2025',
    readTime: '7 min read',
    views: 1543,
    likes: 65,
    comments: 8,
    featured: false,
    image: '/dashboard2.webp'
  },
  {
    id: 7,
    title: 'Multi-Touch Attribution: Solving the Attribution Puzzle',
    excerpt: 'A comprehensive guide to implementing multi-touch attribution models in complex marketing environments.',
    content: 'Multi-touch attribution has become essential for understanding the true impact of marketing campaigns across multiple channels. However, implementing effective attribution models presents significant challenges...',
    author: 'Alex Johnson',
    authorTitle: 'Attribution Analytics Lead',
    authorImage: '/dashboard3.webp',
    category: 'Marketing Analytics',
    tags: ['Attribution', 'Multi-Touch', 'Marketing Analytics'],
    publishDate: 'June 5, 2025',
    readTime: '13 min read',
    views: 1321,
    likes: 58,
    comments: 7,
    featured: false,
    image: '/dashboard3.webp'
  },
  {
    id: 8,
    title: 'Churn Prediction: Building Effective Models',
    excerpt: 'Step-by-step guide to building and implementing churn prediction models that drive customer retention.',
    content: 'Customer churn is one of the most critical challenges facing businesses today. Predictive churn models can help identify at-risk customers before they leave, enabling proactive retention strategies...',
    author: 'Maria Garcia',
    authorTitle: 'Customer Success Analytics',
    authorImage: '/video-bg.webp',
    category: 'Predictive Analytics',
    tags: ['Churn Prediction', 'Customer Retention', 'ML'],
    publishDate: 'June 3, 2025',
    readTime: '10 min read',
    views: 1187,
    likes: 52,
    comments: 6,
    featured: false,
    image: '/video-bg.webp'
  },
  {
    id: 9,
    title: 'Data Visualization Best Practices for Analytics',
    excerpt: 'Essential guidelines for creating compelling and informative data visualizations that drive insights.',
    content: 'Effective data visualization is crucial for communicating insights and driving action. However, creating impactful visualizations requires understanding both the data and the audience...',
    author: 'Tom Wilson',
    authorTitle: 'Data Visualization Specialist',
    authorImage: '/dashboard1.webp',
    category: 'Data Visualization',
    tags: ['Data Visualization', 'Best Practices', 'Analytics'],
    publishDate: 'June 1, 2025',
    readTime: '8 min read',
    views: 1054,
    likes: 45,
    comments: 5,
    featured: false,
    image: '/dashboard1.webp'
  }
];

// Categories for filtering
const categories = ['All', 'Customer Analytics', 'Marketing Analytics', 'Predictive Analytics', 'Data Quality', 'Data Visualization'];

// Popular tags
const popularTags = ['AI', 'Machine Learning', 'Customer Analytics', 'Marketing Analytics', 'Data Quality', 'Predictive Modeling', 'Attribution', 'Dashboard Design', 'E-commerce', 'Personalization'];

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

    const targetValues = [150, 25, 40, 20];
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
                {animatedValues[index]}{stat.label === 'Monthly Readers' ? 'K+' : '+'}
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

function BlogCard({ post, index }) {
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
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale-110' : 'scale(100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {post.category}
          </span>
        </div>
        {post.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-sm opacity-90">📅 {post.publishDate}</div>
          <div className="text-sm opacity-90">⏱️ {post.readTime}</div>
        </div>
        <div className="absolute bottom-4 right-4 text-white">
          <div className="text-sm opacity-90">👁️ {post.views}</div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>

        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image
              src={post.authorImage}
              alt={post.author}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-800">{post.author}</div>
            <div className="text-xs text-gray-500">{post.authorTitle}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>❤️ {post.likes}</span>
            <span>💬 {post.comments}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-main text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Read Full Article
        </button>
      </div>
    </div>
  );
}

function FeaturedPost({ post }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="md:flex">
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale-110' : 'scale(100%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {post.category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured Post
            </span>
          </div>
        </div>
        <div className="md:w-1/2 p-8">
          <div className="text-sm text-emerald-600 font-semibold mb-2">{post.publishDate}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h2>
          <p className="text-gray-600 mb-6 line-clamp-4">{post.excerpt}</p>

          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src={post.authorImage}
                alt={post.author}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-semibold text-gray-800">{post.author}</div>
              <div className="text-sm text-gray-500">{post.authorTitle}</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>⏱️ {post.readTime}</span>
              <span>👁️ {post.views}</span>
              <span>❤️ {post.likes}</span>
            </div>
          </div>

          <button className="w-full bg-gradient-main text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Read Featured Article
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [featuredPost] = useState(blogPosts.find(post => post.featured));

  useEffect(() => {
    let filtered = blogPosts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, selectedTag]);

  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-main pt-16 pb-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fadeInUp">
              Blog
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl mb-8 animate-fadeInUp">
              Insights, trends, and expert perspectives on analytics, business intelligence, and data-driven decision making.
            </p>
            <HeroChart />
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Featured Article
                </h2>
              </div>
              <FeaturedPost post={featuredPost} />
            </div>
          </section>
        )}

        {/* Filter Section */}
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                      ? 'bg-gradient-main text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTag === tag
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Latest Articles
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our latest insights, tutorials, and thought leadership content on analytics and business intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.filter(post => !post.featured).map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {filteredPosts.filter(post => !post.featured).length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No blog posts found</h3>
                <p className="text-gray-600">Try selecting a different category or tag, or check back later for new articles.</p>
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
              Subscribe to our newsletter and get the latest analytics insights, tutorials, and industry trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Subscribe to Newsletter
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
                Write for Us
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
