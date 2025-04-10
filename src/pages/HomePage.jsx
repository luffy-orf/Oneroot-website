import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import RegionsSection from '../components/RegionsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import MLVideoSection from '../components/MLVideoSection';

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set loaded state after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="homepage"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className={`min-h-screen ${isLoaded ? 'fouc-ready' : 'no-fouc'}`}
      >
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* ML Video Section */}
        <div className="py-8 bg-white">
          <div className="container-custom">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-8"
            >
              <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4">
                AI Technology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="gradient-text">Coconut Counting</span> AI
              </h2>
              <p className="text-lg text-gray-600">
                Watch our advanced AI technology in action as it detects and counts coconuts with 98% accuracy in real-time.
              </p>
            </motion.div>
          </div>
          <MLVideoSection />
        </div>
        
        {/* Regions Section */}
        <RegionsSection limit={6} />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Contact Section */}
        <ContactSection />
      </motion.div>
    </AnimatePresence>
  );
}

export default HomePage;