import React from 'react'
import { FiLock, FiLogOut, FiSlash, FiSun, FiUser, FiUserPlus, FiUsers, } from 'react-icons/fi';
import { NavLink } from 'react-router';
import { useGetProfileQuery } from '../../api';
import { HiOutlineSparkles } from 'react-icons/hi2';

const UserNavbar = () => {
    const { data: user, isFetching } = useGetProfileQuery();

    const tabs = [
        { path: '/user', label: 'Profile', icon: FiUser },
        { path: '/user/friends', label: 'Friends', icon: FiUsers },
        { path: '/user/followers', label: 'Followers', icon: FiUserPlus },
        { path: '/user/preferences', label: 'Preferences', icon: FiSun },
        { path: '/user/security', label: 'Security', icon: FiLock },
        { path: '/user/groups', label: 'Groups', icon: HiOutlineSparkles },
        { path: '/user/blocked', label: 'Blocked', icon: FiSlash },
    ];
    return (
        <>
            <aside className="lg:sticky lg:top-0 lg:h-screen flex h-full flex-col lg:w-72 shrink-0 border-b border-border bg-bg/95 p-4 lg:border-b-0 lg:border-r lg:p-5">
                <div className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-3.5 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-brand to-accent flex items-center justify-center text-sm font-bold text-white shadow-sm ring-2 ring-border/50 group-hover:ring-brand/30 transition-all">
                            {user?.data?.avatar ?
                                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0rJz6pclOd1NFNQZCX9FnjWJQNt7Ghogtag&s"} alt={"Avatar"} className="h-full w-full object-cover" />
                                :
                                (user?.data?.username)?.slice(0, 2)?.toUpperCase()
                            }
                            {/* Status Indicator Dot */}
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface bg-green-500 animate-pulse" />
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                                <p className="truncate text-sm font-bold text-text-primary group-hover:text-brand transition-colors">{user?.data?.username}</p>
                                <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-medium text-brand">User</span>
                            </div>
                            <p className="truncate text-xs text-text-secondary mt-0.5">{user?.data?.email}</p>
                        </div>
                    </div>
                </div>

                <nav className="mt-5 overflow-x-auto lg:overflow-visible" aria-label="Settings sections">
                    <div className="flex min-w-max gap-2 lg:min-w-0 lg:flex-col">
                        {tabs.map((tab, i) => {
                            return (
                                <NavLink
                                    key={i}
                                    end
                                    to={tab.path}
                                    className={({ isActive }) =>
                                        `group relative inline-flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 lg:w-full select-none active:scale-[0.98] ${isActive
                                            ? 'bg-gradient-to-r from-brand/5 to-accent/5 font-semibold text-brand shadow-sm shadow-brand/5 border border-brand/20'
                                            : 'border border-transparent text-text-secondary hover:bg-surface-hover/60 hover:text-text-primary'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {/* Left side active indicator bar */}
                                            <span className={`absolute left-0 top-1/4 h-1/2 w-1 rounded-r-full bg-gradient-to-b from-brand to-accent transition-all duration-300 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 group-hover:opacity-40 group-hover:scale-y-75'}`} />

                                            {/* Icon with scaling & color transition */}
                                            <tab.icon className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-brand' : 'text-text-secondary group-hover:text-text-primary'}`} />

                                            {/* Label */}
                                            <span className="relative z-10">{tab.label}</span>
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>

                <div className="mt-5 hidden mt-auto items-center gap-2 rounded-xl border border-error/10 cursor-pointer bg-error/10 px-3 py-3 lg:flex">
                    <FiLogOut className="text-error" />
                    <span className="text-sm font-semibold text-error/60">Logout</span>
                </div>
            </aside>

        </>
    )
}

export default UserNavbar