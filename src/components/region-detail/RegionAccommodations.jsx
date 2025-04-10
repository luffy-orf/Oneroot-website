import { motion } from 'framer-motion';
import { FaHotel, FaBed, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const RegionAccommodations = ({
  region,
  accommodationsControls,
  accommodationsInViewRef,
  fadeInUpVariants,
  staggerContainerVariants
}) => {
  return (
    <motion.section
      ref={accommodationsInViewRef}
      animate={accommodationsControls}
      initial="hidden"
      variants={staggerContainerVariants}
      className="mb-12"
    >
      <motion.h2
        variants={fadeInUpVariants}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        Where to Stay
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {region.accommodations.map((accommodation, index) => (
          <motion.div
            key={index}
            variants={fadeInUpVariants}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={accommodation.image}
                alt={accommodation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-900 flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                {accommodation.rating}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                <FaHotel className="text-primary-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {accommodation.name}
                </h3>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <FaMapMarkerAlt className="mr-1" />
                <span>{accommodation.location}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <FaBed className="mr-1" />
                <span>{accommodation.type}</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {accommodation.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-primary-600">
                  ${accommodation.pricePerNight}/night
                </span>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RegionAccommodations; 