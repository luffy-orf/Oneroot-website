import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeTime, formatPrice } from '../utils/formatters';
import { FaLocationDot, FaPercent, FaWeightScale, FaFilter } from 'react-icons/fa6';

function RegionCard({ region }) {
  const [currentWeightIndex, setCurrentWeightIndex] = useState(0);

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
  useState(() => {
    if (weights.length > 1) {
      const interval = setInterval(() => {
        setCurrentWeightIndex(prev => (prev + 1) % weights.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [weights.length]);

  return (
    <Link to={`/region/${region.id}`} className="block group">
      <div className="rounded-xl p-4 sm:p-6 bg-white shadow-sm group-hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-primary/20 transform group-hover:-translate-y-2 active:scale-98 touch-manipulation relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full z-0 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/5 rounded-full z-0 group-hover:scale-150 transition-transform duration-700 delay-100"></div>
        {/* Image Gallery */}
        {region.media && region.media.length > 0 && (
          <div className="mb-5 relative h-48 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <img 
              src={region.media[0].url} 
              alt={`${region.name}`} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              loading="lazy"
              decoding="async"
            />
            {region.media.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md z-20">
                +{region.media.length - 1} more
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-md z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              View Details
            </div>
          </div>
        )}

        {/* Region Name */}
        <div className="mb-5 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                <FaLocationDot className="text-primary text-lg" />
              </div>
              <h3 className="ml-1 text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">{region.name}</h3>
            </div>
            
            {/* Last Updated */}
            {region.updated_at && (
              <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                <span className="hidden sm:inline">Updated </span>{formatRelativeTime(region.updated_at)}
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
          {/* Free Nuts */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 group-hover:border-yellow-500/20 transition-all duration-300 shadow-sm group-hover:shadow-md transform group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 font-medium">Free Nuts</span>
              <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaPercent className="text-yellow-500 text-xs" />
              </div>
            </div>
            <p className="text-2xl font-bold text-yellow-500">
              {region.free_nut}%
            </p>
          </div>

          {/* Average Weight */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 group-hover:border-blue-500/20 transition-all duration-300 shadow-sm group-hover:shadow-md transform group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 font-medium">Weight</span>
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaWeightScale className="text-blue-500 text-xs" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-blue-500">
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
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center mb-2">
            <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-sm font-medium text-gray-700">Price Information</h4>
          </div>
          
          {getPriceItems().map(({ label, price }, index) => (
            <div
              key={label}
              className="flex justify-between items-center bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 group-hover:border-green-500/20 transition-all duration-300 shadow-sm group-hover:shadow-md relative overflow-hidden transform group-hover:translate-x-1"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center relative z-10">
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3 group-hover:bg-green-500/20 transition-colors duration-300 group-hover:scale-110">
                  <FaFilter className="text-green-500 text-xs" />
                </div>
                <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-200">
                  {label}
                </span>
              </div>
              <span className="text-lg font-bold text-green-600 relative z-10 group-hover:scale-105 transition-transform duration-200">
                {formatPrice(price)}<span className="text-xs font-normal text-gray-500 ml-1">/Pc</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default memo(RegionCard);