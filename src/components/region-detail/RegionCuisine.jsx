import { motion } from 'framer-motion';
import { FaUtensils, FaStar } from 'react-icons/fa';

const RegionCuisine = ({
  region,
  cuisineControls,
  cuisineInViewRef,
  fadeInUpVariants,
  staggerContainerVariants
}) => {
  return (
    <motion.section
      ref={cuisineInViewRef}
      animate={cuisineControls}
      initial="hidden"
      variants={staggerContainerVariants}
      className="mb-12"
    >
      <motion.h2
        variants={fadeInUpVariants}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        Local Cuisine
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          variants={fadeInUpVariants}
          className="space-y-6"
        >
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaUtensils className="mr-2 text-primary-600" />
              Signature Dishes
            </h3>
            <ul className="space-y-3">
              {region.cuisine.signatureDishes.map((dish, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <div>
                    <p className="font-medium text-gray-900">{dish.name}</p>
                    <p className="text-sm text-gray-600">{dish.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          className="space-y-6"
        >
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Top Restaurants
            </h3>
            <div className="space-y-4">
              {region.cuisine.restaurants.map((restaurant, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{restaurant.name}</h4>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <p className="text-sm text-gray-500">{restaurant.location}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RegionCuisine; 