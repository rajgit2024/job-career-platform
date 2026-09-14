import { useState } from 'react';

const STATUS_OPTIONS = ['saved', 'applied', 'interview', 'rejected', 'selected'];

export default function JobForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState({
    company: initialData?.company || '',
    position: initialData?.position || '',
    location: initialData?.location || '',
    job_url: initialData?.job_url || '',
    description: initialData?.description || '',
    status: initialData?.status || 'saved',
    applied_date: initialData?.applied_date || '',
    notes: initialData?.notes || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { ...form, applied_date: form.applied_date || null };
      await onSubmit(payload);
    } catch (err) {
      setError('Something went wrong. Check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-lg">
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <label className="block text-sm font-medium mb-1">Company</label>
      <input
        name="company"
        value={form.company}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-3"
        required
      />

      <label className="block text-sm font-medium mb-1">Position</label>
      <input
        name="position"
        value={form.position}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-3"
        required
      />

      <label className="block text-sm font-medium mb-1">Location</label>
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <label className="block text-sm font-medium mb-1">Job URL</label>
      <input
        name="job_url"
        type="url"
        value={form.job_url}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <label className="block text-sm font-medium mb-1">Status</label>
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-3"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <label className="block text-sm font-medium mb-1">Applied Date</label>
      <input
        name="applied_date"
        type="date"
        value={form.applied_date}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <label className="block text-sm font-medium mb-1">Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-3"
        rows={3}
      />

      <label className="block text-sm font-medium mb-1">Notes</label>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
        rows={2}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}