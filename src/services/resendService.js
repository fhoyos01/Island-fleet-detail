import { Resend } from 'resend';

// Resend Configuration
const RESEND_CONFIG = {
  API_KEY: 'your_resend_api_key', // Replace with your Resend API key
  BUSINESS_EMAIL: 'your-business-email@gmail.com', // Replace with your business email
  FROM_EMAIL: 'onboarding@resend.dev' // Default Resend sender (or your verified domain)
};

// Initialize Resend
const resend = new Resend(RESEND_CONFIG.API_KEY);

// Send business notification email for bookings
export const sendBookingNotification = async (bookingData) => {
  try {
    const response = await resend.emails.send({
      from: RESEND_CONFIG.FROM_EMAIL,
      to: [RESEND_CONFIG.BUSINESS_EMAIL],
      subject: '🚗 New Booking - Island Fleet Detail',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DC143C;">New Booking Received!</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Customer Details:</h3>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Phone:</strong> ${bookingData.phone}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Service Details:</h3>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>Vehicle:</strong> ${bookingData.vehicleType}</p>
            <p><strong>Service:</strong> ${bookingData.service}</p>
            <p><strong>Additional Services:</strong> ${bookingData.additionalServices || 'None'}</p>
            <p><strong>Special Requests:</strong> ${bookingData.specialRequests || 'None'}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Booking Info:</h3>
            <p><strong>Booking ID:</strong> ${bookingData.id}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #666; font-style: italic;">Please contact the customer within 24 hours to confirm.</p>
        </div>
      `
    });

    console.log('Business notification sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send business notification:', error);
    return { success: false, error };
  }
};

// Send customer confirmation email for bookings
export const sendBookingConfirmation = async (bookingData) => {
  try {
    const response = await resend.emails.send({
      from: RESEND_CONFIG.FROM_EMAIL,
      to: [bookingData.email],
      subject: '✅ Booking Confirmed - Island Fleet Detail',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DC143C;">Thank You for Choosing Island Fleet Detail!</h2>
          
          <p>Dear ${bookingData.name},</p>
          <p>We've received your booking request and will contact you within 24 hours to confirm your appointment.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Booking Details:</h3>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>Vehicle:</strong> ${bookingData.vehicleType}</p>
            <p><strong>Service:</strong> ${bookingData.service}</p>
            <p><strong>Additional Services:</strong> ${bookingData.additionalServices || 'None'}</p>
            <p><strong>Special Requests:</strong> ${bookingData.specialRequests || 'None'}</p>
            <p><strong>Booking ID:</strong> ${bookingData.id}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What's Next:</h3>
            <p>We will contact you within 24 hours to confirm your appointment and discuss any final details.</p>
          </div>
          
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Us:</h3>
            <p><strong>📞 Phone:</strong> (954) 798-8956</p>
            <p><strong>🌐 Website:</strong> Island Fleet Detail</p>
            <p><strong>📱 Instagram:</strong> @islandfleetdetail</p>
          </div>
          
          <p>Thank you for trusting us with your vehicle care!</p>
          <p style="color: #DC143C; font-weight: bold;">Island Fleet Detail Team</p>
        </div>
      `
    });

    console.log('Customer confirmation sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    return { success: false, error };
  }
};

// Send contact form message to business
export const sendContactMessage = async (contactData) => {
  try {
    const response = await resend.emails.send({
      from: RESEND_CONFIG.FROM_EMAIL,
      to: [RESEND_CONFIG.BUSINESS_EMAIL],
      subject: '📨 New Contact Message - Island Fleet Detail',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DC143C;">New Contact Message Received!</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #666; font-style: italic;">Please respond to the customer promptly.</p>
        </div>
      `
    });

    console.log('Contact message sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send contact message:', error);
    return { success: false, error };
  }
};

// Send auto-reply to contact form submitter
export const sendContactAutoReply = async (contactData) => {
  try {
    const response = await resend.emails.send({
      from: RESEND_CONFIG.FROM_EMAIL,
      to: [contactData.email],
      subject: '📧 Message Received - Island Fleet Detail',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DC143C;">Thank You for Contacting Us!</h2>
          
          <p>Dear ${contactData.name},</p>
          <p>We've received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Need Immediate Assistance?</h3>
            <p><strong>📞 Call or Text:</strong> (954) 798-8956</p>
            <p><strong>📱 Instagram:</strong> @islandfleetdetail</p>
          </div>
          
          <p>Thank you for your interest in Island Fleet Detail!</p>
          <p style="color: #DC143C; font-weight: bold;">Island Fleet Detail Team</p>
        </div>
      `
    });

    console.log('Contact auto-reply sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send contact auto-reply:', error);
    return { success: false, error };
  }
};

// Send both booking emails
export const sendBookingEmails = async (bookingData) => {
  const results = {
    businessNotification: await sendBookingNotification(bookingData),
    customerConfirmation: await sendBookingConfirmation(bookingData)
  };

  return results;
};

// Send both contact emails
export const sendContactEmails = async (contactData) => {
  const results = {
    businessNotification: await sendContactMessage(contactData),
    customerAutoReply: await sendContactAutoReply(contactData)
  };

  return results;
};