// Resend Email Service via Netlify Functions

// Send booking emails
export const sendBookingEmails = async (bookingData) => {
  try {
    console.log('Sending booking emails via Netlify function...');
    
    const response = await fetch('/.netlify/functions/send-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'booking',
        bookingData: bookingData
      })
    });

    const result = await response.json();
    console.log('Email function response:', result);

    if (response.ok && result.success) {
      return {
        businessNotification: { success: true, response: result.businessEmail },
        customerConfirmation: { success: true, response: result.customerEmail }
      };
    } else {
      throw new Error(result.error || 'Email sending failed');
    }

  } catch (error) {
    console.error('Email sending error:', error);
    return {
      businessNotification: { success: false, error },
      customerConfirmation: { success: false, error }
    };
  }
};

// Send contact emails
export const sendContactEmails = async (contactData) => {
  try {
    console.log('Sending contact email via Netlify function...');
    
    const response = await fetch('/.netlify/functions/send-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        contactData: contactData
      })
    });

    const result = await response.json();
    console.log('Contact function response:', result);

    if (response.ok && result.success) {
      return {
        businessNotification: { success: true, response: result.contactEmail },
        customerAutoReply: { success: true, response: result.contactEmail }
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