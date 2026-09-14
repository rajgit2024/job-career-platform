import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobsList from './pages/JobsList';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobsList /></ProtectedRoute>} />
        <Route path="/jobs/new" element={<ProtectedRoute><AddJob /></ProtectedRoute>} />
        <Route path="/jobs/:id/edit" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}