import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CapsuleForm from '../components/capsule/CapsuleForm';
import { createCapsule } from '../services/capsuleService';

const CreateCapsulePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);
    try {
      const res = await createCapsule(formData);
      navigate(`/capsules/${res.data.capsule._id}`);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to create capsule.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem', maxWidth: 680 }}>
      <Link to="/dashboard" style={{ color: 'var(--text-soft)', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1.5rem' }}>
        ← Back to Dashboard
      </Link>
      <h1 style={{ marginBottom: '0.5rem' }}>Create a Time Capsule</h1>
      <p style={{ color: 'var(--text-soft)', marginBottom: '2rem' }}>
        Seal your memories, words, and moments for later.
      </p>
      <div className="card" style={{ padding: '2rem 1.8rem' }}>
        <CapsuleForm onSubmit={handleSubmit} loading={loading} error={error} submitLabel="Seal Capsule" />
      </div>
    </div>
  );
};

export default CreateCapsulePage;