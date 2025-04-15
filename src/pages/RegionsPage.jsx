import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaSort, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import RegionCard from '../components/RegionCard';
import MLVideoSection from '../components/MLVideoSection';
import { fetchAllRegions } from '../services/regionService';

function RegionsPage() {
  const [regions, setRegions] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Set loaded state after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Fetch regions data
  useEffect(() => {
    const fetchRegionsData = async () => {
      setLoading(true);
      try {
        const { data, error } = await fetchAllRegions();
        if (error) throw error;
        
        const regionsData = data || [];
        setRegions(regionsData);
        setFilteredRegions(regionsData);
      } catch (err) {
        console.error('Error fetching regions:', err);
        setError(err.message || 'Failed to fetch regions');
      } finally {
        setLoading(false);
      }
    };

    fetchRegionsData();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredRegions(regions);
    } else {
      const filtered = regions.filter(region => 
        region.name.toLowerCase().includes(term)
      );
      setFilteredRegions(filtered);
    }
  };

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="regionspage"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className={`min-h-screen py-16 ${isLoaded ? 'fouc-ready' : 'no-fouc'}`}
      >
        {/* ML Video Section */}
        <div className="py-6 bg-gradient-to-r from-blue-50 via-white to-primary-50 mb-8 border-y border-primary-100">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MLVideoSection />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container-custom">
          {/* Page Header */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              All <span className="gradient-text">Regions</span>
            </h1>
            
          </motion.div>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search regions..."
                className="input pl-11 py-3 shadow-soft focus:shadow-soft-md w-full"
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
                  setFilteredRegions(regions);
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
              animate="visible"
            >
              {filteredRegions.map((region, index) => (
                <RegionCard key={region.id} region={region} index={index} />
              ))}
            </motion.div>
          )}
          
          {/* Results Count */}
          {!loading && !error && filteredRegions.length > 0 && (
            <motion.div 
              className="text-center text-gray-500 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Showing {filteredRegions.length} {filteredRegions.length === 1 ? 'region' : 'regions'}
              {searchTerm && ` for "${searchTerm}"`}
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RegionsPage;