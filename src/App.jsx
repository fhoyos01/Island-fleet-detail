import { useState, useEffect } from 'react'
import './App.css'
import { initEmailJS, sendBookingEmails } from './services/emailService'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')

  // Initialize EmailJS when component mounts
  useEffect(() => {
    initEmailJS()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
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
          <div className="nav-links">
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

          <div className="service-grid">
            <div className="service-card basic">
              <div className="card-header">
                <h3>Exterior Only</h3>
                <div className="price-container">
                  <div className="vehicle-pricing">
                    <span className="vehicle-type">Car: <span className="price-small">$20</span></span>
                    <span className="vehicle-type">SUV: <span className="price-small">$25</span></span>
                    <span className="vehicle-type">Truck: <span className="price-small">$25-$35</span></span>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <ul className="service-list">
                  <li>✓ Exterior wash</li>
                  <li>✓ Rinse & dry includes</li>
                  <li>✓ Tire & rim cleaning</li>
                </ul>
                <p className="travel-fee-note">*$15 travel fee for locations over 15 miles</p>
                <button className="select-package-btn" onClick={() => selectPackageAndScroll('exterior-only', 'Exterior Only')}>
                  Select Package
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="card-header">
                <h3>Basic Package</h3>
                <div className="price-container">
                  <div className="vehicle-pricing">
                    <span className="vehicle-type">Car: <span className="price-small">$30-$40</span></span>
                    <span className="vehicle-type">SUV: <span className="price-small">$40-$50</span></span>
                    <span className="vehicle-type">Truck: <span className="price-small">$45-$55</span></span>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <ul className="service-list">
                  <li>✓ Exterior wash</li>
                  <li>✓ Interior vacuum</li>
                  <li>✓ Wipe & clean plastic</li>
                  <li>✓ Tires not included</li>
                </ul>
                <p className="travel-fee-note">*$15 travel fee for locations over 15 miles</p>
                <button className="select-package-btn" onClick={() => selectPackageAndScroll('basic-package', 'Basic Package')}>
                  Select Package
                </button>
              </div>
            </div>

            <div className="service-card popular">
              <div className="popular-badge">Most Popular</div>
              <div className="card-header">
                <h3>Premium Package</h3>
                <div className="price-container">
                  <div className="vehicle-pricing">
                    <span className="vehicle-type">Car: <span className="price-small">$50-$60</span></span>
                    <span className="vehicle-type">SUV: <span className="price-small">$60-$80</span></span>
                    <span className="vehicle-type">Truck: <span className="price-small">$60-$80</span></span>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <ul className="service-list">
                  <li>✓ Everything in basic wash</li>
                  <li>✓ Seat wipe down</li>
                  <li>✓ All interior plastic wipe down</li>
                  <li>✓ Seat wipe down</li>
                  <li>✓ All tire shine included</li>
                  <li>✓ Windows in/out shine</li>
                </ul>
                <p className="travel-fee-note">*$15 travel fee for locations over 15 miles</p>
                <button className="select-package-btn" onClick={() => selectPackageAndScroll('premium-package', 'Premium Package')}>
                  Select Package
                </button>
              </div>
            </div>

            <div className="bottom-row-cards">
              <div className="service-card">
                <div className="card-header">
                  <h3>Interior Detail</h3>
                  <div className="price-container">
                    <div className="vehicle-pricing">
                      <span className="vehicle-type">Car: <span className="price-small">$40-$50</span></span>
                      <span className="vehicle-type">SUV: <span className="price-small">$50-$60</span></span>
                      <span className="vehicle-type">Truck: <span className="price-small">$45-$55</span></span>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <ul className="service-list">
                    <li>✓ All interior vacuum</li>
                    <li>✓ All interior wipe down</li>
                    <li>✓ Interior plastic wipe oil and leather w/seat down</li>
                    <li>✓ Trunk included on trunk</li>
                  </ul>
                  <p className="travel-fee-note">*$15 travel fee for locations over 15 miles</p>
                  <button className="select-package-btn" onClick={() => selectPackageAndScroll('interior-detail', 'Interior Detail')}>
                    Select Package
                  </button>
                </div>
              </div>

              <div className="service-card premium">
                <div className="card-header">
                  <h3>Wax</h3>
                  <div className="price-container">
                    <div className="vehicle-pricing">
                      <span className="vehicle-type">Car: <span className="price-small">$40-$50</span></span>
                      <span className="vehicle-type">SUV: <span className="price-small">$50-$55</span></span>
                      <span className="vehicle-type">Truck: <span className="price-small">$50-$55</span></span>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <ul className="service-list">
                    <li>✓ All interior</li>
                    <li>✓ Liquid & turtle wax</li>
                    <li>✓ All interior mirrors & windshield</li>
                    <li>✓ Advanced steam washer</li>
                    <li>✓ Full service</li>
                  </ul>
                  <p className="travel-fee-note">*$15 travel fee for locations over 15 miles</p>
                  <button className="select-package-btn" onClick={() => selectPackageAndScroll('wax', 'Wax')}>
                    Select Package
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="additional-services">
            <h3>Additional Services</h3>
            <div className="additional-grid">
              <div className="additional-item">
                <h4>Ceramic Coat</h4>
                <p className="additional-price">Starting @ $650</p>
              </div>
              <div className="additional-item">
                <h4>Hood & Engine</h4>
                <p className="additional-price">$20-$40</p>
              </div>
              <div className="additional-item">
                <h4>Ceiling Cleaning</h4>
                <p className="additional-price">$10-$50</p>
              </div>
            </div>
            <div className="additional-bottom-row">
              <div className="additional-item">
                <h4>Seat Cleaning</h4>
                <p className="additional-price">$10-$20/seat</p>
              </div>
              <div className="additional-item">
                <h4>Carpet Cleaning</h4>
                <p className="additional-price">$10-$20/seat</p>
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
                <a href="https://instagram.com/islandfleetdetail" target="_blank" rel="noopener noreferrer" className="instagram-link">
                  <svg className="instagram-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@islandfleetdetail</span>
                </a>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send us a Message</h3>
              <form className="message-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="tel" placeholder="Phone Number" />
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
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

function TimeSlots({ selectedTime, onTimeSelect, selectedDate, onConfirm }) {
  // Check localStorage for existing bookings
  const getAvailableSlots = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const dateBookings = bookings.filter(booking => booking.date === selectedDate)
    const bookedTimes = dateBookings.map(booking => booking.time)
    
    const allSlots = [
      { time: '9:00am', available: true },
      { time: '10:00am', available: true },
      { time: '11:00am', available: true },
      { time: '1:00pm', available: true },
      { time: '2:30pm', available: true },
      { time: '4:00pm', available: true }
    ]
    
    return allSlots.map(slot => ({
      ...slot,
      available: !bookedTimes.includes(slot.time)
    }))
  }
  
  const timeSlots = getAvailableSlots()
  
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

function BookingModal({ selectedDate, selectedTime, preselectedService, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    service: preselectedService?.value || '',
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
        status: 'pending'
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
      
      // Send email notifications using EmailJS
      const results = await sendBookingEmails(bookingData)
      
      // Check if at least one email was sent successfully
      const emailSuccess = results.businessNotification.success || results.customerConfirmation.success
      
      if (emailSuccess) {
        console.log('Email results:', results)
        if (results.businessNotification.success) {
          console.log('✅ Business notification sent')
        }
        if (results.customerConfirmation.success) {
          console.log('✅ Customer confirmation sent')
        }
        
        alert('🎉 Booking submitted successfully!\n\nThank you for choosing Island Fleet Detail!\nWe will contact you within 24 hours to confirm your appointment.\n\nBooking Details:\n• Date: ' + new Date(selectedDate).toLocaleDateString() + '\n• Time: ' + selectedTime + '\n• Service: ' + formData.service + '\n• Vehicle: ' + formData.vehicleType.toUpperCase() + '\n\n📧 Confirmation emails sent!')
      } else {
        // Email sending failed but booking is still stored locally
        alert('⚠️ Booking submitted but email notifications failed.\n\nYour booking has been saved locally. Please call us directly to confirm:\n(954) 798-8956\n\nBooking Details:\n• Date: ' + new Date(selectedDate).toLocaleDateString() + '\n• Time: ' + selectedTime + '\n• Service: ' + formData.service + '\n• Vehicle: ' + formData.vehicleType.toUpperCase())
      }
      
      onClose()
      
      // Reset form for next booking
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleType: '',
        service: preselectedService?.value || '',
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

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    vehicle: '',
    notes: ''
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Appointment booked! We will contact you to confirm.')
  }
  
  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <h3>Your Information</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        required
      />
      <select
        value={formData.service}
        onChange={(e) => setFormData({...formData, service: e.target.value})}
        required
      >
        <option value="">Select Service</option>
        <option value="basic">Basic Wash - $25</option>
        <option value="full">Full Detail - $75</option>
        <option value="premium">Premium Detail - $125</option>
      </select>
      <input
        type="text"
        placeholder="Vehicle (Year, Make, Model)"
        value={formData.vehicle}
        onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
        required
      />
      <textarea
        placeholder="Special requests or notes"
        value={formData.notes}
        onChange={(e) => setFormData({...formData, notes: e.target.value})}
        rows="3"
      ></textarea>
      <button type="submit" className="submit-button">
        Confirm Appointment
      </button>
    </form>
  )
}

export default App
