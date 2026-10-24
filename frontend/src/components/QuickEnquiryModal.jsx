import React, { useState } from 'react';
import { useStore } from '../services/storeContext';
import { api } from '../services/api';

export default function QuickEnquiryModal() {
  const { isQuickEnquiryOpen, setIsQuickEnquiryOpen, storeInfo, showToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Enquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!isQuickEnquiryOpen) return null;

  const close = () => {
    setIsQuickEnquiryOpen(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('⚠️ Please enter your name and message.');
      return;
    }
    setError('');

    // Save enquiry to backend
    try {
      await api.submitEnquiry({ name, mobile: phone, subject, message });
    } catch (err) {
      console.warn('Could not save enquiry to server:', err);
    }

    // Build WhatsApp message
    const waMsg =
      `🕉️ *New Enquiry – Sri Manikanta Pooja Stores*\n\n` +
      `👤 *Name:* ${name}\n` +
      (phone ? `📞 *Mobile:* ${phone}\n` : '') +
      `📋 *Subject:* ${subject}\n` +
      `💬 *Message:* ${message}`;

    const url = `https://wa.me/${storeInfo.whatsapp2}?text=${encodeURIComponent(waMsg)}`;
    window.open(url, '_blank');

    showToast('Enquiry sent via WhatsApp!', 'success');
    close();
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="enquiry-backdrop open" onClick={(e) => e.target.classList.contains('enquiry-backdrop') && close()}>
      <div className="enquiry-box">
        {/* Header */}
        <div className="enquiry-header">
          <div className="enquiry-header-title">
            <span className="enquiry-wa-icon">
              <i className="fab fa-whatsapp"></i>
            </span>
            <div>
              <h3>Quick Enquiry</h3>
              <p>Tell us what you need — we'll reply in minutes!</p>
            </div>
          </div>
          <button className="enquiry-close-btn" onClick={close} aria-label="Close">
            &times;
          </button>
        </div>

        {/* Two-column layout */}
        <div className="enquiry-layout">
          {/* Left: Store Info */}
          <div className="enquiry-info-panel">
            <div className="enquiry-store-name">
              🕉️ Sri Manikanta<br />
              <span>Pooja Stores</span>
            </div>
            <div className="enquiry-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>P. No. 13, Gowrinathpuram, Ph-2,<br />Kapra, Malkajgiri – 500062</span>
            </div>
            <div className="enquiry-info-item">
              <i className="fas fa-clock"></i>
              <span>Open Daily<br /><strong>8:00 AM – 10:00 PM</strong></span>
            </div>
            <div className="enquiry-info-item">
              <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i>
              <span>Avg. reply time<br /><strong>Under 30 mins</strong></span>
            </div>
            <a href="tel:+918074595152" className="enquiry-call-btn">
              <i className="fas fa-phone-alt"></i> Call Now
            </a>
            <a href={`https://wa.me/${storeInfo.whatsapp2}`} target="_blank" rel="noreferrer" className="enquiry-wa-direct-btn">
              <i className="fab fa-whatsapp"></i> WhatsApp Direct
            </a>
            <div className="enquiry-info-badges">
              <span>✅ Bulk Orders</span>
              <span>🏠 Home Delivery</span>
              <span>💍 Wedding Kits</span>
              <span>🪔 Festival Items</span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="enquiry-body">
            <div className="enquiry-row">
              <div className="enquiry-field">
                <label>Your Name <span>*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="enquiry-field">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="enquiry-field">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="Product Enquiry">🛍️ Product Enquiry</option>
                <option value="Bulk / Wholesale Order">📦 Bulk / Wholesale Order</option>
                <option value="Wedding Samagri">💍 Wedding Samagri</option>
                <option value="Festival Kit">🪔 Festival Kit</option>
                <option value="Price Check">💰 Price Check</option>
                <option value="Home Delivery">🚚 Home Delivery</option>
                <option value="Custom Request">✨ Custom Request</option>
                <option value="Other">💬 Other</option>
              </select>
            </div>

            <div className="enquiry-field">
              <label>Your Message <span>*</span></label>
              <textarea
                rows="4"
                placeholder="Tell us what you need — product name, quantity, occasion, etc."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            {error && <div className="enquiry-error">{error}</div>}

            <button type="button" className="enquiry-send-btn" onClick={handleSubmit}>
              <i className="fab fa-whatsapp"></i> Send via WhatsApp
            </button>
            <p className="enquiry-note">
              <i className="fas fa-lock"></i> Your info is only shared with our store via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
