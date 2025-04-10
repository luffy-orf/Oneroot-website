import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

const RegionAttractions = ({
  region,
  attractionsControls,
  attractionsInViewRef,
  fadeInUpVariants,
  staggerContainerVariants
}) => {
  return (
    <motion.section
      ref={attractionsInViewRef}
      animate={attractionsControls}
      initial="hidden"
      variants={staggerContainerVariants}
      className="mb-12"
    >
      <motion.h2
        variants={fadeInUpVariants}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        Top Attractions
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {region.attractions.map((attraction, index) => (
          <motion.div
            key={attraction.id}
            variants={fadeInUpVariants}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            <div className="relative h-48">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {attraction.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {attraction.description}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <FaMapMarkerAlt className="mr-1" />
                <span>{attraction.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RegionAttractions; 