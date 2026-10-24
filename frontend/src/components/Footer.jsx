import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../services/storeContext';

export default function Footer() {
  const { storeInfo } = useStore();

  return (
    <footer id="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Story */}
          <div className="footer-brand">
            <span className="logo-name">🕉️ Sri Manikanta Pooja Stores</span>
            <p className="footer-tagline">
              Your trusted source for authentic Hindu pooja samagri in Hyderabad since 2005.
              Where Devotion Meets Tradition — serving thousands of families across Kapra, Malkajgiri, Hyderabad
              with pure, premium religious items for every occasion.
            </p>
            <div className="footer-socials">
              <a
                href={storeInfo.instagram}
                target="_blank"
                rel="noreferrer"
                className="social-link instagram"
                title="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href={storeInfo.whatsappGroup}
                target="_blank"
                rel="noreferrer"
                className="social-link whatsapp"
                title="WhatsApp Community"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href={`tel:${storeInfo.phones[0]}`}
                className="social-link call"
                title="Call Us"
              >
                <i className="fas fa-phone-alt"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/reviews" style={{ color: '#FFD700' }}>⭐ Review Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/shop?category=agarbatti">Agarbatti &amp; Incense</Link></li>
              <li><Link to="/shop?category=camphor">Camphor (Kapoor)</Link></li>
              <li><Link to="/shop?category=kumkum">Kumkum &amp; Haldi</Link></li>
              <li><Link to="/shop?category=diyas">Diyas &amp; Lamps</Link></li>
              <li><Link to="/shop?category=idols">Idols &amp; Vigrahas</Link></li>
              <li><Link to="/shop?category=festivals">Festival Kits</Link></li>
              <li><Link to="/shop?category=wedding">Wedding Items</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact-list">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{storeInfo.address}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <span>
                  {storeInfo.phones.map((phone, idx) => (
                    <React.Fragment key={idx}>
                      <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                      {idx < storeInfo.phones.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>
                  Mon–Sat: {storeInfo.hours.weekdays}<br />
                  Sunday: {storeInfo.hours.sunday}<br />
                  <span style={{ color: 'var(--saffron)', fontWeight: 600 }}>
                    🎉 Festivals: {storeInfo.hours.festivals}
                  </span>
                </span>
              </div>
            </div>
            <a
              href={storeInfo.whatsappGroup}
              target="_blank"
              rel="noreferrer"
              className="footer-whatsapp-btn"
            >
              <i className="fab fa-whatsapp"></i> Join WhatsApp Community
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <span>© 2005–2025 Sri Manikanta Pooja Stores, Hyderabad. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/shipping">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
