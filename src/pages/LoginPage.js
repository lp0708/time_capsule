import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/ui/Alert';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div className="card" style={{ padding: '2.5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🕰️</div>
            <h2 style={{ marginBottom: '0.4rem' }}>Welcome back</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-soft)' }}>Sign in with your username</p>
          </div>

          <Alert type="error" message={error} onClose={() => setError('')} />

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-mid)' }}>Username</label>
              <input className="input" type="text" name="username" value={form.username}
                onChange={handleChange} placeholder="your_username" required autoFocus />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-mid)' }}>Password</label>
              <input className="input" type="password" name="password" value={form.password}
                onChange={handleChange} placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ padding: '0.8rem', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              {loading ? 'Signing in...' : 'Sign In ✨'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-soft)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--text-dark)', fontWeight: 700, textDecoration: 'underline' }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;