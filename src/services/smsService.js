// Twilio SMS Service Implementation
// Note: Run 'npm install twilio' to install the Twilio SDK

// Twilio Configuration - Using environment variables for security
const TWILIO_CONFIG = {
  ACCOUNT_SID: import.meta.env.VITE_TWILIO_ACCOUNT_SID,
  AUTH_TOKEN: import.meta.env.VITE_TWILIO_AUTH_TOKEN,
  FROM_PHONE: import.meta.env.VITE_TWILIO_FROM_PHONE,
  BUSINESS_PHONE: import.meta.env.VITE_TWILIO_BUSINESS_PHONE || '+19547988956'
};

// Initialize Twilio client (will be available after npm install twilio)
let twilioClient;
try {
  if (TWILIO_CONFIG.ACCOUNT_SID && TWILIO_CONFIG.AUTH_TOKEN) {
    const twilio = require('twilio');
    twilioClient = twilio(TWILIO_CONFIG.ACCOUNT_SID, TWILIO_CONFIG.AUTH_TOKEN);
    console.log('✅ Twilio client initialized successfully');
  } else {
    console.warn('⚠️ Twilio credentials missing from environment variables');
  }
} catch (error) {
  console.error('❌ Twilio initialization failed:', error.message);
}

// Format phone number to E.164 format
const formatPhoneNumber = (phone) => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Add +1 if US number without country code
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // Add + if missing
  if (!phone.startsWith('+')) {
    return `+${digits}`;
  }
  
  return phone;
};

// Create business SMS message
const createBusinessSMSMessage = (bookingData) => {
  return `🚗 NEW BOOKING - Island Fleet Detail

Customer: ${bookingData.name}
Phone: ${bookingData.phone}
Email: ${bookingData.email}

Service: ${bookingData.service}
Date: ${bookingData.date}
Time: ${bookingData.time}
Vehicle: ${bookingData.vehicleType}
Location: ${bookingData.serviceLocation || 'Not specified'}

Additional Services:
${bookingData.additionalServices || 'None'}

Special Requests: ${bookingData.specialRequests || 'None'}

Booking ID: #${bookingData.id}

Contact customer within 24 hours to confirm.`;
};

// Create customer SMS message
const createCustomerSMSMessage = (bookingData) => {
  return `🚗 Island Fleet Detail - Booking Confirmed!

Hi ${bookingData.name}! Your booking has been received.

Date: ${bookingData.date}
Time: ${bookingData.time}
Service: ${bookingData.service}
Vehicle: ${bookingData.vehicleType}
Location: ${bookingData.serviceLocation || 'Not specified'}

We'll contact you within 24 hours to confirm your appointment.

Booking ID: #${bookingData.id}

Questions? Call (954) 798-8956

Thank you for choosing Island Fleet Detail!`;
};

// Send booking SMS notifications
export const sendBookingSMS = async (bookingData) => {
  console.log('SMS Service Debug:');
  console.log('- Account SID:', TWILIO_CONFIG.ACCOUNT_SID ? 'Set' : 'Missing');
  console.log('- Auth Token:', TWILIO_CONFIG.AUTH_TOKEN ? 'Set' : 'Missing');
  console.log('- From Phone:', TWILIO_CONFIG.FROM_PHONE);
  console.log('- Business Phone:', TWILIO_CONFIG.BUSINESS_PHONE);
  console.log('- Twilio Client:', twilioClient ? 'Initialized' : 'Not initialized');

  if (!twilioClient) {
    console.warn('Twilio not configured. Install with: npm install twilio');
    return {
      businessNotification: { success: false, error: 'Twilio not installed' },
      customerConfirmation: { success: false, error: 'Twilio not installed' }
    };
  }

  try {
    console.log('Sending booking SMS via Twilio...');
    
    const results = {
      businessNotification: { success: false },
      customerConfirmation: { success: false }
    };

    // Send business notification SMS
    try {
      console.log('Sending business SMS notification...');
      const businessSMS = await twilioClient.messages.create({
        body: createBusinessSMSMessage(bookingData),
        from: TWILIO_CONFIG.FROM_PHONE,
        to: TWILIO_CONFIG.BUSINESS_PHONE
      });
      
      console.log('Business SMS sent successfully:', businessSMS.sid);
      results.businessNotification = { success: true, response: businessSMS };
    } catch (error) {
      console.error('Business SMS failed:', error);
      results.businessNotification = { success: false, error };
    }

    // Send customer confirmation SMS
    try {
      console.log('Sending customer SMS confirmation...');
      const customerPhone = formatPhoneNumber(bookingData.phone);
      
      const customerSMS = await twilioClient.messages.create({
        body: createCustomerSMSMessage(bookingData),
        from: TWILIO_CONFIG.FROM_PHONE,
        to: customerPhone
      });
      
      console.log('Customer SMS sent successfully:', customerSMS.sid);
      results.customerConfirmation = { success: true, response: customerSMS };
    } catch (error) {
      console.error('Customer SMS failed:', error);
      results.customerConfirmation = { success: false, error };
    }

    return results;

  } catch (error) {
    console.error('SMS service error:', error);
    return {
      businessNotification: { success: false, error },
      customerConfirmation: { success: false, error }
    };
  }
};

// Send contact form SMS (business notification only)
export const sendContactSMS = async (contactData) => {
  if (!twilioClient) {
    console.warn('Twilio not configured. Install with: npm install twilio');
    return {
      businessNotification: { success: false, error: 'Twilio not installed' }
    };
  }

  try {
    console.log('Sending contact SMS via Twilio...');
    
    const contactMessage = `📞 NEW CONTACT - Island Fleet Detail

Name: ${contactData.name}
Phone: ${contactData.phone || 'Not provided'}
Email: ${contactData.email}

Message: ${contactData.message}

Contact ID: contact_${Date.now()}
Time: ${new Date().toLocaleString()}

Respond to customer promptly.`;

    const businessSMS = await twilioClient.messages.create({
      body: contactMessage,
      from: TWILIO_CONFIG.FROM_PHONE,
      to: TWILIO_CONFIG.BUSINESS_PHONE
    });

    console.log('Contact SMS sent successfully:', businessSMS.sid);
    
    return {
      businessNotification: { success: true, response: businessSMS }
    };

  } catch (error) {
    console.error('Contact SMS error:', error);
    return {
      businessNotification: { success: false, error }
    };
  }
};