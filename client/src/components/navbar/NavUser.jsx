import React from 'react'
import { FiLogOut } from 'react-icons/fi';
import { LuSettings } from 'react-icons/lu';
import StatusDot from '../ui/StatusDot';

const NavUser = () => {

    return (
        <div className="flex-shrink-0 p-3 border-t border-border">
            <div className="flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-muted/50 transition-all duration-200 cursor-pointer group">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white text-sm font-bold">
                        YU
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5">
                        <StatusDot status="online" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">You</p>
                    <p className="text-[11px] text-text-muted truncate">Online</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
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
        </div>
    )
}

export default NavUser