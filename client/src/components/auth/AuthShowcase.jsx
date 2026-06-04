import React from 'react';
import { useNavigate } from 'react-router';

/* ─── Floating Badge ─── */
const FloatingBadge = ({ children, className = '', delay = '0s' }) => (
  <div
    className={`absolute px-3 py-1.5 rounded-xl bg-surface/80 backdrop-blur-md border border-border/60 shadow-lg text-[11px] font-medium text-text-secondary select-none pointer-events-none ${className}`}
    style={{ animation: `float 6s ease-in-out infinite`, animationDelay: delay }}
  >
    {children}
  </div>
);

/* ─── Mock Conversation Item ─── */
const MockConversation = ({ name, initials, gradient, message, time, unread, online, active }) => (
  <div className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all duration-200 ${active ? 'bg-brand/15 border border-brand/20' : 'hover:bg-white/[0.03]'}`}>
    <div className="relative flex-shrink-0">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-[10px] font-bold`}>
        {initials}
      </div>
      {online && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-online border-[1.5px] border-[#0f1120]" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-text-primary/90 truncate">{name}</span>
        <span className="text-[9px] text-text-muted flex-shrink-0 ml-1">{time}</span>
      </div>
      <p className="text-[10px] text-text-secondary/70 truncate">{message}</p>
    </div>
    {unread > 0 && (
      <span className="min-w-[16px] h-[16px] flex items-center justify-center rounded-full bg-brand text-white text-[8px] font-bold px-1">{unread}</span>
    )}
  </div>
);

/* ─── Mock Message Bubble ─── */
const MockMessage = ({ text, sent, time }) => (
  <div className={`flex ${sent ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[200px] px-2.5 py-1.5 text-[10px] leading-relaxed
      ${sent ? 'bg-brand/90 text-white rounded-xl rounded-br-sm' : 'bg-[#1B2030] text-text-primary/90 rounded-xl rounded-bl-sm'}`}>
      {text}
      <div className={`text-[8px] mt-0.5 ${sent ? 'text-white/50 text-right' : 'text-text-muted/50'}`}>{time}</div>
    </div>
  </div>
);

/* ─── Main Showcase Panel ─── */
const AuthShowcase = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-bg items-center justify-center p-6 xl:p-10 select-none">

      {/* ── Top Left Back Button ── */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 z-30 flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-border-hover hover:shadow-accent/15 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
        title="Go Back to Home"
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

      {/* ── Background Layers ── */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.08] via-bg to-accent/[0.05]" />
        {/* Radial glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand/[0.07] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-light/[0.04] blur-[80px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* ── Floating Badges ── */}
      <FloatingBadge className="top-[12%] right-[14%] z-20" delay="0s">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-online" />
          <span className="text-online font-semibold">2,847 Online</span>
        </span>
      </FloatingBadge>

      <FloatingBadge className="bottom-[20%] left-[8%] z-20" delay="1.5s">
        <span className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent"><polyline points="20 6 9 17 4 12" /></svg>
          <span className="text-accent">Message delivered</span>
        </span>
      </FloatingBadge>

      <FloatingBadge className="top-[20%] left-[6%] z-20" delay="3s">
        <span className="flex items-center gap-1.5">
          <span className="text-sm">🔥</span>
          <span>Trending</span>
        </span>
      </FloatingBadge>

      <FloatingBadge className="bottom-[32%] right-[6%] z-20" delay="2s">
        <span className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-accent animate-typing-dot" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-1 rounded-full bg-accent animate-typing-dot" style={{ animationDelay: '200ms' }} />
            <span className="w-1 h-1 rounded-full bg-accent animate-typing-dot" style={{ animationDelay: '400ms' }} />
          </div>
          <span className="text-text-muted">3 typing</span>
        </span>
      </FloatingBadge>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center max-w-xl w-full">

        {/* ── Headline ── */}
        <div className="text-center mb-6 xl:mb-8 animate-fade-in">
          <h2 className="text-3xl xl:text-4xl font-bold text-text-primary leading-tight tracking-tight">
            Where Conversations
            <br />
            <span className="bg-gradient-to-r from-brand-light via-accent to-brand bg-clip-text text-transparent">
              Feel Alive.
            </span>
          </h2>
          <p className="mt-3 text-text-secondary text-xs xl:text-sm leading-relaxed max-w-xs xl:max-w-md mx-auto">
            Realtime messaging, group conversations, file sharing, and seamless collaboration — all in one beautiful experience.
          </p>
        </div>

        {/* ── Product Preview Mockup ── */}
        <div className="relative w-full max-w-[380px] xl:max-w-[400px] animate-scale-in" style={{ animationDelay: '150ms' }}>
          {/* Outer glow */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand/20 via-transparent to-accent/10 blur-xl opacity-60" />

          {/* Chat mockup container */}
          <div className="relative bg-surface/90 backdrop-blur-xl rounded-2xl border border-border/70 shadow-lg overflow-hidden">
            {/* Mockup Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand to-accent flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-text-primary">RexChat</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-online" />
                    <span className="text-[8px] text-text-muted">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-1 h-1 rounded-full bg-text-muted" />
                ))}
              </div>
            </div>

            {/* Split view: Conversations + Messages */}
            <div className="flex h-[245px]">
              {/* Conversation sidebar */}
              <div className="w-[145px] border-r border-border/40 py-1.5 px-1 flex-shrink-0 overflow-hidden">
                <div className="space-y-0.5">
                  <MockConversation name="Design Team" initials="DT" gradient="from-cyan-500 to-blue-500" message="Let's ship this! 🚀" time="2m" unread={4} online active />
                  <MockConversation name="Sarah K." initials="SK" gradient="from-violet-500 to-fuchsia-500" message="Looks great!" time="15m" unread={0} online />
                  <MockConversation name="Alex Chen" initials="AC" gradient="from-amber-500 to-orange-500" message="On my way" time="1h" unread={1} />
                  <MockConversation name="Product" initials="PR" gradient="from-emerald-500 to-teal-500" message="v2.0 shipped ✅" time="3h" unread={0} online />
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 flex flex-col">
                {/* Messages header */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border/30">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-[7px] text-white font-bold">DT</div>
                  <div>
                    <span className="text-[10px] font-semibold text-text-primary">Design Team</span>
                    <div className="flex items-center gap-0.5">
                      <span className="text-[8px] text-text-muted">5 members</span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 px-2.5 py-1.5 space-y-1.5 overflow-hidden">
                  <MockMessage text="The new components look amazing 🎨" sent={false} time="9:14 AM" />
                  <MockMessage text="Thanks! Polished the hover states" sent={true} time="9:15 AM" />
                  <MockMessage text="Let's ship this! 🚀" sent={false} time="9:16 AM" />
                </div>

                {/* Input bar */}
                <div className="px-2.5 py-1.5 border-t border-border/30">
                  <div className="flex items-center gap-1.5 bg-muted/60 rounded-md px-2 py-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                    <span className="text-[9px] text-text-muted flex-1">Type a message...</span>
                    <div className="w-4 h-4 rounded bg-brand/80 flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="-rotate-45"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="flex items-center gap-2.5 mt-6 xl:mt-8 w-full max-w-[380px] xl:max-w-[400px] animate-slide-up" style={{ animationDelay: '300ms' }}>
          {[
            { value: '100K+', label: 'Messages Daily' },
            { value: '99.9%', label: 'Uptime' },
            { value: '50K+', label: 'Active Users' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex-1 px-3 py-2 rounded-xl bg-white/[0.03] backdrop-blur-md border border-border/40 text-center hover:bg-white/[0.06] hover:border-border-hover transition-all duration-300 group cursor-default"
            >
              <div className="text-base font-bold text-text-primary group-hover:text-accent transition-colors duration-300">{stat.value}</div>
              <div className="text-[8px] text-text-muted mt-0.5 uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthShowcase;
