import React from 'react';
import { useStore } from '../services/storeContext';

export default function FeaturesBar() {
  const { storeStatus } = useStore();

  return (
    <div className="features-bar">
      <div className="container">
        <div
          className="features-bar-grid"
          style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
        >
          {/* Live Store Status Pill */}
          <div className="feature-item store-status-pill">
            <div
              className="feature-icon"
              style={{
                background: `${storeStatus.color}22`,
                color: storeStatus.color
              }}
            >
              <i className={`fas fa-${storeStatus.open ? 'door-open' : 'door-closed'}`}></i>
            </div>
            <div className="feature-text">
              <strong style={{ color: storeStatus.color }}>{storeStatus.label}</strong>
              <small>{storeStatus.detail}</small>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="feature-text">
              <strong>100% Natural &amp; Pure</strong>
              <small>No artificial additives</small>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <i className="fas fa-truck"></i>
            </div>
            <div className="feature-text">
              <strong>Home Delivery</strong>
              <small>Free above ₹5000 or within 5km</small>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <i className="fab fa-whatsapp"></i>
            </div>
            <div className="feature-text">
              <strong>WhatsApp Orders</strong>
              <small>Order &amp; track easily</small>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <i className="fas fa-medal"></i>
            </div>
            <div className="feature-text">
              <strong>25+ Years Experience</strong>
              <small>Trusted by thousands</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
