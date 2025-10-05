# 📧 Email Notifications Setup Guide

## 🎯 Overview
This guide will help you set up automatic email notifications for your Island Fleet Detail booking system using EmailJS (FREE - 200 emails/month).

## 📋 What You'll Get
- **Business Alerts**: Instant email when new booking is made
- **Customer Confirmations**: Professional confirmation emails to customers
- **FREE Service**: 200 emails/month at no cost
- **No Backend Required**: Works directly from the website

## 🚀 Setup Steps

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (FREE account)
3. Verify your email address

### Step 2: Connect Your Email Service
1. In EmailJS Dashboard → **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP**
4. Follow connection instructions
5. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Templates

#### Business Notification Template:
1. Go to **"Email Templates"** → **"Create New Template"**
2. **Template ID**: `template_business`
3. **Subject**: `🚗 New Booking - Island Fleet Detail`
4. **Content**:
```
New booking received for Island Fleet Detail!

CUSTOMER DETAILS:
• Name: {{customer_name}}
• Email: {{customer_email}}
• Phone: {{customer_phone}}

SERVICE DETAILS:
• Date: {{service_date}}
• Time: {{service_time}}
• Vehicle: {{vehicle_type}}
• Service: {{main_service}}
• Additional Services: {{additional_services}}
• Special Requests: {{special_requests}}

BOOKING INFO:
• Booking ID: {{booking_id}}
• Submitted: {{submission_time}}

Please contact the customer within 24 hours to confirm.
```

#### Customer Confirmation Template:
1. Create another template with **Template ID**: `template_customer`
2. **Subject**: `✅ Booking Confirmed - Island Fleet Detail`
3. **Content**:
```
Dear {{customer_name}},

Thank you for choosing Island Fleet Detail! We've received your booking request.

YOUR BOOKING DETAILS:
• Date: {{service_date}}
• Time: {{service_time}}
• Vehicle: {{vehicle_type}}
• Service: {{main_service}}
• Additional Services: {{additional_services}}
• Special Requests: {{special_requests}}
• Booking ID: {{booking_id}}

WHAT'S NEXT:
We will contact you within 24 hours to confirm your appointment and discuss any final details.

CONTACT US:
📞 {{business_phone}}
🌐 Island Fleet Detail

Thank you for trusting us with your vehicle care!

Best regards,
{{business_name}} Team
```

### Step 4: Get Your Public Key
1. Go to **"Account"** → **"General"**
2. Copy your **Public Key**

### Step 5: Update Configuration
1. Open: `src/services/emailService.js`
2. Replace these values:
```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id', // ← Your Service ID from Step 2
  TEMPLATE_ID_BUSINESS: 'template_business', // ← Keep as is
  TEMPLATE_ID_CUSTOMER: 'template_customer', // ← Keep as is
  PUBLIC_KEY: 'your_public_key' // ← Your Public Key from Step 4
};
```
3. Update your business email:
```javascript
to_email: 'your-business-email@gmail.com', // ← Your email address
```

### Step 6: Test the System
1. Deploy your updated website
2. Make a test booking
3. Check:
   - Your email for business notification
   - Customer email for confirmation
   - EmailJS dashboard for sent emails

## 🔧 Configuration File Location
- **File**: `src/services/emailService.js`
- **What to change**:
  - `SERVICE_ID`: From EmailJS dashboard
  - `PUBLIC_KEY`: From EmailJS account settings
  - `to_email`: Your business email address

## 📊 Email Limits (FREE Plan)
- **200 emails/month** (FREE)
- **2 email services**
- **3 email templates**
- **Basic analytics**

## 🆙 Upgrade Options (if needed)
- **Personal Plan**: $20/month (50,000 emails)
- **Team Plan**: $39/month (100,000 emails)

## ⚠️ Important Notes
- Emails send asynchronously (won't delay booking)
- If email fails, booking still works
- Check spam folder for test emails
- EmailJS works from any domain (including localhost)

## 🎉 Once Setup is Complete
Your customers will receive:
- ✅ Instant confirmation emails
- 📧 Professional branded messages
- 📞 Contact information
- 🆔 Booking reference numbers

You will receive:
- 🔔 Instant booking alerts
- 📋 Complete customer details
- 📅 Service requirements
- 💬 Special requests

## 🐛 Troubleshooting
- **Emails not sending**: Check Service ID and Public Key
- **Templates not found**: Verify Template IDs match exactly
- **Gmail issues**: Enable "Less secure app access" or use App Password
- **Spam folder**: Add EmailJS to whitelist

## 📞 Need Help?
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Test your setup with their online tool
- Check browser console for error messages