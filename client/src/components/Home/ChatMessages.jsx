import React, { useEffect, useRef } from 'react';
import { ChatEmptyState } from '../ui/EmptyState';
import { ChatMessagesSkeleton } from '../ui/SkeletonLoaders';
import { useDispatch } from 'react-redux';
import { useMarkAsSeenMutation } from '../../api';
import { clearUnread } from '../../redux/slices/unreadSlice';
import MessageBubble from '../common/MessageBubble';


/* ─── Main Component ─── */
const ChatMessages = ({ conversationId, messages, userId, chatUserId, isLoading }) => {
  const idMatches = (left, right) => left?.toString?.() === right?.toString?.();

  const dispatch = useDispatch()
  const [markSeen] = useMarkAsSeenMutation()


  // --------- Scroll to bottom ---------
  const scrollRef = useRef(null);
  const hasMessages = Array.isArray(messages) && messages.some((msg) => msg?.type !== 'date');
  const lastOutgoingIndex = Array.isArray(messages)
    ? messages.reduce((lastIndex, msg, index) => (
      msg?.type !== 'date' && idMatches(msg?.sender, userId) ? index : lastIndex
    ), -1)
    : -1;

  useEffect(() => {
    if (scrollRef.current && hasMessages) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, hasMessages]);

  // --------- Seen handler ---------
  useEffect(() => {
    const unseenIncoming = Array.isArray(messages)
      ? messages.some((message) => message?.sender && !idMatches(message.sender, userId) && !(Array.isArray(message?.seenBy) && message.seenBy.some((id) => idMatches(id, userId))))
      : false;

    if (!conversationId || !userId || !chatUserId || !unseenIncoming) return;

    dispatch(clearUnread(conversationId));
    markSeen(conversationId);
  }, [conversationId, chatUserId, dispatch, markSeen, messages, userId]);

  // --------- Skeleton loader ---------
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
            <div className="flex items-center justify-center py-4" role="separator">
              <div className="px-4 py-1.5 bg-muted/60 rounded-full border border-border/50">
                <span className="text-[11px] font-medium text-text-muted tracking-wide">{msg.text}</span>
              </div>
            </div>
          ) : (
            <MessageBubble
              key={i}
              message={msg}
              userId={userId}
              chatUserId={chatUserId}
              idMatches={idMatches}
              index={i}
              showSeen={i === lastOutgoingIndex}
            />
          )
        )
      )}

      {/* Bottom spacer */}
      <div className="h-2" />
    </div>
  );
};

export default ChatMessages;
