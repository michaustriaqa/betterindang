import ExploreHub from '../components/explore/ExploreHub';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

export default function Explore() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  return (
    <>
      <SEO
        title={isFil ? 'Tuklasin ang Indang' : 'Explore Indang'}
        description={
          isFil
            ? 'Mga lugar na bibisitahin sa Indang, Cavite, kasaysayan ng bayan, datos ng munisipalidad at mga paparating na kaganapan.'
            : 'Places to visit in Indang, Cavite, the history of the town, municipal data and upcoming events.'
        }
        keywords="Indang tourism, explore Indang, Cavite, heritage, resorts, events"
      />
      <ExploreHub />
    </>
  );
}
