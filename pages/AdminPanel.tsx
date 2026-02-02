
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { UserRole } from '../types';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const { jobs, chats, deleteJob } = useData();

  if (user?.role !== UserRole.ADMIN) {
    return <div className="p-10 text-center">Unauthorized. Admins only.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-dark mb-8">Admin Moderation Panel</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-bold uppercase mb-1">Total Jobs</div>
          <div className="text-4xl font-extrabold text-primary">{jobs.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-bold uppercase mb-1">Active Chats</div>
          <div className="text-4xl font-extrabold text-accent">{chats.length}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">All Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-light text-dark text-sm uppercase font-bold">
                <th className="p-4">ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50 text-sm">
                  <td className="p-4 text-gray-400">{job.id}</td>
                  <td className="p-4 font-bold">{job.title}</td>
                  <td className="p-4 text-gray-600">{job.customerId}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${job.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => deleteJob(job.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
