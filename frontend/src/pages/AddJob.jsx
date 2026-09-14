import { useNavigate } from 'react-router-dom';
import JobForm from '../components/JobForm';
import { createJob } from '../services/jobService';

export default function AddJob() {
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    await createJob(payload);
    navigate('/jobs');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add Job Application</h1>
      <JobForm onSubmit={handleCreate} submitLabel="Add Job" />
    </div>
  );
}