import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaLeaf, 
  FaHandshake, 
  FaChartLine, 
  FaMobileAlt, 
  FaShieldAlt, 
  FaTruck 
} from 'react-icons/fa';

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Features data
  const features = [
    {
      icon: <FaLeaf />,
      title: 'Quality Assurance',
      description: 'All our filters undergo rigorous quality checks to ensure the best performance and longevity.',
      color: 'bg-primary-500',
      delay: 0.1
    },
    {
      icon: <FaHandshake />,
      title: 'Direct Sourcing',
      description: 'We connect farmers directly with manufacturers, eliminating middlemen and reducing costs.',
      color: 'bg-secondary-500',
      delay: 0.2
    },
    {
      icon: <FaChartLine />,
      title: 'Price Transparency',
      description: 'Clear pricing with no hidden fees. Compare prices across regions to get the best deals.',
      color: 'bg-accent-500',
      delay: 0.3
    },
    {
      icon: <FaMobileAlt />,
      title: 'Mobile App',
      description: 'Order filters, track deliveries, and manage your farming needs from our easy-to-use mobile app.',
      color: 'bg-green-500',
      delay: 0.4
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Payments',
      description: 'Multiple secure payment options with encrypted transactions for your peace of mind.',
      color: 'bg-purple-500',
      delay: 0.5
    },
    {
      icon: <FaTruck />,
      title: 'Fast Delivery',
      description: 'Efficient logistics network ensuring timely delivery of filters to your doorstep.',
      color: 'bg-blue-500',
      delay: 0.6
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        delay: custom 
      }
    })
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Decorative Elements */}
      <div className="decorative-circle w-96 h-96 bg-primary-500 -top-48 -right-48"></div>
      <div className="decorative-circle w-64 h-64 bg-secondary-500 -bottom-32 -left-32"></div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Choose OneRoot
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Features that <span className="gradient-text">Empower</span> Farmers
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            OneRoot provides a comprehensive platform designed specifically for farmers' needs, 
            making filter procurement simpler, more transparent, and cost-effective.
          </motion.p>
        </motion.div>
        
        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-soft-lg hover:border-primary-100 transition-all duration-300 group"
              variants={itemVariants}
              custom={feature.delay}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.a 
            href="https://play.google.com/store/apps/details?id=com.adityasinghop.OneRoot&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaMobileAlt className="mr-2" />
            Download the App
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;