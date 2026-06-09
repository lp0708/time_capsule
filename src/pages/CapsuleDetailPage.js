import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fetchCapsule, deleteCapsule } from '../services/capsuleService';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const CapsuleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCapsule(id);
        setCapsule(res.data.capsule);
      } catch {
        setError('Could not load this capsule.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this capsule forever?')) return;
    try {
      await deleteCapsule(id);
      navigate('/dashboard');
    } catch { setError('Delete failed.'); }
  };

  if (loading) return <Spinner fullPage />;

  const isLocked = capsule?.openDate && new Date() < new Date(capsule.openDate);

  return (
    <div className="page-enter container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem', maxWidth: 760 }}>
      <Link to="/dashboard" style={{ color: 'var(--text-soft)', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1.5rem' }}>
        ← My Capsules
      </Link>

      <Alert type="error" message={error} onClose={() => setError('')} />

      {capsule && (
        <>
          {/* Header Card */}
          <div className="card" style={{ padding: '2rem 2rem 1.5rem', marginBottom: '1.5rem', background: capsule.color || '#fdf8f2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', margin: 0 }}>{capsule.title}</h1>
                  {isLocked
                    ? <span className="badge badge-locked">🔒 Locked</span>
                    : <span className="badge badge-open">✅ Open</span>}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Created {format(new Date(capsule.createdAt), 'MMMM d, yyyy')}
                  {capsule.openDate && ` · Opens ${format(new Date(capsule.openDate), 'MMMM d, yyyy')}`}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/capsules/${id}/edit`} className="btn btn-secondary" style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}>Edit</Link>
                <button onClick={handleDelete} className="btn btn-danger" style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}>Delete</button>
              </div>
            </div>

            {capsule.tags?.length > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {capsule.tags.map(tag => (
                  <span key={tag} style={{ padding: '0.2rem 0.65rem', background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', color: 'var(--text-mid)', border: '1px solid var(--border)' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Locked message */}
          {isLocked && (
            <div style={{ background: 'var(--lavender-light)', border: '1.5px solid var(--lavender)', borderRadius: 'var(--radius-md)', padding: '1.2rem 1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🔒</div>
              <p style={{ color: '#5a4080', fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic' }}>
                This capsule is sealed until {format(new Date(capsule.openDate), 'MMMM d, yyyy')}.
              </p>
              <p style={{ fontSize: '0.82rem', color: '#7a6090', marginTop: '0.3rem' }}>Come back then to reveal its contents. ✨</p>
            </div>
          )}

          {/* Description */}
          {(!isLocked) && (
            <div className="card" style={{ padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-soft)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Message</h3>
              <p style={{ color: 'var(--text-dark)', lineHeight: 1.9, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-body)' }}>
                {capsule.description}
              </p>
            </div>
          )}

          {/* Media gallery */}
          {!isLocked && capsule.media?.length > 0 && (
            <div className="card" style={{ padding: '1.8rem' }}>
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-soft)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Photos & Videos ({capsule.media.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {capsule.media.map((m) => (
                  <div key={m._id} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '1', background: 'var(--parchment)' }}>
                    {m.type === 'image'
                      ? <img src={m.url} alt={m.originalName || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <video src={m.url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CapsuleDetailPage;