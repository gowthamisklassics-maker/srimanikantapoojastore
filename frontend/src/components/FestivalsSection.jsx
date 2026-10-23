import React from 'react';
import { Link } from 'react-router-dom';
import { FESTIVALS } from '../services/api';

export default function FestivalsSection() {
  return (
    <section className="festivals-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Festival Season</div>
          <h2 className="section-title">
            Shop by <span>Festival</span>
          </h2>
          <p className="section-subtitle">
            Find everything you need for every Hindu festival — from Vinayaka Chavithi to Diwali to Ugadi
          </p>
        </div>

        <div className="festivals-grid" id="festivals-grid">
          {FESTIVALS.map((f, i) => (
            <Link
              key={i}
              to={`/shop?category=${f.cat}`}
              className="festival-card reveal visible"
            >
              <div
                className="festival-img"
                style={{
                  background: `url('${f.image}') center/cover no-repeat`
                }}
              >
                <div className="festival-overlay"></div>
              </div>
              <div className="festival-body">
                <div className="festival-name">{f.name}</div>
                <div className="festival-date" style={{ fontFamily: 'var(--font-telugu)' }}>
                  {f.telugu}
                </div>
                <div className="festival-date">
                  <i
                    className="fas fa-calendar-alt"
                    style={{ color: 'var(--saffron)', marginRight: '4px' }}
                  ></i>
                  {f.date}
                </div>
                <div className="festival-tag">Shop Festival Items →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
