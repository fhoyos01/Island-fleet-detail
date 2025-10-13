# EmailJS Setup Guide

Complete guide to setting up EmailJS email services for the Island Fleet Detail booking system.

## 📧 Overview

EmailJS handles all email communications:
- **Customer confirmations**: Booking confirmations with calendar links
- **Business notifications**: New booking alerts with action buttons
- **Professional templates**: Branded emails with Island Fleet Detail styling

## 🚀 Step 1: EmailJS Account Setup

### Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Click **"Sign Up"** 
3. Use business email: `islandfleetllc@gmail.com`
4. Verify your email address
5. Choose free plan (sufficient for most needs)

### Dashboard Overview
After login, you'll see:
- **Services**: Email providers (Gmail, Outlook, etc.)
- **Email Templates**: Pre-designed email layouts
- **Integration**: Code snippets and API keys

## 📮 Step 2: Email Service Configuration

### Add Gmail Service
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** 
4. Click **"Connect Account"**
5. Sign in with your business Gmail account
6. Authorize EmailJS to send emails
7. Note the **Service ID** (e.g., `service_jt3c7bg`)

### Service Configuration
```javascript
// Current service configuration in the code:
SERVICE_ID: 'service_jt3c7bg'           // Your Gmail service
PUBLIC_KEY: '16C07lc2eVNU-n921'         // Your public key
```

## 📋 Step 3: Email Templates

### Template 1: Customer Confirmation
**Template ID**: `template_s4srqyp`

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); padding: 30px; text-align: center;">
        <h1 style="color: #DC143C; margin: 0; font-size: 28px;">🚗 BOOKING CONFIRMED</h1>
        <p style="color: #D4AF37; margin: 10px 0 0 0; font-size: 16px; font-weight: bold;">Island Fleet Detail</p>
      </div>

      <div style="padding: 30px;">
        <h2 style="color: #DC143C; margin-top: 0;">Thank You for Choosing Us!</h2>

        <p>Dear {{customer_name}},</p>
        <p>We've received your booking request and will contact you within 24 hours to confirm your appointment.</p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #DC143C;">
          <h3 style="color: #333; margin-top: 0; font-size: 18px;">Your Booking Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">Date:</td><td style="padding: 8px 0;">{{service_date}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Time:</td><td style="padding: 8px 0;">{{service_time}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Vehicle:</td><td style="padding: 8px 0;">{{vehicle_type}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Service:</td><td style="padding: 8px 0;">{{main_service}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Address:</td><td style="padding: 8px 0;">{{service_location}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Additional:</td><td style="padding: 8px 0; white-space: pre-line;">{{additional_services}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Special Requests:</td><td style="padding: 8px 0;">{{special_requests}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Booking ID:</td><td style="padding: 8px 0;">{{booking_id}}</td></tr>
          </table>
        </div>

        <!-- Add to Calendar Section -->
        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2c5aa0; text-align: center;">
          <h3 style="color: #2c5aa0; margin-top: 0; font-size: 18px;">📅 Add to Your Calendar</h3>
          <p style="color: #555; margin-bottom: 15px;">Don't forget your appointment! Add it to your calendar with one click.</p>
          <a href="{{calendar_link}}" target="_blank" style="display: inline-block; background: #DC143C; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 16px; border: 2px solid #DC143C; transition: all 0.3s ease;">
            📅 Add to Calendar
          </a>
          <p style="color: #666; font-size: 12px; margin-top: 10px; margin-bottom: 0;">Opens Google Calendar with your appointment details pre-filled</p>
        </div>

        <!-- Cancellation Section -->
        <div style="background: #fff8e1; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ff9800; text-align: center;">
          <h3 style="color: #e65100; margin-top: 0; font-size: 18px;">Need to Cancel or Reschedule?</h3>
          <p style="color: #555; margin-bottom: 15px;">Life happens! If you need to make changes to your appointment:</p>
          <a href="{{cancellation_link}}" target="_blank" style="display: inline-block; background: #ff9800; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; margin-right: 10px; border: 2px solid #ff9800;">
            Cancel Booking
          </a>
          <p style="color: #666; font-size: 12px; margin-top: 10px; margin-bottom: 0;">Or call us at (954) 798-8956 for assistance</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #28a745;">
          <h3 style="color: #333; margin-top: 0; font-size: 18px;">What's Next:</h3>
          <p style="margin: 0;">We will contact you within 24 hours to confirm your appointment and discuss any final details.</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #D4AF37;">
          <h3 style="color: #333; margin-top: 0; font-size: 18px;">Contact Us:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">📞 Phone:</td><td style="padding: 8px 0;">(954) 798-8956</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">📧 Email:</td><td style="padding: 8px 0;">islandfleetllc@gmail.com</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">📱 Instagram:</td><td style="padding: 8px 0;">@islandfleetdetail</td></tr>
          </table>
        </div>

        <p>Thank you for trusting us with your vehicle care!</p>
        <p style="color: #DC143C; font-weight: bold; margin-bottom: 0;">Island Fleet Detail Team</p>
      </div>

      <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px; margin: 0;">© 2024 Island Fleet Detail - Professional Auto Detailing Services</p>
      </div>
  </div>
```

### Template 2: Business Notification
**Template ID**: `template_0dz0tfj`

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); padding: 30px; text-align: center;">
        <h1 style="color: #DC143C; margin: 0; font-size: 28px;">🚗 NEW BOOKING RECEIVED</h1>
        <p style="color: #D4AF37; margin: 10px 0 0 0; font-size: 16px; font-weight: bold;">Island Fleet Detail</p>
      </div>

      <div style="padding: 30px;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #DC143C;">
          <h3 style="color: #333; margin-top: 0; font-size: 18px;">Customer Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">Name:</td><td style="padding: 8px 0;">{{customer_name}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;">{{customer_email}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">{{customer_phone}}</td></tr>
          </table>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37;">
          <h3 style="color: #333; margin-top: 0; font-size: 18px;">Service Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">Date:</td><td style="padding: 8px 0;">{{service_date}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Time:</td><td style="padding: 8px 0;">{{service_time}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Vehicle:</td><td style="padding: 8px 0;">{{vehicle_type}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Service:</td><td style="padding: 8px 0;">{{main_service}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Address:</td><td style="padding: 8px 0;">{{service_location}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Additional:</td><td style="padding: 8px 0; white-space: pre-line;">{{additional_services}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Special Requests:</td><td style="padding: 8px 0;">{{special_requests}}</td></tr>
          </table>
        </div>

        <!-- Quick Actions Section -->
        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2c5aa0; text-align: center;">
          <h3 style="color: #2c5aa0; margin-top: 0; font-size: 18px;">📅 Quick Actions</h3>
          <p style="color: #555; margin-bottom: 15px;">Add this appointment to your business calendar and contact the customer</p>
          
          <div style="margin-bottom: 15px;">
            <a href="{{calendar_link}}" target="_blank" style="display: inline-block; background: #DC143C; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; margin: 5px; border: 2px solid #DC143C;">
              📅 Add to Calendar
            </a>
          </div>
          
          <div style="margin-bottom: 10px;">
            <a href="tel:{{customer_phone}}" style="display: inline-block; background: #28a745; color: white; text-decoration: none; padding: 10px 16px; border-radius: 6px; font-weight: bold; margin: 5px; border: 2px solid #28a745;">
              📞 Call Customer
            </a>
            <a href="mailto:{{customer_email}}?subject=Booking Confirmation - {{main_service}} on {{service_date}}&body=Hi {{customer_name}},%0D%0A%0D%0AThank you for booking with Island Fleet Detail!%0D%0A%0D%0AThis is to confirm your appointment:%0D%0ADate: {{service_date}}%0D%0ATime: {{service_time}}%0D%0AService: {{main_service}}%0D%0ABooking ID: {{booking_id}}%0D%0A%0D%0ABest regards,%0D%0AIsland Fleet Detail Team" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 10px 16px; border-radius: 6px; font-weight: bold; margin: 5px; border: 2px solid #007bff;">
              📧 Email Customer
            </a>
          </div>
          
          <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">Calendar opens Google Calendar • Call/Email buttons work on mobile devices</p>
        </div>

        <!-- Business Cancellation Section -->
        <div style="background: #ffe6e6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545; text-align: center;">
          <h3 style="color: #dc3545; margin-top: 0; font-size: 18px;">🚫 Business Cancellation</h3>
          <p style="color: #555; margin-bottom: 15px;">Need to cancel this appointment? This will notify the customer immediately.</p>
          
          <a href="{{business_cancellation_link}}" target="_blank" style="display: inline-block; background: #dc3545; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; margin: 5px; border: 2px solid #dc3545;">
            🚫 Cancel This Booking
          </a>
          
          <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">Customer will be notified via email and SMS automatically</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h3 style="color: #333; margin-top: 0; font-size: 18px;">Booking Information:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">Booking ID:</td><td style="padding: 8px 0;">{{booking_id}}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Submitted:</td><td style="padding: 8px 0;">{{submission_time}}</td></tr>
          </table>
        </div>

        <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
          <p style="color: #DC143C; font-weight: bold; font-size: 16px; margin: 0;">⚠️ ACTION REQUIRED</p>
          <p style="color: #666; margin: 5px 0;">Contact customer within 24 hours to confirm appointment details</p>
        </div>
      </div>
    </div>
```

## 🔧 Step 4: Template Variables

### Customer Template Variables
```javascript
{{customer_name}}          // Customer's full name
{{customer_email}}         // Customer's email address  
{{customer_phone}}         // Customer's phone number
{{service_date}}           // Appointment date
{{service_time}}           // Appointment time
{{vehicle_type}}           // Car, SUV, Truck
{{main_service}}           // Selected service
{{service_location}}       // Service address
{{additional_services}}    // Extra services (bulleted list)
{{special_requests}}       // Customer notes
{{booking_id}}             // Unique booking ID
{{calendar_link}}          // Google Calendar link
{{cancellation_link}}      // Customer cancellation link
```

### Business Template Variables
```javascript
{{customer_name}}              // Customer's full name
{{customer_email}}             // Customer's email address
{{customer_phone}}             // Customer's phone number
{{service_date}}               // Appointment date
{{service_time}}               // Appointment time
{{vehicle_type}}               // Car, SUV, Truck
{{main_service}}               // Selected service
{{service_location}}           // Service address
{{additional_services}}        // Extra services (bulleted list)
{{special_requests}}           // Customer notes
{{booking_id}}                 // Unique booking ID
{{submission_time}}            // When booking was made
{{calendar_link}}              // Business Google Calendar link
{{business_cancellation_link}} // Business cancellation link
```

## 🚀 Step 5: Integration Setup

### Get EmailJS Public Key
1. In EmailJS dashboard, go to **"Integration"**
2. Find your **Public Key** (e.g., `16C07lc2eVNU-n921`)
3. This is already configured in the code

### Template Creation
1. Go to **"Email Templates"** in EmailJS dashboard
2. Click **"Create New Template"**
3. Copy and paste the HTML from above
4. Set **Template ID** to match the code:
   - Customer: `template_s4srqyp`
   - Business: `template_0dz0tfj`
5. Save and test each template

## ✅ Step 6: Testing

### Test Customer Email
1. Make a test booking on your website
2. Check customer email inbox
3. Verify all details populate correctly
4. Test calendar and cancellation links

### Test Business Email  
1. Check business email inbox after test booking
2. Verify all customer details appear
3. Test quick action buttons (call, email, calendar)
4. Test business cancellation button

### EmailJS Dashboard Testing
1. Go to **"Email Templates"** 
2. Click **"Test"** on each template
3. Fill in sample data
4. Send test emails

## 🔍 Step 7: Monitoring

### Email Delivery Logs
- **Location**: EmailJS Dashboard → **"Email Logs"**
- **Information**: Delivery status, timestamps, recipient info
- **Retention**: 30 days for free plan

### Usage Limits
- **Free Plan**: 200 emails/month
- **Paid Plans**: Higher limits available
- **Monitor usage** in dashboard

### Delivery Issues
Check for:
- **Spam folders**: Customer emails may be filtered
- **Invalid addresses**: Bounce tracking
- **Rate limits**: Too many emails too quickly

## 🚨 Troubleshooting

### Emails Not Sending
1. **Check service connection** in EmailJS dashboard
2. **Verify template IDs** match the code
3. **Test templates** individually in dashboard
4. **Check browser console** for JavaScript errors

### Template Not Loading
1. **Verify HTML syntax** is correct
2. **Check variable names** match exactly (case-sensitive)
3. **Test with sample data** in EmailJS dashboard
4. **Validate template ID** in code

### Variables Not Populating
1. **Check variable names** for typos
2. **Verify data format** (especially dates/times)
3. **Test with static values** first
4. **Check browser console** for data issues

### Gmail Authorization Issues
1. **Re-authorize Gmail** service in EmailJS
2. **Check spam/security** settings in Gmail
3. **Enable less secure apps** if needed
4. **Use app-specific password** if 2FA enabled

## 📊 Analytics & Optimization

### Email Performance Metrics
- **Open rates**: Track in EmailJS dashboard
- **Click rates**: Monitor calendar/cancellation links
- **Bounce rates**: Invalid email addresses
- **Delivery success**: Overall system health

### Template Optimization
- **Mobile responsive**: Test on mobile devices
- **Load times**: Optimize images and HTML
- **Accessibility**: Use proper contrast and fonts
- **Professional design**: Maintain brand consistency

## 🔄 Maintenance

### Regular Tasks
- **Monitor email delivery** weekly
- **Check usage limits** monthly
- **Update templates** as needed
- **Test system** after changes

### Template Updates
1. **Edit in EmailJS dashboard**
2. **Test with sample data**
3. **Deploy changes**
4. **Monitor delivery rates**

---

**Next Steps**: Once EmailJS is configured with the templates above, your email system will work automatically with the booking system. Test thoroughly before going live!