// SMS Service Implementation using Netlify Functions
// This solves browser compatibility issues by moving Twilio to server-side

console.log('📱 SMS Service loaded - using Netlify Functions approach');

// Note: SMS message templates and phone formatting are now handled 
// by the Netlify function for better server-side processing

// Send booking SMS notifications via Netlify Function
export const sendBookingSMS = async (bookingData) => {
  try {
    console.log('📱 Sending SMS via Netlify Function...');
    
    // Call our Netlify function to send SMS
    const response = await fetch('/.netlify/functions/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    
    console.log('📱 SMS Function Response:', results);
    
    if (results.businessNotification?.success) {
      console.log('✅ Business SMS sent successfully');
    }
    if (results.customerConfirmation?.success) {
      console.log('✅ Customer SMS sent successfully');
    }

    return results;

  } catch (error) {
    console.error('❌ SMS service error:', error);
    return {
      businessNotification: { success: false, error: error.message },
      customerConfirmation: { success: false, error: error.message }
    };
  }
};

// Send contact form SMS (business notification only) via Netlify Function
export const sendContactSMS = async (contactData) => {
  try {
    console.log('📱 Sending contact SMS via Netlify Function...');
    
    // Create contact booking data format for the function
    const contactBookingData = {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone || 'Not provided',
      service: 'Contact Form Message',
      date: 'Contact Form',
      time: new Date().toLocaleString(),
      vehicleType: 'N/A',
      serviceLocation: 'N/A',
      additionalServices: 'N/A',
      specialRequests: contactData.message,
      id: `contact_${Date.now()}`
    };

    // Call our Netlify function
    const response = await fetch('/.netlify/functions/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactBookingData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    
    console.log('📱 Contact SMS Function Response:', results);
    
    // For contact form, we only care about business notification
    return {
      businessNotification: results.businessNotification
    };

  } catch (error) {
    console.error('❌ Contact SMS error:', error);
    return {
      businessNotification: { success: false, error: error.message }
    };
  }
};