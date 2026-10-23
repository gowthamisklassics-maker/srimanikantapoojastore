import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
      <div className="container">
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🕉️</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', fontSize: '48px', marginBottom: '16px' }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '500px', margin: '0 auto 30px' }}>
          The page you are looking for might have been moved or is unavailable. Explore our sacred pooja items instead.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <i className="fas fa-home"></i> Go Home
          </Link>
          <Link to="/shop" className="btn btn-secondary btn-lg">
            <i className="fas fa-store"></i> Shop Products
          </Link>
        </div>
      </div>
    </main>
  );
}
