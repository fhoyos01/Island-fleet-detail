const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const bookingData = JSON.parse(event.body);

    // Log for debugging
    console.log('Attempting to send emails for booking:', bookingData.id);
    console.log('API Key available:', !!process.env.RESEND_API_KEY);

    // Send business notification
    const businessEmail = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['Islandfleetllc@gmail.com'],
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

    console.log('Business email sent successfully:', businessEmail.data);

    // Send customer confirmation (temporarily to business email due to Resend limitations)
    const customerEmail = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['Islandfleetllc@gmail.com'],
      subject: `✅ Customer Confirmation for ${bookingData.name} - Island Fleet Detail`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DC143C;">Thank You for Choosing Island Fleet Detail!</h2>
          
          <p><strong>CUSTOMER EMAIL COPY</strong> - Forward this to: ${bookingData.email}</p>
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

    console.log('Customer email sent successfully:', customerEmail.data);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        businessEmail: businessEmail,
        customerEmail: customerEmail,
        debug: {
          businessEmailId: businessEmail.data?.id,
          customerEmailId: customerEmail.data?.id,
          timestamp: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    console.error('Email sending error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        errorType: error.name,
        debug: {
          hasApiKey: !!process.env.RESEND_API_KEY,
          apiKeyLength: process.env.RESEND_API_KEY?.length,
          timestamp: new Date().toISOString()
        }
      })
    };
  }
};