import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Update slides per view based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Coconut Farmer, Kerala',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'OneRoot has transformed how I source filters. The prices are transparent, and I save at least 20% compared to local suppliers. The app is easy to use even for someone like me who isn\'t tech-savvy.',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Agricultural Cooperative Leader',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'Our cooperative has been using OneRoot for bulk filter purchases. The quality is consistent, and their customer service is exceptional. They\'ve helped us streamline our procurement process.',
      rating: 5
    },
    {
      id: 3,
      name: 'Anand Patel',
      role: 'Small-scale Farmer, Gujarat',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
      quote: 'The direct connection to manufacturers has eliminated middlemen costs. I appreciate the detailed product information and being able to compare prices across different regions.',
      rating: 4
    },
    {
      id: 4,
      name: 'Lakshmi Nair',
      role: 'Organic Farmer, Tamil Nadu',
      image: 'https://randomuser.me/api/portraits/women/58.jpg',
      quote: 'As an organic farmer, quality is paramount. OneRoot provides detailed information about each filter, helping me make informed decisions. The delivery is always on time.',
      rating: 5
    },
    {
      id: 5,
      name: 'Suresh Reddy',
      role: 'Large Estate Owner, Andhra Pradesh',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      quote: 'Managing a large estate requires efficient procurement. OneRoot\'s bulk ordering and scheduled deliveries have simplified our operations significantly. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Decorative Elements */}
      <div className="decorative-circle w-96 h-96 bg-primary-500 top-0 left-0"></div>
      <div className="decorative-circle w-64 h-64 bg-secondary-500 bottom-0 right-0"></div>
      
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
            Testimonials
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            What Our <span className="gradient-text">Farmers</span> Say
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hear from farmers across India who have transformed their filter procurement 
            process with OneRoot's innovative platform.
          </motion.p>
        </motion.div>
        
        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="px-4"
        >
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={30}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="testimonials-swiper pb-14"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-soft-lg hover:border-primary-100 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start mb-4">
                    <div className="relative mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-1 rounded-full">
                        <FaQuoteLeft size={12} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} 
                            size={14} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic flex-grow">"{testimonial.quote}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center bg-gradient-to-r from-primary-50 to-primary-100 p-8 rounded-2xl shadow-soft max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Ready to transform your farming experience?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied farmers who have already made the switch to OneRoot.
          </p>
          <motion.a 
            href="https://play.google.com/store/apps/details?id=com.adityasinghop.OneRoot&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;