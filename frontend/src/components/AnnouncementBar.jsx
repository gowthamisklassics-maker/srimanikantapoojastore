import React from 'react';

export default function AnnouncementBar() {
  const tickerItems = [
    '📞 Call us: +91 80745 95152',
    '🚚 Home Delivery — Free above ₹5000 or within 5km',
    '💬 WhatsApp us: +91 80745 95152',
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
