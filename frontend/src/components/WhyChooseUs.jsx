import React from 'react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: 'fas fa-award',
      title: 'Premium Quality',
      desc: 'Every product is carefully sourced and quality-checked. We sell only pure, authentic items — no adulteration, no compromise.'
    },
    {
      icon: 'fas fa-boxes',
      title: 'Vast Selection',
      desc: '500+ products across 12 categories. From daily puja essentials to complete wedding samagri — everything under one roof.'
    },
    {
      icon: 'fas fa-hand-holding-heart',
      title: 'Expert Guidance',
      desc: 'Our knowledgeable team can guide you on the right items for any puja, ritual or festival. Just call or WhatsApp us!'
    },
    {
      icon: 'fas fa-truck-fast',
      title: 'Fast Delivery',
      desc: 'Same-day delivery within Kapra, Malkajgiri and nearby areas. Next-day delivery across Hyderabad on all orders above ₹599.'
    },
    {
      icon: 'fas fa-rupee-sign',
      title: 'Best Prices',
      desc: 'Direct sourcing from manufacturers ensures you get the best quality at the most competitive prices in Hyderabad.'
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'Easy WhatsApp Orders',
      desc: "Simply WhatsApp us your requirement and we'll confirm your order instantly. No complex checkout — just devotion made easy!"
    }
  ];

  return (
    <section className="why-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ color: 'var(--gold-light)' }}>
            Our Promise
          </div>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>
            Why Choose <span style={{ color: 'var(--saffron)' }}>Us?</span>
          </h2>
        </div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <div key={i} className="why-card reveal visible">
              <div className="why-icon">
                <i className={r.icon}></i>
              </div>
              <h3 className="why-title">{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
