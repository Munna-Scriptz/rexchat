import React from 'react'
import {
    FiArrowLeft,
    FiLock,
    FiShield,
    FiSlash,
    FiSun,
    FiUser,
    FiUserPlus,
    FiUsers,
} from 'react-icons/fi';
import { Link, NavLink } from 'react-router';
import { useGetProfileQuery } from '../../api';
import { HiOutlineSparkles } from 'react-icons/hi2';

const UserNavbar = () => {
    const { data: user, isFetching } = useGetProfileQuery();

    const tabs = [
        { path: '/profile', label: 'Profile', icon: FiUser },
        { path: '/friends', label: 'Friends', icon: FiUsers },
        { path: '/followers', label: 'Followers', icon: FiUserPlus },
        { path: '/preferences', label: 'Preferences', icon: FiSun },
        { path: '/security', label: 'Security', icon: FiLock },
        { path: '/groups', label: 'Groups', icon: HiOutlineSparkles },
        { path: '/blocked', label: 'Blocked', icon: FiSlash },
    ];
    return (
        <>
            <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-72 shrink-0 border-b border-border bg-bg/95 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r lg:p-5">
                <div className="flex items-center justify-between gap-3 lg:block">
                    <Link
                        to="/"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-border-hover hover:bg-surface-hover hover:text-text-primary lg:w-full"
                    >
                        <FiArrowLeft />
                        <span className="hidden sm:inline">Back to chat</span>
                    </Link>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand to-accent flex items-center justify-center text-xs font-bold text-white">
                        {user?.data?.avatar ?
                            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0rJz6pclOd1NFNQZCX9FnjWJQNt7Ghogtag&s"} alt={"Avatar"} className="h-full w-full object-cover" />
                            :
                            (user?.data?.username)?.slice(0, 2)?.toUpperCase()
                        }
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-text-primary">{user?.data?.username}</p>
                        <p className="truncate text-xs text-text-secondary">{user?.data?.email}</p>
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
                                        `inline-flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-all lg:w-full ${isActive
                                            ? 'bg-gradient-to-r from-brand to-accent text-white shadow-brand'
                                            : 'border border-border bg-surface text-text-secondary hover:border-border-hover hover:bg-surface-hover hover:text-text-primary'
                                        }`
                                    }
                                >
                                    <tab.icon className="shrink-0" />
                                    {tab.label}
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>

                <div className="mt-5 hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 lg:flex">
                    <FiShield className="text-online" />
                    <span className="text-xs font-semibold text-text-secondary">Protected profile</span>
                </div>
            </aside>

        </>
    )
}

export default UserNavbar