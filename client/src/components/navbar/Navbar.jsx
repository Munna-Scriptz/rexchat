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
import { useSelector } from 'react-redux';

const Navbar = () => {
    // ------------ From server -----------
    const { data: conversations, isLoading } = useGetConvoListQuery()
    const { data: user, isFetching } = useGetProfileQuery()
    const unreadCounts = useSelector(state => state.unread.unreadCounts);
    
    // ------------ NavItems -----------
    const navItems = [
        { label: 'Chats', icon: <FiMessageSquare />, badge: conversations?.data?.length || 0 },
        { label: 'Unread', icon: <RiChatUnreadLine />, badge: unreadCounts?.length || 0 },
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
            <NavConvoList
                conversations={conversations?.data}
                isLoading={isLoading}
                currentUserId={user?.data?._id}
            />

            {/* ══════════ User Profile ══════════ */}
            <NavUser user={user} isFetching={isFetching} />
        </aside>
    );
};

export default Navbar;
