import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import TransformDataSection from '../components/TransformDataSection';
import ShowcaseVideoSection from '../components/ShowcaseVideoSection';
import ServicesSection from '../components/ServicesSection';
import AnalyticsSolutions from '../components/AnalyticsSolutions';
import TestimonialsSection from '../components/TestimonialsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ResourcesCarousel from '../components/ResourcesCarousel';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="font-sans">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <TransformDataSection />
        <ShowcaseVideoSection />
        <ServicesSection />
        <AnalyticsSolutions />
        <TestimonialsSection />
        <WhyChooseUs />
        <ResourcesCarousel />
      </main>
      <Footer />
    </div>
  );
}
