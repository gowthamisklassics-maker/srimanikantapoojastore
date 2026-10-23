import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../services/storeContext';

export default function FloatingActions() {
  const { storeInfo, cartCount } = useStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="floating-actions">
        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${storeInfo.whatsapp2}?text=Hello!%20I%20visited%20your%20website%20and%20need%20help%20with%20pooja%20items.`}
          target="_blank"
          rel="noreferrer"
          className="float-btn float-btn-whatsapp"
          title="Chat with us"
        >
          <i className="fab fa-whatsapp"></i>
          <span className="float-btn-label">Chat with us</span>
        </a>

        {/* Call Us */}
        <a
          href={`tel:${storeInfo.phones[1] || storeInfo.phones[0]}`}
          className="float-btn float-btn-call"
          title="Call us now"
        >
          <i className="fas fa-phone-alt"></i>
          <span className="float-btn-label">Call us now</span>
        </a>

        {/* WhatsApp Community */}
        <a
          href={storeInfo.whatsappGroup}
          target="_blank"
          rel="noreferrer"
          className="float-btn float-btn-community"
          title="Join our WhatsApp community"
          style={{ backgroundColor: '#25D366', color: 'white' }}
        >
          <i className="fas fa-users"></i>
          <span className="float-btn-label">Join our WhatsApp community</span>
        </a>

        {/* Scroll To Top */}
        <button
          type="button"
          className="float-btn float-btn-top"
          id="scroll-top"
          title="Back to top"
          style={{
            opacity: showScrollTop ? 1 : 0,
            pointerEvents: showScrollTop ? 'auto' : 'none',
            transition: 'opacity 0.3s'
          }}
          onClick={scrollToTop}
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      </div>

      {/* Floating Cart Button on Left Side */}
      <Link to="/cart" className="floating-cart-btn" id="floating-cart-btn" title="View Cart">
        <i className="fas fa-shopping-cart"></i>
        <span
          className="floating-cart-count"
          id="floating-cart-count"
          style={{ display: cartCount > 0 ? 'flex' : 'none' }}
        >
          {cartCount}
        </span>
        <span className="floating-cart-label">Cart</span>
      </Link>
    </>
  );
}
