import React from 'react'
import { LuCheck, LuCheckCheck } from 'react-icons/lu';

const MessageBubble = ({ message, index, userId, chatUserId, idMatches }) => {


    const isMe = message.sender == userId;
    const isSeen = isMe && Array.isArray(message.seenBy) && message.seenBy.some((id) => idMatches(id, chatUserId));

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
                    <span className="text-[10px]">{message.time}</span>
                    {isMe && (isSeen ? <LuCheckCheck className="text-accent/70" /> : <LuCheck className='text-text-muted/60' />)}
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

}

export default MessageBubble