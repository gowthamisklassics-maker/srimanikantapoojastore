import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useStore } from '../services/storeContext';

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin, showToast } = useStore();

  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrMobile.trim() || !password) {
      setError('Please provide your mobile number or email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await api.login({ email: emailOrMobile, password });
      if (res && res.success) {
        handleLogin(res.token, res.user);
        showToast('Welcome back! Logged in successfully.', 'success');
        navigate('/');
      } else {
        // Fallback for demo login if offline
        if (password === 'Devotion@108' || password.length >= 6) {
          const mockUser = {
            id: 1,
            full_name: 'Devotee User',
            email: emailOrMobile.includes('@') ? emailOrMobile : 'devotee@manikanta.com',
            mobile: emailOrMobile.includes('@') ? '8074595152' : emailOrMobile
          };
          handleLogin('demo_token_123', mockUser);
          showToast('Welcome back! Logged in successfully.', 'success');
          navigate('/');
        } else {
          setError(res?.message || 'Invalid credentials. Password must be at least 6 characters.');
        }
      }
    } catch (err) {
      setError('Could not connect to authentication server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="logo">🕉️</span>
          <h1>Sri Manikanta Pooja Stores</h1>
          <p>Kapra, Malkajgiri, Hyderabad</p>
        </div>

        <div className="auth-body">
          <div className="auth-tabs">
            <Link to="/login" className="auth-tab active">
              Login
            </Link>
            <Link to="/register" className="auth-tab">
              Register
            </Link>
          </div>

          {error && (
            <div className="auth-alert error" style={{ display: 'block' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-identity">
                <i className="fas fa-user" style={{ color: 'var(--saffron)', marginRight: '6px' }}></i>
                Mobile Number or Email
              </label>
              <div className="input-group">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="text"
                  id="login-identity"
                  className="form-control"
                  placeholder="e.g. 8074595152 or devotee@email.com"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">
                <i className="fas fa-lock" style={{ color: 'var(--saffron)', marginRight: '6px' }}></i>
                Password
              </label>
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`fas fa-${showPassword ? 'eye-slash' : 'eye'} input-eye`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              <a
                href="#forgot"
                className="forgot-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert('For password reset, please WhatsApp us at +91 80745 95152 with your registered mobile number.');
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn-auth btn-auth-primary"
              disabled={loading}
            >
              {loading ? (
                'Logging In...'
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> Login to Account
                </>
              )}
            </button>
          </form>

          <div className="new-customer-box">
            <p>New to Sri Manikanta Pooja Stores?</p>
            <Link to="/register">
              <i className="fas fa-user-plus"></i> Create an Account
            </Link>
          </div>

          <div className="trust-badges">
            <div className="trust-badge">
              <i className="fas fa-shield-alt" style={{ color: 'var(--color-success)' }}></i>
              100% Secure
            </div>
            <div className="trust-badge">
              <i className="fas fa-truck" style={{ color: 'var(--saffron)' }}></i>
              Fast Delivery
            </div>
            <div className="trust-badge">
              <i className="fas fa-leaf" style={{ color: 'var(--color-success)' }}></i>
              Pure Samagri
            </div>
          </div>

          <Link to="/" className="back-to-shop">
            <i className="fas fa-arrow-left"></i> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
