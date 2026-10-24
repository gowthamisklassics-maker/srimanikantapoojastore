import React, { useState, useEffect } from 'react';
import { api, TESTIMONIALS } from '../services/api';
import { useStore } from '../services/storeContext';

export default function Reviews() {
  const { showToast } = useStore();
  const [reviews, setReviews] = useState(TESTIMONIALS);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadReviews() {
      const data = await api.getReviews();
      if (data && data.length) {
        setReviews(data);
      }
    }
    loadReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert('Please enter your name and review message.');
      return;
    }

    const newRev = {
      name,
      location: location || 'Hyderabad',
      rating,
      comment,
      author_avatar: '🙏'
    };

    try {
      await api.submitReview(newRev);
    } catch (err) {
      console.warn('Backend review submit error:', err);
    }

    setReviews([newRev, ...reviews]);
    showToast('Thank you! Your review has been submitted.', 'success');
    setName('');
    setLocation('');
    setComment('');
    setRating(5);
  };

  return (
    <>
      {/* Review Hero */}
      <div className="review-hero" style={{ background: 'linear-gradient(135deg, var(--maroon-dark) 0%, #9b2c2c 50%, #7B1C1C 100%)', padding: '60px 20px 80px', textAlign: 'center', position: 'relative' }}>
        <div className="review-hero-tag" style={{ display: 'inline-block', background: 'rgba(255,140,0,0.2)', border: '1px solid rgba(255,140,0,0.4)', color: '#FFB347', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 18px', borderRadius: '50px', marginBottom: '18px' }}>
          Customer Testimonials
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 48px)', color: 'white', fontWeight: 700, marginBottom: '14px' }}>
          What Devotees Say About <span>Sri Manikanta</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
          Trusted by over 10,000+ families and temple priests across Hyderabad for pure and authentic pooja samagri.
        </p>
        <div className="hero-stars-row" style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '20px 0 0' }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <i key={s} className="fas fa-star" style={{ fontSize: '28px', color: '#FFD700' }}></i>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: '900px', margin: '-40px auto 60px', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        {/* Review Form Card */}
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)',
            marginBottom: '40px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--sand)' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, var(--maroon), #9b2c2c)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '22px'
              }}
            >
              <i className="fas fa-pen-alt"></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--maroon)' }}>
                Write a Review
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                Share your spiritual shopping experience with the devotee community
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Meenakshi Iyer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Your Area / Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Kapra, Malkajgiri"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Rating Stars Picker */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Your Rating *
              </label>
              <div style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className="fas fa-star"
                    style={{
                      fontSize: '24px',
                      color: star <= (hoverRating || rating) ? '#FFD700' : '#ddd',
                      transition: 'color 0.15s'
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  ></i>
                ))}
                <span style={{ marginLeft: '10px', fontWeight: 600, color: 'var(--maroon)' }}>
                  {rating} Star{rating > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Your Experience &amp; Comments *
              </label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="How was the quality of agarbatti, camphor, idols, or delivery service?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              <i className="fas fa-paper-plane"></i> Submit Customer Review
            </button>
          </form>
        </div>

        {/* Existing Reviews List */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', marginBottom: '20px', fontSize: '24px' }}>
            All Devotee Reviews ({reviews.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reviews.map((r, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: 'var(--sand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}
                    >
                      {r.avatar || r.author_avatar || '🙏'}
                    </div>
                    <div>
                      <strong style={{ fontSize: '15px' }}>{r.name || r.author_name}</strong>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: 'var(--saffron)', marginRight: '4px' }}></i>
                        {r.location || r.author_location}
                      </div>
                    </div>
                  </div>

                  <div className="review-stars" style={{ color: '#FFD700', fontSize: '15px' }}>
                    {'★'.repeat(r.rating || 5)}
                    {'☆'.repeat(5 - (r.rating || 5))}
                  </div>
                </div>

                <p style={{ color: 'var(--charcoal)', lineHeight: 1.6, margin: 0, fontSize: '14.5px' }}>
                  "{r.text || r.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
