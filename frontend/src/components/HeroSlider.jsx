import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES } from '../services/api';
import { useStore } from '../services/storeContext';

export default function HeroSlider() {
  const { setIsStoreMapOpen } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const SLIDE_DURATION = 3500;

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
      void progressRef.current.offsetWidth;
      progressRef.current.style.transition = `width ${SLIDE_DURATION}ms linear`;
      progressRef.current.style.width = '100%';
    }

    timerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlide, isPaused]);

  const goToSlide = (n) => {
    setCurrentSlide(n);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      className="hero"
      id="hero-slider"
      aria-label="Hero Banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={idx}
            className={`hero-slide ${isActive ? 'active' : ''}`}
            id={`slide-${idx}`}
          >
            <picture>
              {slide.mobileImage && (
                <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
              )}
              <img
                src={slide.image}
                alt={slide.tag}
                loading={idx === 0 ? 'eager' : 'lazy'}
                width="1920"
                height="800"
                decoding="async"
              />
            </picture>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="container">
                <div className="hero-text">
                  <div className="hero-tag">
                    <i className="fas fa-om"></i> {slide.tag}
                  </div>
                  <h1 className="hero-title">
                    {slide.title.includes(slide.highlight) ? (
                      <>
                        {slide.title.split(slide.highlight)[0]}
                        <span className="highlight">{slide.highlight}</span>
                        {slide.title.split(slide.highlight)[1]}
                      </>
                    ) : (
                      slide.title
                    )}
                  </h1>
                  <p className="hero-desc">{slide.desc}</p>
                  <div className="hero-actions">
                    <Link to={slide.btn1.href} className={`btn ${slide.btn1.class}`}>
                      {slide.btn1.text} <i className="fas fa-arrow-right"></i>
                    </Link>
                    {slide.btn2.isMap ? (
                      <button
                        type="button"
                        className={`btn ${slide.btn2.class}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsStoreMapOpen(true);
                        }}
                      >
                        {slide.btn2.text}
                      </button>
                    ) : (
                      <Link to={slide.btn2.href} className={`btn ${slide.btn2.class}`}>
                        {slide.btn2.text}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-badge">
              <div className="hero-badge-num">{slide.badge.num}</div>
              <div className="hero-badge-label">{slide.badge.label}</div>
            </div>
          </div>
        );
      })}

      {/* Progress Bar */}
      <div className="hero-progress-bar" id="hero-progress" ref={progressRef}></div>

      {/* Slide Navigation Dots */}
      <div className="hero-dots" id="hero-dots" role="tablist" aria-label="Slide navigation">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goToSlide(i)}
          ></button>
        ))}
      </div>

      {/* Slide Navigation Arrows */}
      <div className="hero-arrows">
        <button
          className="hero-arrow"
          id="hero-prev"
          aria-label="Previous slide"
          onClick={prevSlide}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="hero-arrow"
          id="hero-next"
          aria-label="Next slide"
          onClick={nextSlide}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
