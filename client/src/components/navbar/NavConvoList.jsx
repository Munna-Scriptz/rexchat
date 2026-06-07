import React from 'react'
import StatusDot from '../ui/StatusDot';

const NavConvoList = ({ conversations, activeConversation, onSelectConversation }) => {

    return (
        <div className="flex-1 overflow-y-auto px-2.5 space-y-0.5">
            {conversations?.map((conv, i) => {
                const isActive = activeConversation === conv._id;
                return (
                    <button
                        key={i}
                        id={`conversation-${conv._id}`}
                        onClick={() => onSelectConversation(conv._id)}
                        className={`w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-2xl transition-all duration-200 text-left group relative
                                ${isActive
                                ? 'bg-brand/10 border border-brand/20 shadow-[0_0_20px_rgba(109,40,217,0.1)]'
                                : 'hover:bg-muted/70 border border-transparent'
                            }`}
                        style={{ animationDelay: `${i * 30}ms` }}
                    >
                        {/* Active indicator */}
                        {isActive && (
                            <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[3px] h-8 bg-accent rounded-r-full shadow-accent" />
                        )}

                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            {
                                conv?.chatUser?.avatar ?
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img src={conv?.chatUser?.avatar} alt="avatar" />
                                    </div>
                                    :
                                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br from-brand to-accent flex items-center justify-center text-white text-sm font-bold shadow-sm
                                        ${isActive ? 'scale-105' : 'group-hover:scale-105'} transition-transform duration-200`}
                                    >
                                        {(conv.chatUser.username)?.slice(0, 2)}
                                    </div>
                            }
                            <div className="absolute -bottom-0.5 -right-0.5">
                                <StatusDot status={conv.status} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className={`text-[13.5px] font-semibold truncate ${isActive ? 'text-text-primary' : 'text-text-primary/90'}`}>
                                    {conv.chatUser.displayName || conv.chatUser.username}
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
    )
}

export default NavConvoList