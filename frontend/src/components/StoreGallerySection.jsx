import React, { useState } from 'react';
import { STORE_GALLERY } from '../services/api';

export default function StoreGallerySection() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Our Store</div>
          <h2 className="section-title">
            Sri Manikanta <span>Pooja Stores</span>
          </h2>
          <div className="section-divider"></div>
        </div>

        <div className="gallery-grid" id="gallery-grid">
          {STORE_GALLERY.map((img, i) => (
            <div
              key={i}
              className="gallery-item reveal visible"
              onClick={() => setActiveImage(img)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/store_exterior_1.webp';
                }}
              />
              <div className="gallery-overlay">
                <i className="fas fa-expand-arrows-alt"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          id="gallery-modal"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
          onClick={() => setActiveImage(null)}
        >
          <img
            id="gallery-modal-img"
            src={activeImage.src}
            alt={activeImage.alt}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '12px',
              objectFit: 'contain',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
            }}
          />
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'white',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </section>
  );
}
