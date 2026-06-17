import React from 'react'
import { FiArrowLeft, FiEye, FiMessageSquare, FiUserCheck, FiUserPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { useGetUsersQuery } from '../api';
import { UserSkeleton } from '../components/ui/SkeletonLoaders';
import { useSelector } from 'react-redux';
import StatusDot from '../components/ui/StatusDot';

const Users = () => {
    const navigate = useNavigate();

    // ----------- Online users -----------
    const onlineUsers = useSelector((state) => state.onlineUsers.users)

    // ----------- From server -----------
    const { data: users, isLoading } = useGetUsersQuery()

    // ----------- Navigate to profile -----------
    const handleNavigate = () => {

    }

    return (
        <section className="w-full">
            <div className='flex items-center justify-between'>
                <h2 className="text-base font-bold text-text-primary tracking-wide">All Users</h2>
                <div className="flex items-center justify-between gap-3 lg:block">
                    <button
                        onClick={() => navigate(-1)}
                        className="shrink-0 flex items-center justify-center cursor-pointer gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-text-secondary px-6 hover:border-border-hover hover:bg-surface-hover hover:text-text-primary "
                    >
                        <FiArrowLeft />
                        <span className="hidden sm:inline">Back to back</span>
                    </button>
                </div>
            </div>

            {
                isLoading ?
                    <UserSkeleton />
                    :
                    <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {
                            users?.data?.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleNavigate(item.id)}
                                    className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:shadow-brand/5 cursor-pointer active:scale-[0.99]"
                                >
                                    <div className="flex min-w-0 items-center gap-3.5">
                                        <div className="relative">
                                            {
                                                item.avatar ?
                                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                                        <img src={item.avatar} alt="avatar" />
                                                    </div>
                                                    :
                                                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient || 'from-brand to-accent'} text-sm font-bold text-white`}>
                                                        {(item.username)?.slice(0, 2)}
                                                    </div>
                                            }
                                            <div className="absolute -bottom-0.5 -right-0.5">
                                                <StatusDot status={onlineUsers.includes(item?._id) ? "online" : "offline"} />
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-text-primary group-hover:text-brand transition-colors">{item.displayName || `@${item.username}`}</p>
                                            {item.displayName && <p className="truncate text-xs text-text-secondary mt-0.5">@{item.username}</p>}
                                        </div>
                                    </div>

                                    {/* Action Buttons Container */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFollow(item.id);
                                            }}
                                            className={`flex h-9 cursor-pointer items-center justify-center gap-1.5 px-4 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${item.isFollowed
                                                ? 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb] border border-[#e5e7eb]' 
                                                : 'bg-[#1f2937] text-white hover:bg-[#111827]'
                                                }`}
                                        >
                                            {item.isFollowed ? (
                                                <>
                                                    <FiUserCheck className="h-3.5 w-3.5" />
                                                    <span>Following</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiUserPlus className="h-3.5 w-3.5" />
                                                    <span>Follow</span>
                                                </>
                                            )}
                                        </button>

                                        {/* Message Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenChat(item.id);
                                            }}
                                            className="flex h-9 cursor-pointer px-3.5 items-center justify-center gap-1.5 rounded-lg bg-brand text-xs font-bold text-white transition-all hover:bg-brand-hover shadow-sm shadow-brand/10 hover:shadow-md hover:shadow-brand/20 active:scale-95"
                                            title="Send Message"
                                        >
                                            <FiMessageSquare className="h-3.5 w-3.5" />
                                            <span className="hidden sm:inline">Message</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </section>
    )
}

export default Users