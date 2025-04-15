import { FaGooglePlay, FaHeart, FaLeaf, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Footer links
  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/team' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
    ],
    resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'Guides', path: '/guides' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Support', path: '/support' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ]
  };

  // Social media links
  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com' },
    { name: 'Twitter', icon: <FaXTwitter />, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com' },
    { name: 'YouTube', icon: <FaYoutube />, url: 'https://youtube.com' },
  ];
  
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 pt-16 pb-8 border-t border-gray-200">
      {/* Decorative Elements */}
      <div className="decorative-circle w-96 h-96 bg-primary-500 top-0 right-0 opacity-5"></div>
      <div className="decorative-circle w-64 h-64 bg-secondary-500 bottom-0 left-0 opacity-5"></div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4 group">
              <div className="mr-2.5 bg-gradient-to-br from-primary-500 to-primary-700 text-white h-10 w-10 rounded-lg flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                <FaLeaf className="text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  OneRoot<span className="text-primary-500">.</span><span className="text-secondary-500">farm</span>
                </h3>
              </div>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Connecting farmers with quality filter products at competitive prices. Empowering agricultural communities through technology and innovation.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <FaPhoneAlt className="mr-3 text-primary-500" />
                <span>+91 7259930133</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="mr-3 text-primary-500" />
                <span>kiran@oneroot.farm</span>
              </div>
              <div className="flex items-start text-gray-600">
                <FaMapMarkerAlt className="mr-3 mt-1 text-primary-500" />
                <span>123 Farming Avenue, Bangalore, Karnataka, India</span>
              </div>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Download App</h4>
            <p className="text-gray-600 mb-4">Get the OneRoot mobile app for a seamless farming experience.</p>
            
            <motion.a 
              href="https://play.google.com/store/apps/details?id=com.adityasinghop.OneRoot&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-black text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-900 transition-all duration-300 shadow-soft hover:shadow-md mb-6 hover:-translate-y-1"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGooglePlay className="mr-3 text-xl" />
              <div>
                <div className="text-xs opacity-80">GET IT ON</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </motion.a>
            
            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-800">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                    className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-md transition-all duration-200"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-sm text-gray-600">
                &copy; {currentYear} OneRoot.farm - All rights reserved
              </p>
              <div className="flex flex-wrap justify-center md:justify-start mt-2 space-x-4">
                {footerLinks.legal.map((link, index) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className="text-xs text-gray-500 hover:text-primary-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <p className="text-sm text-gray-600 flex items-center">
                Made with <FaHeart className="text-red-500 mx-1.5 animate-pulse-slow" size={12} /> for Indian farmers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;