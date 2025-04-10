import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

const RegionGallery = ({ media, regionName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayRef = useRef(null);

  // Handle image navigation
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying) {
      autoPlayRef.current = setInterval(nextImage, 3000);
    } else {
      clearInterval(autoPlayRef.current);
    }
  };

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
    touchEventOptions: { passive: true }
  });

  // Clean up interval on unmount
  useState(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Mini gallery view (4 images)
  const MiniGallery = () => (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-md">
      <div className="grid grid-cols-2 gap-1">
        {media.slice(0, 4).map((item, index) => (
          <div 
            key={index}
            className={`relative aspect-square overflow-hidden ${index === 0 ? 'col-span-2' : ''}`}
            onClick={() => {
              setCurrentIndex(index);
              toggleFullscreen();
            }}
          >
            <img
              src={item.url}
              alt={item.caption || `${regionName} image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {index === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded-full">
                  {media.length} photos
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-1.5 rounded-full shadow-md hover:bg-opacity-100 transition-all"
      >
        <FaExpand className="text-gray-700 text-sm" />
      </button>
    </div>
  );

  // Fullscreen gallery view
  const FullscreenGallery = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
      {...swipeHandlers}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black bg-opacity-50">
        <h3 className="text-white font-medium">{regionName} Gallery</h3>
        <div className="flex space-x-2">
          <button
            onClick={toggleAutoplay}
            className={`p-2 rounded-full ${isAutoPlaying ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            {isAutoPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-black text-white rounded-full"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={media[currentIndex].url}
              alt={media[currentIndex].caption || `${regionName} image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            {media[currentIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-center">
                {media[currentIndex].caption}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between items-center p-4 bg-black bg-opacity-50">
        <button
          onClick={prevImage}
          className="p-2 bg-black text-white rounded-full"
        >
          <FaChevronLeft />
        </button>
        <div className="text-white">
          {currentIndex + 1} / {media.length}
        </div>
        <button
          onClick={nextImage}
          className="p-2 bg-black text-white rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="p-4 bg-black bg-opacity-50 overflow-x-auto">
        <div className="flex space-x-2">
          {media.map((item, index) => (
            <div
              key={index}
              className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-white' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={item.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full">
      <MiniGallery />
      <AnimatePresence>
        {isFullscreen && <FullscreenGallery />}
      </AnimatePresence>
    </div>
  );
};

export default RegionGallery; 