
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { UserRole, JobStatus, RequestStatus } from '../types';
import JobCard from '../components/JobCard';
import MessagingUI from '../components/MessagingUI';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { jobs, chats, contactRequests, updateRequestStatus, closeJob } = useData();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  if (!user) return <div className="p-10 text-center">Please login to view dashboard.</div>;

  const myJobs = jobs.filter(j => j.customerId === user.id);
  const myRequests = contactRequests.filter(r => r.customerId === user.id);
  const providerRequests = contactRequests.filter(r => r.providerId === user.id);
  const myChats = chats.filter(c => c.customerId === user.id || c.providerId === user.id);

  const getJobTitle = (jobId: string) => jobs.find(j => j.id === jobId)?.title || 'Unknown Job';

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-dark mb-8">Your Dashboard</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Jobs or Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {user.role === UserRole.CUSTOMER && (
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Job Posts</h2>
                <div className="text-sm text-gray-500">{myJobs.length} total</div>
              </div>
              {myJobs.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
                  You haven't posted any jobs yet.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {myJobs.map(job => (
                    <div key={job.id} className="relative group">
                      <JobCard job={job} />
                      {job.status === JobStatus.OPEN && (
                        <button 
                          onClick={() => closeJob(job.id)}
                          className="mt-2 text-sm text-red-600 font-bold hover:underline"
                        >
                          Mark as Done/Close
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {user.role === UserRole.PROVIDER && (
            <section>
              <h2 className="text-xl font-bold mb-4">Your Contact Requests</h2>
              {providerRequests.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
                  No requests sent yet. Browse jobs to start.
                </div>
              ) : (
                <div className="space-y-4">
                  {providerRequests.map(req => (
                    <div key={req.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                      <div>
                        <div className="font-bold">{getJobTitle(req.jobId)}</div>
                        <div className="text-xs text-gray-500">Requested on {new Date(req.timestamp).toLocaleDateString()}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        req.status === RequestStatus.APPROVED ? 'bg-green-100 text-green-700' :
                        req.status === RequestStatus.DENIED ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Messaging Section (Unified for both) */}
          <section>
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            {activeChatId ? (
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveChatId(null)}
                  className="text-primary text-sm font-bold flex items-center hover:underline"
                >
                  &larr; Back to chat list
                </button>
                <MessagingUI chatId={activeChatId} />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {myChats.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">No active conversations.</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {myChats.map(chat => (
                      <div 
                        key={chat.id} 
                        onClick={() => setActiveChatId(chat.id)}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center space-x-4"
                      >
                        <div className="bg-primary/10 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold">{getJobTitle(chat.jobId)}</div>
                          <div className="text-xs text-gray-500">Click to view messages</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Approvals & Stats */}
        <div className="space-y-8">
          {user.role === UserRole.CUSTOMER && (
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Contact Approvals</h3>
              <p className="text-xs text-gray-500 mb-4">Review arborists who have requested your phone number.</p>
              <div className="space-y-4">
                {myRequests.filter(r => r.status === RequestStatus.PENDING).length === 0 ? (
                  <div className="text-sm text-gray-400">No pending requests.</div>
                ) : (
                  myRequests.filter(r => r.status === RequestStatus.PENDING).map(req => (
                    <div key={req.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-sm font-bold mb-1">{getJobTitle(req.jobId)}</div>
                      <div className="text-xs text-gray-600 mb-3">Arborist is requesting details.</div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => updateRequestStatus(req.id, RequestStatus.APPROVED)}
                          className="flex-1 bg-primary text-white text-xs py-2 rounded font-bold hover:bg-opacity-90"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => updateRequestStatus(req.id, RequestStatus.DENIED)}
                          className="flex-1 bg-white text-red-600 border border-red-100 text-xs py-2 rounded font-bold hover:bg-red-50"
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          <section className="bg-dark text-white p-6 rounded-xl shadow-lg">
            <h3 className="font-bold text-lg mb-4">Your Profile</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-60">Name:</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Role:</span>
                <span className="font-medium capitalize">{user.role.toLowerCase()}</span>
              </div>
            </div>
            {user.role === UserRole.PROVIDER && (
              <button className="w-full mt-6 bg-accent text-dark py-2 rounded-lg font-bold hover:bg-opacity-90 transition">
                Edit Business Profile
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
