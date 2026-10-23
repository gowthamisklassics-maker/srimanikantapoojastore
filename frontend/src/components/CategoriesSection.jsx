import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, FALLBACK_CATEGORIES } from '../services/api';

export default function CategoriesSection() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);

  useEffect(() => {
    async function load() {
      const data = await api.getCategories();
      if (data && data.length) {
        setCategories(data);
      }
    }
    load();
  }, []);

  return (
    <section className="categories-section" id="categories">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Browse by Category</div>
          <h2 className="section-title">
            All <span>Pooja Categories</span>
          </h2>
          <p className="section-subtitle">
            From daily puja essentials to complete festival kits — we have everything you need for your spiritual journey
          </p>
        </div>
        <div className="categories-grid" id="categories-grid">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/shop?category=${c.id}`}
              className="category-card-sm reveal visible"
              id={`cat-${c.id}`}
            >
              <img
                src={c.img}
                alt={c.name}
                className="cat-sm-img"
                loading="lazy"
                width="300"
                height="300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/cat_other.webp';
                }}
              />
              <div className="cat-sm-name">{c.name}</div>
              <div className="cat-sm-count">{c.count || 0} items</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
