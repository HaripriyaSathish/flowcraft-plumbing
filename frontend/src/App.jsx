import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingButtons from "./components/layout/FloatingButtons";
import BookingModal from "./components/BookingModal";

import Hero from "./components/sections/Hero";
import EmergencyBanner from "./components/sections/EmergencyBanner";
import TrustMarquee from "./components/sections/TrustMarquee";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import HowItWorks from "./components/sections/HowItWorks";
import VideoSection from "./components/sections/VideoSection";
import EmergencySection from "./components/sections/EmergencySection";
import ServiceAreas from "./components/sections/ServiceAreas";
import Technicians from "./components/sections/Technicians";
import Testimonials from "./components/sections/Testimonials";
import Pricing from "./components/sections/Pricing";
import FAQSection from "./components/sections/FAQSection";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <BookingProvider>
      <Navbar />
      <main>
        <Hero />
        <EmergencyBanner />
        <TrustMarquee />
        <About />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <VideoSection />
        <EmergencySection />
  
        <ServiceAreas />
        <Technicians />
        <Testimonials />
        <Pricing />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <BookingModal />
    </BookingProvider>
  );
}

export default App;
