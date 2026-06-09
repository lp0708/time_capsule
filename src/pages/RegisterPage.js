import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/ui/Alert';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', username: '', email: '',
    password: '', confirm: '',
    age: '', gender: '', city: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (!form.gender) { setError('Please select a gender.'); return; }
    setLoading(true);
    try {
      await register(form.name, form.username, form.email, form.password, form.age, form.gender, form.city);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const label = (text) => (
    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-mid)' }}>
      {text} <span style={{ color: 'var(--blush)' }}>*</span>
    </label>
  );

  return (
    <div className="page-enter" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: 500 }}>
        <div className="card" style={{ padding: '2.5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✨</div>
            <h2 style={{ marginBottom: '0.4rem' }}>Create an account</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-soft)' }}>Start sealing your memories today</p>
          </div>

          <Alert type="error" message={error} onClose={() => setError('')} />

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Name */}
            <div>
              {label('Full Name')}
              <input className="input" type="text" name="name" value={form.name}
                onChange={handleChange} placeholder="Ada Lovelace" required />
            </div>

            {/* Username */}
            <div>
              {label('Username')}
              <input className="input" type="text" name="username" value={form.username}
                onChange={handleChange} placeholder="ada_lovelace" required />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Letters, numbers and underscores only. This is what you'll use to log in.
              </p>
            </div>

            {/* Email */}
            <div>
              {label('Email')}
              <input className="input" type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="you@example.com" required />
            </div>

            {/* Age + Gender side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                {label('Age')}
                <input className="input" type="number" name="age" value={form.age}
                  onChange={handleChange} placeholder="22" min={1} max={120} required />
              </div>
              <div>
                {label('Gender')}
                <select className="input" name="gender" value={form.gender} onChange={handleChange} required
                  style={{ cursor: 'pointer' }}>
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* City */}
            <div>
              {label('City')}
              <input className="input" type="text" name="city" value={form.city}
                onChange={handleChange} placeholder="New York" required />
            </div>

            {/* Password */}
            <div>
              {label('Password')}
              <input className="input" type="password" name="password" value={form.password}
                onChange={handleChange} placeholder="••••••••" required />
            </div>

            {/* Confirm Password */}
            <div>
              {label('Confirm Password')}
              <input className="input" type="password" name="confirm" value={form.confirm}
                onChange={handleChange} placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ padding: '0.8rem', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              {loading ? 'Creating account...' : 'Create Account ✨'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-soft)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--text-dark)', fontWeight: 700, textDecoration: 'underline' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;