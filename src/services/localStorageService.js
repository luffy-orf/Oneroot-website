/**
 * Fallback service to store phone numbers locally when Supabase is unavailable
 */

// Key for storing phone numbers in localStorage
const PHONE_NUMBERS_KEY = 'oneroot_collected_phone_numbers';

/**
 * Save a phone number to localStorage
 * @param {string} phoneNumber - The user's phone number
 * @param {string} source - Where the number was collected from
 * @param {string} notes - Additional notes
 * @param {string} deviceType - The user's device type
 * @returns {Promise<boolean>} - Success status
 */
export const savePhoneNumberLocally = async (phoneNumber, source, notes, deviceType = null) => {
  try {
    // Get existing numbers
    const existingData = localStorage.getItem(PHONE_NUMBERS_KEY);
    const phoneNumbers = existingData ? JSON.parse(existingData) : [];
    
    // Determine device type if not provided
    const detectedDeviceType = deviceType || 
      (/mobile|android|iphone|ipad/i.test(navigator.userAgent) ? 'mobile' : 'desktop');
    
    // Add new number with metadata
    phoneNumbers.push({
      phone_number: phoneNumber,
      source,
      notes,
      device_type: detectedDeviceType,
      timestamp: new Date().toISOString(),
      page_url: window.location.pathname
    });
    
    // Save back to localStorage
    localStorage.setItem(PHONE_NUMBERS_KEY, JSON.stringify(phoneNumbers));
    
    console.log('Phone number saved to localStorage as fallback');
    return true;
  } catch (error) {
    console.error('Error saving phone number to localStorage:', error);
    return false;
  }
};

/**
 * Check if a phone number exists in localStorage
 * @param {string} phoneNumber - The phone number to check
 * @returns {Promise<boolean>} - Whether the number exists
 */
export const checkPhoneNumberExistsLocally = async (phoneNumber) => {
  try {
    const existingData = localStorage.getItem(PHONE_NUMBERS_KEY);
    if (!existingData) return false;
    
    const phoneNumbers = JSON.parse(existingData);
    return phoneNumbers.some(entry => entry.phone_number === phoneNumber);
  } catch (error) {
    console.error('Error checking phone number in localStorage:', error);
    return false;
  }
};