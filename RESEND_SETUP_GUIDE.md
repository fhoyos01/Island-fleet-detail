# 📧 Resend Email Setup Guide

## 🎯 Overview
This guide will help you set up Resend for your Island Fleet Detail booking and contact forms. Resend provides **3,000 free emails/month** (15x more than EmailJS) with excellent deliverability.

## 📋 What You'll Get
- **Booking Notifications**: Instant email when new booking is made
- **Customer Confirmations**: Professional confirmation emails to customers
- **Contact Messages**: Contact form submissions sent to your email
- **Auto-Replies**: Automatic responses to contact form submitters
- **FREE Service**: 3,000 emails/month at no cost
- **Better Deliverability**: Higher chance emails reach inbox

## 🚀 Setup Steps

### Step 1: Create Resend Account
1. Go to [https://resend.com/](https://resend.com/)
2. Click **"Sign Up"** (FREE account)
3. Verify your email address
4. Complete account setup

### Step 2: Get Your API Key
1. In Resend Dashboard → **"API Keys"**
2. Click **"Create API Key"**
3. Name it: `Island Fleet Detail`
4. Select permissions: **"Sending access"**
5. Click **"Add"**
6. **Copy the API key** (starts with `re_...`)

### Step 3: Update Configuration
1. Open: `src/services/resendService.js`
2. Replace these values:
```javascript
const RESEND_CONFIG = {
  API_KEY: 'your_resend_api_key', // ← Your API key from Step 2
  BUSINESS_EMAIL: 'your-business-email@gmail.com', // ← Your email address
  FROM_EMAIL: 'onboarding@resend.dev' // ← Keep as is (or use your domain)
};
```

### Step 4: Optional - Set Up Custom Domain (Advanced)
If you want emails to come from your own domain:
1. In Resend Dashboard → **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `islandfleetdetail.com`)
4. Follow DNS setup instructions
5. Update `FROM_EMAIL` in config to use your domain

### Step 5: Test the System
1. Deploy your updated website
2. Make a test booking
3. Submit a test contact message
4. Check:
   - Your email for notifications
   - Test customer email for confirmations
   - Resend dashboard for sent emails

## 🔧 Configuration File Location
- **File**: `src/services/resendService.js`
- **What to change**:
  - `API_KEY`: From Resend dashboard
  - `BUSINESS_EMAIL`: Your business email address
  - `FROM_EMAIL`: Keep default or use custom domain

## 📊 Email Limits (FREE Plan)
- **3,000 emails/month** (FREE)
- **Unlimited domains**
- **Analytics included**
- **High deliverability**

## 🆙 Upgrade Options (if needed)
- **Pro Plan**: $20/month (50,000 emails)
- **Business Plan**: $80/month (100,000 emails)
- Much more cost-effective than competitors

## ⚠️ Important Notes
- Emails send asynchronously (won't delay booking/contact forms)
- If email fails, forms still work (fallback to phone contact)
- Much more reliable than EmailJS
- Better spam folder avoidance

## 🎉 Once Setup is Complete
Your customers will receive:
- ✅ Instant booking confirmation emails
- ✅ Professional branded messages with your contact info
- ✅ Auto-replies for contact form submissions
- ✅ Booking reference numbers

You will receive:
- 🔔 Instant booking alerts with all customer details
- 📧 Contact form messages forwarded to your email
- 📊 Email analytics in Resend dashboard

## 🆚 Comparison with EmailJS
| Feature | EmailJS | Resend |
|---------|---------|---------|
| Free emails/month | 200 | 3,000 |
| Deliverability | Good | Excellent |
| Setup complexity | Medium | Easy |
| Analytics | Basic | Advanced |
| Custom domains | No | Yes |
| API reliability | Good | Excellent |

## 🐛 Troubleshooting
- **Emails not sending**: Check API key in config file
- **Wrong sender**: Update `FROM_EMAIL` in config
- **Not receiving emails**: Check spam folder, verify `BUSINESS_EMAIL`
- **Customer not getting confirmations**: Verify their email address is correct

## 📞 Need Help?
- Resend Documentation: [https://resend.com/docs](https://resend.com/docs)
- Check Resend dashboard for delivery status
- Test with your own email first

## 🚀 Ready to Go Live?
Once you've updated the configuration file with your API key and business email, both forms will automatically start sending professional emails through Resend!