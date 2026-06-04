import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import Inputs from '../components/ui/Inputs';
import Button from '../components/ui/Buttons';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Quick demo validation
    if (!formData.email) return setError('Email or Username is required');
    if (!formData.password) return setError('Password is required');
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

        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Welcome Back</h1>
        <p className="mt-2 text-text-secondary text-sm">Sign in to continue your conversations.</p>
      </div>

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {error && (
          <div className="p-3.5 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-medium animate-pulse">
            {error}
          </div>
        )}

        <Inputs
          label="Email or Username"
          placeholder="Enter your email or username"
          type="text"
          id="email"
          variant="primary"
          size="md"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={isLoading}
        />

        <Inputs
          label="Password"
          placeholder="Enter your password"
          type="password"
          id="password"
          variant="primary"
          size="md"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          disabled={isLoading}
        />

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between w-full mt-1 mb-2 text-xs">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
            <button type='button' className={` w-4 h-4 rounded-sm border transition-all duration-200 ${rememberMe ? 'bg-coil border-coil' : 'bg-transparent border-zinc-400'}`} aria-label="Keep me signed in" />
            <span className="text-[13px] text-zinc-600 font-medium select-none">
              Remember me
            </span>
          </div>
          <a
            href="#forgot"
            onClick={(e) => e.preventDefault()}
            className="text-accent hover:text-accent-glow font-medium relative group transition-colors duration-200"
          >
            Forgot Password?
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        {/* Action Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full py-3.5 rounded-xl font-bold group relative overflow-hidden mt-2"
        >
          Sign In
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-8 text-center lg:text-left text-sm text-text-secondary w-full">
        Don't have an account?{' '}
        <Link
          to="/auth/signup"
          className="text-accent hover:text-accent-glow font-semibold relative group transition-colors duration-200"
        >
          Create Account
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent group-hover:w-full transition-all duration-300" />
        </Link>
      </p>
    </div>
  );
};

export default Signin;