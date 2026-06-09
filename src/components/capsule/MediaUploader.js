import React, { useRef, useState } from 'react';

const MediaUploader = ({ onFilesChange, existingMedia = [], onRemoveExisting }) => {
  const inputRef = useRef();
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files);
    const newPreviews = selected.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
      name: file.name,
    }));
    const updated = [...files, ...selected];
    const updatedPreviews = [...previews, ...newPreviews];
    setFiles(updated);
    setPreviews(updatedPreviews);
    onFilesChange(updated);
    e.target.value = '';
  };

  const removeNew = (idx) => {
    const updated = files.filter((_, i) => i !== idx);
    const updatedPreviews = previews.filter((_, i) => i !== idx);
    setFiles(updated);
    setPreviews(updatedPreviews);
    onFilesChange(updated);
  };

  const mediaThumb = { width: 90, height: 90, objectFit: 'cover', borderRadius: 10, display: 'block' };

  return (
    <div>
      {/* Existing media from server */}
      {existingMedia.length > 0 && (
        <div style={{ marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)', marginBottom: '0.5rem' }}>Saved media:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {existingMedia.map((m) => (
              <div key={m._id} style={{ position: 'relative' }}>
                {m.type === 'image'
                  ? <img src={m.url} alt="" style={mediaThumb} />
                  : <video src={m.url} style={mediaThumb} muted />}
                <button onClick={() => onRemoveExisting(m._id)} style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: 'var(--blush)', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New file previews */}
      {previews.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {previews.map((p, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {p.type === 'image'
                ? <img src={p.url} alt={p.name} style={mediaThumb} />
                : <video src={p.url} style={mediaThumb} muted />}
              <button onClick={() => removeNew(i)} style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: 'var(--blush)', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>×</button>
            </div>
          ))}
        </div>
      )}

      <input ref={inputRef} type="file" multiple accept="image/*,video/*" style={{ display: 'none' }} onChange={handleSelect} />
      <button type="button" onClick={() => inputRef.current.click()} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.55rem 1.2rem' }}>
        📎 Add Photos / Videos
      </button>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Up to 5 files · Max 50MB each · JPG, PNG, GIF, WEBP, MP4, WEBM</p>
    </div>
  );
};

export default MediaUploader;