import React, { useState } from 'react'

const NavTabs = ({ navItems }) => {
    const [activeNav, setActiveNav] = useState('Chats');

    return (
        <div className="px-4 pb-3 flex-shrink-0">
            <div className="flex overflow-x-auto gap-2 p-1 bg-muted/50 rounded-xl"
                style={{
                    scrollbarWidth: 'none',          /* Firefox */
                    msOverflowStyle: 'none',
                    WebkitScrollbar: { display: 'none' } 
                }}
            >
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        id={`nav-${item.label.toLowerCase()}`}
                        onClick={() => setActiveNav(item.label)}
                        className={`flex-1 flex items-center justify-center cursor-pointer gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-300 relative
                                ${activeNav === item.label
                                ? 'bg-gradient-to-r from-brand to-brand-light text-white shadow-brand'
                                : 'text-text-muted hover:text-text-secondary hover:bg-muted'
                            }`}
                    >
                        <span className="flex items-center text-lg">{item.icon}</span>
                        <span className="hidden lg:inline">{item.label}</span>
                        {item.badge > 0 && (
                            <span className={`min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold px-1
                                    ${activeNav === item.label
                                    ? 'bg-white/20 text-white'
                                    : 'bg-brand/20 text-brand-light'
                                }`}
                            >
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default NavTabs