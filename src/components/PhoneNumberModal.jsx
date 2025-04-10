import { useState, useEffect } from 'react';
import { FaPhone, FaTimes, FaCheck } from 'react-icons/fa';

function PhoneNumberModal({ isOpen, onClose, onSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhoneNumber('');
      setError('');
      setIsValid(false);
      setIsSubmitting(false);
      setShowSuccess(false);
    }
  }, [isOpen]);

  // Validate phone number
  const validatePhoneNumber = (number) => {
    // Indian phone number validation (10 digits, optionally with +91 prefix)
    const regex = /^(?:\+91)?[6-9]\d{9}$/;
    return regex.test(number.replace(/\s+/g, ''));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsValid(validatePhoneNumber(value));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValid) {
      setError('Please enter a valid 10-digit Indian phone number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Format phone number to standard format (remove spaces, ensure +91 prefix)
      const formattedNumber = phoneNumber.replace(/\s+/g, '');
      const standardNumber = formattedNumber.startsWith('+91') 
        ? formattedNumber 
        : `+91${formattedNumber}`;
      
      // Auto-detect device type
      const userAgent = navigator.userAgent;
      let deviceType = 'desktop';
      if (/android/i.test(userAgent)) {
        deviceType = 'android';
      } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        deviceType = 'ios';
      } else if (/mobile/i.test(userAgent)) {
        deviceType = 'mobile';
      } else if (/tablet/i.test(userAgent)) {
        deviceType = 'tablet';
      }
      
      console.log('Submitting phone number:', standardNumber, 'Device type:', deviceType);
      
      // Submit the phone number and device type
      const result = await onSubmit(standardNumber, deviceType);
      console.log('Submission result:', result);
      
      // Show success message
      setShowSuccess(true);
      
      // Store in localStorage to remember this user
      localStorage.setItem('oneroot_user_phone', standardNumber);
      localStorage.setItem('oneroot_user_device', deviceType);
      localStorage.setItem('oneroot_phone_submitted', 'true');
      
      // Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error submitting information:', error);
      setError(error.message || 'Failed to submit your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes />
        </button>
        
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaCheck className="text-green-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600">
              We've saved your number. We'll call you shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FaPhone className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Enter Your Phone Number</h3>
              <p className="text-gray-600">
                We'll call you back shortly to discuss your requirements
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter your 10-digit number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all`}
                  disabled={isSubmitting}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                <p className="mt-1 text-xs text-gray-500">Example: 9876543210 or +91 9876543210</p>
              </div>
              
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isValid && !isSubmitting 
                    ? 'bg-black hover:bg-gray-800 text-white' 
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </>
        )}
        
        <p className="mt-4 text-xs text-gray-500 text-center">
          We respect your privacy and will only use your number to contact you about OneRoot services.
        </p>
      </div>
    </div>
  );
}

export default PhoneNumberModal;