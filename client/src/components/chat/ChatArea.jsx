import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatArea = () => {
  return (
    <main
      id="chat-area"
      className="flex-1 flex flex-col h-screen min-w-0 bg-bg"
    >
      {/* Floating Header */}
      <ChatHeader />

      {/* Messages */}
      <ChatMessages />

      {/* Input */}
      <ChatInput />
    </main>
  );
};

export default ChatArea;
