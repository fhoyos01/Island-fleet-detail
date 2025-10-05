import { useState } from 'react'
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [currentStep, setCurrentStep] = useState('booking')

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <div className="logo">
            <h1>Island Fleet Detail</h1>
          </div>
          <div className="hero-text">
            <h2>Professional Auto Detailing Services</h2>
            <p>Transform your vehicle with our premium detailing services. Book your appointment today!</p>
            <button 
              className="cta-button"
              onClick={() => setCurrentStep('booking')}
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <main>
        {currentStep === 'pricing' && (
          <section className="pricing-section">
            <h2>Our Services</h2>
            <div className="service-grid">
              <div className="service-card">
                <h3>Basic Wash</h3>
                <p className="price">$25</p>
                <ul>
                  <li>Exterior wash</li>
                  <li>Window cleaning</li>
                  <li>Tire shine</li>
                </ul>
              </div>
              <div className="service-card">
                <h3>Full Detail</h3>
                <p className="price">$75</p>
                <ul>
                  <li>Exterior & interior cleaning</li>
                  <li>Wax application</li>
                  <li>Vacuum & leather treatment</li>
                </ul>
              </div>
              <div className="service-card">
                <h3>Premium Detail</h3>
                <p className="price">$125</p>
                <ul>
                  <li>Complete detail package</li>
                  <li>Paint correction</li>
                  <li>Ceramic coating</li>
                </ul>
              </div>
            </div>
            <button 
              className="secondary-button"
              onClick={() => setCurrentStep('booking')}
            >
              Book Service
            </button>
          </section>
        )}

        {currentStep === 'booking' && (
          <section className="booking-section">
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
        )}
      </main>

      <nav className="navigation">
        <button 
          className={currentStep === 'booking' ? 'active' : ''}
          onClick={() => setCurrentStep('booking')}
        >
          Book Appointment
        </button>
        <button 
          className={currentStep === 'pricing' ? 'active' : ''}
          onClick={() => setCurrentStep('pricing')}
        >
          Pricing & Services
        </button>
      </nav>
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
