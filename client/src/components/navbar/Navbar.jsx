import React, { useEffect } from 'react';
import { FiMessageSquare } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { RiChatUnreadLine } from "react-icons/ri";
import NavHeader from './NavHeader';
import NavSearch from './NavSearch';
import NavTabs from './NavTabs';
import NavUser from './NavUser';
import NavConvoList from './NavConvoList';
import { useGetConvoListQuery, useGetProfileQuery } from '../../api';
import { socket } from '../../api/socketApi';

/* ─── Mock Data ─── */
const convs = [
    {
        id: 1, name: 'Sophia Chen',
        lastMessage: 'That design looks incredible! Let me review it...', time: '2m',
        unread: 3, status: 'online', pinned: true,
    },
    {
        id: 2, name: 'Design Team',
        lastMessage: 'Alex: Pushed the new component library 🚀', time: '15m',
        unread: 12, status: 'online', isGroup: true,
    },
    {
        id: 3, name: 'Marcus Rivera',
        lastMessage: 'Can we hop on a quick call?', time: '1h',
        unread: 1, status: 'offline',
    },
    {
        id: 4, name: 'Emma Watson',
        lastMessage: 'The API integration is complete ✅', time: '2h',
        unread: 0, status: 'online',
    },
    {
        id: 5, name: 'RexChat Team',
        lastMessage: 'You: Shipped v2.0 to production', time: '3h',
        unread: 0, status: 'online', isGroup: true,
    },
    {
        id: 6, name: 'Liam Park',
        lastMessage: 'Hey, are you free for lunch tomorrow?', time: '5h',
        unread: 0, status: 'offline',
    },
    {
        id: 7, name: 'Aria Patel',
        lastMessage: 'I sent you the figma file', time: 'Yesterday',
        unread: 0, status: 'offline',
    },
    {
        id: 8, name: 'Product Launch',
        lastMessage: 'Nina: Timeline updated for Q3', time: 'Yesterday',
        unread: 0, status: 'online', isGroup: true,
    },
    {
        id: 9, name: 'Jake Morrison',
        lastMessage: 'Thanks for the feedback!', time: '2d',
        unread: 0, status: 'offline',
    },
];


const Navbar = () => {
    // ------------ From server -----------
    const { data: conversations, isLoading } = useGetConvoListQuery()
    const { data: user, isFetching } = useGetProfileQuery()

    // ------------ NavItems -----------
    const navItems = [
        { label: 'Chats', icon: <FiMessageSquare />, badge: conversations?.data?.length || 0 },
        { label: 'Unread', icon: <RiChatUnreadLine />, badge: 3 },
        { label: 'Groups', icon: <GrGroup />, badge: 3 },
    ];


    useEffect(() => {
        if (conversations) {
            conversations?.data?.forEach(conv => {
                socket?.emit("join_room", conv._id)
            });
        }
    }, [conversations])


    return (
        <aside id="Navbar" className="w-100 h-screen flex flex-col bg-surface border-r border-border flex-shrink-0 select-none">
            {/* ══════════ Header ══════════ */}
            <NavHeader />

            {/* ══════════ Search ══════════ */}
            <NavSearch />

            {/* ══════════ Navigation Tabs ══════════ */}
            <NavTabs navItems={navItems} />

            {/* ══════════ Conversation List ══════════ */}
            <NavConvoList conversations={conversations?.data} isLoading={isLoading} />

            {/* ══════════ User Profile ══════════ */}
            <NavUser user={user} isFetching={isFetching} />
        </aside>
    );
};

export default Navbar;