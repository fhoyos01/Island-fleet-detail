// Netlify Functions service for email handling

const NETLIFY_FUNCTIONS_URL = '/.netlify/functions';

// Send booking emails via Netlify function
export const sendBookingEmails = async (bookingData) => {
  try {
    // Use debug function first to test
    const response = await fetch(`${NETLIFY_FUNCTIONS_URL}/debug-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();
    
    // Debug logging
    console.log('Function response status:', response.status);
    console.log('Function response data:', result);
    alert('Debug Info:\n' + JSON.stringify(result, null, 2));
    
    if (response.ok && result.success) {
      return {
        businessNotification: { success: true, response: result.businessEmail },
        customerConfirmation: { success: true, response: result.customerEmail }
      };
    } else {
      throw new Error(result.error || 'Email sending failed');
    }
  } catch (error) {
    console.error('Booking email error:', error);
    return {
      businessNotification: { success: false, error },
      customerConfirmation: { success: false, error }
    };
  }
};

// Send contact emails via Netlify function
export const sendContactEmails = async (contactData) => {
  try {
    const response = await fetch(`${NETLIFY_FUNCTIONS_URL}/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      return {
        businessNotification: { success: true, response: result.businessEmail },
        customerAutoReply: { success: true, response: result.customerEmail }
      };
    } else {
      throw new Error(result.error || 'Email sending failed');
    }
  } catch (error) {
    console.error('Contact email error:', error);
    return {
      businessNotification: { success: false, error },
      customerAutoReply: { success: false, error }
    };
  }
};