import api from './api';

export const fetchCapsules = () => api.get('/capsules');
export const fetchCapsule = (id) => api.get(`/capsules/${id}`);
export const createCapsule = (formData) =>
  api.post('/capsules', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateCapsule = (id, formData) =>
  api.put(`/capsules/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteCapsule = (id) => api.delete(`/capsules/${id}`);