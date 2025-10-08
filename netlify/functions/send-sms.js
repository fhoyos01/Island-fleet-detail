// Netlify Function for sending SMS via Twilio
// This runs on the server, so Twilio SDK works properly

const twilio = require('twilio');

// Twilio configuration - using environment variables
const TWILIO_CONFIG = {
  ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  FROM_PHONE: process.env.TWILIO_FROM_PHONE,
  BUSINESS_PHONE: process.env.TWILIO_BUSINESS_PHONE || '+19547988956'
};

// Initialize Twilio client only if credentials are available
let client;
if (TWILIO_CONFIG.ACCOUNT_SID && TWILIO_CONFIG.AUTH_TOKEN) {
  client = twilio(TWILIO_CONFIG.ACCOUNT_SID, TWILIO_CONFIG.AUTH_TOKEN);
}

// Format phone number to E.164 format
const formatPhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }
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

// Netlify Function handler
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight' })
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Check if Twilio is configured
    if (!client) {
      console.log('Twilio not configured - missing environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'SMS service not configured',
          message: 'Twilio environment variables missing'
        })
      };
    }

    // Parse the request body
    const bookingData = JSON.parse(event.body);
    
    console.log('SMS Function called with:', {
      name: bookingData.name,
      phone: bookingData.phone,
      service: bookingData.service
    });

    const results = {
      businessNotification: { success: false },
      customerConfirmation: { success: false }
    };

    // Send business notification SMS
    try {
      console.log('Sending business SMS...');
      const businessSMS = await client.messages.create({
        body: createBusinessSMSMessage(bookingData),
        from: TWILIO_CONFIG.FROM_PHONE,
        to: TWILIO_CONFIG.BUSINESS_PHONE
      });
      
      console.log('Business SMS sent:', businessSMS.sid);
      results.businessNotification = { success: true, response: { sid: businessSMS.sid } };
    } catch (error) {
      console.error('Business SMS failed:', error);
      results.businessNotification = { success: false, error: error.message };
    }

    // Send customer confirmation SMS
    try {
      console.log('Sending customer SMS...');
      const customerPhone = formatPhoneNumber(bookingData.phone);
      
      const customerSMS = await client.messages.create({
        body: createCustomerSMSMessage(bookingData),
        from: TWILIO_CONFIG.FROM_PHONE,
        to: customerPhone
      });
      
      console.log('Customer SMS sent:', customerSMS.sid);
      results.customerConfirmation = { success: true, response: { sid: customerSMS.sid } };
    } catch (error) {
      console.error('Customer SMS failed:', error);
      results.customerConfirmation = { success: false, error: error.message };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(results)
    };

  } catch (error) {
    console.error('SMS function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};