import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CapsuleForm from '../components/capsule/CapsuleForm';
import { fetchCapsule, updateCapsule } from '../services/capsuleService';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const EditCapsulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCapsule(id)
      .then(res => setCapsule(res.data.capsule))
      .catch(() => setError('Could not load capsule.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    setError('');
    setSaving(true);
    try {
      await updateCapsule(id, formData);
      navigate(`/capsules/${id}`);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Update failed.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner fullPage />;

  return (
    <div className="page-enter container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem', maxWidth: 680 }}>
      <Link to={`/capsules/${id}`} style={{ color: 'var(--text-soft)', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1.5rem' }}>
        ← Back to Capsule
      </Link>
      <h1 style={{ marginBottom: '0.5rem' }}>Edit Capsule</h1>
      <p style={{ color: 'var(--text-soft)', marginBottom: '2rem' }}>Update your time capsule's contents.</p>
      <Alert type="error" message={error} onClose={() => setError('')} />
      {capsule && (
        <div className="card" style={{ padding: '2rem 1.8rem' }}>
          <CapsuleForm initialValues={capsule} onSubmit={handleSubmit} loading={saving} error="" submitLabel="Update Capsule" />
        </div>
      )}
    </div>
  );
};

export default EditCapsulePage;