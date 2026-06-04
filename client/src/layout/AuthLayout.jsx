import React from 'react';
import { Outlet } from 'react-router';
import AuthShowcase from '../components/auth/AuthShowcase';

const AuthLayout = () => {
  return (
    <div className="h-screen w-screen flex bg-bg overflow-hidden font-sans">
      {/* Left Showcase Section (55% width, hidden on mobile) */}
      <AuthShowcase />

      {/* Right Auth Forms Section (45% width on desktop, full width on mobile) */}
      <div className="w-full lg:w-[45%] h-full flex flex-col justify-center items-center bg-bg relative overflow-y-auto px-6 sm:px-10 md:px-16 py-12">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;