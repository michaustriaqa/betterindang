import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import Services from './pages/Services';
import Document from './pages/Document';
import Government from './pages/Government';
import Statistics from './pages/Statistics';
import Legislative from './pages/Legislative';
import Transparency from './pages/Transparency';
import Tourism from './pages/Tourism';
import ExecutiveDirectory from './pages/ExecutiveDirectory';
import SangguniangBayan from './pages/SangguniangBayan';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/:category" element={<Services />} />
              <Route path="/services" element={<Services />} />
              <Route
                path="/services/:category/:documentSlug"
                element={<Document categoryType="service" />}
              />
              <Route
                path="/government/departments/officials"
                element={<SangguniangBayan />}
              />
              <Route
                path="/government/departments/executive"
                element={<ExecutiveDirectory />}
              />
              <Route path="/government/legislative" element={<Legislative />} />
              <Route path="/government/:category" element={<Government />} />
              <Route path="/government" element={<Government />} />
              <Route
                path="/government/:category/:documentSlug"
                element={<Document categoryType="government" />}
              />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/legislative" element={<Legislative />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/tourism/:category" element={<Tourism />} />
              <Route path="/tourism" element={<Tourism />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/:lang/:documentSlug" element={<Document />} />
              <Route path="/:documentSlug" element={<Document />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
