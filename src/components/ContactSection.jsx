import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('submitting');
    
    // In a real application, you would send this data to your backend
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1500);
  };

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

  // Contact info items
  const contactInfo = [
    {
      icon: <FaPhoneAlt />,
      title: 'Phone',
      details: '+91 98765 43210',
      action: 'tel:+919876543210',
      actionText: 'Call us'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: 'contact@oneroot.farm',
      action: 'mailto:contact@oneroot.farm',
      actionText: 'Send email'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Office',
      details: '123 Farming Avenue, Bangalore, Karnataka, India',
      action: 'https://maps.google.com',
      actionText: 'Get directions'
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" ref={ref}>
      {/* Decorative Elements */}
      <div className="decorative-circle w-96 h-96 bg-primary-500 -bottom-48 -right-48"></div>
      <div className="decorative-circle w-64 h-64 bg-secondary-500 -top-32 -left-32"></div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get In Touch
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We'd Love to <span className="gradient-text">Hear</span> From You
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Have questions about our products or services? Reach out to our team and we'll get back to you as soon as possible.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-soft p-6 md:p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send us a message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="input"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
                
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm"
                  >
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-soft-md transition-all duration-300 flex items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-gray-600 mb-3">{item.details}</p>
                    <a 
                      href={item.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                    >
                      {item.actionText}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Map or Additional Info */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 h-64 md:h-auto"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.6600754038!2d77.35073573336324!3d12.954517010883638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1645518246017!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="OneRoot Office Location"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;