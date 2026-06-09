import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const CAPSULE_COLORS = [
  '#fde8e8','#ede5fa','#e6f0fc','#e8f5e8','#fff3e0','#fce4ec'
];

const CapsuleCard = ({ capsule, onDelete }) => {
  const isLocked = capsule.openDate && new Date() < new Date(capsule.openDate);
  const firstImage = capsule.media?.find(m => m.type === 'image');

  const cardStyle = {
    background: capsule.color || '#fdf8f2',
    borderRadius: 'var(--radius-lg)',
    border: '1.5px solid var(--border)',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden',
    transition: 'all 0.25s ease',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={cardStyle} className="card">
      {/* Thumbnail */}
      <div style={{ height: 140, background: 'var(--parchment)', position: 'relative', overflow: 'hidden' }}>
        {firstImage ? (
          <img src={firstImage.url} alt={capsule.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', opacity: 0.4 }}>
            {isLocked ? '🔒' : '📜'}
          </div>
        )}
        {isLocked && (
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <span className="badge badge-locked">🔒 Locked</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-dark)', margin: 0 }}>
          {capsule.title}
        </h3>
        <p style={{ fontSize: '0.83rem', color: 'var(--text-soft)', margin: 0, lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {capsule.description}
        </p>

        {capsule.openDate && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            {isLocked ? '🗓 Opens ' : '✅ Opened '}{format(new Date(capsule.openDate), 'MMM d, yyyy')}
          </p>
        )}

        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
          Created {format(new Date(capsule.createdAt), 'MMM d, yyyy')}
        </p>

        {capsule.media?.length > 0 && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-soft)', margin: 0 }}>
            📎 {capsule.media.length} file{capsule.media.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding: '0.75rem 1.1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Link to={`/capsules/${capsule._id}`} className="btn btn-primary" style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem', flex: 1, justifyContent: 'center' }}>
          Open
        </Link>
        <Link to={`/capsules/${capsule._id}/edit`} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem' }}>
          Edit
        </Link>
        <button onClick={() => onDelete(capsule._id)} className="btn btn-danger" style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CapsuleCard;