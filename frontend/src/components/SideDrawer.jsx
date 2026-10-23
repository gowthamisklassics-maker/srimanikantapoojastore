import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../services/storeContext';

export default function SideDrawer() {
  const {
    isSideDrawerOpen,
    setIsSideDrawerOpen,
    setIsQuickEnquiryOpen,
    user,
    handleLogout,
    cartCount
  } = useStore();

  if (!isSideDrawerOpen) return null;

  const close = () => setIsSideDrawerOpen(false);

  return (
    <>
      <div className="side-drawer-backdrop open" onClick={close}></div>
      <div className="side-drawer open" role="navigation" aria-label="Side Navigation">
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-user">
            <div className="drawer-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div>
              <div className="drawer-hello">
                {user ? `Hello, ${user.full_name.split(' ')[0]}!` : 'Hello, Guest'}
              </div>
              {user ? (
                <Link to="/account" className="drawer-signin-link" onClick={close}>
                  View Profile &rsaquo;
                </Link>
              ) : (
                <Link to="/login" className="drawer-signin-link" onClick={close}>
                  Sign In &rsaquo;
                </Link>
              )}
            </div>
          </div>
          <button className="drawer-close" onClick={close} aria-label="Close Menu">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Shop By Category */}
        <div className="drawer-section">
          <div className="drawer-section-title">
            <i className="fas fa-th-large"></i> Shop By Category
          </div>
          <Link to="/shop" className="drawer-link" onClick={close}>
            <i className="fas fa-store"></i> All Products
          </Link>
          <Link to="/shop?category=agarbatti" className="drawer-link" onClick={close}>
            <i className="fas fa-fire"></i> Agarbatti &amp; Incense
          </Link>
          <Link to="/shop?category=camphor" className="drawer-link" onClick={close}>
            <i className="fas fa-fire-alt"></i> Camphor (Kapoor)
          </Link>
          <Link to="/shop?category=kumkum" className="drawer-link" onClick={close}>
            <i className="fas fa-tint"></i> Kumkum &amp; Haldi
          </Link>
          <Link to="/shop?category=diyas" className="drawer-link" onClick={close}>
            <i className="fas fa-star"></i> Diyas &amp; Lamps
          </Link>
          <Link to="/shop?category=photos" className="drawer-link" onClick={close}>
            <i className="fas fa-image"></i> God Photos &amp; Frames
          </Link>
          <Link to="/shop?category=idols" className="drawer-link" onClick={close}>
            <i className="fas fa-ring"></i> Idols (Vigrahas)
          </Link>
          <Link to="/shop?category=thali" className="drawer-link" onClick={close}>
            <i className="fas fa-utensils"></i> Puja Thali &amp; Vessels
          </Link>
          <Link to="/shop?category=malas" className="drawer-link" onClick={close}>
            <i className="fas fa-seedling"></i> Malas &amp; Garlands
          </Link>
          <Link to="/shop?category=havan" className="drawer-link" onClick={close}>
            <i className="fas fa-fire"></i> Havan Samagri
          </Link>
          <Link to="/shop?category=festivals" className="drawer-link" onClick={close}>
            <i className="fas fa-calendar-alt"></i> Festival Kits
          </Link>
          <Link to="/shop?category=wedding" className="drawer-link" onClick={close}>
            <i className="fas fa-heart"></i> Wedding Items
          </Link>
        </div>

        {/* My Account */}
        <div className="drawer-section">
          <div className="drawer-section-title">
            <i className="fas fa-user"></i> My Account
          </div>
          <Link to="/account" className="drawer-link" onClick={close}>
            <i className="fas fa-id-card"></i> Profile
          </Link>
          <Link to="/account?tab=orders" className="drawer-link" onClick={close}>
            <i className="fas fa-box"></i> My Orders
          </Link>
          <Link to="/shop?tab=wishlist" className="drawer-link" onClick={close}>
            <i className="fas fa-heart"></i> Wishlist
          </Link>
        </div>

        {/* Help & Settings */}
        <div className="drawer-section">
          <div className="drawer-section-title">
            <i className="fas fa-headset"></i> Help &amp; Settings
          </div>
          <Link to="/contact" className="drawer-link" onClick={close}>
            <i className="fas fa-phone-alt"></i> Contact Us
          </Link>
          <button
            type="button"
            className="drawer-link"
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => {
              close();
              setIsQuickEnquiryOpen(true);
            }}
          >
            <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i> Quick Enquiry
          </button>
          <Link to="/reviews" className="drawer-link" onClick={close}>
            <i className="fas fa-star" style={{ color: '#FFD700' }}></i> Customer Reviews
          </Link>
          <Link to="/about" className="drawer-link" onClick={close}>
            <i className="fas fa-info-circle"></i> About Our Store
          </Link>
        </div>

        {/* Bottom Actions */}
        <div className="drawer-bottom">
          <Link to="/cart" className="drawer-bottom-btn" onClick={close}>
            <i className="fas fa-shopping-bag"></i>
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-count drawer-cart-count">{cartCount}</span>}
          </Link>
          {user ? (
            <button
              type="button"
              className="drawer-bottom-btn"
              onClick={() => {
                handleLogout();
                close();
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="drawer-bottom-btn" onClick={close}>
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
