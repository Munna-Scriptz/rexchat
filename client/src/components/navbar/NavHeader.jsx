import React from 'react'
import { Link } from 'react-router'
import { FaRegBell } from 'react-icons/fa'
import { LuSettings } from 'react-icons/lu'
import { FiUserPlus } from 'react-icons/fi'

const NavHeader = () => {
    return (
        <div className="px-5 pt-5 pb-3 flex items-center justify-between flex-shrink-0">
            <Link to={'/'} className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-accent flex items-center justify-center shadow-brand">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-bold text-text-primary tracking-tight">RexChat</h1>
                    <span className="w-2 h-2 rounded-full bg-online shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                </div>
            </Link>
            <div className="flex items-center gap-1">
                <Link
                    to={"/users"}
                    className="w-9 h-9 rounded-xl cursor-pointer text-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-muted transition-all duration-200 relative"
                    aria-label="Notifications"
                >
                    <FiUserPlus />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
                </Link>
                <Link
                    to="/user"
                    className="w-9 h-9 rounded-xl text-xl cursor-pointer flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-muted transition-all duration-200"
                    aria-label="Settings"
                >
                    <LuSettings />
                </Link>
            </div>
        </div>
    )
}

export default NavHeader
