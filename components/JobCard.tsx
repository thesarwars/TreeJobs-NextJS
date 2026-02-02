
import React from 'react';
import { Job, JobStatus, UserRole } from '../types';

interface JobCardProps {
  job: Job;
  userRole?: UserRole;
  onClick?: () => void;
  showActions?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, userRole, onClick, showActions }) => {
  const isClosed = job.status === JobStatus.CLOSED;

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer ${isClosed ? 'opacity-60' : ''}`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {job.type}
          </span>
          <span className="text-gray-400 text-xs">
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-bold text-dark mb-2">{job.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{job.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>

        {showActions && userRole === UserRole.PROVIDER && !isClosed && (
          <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
            View Details
          </button>
        )}

        {isClosed && (
          <div className="bg-gray-100 text-gray-500 text-center py-1 rounded text-xs font-bold">
            CLOSED
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
