import { useState } from 'react'
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="app">
      <nav className="top-navigation">
        <div className="nav-container">
          <div className="logo-nav">
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
                <button className="select-package-btn" onClick={() => scrollToSection('booking')}>
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
                <button className="select-package-btn" onClick={() => scrollToSection('booking')}>
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
                <button className="select-package-btn" onClick={() => scrollToSection('booking')}>
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
                  <button className="select-package-btn" onClick={() => scrollToSection('booking')}>
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
                  <button className="select-package-btn" onClick={() => scrollToSection('booking')}>
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
              <div className="additional-item">
                <h4>Seat Cleaning</h4>
                <p className="additional-price">$10-$20/seat</p>
              </div>
              <div className="additional-item">
                <h4>Carpet Cleaning</h4>
                <p className="additional-price">$10-$20/seat</p>
              </div>
              <div className="additional-item">
                <h4>Travel Fee</h4>
                <p className="additional-price">$15 (over 15 miles)</p>
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
              <strong>Fleet Discounts Available:</strong> 10% off for 5+ vehicles | 15% off for 10+ vehicles
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
              />
            </div>
          </div>
          
          {selectedDate && selectedTime && (
            <div className="customer-form-container" style={{marginTop: '2rem'}}>
              <CustomerForm />
            </div>
          )}
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
    </div>
  )
}

function SimpleCalendar({ selectedDate, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = new Date()
  
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
    const dateString = date.toDateString()
    const isSelected = selectedDate === dateString
    const isPast = date < today.setHours(0,0,0,0)
    const isAvailable = !isPast && (day === 16 || day === 17 || day === 19 || day === 22 || day === 23 || day === 24 || day === 25 || day === 29 || day === 30 || day === 31)
    
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

function TimeSlots({ selectedTime, onTimeSelect, selectedDate }) {
  const timeSlots = [
    { time: '10:00am', available: true },
    { time: '11:00am', available: false },
    { time: '1:00pm', available: true },
    { time: '2:30pm', available: true },
    { time: '4:00pm', available: true }
  ]
  
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
        <button className="confirm-button" onClick={() => alert('Time confirmed!')}>
          Confirm
        </button>
      )}
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
