import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../services/storeContext';
import { FALLBACK_CATEGORIES } from '../services/api';
import AnnouncementBar from './AnnouncementBar';

export default function Header() {
  const {
    cartCount,
    user,
    handleLogout,
    setIsQuickEnquiryOpen,
    setIsStoreMapOpen,
    setIsSideDrawerOpen
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchInputRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click for profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setIsSearchActive(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleSearch = (e) => {
    e.stopPropagation();
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  return (
    <header id="site-header" className={isScrolled ? 'scrolled' : ''} role="banner">
      <AnnouncementBar />

      <nav>
        <div
          className="header-inner"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
            padding: '0 40px'
          }}
        >
          {/* Left: Menu + Logo */}
          <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              className="all-menu-btn"
              id="all-menu-btn"
              aria-label="Open Menu"
              aria-expanded="false"
              onClick={() => setIsSideDrawerOpen(true)}
            >
              <span className="hamburger-lines">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className="all-label">All</span>
            </button>

            <Link to="/" className="header-logo">
              <div className="logo-icon">🕉️</div>
              <div className="logo-text">
                <span className="logo-name">Sri Manikanta</span>
                <span className="logo-sub" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>
                  Pooja Stores
                </span>
                <span className="logo-sub" style={{ marginTop: '2px' }}>
                  Kapra, Malkajgiri, Hyderabad
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="header-nav" style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Shop
            </NavLink>
            <a
              href="#store-map"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                setIsStoreMapOpen(true);
              }}
            >
              Visit Store
            </a>

            {/* Categories Dropdown */}
            <div className="nav-dropdown">
              <Link to="/shop" className="nav-link">
                Categories <i className="fas fa-chevron-down" style={{ fontSize: '10px', marginLeft: '4px' }}></i>
              </Link>
              <div className="dropdown-menu">
                {FALLBACK_CATEGORIES.map((cat) => (
                  <Link key={cat.id} to={`/shop?category=${cat.id}`} className="dropdown-item">
                    {cat.emoji || <i className="fas fa-angle-right"></i>} {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About Us
            </NavLink>
            <NavLink
              to="/reviews"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ color: '#FFD700', fontWeight: 700 }}
            >
              <i className="fas fa-star" style={{ fontSize: '11px', marginRight: '4px' }}></i>
              Review Us
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact Us
            </NavLink>
          </div>

          {/* Right: Actions */}
          <div
            className={`header-actions ${isSearchActive ? 'search-open' : ''}`}
            style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}
          >
            {/* Quick Enquiry Button */}
            <button
              type="button"
              className="header-enquiry-btn"
              onClick={() => setIsQuickEnquiryOpen(true)}
              title="Quick Enquiry on WhatsApp"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <i className="fab fa-whatsapp"></i>
              <span>Quick Enquiry</span>
            </button>

            {/* Search Input and Toggle */}
            <div className={`header-search-wrap ${isSearchActive ? 'active' : ''}`} id="search-wrap">
              <button
                className="header-search-btn"
                id="search-toggle"
                title="Search"
                onClick={toggleSearch}
                aria-label="Toggle Search"
              >
                <i className="fas fa-search"></i>
              </button>
              <input
                ref={searchInputRef}
                type="text"
                className="header-search-input"
                id="header-search"
                placeholder="Search products…"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
              />
            </div>

            {/* Cart Button */}
            <Link to="/cart" className="cart-btn" title="Cart" aria-label="Cart">
              <i className="fas fa-shopping-bag"></i>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>

            {/* Profile / Account Dropdown */}
            <div
              ref={profileDropdownRef}
              className={`nav-dropdown ${isProfileOpen ? 'open' : ''}`}
              id="header-profile-dropdown"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <button
                type="button"
                className="cart-btn"
                style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}
                title="Account"
                aria-label="Account"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                }}
              >
                <i className="fas fa-user-circle" style={{ fontSize: '20px' }}></i>
              </button>
              <div className="dropdown-menu" style={{ left: 'auto', right: 0, transform: 'translateY(10px)' }}>
                <div
                  style={{
                    padding: '10px 16px',
                    borderBottom: '1px solid var(--border-light)',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: 'var(--maroon)'
                  }}
                >
                  {user ? `Hello, ${user.full_name.split(' ')[0]}` : 'Hello, Guest'}
                </div>
                {user ? (
                  <>
                    <Link to="/account" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                      <i className="fas fa-id-card"></i> My Profile
                    </Link>
                    <Link to="/account?tab=orders" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                      <i className="fas fa-box"></i> My Orders
                    </Link>
                    <button
                      type="button"
                      className="dropdown-item"
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                      <i className="fas fa-sign-in-alt"></i> Sign In
                    </Link>
                    <Link to="/register" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                      <i className="fas fa-user-plus"></i> Register
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`hamburger ${isMobileNavOpen ? 'open' : ''}`}
              id="hamburger"
              aria-label="Menu"
              aria-expanded={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav ${isMobileNavOpen ? 'open' : ''}`} id="mobile-nav">
          <Link to="/" onClick={() => setIsMobileNavOpen(false)}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/shop" onClick={() => setIsMobileNavOpen(false)}>
            <i className="fas fa-store"></i> Shop
          </Link>
          <a
            href="#store-map"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileNavOpen(false);
              setIsStoreMapOpen(true);
            }}
          >
            <i className="fas fa-map-marker-alt"></i> Visit Store
          </a>
          <Link to="/reviews" onClick={() => setIsMobileNavOpen(false)} style={{ color: '#FFD700' }}>
            <i className="fas fa-star"></i> Review Us
          </Link>
          <Link to="/about" onClick={() => setIsMobileNavOpen(false)}>
            <i className="fas fa-info-circle"></i> About Us
          </Link>
          <Link to="/contact" onClick={() => setIsMobileNavOpen(false)}>
            <i className="fas fa-phone"></i> Contact Us
          </Link>
          <Link to="/cart" onClick={() => setIsMobileNavOpen(false)}>
            <i className="fas fa-shopping-bag"></i> Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
          {user ? (
            <Link to="/account" onClick={() => setIsMobileNavOpen(false)}>
              <i className="fas fa-user"></i> My Account ({user.full_name.split(' ')[0]})
            </Link>
          ) : (
            <Link to="/login" onClick={() => setIsMobileNavOpen(false)}>
              <i className="fas fa-sign-in-alt"></i> Login / Register
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
