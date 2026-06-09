import React, { useState } from 'react';
import MediaUploader from './MediaUploader';
import Alert from '../ui/Alert';

const CAPSULE_COLORS = [
  { value: '#fde8e8', label: 'Blush' },
  { value: '#ede5fa', label: 'Lavender' },
  { value: '#e6f0fc', label: 'Sky' },
  { value: '#e8f5e8', label: 'Sage' },
  { value: '#fff3e0', label: 'Peach' },
  { value: '#fdf8f2', label: 'Cream' },
];

const CapsuleForm = ({ initialValues = {}, onSubmit, loading, error, submitLabel = 'Save Capsule' }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [openDate, setOpenDate] = useState(
    initialValues.openDate ? new Date(initialValues.openDate).toISOString().slice(0, 10) : ''
  );
  const [tags, setTags] = useState(initialValues.tags ? initialValues.tags.join(', ') : '');
  const [color, setColor] = useState(initialValues.color || '#fde8e8');
  const [files, setFiles] = useState([]);
  const [existingMedia, setExistingMedia] = useState(initialValues.media || []);
  const [removedMediaIds, setRemovedMediaIds] = useState([]);

  const handleRemoveExisting = (id) => {
    setExistingMedia(prev => prev.filter(m => m._id !== id));
    setRemovedMediaIds(prev => [...prev, id]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('color', color);
    if (openDate) formData.append('openDate', openDate);
    if (tags) formData.append('tags', tags);
    files.forEach(f => formData.append('media', f));
    removedMediaIds.forEach(id => formData.append('removeMediaIds', id));
    onSubmit(formData);
  };

  const fieldLabel = (text, required) => (
    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-mid)', letterSpacing: '0.02em' }}>
      {text}{required && <span style={{ color: 'var(--blush)', marginLeft: 3 }}>*</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
      {error && <Alert type="error" message={error} />}

      {/* Title */}
      <div>
        {fieldLabel('Title', true)}
        <input className="input" type="text" value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Give your capsule a name..." maxLength={100} required />
      </div>

      {/* Description */}
      <div>
        {fieldLabel('Message / Description', true)}
        <textarea className="input" value={description} onChange={e => setDescription(e.target.value)}
          placeholder="Write a message to your future self or loved ones..." rows={5} maxLength={5000} required />
      </div>

      {/* Open Date */}
      <div>
        {fieldLabel('Unlock Date (optional)')}
        <input className="input" type="date" value={openDate} onChange={e => setOpenDate(e.target.value)}
          min={new Date().toISOString().slice(0, 10)} style={{ maxWidth: 240 }} />
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
          Leave blank to make it accessible immediately.
        </p>
      </div>

      {/* Tags */}
      <div>
        {fieldLabel('Tags (optional)')}
        <input className="input" type="text" value={tags} onChange={e => setTags(e.target.value)}
          placeholder="family, travel, 2024 — comma separated" style={{ maxWidth: 400 }} />
      </div>

      {/* Color */}
      <div>
        {fieldLabel('Capsule Color')}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {CAPSULE_COLORS.map(c => (
            <button type="button" key={c.value} title={c.label}
              onClick={() => setColor(c.value)}
              style={{
                width: 32, height: 32, borderRadius: '50%', background: c.value,
                border: color === c.value ? '2.5px solid var(--text-dark)' : '2px solid var(--border)',
                cursor: 'pointer', transition: 'transform 0.15s',
                transform: color === c.value ? 'scale(1.15)' : 'scale(1)',
              }} />
          ))}
        </div>
      </div>

      {/* Media */}
      <div>
        {fieldLabel('Photos & Videos (optional)')}
        <MediaUploader
          onFilesChange={setFiles}
          existingMedia={existingMedia}
          onRemoveExisting={handleRemoveExisting}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}
        style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
        {loading ? '✨ Saving...' : `✨ ${submitLabel}`}
      </button>
    </form>
  );
};

export default CapsuleForm;