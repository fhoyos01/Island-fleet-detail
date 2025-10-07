// EmailJS Email Service Implementation
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_jt3c7bg',      // Your Gmail service (corrected)
  TEMPLATE_ID: 'template_phj833p',    // Your email template
  PUBLIC_KEY: '16C07lc2eVNU-n921'     // Your public key
};

// Initialize EmailJS with your public key
const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Send booking emails
export const sendBookingEmails = async (bookingData) => {
  try {
    console.log('Sending booking emails via EmailJS...');
    
    initEmailJS();

    // Send business notification email
    const businessResult = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        to_email: 'fhoyos04@gmail.com',
        subject: '🚗 New Booking - Island Fleet Detail',
        message_content: 'NEW BOOKING RECEIVED',
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        service_date: bookingData.date,
        service_time: bookingData.time,
        vehicle_type: bookingData.vehicleType,
        main_service: bookingData.service,
        additional_services: bookingData.additionalServices || 'None',
        special_requests: bookingData.specialRequests || 'None',
        booking_id: bookingData.id
      }
    );

    console.log('Business notification sent:', businessResult);

    // Send customer confirmation copy
    const customerResult = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        to_email: 'fhoyos04@gmail.com',
        subject: `✅ Customer Confirmation for ${bookingData.name} - FORWARD TO: ${bookingData.email}`,
        message_content: `CUSTOMER CONFIRMATION COPY - Please forward this to: ${bookingData.email}`,
        customer_name: bookingData.name,
        customer_email: `FORWARD TO: ${bookingData.email}`,
        customer_phone: bookingData.phone,
        service_date: bookingData.date,
        service_time: bookingData.time,
        vehicle_type: bookingData.vehicleType,
        main_service: bookingData.service,
        additional_services: bookingData.additionalServices || 'None',
        special_requests: bookingData.specialRequests || 'None',
        booking_id: bookingData.id
      }
    );

    console.log('Customer confirmation sent:', customerResult);

    return {
      businessNotification: { success: true, response: businessResult },
      customerConfirmation: { success: true, response: customerResult }
    };

  } catch (error) {
    console.error('EmailJS booking error:', error);
    return {
      businessNotification: { success: false, error },
      customerConfirmation: { success: false, error }
    };
  }
};

// Send contact emails
export const sendContactEmails = async (contactData) => {
  try {
    console.log('Sending contact email via EmailJS...');
    
    initEmailJS();

    // Send contact notification
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        to_email: 'fhoyos04@gmail.com',
        subject: '📨 New Contact Message - Island Fleet Detail',
        message_content: `CONTACT FORM MESSAGE: ${contactData.message}`,
        customer_name: contactData.name,
        customer_email: contactData.email,
        customer_phone: contactData.phone || 'Not provided',
        service_date: 'N/A',
        service_time: 'N/A',
        vehicle_type: 'N/A',
        main_service: 'Contact Form',
        additional_services: 'N/A',
        special_requests: contactData.message,
        booking_id: `contact_${Date.now()}`
      }
    );

    console.log('Contact email sent:', result);

    return {
      businessNotification: { success: true, response: result },
      customerAutoReply: { success: true, response: result }
    };

  } catch (error) {
    console.error('EmailJS contact error:', error);
    return {
      businessNotification: { success: false, error },
      customerAutoReply: { success: false, error }
    };
  }
};