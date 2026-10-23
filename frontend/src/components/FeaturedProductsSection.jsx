import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { api, FALLBACK_PRODUCTS } from '../services/api';

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);

  useEffect(() => {
    async function load() {
      const data = await api.getProducts({ sort: 'popular' });
      if (data && data.length) {
        setProducts(data);
      }
    }
    load();
  }, []);

  return (
    <section className="products-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Most Loved</div>
          <h2 className="section-title">
            Best <span>Selling Items</span>
          </h2>
        </div>

        <div className="products-grid" id="featured-products">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '40px',
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Link to="/shop" className="btn btn-secondary btn-lg">
            <i className="fas fa-store"></i> View All Products
          </Link>
          <a
            href="#categories"
            className="btn btn-secondary btn-lg"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('categories');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <i className="fas fa-th-large"></i> View Categories
          </a>
        </div>
      </div>
    </section>
  );
}
