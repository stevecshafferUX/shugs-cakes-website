import { useState } from 'react';
import { contactApi } from '@/api';
import { contactSchema } from '@/lib/validations/schemas';
import { toast } from 'sonner';
import { BUSINESS_INFO } from '@/constants';
import './Contact.css';

const RATE_LIMIT_KEY = 'contact_rate_limit';
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getRateLimitData() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    return raw ? JSON.parse(raw) : { submissions: [] };
  } catch {
    return { submissions: [] };
  }
}

function checkRateLimit() {
  const now = Date.now();
  const { submissions } = getRateLimitData();
  const recent = submissions.filter(ts => now - ts < WINDOW_MS);
  if (recent.length >= MAX_SUBMISSIONS) {
    const resetAt = Math.min(...recent) + WINDOW_MS;
    const minutesLeft = Math.ceil((resetAt - now) / 60000);
    return { limited: true, minutesLeft };
  }
  return { limited: false, remaining: MAX_SUBMISSIONS - recent.length };
}

function recordSubmission() {
  const now = Date.now();
  const { submissions } = getRateLimitData();
  const recent = submissions.filter(ts => now - ts < WINDOW_MS);
  recent.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ submissions: recent }));
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const rateLimit = checkRateLimit();
    if (rateLimit.limited) {
      toast.error(`Too many messages sent. Please wait ${rateLimit.minutesLeft} minute${rateLimit.minutesLeft === 1 ? '' : 's'} before trying again.`);
      return;
    }

    setLoading(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Submit to database
      await contactApi.submit(validatedData);

      recordSubmission();
      toast.success('Thank you for your message! We will get back to you soon.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);

      if (error.name === 'ZodError') {
        const fieldErrors = {};
        error.errors.forEach(err => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        toast.error('Please check the form for errors');
      } else {
        toast.error(error.message || 'Failed to send message. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with Shug's Cakes</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-box">
            <h2>Business Information</h2>
            <div className="info-item">
              <h3>Owner</h3>
              <p>{BUSINESS_INFO.owner}</p>
            </div>
            <div className="info-item">
              <h3>Location</h3>
              <p>{BUSINESS_INFO.location}</p>
              <p className="note">Directions provided upon ordering</p>
            </div>
            <div className="info-item">
              <h3>Phone/Text</h3>
              <p><a href={`tel:${BUSINESS_INFO.phone.replace(/\D/g, '')}`}>{BUSINESS_INFO.phone}</a></p>
            </div>
            <div className="info-item">
              <h3>Email</h3>
              <p><a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a></p>
            </div>
            <div className="info-item">
              <h3>Social Media</h3>
              <p>
                <a href={BUSINESS_INFO.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook: Shug's Cakes
                </a>
              </p>
              <p>
                <a href={BUSINESS_INFO.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram: @shugscakes
                </a>
              </p>
            </div>
          </div>

          <div className="info-box">
            <h2>Pickup Hours</h2>
            <div className="hours">
              <div className="hours-row">
                <span className="day">Saturday & Sunday</span>
                <span className="time">{BUSINESS_INFO.pickupHours.weekends}</span>
              </div>
              <div className="hours-row">
                <span className="day">Monday - Friday</span>
                <span className="time">{BUSINESS_INFO.pickupHours.weekdays}</span>
              </div>
            </div>
            <p className="note">Customers must schedule within this window</p>
          </div>

          <div className="info-box">
            <h2>Important Note</h2>
            <p>
              We operate from a commercial bakery in our home and only fill custom orders.
              Directions will be sent after ordering.
            </p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={250}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={50}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={errors.subject ? 'error' : ''}
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                maxLength={500}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
