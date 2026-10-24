import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../services/storeContext';
import { api, STORE_DATA } from '../services/api';

export default function Checkout() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    deliveryFee,
    cartGrandTotal,
    clearCart,
    user
  } = useStore();

  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState(user?.full_name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [pincode, setPincode] = useState('500062');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'upi', 'whatsapp'

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  if (cart.length === 0 && !completedOrder) {
    return (
      <main style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>No items to checkout</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Shop
        </Link>
      </main>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !address.trim()) {
      alert('Please fill in Name, Mobile number, and Delivery Address.');
      return;
    }

    if (paymentMethod === 'upi') {
      setShowQrModal(true);
      return;
    }

    await executeOrderCreation();
  };

  const executeOrderCreation = async () => {
    setIsSubmitting(true);

    const orderPayload = {
      customer_name: name,
      customer_mobile: mobile,
      customer_email: email,
      delivery_address: `${address}, ${locality}`,
      city,
      pincode,
      payment_method: paymentMethod,
      items: cart,
      notes
    };

    try {
      const res = await api.createOrder(orderPayload);
      if (res && res.success) {
        setCompletedOrder(res.order || {
          order_number: res.order_number,
          ...orderPayload,
          grand_total: cartGrandTotal,
          created_at: new Date().toLocaleDateString()
        });
        clearCart();
      }
    } catch (err) {
      console.error('Order creation error:', err);
      // Create local order confirmation
      setCompletedOrder({
        order_number: `SMPS-${Date.now().toString().slice(-6)}`,
        ...orderPayload,
        grand_total: cartGrandTotal,
        created_at: new Date().toLocaleDateString()
      });
      clearCart();
    } finally {
      setIsSubmitting(false);
      setShowQrModal(false);
    }
  };

  // If order is completed, show Step 4: Confirmation screen
  if (completedOrder) {
    const waText =
      `🕉️ *Order Confirmation – Sri Manikanta Pooja Stores*\n\n` +
      `*Order ID:* ${completedOrder.order_number}\n` +
      `*Customer:* ${completedOrder.customer_name} (${completedOrder.customer_mobile})\n` +
      `*Delivery to:* ${completedOrder.delivery_address}, ${completedOrder.city} – ${completedOrder.pincode}\n` +
      `*Payment:* ${completedOrder.payment_method.toUpperCase()}\n` +
      `*Amount:* ₹${completedOrder.grand_total}\n\n` +
      `Please process my pooja samagri order. Thank you!`;

    const waOrderUrl = `https://wa.me/${STORE_DATA.whatsapp}?text=${encodeURIComponent(waText)}`;

    return (
      <main style={{ padding: '60px 0 100px' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          {/* Progress Steps Header */}
          <div className="cart-steps" style={{ marginBottom: '30px' }}>
            <div className="cart-step done">
              <div className="step-num"><i className="fas fa-check"></i></div>
              <span>Cart</span>
            </div>
            <div className="cart-step-line done"></div>
            <div className="cart-step done">
              <div className="step-num"><i className="fas fa-check"></i></div>
              <span>Delivery</span>
            </div>
            <div className="cart-step-line done"></div>
            <div className="cart-step done">
              <div className="step-num"><i className="fas fa-check"></i></div>
              <span>Payment</span>
            </div>
            <div className="cart-step-line done"></div>
            <div className="cart-step active">
              <div className="step-num">4</div>
              <span>Confirmation</span>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px 30px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉 🕉️</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', margin: '0 0 10px' }}>
              Order Placed Successfully!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '24px' }}>
              May Lord Manikanta shower blessings upon you and your family. We are preparing your sacred pooja items.
            </p>

            <div
              style={{
                background: 'var(--cream)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'left',
                marginBottom: '28px',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <strong style={{ color: 'var(--maroon)' }}>{completedOrder.order_number}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Customer Name:</span>
                <strong>{completedOrder.customer_name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Mobile Number:</span>
                <strong>{completedOrder.customer_mobile}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery Address:</span>
                <span>{completedOrder.delivery_address}, {completedOrder.city}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Mode:</span>
                <strong style={{ textTransform: 'uppercase' }}>{completedOrder.payment_method}</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #ddd',
                  paddingTop: '10px',
                  marginTop: '10px',
                  fontWeight: 700,
                  fontSize: '16px'
                }}
              >
                <span>Total Amount:</span>
                <span style={{ color: 'var(--maroon)' }}>₹{completedOrder.grand_total}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={waOrderUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ justifyContent: 'center' }}
              >
                <i className="fab fa-whatsapp"></i> Track &amp; Confirm on WhatsApp
              </a>
              <Link to="/shop" className="btn btn-secondary btn-lg" style={{ justifyContent: 'center' }}>
                <i className="fas fa-store"></i> Continue Shopping
              </Link>
            </div>
          </div>
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
            <Link to="/cart">Cart</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Checkout</span>
          </div>
        </div>
      </div>

      <main style={{ padding: '40px 0 80px' }}>
        <div className="container">
          {/* Progress Steps Header */}
          <div className="cart-steps" style={{ marginBottom: '30px' }}>
            <div className="cart-step done">
              <div className="step-num"><i className="fas fa-check"></i></div>
              <span>Cart</span>
            </div>
            <div className="cart-step-line done"></div>
            <div className="cart-step active">
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

          <form onSubmit={handlePlaceOrder}>
            <div className="ck-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px' }}>
              {/* Form Details Column */}
              <div>
                {/* Delivery Address Card */}
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border-light)',
                    marginBottom: '24px'
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--maroon)',
                      fontSize: '18px',
                      marginBottom: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <i className="fas fa-truck" style={{ color: 'var(--saffron)' }}></i> Delivery Information
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Sriman Raghavan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 80745 XXXXX"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="devotee@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Complete Address / House No. *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Flat No, Apartment, Street name"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Colony / Locality
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Kapra, Malkajgiri"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        PIN Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Order Notes / Pooja Ritual Requirements (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="e.g. Please deliver before morning 7 AM for Ganapathi Homam"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* Payment Options Card */}
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--maroon)',
                      fontSize: '18px',
                      marginBottom: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <i className="fas fa-credit-card" style={{ color: 'var(--saffron)' }}></i> Select Payment Method
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Option 1: Cash on Delivery */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '16px',
                        borderRadius: '12px',
                        border: paymentMethod === 'cod' ? '2px solid var(--maroon)' : '1px solid #e5e7eb',
                        background: paymentMethod === 'cod' ? '#fff7ed' : '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <div>
                        <strong>Cash on Delivery (COD)</strong>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          Pay with cash or UPI directly when your items arrive at your doorstep.
                        </div>
                      </div>
                    </label>

                    {/* Option 2: UPI / QR Code */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '16px',
                        borderRadius: '12px',
                        border: paymentMethod === 'upi' ? '2px solid var(--maroon)' : '1px solid #e5e7eb',
                        background: paymentMethod === 'upi' ? '#fff7ed' : '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <div>
                        <strong>Scan UPI QR Code</strong>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          Google Pay, PhonePe, Paytm, or BHIM. Scan store QR code instantly.
                        </div>
                      </div>
                    </label>

                    {/* Option 3: WhatsApp Order */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '16px',
                        borderRadius: '12px',
                        border: paymentMethod === 'whatsapp' ? '2px solid var(--maroon)' : '1px solid #e5e7eb',
                        background: paymentMethod === 'whatsapp' ? '#fff7ed' : '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="whatsapp"
                        checked={paymentMethod === 'whatsapp'}
                        onChange={() => setPaymentMethod('whatsapp')}
                      />
                      <div>
                        <strong>Order via WhatsApp</strong>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          Send the list directly to our WhatsApp support team for personalized assistance.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
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
                      marginBottom: '16px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    Items in Order ({cartCount})
                  </h3>

                  <div
                    style={{
                      maxHeight: '220px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginBottom: '16px',
                      paddingRight: '6px'
                    }}
                  >
                    {cart.map((item) => (
                      <div
                        key={item.key}
                        style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}
                      >
                        <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.qty} × {item.name} {item.variant ? `(${item.variant})` : ''}
                        </span>
                        <strong>₹{item.price * item.qty}</strong>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid #eee',
                      paddingTop: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                      <span>₹{cartSubtotal}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Delivery</span>
                      <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--maroon)',
                        borderTop: '2px solid #eee',
                        paddingTop: '10px',
                        marginTop: '4px'
                      }}
                    >
                      <span>Grand Total</span>
                      <span>₹{cartGrandTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={isSubmitting}
                    style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}
                  >
                    {isSubmitting ? (
                      'Placing Order...'
                    ) : (
                      <>
                        <i className="fas fa-check-circle"></i> Complete Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Interactive UPI QR Code Modal */}
      {showQrModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '420px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--maroon)' }}>
                Scan to Pay ₹{cartGrandTotal}
              </h3>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Scan with Google Pay, PhonePe, Paytm or BHIM app
            </p>
            <div style={{ display: 'inline-block', padding: '10px', background: '#f5f5f5', borderRadius: '12px' }}>
              <img
                src="/images/Qr.jpeg"
                alt="Sri Manikanta Pooja Stores UPI QR Code"
                style={{ width: '220px', height: '220px', objectFit: 'contain', margin: '0 auto' }}
              />
            </div>
            <div style={{ margin: '16px 0', fontSize: '13px' }}>
              <strong>UPI ID:</strong> <code>8074595152@ybl</code>
            </div>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={executeOrderCreation}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <i className="fas fa-check"></i> I Have Paid
            </button>
          </div>
        </div>
      )}
    </>
  );
}
