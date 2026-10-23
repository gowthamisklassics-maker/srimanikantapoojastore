import React from 'react';
import { useStore } from '../services/storeContext';

export default function WhatsAppCommunityBanner() {
  const { storeInfo } = useStore();

  return (
    <section className="cta-section">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2>Join Our WhatsApp Community</h2>
        <p>
          Get daily puja tips, festival reminders, exclusive offers and wholesale deals directly on WhatsApp!
        </p>
        <div className="cta-actions">
          <a
            href={storeInfo.whatsappGroup}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp btn-lg"
          >
            <i className="fab fa-whatsapp"></i> Join WhatsApp Community
          </a>
          <a
            href={storeInfo.instagram}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-lg"
            style={{ borderColor: 'white', color: 'white' }}
          >
            <i className="fab fa-instagram"></i> Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
