import React, { useState } from 'react';

/* ─── Mock Data ─── */
const conversations = [
  {
    id: 1, name: 'Sophia Chen', initials: 'SC', gradient: 'from-violet-500 to-fuchsia-500',
    lastMessage: 'That design looks incredible! Let me review it...', time: '2m',
    unread: 3, status: 'online', pinned: true,
  },
  {
    id: 2, name: 'Design Team', initials: 'DT', gradient: 'from-cyan-500 to-blue-500',
    lastMessage: 'Alex: Pushed the new component library 🚀', time: '15m',
    unread: 12, status: 'online', isGroup: true,
  },
  {
    id: 3, name: 'Marcus Rivera', initials: 'MR', gradient: 'from-amber-500 to-orange-500',
    lastMessage: 'Can we hop on a quick call?', time: '1h',
    unread: 1, status: 'away',
  },
  {
    id: 4, name: 'Emma Watson', initials: 'EW', gradient: 'from-emerald-500 to-teal-500',
    lastMessage: 'The API integration is complete ✅', time: '2h',
    unread: 0, status: 'online',
  },
  {
    id: 5, name: 'RexChat Team', initials: 'RC', gradient: 'from-brand to-accent',
    lastMessage: 'You: Shipped v2.0 to production', time: '3h',
    unread: 0, status: 'online', isGroup: true,
  },
  {
    id: 6, name: 'Liam Park', initials: 'LP', gradient: 'from-rose-500 to-pink-500',
    lastMessage: 'Hey, are you free for lunch tomorrow?', time: '5h',
    unread: 0, status: 'offline',
  },
  {
    id: 7, name: 'Aria Patel', initials: 'AP', gradient: 'from-indigo-500 to-violet-500',
    lastMessage: 'I sent you the figma file', time: 'Yesterday',
    unread: 0, status: 'offline',
  },
  {
    id: 8, name: 'Product Launch', initials: 'PL', gradient: 'from-sky-500 to-cyan-500',
    lastMessage: 'Nina: Timeline updated for Q3', time: 'Yesterday',
    unread: 0, status: 'online', isGroup: true,
  },
  {
    id: 9, name: 'Jake Morrison', initials: 'JM', gradient: 'from-lime-500 to-green-500',
    lastMessage: 'Thanks for the feedback!', time: '2d',
    unread: 0, status: 'offline',
  },
];

const navItems = [
  { label: 'Chats', icon: 'chat', badge: 16 },
  { label: 'Groups', icon: 'group', badge: 3 },
  { label: 'Calls', icon: 'call', badge: 0 },
  { label: 'Friends', icon: 'friends', badge: 0 },
  { label: 'Archive', icon: 'archive', badge: 0 },
];

/* ─── Icon Components ─── */
const icons = {
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  group: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  call: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  friends: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  archive: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  bell: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  logout: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

/* ─── Status Dot ─── */
const StatusDot = ({ status, size = 'sm' }) => {
  const sizeClasses = size === 'lg' ? 'w-3.5 h-3.5 border-2' : 'w-2.5 h-2.5 border-[2px]';
  const colorMap = { online: 'bg-online', away: 'bg-away', offline: 'bg-offline' };
  return (
    <span className={`${sizeClasses} ${colorMap[status] || 'bg-offline'} rounded-full border-surface block`} />
  );
};

const ChatSidebar = ({ activeConversation, onSelectConversation }) => {
  const [activeNav, setActiveNav] = useState('Chats');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <aside
      id="chat-sidebar"
      className="w-80 h-screen flex flex-col bg-surface border-r border-border flex-shrink-0 select-none"
    >
      {/* ══════════ Header ══════════ */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-accent flex items-center justify-center shadow-brand">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-primary tracking-tight">RexChat</h1>
            <span className="w-2 h-2 rounded-full bg-online shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            id="sidebar-notifications-btn"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-muted transition-all duration-200 relative"
            aria-label="Notifications"
          >
            {icons.bell}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
          </button>
          <button
            id="sidebar-settings-btn"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-muted transition-all duration-200"
            aria-label="Settings"
          >
            {icons.settings}
          </button>
        </div>
      </div>

      {/* ══════════ Search ══════════ */}
      <div className="px-4 pb-3 flex-shrink-0">
        <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-[1.01]' : ''}`}>
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none transition-colors duration-200">
            {icons.search}
          </span>
          <input
            id="sidebar-search"
            type="text"
            placeholder="Search conversations..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-sm text-text-primary placeholder-text-muted border transition-all duration-300 outline-none
              ${searchFocused
                ? 'border-accent/40 shadow-[0_0_0_3px_rgba(0,229,255,0.08)] bg-bg'
                : 'border-transparent hover:border-border hover:bg-surface-hover'
              }`}
          />
        </div>
      </div>

      {/* ══════════ Navigation Tabs ══════════ */}
      <div className="px-4 pb-3 flex-shrink-0">
        <div className="flex overflow-x-auto gap-1 p-1 bg-muted/50 rounded-xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              id={`nav-${item.label.toLowerCase()}`}
              onClick={() => setActiveNav(item.label)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-300 relative
                ${activeNav === item.label
                  ? 'bg-gradient-to-r from-brand to-brand-light text-white shadow-brand'
                  : 'text-text-muted hover:text-text-secondary hover:bg-muted'
                }`}
            >
              <span className="flex items-center">{icons[item.icon]}</span>
              <span className="hidden lg:inline">{item.label}</span>
              {item.badge > 0 && (
                <span className={`min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold px-1
                  ${activeNav === item.label
                    ? 'bg-white/20 text-white'
                    : 'bg-brand/20 text-brand-light'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════ Conversation List ══════════ */}
      <div className="flex-1 overflow-y-auto px-2.5 space-y-0.5">
        {conversations.map((conv, index) => {
          const isActive = activeConversation === conv.id;
          return (
            <button
              key={conv.id}
              id={`conversation-${conv.id}`}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 text-left group relative
                ${isActive
                  ? 'bg-brand/10 border border-brand/20 shadow-[0_0_20px_rgba(109,40,217,0.1)]'
                  : 'hover:bg-muted/70 border border-transparent'
                }`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[3px] h-8 bg-accent rounded-r-full shadow-accent" />
              )}

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${conv.gradient} flex items-center justify-center text-white text-sm font-bold shadow-sm
                  ${isActive ? 'scale-105' : 'group-hover:scale-105'} transition-transform duration-200`}
                >
                  {conv.initials}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5">
                  <StatusDot status={conv.status} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[13.5px] font-semibold truncate ${isActive ? 'text-text-primary' : 'text-text-primary/90'}`}>
                    {conv.name}
                  </span>
                  <span className={`text-[11px] flex-shrink-0 ml-2 ${conv.unread > 0 ? 'text-accent font-medium' : 'text-text-muted'}`}>
                    {conv.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-secondary truncate pr-2 leading-relaxed">
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-brand text-white text-[10px] font-bold px-1.5 flex-shrink-0 shadow-brand">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ══════════ Bottom User Profile ══════════ */}
      <div className="flex-shrink-0 p-3 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-muted/50 transition-all duration-200 cursor-pointer group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white text-sm font-bold">
              YU
            </div>
            <div className="absolute -bottom-0.5 -right-0.5">
              <StatusDot status="online" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">You</p>
            <p className="text-[11px] text-text-muted truncate">Online</p>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              id="user-settings-btn"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-elevated transition-all duration-200"
              aria-label="User settings"
            >
              {icons.settings}
            </button>
            <button
              id="user-logout-btn"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-error hover:bg-error/10 transition-all duration-200"
              aria-label="Logout"
            >
              {icons.logout}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
