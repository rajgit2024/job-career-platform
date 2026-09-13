import api from './api';

export const getJobs = (params = {}) => {
  return api.get('/jobs/', { params });
};