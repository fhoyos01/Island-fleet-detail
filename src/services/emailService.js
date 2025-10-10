// EmailJS Email Service Implementation
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_jt3c7bg',           // Your Gmail service
  CUSTOMER_TEMPLATE_ID: 'template_s4srqyp', // Customer confirmation template
  BUSINESS_TEMPLATE_ID: 'template_0dz0tfj', // Business notification template
  PUBLIC_KEY: '16C07lc2eVNU-n921'          // Your public key
};

// Initialize EmailJS with your public key
const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Format additional services as bulleted list
const formatAdditionalServices = (services) => {
  if (!services || services === 'None' || services.length === 0) {
    return 'None';
  }
  
  if (typeof services === 'string') {
    // If it's a comma-separated string, split it
    const serviceArray = services.split(', ').filter(s => s.trim() !== '');
    return serviceArray.length > 0 ? serviceArray.map(service => `• ${service}`).join('\n') : 'None';
  }
  
  if (Array.isArray(services)) {
    return services.length > 0 ? services.map(service => `• ${service}`).join('\n') : 'None';
  }
  
  return 'None';
};

// Create Google Calendar link
const createCalendarLink = (bookingData) => {
  const startDate = new Date(bookingData.date + ' ' + bookingData.time);
  const endDate = new Date(startDate.getTime() + (75 * 60 * 1000)); // 1 hour 15 minutes later
  
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const title = encodeURIComponent(`Island Fleet Detail - ${bookingData.service}`);
  const details = encodeURIComponent(`Customer: ${bookingData.name}
Phone: ${bookingData.phone}
Email: ${bookingData.email}
Vehicle: ${bookingData.vehicleType}
Service: ${bookingData.service}
Location: ${bookingData.serviceLocation || 'Not specified'}
Additional Services: ${bookingData.additionalServices || 'None'}
Special Requests: ${bookingData.specialRequests || 'None'}
Booking ID: #${bookingData.id}`);
  
  const location = encodeURIComponent(bookingData.serviceLocation || 'Customer Location');
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}&location=${location}`;
};

// Send booking emails
export const sendBookingEmails = async (bookingData) => {
  try {
    console.log('Sending booking emails via EmailJS...');
    
    initEmailJS();

    // Format additional services as bulleted list
    const formattedAdditionalServices = formatAdditionalServices(bookingData.additionalServices);

    // Create cancellation link
    const cancellationLink = `${window.location.origin}${window.location.pathname}?cancel=${bookingData.id}`;

    // Business email temporarily disabled for SMS testing
    console.log('📱 Business email disabled for SMS testing');
    const businessResult = { status: 200, text: 'DISABLED_FOR_SMS_TESTING' };

    // Now test customer template
    console.log('Attempting to send customer confirmation...');
    console.log('Customer Template ID:', EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID);
    console.log('Customer email:', bookingData.email);
    
    const customerResult = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID,
      {
        customer_email: bookingData.email,
        customer_name: bookingData.name,
        customer_phone: bookingData.phone,
        service_date: bookingData.date,
        service_time: bookingData.time,
        vehicle_type: bookingData.vehicleType,
        main_service: bookingData.service,
        service_location: bookingData.serviceLocation || 'Not specified',
        additional_services: formattedAdditionalServices,
        special_requests: bookingData.specialRequests || 'None',
        booking_id: bookingData.id,
        calendar_link: createCalendarLink(bookingData),
        cancellation_link: cancellationLink
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

    // Send contact notification (using business template)
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.BUSINESS_TEMPLATE_ID,
      {
        customer_name: contactData.name,
        customer_email: contactData.email,
        customer_phone: contactData.phone || 'Not provided',
        service_date: 'Contact Form',
        service_time: 'N/A',
        vehicle_type: 'N/A',
        main_service: 'Contact Form Message',
        additional_services: 'N/A',
        special_requests: contactData.message,
        booking_id: `contact_${Date.now()}`,
        submission_time: new Date().toLocaleString()
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