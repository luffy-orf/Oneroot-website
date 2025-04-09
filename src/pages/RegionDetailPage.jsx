import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRegionById } from '../services/regionService';
import { formatRelativeTime, formatPrice, formatDate } from '../utils/formatters';
import { FaArrowLeft, FaLocationDot, FaPercent, FaWeightScale, FaFilter, FaImage, FaDownload, FaXmark } from 'react-icons/fa6';

function RegionDetailPage() {
  const { id } = useParams();
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentPriceIndex, setCurrentPriceIndex] = useState(0);
  const [currentWeightIndex, setCurrentWeightIndex] = useState(0);

  useEffect(() => {
    const getRegion = async () => {
      setLoading(true);
      try {
        const { data, error } = await fetchRegionById(id);
        if (error) throw error;
        setRegion(data);
      } catch (err) {
        console.error(`Error fetching region with id ${id}:`, err);
        setRegion(null);
      } finally {
        setLoading(false);
      }
    };

    getRegion();
  }, [id]);

  useEffect(() => {
    if (!region) return;

    // Rotate through prices
    const prices = [
      { label: 'Single Filter Price', value: region.singlefilter_price },
      { label: 'Double Filter Price', value: region.doublefilter_price },
      { label: 'Mixed Filter Price', value: region.mixedfilter_price },
    ].filter(item => item.value && parseFloat(item.value) > 0);

    if (prices.length > 1) {
      const priceInterval = setInterval(() => {
        setCurrentPriceIndex(prev => (prev + 1) % prices.length);
      }, 3000);
      return () => clearInterval(priceInterval);
    }
  }, [region]);

  useEffect(() => {
    if (!region) return;

    // Rotate through weights
    const weights = [
      { label: 'Single Filter Weight', value: region.avg_weight_per_singlefilter },
      { label: 'Double Filter Weight', value: region.avg_weight_per_doublefilter },
      { label: 'Mixed Filter Weight', value: region.avg_weight_per_mixedfilter },
    ].filter(item => item.value);

    if (weights.length > 1) {
      const weightInterval = setInterval(() => {
        setCurrentWeightIndex(prev => (prev + 1) % weights.length);
      }, 3000);
      return () => clearInterval(weightInterval);
    }
  }, [region]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!region) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Region Not Found</h2>
        <p className="mb-6">The region you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="bg-primary text-white px-6 py-2 rounded-lg inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const prices = [
    { label: 'Single Filter Price', value: region.singlefilter_price },
    { label: 'Double Filter Price', value: region.doublefilter_price },
    { label: 'Mixed Filter Price', value: region.mixedfilter_price },
  ].filter(item => item.value && parseFloat(item.value) > 0);

  const weights = [
    { label: 'Single Filter Weight', value: region.avg_weight_per_singlefilter },
    { label: 'Double Filter Weight', value: region.avg_weight_per_doublefilter },
    { label: 'Mixed Filter Weight', value: region.avg_weight_per_mixedfilter },
  ].filter(item => item.value);

  return (
    <div className="relative min-h-screen">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-yellow-500 opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-6 relative z-10">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center text-primary mb-6 group hover:text-primary-dark transition-colors duration-200 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="font-medium">Back to Regions</span>
      </Link>

      {/* Region Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-xl mb-8 shadow-lg transform hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-32 -mr-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -mb-16 -ml-16"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <FaLocationDot className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold">{region.name}</h1>
          </div>
          {region.updated_at && (
            <div className="text-sm opacity-90 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last updated: {formatRelativeTime(region.updated_at)}
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      {region.media && region.media.length > 0 && (
        <div className="mb-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <h2 className="text-xl font-semibold mb-5 flex items-center">
            <div className="bg-primary/10 p-2 rounded-lg mr-3">
              <FaImage className="text-primary" />
            </div>
            <span className="text-gray-800">Gallery</span>
            <span className="ml-2 text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{region.media.length}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {region.media.map((media, index) => (
              <div 
                key={media.id} 
                className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => {
                  setSelectedImageIndex(index);
                  setShowImageModal(true);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img 
                  src={media.url} 
                  alt={`${region.name} image ${index + 1}`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="self-end">
                    <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                      {formatDate(media.created_at)}
                    </span>
                  </div>
                  <div className="flex justify-end items-end">
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                      Image {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Info */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-5 flex items-center">
          <div className="bg-primary/10 p-2 rounded-lg mr-3">
            <FaFilter className="text-primary" />
          </div>
          <span className="text-gray-800">Price Information</span>
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary opacity-5 rounded-full -mt-20 -mr-20"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <FaFilter className="text-primary text-xs" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {prices[currentPriceIndex]?.label}
                </p>
              </div>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatPrice(prices[currentPriceIndex]?.value || 0)}
                <span className="text-base font-normal text-gray-600">/Pc</span>
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-primary to-primary-dark px-4 py-2 rounded-lg mb-3 shadow-sm">
                <p className="text-xs text-white font-medium">
                  Updated: {formatDate(region.updated_at)}
                </p>
              </div>
              <div className="h-14 w-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl items-center justify-center flex shadow-md">
                <FaFilter className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* All Prices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prices.map(({ label, value }, index) => (
            <div 
              key={label}
              className="flex flex-col bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <FaFilter className="text-primary" />
                </div>
                <span className="text-gray-800 font-medium">{label.replace(' Price', '')}</span>
              </div>
              <div className="mt-auto pt-3 border-t border-gray-100">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(value)}
                  <span className="text-sm font-normal text-gray-500 ml-1">/Pc</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-5 flex items-center">
          <div className="bg-primary/10 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-gray-800">Filter Metrics</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Nut Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500 opacity-5 rounded-full -mt-20 -mr-20 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-lg font-medium text-gray-800">Free Nut Percentage</h3>
              <div className="h-12 w-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl items-center justify-center flex shadow-md">
                <FaPercent className="text-white" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-4xl font-bold text-yellow-500">
                {region.free_nut}%
              </p>
              <p className="text-sm text-gray-500 mt-3">
                The percentage of free nuts in the filter
              </p>
            </div>
          </div>

          {/* Average Weight Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 opacity-5 rounded-full -mt-20 -mr-20 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-lg font-medium text-gray-800">Average Weight</h3>
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl items-center justify-center flex shadow-md">
                <FaWeightScale className="text-white" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="mb-4">
                <p className="text-4xl font-bold text-blue-500">
                  {weights[currentWeightIndex]?.value || 0}
                  <span className="text-base font-normal text-gray-600 ml-1">kg/pc</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {weights[currentWeightIndex]?.label?.replace(' Weight', '') || 'Average'}
                </p>
              </div>
              <div className="mt-5 space-y-3 pt-4 border-t border-gray-100">
                {weights.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">{label.replace(' Weight', '')}</span>
                    <span className="text-sm font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">{value} kg/pc</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && region.media && region.media.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 touch-manipulation animate-fade-in"
          onClick={(e) => {
            // Close modal when clicking on the background (not on the content)
            if (e.target === e.currentTarget) {
              setShowImageModal(false);
            }
          }}
        >
          {/* Navigation Arrows for Mobile and Desktop */}
          {region.media.length > 1 && (
            <>
              <button 
                onClick={() => setSelectedImageIndex(prev => (prev === 0 ? region.media.length - 1 : prev - 1))}
                className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-20"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => setSelectedImageIndex(prev => (prev === region.media.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-20"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Control Buttons */}
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={() => setShowImageModal(false)}
              className="text-white p-2.5 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-200"
              title="Close"
            >
              <FaXmark className="h-5 w-5" />
            </button>
          </div>
          
          <div className="w-full max-w-3xl animate-fade-in-scale">
            {/* Main Image with Swipe Support */}
            <div 
              className="w-full relative touch-manipulation will-change-transform"
              onTouchStart={(e) => {
                const touchDown = e.touches[0].clientX;
                const touchDownY = e.touches[0].clientY;
                e.currentTarget.dataset.touchStartX = touchDown;
                e.currentTarget.dataset.touchStartY = touchDownY;
                e.currentTarget.dataset.touchStartTime = Date.now();
              }}
              onTouchMove={(e) => {
                if (!e.currentTarget.dataset.touchStartX) return;
                
                const touchDown = parseInt(e.currentTarget.dataset.touchStartX);
                const touchDownY = parseInt(e.currentTarget.dataset.touchStartY);
                const currentTouch = e.touches[0].clientX;
                const currentTouchY = e.touches[0].clientY;
                const diffX = touchDown - currentTouch;
                const diffY = touchDownY - currentTouchY;
                
                // Only handle horizontal swipes (prevent conflicts with page scrolling)
                if (Math.abs(diffX) > Math.abs(diffY)) {
                  e.preventDefault();
                  
                  // Visual feedback during swipe
                  const swipePercentage = Math.min(Math.abs(diffX) / 200, 0.3);
                  const direction = diffX > 0 ? -1 : 1;
                  e.currentTarget.style.transform = `translateX(${direction * swipePercentage * 100}px)`;
                  e.currentTarget.style.opacity = `${1 - swipePercentage}`;
                }
              }}
              onTouchEnd={(e) => {
                if (!e.currentTarget.dataset.touchStartX) return;
                
                // Reset visual transformation
                e.currentTarget.style.transform = '';
                e.currentTarget.style.opacity = '';
                
                const touchDown = parseInt(e.currentTarget.dataset.touchStartX);
                const touchDownY = parseInt(e.currentTarget.dataset.touchStartY);
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const diffX = touchDown - touchEndX;
                const diffY = touchDownY - touchEndY;
                const touchTime = Date.now() - parseInt(e.currentTarget.dataset.touchStartTime);
                
                // Check if it's a horizontal swipe (more horizontal than vertical movement)
                if (Math.abs(diffX) > Math.abs(diffY)) {
                  // If swipe is significant enough (more than 50px or fast swipe)
                  const isQuickSwipe = touchTime < 300 && Math.abs(diffX) > 30;
                  if (Math.abs(diffX) > 50 || isQuickSwipe) {
                    if (diffX > 0) {
                      // Swipe left - next image
                      setSelectedImageIndex(prev => (prev === region.media.length - 1 ? 0 : prev + 1));
                    } else {
                      // Swipe right - previous image
                      setSelectedImageIndex(prev => (prev === 0 ? region.media.length - 1 : prev - 1));
                    }
                  }
                }
                
                // Reset touch data
                e.currentTarget.dataset.touchStartX = 0;
                e.currentTarget.dataset.touchStartY = 0;
                e.currentTarget.dataset.touchStartTime = 0;
              }}
            >
              <div className="relative w-full h-auto max-h-[70vh] flex items-center justify-center">
                {region.media.map((media, index) => (
                  <img 
                    key={media.id}
                    src={media.url} 
                    alt={`${region.name} image ${index + 1}`} 
                    className={`absolute w-full h-auto max-h-[70vh] object-contain mx-auto transform-gpu transition-opacity duration-300 ${index === selectedImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    fetchpriority={index === selectedImageIndex ? 'high' : 'low'}
                    style={{ willChange: 'transform, opacity' }}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-white">
              <div>
                <p className="text-sm opacity-80">
                  Uploaded: {formatDate(region.media[selectedImageIndex].created_at)}
                </p>
                <p className="text-sm opacity-80">
                  Type: {region.media[selectedImageIndex].type || 'Image'}
                </p>
              </div>
              <p className="text-sm font-medium">
                {selectedImageIndex + 1} / {region.media.length}
              </p>
            </div>
            
            {/* Thumbnails */}
            {region.media.length > 1 && (
              <div className="mt-4 flex justify-center gap-2 overflow-x-auto py-2 scrollbar-hide">
                {region.media.map((media, index) => (
                  <button
                    key={media.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${index === selectedImageIndex ? 'ring-2 ring-primary scale-110 shadow-md' : 'opacity-60 hover:opacity-80'}`}
                    style={{ transform: `translateY(${index === selectedImageIndex ? '-8px' : '0'})` }}
                  >
                    <img 
                      src={media.url} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover transform-gpu"
                      loading="lazy"
                      style={{ willChange: 'transform' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default RegionDetailPage;