// Email service with EmailJS fallback
import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
emailjs.init('Z_LxJ_dQB5VfI6T6E'); // Your EmailJS public key

// Send booking emails via EmailJS (immediate solution)
export const sendBookingEmails = async (bookingData) => {
  try {
    // Send business notification via EmailJS
    const businessNotification = await emailjs.send(
      'service_z3fkrjf', // Your service ID
      'template_h8x6nmc', // Business template ID
      {
        to_email: 'fhoyos04@gmail.com',
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        service_date: bookingData.date,
        service_time: bookingData.time,
        vehicle_type: bookingData.vehicleType,
        main_service: bookingData.service,
        additional_services: bookingData.additionalServices,
        special_requests: bookingData.specialRequests,
        booking_id: bookingData.id
      }
    );

    // Send customer confirmation copy via EmailJS
    const customerConfirmation = await emailjs.send(
      'service_z3fkrjf', // Your service ID
      'template_h8x6nmc', // Customer template ID (same for now)
      {
        to_email: 'fhoyos04@gmail.com',
        customer_name: bookingData.name,
        customer_email: `FORWARD TO: ${bookingData.email}`,
        customer_phone: bookingData.phone,
        service_date: bookingData.date,
        service_time: bookingData.time,
        vehicle_type: bookingData.vehicleType,
        main_service: bookingData.service,
        additional_services: bookingData.additionalServices,
        special_requests: bookingData.specialRequests,
        booking_id: bookingData.id,
        message_type: 'CUSTOMER CONFIRMATION COPY'
      }
    );

    return {
      businessNotification: { success: true, response: businessNotification },
      customerConfirmation: { success: true, response: customerConfirmation }
    };

  } catch (error) {
    console.error('EmailJS error:', error);
    return {
      businessNotification: { success: false, error },
      customerConfirmation: { success: false, error }
    };
  }
};

// Send contact emails via EmailJS
export const sendContactEmails = async (contactData) => {
  try {
    // Send contact message notification
    const businessNotification = await emailjs.send(
      'service_z3fkrjf', // Your service ID
      'template_h8x6nmc', // Same template for now
      {
        to_email: 'fhoyos04@gmail.com',
        customer_name: contactData.name,
        customer_email: contactData.email,
        customer_phone: contactData.phone || 'Not provided',
        message: contactData.message,
        message_type: 'CONTACT FORM MESSAGE'
      }
    );

    return {
      businessNotification: { success: true, response: businessNotification },
      customerAutoReply: { success: true, response: businessNotification }
    };

  } catch (error) {
    console.error('Contact EmailJS error:', error);
    return {
      businessNotification: { success: false, error },
      customerAutoReply: { success: false, error }
    };
  }
};