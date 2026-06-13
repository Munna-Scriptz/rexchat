import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSendMessageMutation } from '../../api';

const ChatInput = ({ conversation }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const [createSend] = useSendMessageMutation()

  /* Auto-resize textarea */
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 140) + 'px';
    }
  }, [message]);

  // --------------- Handle Send messgae --------------
  const sendMessage = async () => {
    try {
      setMessage("")
      await createSend({ text: message, conversation }).unwrap()
    } catch (error) {
      toast.error(error?.data?.message)
    }
  };

  // --------------- Handle key down --------------
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage()
    }
  };



  return (
    <div
      id="chat-input"
      className="flex-shrink-0 pt-2"
    >
      <div className={`flex items-end gap-2.5 px-4 py-3 rounded-2xl border transition-all duration-300 bg-surface/70 backdrop-blur-xl
        ${isFocused
          ? 'border-accent/30 shadow-[0_0_0_3px_rgba(0,229,255,0.06),0_-4px_20px_rgba(0,0,0,0.15)]'
          : 'border-border/60 shadow-sm'
        }`}
      >
        {/* Attachment Button */}
        <button
          id="input-attach-btn"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200 flex-shrink-0 mb-0.5"
          aria-label="Attach file"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            id="message-input"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full resize-none bg-transparent text-[14px] text-text-primary placeholder-text-muted outline-none leading-relaxed max-h-[140px] py-1"
          />
        </div>

        {/* Emoji Button */}
        <button
          id="input-emoji-btn"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-warning hover:bg-warning/10 transition-all duration-200 flex-shrink-0 mb-0.5"
          aria-label="Emoji picker"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </button>

        {/* Send Button */}
        <button
          id="input-send-btn"
          onClick={sendMessage}
          disabled={!message.trim()}
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 mb-0.5
            ${message.trim()
              ? 'bg-gradient-to-r from-brand to-brand-light text-white shadow-brand hover:shadow-[0_0_30px_rgba(109,40,217,0.5)] hover:scale-105 active:scale-95'
              : 'bg-muted text-text-muted cursor-not-allowed'
            }`}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 ${message.trim() ? '-rotate-45' : ''}`}
          >
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
