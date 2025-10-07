const { Resend } = require('resend');

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Initialize Resend with your API key
    const resend = new Resend('re_ccTURS39_G3hwcvQzQQ7mD8Fp5HoMXtFq');
    
    const data = JSON.parse(event.body);
    console.log('Received request:', data.type);

    if (data.type === 'booking') {
      const { bookingData } = data;

      // Send business notification
      const businessEmail = await resend.emails.send({
        from: 'Island Fleet Detail <onboarding@resend.dev>',
        to: ['fhoyos04@gmail.com'],
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
      });

      // Send customer confirmation copy
      const customerEmail = await resend.emails.send({
        from: 'Island Fleet Detail <onboarding@resend.dev>',
        to: ['fhoyos04@gmail.com'],
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
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          businessEmail: businessEmail,
          customerEmail: customerEmail
        })
      };

    } else if (data.type === 'contact') {
      const { contactData } = data;

      const contactEmail = await resend.emails.send({
        from: 'Island Fleet Detail <onboarding@resend.dev>',
        to: ['fhoyos04@gmail.com'],
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
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          contactEmail: contactEmail
        })
      };
    }

  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};