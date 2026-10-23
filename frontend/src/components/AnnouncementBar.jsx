import React from 'react';

export default function AnnouncementBar() {
  const tickerItems = [
    '📞 Call us: +91 91105 82086 | +91 98499 85423 | +91 91828 14818',
    '🚚 Home Delivery — Free above ₹5000 or within 5km',
    '💬 WhatsApp us: +91 91105 82086 | +91 90147 58196',
    '🌿 100% Natural & Pure Ingredients',
    '🛒 Wholesale items available at best prices',
    '⭐ Best Quality Guaranteed on all products',
    '💰 Affordable prices — Unbeatable value',
    '🎁 Special festival offers available in store'
  ];

  const fullTicker = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker-bar" role="region" aria-label="Store Announcement">
      <div className="ticker-inner">
        {fullTicker.map((item, idx) => (
          <span className="ticker-item" key={idx}>
            <i className="fas fa-om" style={{ marginRight: '6px' }}></i>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
