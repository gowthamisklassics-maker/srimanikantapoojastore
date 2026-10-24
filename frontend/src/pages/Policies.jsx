import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Policies() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let title = 'Privacy Policy';
  if (pathname.includes('terms')) title = 'Terms & Conditions';
  if (pathname.includes('shipping')) title = 'Shipping & Delivery Policy';

  return (
    <>
      <div className="page-banner" style={{ padding: 'var(--sp-6) 0 var(--sp-5)' }}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{title}</span>
          </div>
        </div>
      </div>

      <main style={{ padding: '60px 0 100px' }}>
        <div className="container" style={{ maxWidth: '840px', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', marginBottom: '24px' }}>
            {title}
          </h1>

          {pathname.includes('shipping') ? (
            <div style={{ lineHeight: 1.8, color: 'var(--charcoal)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>At Sri Manikanta Pooja Stores, we understand the importance of timely delivery for your sacred rituals and festive celebrations.</p>
              <h3 style={{ color: 'var(--maroon)' }}>Delivery Areas</h3>
              <p>We deliver all pooja samagri, idol kits, agarbatti, and festival essentials throughout Hyderabad and Secunderabad, including Kapra, Malkajgiri, Yellareddyguda, ECIL, AS Rao Nagar, and surrounding areas.</p>
              <h3 style={{ color: 'var(--maroon)' }}>Delivery Charges &amp; Free Delivery</h3>
              <p>• Orders within 5km radius or orders above <strong>₹5,000</strong> receive <strong>FREE Home Delivery</strong>.</p>
              <p>• For other areas in Hyderabad, a nominal standard delivery fee of ₹50 applies.</p>
              <h3 style={{ color: 'var(--maroon)' }}>Same-Day Delivery</h3>
              <p>Same-day delivery is available for orders placed before 3:00 PM in Kapra, Malkajgiri and nearby localities. Special festival deliveries can be scheduled directly over WhatsApp at +91 80745 95152.</p>
            </div>
          ) : pathname.includes('terms') ? (
            <div style={{ lineHeight: 1.8, color: 'var(--charcoal)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>Welcome to Sri Manikanta Pooja Stores. By browsing or purchasing from our website and physical store in Kapra, Malkajgiri, you agree to the following terms and conditions:</p>
              <h3 style={{ color: 'var(--maroon)' }}>1. Product Authenticity</h3>
              <p>Every product sold is 100% natural, pure and authentic as per traditional Vedic Hindu customs. We source direct from reputed craftsmen and manufacturers across India.</p>
              <h3 style={{ color: 'var(--maroon)' }}>2. Pricing &amp; Availability</h3>
              <p>Prices are in Indian Rupees (INR) inclusive of applicable taxes. In rare events of stock fluctuations, we will notify you promptly via phone or WhatsApp.</p>
              <h3 style={{ color: 'var(--maroon)' }}>3. Returns &amp; Replacements</h3>
              <p>Any defective or damaged items reported within 3 days of delivery will be replaced or refunded with utmost devotion to customer satisfaction.</p>
            </div>
          ) : (
            <div style={{ lineHeight: 1.8, color: 'var(--charcoal)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>Sri Manikanta Pooja Stores respects your privacy and is committed to protecting your personal data.</p>
              <h3 style={{ color: 'var(--maroon)' }}>Information We Collect</h3>
              <p>We only collect the essential details needed to fulfill your orders and contact you regarding deliveries, including name, phone number, address, and email.</p>
              <h3 style={{ color: 'var(--maroon)' }}>Data Protection</h3>
              <p>We never sell, rent, or share your information with any third-party marketing agencies. All communications are strictly related to your pooja purchases and spiritual community updates.</p>
              <h3 style={{ color: 'var(--maroon)' }}>Contact Us</h3>
              <p>For any questions regarding our privacy practices, contact us at <strong>+91 80745 95152</strong> or visit our Kapra, Malkajgiri store.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
