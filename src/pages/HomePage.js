import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '📝', title: 'Write Your Story', desc: 'Pour your heart into words. Letters, memories, hopes — seal them for later.' },
  { icon: '📸', title: 'Capture Moments', desc: 'Add photos and videos to make your capsule rich and vivid.' },
  { icon: '🔒', title: 'Lock Until Ready', desc: 'Set a future unlock date and keep your capsule sealed until the moment is right.' },
  { icon: '💌', title: 'Open With Wonder', desc: 'Rediscover your past self. Laugh, cry, and cherish what you once felt.' },
];

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '5rem 1.5rem 4rem', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: '4.5rem', marginBottom: '1rem', animation: 'float 4s ease-in-out infinite' }}>🕰️</div>
        <h1 style={{ marginBottom: '1.2rem', fontStyle: 'italic' }}>
          Seal today's memories.<br />Rediscover them tomorrow.
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-soft)', maxWidth: 520, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Create digital time capsules filled with letters, photos, and videos.
          Lock them. Open them when the time is just right.
        </p>
        {user ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>Go to My Capsules</Link>
            <Link to="/capsules/new" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>+ Create New</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '1rem' }}>Start Your Capsule ✨</Link>
            <Link to="/login" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>Sign In</Link>
          </div>
        )}
      </section>

      {/* Features */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {features.map((f) => (
            <div key={f.icon} className="card" style={{ padding: '1.8rem 1.4rem', textAlign: 'center', background: 'white' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{f.icon}</div>
              <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;