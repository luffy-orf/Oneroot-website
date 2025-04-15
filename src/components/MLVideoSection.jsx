import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPlay } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MLVideoSection - A component that displays a YouTube live video embed in a collapsible dropdown
 */
const MLVideoSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && !videoLoaded) {
      setVideoLoaded(true);
    }
  };

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Collapsible Header */}
          <div 
            className="bg-gradient-to-r from-blue-50 to-primary-50 border-2 border-primary-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={toggleExpand}
          >
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-primary-600 rounded-full p-3 mr-4 shadow-md">
                  <FaPlay className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600">
                      Coconut Counting AI
                    </span>
                  </h2>
                  <p className="text-gray-700 text-sm">
                    Our AI detects and counts coconuts with 98% accuracy in real-time
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-4 bg-red-50 px-2 py-1 rounded-full">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
                  <span className="text-xs font-medium text-red-600">LIVE</span>
                </div>
                {isExpanded ? (
                  <FaChevronUp className="text-primary-600 text-lg" />
                ) : (
                  <FaChevronDown className="text-primary-600 text-lg" />
                )}
              </div>
            </div>
          </div>

          {/* Expandable Video Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Video Container with Responsive Design */}
                <div className="mt-4 relative overflow-hidden rounded-xl shadow-lg bg-white border-2 border-primary-100 transform hover:shadow-xl transition-all duration-300">
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary-400 to-blue-500"></div>
                  
                  {/* Video Aspect Ratio Container */}
                  <div className="relative pt-[56.25%] bg-gray-900 rounded-t-xl overflow-hidden">
                    {/* Loading Indicator */}
                    {isLoading && videoLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-10">
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                          <p className="text-white mt-4">Loading live stream...</p>
                        </div>
                      </div>
                    )}
                    
                    {/* YouTube Embed - Only load when expanded */}
                    {videoLoaded && (
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/V2EVBkH9PTk?autoplay=1&mute=1&controls=1&rel=0"
                        title="OneRoot Coconut Counting AI Live Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setIsLoading(false)}
                      ></iframe>
                    )}
                  </div>
                  
                  {/* Video Caption */}
                  <div className="p-3 md:p-4 bg-white rounded-b-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base">Coconut Detection & Counting</h3>
                        <p className="text-xs md:text-sm text-gray-500">Revolutionizing harvest estimation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MLVideoSection;