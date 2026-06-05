import React from 'react'
import { Outlet } from 'react-router'
import UserNavbar from '../components/userNav/UserNavbar'

const UserLayout = () => {
    return (
        <>
            <UserNavbar />
            <Outlet />
        </>
    )
}

export default UserLayout