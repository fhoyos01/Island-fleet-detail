import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
  TEMPLATE_ID_BUSINESS: 'template_business', // Business notification template
  TEMPLATE_ID_CUSTOMER: 'template_customer', // Customer confirmation template
  PUBLIC_KEY: 'your_public_key' // Replace with your EmailJS public key
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Send business notification email
export const sendBusinessNotification = async (bookingData) => {
  try {
    const templateParams = {
      to_email: 'your-business-email@gmail.com', // Replace with your business email
      customer_name: bookingData.name,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone,
      service_date: bookingData.date,
      service_time: bookingData.time,
      vehicle_type: bookingData.vehicleType,
      main_service: bookingData.service,
      additional_services: bookingData.additionalServices,
      special_requests: bookingData.specialRequests,
      booking_id: bookingData.id,
      submission_time: new Date().toLocaleString()
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_BUSINESS,
      templateParams
    );

    console.log('Business notification sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send business notification:', error);
    return { success: false, error };
  }
};

// Send customer confirmation email
export const sendCustomerConfirmation = async (bookingData) => {
  try {
    const templateParams = {
      to_email: bookingData.email,
      customer_name: bookingData.name,
      service_date: bookingData.date,
      service_time: bookingData.time,
      vehicle_type: bookingData.vehicleType,
      main_service: bookingData.service,
      additional_services: bookingData.additionalServices,
      special_requests: bookingData.specialRequests,
      business_phone: '(954) 798-8956',
      business_name: 'Island Fleet Detail',
      booking_id: bookingData.id
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_CUSTOMER,
      templateParams
    );

    console.log('Customer confirmation sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    return { success: false, error };
  }
};

// Send both business notification and customer confirmation
export const sendBookingEmails = async (bookingData) => {
  const results = {
    businessNotification: await sendBusinessNotification(bookingData),
    customerConfirmation: await sendCustomerConfirmation(bookingData)
  };

  return results;
};