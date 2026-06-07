import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';

const LayoutOne = () => {
  const [activeConversation, setActiveConversation] = useState(1);


  return (
    <main className="flex h-screen w-screen overflow-hidden bg-bg">
      <Navbar
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
      />
      <section className='p-5 w-full overflow-y-auto flex h-screen '>
        <Outlet />
      </section>
    </main>
  );
};

export default LayoutOne;