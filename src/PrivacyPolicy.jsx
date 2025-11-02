import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="privacy-section">
          <h2>Our Commitment to Your Privacy</h2>
          <p>
            Island Fleet Detail is committed to protecting your privacy. This Privacy Policy explains how we handle 
            information when you use our booking services, contact us, or visit our website.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Information We Collect</h2>
          <p>We only collect information necessary to provide our car detailing services:</p>
          <ul>
            <li><strong>Contact Information:</strong> Name, phone number, email address</li>
            <li><strong>Service Details:</strong> Service location, vehicle type, preferred appointment time</li>
            <li><strong>Communication Preferences:</strong> Your consent to receive SMS notifications about appointments</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>How We Use Your Information</h2>
          <p>We use your information solely for the following purposes:</p>
          <ul>
            <li>Schedule and confirm your car detailing appointments</li>
            <li>Send SMS and email notifications about your bookings</li>
            <li>Contact you regarding your service requests</li>
            <li>Provide customer support</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Data Storage and Retention</h2>
          <div className="highlight-box">
            <h3>🔒 We Do NOT Store Your Data Long-Term</h3>
            <p>
              <strong>Island Fleet Detail does not maintain permanent databases or long-term storage of your personal information.</strong> 
              Your booking information is only kept temporarily to complete your service and is not retained beyond what's 
              necessary for business operations.
            </p>
          </div>
          <ul>
            <li>Booking information is processed in real-time through our notification systems</li>
            <li>We do not maintain customer databases or marketing lists</li>
            <li>Email and SMS services are handled by third-party providers (EmailJS and Twilio) under their privacy policies</li>
            <li>Local browser storage may temporarily hold form data during the booking process</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Information Sharing</h2>
          <div className="highlight-box">
            <h3>🚫 We Do NOT Share, Sell, or Trade Your Information</h3>
            <p>
              <strong>Island Fleet Detail never shares, sells, rents, or trades your personal information with third parties 
              for marketing or commercial purposes.</strong>
            </p>
          </div>
          <p>We only share information as necessary to provide our services:</p>
          <ul>
            <li><strong>EmailJS:</strong> For sending appointment confirmation emails</li>
            <li><strong>Twilio:</strong> For sending SMS notifications (with your consent)</li>
            <li><strong>Calendar Services:</strong> When you choose to add appointments to your calendar</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Your Consent and Rights</h2>
          <h3>SMS Communications</h3>
          <ul>
            <li>You must explicitly consent to receive SMS notifications during booking</li>
            <li>Reply <strong>"STOP"</strong> to any SMS to opt out immediately</li>
            <li>Standard message and data rates may apply</li>
          </ul>

          <h3>Email Communications</h3>
          <ul>
            <li>You can request to stop email communications by contacting us directly</li>
            <li>Appointment-related emails are sent only for confirmed bookings</li>
          </ul>

          <h3>Your Rights</h3>
          <ul>
            <li>Request information about data we may have about you</li>
            <li>Request correction of any incorrect information</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent for SMS communications at any time</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Security</h2>
          <p>
            We implement appropriate security measures to protect your information during transmission and processing. 
            However, since we do not store personal data long-term, security risks are minimized.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Third-Party Services</h2>
          <p>Our website and booking system use the following third-party services:</p>
          <ul>
            <li><strong>EmailJS:</strong> Email delivery service - <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><strong>Twilio:</strong> SMS messaging service - <a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><strong>Netlify:</strong> Website hosting - <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect personal information 
            from children under 13. If you believe we have collected information from a child under 13, 
            please contact us immediately.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with 
            an updated "Last Updated" date. Continued use of our services after changes constitutes acceptance 
            of the updated policy.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our privacy practices, contact us:</p>
          <div className="contact-info">
            <p><strong>Island Fleet Detail</strong></p>
            <p>Phone: <a href="tel:+19547988956">(954) 798-8956</a></p>
            <p>Email: <a href="mailto:islandfleetllc@gmail.com">islandfleetllc@gmail.com</a></p>
            <p>Location: South Florida</p>
          </div>
        </div>

        <div className="privacy-footer">
          <p>
            <strong>This privacy policy reflects our current practices as a small, local auto detailing business 
            that prioritizes customer privacy and data minimization.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;