import React, { useState } from 'react';
import { FiMessageSquare } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { RiChatUnreadLine } from "react-icons/ri";
import NavHeader from './NavHeader';
import NavSearch from './NavSearch';
import NavTabs from './NavTabs';
import NavUser from './NavUser';
import NavConvoList from './NavConvoList';

/* ─── Mock Data ─── */
const conversations = [
    {
        id: 1, name: 'Sophia Chen', initials: 'SC', gradient: 'from-violet-500 to-fuchsia-500',
        lastMessage: 'That design looks incredible! Let me review it...', time: '2m',
        unread: 3, status: 'online', pinned: true,
    },
    {
        id: 2, name: 'Design Team', initials: 'DT', gradient: 'from-cyan-500 to-blue-500',
        lastMessage: 'Alex: Pushed the new component library 🚀', time: '15m',
        unread: 12, status: 'online', isGroup: true,
    },
    {
        id: 3, name: 'Marcus Rivera', initials: 'MR', gradient: 'from-amber-500 to-orange-500',
        lastMessage: 'Can we hop on a quick call?', time: '1h',
        unread: 1, status: 'offline',
    },
    {
        id: 4, name: 'Emma Watson', initials: 'EW', gradient: 'from-emerald-500 to-teal-500',
        lastMessage: 'The API integration is complete ✅', time: '2h',
        unread: 0, status: 'online',
    },
    {
        id: 5, name: 'RexChat Team', initials: 'RC', gradient: 'from-brand to-accent',
        lastMessage: 'You: Shipped v2.0 to production', time: '3h',
        unread: 0, status: 'online', isGroup: true,
    },
    {
        id: 6, name: 'Liam Park', initials: 'LP', gradient: 'from-rose-500 to-pink-500',
        lastMessage: 'Hey, are you free for lunch tomorrow?', time: '5h',
        unread: 0, status: 'offline',
    },
    {
        id: 7, name: 'Aria Patel', initials: 'AP', gradient: 'from-indigo-500 to-violet-500',
        lastMessage: 'I sent you the figma file', time: 'Yesterday',
        unread: 0, status: 'offline',
    },
    {
        id: 8, name: 'Product Launch', initials: 'PL', gradient: 'from-sky-500 to-cyan-500',
        lastMessage: 'Nina: Timeline updated for Q3', time: 'Yesterday',
        unread: 0, status: 'online', isGroup: true,
    },
    {
        id: 9, name: 'Jake Morrison', initials: 'JM', gradient: 'from-lime-500 to-green-500',
        lastMessage: 'Thanks for the feedback!', time: '2d',
        unread: 0, status: 'offline',
    },
];


const Navbar = ({ activeConversation, onSelectConversation }) => {

    const navItems = [
        { label: 'Chats', icon: <FiMessageSquare />, badge: 16 },
        { label: 'Unread', icon: <RiChatUnreadLine />, badge: 3 },
        { label: 'Groups', icon: <GrGroup />, badge: 3 },
    ];

    return (
        <aside id="Navbar" className="w-80 h-screen flex flex-col bg-surface border-r border-border flex-shrink-0 select-none">
            {/* ══════════ Header ══════════ */}
            <NavHeader />

            {/* ══════════ Search ══════════ */}
            <NavSearch />

            {/* ══════════ Navigation Tabs ══════════ */}
            <NavTabs navItems={navItems} />

            {/* ══════════ Conversation List ══════════ */}
            <NavConvoList conversations={conversations} activeConversation={activeConversation} onSelectConversation={onSelectConversation}/>

            {/* ══════════ User Profile ══════════ */}
            <NavUser />
        </aside>
    );
};

export default Navbar;