
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { JobStatus, UserRole } from '../types';
import { JOB_TYPES } from '../constants';
import { enhanceJobDescription } from '../services/geminiService';

const PostJob: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { user } = useAuth();
  const { addJob } = useData();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: JOB_TYPES[0]
  });
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Login required to post');
    
    addJob({
      ...formData,
      customerId: user.id,
      status: JobStatus.OPEN
    });
    onComplete();
  };

  const handleAIImprove = async () => {
    if (!formData.title || !formData.description) {
      alert("Please enter a title and brief description first.");
      return;
    }
    setIsEnhancing(true);
    const improved = await enhanceJobDescription(formData.title, formData.description);
    if (improved) {
      setFormData({ ...formData, description: improved });
    }
    setIsEnhancing(false);
  };

  if (user?.role === UserRole.PROVIDER) {
    return (
      <div className="p-10 text-center">
        <p>Arborists cannot post jobs. Please use a customer account.</p>
      </div>
    );
  }

  const inputClasses = "w-full bg-dark text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 transition-all";

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-dark mb-2">Post a Tree Job</h1>
        <p className="text-gray-500 mb-8">Tell local arborists what you need. It's free and takes 2 minutes.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-dark mb-2">Job Title</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Large Oak Branch Removal"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={inputClasses}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-dark mb-2">Job Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={inputClasses}
              >
                {JOB_TYPES.map(t => <option key={t} value={t} className="bg-dark text-white">{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-dark mb-2">Location</label>
              <input 
                required
                type="text" 
                placeholder="Suburb or Postcode"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-dark">Work Details</label>
              <button 
                type="button"
                onClick={handleAIImprove}
                disabled={isEnhancing}
                className="text-xs text-primary font-bold hover:text-accent flex items-center transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {isEnhancing ? 'Improving...' : 'AI Help: Improve Description'}
              </button>
            </div>
            <textarea 
              required
              rows={5}
              placeholder="Describe the job. Include tree type, height, and any obstacles like fences or power lines."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={inputClasses}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-opacity-90 transition transform hover:scale-[1.01] active:scale-95"
          >
            Post Job to Marketplace
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
