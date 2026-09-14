import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobForm from '../components/JobForm';
import { getJob, updateJob } from '../services/jobService';

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getJob(id)
      .then((res) => setJob(res.data))
      .catch(() => setError('Could not load this job.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (payload) => {
    await updateJob(id, payload);
    navigate('/jobs');
  };

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Job Application</h1>
      <JobForm initialData={job} onSubmit={handleUpdate} submitLabel="Save Changes" />
    </div>
  );
}