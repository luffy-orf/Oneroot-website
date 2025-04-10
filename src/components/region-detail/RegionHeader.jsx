import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStar, FaShareAlt } from 'react-icons/fa';

const RegionHeader = ({
  region,
  rating,
  reviewCount,
  handleShare,
  headerControls,
  headerInViewRef,
  fadeInUpVariants,
  staggerContainerVariants
}) => {
  return (
    <motion.section
      ref={headerInViewRef}
      animate={headerControls}
      initial="hidden"
      variants={staggerContainerVariants}
      className="mb-12"
    >
      <motion.div variants={fadeInUpVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">{region.name}</h1>
          <motion.button
            onClick={handleShare}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShareAlt className="text-gray-600" />
          </motion.button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>{region.location}</span>
          </div>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500 ml-1">({reviewCount} reviews)</span>
          </div>
        </div>

        <motion.p
          variants={fadeInUpVariants}
          className="text-gray-600 leading-relaxed"
        >
          {region.description}
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default RegionHeader; 