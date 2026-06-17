import React, { useRef, useEffect } from 'react';
import { ChatEmptyState } from '../ui/EmptyState';
import { ChatMessagesSkeleton } from '../ui/SkeletonLoaders';

/* ─── Mock Messages ─── */
const mockMessages = [
  { id: 1, type: 'date', text: 'Today' },
  { id: 2, sender: 'them', text: 'Hey! Have you seen the new design system I pushed?', time: '9:14 AM' },
  { id: 3, sender: 'me', text: 'Not yet! Let me pull the latest changes.', time: '9:15 AM' },
  { id: 4, sender: 'them', text: 'Take your time. I completely reworked the color palette and typography scale. Everything uses CSS custom properties now.', time: '9:16 AM' },
  { id: 5, sender: 'me', text: 'That sounds amazing. We really needed that consistency across components.', time: '9:18 AM' },
  { id: 6, sender: 'them', text: 'Exactly! And I added a glassmorphism layer for the header and input areas. It looks incredible on the dark theme 🔥', time: '9:19 AM' },
  { id: 7, sender: 'me', text: 'Glassmorphism on dark themes is *chef\'s kiss*. Did you test it across browsers?', time: '9:21 AM' },
  { id: 8, sender: 'them', text: 'Yes! Chrome, Firefox, Safari, and Edge. All looking great. I also added smooth animations for message transitions.', time: '9:22 AM' },
  { id: 9, sender: 'me', text: 'Perfect. I\'ll review it now and push some refinements to the sidebar component.', time: '9:24 AM' },
  { id: 10, sender: 'them', text: 'Sounds good! I also want to discuss the navigation patterns. Should we go with pill-style tabs or a vertical icon bar?', time: '9:25 AM' },
  { id: 11, sender: 'me', text: 'I think pill-style tabs work better for our use case. They\'re more scannable and feel more modern.', time: '9:27 AM' },
  { id: 12, sender: 'them', text: 'Agreed! I\'ll prototype both and we can A/B test with the team. Also, check out the micro-interactions I added to the conversation list items ✨', time: '9:28 AM' },
  { id: 13, sender: 'me', text: 'Will do! Quick question — are we sticking with Inter for typography or switching to something else?', time: '9:30 AM' },
  { id: 14, sender: 'them', text: 'Inter is perfect for this. Clean, professional, and excellent readability at small sizes. Plus it has great variable font support.', time: '9:31 AM' },
  { id: 15, sender: 'me', text: 'That design looks incredible! Let me review the full spec and I\'ll have feedback by lunch 🚀', time: '9:33 AM' },
  { id: 16, sender: 'them', text: 'Amazing! Take your time. Here\'s the Figma link if you want to compare:', time: '9:34 AM' },
  { id: 17, sender: 'them', text: 'figma.com/file/rexchat-v2-design-system', time: '9:34 AM', isLink: true },
];

/* ─── Check Icons ─── */
const SingleCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted/60">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DoubleCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent/70">
    <polyline points="18 6 7 17 2 12" />
    <polyline points="22 6 11 17" />
  </svg>
);

/* ─── Date Separator ─── */
const DateSeparator = ({ text }) => (
  <div className="flex items-center justify-center py-4" role="separator">
    <div className="px-4 py-1.5 bg-muted/60 rounded-full border border-border/50">
      <span className="text-[11px] font-medium text-text-muted tracking-wide">{text}</span>
    </div>
  </div>
);

/* ─── Message Bubble ─── */
const MessageBubble = ({ message, index, userId }) => {
  const isMe = message.sender == userId;

  return (
    <div
      className={`flex ${isMe ? 'justify-end' : 'justify-start'} group animate-message-in `}
      style={{ animationDelay: `${index * 25}ms` }}
    >
      <div className={`max-w-[520px] relative`}>
        <div
          className={`px-4 py-2.5 text-[14px] leading-relaxed transition-colors duration-150
            ${isMe
              ? 'bg-chat-sent hover:bg-chat-sent-hover text-white rounded-2xl rounded-br-md'
              : 'bg-chat-received hover:bg-chat-received-hover text-text-primary rounded-2xl rounded-bl-md'
            }
            ${message.isLink ? 'underline decoration-accent/40 underline-offset-2' : ''}
          `}
        >
          {message.text}
        </div>

        {/* Timestamp + Read Status */}
        <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[10px] text-text-muted/60">{message.time}</span>
          {isMe && <DoubleCheck />}
        </div>

        {/* Hover Actions */}
        <div className={`absolute top-1/2 -translate-y-1/2 ${isMe ? '-left-10' : '-right-10'} opacity-0 group-hover:opacity-100 transition-all duration-200`}>
          <div className="flex items-center gap-0.5">
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-muted transition-all duration-200"
              aria-label="React"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const ChatMessages = ({ messages, userId, isLoading }) => {


  const scrollRef = useRef(null);
  const hasMessages = Array.isArray(messages) && messages.some((msg) => msg?.type !== 'date');

  useEffect(() => {
    if (scrollRef.current && hasMessages) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, hasMessages]);
  
  if (isLoading) return <ChatMessagesSkeleton />
  return (
    <div
      id="chat-messages"
      ref={scrollRef}
      className="flex-1 overflow-y-auto py-2 space-y-1"
    >
      {!hasMessages ? (
        <ChatEmptyState />
      ) : (
        messages?.map((msg, i) =>
          msg.type === 'date' ? (
            <DateSeparator key={i} text={msg.text} />
          ) : (
            <MessageBubble key={i} message={msg} userId={userId} index={i} />
          )
        )
      )}

      {/* Bottom spacer */}
      <div className="h-2" />
    </div>
  );
};

export default ChatMessages;
