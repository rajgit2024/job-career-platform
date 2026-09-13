import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';
import { getJobs } from '../services/jobService';

const STATUS_LABELS = {
  saved: 'Saved',
  applied: 'Applied',
  interview: 'Interview',
  rejected: 'Rejected',
  selected: 'Selected',
};

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getJobs({ ordering: '-created_at' });
      setJobs(response.data.results);
    } catch (err) {
      setError('Could not load your applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    logoutUser();
    navigate('/login');
  };

  const counts = jobs.reduce(
    (acc, job) => {
      acc.total += 1;
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  if (loading) {
    return <div className="p-8 text-gray-500">Loading your applications...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchJobs} className="text-blue-600 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Application Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total" value={counts.total} />
        <StatCard label="Applied" value={counts.applied || 0} />
        <StatCard label="Interview" value={counts.interview || 0} />
        <StatCard label="Rejected" value={counts.rejected || 0} />
        <StatCard label="Selected" value={counts.selected || 0} />
      </div>

      <h2 className="text-lg font-semibold mb-3">Recent Applications</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No applications yet. (Add-job form coming in Phase 9.)
        </p>
      ) : (
        <div className="bg-white rounded-lg shadow divide-y">
          {jobs.slice(0, 10).map((job) => (
            <div key={job.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{job.position}</p>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-gray-100">
                {STATUS_LABELS[job.status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}