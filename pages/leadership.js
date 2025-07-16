import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

const leaders = [
  {
    name: 'Hemant Warudkar',
    title: 'Founder and CEO',
    img: '/hemant.webp',
    bio: 'Hemant is an IT veteran with deep domain knowledge of the retail, hi-tech, distribution, utilities, and entertainment industries. He is a widely acknowledged subject matter expert in data-driven marketing strategy & execution and business intelligence.'
  },
  {
    name: 'Jorge Sepulveda',
    title: 'Chief Revenue Officer',
    img: '/jorge.webp',
    bio: 'Jorge has over 30 years’ experience, exceeding his goals, driving new business and digital transformation projects, establishing strategic partnerships, and motivating customers and internal teams to partner with him to achieve a common objective.'
  },
  {
    name: 'Samir Warudkar',
    title: 'Marketing Analytics Consultant',
    img: '/samir.webp',
    bio: 'Samir is a seasoned IT Consultant with proven success in the IT services industry, specialising in full pipeline solutions consulting and guiding projects from concept to implementation.'
  },
];

export default function Leadership() {
  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-main pt-16 pb-8 px-4 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2">Leadership</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Meet Our Leadership Team</h2>
          <div className="text-lg md:text-xl text-gray-200 font-bold mb-4">Leading with Data. Empowering with Insight.</div>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl mb-6">
            Our leaders, along with our customers and partners, take the forefront in driving the growth and strategic goals of Express Analytics.
          </p>
        </section>
        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {leaders.map((leader) => (
                <div key={leader.name} className="bg-gray-50 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-pink-200 shadow-lg">
                    <Image src={leader.img} alt={leader.name} width={160} height={160} className="object-cover w-full h-full" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-pink-700 mb-1 text-center">{leader.name}</h3>
                  <div className="text-md md:text-lg font-semibold text-gray-700 mb-2 text-center">{leader.title}</div>
                  <p className="text-gray-600 text-center text-base md:text-md">{leader.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
