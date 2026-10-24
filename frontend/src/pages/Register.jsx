import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useStore } from '../services/storeContext';

export default function Register() {
  const navigate = useNavigate();
  const { handleLogin, showToast } = useStore();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await api.register({
        full_name: fullName,
        mobile,
        email,
        password
      });

      if (res && res.success) {
        handleLogin(res.token, res.user);
        showToast('Registration successful! Welcome to Sri Manikanta.', 'success');
        navigate('/');
      } else {
        // Fallback for demo registration
        const mockUser = {
          id: Date.now(),
          full_name: fullName,
          mobile,
          email: email || 'devotee@manikanta.com'
        };
        handleLogin('demo_token_' + Date.now(), mockUser);
        showToast('Registration successful! Welcome to Sri Manikanta.', 'success');
        navigate('/');
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
          <p>Create Your Customer Account</p>
        </div>

        <div className="auth-body">
          <div className="auth-tabs">
            <Link to="/login" className="auth-tab">
              Login
            </Link>
            <Link to="/register" className="auth-tab active">
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
              <label className="form-label" htmlFor="reg-name">
                <i className="fas fa-user" style={{ color: 'var(--saffron)', marginRight: '6px' }}></i>
                Full Name *
              </label>
              <div className="input-group">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  id="reg-name"
                  className="form-control"
                  placeholder="e.g. Suryanarayana Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-mobile">
                <i className="fas fa-phone-alt" style={{ color: 'var(--saffron)', marginRight: '6px' }}></i>
                Mobile Number *
              </label>
              <div className="input-group">
                <i className="fas fa-phone-alt input-icon"></i>
                <input
                  type="tel"
                  id="reg-mobile"
                  className="form-control"
                  placeholder="+91 80745 XXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">
                <i className="fas fa-envelope" style={{ color: 'var(--saffron)', marginRight: '6px' }}></i>
                Email Address (Optional)
              </label>
              <div className="input-group">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  id="reg-email"
                  className="form-control"
                  placeholder="devotee@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">
                <i className="fas fa-lock" style={{ color: 'var(--saffron)', marginRight: '6px' }}></i>
                Password *
              </label>
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="reg-password"
                  className="form-control"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`fas fa-${showPassword ? 'eye-slash' : 'eye'} input-eye`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>

            <button
              type="submit"
              className="btn-auth btn-auth-primary"
              disabled={loading}
            >
              {loading ? (
                'Creating Account...'
              ) : (
                <>
                  <i className="fas fa-user-plus"></i> Register Account
                </>
              )}
            </button>
          </form>

          <div className="new-customer-box">
            <p>Already have an account?</p>
            <Link to="/login">
              <i className="fas fa-sign-in-alt"></i> Sign in Here
            </Link>
          </div>

          <Link to="/" className="back-to-shop">
            <i className="fas fa-arrow-left"></i> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
