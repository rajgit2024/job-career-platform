import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { deleteJob } from '../services/jobService';

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPage = async (url) => {
    setLoading(true);
    setError('');
    try {
      // url is either a full URL (from next/previous) or undefined (first load)
      const response = url ? await api.get(url) : await api.get('/jobs/');
      setJobs(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      setCount(response.data.count);
    } catch (err) {
      setError('Could not load jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return;
    await deleteJob(id);
    fetchPage(); // refresh current view from page 1; simplest correct behavior after a delete
  };

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Applications ({count})</h1>
        <Link
          to="/jobs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Job
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow divide-y mb-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{job.position}</p>
              <p className="text-sm text-gray-500">{job.company} · {job.status}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link to={`/jobs/${job.id}/edit`} className="text-blue-600">Edit</Link>
              <button onClick={() => handleDelete(job.id)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          disabled={!prevUrl}
          onClick={() => fetchPage(prevUrl)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          ← Previous
        </button>
        <button
          disabled={!nextUrl}
          onClick={() => fetchPage(nextUrl)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  );
}