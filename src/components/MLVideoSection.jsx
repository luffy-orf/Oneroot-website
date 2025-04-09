import React, { useState } from 'react';

/**
 * MLVideoSection - A component that displays a YouTube live video embed
 */
const MLVideoSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6 relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Coconut Counting AI
              </span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
              Our AI detects and counts coconuts with 98% accuracy in real-time.
            </p>
          </div>

          {/* Video Container with Responsive Design */}
          <div className="relative overflow-hidden rounded-xl shadow-lg bg-white border border-gray-100 transform hover:shadow-xl transition-all duration-300">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
            
            {/* Video Aspect Ratio Container */}
            <div className="relative pt-[56.25%] bg-gray-900 rounded-t-xl overflow-hidden">
              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-10">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-white mt-4">Loading live stream...</p>
                  </div>
                </div>
              )}
              
              {/* YouTube Embed */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/V2EVBkH9PTk?autoplay=1&mute=1&controls=1&rel=0"
                title="OneRoot Coconut Counting AI Live Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              ></iframe>
            </div>
            
            {/* Video Caption */}
            <div className="p-3 md:p-4 bg-white rounded-b-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">Coconut Detection & Counting</h3>
                  <p className="text-xs md:text-sm text-gray-500">Revolutionizing harvest estimation</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse mr-2"></span>
                  <span className="text-xs md:text-sm font-medium text-red-500">LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MLVideoSection;