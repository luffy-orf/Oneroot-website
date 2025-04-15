import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGooglePlay, FaLeaf, FaMapMarkedAlt } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Disclosure, Transition } from '@headlessui/react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items with icons
  const navItems = [
    { name: 'Regions', path: '/regions', icon: FaMapMarkedAlt },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo - Enhanced with animations */}
          <Link 
            to="/" 
            className="flex items-center group"
            aria-label="OneRoot.farm - Home"
          >
            <motion.div 
              initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              whileHover={{ rotate: 15, scale: 1.2 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10,
                duration: 0.5
              }}
              className="mr-3 bg-gradient-to-br from-primary-500 to-primary-700 text-white h-12 w-12 rounded-xl flex items-center justify-center shadow-md overflow-hidden"
            >
              <motion.div
                animate={{ 
                  y: [0, -2, 0, 2, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 5,
                  ease: "easeInOut"
                }}
              >
                <FaLeaf className="text-xl" />
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex flex-col"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h1 
                className="text-xl font-bold leading-none"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                OneRoot
                <motion.span 
                  className="text-primary-500"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >.</motion.span>
                <span className="text-secondary-500">farm</span>
              </motion.h1>
              <span className="text-2xs text-gray-500 tracking-wider">CONNECTING FARMERS</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Enhanced with animations and icons */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (location.pathname === '/' && item.path.startsWith('/#'));
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: navItems.indexOf(item) * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-50 flex items-center relative group ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700'
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="mr-2"
                    >
                      <Icon className={`${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                    </motion.div>
                    <span>{item.name}</span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA Button - Enhanced with animations */}
          <div className="hidden md:block">
            <motion.a 
              href="https://play.google.com/store/apps/details?id=com.adityasinghop.OneRoot&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-primary-600 rounded-xl"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="relative flex items-center justify-center px-6 py-3 font-medium text-white rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 2,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                  className="mr-2"
                >
                  <FaGooglePlay className="text-lg" />
                </motion.div>
                <span>Download App</span>
                
                {/* Animated particles */}
                <motion.div 
                  className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full opacity-0"
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: [0, -10],
                    x: [0, 5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full opacity-0"
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: [0, -10],
                    x: [0, -5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    delay: 0.5
                  }}
                />
              </motion.div>
            </motion.a>
          </div>

          {/* Mobile Menu Button - Enhanced with animations */}
          <motion.button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiX className="block h-6 w-6" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiOutlineMenuAlt3 className="block h-6 w-6" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced with animations and icons */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <motion.div 
              className="container-custom py-4 space-y-2 bg-white border-t border-gray-100 shadow-inner-soft"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                (location.pathname === '/' && item.path.startsWith('/#'));
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className={`w-10 h-10 rounded-full ${isActive ? 'bg-primary-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                        <Icon className={`${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                      </div>
                      <span>{item.name}</span>
                      
                      {isActive && (
                        <motion.div 
                          layoutId="mobile-indicator"
                          className="ml-auto h-2 w-2 rounded-full bg-primary-500"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="pt-4 pb-2"
              >
                <motion.a 
                  href="https://play.google.com/store/apps/details?id=com.adityasinghop.OneRoot&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-4 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGooglePlay className="mr-2 text-lg" />
                  <span className="text-base">Download App</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;