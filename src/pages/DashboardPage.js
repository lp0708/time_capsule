import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchCapsules, deleteCapsule } from '../services/capsuleService';
import CapsuleCard from '../components/capsule/CapsuleCard';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const DashboardPage = () => {
  const { user } = useAuth();
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCapsules();
        setCapsules(res.data.capsules);
      } catch (err) {
        setError('Could not load capsules. Please refresh.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this capsule forever? This cannot be undone.')) return;
    try {
      await deleteCapsule(id);
      setCapsules(prev => prev.filter(c => c._id !== id));
    } catch {
      setError('Could not delete capsule. Please try again.');
    }
  };

  return (
    <div className="page-enter container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.3rem' }}>My Capsules</h1>
          <p style={{ color: 'var(--text-soft)', fontSize: '0.95rem' }}>
            Hello, <strong>{user?.name}</strong> 👋 — you have {capsules.length} capsule{capsules.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/capsules/new" className="btn btn-primary" style={{ padding: '0.7rem 1.5rem' }}>
          + New Capsule
        </Link>
      </div>

      <Alert type="error" message={error} onClose={() => setError('')} />

      {loading ? (
        <Spinner fullPage />
      ) : capsules.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>📭</div>
          <h3 style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>No capsules yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Create your first time capsule and seal a memory forever.</p>
          <Link to="/capsules/new" className="btn btn-primary">Create My First Capsule ✨</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {capsules.map(capsule => (
            <CapsuleCard key={capsule._id} capsule={capsule} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;