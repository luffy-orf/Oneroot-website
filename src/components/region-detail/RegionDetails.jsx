import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaTag, FaLeaf, FaChartLine, 
  FaRuler, FaInfoCircle, FaStar, FaPhone, FaShare 
} from 'react-icons/fa';
import { formatPrice } from '../../utils/formatters';

const RegionDetails = ({ 
  region, 
  onCallClick, 
  onShareClick,
  containerVariants,
  itemVariants
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Format price data
  const prices = [
    { label: 'Single Filter', value: region.singlefilter_price },
    { label: 'Double Filter', value: region.doublefilter_price },
    { label: 'Mixed Filter', value: region.mixedfilter_price }
  ].filter(item => item.value);

  // Format weight data
  const weights = [
    { label: 'Single Filter', value: region.avg_weight_per_singlefilter },
    { label: 'Double Filter', value: region.avg_weight_per_doublefilter },
    { label: 'Mixed Filter', value: region.avg_weight_per_mixedfilter }
  ].filter(item => item.value);

  // Format description with truncation
  const description = region.description || 'No description available';
  const truncatedDescription = showFullDescription 
    ? description 
    : description.length > 150 
      ? `${description.substring(0, 150)}...` 
      : description;

  return (
    <motion.div
      variants={containerVariants}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      {/* Header with region name and rating */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{region.name}</h1>
            <div className="flex items-center mt-1">
              <FaMapMarkerAlt className="text-gray-400 mr-1" />
              <span className="text-gray-500 text-sm">{region.location || 'Location not specified'}</span>
            </div>
          </div>
          {region.rating && (
            <div className="flex items-center bg-primary bg-opacity-10 px-3 py-1 rounded-full">
              <FaStar className="text-primary mr-1" />
              <span className="font-medium text-primary">{region.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center mb-3">
          <FaInfoCircle className="text-primary mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">About</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">{truncatedDescription}</p>
        {description.length > 150 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-2 text-primary font-medium hover:underline focus:outline-none"
          >
            {showFullDescription ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Prices */}
      {prices.length > 0 && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center mb-3">
            <FaTag className="text-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Pricing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prices.map((price, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">{price.label}</div>
                <div className="text-xl font-bold text-gray-800">{formatPrice(price.value)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weights */}
      {weights.length > 0 && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center mb-3">
            <FaRuler className="text-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Average Weights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weights.map((weight, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">{weight.label}</div>
                <div className="text-xl font-bold text-gray-800">{weight.value} kg</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {region.features && region.features.length > 0 && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center mb-3">
            <FaLeaf className="text-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Features</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {region.features.map((feature, index) => (
              <span 
                key={index}
                className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center mb-3">
          <FaChartLine className="text-primary mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Statistics</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {region.total_sales && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{region.total_sales}</div>
              <div className="text-sm text-gray-500">Total Sales</div>
            </div>
          )}
          {region.avg_rating && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{region.avg_rating}</div>
              <div className="text-sm text-gray-500">Avg Rating</div>
            </div>
          )}
          {region.total_reviews && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{region.total_reviews}</div>
              <div className="text-sm text-gray-500">Reviews</div>
            </div>
          )}
          {region.visit_count && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{region.visit_count}</div>
              <div className="text-sm text-gray-500">Visits</div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-6 flex flex-col sm:flex-row gap-3">
        <motion.button
          onClick={onCallClick}
          className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPhone className="mr-2" />
          Contact
        </motion.button>
        <motion.button
          onClick={onShareClick}
          className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaShare className="mr-2" />
          Share
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RegionDetails; 