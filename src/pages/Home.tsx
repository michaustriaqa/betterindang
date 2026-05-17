import Hero from '../components/sections/Hero';
import YakapPromoBanner from '../components/home/YakapPromoBanner';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import StatsSection from '../components/home/StatsSection';
import WeatherMapSection from '../components/home/WeatherMapSection';
import HistorySection from '../components/home/HistorySection';
import LeadershipSection from '../components/home/LeadershipSection';
import ContactSection from '../components/home/ContactSection';
import TourismSection from '../components/home/TourismSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Official community portal of the Municipality of Indang, Cavite. Access government services, information, officials, and public resources."
        keywords="Indang, Cavite, government, local government, services, municipality of indang"
      />
      <main className="flex-grow">
        <Hero />
        <YakapPromoBanner />
        <ServicesSection />
        <StatsSection />
        <WeatherMapSection />
        <GovernmentActivitySection />
        <TourismSection />
        <HistorySection />
        <LeadershipSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
