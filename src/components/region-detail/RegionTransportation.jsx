import { motion } from 'framer-motion';
import { FaPlane, FaTrain, FaBus, FaCar, FaShip, FaInfoCircle } from 'react-icons/fa';

const RegionTransportation = ({
  region,
  transportationControls,
  transportationInViewRef,
  fadeInUpVariants,
  staggerContainerVariants
}) => {
  const getTransportIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'air':
        return <FaPlane className="text-primary-600" />;
      case 'train':
        return <FaTrain className="text-primary-600" />;
      case 'bus':
        return <FaBus className="text-primary-600" />;
      case 'car':
        return <FaCar className="text-primary-600" />;
      case 'ferry':
        return <FaShip className="text-primary-600" />;
      default:
        return <FaInfoCircle className="text-primary-600" />;
    }
  };

  return (
    <motion.section
      ref={transportationInViewRef}
      animate={transportationControls}
      initial="hidden"
      variants={staggerContainerVariants}
      className="mb-12"
    >
      <motion.h2
        variants={fadeInUpVariants}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        Getting There
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {region.transportation.map((option, index) => (
          <motion.div
            key={index}
            variants={fadeInUpVariants}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-start mb-4">
              <div className="text-2xl mr-4">
                {getTransportIcon(option.type)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {option.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {option.details.map((detail, detailIndex) => (
                <div
                  key={detailIndex}
                  className="flex items-start text-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{detail.title}</p>
                    <p className="text-gray-600">{detail.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {option.tips && (
              <div className="mt-4 p-3 bg-primary-50 rounded-md">
                <p className="text-sm text-primary-800">
                  <span className="font-medium">Pro Tip:</span> {option.tips}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RegionTransportation; 