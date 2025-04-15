import { useState, useEffect } from 'react';
import { FaPhone, FaTimes, FaHeadset } from 'react-icons/fa';
import PhoneNumberModal from './PhoneNumberModal';
import { saveUserPhoneNumber } from '../services/userService';

function CallButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Make visible by default
  const [showModal, setShowModal] = useState(false);
  const [hasSubmittedNumber, setHasSubmittedNumber] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [isAnimating, setIsAnimating] = useState(true); // Start with animation
  const companyPhoneNumber = '+91 9876543210'; // Replace with OneRoot's actual phone number

  // Check localStorage on mount and listen for changes
  useEffect(() => {
    const checkLocalStorage = () => {
      const hasSubmitted = localStorage.getItem('oneroot_phone_submitted') === 'true';
      const savedNumber = localStorage.getItem('oneroot_user_phone');
      
      setHasSubmittedNumber(hasSubmitted);
      if (savedNumber) {
        setUserPhoneNumber(savedNumber);
      }
    };
    
    // Initial check
    checkLocalStorage();
    
    // Add event listener to detect changes in localStorage from other components
    const handleStorageChange = (e) => {
      if (!e || !e.key || e.key === 'oneroot_phone_submitted' || e.key === 'oneroot_user_phone') {
        checkLocalStorage();
      }
    };
    
    // Listen for custom event as well
    const handlePhoneSubmitted = () => {
      checkLocalStorage();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('phoneNumberSubmitted', handlePhoneSubmitted);
    
    // Check again every 5 seconds to ensure consistency
    const intervalCheck = setInterval(checkLocalStorage, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('phoneNumberSubmitted', handlePhoneSubmitted);
      clearInterval(intervalCheck);
    };
  }, []);

  // Always show the button
  useEffect(() => {
    // Set a timeout to show the tooltip after a short delay
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    
    return () => clearTimeout(tooltipTimer);
  }, []);

  // Auto-hide tooltip after 5 seconds
  useEffect(() => {
    let timer;
    if (showTooltip) {
      timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showTooltip]);

  // Show tooltip on first appearance if user hasn't submitted number
  useEffect(() => {
    if (isVisible && !hasSubmittedNumber) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasSubmittedNumber]);

  // Periodic animation to draw attention - more frequent and with longer animation
  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (isVisible && !showTooltip && !showModal) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1500); // Longer animation duration
      }
    }, 7000); // More frequent animation (every 7 seconds)
    
    return () => clearInterval(animationInterval);
  }, [isVisible, showTooltip, showModal]);

  const handleCallButtonClick = () => {
    // If user has already submitted their number, call them directly
    if (hasSubmittedNumber) {
      initiateCall();
    } else {
      // Otherwise show the modal to collect their number
      setShowModal(true);
      setShowTooltip(false);
      
      // Trigger animation when button is clicked
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1500);
    }
  };

  const handleSubmitPhoneNumber = async (phoneNumber, deviceType) => {
    try {
      // Get current page for notes
      const currentPage = window.location.pathname;
      const notes = `Submitted from call button on ${currentPage} page`;
      
      console.log('CallButton: Submitting information', { phoneNumber, deviceType, notes });
      
      // Save the phone number and device type to Supabase
      await saveUserPhoneNumber(phoneNumber, 'call_button', notes, deviceType);
      
      // Update state
      setUserPhoneNumber(phoneNumber);
      setHasSubmittedNumber(true);
      
      console.log('CallButton: Information submitted successfully');
      return true;
    } catch (error) {
      console.error('CallButton: Error submitting information:', error);
      throw error; // Re-throw to be caught by the modal
    }
  };

  const initiateCall = () => {
    // If we have the user's number, we'll call them (in a real app)
    // For now, just initiate a call to the company
    window.location.href = `tel:${companyPhoneNumber.replace(/\s+/g, '')}`;
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        {/* Tooltip */}
        {showTooltip && (
          <div className="mr-3 bg-white rounded-lg shadow-lg p-3 max-w-xs animate-fade-in relative">
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 text-gray-600 hover:bg-gray-300 transition-colors duration-200"
            >
              <FaTimes size={10} />
            </button>
            <p className="text-sm font-medium text-gray-800">Need help with filters?</p>
            <p className="text-xs text-gray-600 mt-1">
              {hasSubmittedNumber 
                ? "We'll call you back shortly!" 
                : "Click to share your number and we'll call you back!"}
            </p>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
          </div>
        )}
        
        {/* Call Button - Enhanced with better visual effects */}
        <button 
          onClick={handleCallButtonClick}
          className={`bg-gradient-to-r from-green-500 to-green-600 h-16 w-16 rounded-full shadow-lg flex items-center justify-center text-white transform hover:scale-110 transition-all duration-300 hover:shadow-xl ${
            isAnimating ? 'animate-attention-bounce' : 'animate-bounce-subtle'
          }`}
          style={{
            boxShadow: isAnimating 
              ? '0 0 20px 8px rgba(34, 197, 94, 0.5)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
          aria-label="Request a call"
        >
          {hasSubmittedNumber ? (
            <FaHeadset className="text-3xl" />
          ) : (
            <FaPhone className="text-3xl" />
          )}
        </button>
      </div>
      
      {/* Phone Number Collection Modal */}
      <PhoneNumberModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitPhoneNumber}
      />
    </>
  );
}

export default CallButton;