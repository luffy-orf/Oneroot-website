import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatRelativeTime, formatPrice } from '../utils/formatters';
import { FaMapMarker, FaPercent, FaRuler, FaFilter, FaArrowRight } from 'react-icons/fa';

function RegionCard({ region, index = 0 }) {
  const [currentWeightIndex, setCurrentWeightIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Handle scroll to top on navigation
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Filter out prices that are 0 or empty
  const getPriceItems = () => {
    return [
      { label: 'Mixing', price: region.mixedfilter_price },
      { label: 'Single Filter', price: region.singlefilter_price },
      { label: 'Double Filter', price: region.doublefilter_price },
    ].filter(item => item.price && parseFloat(item.price) > 0);
  };

  // Get weights for display
  const weights = [
    { label: 'Single Filter', value: region.avg_weight_per_singlefilter },
    { label: 'Double Filter', value: region.avg_weight_per_doublefilter },
    { label: 'Mixed Filter', value: region.avg_weight_per_mixedfilter },
  ].filter(item => item.value);

  // Rotate through weights every 3 seconds
  useEffect(() => {
    if (weights.length > 1) {
      const interval = setInterval(() => {
        setCurrentWeightIndex(prev => (prev + 1) % weights.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [weights.length]);

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    },
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const priceItemVariants = {
    initial: { x: 0 },
    hover: (custom) => ({
      x: 4,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: custom * 0.05
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Link to={`/regions/${region.id}`} className="block h-full" onClick={handleClick}>
        <div className="card h-full flex flex-col">
          {/* Image Gallery */}
          {region.media && region.media.length > 0 && (
            <div className="relative h-48 overflow-hidden rounded-t-xl">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img 
                src={region.media[0].url} 
                alt={`${region.name}`} 
                className="w-full h-full object-cover"
                variants={imageVariants}
                loading="lazy"
                decoding="async"
              />
              {region.media.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-20 backdrop-blur-sm">
                  +{region.media.length - 1} more
                </div>
              )}
              <motion.div 
                className="absolute bottom-3 left-3 bg-primary-600 text-white px-3 py-1.5 rounded-lg z-20 flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                View Details <FaArrowRight className="ml-1.5" size={12} />
              </motion.div>
            </div>
          )}

          <div className="p-5 flex-grow flex flex-col">
            {/* Region Name & Updated Time */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center mr-3">
                  <FaMapMarker className="text-primary-600 text-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{region.name}</h3>
                  {region.updated_at && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      Updated {formatRelativeTime(region.updated_at)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* Free Nuts */}
              <div className="bg-gradient-to-br from-white to-yellow-50 rounded-lg p-3 border border-yellow-100 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 font-medium">Free Nuts</span>
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <FaPercent className="text-yellow-600 text-xs" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-yellow-600">
                  {region.free_nut}%
                </p>
              </div>

              {/* Average Weight */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-3 border border-blue-100 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 font-medium">Weight</span>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaRuler className="text-blue-600 text-xs" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-blue-600">
                      {weights[currentWeightIndex]?.value}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">Kg/pc</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {weights[currentWeightIndex]?.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Prices Section */}
            <div className="mt-auto">
              <div className="flex items-center mb-3">
                <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-700">Price Information</h4>
              </div>
              
              <div className="space-y-2">
                {getPriceItems().map(({ label, price }, index) => (
                  <motion.div
                    key={label}
                    custom={index}
                    variants={priceItemVariants}
                    className="flex justify-between items-center bg-gradient-to-r from-primary-50 to-white rounded-lg p-3 border border-primary-100"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <FaFilter className="text-primary-600 text-xs" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">
                        {label}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-primary-600">
                      {formatPrice(price)}<span className="text-xs font-normal text-gray-500 ml-1">/Pc</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default memo(RegionCard);