import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// SVG for dotted world map background
const DottedMap = () => (
  <svg viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none select-none">
    <g opacity="0.18" fill="#888">
      {/* Example dots, you can expand for more detail */}
      {Array.from({ length: 40 }).map((_, i) => (
        <circle key={i} cx={30 + (i % 10) * 120} cy={60 + Math.floor(i / 10) * 100} r="6" />
      ))}
    </g>
  </svg>
);

// Absolute positions for desktop (percentages, left/top)
const memberPositions = [
  { left: '7%', top: '10%' },
  { left: '18%', top: '7%' },
  { left: '30%', top: '13%' },
  { left: '42%', top: '6%' },
  { left: '55%', top: '12%' },
  { left: '68%', top: '8%' },
  { left: '80%', top: '15%' },
  { left: '12%', top: '38%' },
  { left: '25%', top: '32%' },
  { left: '37%', top: '28%' },
  { left: '50%', top: '35%' },
  { left: '62%', top: '28%' },
  { left: '75%', top: '32%' },
  { left: '87%', top: '38%' },
  { left: '20%', top: '60%' },
  { left: '33%', top: '55%' },
  { left: '47%', top: '62%' },
  { left: '60%', top: '58%' },
  { left: '73%', top: '60%' },
  { left: '85%', top: '65%' },
];

const teamMembers = [
  {
    name: 'Harish Shegonkar',
    title: 'Senior ETL Architect',
    image: '/harish.webp',
    intro: 'With over 14 years of experience, Harish is a seasoned data professional who has worked across global corporations, banks, and startups. He has held key roles as a Data Engineer, ETL and Data Warehouse Architect, and Oracle SQL/PLSQL Developer. Renowned for his expertise in Informatica, Python, Unix scripting, and data migration, he brings deep technical skills paired with strong leadership, having led teams of 15 across multiple functions. His track record includes designing scalable data architectures, optimizing SQL performance, and delivering high-impact, data-driven solutions that exceed business goals.',
    linkedin: 'https://www.linkedin.com/in/harish-shegokar-etl/'
  },
  {
    name: 'Aditya G Kale',
    title: 'Jr.Data Engineer',
    image: '/aditya.webp',
    intro: 'Aditya G Kale is an emerging Data Engineering professional specializing in ETL development with hands-on experience in Informatica PowerCenter, IICS, UNIX, SQL, and Python. With a strong foundation in data integration and automation, Aditya is passionate about building efficient data pipelines and contributing to scalable data solutions.',
    linkedin: 'https://www.linkedin.com/in/aditya-g-kale/'
  },
  {
    name: 'Sanjay Bidikar',
    title: 'Data Engineer',
    image: '/sanjay.webp',
    intro: 'Sanjay Bidikar is a Data Engineer at Express Analytics, dedicated to transforming raw data into strategic insights. With expertise in Power BI, SQL/PostgreSQL, Python, AWS Redshift, and Informatica PowerCenter, he combines technical proficiency with a passion for data-driven problem-solving. Sanjay is continuously refining his skills in analytics and scripting, making him a valuable asset in building intelligent, scalable data solutions.',
    linkedin: 'https://www.linkedin.com/in/sanjay-bidikar-213404203/'
  },
  {
    name: 'Caleb Stephen',
    title: 'Data Scientist',
    image: '/Caleb.webp',
    intro: 'A highly motivated and analytically-minded engineer with good programming and management skills. Interested and proficient in Data Science and Machine Learning. Also a capable Java backend developer. Good team player. Eager to learn and grow.',
    linkedin: 'https://www.linkedin.com/in/caleb-stephen-w2/'
  },
  {
    name: 'Ajmal Aksar',
    title: 'Data Engineer',
    image: '/ajmal.webp',
    intro: 'Ajmal Aksar is a budding Data Engineer at Express Analytics and a final-year student specializing in Artificial Intelligence and Data Science at Karunya Institute of Technology and Sciences. With a strong foundation in programming and problem-solving, Ajmal brings hands-on experience from practical projects focused on turning data into impactful solutions. He’s passionate about innovation, collaboration, and using analytics to drive real-world results. Beyond his technical pursuits, he finds inspiration in reading and gaming, which fuel his creativity and perspective.',
    linkedin: 'https://www.linkedin.com/in/ajmalaksar/'
  },
  {
    name: 'Jitesh Shivhare',
    title: 'Sales and Partnerships Manager',
    image: '/jitesh.webp',
    intro: 'Jitesh Shivhare is a results-driven Sales and Partnerships Manager dedicated to helping financial leaders unlock hidden value through AI-powered data solutions. With a focus on cost optimization, cashflow improvement, and bottom-line growth, he specializes in identifying and capturing overpayments and revenue leakages. Through innovative tools like the AI-Powered Leakage Identification Engine, Jitesh enables organizations to automate monitoring systems, drive profitability, and achieve sustainable financial efficiency.',
    linkedin: 'https://www.linkedin.com/in/jiteshshivhare/'
  },
  {
    name: 'Prateek Bhurkay',
    title: 'Technical Operations Manager',
    image: '/prateek.webp',
    intro: 'Prateek Bhurkay is the Technical Operations Manager at Express Analytics, bringing over five years of experience in driving innovative data and marketing solutions. Based in Pune, he plays a pivotal role in ideating and delivering new products—from concept to production—that enhance client outcomes and boost marketing ROI. Prateek blends strategic thinking with hands-on execution to develop scalable, impactful business solutions in a hybrid work environment.',
    linkedin: 'https://www.linkedin.com/in/prateek-bhurkay/'
  },
  {
    name: 'Prasanna C',
    title: 'Digital Marketing Strategist',
    image: '/prasanna.webp',
    intro: 'Prasanna C is a seasoned Senior Analyst in SEO and a certified Digital Marketing and Google Ads professional with over 10 years of experience. His expertise spans across SEO strategy, Online Reputation Management (ORM), and data-driven digital marketing. Well-versed in tools like Google Analytics, AHRefs, SEMrush, Moz, Screaming Frog, and various social media and email marketing platforms, Prasanna is known for crafting effective campaigns that drive visibility, engagement, and results.',
    linkedin: 'https://www.linkedin.com/in/prasanna-c-75b81810a/'
  },
  {
    name: 'Mangesh Jangam',
    title: 'Data Engineer',
    image: '/Mangesh.webp',
    intro: 'Mangesh Jangam is a Data Engineer at Express Analytics, contributing to the development of robust data pipelines and analytics solutions. With a strong foundation in data engineering tools and technologies, Mangesh plays a key role in transforming raw data into actionable insights that support business intelligence and strategic decision-making. His commitment to data accuracy, performance optimization, and scalable architecture makes him an asset to any data-driven team.',
    linkedin: ''
  },
  {
    name: 'Harsh Verma',
    title: 'Senior Data Analyst',
    image: '/harsh_verma.webp',
    intro: 'Harsh Verma is a Senior Data Analyst with a strong academic foundation from the Indian Institute of Technology, Delhi. With experience at Express Analytics and a deep understanding of data-driven decision-making, Harsh leverages advanced analytics to uncover insights and drive strategic outcomes. His analytical expertise and problem-solving acumen make him a valuable asset in transforming complex data into impactful business intelligence.',
    linkedin: 'https://www.linkedin.com/in/harsh-verma1607/'
  },
  {
    name: 'Manmeet Singh Sodhi',
    title: 'Digital Marketing Lead',
    image: '/manmeet.webp',
    intro: 'Manmeet Singh Sodhi is a seasoned Digital Marketing Lead with extensive experience in the IT and services industry. He specializes in Account-Based Marketing (ABM), SEO, and B2B lead generation, with a strong command over CMS platforms like HubSpot. Manmeet has a proven track record of boosting website visibility, driving organic traffic through strategic keyword research, and executing high-performing ABM campaigns. His passion for SEO-optimized web development and data-driven marketing makes him a valuable asset in delivering measurable business growth.',
    linkedin: 'https://www.linkedin.com/in/caleb-stephen-w2/'
  },
  {
    name: 'Arvind Singh',
    title: 'ETL Developer',
    image: '/arvind.webp',
    intro: 'Arvind Singh is an ETL Developer at Express Analytics with hands-on experience in designing, developing, and supporting data warehouse projects. With over a year of professional experience, he specializes in data integration using Informatica PowerCenter, Oracle 11g, and SQL. Arvind also brings working knowledge of Python for analytics and machine learning, and has experience operating within Agile development environments. His growing expertise makes him a valuable contributor to data-driven initiatives.',
    linkedin: 'https://www.linkedin.com/in/arvind-singh-id/'
  },
  {
    name: 'Tarun Singh Panwar',
    title: 'Human Resource – Operations',
    image: '/tarunsingh.webp',
    intro: 'Tarun Singh Panwar is a motivated and adaptable professional with demonstrated experience in marketing, business management, and human resources. Skilled in Social Media Optimization (SMO), Social Media Marketing (SMM), HR operations support, and business administration, he brings a versatile approach to dynamic workplace environments. Tarun is passionate about continuous learning and career growth, always seeking opportunities in reputable firms where he can expand his knowledge and sharpen his professional skill set to achieve long-term career goals.',
    linkedin: 'https://www.linkedin.com/in/tarunsinghpanwar/'
  },
  {
    name: 'Anjana Agrawal',
    title: 'Marketing Head',
    image: '/Anjana.webp',
    intro: 'Anjana Agarwal is a seasoned marketing professional with over 8 years of experience in the IT industry, successfully navigating both B2B and B2C segments. She brings deep expertise in leading end-to-end marketing campaigns—from strategic planning and budgeting to execution—all aligned with core business objectives. Anjana has a strong background in performance and growth marketing, Go-to-Market strategies, product promotion, and management. Her skill set spans across SEO, PPC, Google Ads, Google Analytics, CRM, ERP, video marketing, mobile app promotion, and channel marketing. She has also led joint marketing initiatives and events in collaboration with OEMs, showcasing her ability to drive impactful marketing partnerships and results.',
    linkedin: 'https://www.linkedin.com/in/anjana-agrawal-a937b953/'
  },
  {
    name: 'Riya Dhawan',
    title: 'Research Analyst',
    image: '/ria.webp',
    intro: 'Riya Dhawan is a passionate and driven individual with a strong foundation in technology and business. Holding a B.Tech in Computer Science and Engineering, she has developed hands-on expertise in programming and web development, including Python, Django, HTML, CSS, and JavaScript. Riya is also proficient in relational databases (SQL) and data manipulation using libraries like NumPy, Pandas, Matplotlib, and Seaborn. With a keen interest in research and a talent for writing technical content, she excels at translating complex concepts into clear, engaging narratives. A natural multitasker and lifelong learner, Riya is always eager to explore new skills and contribute meaningfully to every project she undertakes.',
    linkedin: 'https://www.linkedin.com/in/riya-dhawan-2b6731212/'
  },
  {
    name: 'Kiran Mangalavedhe',
    title: 'Sr ETL Engineer',
    image: '/kiran.webp',
    intro: 'Kiran Mangalavedhe is a Senior ETL Engineer at Express Analytics, bringing strong expertise in data integration, transformation, and pipeline optimization. With a deep understanding of ETL frameworks and data warehousing, Kiran plays a key role in ensuring the seamless flow and accuracy of data across systems—enabling impactful, data-driven business decisions.',
    linkedin: 'https://www.linkedin.com/in/kiran-mangalavedhe-87271213a/'
  },
  {
    name: 'Rashmi Umar',
    title: 'ETL Developer',
    image: '/rashmi.webp',
    intro: 'Rashmi Umar is an ETL Developer at Express Analytics India Pvt. Ltd., passionate about data transformation and analytics. With a strong academic background—holding second rank in her MCA from KLS GIT, Karnataka, and first rank in BCA from MES College, Goa—she brings both dedication and excellence to her work. Rashmi specializes in building efficient ETL pipelines and optimizing data workflows, consistently striving to innovate and grow within the dynamic field of data engineering.',
    linkedin: 'https://www.linkedin.com/in/rashmi-umar-080147229/'
  },
  {
    name: 'Shweta Verma',
    title: 'Associate Product Marketing Manager',
    image: '/shweta.webp',
    intro: 'As a Product Marketing Manager at Express Analytics, Sweta Verma leverages her MBA in Marketing and extensive experience in product and market research to drive the development and launch of innovative solutions. She has a proven track record of conducting thorough market analysis, collaborating with design agencies, and playing a Scrum Master role throughout the product lifecycle. Sweta is passionate about creating value for customers and stakeholders through data-driven insights and strategic marketing initiatives. She is always eager to learn new skills and technologies to enhance her performance and contribute to the organization’s growth.',
    linkedin: 'https://www.linkedin.com/in/shweta-verma-80aa44107/'
  },
  {
    name: 'Ritikaa Puranik',
    title: 'Content Marketing Lead',
    image: '/cropped_circle_image.webp',
    intro: 'Ritika Puranik is the Content Marketing Lead at Express Analytics — a self‑described “Copy Alchemist” who transforms data and insights into persuasive, revenue-driving brand narratives . She partners with businesses and agencies to craft high‑quality, ROI-focused content—blog posts, whitepapers, campaigns—that boosts visibility and conversions . Passionate about storytelling rooted in analytics, Ritika elevates Express Analytics’ brand messaging with strategic, engaging copy.',
    linkedin: 'https://www.linkedin.com/in/reepuranikcopyalchemist/'
  },
];

const infoCards = [
  {
    number: '01.',
    title: 'Our Work Culture',
    image: '/employee-development-program.webp',
    desc: 'Culture is the cornerstone of everything at EA. Members of our team swear by our employee-centric and employee-led work culture. Starting with a comprehensive onboarding designed to set you up for success, you will find a strong work ethic, leadership support and unwavering commitment to your work-life balance throughout your career with us. EA is an equal opportunity employer.'
  },
  {
    number: '02.',
    title: 'Career Roadmap',
    image: '/eaabout3.webp',
    desc: 'All team members map their personalized career development and learning plan along with a mentor. This helps us visualize a powerful career path for you, and define the niche skills required to achieve your career goals.'
  },
  {
    number: '03.',
    title: 'Leadership Development Program',
    image: '/offer-your-clients-every-1.webp',
    desc: 'Everyone in EA is groomed to lead progressively larger teams and manage bigger responsibilities. The Leadership Program is designed to identify your specific strengths and interests, align them to business goals, and define the support you need to hone your unique leadership style.'
  },
  {
    number: '04.',
    title: 'Learning Resources',
    image: '/leadership-development-program.webp',
    desc: 'We provide a variety of learning resources to support you in your learning & development journey, be it personal or professional. We also provide access to an advanced learning management system with numerous online courses, thousands of best-in-class books, in-house discussion forums, & expertise mentoring on your learning curve.'
  },
  {
    number: '05.',
    title: 'Employee Development Program',
    image: '/Innovation-Together-1.webp',
    desc: 'Each year, team members identify new development goals. You are encouraged to build your own development plans, and we’ll help you achieve them!'
  },
];

export default function Careers() {
  const [modal, setModal] = useState(null);
  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      {/* Hero Section with Gradient */}
      <section className="w-full pt-16 pb-8 px-4" style={{ background: 'linear-gradient(180deg, #e9d6f7 0%, #fbe6e7 100%)' }}>
        <div className="max-w-7xl mx-auto relative">
          <div className="uppercase text-pink-700 font-bold text-xs mb-2 tracking-widest text-center">Careers</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-pink-700 mb-2 text-center">Join us and make a difference</h1>
          <p className="text-gray-700 max-w-2xl mb-6 mx-auto text-center">Express Analytics is the place to be if you are obsessed with data-powered business excellence. We offer opportunities to work on cutting-edge AI-powered solutions for clients across industries, including retail, food and restaurants, and financial services. Join us to learn, grow, and design the exciting future of AI and Analytics.</p>
          {/* Dotted Map Background */}
          <div className="relative w-full h-[420px] md:h-[400px] mt-8 mb-8">
            <DottedMap />
            {/* Team Faces - absolute for md+, grid for mobile */}
            <div className="hidden md:block w-full h-full absolute top-0 left-0">
              {teamMembers.map((m, i) => (
                <button
                  key={m.name}
                  style={{ left: memberPositions[i % memberPositions.length].left, top: memberPositions[i % memberPositions.length].top, position: 'absolute' }}
                  className="rounded-full border-4 border-white shadow-lg overflow-hidden w-24 h-24 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-400"
                  tabIndex={0}
                  aria-label={`View profile for ${m.name}`}
                  onClick={() => setModal(i)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModal(i); }}
                >
                  <Image src={m.image} alt={m.name} width={96} height={96} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
            {/* Mobile grid */}
            <div className="md:hidden grid grid-cols-4 gap-4 w-full h-full">
              {teamMembers.map((m, i) => (
                <button
                  key={m.name}
                  className="rounded-full border-4 border-white shadow-lg overflow-hidden w-16 h-16 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-400"
                  tabIndex={0}
                  aria-label={`View profile for ${m.name}`}
                  onClick={() => setModal(i)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModal(i); }}
                >
                  <Image src={m.image} alt={m.name} width={64} height={64} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
            {/* Modal */}
            {modal !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setModal(null)}>
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative flex flex-col items-center" onClick={e => e.stopPropagation()}>
                  <Image src={teamMembers[modal].image} alt={teamMembers[modal].name} width={160} height={160} className="rounded-full border-4 border-pink-200 mb-4" />
                  <div className="text-xl font-bold text-pink-700 mb-1">{teamMembers[modal].name}</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">{teamMembers[modal].title}</div>
                  <p className="text-gray-600 text-sm mb-4 text-center">{teamMembers[modal].intro}</p>
                  {teamMembers[modal].linkedin && (
                    <a href={teamMembers[modal].linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 text-2xl"><FaLinkedin /></a>
                  )}
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-pink-600 text-2xl font-bold" onClick={() => setModal(null)} aria-label="Close profile">&times;</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Employee First Company Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-300 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div className="flex-1">
                <div className="uppercase text-pink-700 font-bold text-xs mb-2 tracking-widest text-left">Working @ Express Analytics</div>
                <div className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 md:mb-0 text-left">Express Analytics is an employee first Company</div>
              </div>
              <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-8 flex justify-end w-full md:w-auto">
                <Link href="/all-openings">
                  <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-xl shadow transition animate-float" style={{ animation: 'floatY 2.5s ease-in-out infinite' }}>View Current Openings</button>
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              {infoCards.map((card, idx) => (
                <div key={card.title} className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow p-6 md:p-8">
                  <div className="text-3xl font-extrabold text-pink-700 mr-6 mb-4 md:mb-0 md:w-16 md:text-right">{card.number}</div>
                  <Image src={card.image} alt={card.title} width={80} height={80} className="rounded-lg mr-6 mb-4 md:mb-0" />
                  <div>
                    <div className="text-lg font-bold mb-1">{card.title}</div>
                    <div className="text-gray-700 text-sm">{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CTA and Footer (reuse from other pages) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center bg-black rounded-2xl pt-12 pb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Analyze. Visualize. Take Actions.</h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gradient-main">Unlock the Power of Data with Our Analytics Solutions.</h3>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-10 mb-4 px-4 py-6">
            <span className="inline-block bg-gray-800 text-white px-6 py-3 rounded-xl font-bold">AI Enhanced</span>
            <button className="inline-block bg-gradient-main text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">Schedule a Consultation</button>
            <span className="inline-block bg-gray-800 text-white px-6 py-3 rounded-xl font-bold">Advanced Analytics</span>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

<style jsx global>{`
@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: floatY 2.5s ease-in-out infinite;
}
`}</style>
