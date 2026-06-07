import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';

const LayoutOne = () => {
  const [activeConversation, setActiveConversation] = useState(1);


  return (
    <section className="flex h-screen w-screen overflow-hidden bg-bg">
      <Navbar
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
      />
      <Outlet />
    </section>
  );
};

export default LayoutOne;