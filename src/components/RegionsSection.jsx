import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFilter, FaSort, FaSearch, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import RegionCard from './RegionCard';
import { fetchAllRegions } from '../services/regionService';

const RegionsSection = ({ limit = 6 }) => {
  const [regions, setRegions] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Fetch regions data
  useEffect(() => {
    const fetchRegionsData = async () => {
      setLoading(true);
      try {
        const { data, error } = await fetchAllRegions();
        if (error) throw error;
        
        const regionsData = data || [];
        setRegions(regionsData);
        setFilteredRegions(regionsData.slice(0, limit));
      } catch (err) {
        console.error('Error fetching regions:', err);
        setError(err.message || 'Failed to fetch regions');
      } finally {
        setLoading(false);
      }
    };

    fetchRegionsData();
  }, [limit]);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredRegions(regions.slice(0, limit));
    } else {
      const filtered = regions
        .filter(region => region.name.toLowerCase().includes(term))
        .slice(0, limit);
      setFilteredRegions(filtered);
    }
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="regions" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" ref={ref}>
      {/* Decorative Elements */}
      <div className="decorative-circle w-96 h-96 bg-primary-500 -top-48 -left-48"></div>
      <div className="decorative-circle w-64 h-64 bg-secondary-500 -bottom-32 -right-32"></div>
      
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
            Explore Regions
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find the <span className="gradient-text">Best Filters</span> in Your Area
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
          </motion.p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search regions..."
              className="input pl-11 py-3 shadow-soft focus:shadow-soft-md"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </motion.div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-ping absolute inset-0 rounded-full h-12 w-12 bg-primary-500 opacity-20"></div>
              <div className="animate-spin relative rounded-full h-12 w-12 border-2 border-transparent border-t-primary-600 border-b-primary-600"></div>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && !error && filteredRegions.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-2">No regions found</p>
            <p className="text-gray-400 mb-4">Try adjusting your search or check back later</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilteredRegions(regions.slice(0, limit));
              }} 
              className="btn-outline"
            >
              Clear Search
            </button>
          </div>
        )}
        
        {/* Regions Grid */}
        {!loading && !error && filteredRegions.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {filteredRegions.map((region, index) => (
              <RegionCard key={region.id} region={region} index={index} />
            ))}
          </motion.div>
        )}
        
        {/* View All Button */}
        {regions.length > limit && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link to="/regions" className="btn-primary inline-flex items-center">
              View All Regions <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RegionsSection;