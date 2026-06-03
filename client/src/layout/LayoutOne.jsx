import React, { useState } from 'react';
import { Outlet } from 'react-router';
import ChatSidebar from '../components/chat/ChatSidebar';

const LayoutOne = () => {
  const [activeConversation, setActiveConversation] = useState(1);

  return (
    <section className="flex h-screen w-screen overflow-hidden bg-bg">
      <ChatSidebar
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
      />
      <Outlet context={{ activeConversation }} />
    </section>
  );
};

export default LayoutOne;