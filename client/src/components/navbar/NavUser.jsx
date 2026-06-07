import React from 'react'
import { Link } from 'react-router';
import { FiLogOut } from 'react-icons/fi';
import { LuSettings } from 'react-icons/lu';
import StatusDot from '../ui/StatusDot';
import { useGetProfileQuery } from '../../api';

const NavUser = () => {
    const { data: user, isFetching } = useGetProfileQuery()


    return (
        <>
            {
                isFetching ?
                    <div className="flex-shrink-0 p-3 border-t border-border animate-pulse">
                        <div className="flex items-center gap-3 px-2 py-2 rounded-2xl">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-muted" />
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-muted border-2 border-background" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="h-4 bg-muted rounded w-24" />
                                <div className="h-3 bg-muted rounded w-12" />
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-8 h-8 rounded-lg bg-muted" />
                                <div className="w-8 h-8 rounded-lg bg-muted" />
                            </div>
                        </div>
                    </div>
                    :
                    <Link to={"/user"} className="flex-shrink-0 p-3 border-t border-border">
                        <div className="flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-muted/50 transition-all duration-200 cursor-pointer group">
                            <div className="relative">
                                {
                                    user?.data?.avatar ?
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img src={user?.data?.avatar} alt="avatar" />
                                        </div>
                                        :
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white text-sm font-bold">
                                            {(user?.data?.username)?.slice(0, 2)}
                                        </div>
                                }
                                <div className="absolute -bottom-0.5 -right-0.5">
                                    <StatusDot status="online" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-text-primary truncate">{user?.data?.username}</p>
                                <p className="text-[11px] text-text-muted truncate">Online</p>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                    to="/user"
                                    id="user-settings-btn"
                                    className="w-8 h-8 rounded-lg text-lg cursor-pointer flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-elevated transition-all duration-200"
                                    aria-label="User settings"
                                >
                                    <LuSettings />
                                </button>
                                <button
                                    id="user-logout-btn"
                                    className="w-8 h-8 rounded-lg text-lg cursor-pointer flex items-center justify-center text-text-muted hover:text-error hover:bg-error/10 transition-all duration-200"
                                    aria-label="Logout"
                                >
                                    <FiLogOut />
                                </button>
                            </div>
                        </div>
                    </Link>
            }
        </>
    )
}

export default NavUser
