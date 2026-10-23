import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../services/storeContext';
import { api } from '../services/api';

export default function Account() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') || 'profile';

  const { user, handleLogout, showToast } = useStore();
  const [activeTab, setActiveTab] = useState(activeTabParam);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      navigate('/login');
      return;
    }

    async function loadOrders() {
      setLoadingOrders(true);
      const res = await api.getUserOrders();
      if (res) setOrders(res);
      setLoadingOrders(false);
    }
    loadOrders();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <div className="page-banner" style={{ padding: 'var(--sp-6) 0 var(--sp-5)' }}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>My Account</span>
          </div>
        </div>
      </div>

      <main style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '30px' }}>
            {/* Sidebar */}
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
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'var(--sand)',
                      color: 'var(--maroon)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      margin: '0 auto 12px'
                    }}
                  >
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <h4 style={{ margin: 0, fontSize: '16px' }}>{user.full_name}</h4>
                  <small style={{ color: 'var(--text-muted)' }}>{user.mobile}</small>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    type="button"
                    className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                    style={{ justifyContent: 'flex-start', border: 'none' }}
                    onClick={() => setActiveTab('profile')}
                  >
                    <i className="fas fa-id-card"></i> Profile Info
                  </button>
                  <button
                    type="button"
                    className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                    style={{ justifyContent: 'flex-start', border: 'none' }}
                    onClick={() => setActiveTab('orders')}
                  >
                    <i className="fas fa-box"></i> My Orders ({orders.length})
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-error)' }}
                    onClick={() => {
                      handleLogout();
                      navigate('/');
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Content Tab */}
            <div>
              {activeTab === 'profile' && (
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '30px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--maroon)',
                      marginBottom: '20px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    Personal Information
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Full Name
                      </label>
                      <p style={{ fontWeight: 600, fontSize: '16px', margin: '4px 0 0' }}>{user.full_name}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Mobile Number
                      </label>
                      <p style={{ fontWeight: 600, fontSize: '16px', margin: '4px 0 0' }}>{user.mobile}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Email Address
                      </label>
                      <p style={{ fontWeight: 600, fontSize: '16px', margin: '4px 0 0' }}>
                        {user.email || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Primary City
                      </label>
                      <p style={{ fontWeight: 600, fontSize: '16px', margin: '4px 0 0' }}>Hyderabad, Telangana</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '30px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--maroon)',
                      marginBottom: '20px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    Order History
                  </h3>

                  {loadingOrders ? (
                    <p>Loading your orders...</p>
                  ) : orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>You have not placed any orders yet.</p>
                      <Link to="/shop" className="btn btn-primary btn-sm">
                        Browse Pooja Catalog
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          style={{
                            border: '1px solid #eee',
                            borderRadius: '12px',
                            padding: '18px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <strong style={{ color: 'var(--maroon)' }}>{ord.order_number}</strong>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                              Placed on: {ord.created_at}
                            </div>
                            <div style={{ fontSize: '13px', marginTop: '6px' }}>
                              Status: <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{ord.order_status}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--maroon)' }}>
                              ₹{ord.grand_total}
                            </div>
                            <small style={{ textTransform: 'uppercase', color: '#666' }}>{ord.payment_method}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
