import React from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import UserNavbar from '../components/userNav/UserNavbar'
import { FiArrowLeft, FiShield } from 'react-icons/fi'

const UserLayout = () => {
    const { pathname } = useLocation()

    return (
        <>
            <main className='flex w-full flex-col lg:flex-row'>
                <UserNavbar />
                <section className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6 lg:h-screen">
                    <div className="mx-auto max-w-5xl animate-fade-in">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-text-muted">{pathname.substring(1) == "user" ? "Profile" : pathname.substring(6)} page</p>
                                <h2 className="mt-1 text-2xl font-bold text-text-primary capitalize">
                                    {
                                        pathname.substring(1) == "user" ? "Profile" : pathname.substring(6)
                                    }
                                </h2>
                            </div>
                            <div className="flex items-center justify-between gap-3 lg:block">
                                <Link
                                    to="/"
                                    className="shrink-0 flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-text-secondary px-6 hover:border-border-hover hover:bg-surface-hover hover:text-text-primary "
                                >
                                    <FiArrowLeft />
                                    <span className="hidden sm:inline">Back to chat</span>
                                </Link>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </section>
            </main>
        </>
    )
}

export default UserLayout