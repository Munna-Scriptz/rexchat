import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import Inputs from '../components/ui/Inputs';
import Button from '../components/ui/Buttons';
import toast from 'react-hot-toast';
import { useSigninMutation } from '../api';

const Signin = () => {
  const navigate = useNavigate();
  const [createSignin, { isLoading }] = useSigninMutation()

  const [formData, setFormData] = useState({
    username: '',
    usernameErr: '',
    password: '',
    passwordErr: '',
  });

  const [rememberMe, setRememberMe] = useState(false)

  // ---------- Handle Submit ------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Quick demo validation
    if (!formData.username) return setFormData((prev) => ({ ...prev, usernameErr: "Username or email is required" }));
    if (!formData.password) return setFormData((prev) => ({ ...prev, passwordErr: "Password is required" }));


    try {
      await createSignin(formData).unwrap()

      toast.success("Logged in successfully!")

      setTimeout(() => {
        navigate('/');
      }, 800);
    } catch (error) {
      if (error?.data?.message == "User with this username or email doesn't exists") return setFormData((prev) => ({ ...prev, usernameErr: "Account not found" }));
      if (error?.data?.message == "Invalid or incorrect password!") return setFormData((prev) => ({ ...prev, passwordErr: "incorrect password" }));
      toast.error(error?.data?.message)
      console.log(error);
    }
  };

  // ---------- Handle Input change ------------
  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value, [`${key}Err`]: "" }));
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
        <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Welcome Back</h2>
        <p className="mt-2 text-text-secondary text-sm">Sign in to continue your conversations.</p>
      </div>

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Inputs
          label="Username or email"
          placeholder="Enter your username or email"
          type="text"
          id="username"
          variant="primary"
          size="md"
          value={formData.username}
          error={formData.usernameErr}
          onChange={(e) => handleInputChange('username', e.target.value)}
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
          error={formData.passwordErr}
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

        {/* Divider */}
        <div className="flex items-center gap-4 my-2">
          <div className="h-[1px] flex-1 bg-border/60"></div>
          <span className="text-[10px] text-text-secondary/50 font-bold uppercase tracking-wider select-none">Or continue with</span>
          <div className="h-[1px] flex-1 bg-border/60"></div>
        </div>

        {/* Google Authentication Button */}
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all duration-300 border border-border hover:border-text-secondary/30 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="select-none">
            <path
              fill="#EA4335"
              d="M12 5.04c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.6 15 1 12 1 7.3 1 3.3 3.7 1.4 7.7l3.9 3C6.2 7.7 8.9 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.7-.2-2.5H12v4.8h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.8 3c2.2-2 3.6-5 3.6-9z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.4 6.2C.5 8 .0 10 .0 12c0 2 .5 4 1.4 5.8l3.9-3z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1 8-3l-3.8-3c-1.1.7-2.6 1.2-4.2 1.2-3.1 0-5.8-2.6-6.7-5.7l-3.9 3C3.3 20.3 7.3 23 12 23z"
            />
          </svg>
          Continue with Google
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