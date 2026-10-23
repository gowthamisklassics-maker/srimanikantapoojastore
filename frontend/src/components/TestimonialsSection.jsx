import React, { useState, useEffect } from 'react';
import { api, TESTIMONIALS } from '../services/api';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState(TESTIMONIALS);

  useEffect(() => {
    async function load() {
      const data = await api.getReviews();
      if (data && data.length) {
        setReviews(data);
      }
    }
    load();
  }, []);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Happy Devotees</div>
          <h2 className="section-title">
            What Our <span>Customers Say</span>
          </h2>
        </div>

        <div className="testimonials-grid" id="testimonials-grid">
          {reviews.map((t, idx) => (
            <div key={idx} className="testimonial-card reveal visible">
              <div className="review-stars">
                {'★'.repeat(t.rating)}
                {'☆'.repeat(5 - t.rating)}
              </div>
              <p className="testimonial-text">"{t.text || t.comment}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.avatar || t.author_avatar || '🙏'}</div>
                <div>
                  <div className="author-name">{t.name || t.author_name}</div>
                  <div className="author-loc">
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: 'var(--saffron)', fontSize: '10px' }}
                    ></i>{' '}
                    {t.location || t.author_location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
