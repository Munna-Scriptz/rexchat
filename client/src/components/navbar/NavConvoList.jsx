import React from 'react'
import StatusDot from '../ui/StatusDot';
import FormatTime from '../../utils/FormatTime';
import { ConvoListSkeleton } from '../ui/SkeletonLoaders';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ConvoEmptyState } from '../ui/EmptyState';
import { useMarkAsSeenMutation } from '../../api';
import { clearUnread } from '../../redux/slices/unreadSlice';

const NavConvoList = ({ conversations, isLoading }) => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    // ----------- mark seen fetch 
    const [markSeen] = useMarkAsSeenMutation()
    const unreadCounts = useSelector(state => state.unread.unreadCounts);

    // ----------- Online users 
    const onlineUsers = useSelector((state) => state.onlineUsers.users)
    const lastMessage = useSelector((state) => state.messages.messages).slice(-1)[0]
    // ----------- Handle Params 
    const handleParams = async (id) => {
        navigate(`/${id}`)

        if (!params?.id) {
            dispatch(clearUnread(id));
            await markSeen(id)
        }
    }


    // ----------- Skeleton loader 
    if (isLoading) return <ConvoListSkeleton />

    if (!conversations?.length) {
        return (
            <ConvoEmptyState />
        )
    }

    return (
        <div className="flex-1 overflow-y-auto px-2.5 space-y-0.5">
            {conversations?.map((conv, i) => {
                const isActive = params?.id === conv._id;
                const unreadCount = unreadCounts[conv._id] || 0;
                return (
                    <button
                        key={i}
                        id={`conversation-${conv._id}`}
                        onClick={() => handleParams(conv._id)}
                        className={`w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-2xl transition-all duration-300 text-left group relative border
                                ${isActive
                                ? 'bg-brand/10 border-brand/20 shadow-[0_0_20px_rgba(109,40,217,0.1)]'
                                : unreadCount > 0
                                    ? 'bg-brand/5 border-brand/20 shadow-sm hover:bg-brand/10'
                                    : 'border-transparent hover:bg-muted/70 opacity-90 hover:opacity-100'
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
                                        <img src={conv?.chatUser?.avatar} className="w-full h-full object-cover" alt="avatar" />
                                    </div>
                                    :
                                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br from-brand to-accent flex items-center justify-center text-white text-sm font-bold shadow-sm
                                        ${isActive ? 'scale-105' : 'group-hover:scale-105'} transition-transform duration-200`}
                                    >
                                        {(conv.chatUser.username)?.slice(0, 2)}
                                    </div>
                            }
                            <div className="absolute -bottom-0.5 -right-0.5">
                                <StatusDot status={onlineUsers.includes(conv?.chatUser?._id) ? "online" : "offline"} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className={`text-[13.5px] truncate ${isActive || unreadCount > 0 ? 'font-bold text-text-primary' : 'font-semibold text-text-primary/80'}`}>
                                    {conv.chatUser.displayName || conv.chatUser.username}
                                </span>
                                <span className={`text-[11px] flex-shrink-0 ml-2 transition-colors ${unreadCount > 0 ? 'text-brand font-bold' : 'text-text-muted'}`}>
                                    {FormatTime(conv.updatedAt)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className={`text-xs truncate pr-2 leading-relaxed transition-colors ${unreadCount > 0 ? 'text-text-primary font-semibold' : 'text-text-secondary font-normal'}`}>
                                    {lastMessage?.text}
                                </p>
                                {unreadCount > 0 && (
                                    <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-brand text-white text-[10px] font-bold px-1.5 flex-shrink-0 shadow-sm shadow-brand/40 animate-pulse-slow">
                                        {unreadCount}
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