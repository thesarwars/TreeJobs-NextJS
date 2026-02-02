
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Job, JobStatus, UserRole, RequestStatus } from '../types';
import JobCard from '../components/JobCard';
import { JOB_TYPES } from '../constants';

const JobBoard: React.FC = () => {
  const { jobs, getOrCreateChat, requestContact, contactRequests } = useData();
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterType, setFilterType] = useState('All');

  const openJobs = jobs.filter(j => j.status === JobStatus.OPEN);
  const filteredJobs = filterType === 'All' ? openJobs : openJobs.filter(j => j.type === filterType);

  const handleJobAction = (job: Job) => {
    if (!user) return alert('Please login to engage with jobs.');
    const chatId = getOrCreateChat(job.id, job.customerId, user.id);
    alert(`Starting conversation for: ${job.title}`);
  };

  const handleRequestContact = (job: Job) => {
    if (!user) return;
    requestContact(job.id, user.id, job.customerId);
    alert('Contact request sent! You will be notified if they approve.');
  };

  const hasRequested = (jobId: string) => 
    contactRequests.some(r => r.jobId === jobId && r.providerId === user?.id);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Local Tree Jobs</h1>
          <p className="text-gray-500">Browse available work in your area.</p>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-600">Filter:</label>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="All">All Types</option>
            {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Job List */}
        <div className="lg:col-span-2 grid md:grid-cols-1 gap-4 h-fit">
          {filteredJobs.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-gray-300 text-gray-500 col-span-full">
              No open jobs found matching your filter.
            </div>
          ) : (
            filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                userRole={user?.role} 
                onClick={() => setSelectedJob(job)} 
              />
            ))
          )}
        </div>

        {/* Selected Job Detail */}
        <div className="lg:col-span-1">
          {selectedJob ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-primary text-white p-6">
                <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
                <div className="flex items-center text-sm opacity-80 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {selectedJob.location}
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-light p-3 rounded-xl">
                    <div className="text-xs text-gray-500">Service Type</div>
                    <div className="font-bold text-primary">{selectedJob.type}</div>
                  </div>
                  <div className="bg-light p-3 rounded-xl">
                    <div className="text-xs text-gray-500">Posted</div>
                    <div className="font-bold text-primary">{new Date(selectedJob.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleJobAction(selectedJob)}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg hover:bg-opacity-90 transition flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Send Message
                  </button>
                  <button 
                    onClick={() => handleRequestContact(selectedJob)}
                    disabled={hasRequested(selectedJob.id)}
                    className={`w-full py-4 rounded-xl font-bold transition flex items-center justify-center ${
                      hasRequested(selectedJob.id) 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-dark border-2 border-dark hover:bg-dark hover:text-white'
                    }`}
                  >
                    {hasRequested(selectedJob.id) ? 'Request Sent' : 'Request Contact Details'}
                  </button>
                  <p className="text-[10px] text-center text-gray-400 px-4">
                    Remember: Do not share phone numbers in messages. Use the contact request system for security.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-light/50 border border-dashed border-gray-300 p-10 text-center rounded-2xl sticky top-24 text-gray-500">
              Select a job to view details and contact the customer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
