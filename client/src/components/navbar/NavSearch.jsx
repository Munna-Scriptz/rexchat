import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const NavSearch = () => {
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="px-4 pb-3 flex-shrink-0">
            <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-[1.01]' : ''}`}>
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-lg pointer-events-none transition-colors duration-200">
                    <FiSearch />
                </span>
                <input
                    id="sidebar-search"
                    type="text"
                    placeholder="Search conversations..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-sm text-text-primary placeholder-text-muted border transition-all duration-300 outline-none
                                ${searchFocused
                            ? 'border-accent/40 shadow-[0_0_0_3px_rgba(0,229,255,0.08)] bg-bg'
                            : 'border-transparent hover:border-border hover:bg-surface-hover'
                        }`}
                />
            </div>
        </div>
    )
}

export default NavSearch