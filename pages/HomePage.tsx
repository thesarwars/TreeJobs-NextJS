
import React from 'react';
import { COLORS } from '../constants';

const HomePage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-dark text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Tree background" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Connect with Trusted <span className="text-accent">Arborists</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 font-light max-w-2xl mx-auto">
            The simplest way to post tree work, receive professional messages, and find the right expert for your property.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onNavigate('post-job')}
              className="bg-primary hover:bg-opacity-90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition transform hover:-translate-y-1"
            >
              Need Tree Work Done?
            </button>
            <button 
              onClick={() => onNavigate('job-board')}
              className="bg-white hover:bg-light text-dark px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition transform hover:-translate-y-1"
            >
              I am a Tree Expert
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-3 gap-12">
        <div className="text-center group">
          <div className="bg-primary/10 p-6 rounded-2xl inline-block mb-6 group-hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Post Your Job</h3>
          <p className="text-gray-600">Quickly describe the work you need. No registration required until you're ready to engage.</p>
        </div>
        <div className="text-center group">
          <div className="bg-primary/10 p-6 rounded-2xl inline-block mb-6 group-hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">In-Platform Messaging</h3>
          <p className="text-gray-600">Communicate securely without sharing phone numbers or emails until you choose to.</p>
        </div>
        <div className="text-center group">
          <div className="bg-primary/10 p-6 rounded-2xl inline-block mb-6 group-hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-0.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Verified Contact Control</h3>
          <p className="text-gray-600">Arborists request your contact details, and you approve the ones you want to talk to.</p>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="bg-light w-full py-16 px-4 border-y border-gray-200">
        <div className="max-w-4xl mx-auto text-center italic text-dark/70 text-lg">
          "TreeJobs solved the problem of constant spam calls. I posted my job, messaged two local arborists, and only shared my phone number once I felt comfortable with their profile."
          <div className="mt-4 font-bold not-italic text-dark">- Mark S., Customer</div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
