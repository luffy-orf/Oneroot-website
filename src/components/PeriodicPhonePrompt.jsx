import { useState, useEffect } from 'react';
import PhoneNumberModal from './PhoneNumberModal';
import { saveUserPhoneNumber, checkPhoneNumberExists } from '../services/userService';

function PeriodicPhonePrompt() {
  const [showModal, setShowModal] = useState(false);
  const [hasSubmittedNumber, setHasSubmittedNumber] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  
  // Check if the user has already submitted a phone number
  useEffect(() => {
    const checkExistingSubmission = async () => {
      // Check localStorage first
      const storedPhone = localStorage.getItem('oneroot_user_phone');
      const hasSubmitted = localStorage.getItem('oneroot_phone_submitted') === 'true';
      
      if (storedPhone && hasSubmitted) {
        setUserPhoneNumber(storedPhone);
        setHasSubmittedNumber(true);
        return;
      }
      
      // If not in localStorage, we'll just rely on the state
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
  
  // Set up the periodic prompt
  useEffect(() => {
    if (hasSubmittedNumber) {
      // Don't show prompts if the user has already submitted their number
      return;
    }
    
    // Random delay between 5-10 seconds
    const getRandomDelay = () => Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    
    // Function to show the modal
    const showPrompt = () => {
      // Only show if the user hasn't submitted a number yet
      if (!hasSubmittedNumber) {
        setShowModal(true);
      }
    };
    
    // Initial delay before showing the first prompt (7 seconds)
    const initialDelay = setTimeout(showPrompt, 7000);
    
    // Set up recurring prompts
    let promptInterval;
    
    // After the initial prompt, set up recurring prompts
    const setupRecurringPrompts = () => {
      promptInterval = setInterval(() => {
        // Only show if the user hasn't submitted a number yet and the modal is not already showing
        if (!hasSubmittedNumber && !showModal) {
          showPrompt();
        }
      }, getRandomDelay());
    };
    
    // Set up the recurring prompts after the initial delay
    const recurringPromptSetup = setTimeout(setupRecurringPrompts, 7000);
    
    // Clean up
    return () => {
      clearTimeout(initialDelay);
      clearTimeout(recurringPromptSetup);
      if (promptInterval) clearInterval(promptInterval);
    };
  }, [hasSubmittedNumber, showModal]);
  
  const handleSubmitPhoneNumber = async (phoneNumber, deviceType) => {
    try {
      // Get current page for notes
      const currentPage = window.location.pathname;
      const notes = `Submitted from periodic prompt on ${currentPage} page`;
      
      console.log('PeriodicPrompt: Submitting phone number', { phoneNumber, deviceType, notes });
      
      // Save the phone number and device type to Supabase
      await saveUserPhoneNumber(phoneNumber, 'periodic_prompt', notes, deviceType);
      
      // Update state
      setUserPhoneNumber(phoneNumber);
      setHasSubmittedNumber(true);
      
      console.log('PeriodicPrompt: Information submitted successfully');
      return true;
    } catch (error) {
      console.error('PeriodicPrompt: Error submitting information:', error);
      throw error; // Re-throw to be caught by the modal
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