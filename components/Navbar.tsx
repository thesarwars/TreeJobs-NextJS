
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Navbar: React.FC<{ onNavigate: (page: string) => void; currentPage: string }> = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="bg-white text-primary p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">TREEJOBS</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => onNavigate('home')}
            className={`hover:text-accent transition ${currentPage === 'home' ? 'font-bold underline underline-offset-4' : ''}`}
          >
            Home
          </button>
          {user && (
            <>
              <button 
                onClick={() => onNavigate('dashboard')}
                className={`hover:text-accent transition ${currentPage === 'dashboard' ? 'font-bold underline underline-offset-4' : ''}`}
              >
                Dashboard
              </button>
              {user.role === UserRole.PROVIDER && (
                <button 
                  onClick={() => onNavigate('job-board')}
                  className={`hover:text-accent transition ${currentPage === 'job-board' ? 'font-bold underline underline-offset-4' : ''}`}
                >
                  Browse Jobs
                </button>
              )}
              {user.role === UserRole.CUSTOMER && (
                <button 
                  onClick={() => onNavigate('post-job')}
                  className={`hover:text-accent transition ${currentPage === 'post-job' ? 'font-bold underline underline-offset-4' : ''}`}
                >
                  Post Job
                </button>
              )}
              {user.role === UserRole.ADMIN && (
                <button 
                  onClick={() => onNavigate('admin')}
                  className={`hover:text-accent transition ${currentPage === 'admin' ? 'font-bold underline underline-offset-4' : ''}`}
                >
                  Admin
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium opacity-90 hidden sm:inline">Hi, {user.name}</span>
              <button 
                onClick={() => { logout(); onNavigate('home'); }}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('auth')}
              className="bg-white text-primary hover:bg-light px-6 py-2 rounded-lg text-sm font-bold transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
