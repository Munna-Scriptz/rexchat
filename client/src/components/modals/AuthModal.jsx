import React, { useEffect } from 'react';
import { FiLogIn, FiUserPlus, FiX } from 'react-icons/fi';
import { Link } from 'react-router';

const AuthModal = ({ isOpen, onClose, message = "You need to be signed in to perform this action." }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Animated subtle background blobs for premium feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div 
        className="relative w-full max-w-md overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 z-10"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="px-8 pt-10 pb-8 relative">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px] shadow-lg mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center">
                <FiLogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-3">
              Hold up!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {message}
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/auth/signin" 
              onClick={onClose}
              className="group relative flex items-center justify-center w-full px-4 py-3.5 text-sm font-semibold text-white transition-all duration-200 bg-gray-900 dark:bg-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Sign In to Continue
              <FiLogIn className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-medium uppercase tracking-wider text-gray-400">
                New here?
              </span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            <Link 
              to="/auth/signup" 
              onClick={onClose}
              className="group flex items-center justify-center w-full px-4 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-all duration-200 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
            >
              <FiUserPlus className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
              Create an Account
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background click to close */}
      <div className="absolute inset-0 z-[-1]" onClick={onClose} />
    </div>
  );
};

export default AuthModal;