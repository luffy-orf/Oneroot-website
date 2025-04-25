import { useState, useEffect } from 'react';
import PhoneNumberModal from './PhoneNumberModal';
import { saveUserPhoneNumber } from '../services/userService';

function PeriodicPhonePrompt() {
  const [showModal, setShowModal] = useState(false);
  const [hasSubmittedNumber, setHasSubmittedNumber] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  
  // Check if the user has already submitted a phone number
  useEffect(() => {
    const checkExistingSubmission = async () => {
      // Check localStorage first for permanent submission
      const storedPhone = localStorage.getItem('oneroot_user_phone');
      const hasSubmitted = localStorage.getItem('oneroot_phone_submitted') === 'true';
      
      if (storedPhone && hasSubmitted) {
        setUserPhoneNumber(storedPhone);
        setHasSubmittedNumber(true);
        return;
      }
      
      // Check sessionStorage for this session
      const shownThisSession = sessionStorage.getItem('phone_modal_shown') === 'true';
      
      // If not shown this session and no number submitted, show after delay
      if (!shownThisSession && !hasSubmitted) {
        const timer = setTimeout(() => {
          setShowModal(true);
          sessionStorage.setItem('phone_modal_shown', 'true');
        }, 7000); // Show after 7 seconds
        
        return () => clearTimeout(timer);
      }
    };
    
    checkExistingSubmission();
    
    // Add event listener to detect changes in localStorage from other components
    const handleStorageChange = (e) => {
      if (!e || !e.key || e.key === 'oneroot_phone_submitted') {
        const hasSubmitted = localStorage.getItem('oneroot_phone_submitted') === 'true';
        if (hasSubmitted) {
          setHasSubmittedNumber(true);
          const storedPhone = localStorage.getItem('oneroot_user_phone');
          if (storedPhone) {
            setUserPhoneNumber(storedPhone);
          }
        }
      }
    };
    
    // Listen for custom event as well
    const handlePhoneSubmitted = () => {
      setHasSubmittedNumber(true);
      const storedPhone = localStorage.getItem('oneroot_user_phone');
      if (storedPhone) {
        setUserPhoneNumber(storedPhone);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('phoneNumberSubmitted', handlePhoneSubmitted);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('phoneNumberSubmitted', handlePhoneSubmitted);
    };
  }, []);

  const handleSubmitPhoneNumber = async (phoneNumber, deviceType) => {
    try {
      const currentPage = window.location.pathname;
      const notes = `Submitted from periodic prompt on ${currentPage} page`;
      
      console.log('PeriodicPrompt: Submitting phone number', { phoneNumber, deviceType, notes });
      
      await saveUserPhoneNumber(phoneNumber, 'periodic_prompt', notes, deviceType);
      
      setUserPhoneNumber(phoneNumber);
      setHasSubmittedNumber(true);
      
      console.log('PeriodicPrompt: Information submitted successfully');
      return true;
    } catch (error) {
      console.error('PeriodicPrompt: Error submitting information:', error);
      throw error;
    }
  };
  
  return (
    <>
      <PhoneNumberModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitPhoneNumber}
      />
    </>
  );
}

export default PeriodicPhonePrompt;