import { supabase } from '../config/supabase';
import { savePhoneNumberLocally, checkPhoneNumberExistsLocally } from './localStorageService';

/**
 * Save user phone number and device type to Supabase
 * @param {string} phoneNumber - The user's phone number (with +91 prefix)
 * @param {string} source - Where the information was collected from (e.g., 'call_button', 'periodic_prompt')
 * @param {string} notes - Optional notes about the submission
 * @param {string} userDeviceType - The user's device type (mobile, tablet, desktop, etc.)
 * @returns {Promise} - Result of the operation
 */
export const saveUserPhoneNumber = async (phoneNumber, source = 'website', notes = null, userDeviceType = null) => {
  try {
    console.log('Starting saveUserPhoneNumber with:', { phoneNumber, source, notes, userDeviceType });
    
    // Validate phone number format
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      throw new Error('Invalid phone number format');
    }
    
    // Use provided device type or detect it
    let deviceType = userDeviceType;
    
    // If no device type provided, detect it from user agent
    if (!deviceType) {
      const userAgent = navigator.userAgent;
      
      deviceType = 'desktop';
      if (/android/i.test(userAgent)) {
        deviceType = 'android';
      } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        deviceType = 'ios';
      } else if (/mobile/i.test(userAgent)) {
        deviceType = 'mobile';
      }
    }
    
    // Get current page URL
    const currentPage = window.location.pathname;
    const userAgent = navigator.userAgent;
    
    console.log('Device info:', { deviceType, userAgent, currentPage });
    
    // Prepare the data for web_phonenumbers table
    const webPhoneData = { 
      phone_number: phoneNumber,
      device_type: deviceType,
      notes: notes
    };
    
    // Prepare the data for user_phone_numbers table
    const userPhoneData = { 
      phone_number: phoneNumber,
      source,
      device_type: deviceType,
      user_agent: userAgent,
      page_url: currentPage,
      status: 'new'
    };
    
    console.log('Attempting to insert into web_phonenumbers:', webPhoneData);
    
    // Insert directly into the existing web_phonenumbers table
    try {
      console.log('Inserting into web_phonenumbers table:', webPhoneData);
      
      // Insert into the web_phonenumbers table
      const { data: webData, error: webError } = await supabase
        .from('web_phonenumbers')
        .insert([webPhoneData]);
        
      if (webError) {
        console.error('Error inserting into web_phonenumbers:', webError);
        // Save to localStorage as fallback
        await savePhoneNumberLocally(phoneNumber, source, notes);
      } else {
        console.log('Successfully inserted into web_phonenumbers');
      }
    } catch (webInsertError) {
      console.error('Exception inserting into web_phonenumbers:', webInsertError);
      // Save to localStorage as fallback
      await savePhoneNumberLocally(phoneNumber, source, notes);
    }
    
    // We're only using the web_phonenumbers table now
    // Return the result of the web_phonenumbers insertion
    return { phone_number: phoneNumber, device_type: deviceType, notes: notes };
  } catch (error) {
    console.error('Error in saveUserPhoneNumber:', error);
    throw error;
  }
};

/**
 * Check if a phone number already exists in the database
 * @param {string} phoneNumber - The user's phone number
 * @returns {Promise<boolean>} - Whether the number exists
 */
export const checkPhoneNumberExists = async (phoneNumber) => {
  try {
    console.log('Checking if phone number exists:', phoneNumber);
    
    // Check in web_phonenumbers table
    try {
      const { data, error } = await supabase
        .from('web_phonenumbers')
        .select('id')
        .eq('phone_number', phoneNumber)
        .limit(1);
        
      if (!error && data && data.length > 0) {
        console.log('Phone number found in web_phonenumbers');
        return true;
      }
      
      if (error) {
        console.error('Error checking phone number in web_phonenumbers:', error);
      }
    } catch (supabaseError) {
      console.error('Exception checking phone number in Supabase:', supabaseError);
    }
    
    // If Supabase check fails or returns no results, check localStorage
    const existsLocally = await checkPhoneNumberExistsLocally(phoneNumber);
    if (existsLocally) {
      console.log('Phone number found in localStorage');
      return true;
    }
    
    console.log('Phone number not found in either web_phonenumbers or localStorage');
    return false;
  } catch (error) {
    console.error('Error checking phone number:', error);
    return false;
  }
};