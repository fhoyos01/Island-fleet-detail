// Clean Resend Email Service Implementation

const RESEND_API_KEY = 're_ccTURS39_G3hwcvQzQQ7mD8Fp5HoMXtFq';
const VERIFIED_EMAIL = 'fhoyos04@gmail.com'; // Your verified email address

// Send booking emails
export const sendBookingEmails = async (bookingData) => {
  try {
    console.log('Sending booking emails via Resend...');
    
    // Send business notification
    const businessResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Island Fleet Detail <onboarding@resend.dev>',
        to: [VERIFIED_EMAIL],
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
              <p><strong>Booking ID:</strong> ${bookingData.id}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `
      })
    });

    const businessResult = await businessResponse.json();
    console.log('Business notification response:', businessResult);

    // Send customer confirmation copy
    const customerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Island Fleet Detail <onboarding@resend.dev>',
        to: [VERIFIED_EMAIL],
        subject: `✅ Customer Confirmation for ${bookingData.name} - Forward to ${bookingData.email}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #dc3545; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin: 0;">📧 FORWARD THIS TO CUSTOMER: ${bookingData.email}</h3>
            </div>
            
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
      })
    });

    const customerResult = await customerResponse.json();
    console.log('Customer confirmation response:', customerResult);

    // Check for success
    const businessSuccess = businessResponse.ok && businessResult.id;
    const customerSuccess = customerResponse.ok && customerResult.id;

    return {
      businessNotification: { 
        success: businessSuccess, 
        response: businessResult 
      },
      customerConfirmation: { 
        success: customerSuccess, 
        response: customerResult 
      }
    };

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
    console.log('Sending contact email via Resend...');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Island Fleet Detail <onboarding@resend.dev>',
        to: [VERIFIED_EMAIL],
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
            
            <p style="color: #666; font-style: italic;">Please respond to the customer promptly at: ${contactData.email}</p>
          </div>
        `
      })
    });

    const result = await response.json();
    console.log('Contact email response:', result);

    const success = response.ok && result.id;

    return {
      businessNotification: { success, response: result },
      customerAutoReply: { success, response: result }
    };

  } catch (error) {
    console.error('Contact email error:', error);
    return {
      businessNotification: { success: false, error },
      customerAutoReply: { success: false, error }
    };
  }
};