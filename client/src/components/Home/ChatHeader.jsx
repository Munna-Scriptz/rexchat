import React, { useEffect, useState } from 'react';
import StatusDot from '../ui/StatusDot';
import { ChatHeaderSkeleton } from '../ui/SkeletonLoaders';
import { socket } from '../../api/socketApi';

const ChatHeader = ({ conversation, isLoading }) => {
  const [typingUser, setTypingUser] = useState(false);

  const conv = {
    name: conversation?.chatUser?.displayName || conversation?.chatUser?.username,
    avatar: conversation?.chatUser?.avatar,
    initials: conversation?.chatUser?.displayName?.slice(0, 2) || conversation?.chatUser?.username?.slice(0, 2),
    gradient: 'from-violet-500 to-fuchsia-500',
    status: 'online',
    isTyping: typingUser,
  };

  const statusLabel = {
    online: 'Online',
    away: 'Away',
    offline: 'Offline',
  };

  console.log(typingUser)
  useEffect(() => {
    if (!socket) return;
    socket.on("user_typing", (data) => {
      setTypingUser(true);
    });

    socket.on("user_stopped_typing", () => {
      setTypingUser(false);
    });
  }, [socket]);

  if (isLoading) return <ChatHeaderSkeleton />

  return (
    <header
      id="chat-header"
      className="h-[72px] flex items-center justify-between px-6 rounded-2xl border border-border/60 bg-surface/70 shadow-sm flex-shrink-0 animate-fade-in"
    >
      {/* ─── Left: User Info ─── */}
      <div className="flex items-center gap-3.5">
        <div className="relative">
          {
            conversation?.chatUser?.avatar ?
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={conv?.avatar} alt="avatar" />
              </div>
              :
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white text-sm font-bold">
                {conv.initials}
              </div>
          }
          <div className="absolute -bottom-0.5 -right-0.5">
            <StatusDot status={conv?.status} />
          </div>
        </div>

        <div>
          <h2 className="text-[15px] font-semibold text-text-primary leading-tight">{conv.name}</h2>
          {conv.isTyping ? (
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-accent animate-typing-dot" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 rounded-full bg-accent animate-typing-dot" style={{ animationDelay: '200ms' }} />
                <span className="w-1 h-1 rounded-full bg-accent animate-typing-dot" style={{ animationDelay: '400ms' }} />
              </div>
              <span className="text-[11px] text-accent font-medium">typing</span>
            </div>
          ) : (
            <p className="text-[11px] text-text-muted mt-0.5">{statusLabel[conv.status] || 'Offline'}</p>
          )}
        </div>
      </div>

      {/* ─── Right: Action Buttons ─── */}
      <div className="flex items-center gap-1">
        <button
          id="header-search-btn"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-muted transition-all duration-200"
          aria-label="Search in conversation"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          id="header-call-btn"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-online hover:bg-online/10 transition-all duration-200"
          aria-label="Voice call"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>
        <button
          id="header-video-btn"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-brand-light hover:bg-brand/10 transition-all duration-200"
          aria-label="Video call"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          id="header-more-btn"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-muted transition-all duration-200"
          aria-label="More options"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
