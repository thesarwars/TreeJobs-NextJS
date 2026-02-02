
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import JobBoard from './pages/JobBoard';
import PostJob from './pages/PostJob';
import AdminPanel from './pages/AdminPanel';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { user } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'dashboard': return <Dashboard />;
      case 'auth': return <AuthPage onComplete={() => setCurrentPage('dashboard')} />;
      case 'job-board': return <JobBoard />;
      case 'post-job': return <PostJob onComplete={() => setCurrentPage('dashboard')} />;
      case 'admin': return <AdminPanel />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <footer className="bg-dark text-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-4">TREEJOBS</h2>
            <p className="text-gray-400 max-w-sm">The leading marketplace for tree care services. Connecting property owners with certified arborists through a secure, lead-focused platform.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Marketplace</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('job-board')}>Browse Jobs</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('post-job')}>Post a Job</li>
              <li className="hover:text-white cursor-pointer">Arborist Directory</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} TreeJobs Marketplace. All tree work should be performed by insured professionals.
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
