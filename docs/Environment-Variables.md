# Environment Variables Guide

This guide explains all required environment variables for the Island Fleet Detail booking system.

## 📋 Required Variables

The system requires 4 environment variables to be set in your Netlify deployment:

### Twilio Configuration

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `TWILIO_ACCOUNT_SID` | Your Twilio Account SID | `AC0583246bdba53dab267e6f0ac0f80c23` |
| `TWILIO_AUTH_TOKEN` | Your Twilio Auth Token | `1ce1f9ea92ce8277decd585c4e0f3be2` |
| `TWILIO_FROM_PHONE` | Toll-free number for sending SMS | `+18447305355` |
| `TWILIO_BUSINESS_PHONE` | Business phone to receive notifications | `+19547988956` |

## 🔧 How to Set Environment Variables

### In Netlify Dashboard

1. **Navigate to Site Settings**
   - Go to your Netlify dashboard
   - Select your Island Fleet Detail site
   - Click **"Site settings"**

2. **Access Environment Variables**
   - In the left sidebar, click **"Environment variables"**
   - OR go to **"Build & deploy"** → **"Environment variables"**

3. **Add Each Variable**
   - Click **"Add variable"** or **"New variable"**
   - Enter the **Key** (variable name)
   - Enter the **Value** (the actual credential)
   - Choose **"Same value for all deploy contexts"**
   - Click **"Create variable"**

4. **Redeploy After Adding Variables**
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Deploy site"**
   - Wait for deployment to complete

### Environment Variables Setup

```bash
# Required Environment Variables
TWILIO_ACCOUNT_SID=AC0583246bdba53dab267e6f0ac0f80c23
TWILIO_AUTH_TOKEN=1ce1f9ea92ce8277decd585c4e0f3be2
TWILIO_FROM_PHONE=+18447305355
TWILIO_BUSINESS_PHONE=+19547988956
```

## 🔍 How to Find Twilio Credentials

### Account SID and Auth Token
1. Go to [Twilio Console](https://console.twilio.com)
2. On the dashboard, you'll see:
   - **Account SID**: Starts with "AC..."
   - **Auth Token**: Click the eye icon to reveal

### Phone Numbers
1. Go to **"Phone Numbers"** → **"Manage"** → **"Active numbers"**
2. Your toll-free number should be: `+1 844 730 5355`
3. Your business number is: `+1 954 798 8956`

## ⚠️ Security Best Practices

### Protect Your Credentials
- ✅ **Never commit** environment variables to GitHub
- ✅ **Never share** your Auth Token publicly
- ✅ **Use environment variables** instead of hardcoding
- ✅ **Regenerate tokens** if compromised

### Variable Naming
- Use **UPPERCASE** for environment variable names
- Use **underscores** to separate words
- Be **descriptive** but concise

## 🧪 Testing Environment Variables

### Verify Variables Are Set
1. Deploy your site to Netlify
2. Make a test booking
3. Check browser console for SMS-related messages
4. Should see: "✅ Business SMS sent successfully"

### Common Issues

| Issue | Solution |
|-------|----------|
| SMS shows "success" but no delivery | Check Trust Hub verification |
| "Twilio not configured" error | Verify all 4 variables are set correctly |
| SMS function fails | Check Auth Token and Account SID |
| Wrong phone numbers | Verify phone number format (+1XXXXXXXXXX) |

## 🔄 Updating Variables

### When to Update
- Twilio credentials change
- Phone numbers change
- Security token rotation

### How to Update
1. Go to Netlify **"Environment variables"**
2. Click on the variable to edit
3. Update the value
4. Save changes
5. **Trigger a new deployment**

## 📱 Phone Number Format

### Correct Format
All phone numbers must be in **E.164 format**:
- ✅ `+18447305355` (correct)
- ✅ `+19547988956` (correct)
- ❌ `844-730-5355` (incorrect)
- ❌ `(954) 798-8956` (incorrect)

### Conversion Examples
- `844-730-5355` → `+18447305355`
- `(954) 798-8956` → `+19547988956`
- `305.123.4567` → `+13051234567`

## 🚨 Troubleshooting

### Variables Not Working
1. **Check spelling** of variable names (case-sensitive)
2. **Verify values** don't have extra spaces or quotes
3. **Redeploy site** after making changes
4. **Check Netlify build logs** for errors

### SMS Still Not Working After Setting Variables
1. Verify **Trust Hub** is approved in Twilio
2. Check **Toll-Free Verification** status
3. Monitor **Twilio logs** for delivery attempts
4. Confirm **phone numbers are active**

### Testing Individual Variables
You can test if variables are accessible by checking the Netlify function logs:
1. Go to **"Functions"** → **"send-sms"**
2. Check **"Function log"** for any configuration errors

## 📖 Related Documentation

- [Twilio Setup Guide](./Twilio-Setup.md) - Get Twilio credentials
- [Setup Guide](./Setup-Guide.md) - Complete system setup
- [EmailJS Setup Guide](./EmailJS-Setup.md) - Email configuration

---

**Important**: After setting environment variables, always trigger a new deployment for changes to take effect!