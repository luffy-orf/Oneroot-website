import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchRegionById } from '../services/regionService';
import { formatRelativeTime, formatPrice, formatDate } from '../utils/formatters';
import { 
  FaArrowLeft, FaPercent, FaFilter, FaImage, 
  FaDownload, FaTimes as FaXmark, FaChevronLeft, FaChevronRight, 
  FaPhone, FaShare, FaCalendarAlt, FaHistory, 
  FaMapMarkerAlt, FaInfoCircle, FaRuler as FaWeightScale,
  FaMapMarker as FaLocationDot, FaStar, FaTag, FaLeaf,
  FaChartLine, FaExternalLinkAlt, FaEye
} from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

// Import our new components
import RegionGallery from '../components/region-detail/RegionGallery';
import RegionDetails from '../components/region-detail/RegionDetails';
import MiniImageSlider from '../components/region-detail/MiniImageSlider';

function RegionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Refs for scroll tracking
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  
  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });
  
  // Pre-define all transform values to avoid hooks in render
  const yTransform1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const xTransform1 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const yTransform2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const xTransform2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yTransform3 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  
  // Animation controls
  const controls = useAnimation();
  const headerControls = useAnimation();
  const galleryControls = useAnimation();
  const priceControls = useAnimation();
  const metricsControls = useAnimation();
  const overviewControls = useAnimation();
  
  // Intersection observers for animations with improved thresholds
  const { ref: overviewInViewRef, inView: overviewInView } = useInView({ threshold: 0.15, triggerOnce: true });
  const { ref: galleryInViewRef, inView: galleryInView } = useInView({ threshold: 0.15, triggerOnce: true });
  const { ref: priceInViewRef, inView: priceInView } = useInView({ threshold: 0.15, triggerOnce: true });
  const { ref: metricsInViewRef, inView: metricsInView } = useInView({ threshold: 0.15, triggerOnce: true });
  
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0] // Custom cubic bezier for smooth motion
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.8
      }
    }
  };
  
  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Track scroll progress for parallax effects
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      setScrollProgress(value);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Start animations when sections come into view
  useEffect(() => {
    // Only start section animations if we have region data
    if (region) {
      if (overviewInView) {
        try {
          overviewControls.start('visible');
        } catch (err) {
          console.error('Overview animation error:', err);
        }
      }
      
      if (galleryInView) {
        try {
          galleryControls.start('visible');
        } catch (err) {
          console.error('Gallery animation error:', err);
        }
      }
      
      if (priceInView) {
        try {
          priceControls.start('visible');
        } catch (err) {
          console.error('Price animation error:', err);
        }
      }
      
      if (metricsInView) {
        try {
          metricsControls.start('visible');
        } catch (err) {
          console.error('Metrics animation error:', err);
        }
      }
    }
  }, [overviewInView, galleryInView, priceInView, metricsInView, 
      overviewControls, galleryControls, priceControls, metricsControls, region]);

  // Initialize animations
  useEffect(() => {
    // Reset animations when component mounts
    controls.set('hidden');
    headerControls.set('hidden');
    overviewControls.set('hidden');
    galleryControls.set('hidden');
    priceControls.set('hidden');
    metricsControls.set('hidden');
  }, [controls, headerControls, overviewControls, galleryControls, priceControls, metricsControls]);

  // Fetch region data - simplified with better error handling
  useEffect(() => {
    const getRegion = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        console.log(`Fetching region with ID: ${id}`);
        
        const { data, error } = await fetchRegionById(id);
        
        if (error) {
          console.error('Error fetching region:', error);
          setRegion(null);
          return;
        }
        
        if (!data) {
          console.warn(`No data found for region with ID: ${id}`);
          setRegion(null);
          return;
        }
        
        console.log('Region data fetched successfully:', data);
        setRegion(data);
        
        // Set initial selected image if media exists
        if (data.media && data.media.length > 0) {
          setSelectedImageIndex(0);
        }
      } catch (error) {
        console.error('Error in getRegion:', error);
        setRegion(null);
      } finally {
        setLoading(false);
      }
    };

    getRegion();
  }, [id]);
  
  // Start animations after data is loaded with improved sequence
  useEffect(() => {
    if (!loading && region) {
      // Use a small timeout to ensure DOM is ready
      const timer = setTimeout(() => {
        try {
          // First animate the header
          headerControls.start('visible')
            .then(() => {
              // Then start the main container animation
              return controls.start('visible');
            })
            .then(() => {
              // After main animation starts, trigger section animations if they're in view
              if (overviewInView) overviewControls.start('visible');
              if (galleryInView) galleryControls.start('visible');
              if (priceInView) priceControls.start('visible');
              if (metricsInView) metricsControls.start('visible');
            });
        } catch (err) {
          console.error('Animation sequence error:', err);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [
    loading, region, controls, headerControls, overviewControls, 
    galleryControls, priceControls, metricsControls, 
    overviewInView, galleryInView, priceInView, metricsInView
  ]);

  // We no longer need to rotate through prices and weights
  // since we're displaying all of them at once

  // Enhanced image navigation with haptic feedback simulation
  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (region?.media && region.media.length > 1) {
      // Add subtle animation for transition
      setSelectedImageIndex((prev) => (prev + 1) % region.media.length);
      
      // Simulate haptic feedback on mobile with vibration API if available
      if (window.navigator && window.navigator.vibrate) {
        try {
          window.navigator.vibrate(5); // Very subtle vibration
        } catch (err) {
          // Ignore vibration errors
        }
      }
    }
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (region?.media && region.media.length > 1) {
      setSelectedImageIndex((prev) => (prev === 0 ? region.media.length - 1 : prev - 1));
      
      // Simulate haptic feedback on mobile
      if (window.navigator && window.navigator.vibrate) {
        try {
          window.navigator.vibrate(5);
        } catch (err) {
          // Ignore vibration errors
        }
      }
    }
  };
  
  // Improved swipe handlers for mobile with better sensitivity
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    trackTouch: true,
    delta: 10, // Minimum swipe distance
    swipeDuration: 500, // Maximum time for swipe motion
    touchEventOptions: { passive: true }
  });
  
  // Handle call button click with animation
  const handleCallClick = () => {
    setIsCallModalOpen(true);
  };
  
  // Handle share button click with animation
  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };
  
  // Enhanced copy link to clipboard with feedback
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        
        // Vibration feedback if available
        if (window.navigator && window.navigator.vibrate) {
          try {
            window.navigator.vibrate([15, 30, 15]); // Pattern: vibrate, pause, vibrate
          } catch (err) {
            // Ignore vibration errors
          }
        }
        
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  // Toggle description expansion
  const toggleDescription = () => {
    setShowFullDescription(prev => !prev);
  };
  
  // Handle URL hash for tab navigation
  useEffect(() => {
    // Function to update active tab based on URL hash
    const updateTabFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['overview', 'gallery', 'prices', 'metrics'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    
    // Update tab on initial load
    updateTabFromHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', updateTabFromHash);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', updateTabFromHash);
    };
  }, []);
  
  // Enhanced tab switching with smooth scrolling and URL hash update
  const switchTab = (tab) => {
    setActiveTab(tab);
    
    // Update URL hash without triggering a scroll
    window.history.pushState(null, '', `#${tab}`);
    
    // Scroll to the appropriate section with offset for sticky header
    const element = document.getElementById(tab);
    if (element) {
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
      const yOffset = -20 - headerHeight; // Additional 20px buffer
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!loading && !region) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Region Not Found</h2>
        <p className="text-gray-600 mb-4">The region you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }
  
  // Previous code has been removed to fix JSX comment issues

  // Only calculate prices and weights if region exists
  const prices = region ? [
    { label: 'Single Filter', value: region.singlefilter_price },
    { label: 'Double Filter', value: region.doublefilter_price },
    { label: 'Mixed Filter', value: region.mixedfilter_price },
  ].filter(item => item.value && parseFloat(item.value) > 0) : [];

  const weights = region ? [
    { label: 'Single Filter', value: region.avg_weight_per_singlefilter },
    { label: 'Double Filter', value: region.avg_weight_per_doublefilter },
    { label: 'Mixed Filter', value: region.avg_weight_per_mixedfilter },
  ].filter(item => item.value) : [];

  return (
    <motion.div 
      ref={pageRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen bg-gray-50"
    >
      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <motion.button
          onClick={() => navigate('/')}
          className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft className="text-gray-700 text-lg" />
        </motion.button>
      </div>

      {/* Main content - simplified and focused */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header section with region name and mini slider */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{region.name}</h1>
                {region.updated_at && (
                  <div className="text-sm text-gray-500 mt-2 md:mt-0">
                    <FaCalendarAlt className="inline mr-1" />
                    Updated {formatRelativeTime(new Date(region.updated_at))}
                  </div>
                )}
              </div>
              
              {/* Description if available */}
              {region.description && (
                <div className="mb-6">
                  <p className="text-gray-600">
                    {showFullDescription 
                      ? region.description 
                      : region.description.length > 120 
                        ? `${region.description.substring(0, 120)}...` 
                        : region.description
                    }
                  </p>
                  {region.description.length > 120 && (
                    <button 
                      onClick={toggleDescription}
                      className="text-blue-600 hover:underline mt-1 text-sm font-medium"
                    >
                      {showFullDescription ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              )}
              
              <MiniImageSlider 
                images={region.media || []} 
                onImageClick={(index) => {
                  setSelectedImageIndex(index);
                  setShowImageModal(true);
                }}
              />
            </div>
          </motion.div>

          {/* Filter Prices and Weights Cards */}
          <motion.div
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            {/* Filter Prices Card */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                <FaTag className="text-blue-600 mr-2" />
                Filter Prices
              </h3>
              <div className="space-y-2">
                {prices.length > 0 ? (
                  prices.map((price, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">{price.label}</span>
                      <span className="text-lg font-semibold text-gray-800">{formatPrice(price.value)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No price information available</p>
                )}
              </div>
            </motion.div>

            {/* Average Weights Card */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                <FaWeightScale className="text-green-600 mr-2" />
                Average Weights
              </h3>
              <div className="space-y-2">
                {weights.length > 0 ? (
                  weights.map((weight, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">{weight.label}</span>
                      <span className="text-lg font-semibold text-gray-800">{weight.value} kg</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No weight information available</p>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Action buttons - more prominent */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6 mb-8"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Options</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleCallClick}
                className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-medium shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPhone className="text-xl" />
                Call Now
              </motion.button>
              <motion.button
                onClick={handleShareClick}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-medium shadow-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaShare className="text-xl" />
                Share
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen image modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setShowImageModal(false)}
          >
            <div className="relative w-full h-full max-w-4xl max-h-[90vh] p-4">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaXmark size={24} />
              </button>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaChevronRight size={24} />
              </button>
              <img
                src={region.media[selectedImageIndex].url}
                alt={`Image ${selectedImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Modal */}
      <AnimatePresence>
        {isCallModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsCallModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="text-green-600 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Contact {region.name}</h3>
                <p className="text-gray-600 mt-2">Connect with a representative for pricing and availability</p>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="tel:+917259930133" 
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3.5 px-4 rounded-xl w-full font-medium transition-colors duration-300 shadow-md"
                >
                  <FaPhone className="mr-2" />
                  Call Now
                </a>
                <a 
                  href="https://wa.me/917259930133" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-800 py-3.5 px-4 rounded-xl w-full font-medium transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  WhatsApp
                </a>
                <button 
                  onClick={() => setIsCallModalOpen(false)}
                  className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3.5 px-4 rounded-xl w-full font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsShareModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShare className="text-blue-600 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Share {region.name}</h3>
                <p className="text-gray-600 mt-2">Share this region with others</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center bg-gray-100 rounded-lg p-3 mb-2">
                  <input 
                    type="text" 
                    value={window.location.href} 
                    readOnly 
                    className="bg-transparent flex-grow text-sm px-2 py-1 focus:outline-none"
                  />
                  <motion.button 
                    onClick={copyToClipboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center transition-colors duration-300 ml-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mb-6">
                <motion.a 
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out ${region.name} on OneRoot: ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-green-100 hover:bg-green-200 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700 mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span className="text-xs">WhatsApp</span>
                </motion.a>
                
                <motion.a 
                  href={`https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${region.name} on OneRoot`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-100 hover:bg-blue-200 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.372-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm3.224 17.871c.188.133.43.166.619.098.12-.044.232-.114.323-.201.403-.387.396-1.016-.017-1.397-1.032-.951-2.073-1.89-3.105-2.842-1.149-1.059-2.295-2.12-3.449-3.173-.14-.128-.308-.29-.266-.49.035-.16.2-.22.341-.275.883-.344 1.77-.678 2.652-1.023.732-.282 1.464-.56 2.194-.846.156-.061.33-.196.313-.38-.023-.226-.241-.283-.424-.342-1.064-.34-2.132-.671-3.197-1.01-1.261-.4-2.52-.807-3.783-1.2-.151-.047-.318-.084-.437.045-.119.13-.081.301-.04.447.145.518.294 1.035.445 1.551.274.93.556 1.859.797 2.801.26 1.01.504 2.025.737 3.042.076.333.17.663.233.998.038.208.203.412.43.442.198.026.35-.113.429-.273.61-1.228 1.235-2.451 1.855-3.676.388-.767.777-1.534 1.163-2.302.07-.14.143-.28.225-.411.103-.165.276-.278.468-.284.188-.005.387.113.52.254.16.168.275.376.421.558.528.656 1.059 1.31 1.59 1.963.733.9 1.468 1.797 2.205 2.694.168.204.345.398.485.622z"/>
                  </svg>
                  <span className="text-xs">Telegram</span>
                </motion.a>
                
                <motion.a 
                  href={`mailto:?subject=${encodeURIComponent(`Region: ${region.name}`)}&body=${encodeURIComponent(`Check out this region: ${region.name} ${window.location.href}`)}`}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-red-100 hover:bg-red-200 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                  </svg>
                  <span className="text-xs">Email</span>
                </motion.a>
                
                <motion.button
                  onClick={copyToClipboard}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
                </motion.button>
              </div>
              
              <motion.button
                onClick={() => setIsShareModalOpen(false)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RegionDetailPage;