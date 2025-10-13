# Twilio Setup Guide

Complete guide to setting up Twilio SMS services for the Island Fleet Detail booking system.

## 📱 Overview

Twilio handles all SMS notifications in the system:
- **Business notifications**: New booking alerts
- **Customer confirmations**: Booking confirmations  
- **Cancellation notices**: When appointments are cancelled

## 🚀 Step 1: Twilio Account Setup

### Create/Upgrade Account
1. Go to [twilio.com](https://www.twilio.com)
2. Sign up or log in to existing account
3. **Upgrade to paid account** (required for toll-free SMS)
4. Add billing information and funding

### Get Account Credentials
1. Go to [Twilio Console](https://console.twilio.com)
2. On the main dashboard, find:
   - **Account SID**: Starts with "AC..." (e.g., `AC0583246bdba53dab267e6f0ac0f80c23`)
   - **Auth Token**: Click the eye icon to reveal (e.g., `1ce1f9ea92ce8277decd585c4e0f3be2`)

## 📞 Step 2: Phone Number Setup

### Current Phone Numbers
- **Toll-Free Number**: `+1 844 730 5355` (for sending SMS)
- **Business Number**: `+1 954 798 8956` (receives business notifications)

### Verify Active Numbers
1. Go to **"Phone Numbers"** → **"Manage"** → **"Active numbers"**
2. Confirm `+1 844 730 5355` is listed and active
3. If missing, contact Twilio support to restore it

### Buy Additional Numbers (Optional)
1. Go to **"Phone Numbers"** → **"Buy a number"**
2. Search for local Florida numbers if needed
3. Purchase and assign to your account

## 🏢 Step 3: Trust Hub Verification (REQUIRED)

**⚠️ Critical**: Toll-free SMS requires Trust Hub verification as of 2024.

### Create Primary Customer Profile
1. Go to **"Trust Hub"** in Twilio Console
2. Click **"Create new Primary Customer Profile"**
3. Choose **"Direct Customer"** (you use Twilio directly, not reselling)

### Business Information Required
```
Business Legal Name: Island Fleet Detail LLC (or your business name)
Business Type: Private Company
Industry: Professional Services / Automotive Services
Business Address: [Your complete business address]
Business Phone: +1 954 798 8956
Business Email: islandfleetllc@gmail.com
Tax ID/EIN: [If available]
Website: [Your website URL]
```

### Use Case Description
```
"Customer appointment booking confirmations and notifications for car detailing services. 
We send SMS confirmations when customers book appointments, reminders before 
appointments, and cancellation notifications when needed. All messages are 
transactional and opt-in based on customer bookings."
```

### Approval Timeline
- **Trust Hub Review**: 1-3 business days
- **You'll receive email** when approved/rejected
- **Check status** in Trust Hub dashboard

## 📋 Step 4: Toll-Free Verification (TFV)

### Submit TFV Request
1. Go to **"Phone Numbers"** → **"Regulatory compliance"**
2. Find **"Toll-Free Verification (TFV)"**
3. Click **"Submit new TFV request"**

### TFV Information Required
```
Phone Number: +1 844 730 5355
Business Name: Island Fleet Detail
Business Website: [Your website]
Business Use Case: Appointment booking notifications
Monthly Volume: 100-500 messages (estimate based on bookings)
Message Content Examples:
- "Island Fleet Detail - Booking confirmed! We'll contact you within 24 hours. Questions? Call (954) 798-8956"
- "APPOINTMENT CANCELLED: Your [service] appointment on [date] has been cancelled. Please call (954) 798-8956 to reschedule."
```

### TFV Approval Timeline
- **Review Period**: 5-7 business days
- **Status Updates**: Check in Twilio Console
- **Email Notifications**: Sent when approved

## 🔧 Step 5: Environment Variables

### Add to Netlify
Set these 4 variables in your Netlify dashboard:

```bash
TWILIO_ACCOUNT_SID=AC0583246bdba53dab267e6f0ac0f80c23
TWILIO_AUTH_TOKEN=1ce1f9ea92ce8277decd585c4e0f3be2
TWILIO_FROM_PHONE=+18447305355
TWILIO_BUSINESS_PHONE=+19547988956
```

### Security Notes
- ✅ **Never commit** these to GitHub
- ✅ **Use environment variables** only
- ✅ **Regenerate Auth Token** if compromised
- ✅ **Keep credentials private**

## ✅ Step 6: Testing SMS

### Test Message Delivery
1. Ensure Trust Hub and TFV are **both approved**
2. Make a test booking on your website
3. Check for SMS delivery to both numbers

### Monitor in Twilio Console
1. Go to **"Monitor"** → **"Logs"** → **"Programmable Messaging"**
2. Look for recent SMS attempts
3. Check delivery status and any error messages

### Expected Results
- ✅ **Business SMS**: New booking notification to `+1 954 798 8956`
- ✅ **Customer SMS**: Booking confirmation to customer's number
- ✅ **Delivery Status**: "delivered" in Twilio logs

## 🔍 Step 7: Monitoring & Analytics

### Message Logs
- **Location**: Monitor → Logs → Programmable Messaging
- **Information**: Delivery status, timestamps, error codes
- **Retention**: 30 days of log history

### Usage Analytics
- **Location**: Monitor → Usage
- **Metrics**: Message volume, costs, delivery rates
- **Billing**: Real-time usage and costs

### Error Tracking
Common error codes:
- **30008**: Unknown error
- **30003**: Unreachable destination
- **30005**: Unknown destination handset
- **21408**: Permission to send restricted

## 🚨 Troubleshooting

### SMS Shows "Success" But Not Delivered
1. **Check Trust Hub status** - must be approved
2. **Verify TFV approval** - required for toll-free
3. **Monitor Twilio logs** - look for filtering/blocking
4. **Check phone number format** - must be E.164 (+1XXXXXXXXXX)

### "Twilio not configured" Error
1. **Verify environment variables** are set in Netlify
2. **Check variable spelling** (case-sensitive)
3. **Trigger new deployment** after adding variables
4. **Test function endpoint** directly

### Trust Hub Rejection
1. **Review rejection reason** in Trust Hub dashboard
2. **Update business information** as needed
3. **Resubmit with corrections**
4. **Contact Twilio support** if unclear

### TFV Delays
1. **Check submission status** in regulatory compliance
2. **Response time** can be 5-7 business days
3. **Follow up** with Twilio support if overdue
4. **Ensure complete information** was provided

## 💰 Pricing Information

### SMS Costs (US Numbers)
- **Toll-Free SMS**: $0.0075 per message
- **Local SMS**: $0.0075 per message
- **International**: Varies by country

### Monthly Estimates
Based on booking volume:
- **100 bookings/month**: ~$1.50/month (200 SMS)
- **500 bookings/month**: ~$7.50/month (1000 SMS)
- **Plus base monthly fees** for phone numbers

## 📞 Support Resources

### Twilio Support
- **Console Help**: Question mark icon in Twilio Console
- **Documentation**: [twilio.com/docs](https://www.twilio.com/docs)
- **Support Tickets**: Available for paid accounts
- **Community Forum**: [twilio.com/community](https://www.twilio.com/community)

### Common Support Topics
- Trust Hub approval issues
- TFV submission problems
- SMS delivery troubleshooting
- Account upgrade questions

## 🔄 Maintenance

### Regular Tasks
- **Monitor delivery rates** monthly
- **Check account balance** regularly
- **Review usage analytics** for optimization
- **Update business info** if changed

### Security Maintenance
- **Rotate Auth Token** annually
- **Review access logs** quarterly
- **Update contact information** as needed
- **Monitor for unusual usage** patterns

---

**Next Steps**: Once Twilio is configured and verified, your SMS system will work automatically with the booking system. No code changes needed - just wait for approval!