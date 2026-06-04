import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import Inputs from '../components/ui/Inputs';
import Button from '../components/ui/Buttons';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Form validations
    if (!formData.username) return setError('Username is required');
    if (!formData.email) return setError('Email address is required');
    if (!formData.password) return setError('Password is required');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters');

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to chat home
      navigate('/');
    }, 1500);
  };

  const handleInputChange = (key, value) => {
    setError('');
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-[460px] flex flex-col items-center lg:items-start animate-fade-in">
      {/* Top Left Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-6 sm:left-10 lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-border-hover hover:shadow-accent/15 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
        title="Go Back"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-x-0.5 transition-transform"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      {/* Logo & Headline */}
      <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left mb-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand via-brand-light to-accent flex items-center justify-center shadow-brand shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-text-primary to-coil bg-clip-text text-transparent tracking-tight text-glow select-none">RexChat</span>
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Create Account</h1>
        <p className="mt-2 text-text-secondary text-sm">Start chatting with people around the world.</p>
      </div>

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {error && (
          <div className="p-3.5 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-medium animate-pulse">
            {error}
          </div>
        )}

        <Inputs
          label="Username"
          placeholder="Enter username"
          type="text"
          id="username"
          variant="primary"
          size="md"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          disabled={isLoading}
        />

        <Inputs
          label="Email Address"
          placeholder="Enter email address"
          type="email"
          id="email"
          variant="primary"
          size="md"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={isLoading}
        />

        <Inputs
          label="Password"
          placeholder="Create a strong password"
          type="password"
          id="password"
          variant="primary"
          size="md"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          disabled={isLoading}
        />

        {/* Action Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full py-3.5 rounded-xl font-bold group relative overflow-hidden mt-4"
        >
          Create Account
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-8 text-center lg:text-left text-sm text-text-secondary w-full">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="text-accent hover:text-accent-glow font-semibold relative group transition-colors duration-200"
        >
          Sign In
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent group-hover:w-full transition-all duration-300" />
        </Link>
      </p>
    </div>
  );
};

export default Signup;