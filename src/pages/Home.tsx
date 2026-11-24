import Hero from '../components/sections/Hero';
import YakapPromoBanner from '../components/home/YakapPromoBanner';
import ServiceGroupsSection from '../components/home/ServiceGroupsSection';
import LatestUpdatesSection from '../components/home/LatestUpdatesSection';
import StatsSection from '../components/home/StatsSection';
import TourismSection from '../components/home/TourismSection';
import LeadershipSection from '../components/home/LeadershipSection';
import SEO from '../components/SEO';

/**
 * Home is organised in five blocks: find, browse services, featured and
 * latest, explore Indang, and government. History, weather and the old
 * contact strip moved to their own pages (Explore, Contact).
 */
const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Community-run portal for the Municipality of Indang, Cavite. Find government services, announcements, officials, events and public information."
        keywords="Indang, Cavite, government, local government, services, municipality of indang"
      />
      <main className="flex-grow">
        <Hero />
        <ServiceGroupsSection />
        <YakapPromoBanner />
        <LatestUpdatesSection />
        <StatsSection />
        <TourismSection />
        <LeadershipSection />
      </main>
    </>
  );
};

export default Home;
