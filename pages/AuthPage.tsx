
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const AuthPage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(email);
      if (success) {
        onComplete();
      } else {
        setError('User not found. Try signing up or use john@example.com (customer) or alice@treecare.com (provider)');
      }
    } else {
      signup(name, email, role);
      onComplete();
    }
  };

  const inputClasses = "w-full bg-dark text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 transition-all";

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-dark">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="text-gray-500">{isLogin ? 'Sign in to manage your tree work' : 'Join our tree work marketplace'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}
        
        {!isLogin && (
          <div>
            <label className="block text-sm font-bold text-dark mb-1">Full Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              placeholder="Your Name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-dark mb-1">Email Address</label>
          <input 
            required
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="email@example.com"
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-bold text-dark mb-1">I am a...</label>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setRole(UserRole.CUSTOMER)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${role === UserRole.CUSTOMER ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-primary/50'}`}
              >
                Customer
              </button>
              <button 
                type="button"
                onClick={() => setRole(UserRole.PROVIDER)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${role === UserRole.PROVIDER ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-primary/50'}`}
              >
                Arborist
              </button>
            </div>
          </div>
        )}

        <button 
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow-md hover:bg-opacity-90 transition mt-6 transform active:scale-95"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary font-bold hover:underline transition-all"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>

      {isLogin && (
        <div className="mt-6 p-4 bg-light/50 rounded-lg text-xs text-gray-500 space-y-2">
          <p className="font-bold text-dark/70">Demo Accounts:</p>
          <p><span className="font-semibold">Customer:</span> john@example.com</p>
          <p><span className="font-semibold">Arborist:</span> alice@treecare.com</p>
          <p><span className="font-semibold">Admin:</span> admin@treejobs.com</p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
