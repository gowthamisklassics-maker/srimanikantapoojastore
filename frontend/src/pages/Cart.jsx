import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../services/storeContext';

export default function Cart() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartOriginalTotal,
    cartDiscount,
    deliveryFee,
    cartGrandTotal,
    removeFromCart,
    updateCartQty,
    clearCart
  } = useStore();

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const code = promoCode.trim().toUpperCase();
    if (code === 'POOJA10' || code === 'FIRST10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setPromoDiscount(disc);
      setPromoMsg(`✅ 10% Discount applied! (₹${disc} off)`);
    } else if (code === 'DIVINE') {
      const disc = 50;
      setPromoDiscount(disc);
      setPromoMsg(`✅ ₹50 Divine discount applied!`);
    } else {
      setPromoDiscount(0);
      setPromoMsg('❌ Invalid or expired coupon code.');
    }
  };

  const finalTotal = Math.max(0, cartGrandTotal - promoDiscount);

  if (cart.length === 0) {
    return (
      <main style={{ padding: '60px 0 100px', minHeight: '60vh' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', marginBottom: '12px' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            Looks like you haven't added any pooja samagri to your cart yet.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            <i className="fas fa-store"></i> Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <div className="page-banner" style={{ padding: 'var(--sp-6) 0 var(--sp-5)' }}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Shopping Cart</span>
          </div>
        </div>
      </div>

      <main style={{ padding: '40px 0 80px' }}>
        <div className="container">
          {/* Progress Steps Header */}
          <div className="cart-steps">
            <div className="cart-step active">
              <div className="step-num">1</div>
              <span>Cart</span>
            </div>
            <div className="cart-step-line"></div>
            <div className="cart-step">
              <div className="step-num">2</div>
              <span>Delivery</span>
            </div>
            <div className="cart-step-line"></div>
            <div className="cart-step">
              <div className="step-num">3</div>
              <span>Payment</span>
            </div>
            <div className="cart-step-line"></div>
            <div className="cart-step">
              <div className="step-num">4</div>
              <span>Confirmation</span>
            </div>
          </div>

          {/* Cart Grid Layout */}
          <div className="ck-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px' }}>
            {/* Items Column */}
            <div>
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--maroon)', margin: 0 }}>
                    Cart Items ({cartCount})
                  </h2>
                  <button
                    type="button"
                    onClick={clearCart}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-error)',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    <i className="fas fa-trash-alt"></i> Clear Cart
                  </button>
                </div>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {cart.map((item) => (
                    <div
                      key={item.key}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr auto auto',
                        gap: '16px',
                        alignItems: 'center',
                        paddingBottom: '18px',
                        borderBottom: '1px solid #f5f5f5'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          border: '1px solid #eee'
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/1000090825.jpg';
                        }}
                      />

                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: '15px' }}>
                          <Link to={`/product/${item.id}`} style={{ color: 'inherit' }}>
                            {item.name}
                          </Link>
                        </h4>
                        {item.variant && (
                          <span
                            style={{
                              display: 'inline-block',
                              background: '#fff7ed',
                              color: 'var(--saffron-dark)',
                              fontSize: '12px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: 600
                            }}
                          >
                            Size: {item.variant}
                          </span>
                        )}
                        <div style={{ marginTop: '6px', fontWeight: 600, color: 'var(--maroon)' }}>
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div className="qty-control" style={{ transform: 'scale(0.9)' }}>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateCartQty(item.key, item.qty - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="qty-input"
                          value={item.qty}
                          min="1"
                          onChange={(e) => updateCartQty(item.key, Number(e.target.value))}
                        />
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateCartQty(item.key, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal & Delete */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>
                          ₹{item.price * item.qty}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.key)}
                          title="Remove item"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#999',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <Link to="/shop" className="btn btn-outline btn-sm">
                    <i className="fas fa-arrow-left"></i> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary Column */}
            <div>
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-light)',
                  position: 'sticky',
                  top: '90px'
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--maroon)',
                    marginBottom: '18px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Items Subtotal</span>
                    <span>₹{cartSubtotal}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                      <span>Catalog Savings</span>
                      <span>-₹{cartDiscount}</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                      <span>Coupon Discount</span>
                      <span>-₹{promoDiscount}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                  </div>

                  {deliveryFee === 0 ? (
                    <small style={{ color: 'var(--color-success)' }}>
                      🎉 Free Delivery applied (Order ₹5000+ or within 5km)
                    </small>
                  ) : (
                    <small style={{ color: 'var(--text-muted)' }}>
                      Add ₹{5000 - cartSubtotal} more for Free Delivery
                    </small>
                  )}

                  <div
                    style={{
                      borderTop: '2px solid #eee',
                      paddingTop: '14px',
                      marginTop: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--maroon)'
                    }}
                  >
                    <span>Total Amount</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Coupon (e.g. POOJA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        border: '1.5px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '13px'
                      }}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm">
                      Apply
                    </button>
                  </div>
                  {promoMsg && (
                    <p style={{ fontSize: '12px', marginTop: '6px', fontWeight: 600 }}>{promoMsg}</p>
                  )}
                </form>

                <button
                  type="button"
                  className="btn btn-primary btn-lg w-100"
                  onClick={() => navigate('/checkout')}
                  style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}
                >
                  Proceed to Checkout <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
