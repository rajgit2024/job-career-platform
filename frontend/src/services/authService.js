import api from './api';

export const register = (username, email, password) => {
  return api.post('/auth/register/', { username, email, password });
};

export const login = async (username, password) => {
  const response = await api.post('/auth/login/', { username, password });
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getMe = () => {
  return api.get('/auth/me/');
};