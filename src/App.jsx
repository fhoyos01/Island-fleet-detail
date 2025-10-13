import { useState, useEffect } from 'react'
import './App.css'
import { sendBookingEmails, sendContactEmails } from './services/emailService'
import { sendBookingSMS, sendContactSMS } from './services/smsService'

// Send notification to customer when business cancels
const sendCustomerCancellationNotification = async (booking) => {
  try {
    // Create notification data for SMS
    const cancellationData = {
      name: booking.customer,
      phone: booking.phone || 'Not available',
      service: 'Appointment Cancellation',
      date: booking.date,
      time: booking.time,
      vehicleType: booking.vehicleType || 'N/A',
      serviceLocation: booking.serviceLocation || 'N/A',
      additionalServices: 'N/A',
      specialRequests: `APPOINTMENT CANCELLED: Your ${booking.service} appointment on ${booking.date} at ${booking.time} has been cancelled by Island Fleet Detail. We apologize for any inconvenience. Please call (954) 798-8956 to reschedule.`,
      id: `biz_cancel_${booking.id}`
    }
    
    // Send SMS notification
    console.log('📱 Sending business cancellation SMS...')
    await sendBookingSMS(cancellationData)
    
    // TODO: Send email notification when business emails are re-enabled
    // For now, SMS handles the notification
    
    console.log('✅ Customer notification sent for business cancellation')
    
  } catch (error) {
    console.error('Customer cancellation notification error:', error)
    throw error
  }
}

// Create Google Calendar link for customers
const createCustomerCalendarLink = (bookingData) => {
  // Parse date more reliably
  let startDate;
  try {
    // Try multiple parsing approaches
    console.log('Calendar debug - date:', bookingData.date, 'time:', bookingData.time);
    
    // First try direct parsing
    startDate = new Date(bookingData.date + ' ' + bookingData.time);
    
    // If invalid, try parsing date differently
    if (isNaN(startDate.getTime())) {
      const dateParts = bookingData.date.split('/');
      if (dateParts.length === 3) {
        // Convert MM/DD/YYYY to YYYY-MM-DD format and normalize time
        const isoDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
        const normalizedTime = bookingData.time.replace(/(\d+):(\d+)([ap]m)/i, (match, hour, min, ampm) => {
          let h = parseInt(hour);
          if (ampm.toLowerCase() === 'pm' && h !== 12) h += 12;
          if (ampm.toLowerCase() === 'am' && h === 12) h = 0;
          return `${h.toString().padStart(2, '0')}:${min}:00`;
        });
        startDate = new Date(isoDate + 'T' + normalizedTime);
      }
    }
    
    // Final fallback
    if (isNaN(startDate.getTime())) {
      console.warn('Could not parse date, using current time');
      startDate = new Date();
    }
  } catch (error) {
    console.error('Date parsing error:', error);
    startDate = new Date(); // Fallback to current date
  }
  
  const endDate = new Date(startDate.getTime() + (75 * 60 * 1000)); // 1 hour 15 minutes later
  
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const title = encodeURIComponent(`Car Detailing Appointment - Island Fleet Detail`);
  const details = encodeURIComponent(`Your car detailing appointment with Island Fleet Detail
  
Service: ${bookingData.service}
Vehicle: ${bookingData.vehicleType}
Address: ${bookingData.serviceLocation || 'Will be confirmed'}

Contact: (954) 798-8956
Booking ID: #${bookingData.id}`);
  
  const location = encodeURIComponent(bookingData.serviceLocation || 'TBD');
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}&location=${location}`;
};

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCancellationModal, setShowCancellationModal] = useState(false)
  const [cancellationBookingId, setCancellationBookingId] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  // Clear bookings function (temporary admin function)
  const clearAllBookings = () => {
    localStorage.removeItem('bookings')
    window.location.reload()
  }

  // Handle cancellation URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const cancelId = urlParams.get('cancel')
    const businessCancelId = urlParams.get('business_cancel')
    
    if (cancelId) {
      setCancellationBookingId(cancelId)
      setShowCancellationModal(true)
      // Clean up URL without triggering navigation
      window.history.replaceState({}, '', window.location.pathname)
    } else if (businessCancelId) {
      // Handle business-initiated cancellation
      handleBusinessCancellation(businessCancelId)
      // Clean up URL without triggering navigation
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  // Handle business-initiated cancellation
  const handleBusinessCancellation = async (bookingId) => {
    try {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      const bookingIndex = bookings.findIndex(b => b.id.toString() === bookingId)
      
      if (bookingIndex === -1) {
        alert('⚠️ Booking not found.\n\nThis booking may have already been cancelled or does not exist.')
        return
      }

      const booking = bookings[bookingIndex]
      
      if (booking.status === 'cancelled') {
        alert('ℹ️ This booking has already been cancelled.')
        return
      }

      // Confirm business wants to cancel
      const confirmCancel = confirm(`🚫 Cancel Booking #${bookingId}?\n\nCustomer: ${booking.customer}\nDate: ${booking.date}\nTime: ${booking.time}\nService: ${booking.service}\n\nThis will immediately notify the customer via email and SMS.`)
      
      if (!confirmCancel) return

      // Update booking status to cancelled
      bookings[bookingIndex] = {
        ...booking,
        status: 'cancelled',
        cancellationReason: 'Cancelled by business',
        cancelledAt: new Date().toISOString(),
        cancelledBy: 'business'
      }
      
      localStorage.setItem('bookings', JSON.stringify(bookings))

      // Send customer notification
      await sendCustomerCancellationNotification(booking)
      
      // Show success message
      alert('✅ Booking cancelled successfully!\n\nThe customer has been notified via email and SMS.\n\nThe time slot is now available for new bookings.')
      
      // Refresh time slots
      setRefreshKey(prev => prev + 1)
      
    } catch (error) {
      console.error('Business cancellation error:', error)
      alert('⚠️ Error cancelling booking.\n\nPlease try again or contact the customer directly at their phone number.')
    }
  }

  // Handle customer-initiated cancellation
  const handleCancellation = async (bookingId, reason = '') => {
    try {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      const bookingIndex = bookings.findIndex(b => b.id.toString() === bookingId)
      
      if (bookingIndex === -1) {
        throw new Error('Booking not found')
      }

      const booking = bookings[bookingIndex]
      
      // Update booking status to cancelled
      bookings[bookingIndex] = {
        ...booking,
        status: 'cancelled',
        cancellationReason: reason,
        cancelledAt: new Date().toISOString()
      }
      
      localStorage.setItem('bookings', JSON.stringify(bookings))
      
      // Send cancellation notification to business (SMS only for now)
      const cancellationData = {
        name: booking.customer,
        phone: booking.phone || 'Not available',
        service: 'Booking Cancellation',
        date: booking.date,
        time: booking.time,
        vehicleType: booking.vehicleType || 'N/A',
        serviceLocation: booking.serviceLocation || 'N/A',
        additionalServices: 'N/A',
        specialRequests: `CANCELLATION: Booking #${bookingId} cancelled. Original service: ${booking.service || 'N/A'}. Reason: ${reason || 'No reason provided'}`,
        id: `cancel_${bookingId}`
      }
      
      // Send SMS notification to business
      await sendBookingSMS(cancellationData)
      
      return { success: true }
    } catch (error) {
      console.error('Cancellation error:', error)
      return { success: false, error: error.message }
    }
  }

  // Resend is ready to use without initialization

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMobileMenuOpen(false) // Close mobile menu when navigating
  }

  const selectPackageAndScroll = (serviceValue, serviceName) => {
    setPreselectedService({ value: serviceValue, name: serviceName })
    scrollToSection('booking')
  }

  return (
    <div className="app">
      <nav className="top-navigation">
        <div className="nav-container">
          <div className="logo-nav" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.jpg" alt="Island Fleet Detail Logo" className="nav-logo" />
            <h2>Island Fleet Detail</h2>
          </div>
          
          <div className="nav-links desktop-nav">
            <button 
              className="nav-link"
              onClick={() => scrollToSection('pricing')}
            >
              Pricing & Services
            </button>
            <button 
              className="nav-link"
              onClick={() => scrollToSection('booking')}
            >
              Book Appointment
            </button>
            <button 
              className="nav-link"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <button 
            className="mobile-nav-link"
            onClick={() => scrollToSection('pricing')}
          >
            Pricing & Services
          </button>
          <button 
            className="mobile-nav-link"
            onClick={() => scrollToSection('booking')}
          >
            Book Appointment
          </button>
          <button 
            className="mobile-nav-link"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </div>
      </nav>
      
      <header className="hero">
        <div className="hero-content">
          <div className="logo">
            <img src="/logo.jpg" alt="Island Fleet Detail Logo" className="hero-logo" />
            <h1>Island Fleet Detail</h1>
          </div>
          <div className="hero-text">
            <h2>Professional Auto Detailing Services</h2>
            <p>Transform your vehicle with our premium detailing services. Book your appointment today!</p>
            <button 
              className="cta-button"
              onClick={() => scrollToSection('booking')}
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="pricing" className="pricing-section">
          <div className="pricing-header">
            <h2>Our Premium Detailing Services</h2>
            <p className="pricing-subtitle">Professional auto detailing packages designed to keep your vehicle looking its best</p>
          </div>

          <div className="pricing-packages">
            <div className="package-item">
              <h3>Exterior Only</h3>
              <div className="package-content">
                <div className="pricing-info">
                  <div className="price-row">Car: <span className="price">$20-$30</span></div>
                  <div className="price-row">SUV: <span className="price">$25-$35</span></div>
                  <div className="price-row">Truck: <span className="price">$25-$35</span></div>
                </div>
                <ul className="features-list">
                  <li>✓ Premium Exterior Wash</li>
                  <li>✓ Rims & Tires Polished</li>
                </ul>
                <p className="travel-note">*$15 travel fee for locations over 15 miles</p>
              </div>
              <button className="package-btn" onClick={() => selectPackageAndScroll('exterior-only', 'Exterior Only')}>
                Select Package
              </button>
            </div>

            <div className="package-item">
              <h3>Basic Wash</h3>
              <div className="package-content">
                <div className="pricing-info">
                  <div className="price-row">Car: <span className="price">$40-$45</span></div>
                  <div className="price-row">SUV: <span className="price">$45-$55</span></div>
                  <div className="price-row">Truck: <span className="price">$45-$55</span></div>
                </div>
                <ul className="features-list">
                  <li>✓ Premium Exterior wash</li>
                  <li>✓ Basic Vacuum</li>
                  <li>✓ Rims & Tires Polished</li>
                  <li>✓ Trunk not included</li>
                </ul>
                <p className="travel-note">*$15 travel fee for locations over 15 miles</p>
              </div>
              <button className="package-btn" onClick={() => selectPackageAndScroll('basic-package', 'Basic Package')}>
                Select Package
              </button>
            </div>

            <div className="package-item featured">
              <div className="featured-badge">Most Popular</div>
              <h3>Premium</h3>
              <div className="package-content">
                <div className="pricing-info">
                  <div className="price-row">Car: <span className="price">$50-$60</span></div>
                  <div className="price-row">SUV: <span className="price">$60-$80</span></div>
                  <div className="price-row">Truck: <span className="price">$55-$75</span></div>
                </div>
                <ul className="features-list">
                  <li>✓ Premium Exterior wash</li>
                  <li>✓ Detailed Vacuum</li>
                  <li>✓ All trims, plastic, vynil and leather wiped down</li>
                  <li>✓ Rims & Tires polished & shined</li>
                  <li>✓ Trunk included (optional)</li>
                </ul>
                <p className="travel-note">*$15 travel fee for locations over 15 miles</p>
              </div>
              <button className="package-btn" onClick={() => selectPackageAndScroll('premium-package', 'Premium Package')}>
                Select Package
              </button>
            </div>

            <div className="package-item">
              <h3>Interior Detail</h3>
              <div className="package-content">
                <div className="pricing-info">
                  <div className="price-row">Car: <span className="price">$40-$50</span></div>
                  <div className="price-row">SUV: <span className="price">$50-$60</span></div>
                  <div className="price-row">Truck: <span className="price">$50-$60</span></div>
                </div>
                <ul className="features-list">
                  <li>✓ All crevices cleaned</li>
                  <li>✓ Detailed Vacuum</li>
                  <li>✓ All trims, plastic, vynil and leather wiped down</li>
                  <li>✓ Trunk included (optional)</li>
                </ul>
                <p className="travel-note">*$15 travel fee for locations over 15 miles</p>
              </div>
              <button className="package-btn" onClick={() => selectPackageAndScroll('interior-detail', 'Interior Detail')}>
                Select Package
              </button>
            </div>

            <div className="package-item">
              <h3>Wax</h3>
              <div className="package-content">
                <div className="pricing-info">
                  <div className="price-row">Car: <span className="price">$40</span></div>
                  <div className="price-row">SUV: <span className="price">$50</span></div>
                  <div className="price-row">Truck: <span className="price">$50</span></div>
                </div>
                <ul className="features-list">
                  <li>✓ All Panels</li>
                  <li>✓ Headlights & tail lights</li>
                  <li>✓ All windows, mirrors & windshield</li>
                  <li>✓ Advanced All weather protection</li>
                </ul>
                <p className="travel-note">*$15 travel fee for locations over 15 miles</p>
              </div>
              <button className="package-btn" onClick={() => selectPackageAndScroll('wax', 'Wax')}>
                Select Package
              </button>
            </div>
          </div>

          <div className="add-on-services">
            <h3>Add-On Services</h3>
            <div className="services-container">
              <div className="service-item">
                <h4>Ceramic coating</h4>
                <p className="service-price">$770</p>
              </div>
              <div className="service-item">
                <h4>Seat Cleaning</h4>
                <p className="service-price">$10-$40</p>
              </div>
              <div className="service-item">
                <h4>Carpet Cleaning</h4>
                <p className="service-price">$10-$40</p>
              </div>
            </div>
          </div>

          <div className="every-wash-includes">
            <h3>Every Wash Includes</h3>
            <div className="includes-grid">
              <div className="include-item">
                <div className="include-icon">🧽</div>
                <h4>Premium Products</h4>
                <p>Professional-grade soaps, waxes, and detailing products</p>
              </div>
              <div className="include-item">
                <div className="include-icon">💧</div>
                <h4>Spot-Free Rinse</h4>
                <p>Filtered water system prevents water spots and streaking</p>
              </div>
              <div className="include-item">
                <div className="include-icon">🛡️</div>
                <h4>Paint Protection</h4>
                <p>UV protection and paint-safe cleaning methods</p>
              </div>
              <div className="include-item">
                <div className="include-icon">✨</div>
                <h4>Quality Guarantee</h4>
                <p>100% satisfaction guarantee on all services</p>
              </div>
              <div className="include-item">
                <div className="include-icon">🚗</div>
                <h4>Hand Finish</h4>
                <p>Personal attention to detail with hand-drying and touch-ups</p>
              </div>
              <div className="include-item">
                <div className="include-icon">⚡</div>
                <h4>Fast Service</h4>
                <p>Efficient process that respects your time</p>
              </div>
            </div>
          </div>

          <div className="pricing-footer">
            <p className="pricing-note">
              <strong>Loyalty Discounts Available:</strong> Your 10th car wash free
            </p>
            <button 
              className="main-cta-button"
              onClick={() => scrollToSection('booking')}
            >
              Schedule Your Detail Today
            </button>
          </div>
        </section>

        <section id="booking" className="booking-section">
          <div className="calendar-section-title">Select a Date & Time</div>
          {/* Temporary admin button to clear bookings */}
          <div style={{textAlign: 'center', marginBottom: '1rem'}}>
            <button 
              onClick={clearAllBookings}
              style={{
                background: '#dc3545', 
                color: 'white', 
                border: 'none', 
                padding: '0.5rem 1rem', 
                borderRadius: '5px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Clear All Bookings (Admin)
            </button>
          </div>
          <div className="booking-container">
            <div className="calendar-container">
              <SimpleCalendar 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>
            
            <div className="time-slots-container">
              {selectedDate && (
                <div className="selected-date-display">
                  <h4>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
                </div>
              )}
              <TimeSlots 
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
                selectedDate={selectedDate}
                onConfirm={() => setShowBookingModal(true)}
                refreshKey={refreshKey}
              />
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <div className="contact-item phone-only">
                <h4>📞 Call or Text Us Today</h4>
                <p className="phone-number">(954) 798-8956</p>
              </div>
              <div className="social-section">
                <img src="/logo.jpg" alt="Island Fleet Detail Logo" className="contact-logo" />
                <div className="social-links">
                  <a href="https://instagram.com/islandfleetdetail" target="_blank" rel="noopener noreferrer" className="social-link instagram-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                    </svg>
                    <span>@islandfleetdetail</span>
                  </a>
                  
                  <a href="https://tiktok.com/@islandfleet" target="_blank" rel="noopener noreferrer" className="social-link tiktok-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    <span>@islandfleet</span>
                  </a>
                  
                  <a href="https://youtube.com/@IslandFleetDetail" target="_blank" rel="noopener noreferrer" className="social-link youtube-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>@IslandFleetDetail</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      
      {showBookingModal && (
        <BookingModal 
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          preselectedService={preselectedService}
          onClose={() => {
            setShowBookingModal(false)
            setPreselectedService('')
          }}
          onSuccess={(successData) => {
            setSuccessData(successData)
            setShowSuccessModal(true)
          }}
        />
      )}
      
      {showCancellationModal && (
        <CancellationModal 
          bookingId={cancellationBookingId}
          onCancel={handleCancellation}
          onClose={(cancelled = false) => {
            setShowCancellationModal(false)
            setCancellationBookingId(null)
            if (cancelled) {
              // Trigger refresh of time slots to show newly available time
              setRefreshKey(prev => prev + 1)
            }
          }}
        />
      )}
      
      {showSuccessModal && (
        <SuccessModal 
          data={successData}
          onClose={() => {
            setShowSuccessModal(false)
            setSuccessData(null)
          }}
        />
      )}
    </div>
  )
}

function SimpleCalendar({ selectedDate, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset to start of today
  
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()
  
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }
  
  const days = []
  
  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    days.push(
      <div key={`prev-${day}`} className="calendar-day other-month">
        {day}
      </div>
    )
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    date.setHours(0, 0, 0, 0) // Reset to start of day for accurate comparison
    const dateString = date.toDateString()
    const isSelected = selectedDate === dateString
    const isPast = date < today
    const isAvailable = !isPast
    
    let className = 'calendar-day'
    if (isSelected) className += ' selected'
    if (isPast) className += ' disabled'
    if (isAvailable && !isPast) className += ' available'
    
    days.push(
      <div 
        key={day}
        className={className}
        onClick={() => !isPast && onDateSelect(dateString)}
      >
        {day}
      </div>
    )
  }
  
  // Next month days to fill the grid
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7
  const remainingCells = totalCells - (firstDayOfMonth + daysInMonth)
  
  for (let day = 1; day <= remainingCells; day++) {
    days.push(
      <div key={`next-${day}`} className="calendar-day other-month">
        {day}
      </div>
    )
  }
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={goToPrevMonth}>‹</button>
        <h4>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
        <button className="calendar-nav-btn" onClick={goToNextMonth}>›</button>
      </div>
      <div className="calendar-grid">
        <div className="day-header">Sun</div>
        <div className="day-header">Mon</div>
        <div className="day-header">Tue</div>
        <div className="day-header">Wed</div>
        <div className="day-header">Thu</div>
        <div className="day-header">Fri</div>
        <div className="day-header">Sat</div>
        {days}
      </div>
    </div>
  )
}

function TimeSlots({ selectedTime, onTimeSelect, selectedDate, onConfirm, refreshKey }) {
  const [timeSlots, setTimeSlots] = useState([]);
  
  // Check localStorage for existing bookings and past times
  const getAvailableSlots = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    // Only count active bookings (exclude cancelled ones)
    const activeBookings = bookings.filter(booking => 
      booking.date === selectedDate && booking.status !== 'cancelled'
    )
    const bookedTimes = activeBookings.map(booking => booking.time)
    
    // Get current date and time
    const now = new Date()
    const selectedDateObj = new Date(selectedDate)
    const isToday = selectedDateObj.toDateString() === now.toDateString()
    
    // Helper function to check if a time slot is in the past
    const isTimePast = (timeSlot) => {
      if (!isToday) return false // If not today, no times are past
      
      // Parse time slot (e.g., "11:00am", "12:00pm", "2:00pm")
      const timeMatch = timeSlot.match(/^(\d{1,2}):(\d{2})(am|pm)$/i)
      if (!timeMatch) return false
      
      const [, hourStr, minuteStr, period] = timeMatch
      let hour = parseInt(hourStr)
      const minute = parseInt(minuteStr)
      
      // Convert to 24-hour format
      if (period.toLowerCase() === 'pm' && hour !== 12) {
        hour += 12
      } else if (period.toLowerCase() === 'am' && hour === 12) {
        hour = 0
      }
      
      // Create date object for the time slot
      const slotTime = new Date()
      slotTime.setHours(hour, minute, 0, 0)
      
      return slotTime <= now
    }
    
    const allSlots = [
      { time: '9:00am', available: true },
      { time: '10:00am', available: true },
      { time: '11:00am', available: true },
      { time: '12:00pm', available: true },
      { time: '1:00pm', available: true },
      { time: '2:00pm', available: true },
      { time: '3:00pm', available: true },
      { time: '4:00pm', available: true },
      { time: '5:00pm', available: true }
    ]
    
    return allSlots.map(slot => ({
      ...slot,
      available: !bookedTimes.includes(slot.time) && !isTimePast(slot.time)
    }))
  }
  
  // Update time slots when date or refresh key changes
  useEffect(() => {
    if (selectedDate) {
      setTimeSlots(getAvailableSlots())
    }
  }, [selectedDate, refreshKey])
  
  if (!selectedDate) {
    return (
      <div className="time-slots">
        <div style={{textAlign: 'center', color: '#666', padding: '2rem'}}>
          Please select a date first
        </div>
      </div>
    )
  }
  
  return (
    <div className="time-slots">
      {timeSlots.map(slot => (
        <button
          key={slot.time}
          className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
          onClick={() => slot.available && onTimeSelect(slot.time)}
          disabled={!slot.available}
        >
          {slot.time}
        </button>
      ))}
      {selectedTime && (
        <button className="confirm-button" onClick={onConfirm}>
          Confirm
        </button>
      )}
    </div>
  )
}

function BookingModal({ selectedDate, selectedTime, preselectedService, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    service: preselectedService?.value || '',
    serviceLocation: '',
    specialRequests: '',
    additionalServices: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAdditionalServiceChange = (service, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        additionalServices: [...formData.additionalServices, service]
      })
    } else {
      setFormData({
        ...formData,
        additionalServices: formData.additionalServices.filter(s => s !== service)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Store booking locally for availability tracking
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      const newBooking = {
        id: Date.now(),
        date: selectedDate,
        time: selectedTime,
        customer: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        vehicleType: formData.vehicleType,
        serviceLocation: formData.serviceLocation,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      bookings.push(newBooking)
      localStorage.setItem('bookings', JSON.stringify(bookings))
      
      // Prepare booking data for email service
      const bookingData = {
        ...formData,
        date: new Date(selectedDate).toLocaleDateString(),
        time: selectedTime,
        additionalServices: formData.additionalServices.join(', '),
        id: newBooking.id
      }
      
      // Send all notifications (SMS + Email)
      console.log('Sending SMS notifications...');
      const smsResults = await sendBookingSMS(bookingData)
      
      console.log('Sending business and customer emails...');
      const emailResults = await sendBookingEmails(bookingData)
      
      // Check if notifications were sent successfully  
      const emailSuccess = emailResults.businessNotification.success && emailResults.customerConfirmation.success
      const smsSuccess = smsResults.businessNotification.success || smsResults.customerConfirmation.success
      
      // Display results to user
      console.log('Email results:', emailResults)
      console.log('SMS results:', smsResults)
      
      // Log successful notifications
      if (emailResults.businessNotification.success) {
        console.log('✅ Business email sent')
      }
      if (emailResults.customerConfirmation.success) {
        console.log('✅ Customer email sent')
      }
      if (smsResults.businessNotification.success) {
        console.log('✅ Business SMS sent')
      }
      if (smsResults.customerConfirmation.success) {
        console.log('✅ Customer SMS sent')
      }
      
      // Create notification status message
      const notifications = [];
      if (emailSuccess) notifications.push('📧 Emails sent');
      if (smsSuccess) notifications.push('📱 SMS sent');
      
      // Generate Google Calendar link for customer
      const calendarLink = createCustomerCalendarLink(bookingData);
      
      // Show success modal instead of alert
      onSuccess({
        success: emailSuccess || smsSuccess,
        bookingDetails: {
          date: new Date(selectedDate).toLocaleDateString(),
          time: selectedTime,
          service: formData.service,
          vehicle: formData.vehicleType.toUpperCase()
        },
        notifications: notifications,
        calendarLink: calendarLink
      });
      
      onClose()
      
      // Reset form for next booking
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleType: '',
        service: preselectedService?.value || '',
        serviceLocation: '',
        specialRequests: '',
        additionalServices: []
      })
      
    } catch (error) {
      console.error('Booking submission error:', error)
      alert('⚠️ There was an error submitting your booking.\n\nPlease try again or call us directly at:\n(954) 798-8956\n\nWe apologize for the inconvenience!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Your Information</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="booking-summary">
          <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <p><strong>Time:</strong> {selectedTime}</p>
          {preselectedService && (
            <p><strong>Selected Service:</strong> {preselectedService.name}</p>
          )}
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
          </select>
          <select
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            required
          >
            <option value="">Select Service</option>
            <option value="exterior-only">Exterior Only - $20-$35</option>
            <option value="basic-package">Basic Package - $30-$55</option>
            <option value="premium-package">Premium Package - $50-$80</option>
            <option value="interior-detail">Interior Detail - $40-$60</option>
            <option value="wax">Wax - $40-$55</option>
          </select>
          
          <div className="additional-services-section">
            <h4>Additional Services (Optional)</h4>
            <div className="additional-services-grid">
              <label className="additional-service-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.includes('Ceramic Coat - Starting @ $650')}
                  onChange={(e) => handleAdditionalServiceChange('Ceramic Coat - Starting @ $650', e.target.checked)}
                />
                <span>Ceramic Coat - Starting @ $650</span>
              </label>
              
              <label className="additional-service-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.includes('Hood & Engine - $20-$40')}
                  onChange={(e) => handleAdditionalServiceChange('Hood & Engine - $20-$40', e.target.checked)}
                />
                <span>Hood & Engine - $20-$40</span>
              </label>
              
              <label className="additional-service-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.includes('Ceiling Cleaning - $10-$50')}
                  onChange={(e) => handleAdditionalServiceChange('Ceiling Cleaning - $10-$50', e.target.checked)}
                />
                <span>Ceiling Cleaning - $10-$50</span>
              </label>
              
              <label className="additional-service-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.includes('Seat Cleaning - $10-$20/seat')}
                  onChange={(e) => handleAdditionalServiceChange('Seat Cleaning - $10-$20/seat', e.target.checked)}
                />
                <span>Seat Cleaning - $10-$20/seat</span>
              </label>
              
              <label className="additional-service-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.includes('Carpet Cleaning - $10-$20/seat')}
                  onChange={(e) => handleAdditionalServiceChange('Carpet Cleaning - $10-$20/seat', e.target.checked)}
                />
                <span>Carpet Cleaning - $10-$20/seat</span>
              </label>
              
            </div>
          </div>
          
          <input
            type="text"
            name="serviceLocation"
            placeholder="Service Address"
            value={formData.serviceLocation}
            onChange={(e) => setFormData({...formData, serviceLocation: e.target.value})}
            required
          />
          
          <textarea
            name="specialRequests"
            placeholder="Special Requests (optional)"
            value={formData.specialRequests}
            onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
            rows="3"
          ></textarea>
          <button type="submit" className="modal-submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send contact emails and SMS notifications
      console.log('Sending contact email notifications...');
      const emailResults = await sendContactEmails(formData)
      
      console.log('Sending contact SMS notifications...');
      const smsResults = await sendContactSMS(formData)
      
      const emailSuccess = emailResults.businessNotification.success || emailResults.customerAutoReply.success
      const smsSuccess = smsResults.businessNotification.success
      
      if (emailSuccess || smsSuccess) {
        // Create notification status message
        const notifications = [];
        if (emailSuccess) notifications.push('📧 Email sent');
        if (smsSuccess) notifications.push('📱 SMS sent');
        
        const notificationText = notifications.length > 0 ? `\n\n${notifications.join(' & ')}!` : '';
        alert('✅ Message sent successfully!\n\nThank you for contacting Island Fleet Detail!\nWe will get back to you as soon as possible.\n\nFor immediate assistance, call or text:\n(954) 798-8956' + notificationText)
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        throw new Error('Both email and SMS sending failed')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      alert('⚠️ There was an error sending your message.\n\nPlease try again or contact us directly at:\n(954) 798-8956\n\nWe apologize for the inconvenience!')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
      />
      <textarea
        placeholder="Your Message"
        rows="5"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
      ></textarea>
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

function CancellationModal({ bookingId, onCancel, onClose }) {
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)

  useEffect(() => {
    // Get booking details from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const booking = bookings.find(b => b.id.toString() === bookingId)
    setBookingDetails(booking)
  }, [bookingId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await onCancel(bookingId, reason)
      
      if (result.success) {
        alert('✅ Booking cancelled successfully!\n\nWe have received your cancellation request. You will receive a confirmation shortly.\n\nIf you need to reschedule, please call us at (954) 798-8956.')
        onClose(true) // Pass true to indicate successful cancellation
      } else {
        throw new Error(result.error || 'Cancellation failed')
      }
    } catch (error) {
      console.error('Cancellation error:', error)
      alert('⚠️ There was an error cancelling your booking.\n\nPlease try again or call us directly at:\n(954) 798-8956\n\nWe apologize for the inconvenience!')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!bookingDetails) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Booking Not Found</h3>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="cancellation-content">
            <p>Sorry, we couldn't find a booking with ID #{bookingId}.</p>
            <p>Please contact us directly at (954) 798-8956 for assistance.</p>
            <button className="cancel-button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    )
  }

  if (bookingDetails.status === 'cancelled') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Already Cancelled</h3>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="cancellation-content">
            <p>This booking has already been cancelled.</p>
            <p><strong>Cancellation Date:</strong> {new Date(bookingDetails.cancelledAt).toLocaleDateString()}</p>
            <p><strong>Reason:</strong> {bookingDetails.cancellationReason || 'No reason provided'}</p>
            <button className="cancel-button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Cancel Appointment</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="cancellation-content">
          <div className="booking-summary">
            <h4>Booking Details:</h4>
            <p><strong>Booking ID:</strong> #{bookingId}</p>
            <p><strong>Date:</strong> {bookingDetails.date}</p>
            <p><strong>Time:</strong> {bookingDetails.time}</p>
            <p><strong>Customer:</strong> {bookingDetails.customer}</p>
            <p><strong>Status:</strong> {bookingDetails.status}</p>
          </div>

          <form onSubmit={handleSubmit} className="cancellation-form">
            <div className="form-group">
              <label htmlFor="reason">Reason for cancellation (optional):</label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Let us know why you're cancelling (optional)"
                rows="3"
              />
            </div>

            <div className="cancellation-policy">
              <p><strong>Cancellation Policy:</strong></p>
              <ul>
                <li>Free cancellation for now (no fees)</li>
                <li>We'll notify our team immediately</li>
                <li>For rescheduling, please call (954) 798-8956</li>
              </ul>
            </div>

            <div className="cancellation-actions">
              <button 
                type="button" 
                className="cancel-button secondary" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Keep Booking
              </button>
              <button 
                type="submit" 
                className="cancel-button primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function SuccessModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🎉 Booking Confirmed!</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="success-content">
          <div className="success-message">
            <p><strong>Thank you for choosing Island Fleet Detail!</strong></p>
            <p>We will contact you within 24 hours to confirm your appointment.</p>
          </div>

          <div className="booking-summary">
            <h4>Booking Details:</h4>
            <p><strong>Date:</strong> {data.bookingDetails.date}</p>
            <p><strong>Time:</strong> {data.bookingDetails.time}</p>
            <p><strong>Service:</strong> {data.bookingDetails.service}</p>
            <p><strong>Vehicle:</strong> {data.bookingDetails.vehicle}</p>
          </div>

          {data.notifications.length > 0 && (
            <div className="notification-status">
              <p><strong>Notifications:</strong> {data.notifications.join(' & ')} sent successfully!</p>
            </div>
          )}

          <div className="calendar-section">
            <p><strong>📅 Add to your calendar:</strong></p>
            <a 
              href={data.calendarLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="calendar-button"
            >
              Add to Calendar
            </a>
          </div>

          {!data.success && (
            <div className="warning-section">
              <p><strong>⚠️ Notice:</strong> Notifications may have failed to send.</p>
              <p>Please call us directly to confirm: <strong>(954) 798-8956</strong></p>
            </div>
          )}

          <div className="success-actions">
            <button className="success-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
