import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { STORE_DATA } from '../services/api';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: '🌿',
      title: 'Pure & Natural',
      desc: 'We never compromise on purity. All our products are made from natural, traditional ingredients — no synthetic additives, no adulterants.'
    },
    {
      icon: '🏺',
      title: 'Authenticity',
      desc: 'Every product follows traditional Vedic standards. Our rudraksha is genuine, our brass idols are handcrafted, our camphor burns completely clean.'
    },
    {
      icon: '🤝',
      title: 'Community',
      desc: 'We are more than a store — we are part of your spiritual family. We guide you on the right products for every ritual and occasion.'
    },
    {
      icon: '💰',
      title: 'Fair Pricing',
      desc: 'Premium quality at honest prices. We believe devotion should not be expensive. Our direct sourcing ensures you get the best value.'
    },
    {
      icon: '📚',
      title: 'Knowledge',
      desc: 'Our team is knowledgeable about Hindu traditions, festivals and rituals. We help you find exactly what you need for any puja.'
    },
    {
      icon: '🛕',
      title: 'Tradition',
      desc: 'Rooted in Telugu and South Indian traditions, we stock items specific to our regional rituals alongside pan-Indian religious items.'
    }
  ];

  return (
    <>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <h1>About Our Store</h1>
          <p>Serving Devotion Since 2005 — Kapra, Malkajgiri, Hyderabad</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="about-story" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="about-story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <div className="section-tag">Our Story</div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>
                Where <span>Devotion</span>
                <br />
                Meets Tradition
              </h2>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
                Sri Manikanta Pooja Stores was founded with a simple yet sacred mission: to provide every Hindu family in Hyderabad with genuine, pure-quality pooja samagri that truly honors their devotion.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
                Located at P. No. 13, SY No. 58 & 59, Gowrinathpuram, Ph-2, Yellareddyguda, Circle 07 Kapra, Malkajgiri Municipal Corporation, our store has been the trusted source for thousands of families across Hyderabad for all their pooja needs — from daily rituals to grand wedding ceremonies and every festival in between.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '32px' }}>
                We personally source our products from the finest suppliers across India — camphor from Tamil Nadu, pure ghee from desi cow farms, authentic rudraksha from Nepal, and premium agarbatti from Bangalore. Every item on our shelves passes our quality check before reaching you.
              </p>
              <Link to="/shop" className="btn btn-primary btn-lg">
                <i className="fas fa-store"></i> Explore Our Products
              </Link>
            </div>

            <div>
              <div className="about-story-img" style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
                <img src="/images/hero_banner.png" alt="Sri Manikanta Pooja Stores interior" loading="lazy" />
              </div>
              <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="stat-box reveal visible">
                  <div className="stat-num">25+</div>
                  <div className="stat-label">Years Serving Hyderabad</div>
                </div>
                <div className="stat-box reveal visible">
                  <div className="stat-num">500+</div>
                  <div className="stat-label">Products Available</div>
                </div>
                <div className="stat-box reveal visible">
                  <div className="stat-num">10K+</div>
                  <div className="stat-label">Happy Families Served</div>
                </div>
                <div className="stat-box reveal visible">
                  <div className="stat-num">50+</div>
                  <div className="stat-label">Product Categories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section" style={{ padding: '60px 0', background: 'var(--sand)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Our Commitment</div>
            <h2 className="section-title">
              What We <span>Stand For</span>
            </h2>
            <div className="section-divider"></div>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card reveal visible">
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={{ padding: 'var(--sp-16) 0', background: 'var(--maroon)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-tag" style={{ color: 'var(--gold-light)' }}>
            Our Mission
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem,3vw,2.4rem)',
              color: 'var(--white)',
              margin: '16px 0 24px'
            }}
          >
            "Bringing Sacred Traditions to <span style={{ color: 'var(--saffron)' }}>Every Doorstep</span>"
          </h2>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '640px',
              margin: '0 auto 40px',
              lineHeight: 1.8
            }}
          >
            We believe every prayer is sacred, every ritual is meaningful, and every family deserves
            access to pure, authentic pooja samagri that truly connects them with the divine.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              <i className="fas fa-phone-alt"></i> Get in Touch
            </Link>
            <a
              href={STORE_DATA.whatsappGroup}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <i className="fab fa-whatsapp"></i> Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>

      {/* Inside Store Gallery */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Store Gallery</div>
            <h2 className="section-title">
              Inside Our <span>Pooja Store</span>
            </h2>
            <div className="section-divider"></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="gallery-item reveal visible"
                style={{ borderRadius: '16px', overflow: 'hidden', height: '220px' }}
              >
                <img
                  src={`/images/store_${num}.webp`}
                  alt={`Store View ${num}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/images/store_${num}.jpg`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
