import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaLeaf, FaFilter, FaHandshake, FaChartLine } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Hero images - replace with actual images
  const heroImages = [
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  ];

  // Stats data
  const stats = [
    { icon: <FaLeaf />, value: '10K+', label: 'Farmers', color: 'from-primary-500 to-primary-600' },
    { icon: <FaFilter />, value: '50K+', label: 'Filters Sold', color: 'from-secondary-500 to-secondary-600' },
    { icon: <FaHandshake />, value: '100+', label: 'Regions', color: 'from-accent-500 to-accent-600' },
    { icon: <FaChartLine />, value: '30%', label: 'Cost Savings', color: 'from-green-500 to-green-600' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-white via-gray-50 to-white" ref={ref}>
      {/* Decorative Elements */}
      <div className="decorative-circle w-96 h-96 bg-primary-500 top-0 right-0"></div>
      <div className="decorative-circle w-64 h-64 bg-secondary-500 bottom-0 left-0"></div>
      <div className="decorative-circle w-48 h-48 bg-accent-500 top-1/3 left-1/4"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                Revolutionizing Farming
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Connecting Farmers with <span className="gradient-text">Quality Filters</span> at Best Prices
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 max-w-xl"
            >
              OneRoot is transforming the agricultural landscape by providing farmers with direct access to high-quality coconut filters at competitive prices, eliminating middlemen and increasing profits.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <motion.a 
                href="https://play.google.com/store/apps/details?id=com.adityasinghop.OneRoot&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Download App
              </motion.a>
              
              <motion.a 
                href="#features" 
                className="btn-outline btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More <FaArrowRight className="ml-2" />
              </motion.a>
            </motion.div>
            
            {/* Stats Row */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-4 shadow-soft border border-gray-100 hover:shadow-soft-md transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ y: -5 }}
                  custom={index}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-3`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Column - Image */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-soft-xl">
              {/* Image Carousel */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent z-10 rounded-2xl"></div>
              
              {heroImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: currentImageIndex === index ? 1 : 0,
                    scale: currentImageIndex === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <img 
                    src={image} 
                    alt={`OneRoot farming scene ${index + 1}`} 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </motion.div>
              ))}
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent z-20 text-white">
                <h3 className="text-xl font-semibold mb-2">Empowering Farmers</h3>
                <p className="text-sm text-white/90">Join thousands of farmers already benefiting from OneRoot</p>
              </div>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;