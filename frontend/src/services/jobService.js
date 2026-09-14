import api from './api';

export const getJobs = (params = {}) => {
  return api.get('/jobs/', { params });
};

export const getJob = (id) => {
  return api.get(`/jobs/${id}/`);
};

export const createJob = (data) => {
  return api.post('/jobs/', data);
};

export const updateJob = (id, data) => {
  return api.patch(`/jobs/${id}/`, data);
};

export const deleteJob = (id) => {
  return api.delete(`/jobs/${id}/`);
};