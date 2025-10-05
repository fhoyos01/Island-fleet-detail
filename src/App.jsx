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
                <h3>Express Wash</h3>
                <div className="price-container">
                  <span className="price">$25</span>
                  <span className="duration">15-20 min</span>
                </div>
              </div>
              <div className="card-content">
                <h4>Perfect for regular maintenance</h4>
                <ul className="service-list">
                  <li>✓ Premium exterior wash</li>
                  <li>✓ Spot-free rinse</li>
                  <li>✓ Tire shine application</li>
                  <li>✓ Quick dry & towel finish</li>
                </ul>
                <button className="select-package-btn" onClick={() => scrollToSection('booking')}>
                  Select Package
                </button>
              </div>
            </div>

            <div className="service-card popular">
              <div className="popular-badge">Most Popular</div>
              <div className="card-header">
                <h3>Full Detail</h3>
                <div className="price-container">
                  <span className="price">$75</span>
                  <span className="duration">45-60 min</span>
                </div>
              </div>
              <div className="card-content">
                <h4>Complete interior & exterior care</h4>
                <ul className="service-list">
                  <li>✓ Everything in Express Wash</li>
                  <li>✓ Interior vacuum & wipe down</li>
                  <li>✓ Dashboard & console cleaning</li>
                  <li>✓ Window cleaning (inside & out)</li>
                  <li>✓ Floor mat cleaning</li>
                  <li>✓ Premium car wax application</li>
                </ul>
                <button className="select-package-btn" onClick={() => scrollToSection('booking')}>
                  Select Package
                </button>
              </div>
            </div>

            <div className="service-card premium">
              <div className="card-header">
                <h3>Signature Detail</h3>
                <div className="price-container">
                  <span className="price">$125</span>
                  <span className="duration">90-120 min</span>
                </div>
              </div>
              <div className="card-content">
                <h4>Ultimate protection & restoration</h4>
                <ul className="service-list">
                  <li>✓ Everything in Full Detail</li>
                  <li>✓ Paint decontamination</li>
                  <li>✓ Clay bar treatment</li>
                  <li>✓ Paint correction (minor scratches)</li>
                  <li>✓ Ceramic coating application</li>
                  <li>✓ Leather conditioning</li>
                  <li>✓ Engine bay cleaning</li>
                  <li>✓ 30-day protection guarantee</li>
                </ul>
                <button className="select-package-btn" onClick={() => scrollToSection('booking')}>
                  Select Package
                </button>
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
          <h2>Book Your Appointment</h2>
          <div className="booking-container">
            <div className="calendar-container">
              <h3>Select Date</h3>
              <SimpleCalendar 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>
            
            {selectedDate && (
              <div className="time-slots-container">
                <h3>Available Times</h3>
                <TimeSlots 
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                />
              </div>
            )}
            
            {selectedDate && selectedTime && (
              <div className="customer-form-container">
                <CustomerForm />
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <div className="contact-item phone-only">
                <h4>📞 Call Us Today</h4>
                <p className="phone-number">(954) 798-8956</p>
                <p className="phone-subtitle">Ready to schedule your appointment</p>
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
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  
  const days = []
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    const dateString = date.toDateString()
    const isSelected = selectedDate === dateString
    const isPast = date < today.setHours(0,0,0,0)
    
    days.push(
      <div 
        key={day}
        className={`calendar-day ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''}`}
        onClick={() => !isPast && onDateSelect(dateString)}
      >
        {day}
      </div>
    )
  }
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <h4>{today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
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

function TimeSlots({ selectedTime, onTimeSelect }) {
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]
  
  return (
    <div className="time-slots">
      {timeSlots.map(time => (
        <button
          key={time}
          className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
          onClick={() => onTimeSelect(time)}
        >
          {time}
        </button>
      ))}
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
