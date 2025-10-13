# Setup Guide - Island Fleet Detail Booking System

This guide will walk you through setting up the complete booking system from scratch.

## 📋 Prerequisites

- GitHub account
- Netlify account  
- Twilio account (upgraded, not trial)
- EmailJS account
- Domain name (optional)

## 🚀 Step 1: Repository Setup

### Clone or Fork Repository
```bash
# Clone the repository
git clone https://github.com/[your-username]/Island-Fleet-Detail.git
cd Island-Fleet-Detail

# Install dependencies
npm install
```

### Test Local Development
```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## 🌐 Step 2: Netlify Deployment

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"New site from Git"**
3. Connect your GitHub account
4. Select the **Island-Fleet-Detail** repository
5. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

### Configure Domain (Optional)
1. In Netlify dashboard, go to **"Site settings"** → **"Domain management"**
2. Add your custom domain
3. Follow DNS configuration instructions

## 🔧 Step 3: Environment Variables

### Set Netlify Environment Variables
1. In Netlify dashboard, go to **"Site settings"** → **"Environment variables"**
2. Add the following variables (see [Environment Variables Guide](./Environment-Variables.md)):

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token  
TWILIO_FROM_PHONE=+18447305355
TWILIO_BUSINESS_PHONE=+19547988956
```

### Redeploy After Adding Variables
1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for deployment to complete

## 📱 Step 4: Twilio Configuration

### Trust Hub Setup (Required for SMS)
1. Go to [Twilio Console](https://console.twilio.com)
2. Navigate to **"Trust Hub"**
3. Create **"Primary Customer Profile"**
4. Choose **"Direct Customer"**
5. Fill out business information:
   - Business Name: Island Fleet Detail
   - Business Address: [Your business address]
   - Tax ID/EIN: [If available]
   - Use Case: Customer booking confirmations and notifications

### Toll-Free Verification
1. Go to **"Phone Numbers"** → **"Regulatory compliance"**
2. Submit **"Toll-Free Verification (TFV)"**
3. Verify number: `+1 844 730 5355`
4. Wait for approval (5-7 business days)

## 📧 Step 5: EmailJS Configuration

### Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up and verify email
3. Create a new service (Gmail recommended)

### Set Up Email Templates
1. Create **Customer Template** (template_s4srqyp)
2. Create **Business Template** (template_0dz0tfj)
3. Use templates provided in [EmailJS Setup Guide](./EmailJS-Setup.md)

### Get EmailJS Credentials
1. Note your **Service ID**, **Template IDs**, and **Public Key**
2. These are already configured in the code

## ✅ Step 6: Testing

### Test Complete System
1. Make a test booking on your live site
2. Verify you receive:
   - ✅ Business SMS notification
   - ✅ Customer SMS notification  
   - ✅ Business email with action buttons
   - ✅ Customer email with calendar link

### Test Cancellation System
1. Click **"Cancel This Booking"** in business email
2. Verify customer receives cancellation SMS
3. Check that time slot becomes available again

## 🔍 Step 7: Monitoring

### Monitor SMS Delivery
- Check Twilio Console → **"Logs"** → **"Programmable Messaging"**

### Monitor Email Delivery  
- Check EmailJS Dashboard → **"Email Logs"**

### Monitor Website
- Check Netlify Dashboard → **"Functions"** for any errors

## 🛠️ Step 8: Customization

### Update Business Information
Edit the following files with your details:
- `src/App.jsx` - Contact information, social media links
- `src/services/emailService.js` - EmailJS configuration
- Email templates in EmailJS dashboard

### Modify Time Slots
In `src/App.jsx`, find the `allSlots` array to modify available times:
```javascript
const allSlots = [
  { time: '9:00am', available: true },
  { time: '10:00am', available: true },
  // Add or remove time slots here
]
```

### Update Pricing/Services
Modify the pricing section in `src/App.jsx` to update services and prices.

## 🚨 Troubleshooting

### SMS Not Working
1. Check Trust Hub approval status
2. Verify Toll-Free number verification  
3. Check environment variables in Netlify
4. Monitor Twilio logs for errors

### Emails Not Working
1. Verify EmailJS service is connected
2. Check template IDs match the code
3. Test email templates in EmailJS dashboard

### Website Not Loading
1. Check Netlify build logs
2. Verify all dependencies installed
3. Check for JavaScript errors in browser console

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Twilio and EmailJS documentation
3. Contact your developer for custom modifications

---

**Next Steps**: 
- [Environment Variables Guide](./Environment-Variables.md)
- [Twilio Setup Guide](./Twilio-Setup.md)  
- [EmailJS Setup Guide](./EmailJS-Setup.md)