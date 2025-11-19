# Island Fleet Detail - Website Handoff Documentation

## 🚗 Site Overview
- **Live Site**: https://islandfleetdetail.com
- **Domain**: Purchased through GoDaddy, configured with Netlify
- **Hosting**: Netlify (auto-deploys from GitHub)
- **Repository**: https://github.com/fhoyos01/Island-fleet-detail

## 📋 Site Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Online Booking System**: Calendar-based appointment scheduling
- **Email Notifications**: Automatic booking confirmations via EmailJS
- **SMS Notifications**: Optional text message alerts via Twilio
- **Service Calculator**: Dynamic pricing based on vehicle type and services
- **Contact Forms**: General inquiry and booking forms
- **Privacy Policy**: Comprehensive GDPR-compliant privacy policy

## 🔧 Technology Stack
- **Frontend**: React 18 with Vite
- **Styling**: Custom CSS with responsive design
- **Email Service**: EmailJS (client-side email sending)
- **SMS Service**: Twilio (via Netlify Functions)
- **Hosting**: Netlify with automatic deployment
- **Domain**: GoDaddy DNS management

## 📞 Contact Information
- **Phone**: (561) 508-0863
- **Email**: islandfleetllc@gmail.com
- **Service Area**: South Florida

## 🔑 Required Accounts & Services

### Netlify (Hosting & Deployment)
- **URL**: https://app.netlify.com
- **Site URL**: https://island-fleet-detail.netlify.app (redirects to custom domain)
- **Custom Domain**: islandfleetdetail.com
- **Auto-deploy**: Connected to GitHub repository

### GoDaddy (Domain Management)
- **Domain**: islandfleetdetail.com
- **DNS Settings**: Configured to point to Netlify

### EmailJS (Email Service)
- **Service**: Contact form and booking confirmation emails
- **Template IDs**: 
  - Booking: `template_booking123`
  - Contact: `template_contact456`

### Twilio (SMS Service)
- **Service**: Optional booking SMS notifications
- **Phone Number**: Configured for Island Fleet Detail

### GitHub (Code Repository)
- **Repository**: https://github.com/fhoyos01/Island-fleet-detail
- **Auto-deployment**: Pushes to main branch automatically deploy to Netlify

## 🛠️ Environment Variables (Netlify)
```
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_PHONE=your_twilio_phone_number
TWILIO_BUSINESS_PHONE=+15615080863
```

## 📝 How to Make Changes

### Content Updates (No Coding Required)
- Most content can be updated by editing the text in `src/App.jsx`
- Prices and services can be modified in the service calculator section
- Contact information should be updated in multiple files if changed

### Code Changes
1. Clone the repository: `git clone https://github.com/fhoyos01/Island-fleet-detail.git`
2. Install dependencies: `npm install`
3. Make changes to the code
4. Test locally: `npm run dev`
5. Commit and push changes: `git add . && git commit -m "description" && git push`
6. Changes automatically deploy to live site within 2-3 minutes

### Adding New Services
1. Update the services array in `src/App.jsx`
2. Update pricing logic in the calculator
3. Update any relevant copy throughout the site

## 📱 SMS Compliance
- SMS notifications are OPTIONAL for customers
- Includes proper TCPA compliance language
- Customers can opt-out by replying "STOP"
- Only sends booking-related notifications

## 🔒 Privacy & Legal
- Privacy policy located at `/privacy-policy.html`
- GDPR compliant - minimal data collection
- No long-term data storage
- Third-party services: EmailJS, Twilio, Netlify

## 🚀 Deployment Process
1. Code changes pushed to GitHub main branch
2. Netlify automatically detects changes
3. Builds and deploys new version
4. Live site updates within 2-3 minutes
5. No manual deployment needed

## 📊 Analytics & Monitoring
- Currently no analytics installed (by design for privacy)
- Netlify provides basic traffic stats
- Error monitoring available through Netlify dashboard

## 🛡️ Security
- HTTPS enabled (SSL certificate auto-managed by Netlify)
- Environment variables secured in Netlify dashboard
- No sensitive data stored in frontend code
- Privacy-focused design with minimal data collection

## 📞 Support Contacts
- **Technical Issues**: Contact through GitHub repository issues
- **Domain Issues**: GoDaddy customer support
- **Hosting Issues**: Netlify customer support
- **Email Issues**: EmailJS support
- **SMS Issues**: Twilio support

## 🔄 Regular Maintenance
- **Domain Renewal**: Annual through GoDaddy
- **SSL Certificate**: Auto-renewed by Netlify
- **Dependencies**: Update periodically for security
- **Content**: Review and update services/pricing as needed

---

**Site successfully migrated from island-fleet-detail.netlify.app to islandfleetdetail.com**
**All functionality tested and working as of handoff date**