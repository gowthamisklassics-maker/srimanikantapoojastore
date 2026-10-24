import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../services/storeContext';
import { STORE_DATA, api } from '../services/api';

export default function Contact() {
  const { storeStatus, showToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Enquiry');
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    // Save to backend
    try {
      await api.submitEnquiry({ name, mobile: phone, subject, message });
    } catch (err) {
      console.warn('Could not post enquiry:', err);
    }

    const waMsg =
      `🕉️ *New Message via Website Contact Form*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Mobile:* ${phone}\n` +
      `📋 *Subject:* ${subject}\n` +
      `💬 *Message:* ${message}`;

    const url = `https://wa.me/${STORE_DATA.whatsapp2}?text=${encodeURIComponent(waMsg)}`;
    window.open(url, '_blank');
    showToast('Message sent via WhatsApp!', 'success');

    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help with all your pooja needs</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Contact</span>
          </div>
        </div>
      </div>

      {/* Quick Contact Buttons Bar */}
      <div style={{ background: 'var(--sand)', padding: 'var(--sp-8) 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div
              id="store-status-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: `2px solid ${storeStatus.color}`,
                background: `${storeStatus.color}15`,
                color: storeStatus.color
              }}
            >
              <i className={`fas fa-${storeStatus.open ? 'door-open' : 'door-closed'}`}></i>
              <span>{storeStatus.label} • {storeStatus.detail}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="tel:+918074595152" className="btn btn-primary btn-lg">
              <i className="fas fa-phone-alt"></i> Call: +91 80745 95152
            </a>
            <a
              href={`https://wa.me/${STORE_DATA.whatsapp}?text=Hello!%20I%20visited%20your%20website%20and%20need%20help%20with%20pooja%20items.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <i className="fab fa-whatsapp"></i> WhatsApp Us
            </a>
            <a
              href={STORE_DATA.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-lg"
              style={{ borderColor: '#E1306C', color: '#E1306C' }}
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Main Contact Layout */}
      <section className="contact-layout" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Left: Info Card */}
            <div>
              <div
                className="contact-info-card"
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '36px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', marginBottom: '24px' }}>
                  <i className="fas fa-store" style={{ color: 'var(--saffron)', marginRight: '8px' }}></i>
                  Sri Manikanta Pooja Stores
                </h3>

                <div className="contact-info-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="contact-info-item" style={{ display: 'flex', gap: '16px' }}>
                    <div className="contact-info-icon" style={{ color: 'var(--saffron)', fontSize: '20px', flexShrink: 0 }}>
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-info-text">
                      <strong>Store Address</strong>
                      <span style={{ display: 'block', color: 'var(--text-muted)', marginTop: '4px' }}>
                        P. No. 13, SY No. 58 &amp; 59, Gowrinathpuram, Ph-2, Yellareddyguda,<br />
                        Circle 07 Kapra, Malkajgiri Municipal Corporation, Telangana – 500062
                      </span>
                    </div>
                  </div>

                  <div className="contact-info-item" style={{ display: 'flex', gap: '16px' }}>
                    <div className="contact-info-icon" style={{ color: 'var(--saffron)', fontSize: '20px', flexShrink: 0 }}>
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="contact-info-text">
                      <strong>Phone Number</strong>
                      <span style={{ display: 'block', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <a href="tel:+918074595152">+91 80745 95152</a>
                      </span>
                    </div>
                  </div>

                  <div className="contact-info-item" style={{ display: 'flex', gap: '16px' }}>
                    <div className="contact-info-icon" style={{ color: '#25D366', fontSize: '20px', flexShrink: 0 }}>
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <div className="contact-info-text">
                      <strong>WhatsApp Support</strong>
                      <span style={{ display: 'block', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <a href="https://wa.me/918074595152" target="_blank" rel="noreferrer">+91 80745 95152</a>
                      </span>
                    </div>
                  </div>

                  <div className="contact-info-item" style={{ display: 'flex', gap: '16px' }}>
                    <div className="contact-info-icon" style={{ color: 'var(--saffron)', fontSize: '20px', flexShrink: 0 }}>
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="contact-info-text">
                      <strong>Store Hours</strong>
                      <span style={{ display: 'block', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Monday – Saturday: 8:00 AM – 10:00 PM<br />
                        Sunday: 8:30 AM – 10:00 PM<br />
                        <b style={{ color: 'var(--saffron)' }}>Festivals: 7:00 AM – 11:30 PM</b>
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <a
                    href={STORE_DATA.whatsappGroup}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-whatsapp-btn"
                  >
                    <i className="fab fa-whatsapp"></i> Join WhatsApp Community
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Working Form */}
            <div>
              <div
                className="contact-form-card"
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '36px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', marginBottom: '8px' }}>
                  <i className="fas fa-paper-plane" style={{ color: 'var(--saffron)', marginRight: '8px' }}></i>
                  Send Us a Message
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: '24px' }}>
                  Have a question about a product, bulk order or custom requirement? Fill the form and we'll respond via WhatsApp!
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Subject
                    </label>
                    <select
                      className="form-control"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option>Product Enquiry</option>
                      <option>Bulk Order</option>
                      <option>Wedding / Event Requirement</option>
                      <option>Delivery Information</option>
                      <option>Custom Order</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Message *
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Tell us what you need — product name, quantity, occasion, etc."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-whatsapp btn-lg"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <i className="fab fa-whatsapp"></i> Send via WhatsApp
                  </button>
                  <p style={{ textAlign: 'center', marginTop: '12px', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                    We typically respond within 30 minutes during store hours
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Store Hours Table + Quick Facts */}
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="store-hours">
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', fontSize: 'var(--text-xl)', marginBottom: '16px' }}>
                <i className="fas fa-clock" style={{ color: 'var(--saffron)' }}></i> Store Hours
              </h3>
              <div className="hours-row"><span className="hours-day">Monday</span><span className="hours-time open">8:00 AM – 10:00 PM</span></div>
              <div className="hours-row"><span className="hours-day">Tuesday</span><span className="hours-time open">8:00 AM – 10:00 PM</span></div>
              <div className="hours-row"><span className="hours-day">Wednesday</span><span className="hours-time open">8:00 AM – 10:00 PM</span></div>
              <div className="hours-row"><span className="hours-day">Thursday</span><span className="hours-time open">8:00 AM – 10:00 PM</span></div>
              <div className="hours-row"><span className="hours-day">Friday</span><span className="hours-time open">8:00 AM – 10:00 PM</span></div>
              <div className="hours-row"><span className="hours-day">Saturday</span><span className="hours-time open">8:00 AM – 10:00 PM</span></div>
              <div className="hours-row"><span className="hours-day">Sunday</span><span className="hours-time open">8:30 AM – 10:00 PM</span></div>
            </div>

            <div className="store-hours">
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', fontSize: 'var(--text-xl)', marginBottom: '16px' }}>
                <i className="fas fa-info-circle" style={{ color: 'var(--saffron)' }}></i> Quick Facts
              </h3>
              <div className="hours-row"><span className="hours-day">📍 Location</span><span className="hours-time">Kapra, Malkajgiri, Hyderabad</span></div>
              <div className="hours-row"><span className="hours-day">🚚 Delivery</span><span className="hours-time">All Hyderabad areas</span></div>
              <div className="hours-row"><span className="hours-day">📦 Products</span><span className="hours-time">500+ items</span></div>
              <div className="hours-row"><span className="hours-day">🚚 Free Delivery</span><span className="hours-time">Above ₹5000 &amp; within 5km</span></div>
              <div className="hours-row"><span className="hours-day">💬 Order via</span><span className="hours-time">WhatsApp / Call</span></div>
              <div className="hours-row"><span className="hours-day">🔄 Returns</span><span className="hours-time">Within 3 days</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="map-section" style={{ padding: '0 0 60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Find Us</div>
            <h2 className="section-title">
              Visit Our <span>Store</span>
            </h2>
            <p className="section-subtitle">
              P. No. 13, SY No. 58 &amp; 59, Gowrinathpuram, Ph-2, Yellareddyguda, Circle 07 Kapra, Malkajgiri Municipal Corporation, Telangana, 500062
            </p>
          </div>
          <div className="map-wrapper" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <iframe
              src={STORE_DATA.mapEmbed}
              height="450"
              style={{ border: 0, width: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sri Manikanta Pooja Stores location map"
            ></iframe>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a
              href={STORE_DATA.mapLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-lg"
            >
              <i className="fas fa-directions"></i> Get Directions on Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
