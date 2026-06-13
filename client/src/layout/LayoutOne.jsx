import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import { useGetProfileQuery } from '../api';
import AuthModal from '../components/modals/AuthModal';

const LayoutOne = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const { data: user, isFetching } = useGetProfileQuery()

  if (!user) return <AuthModal isOpen={true} message={"You need to be signed in to use this app"} />

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