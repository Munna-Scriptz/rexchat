import React, { useState } from 'react'
import { Link, useLocation } from 'react-router';

const Navbar = () => {
    // --------------------- Side bar ---------------------
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        {
            name: 'Dashboard',
            icon: <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13 15.4c0-2.074 0-3.111.659-3.756S15.379 11 17.5 11s3.182 0 3.841.644C22 12.29 22 13.326 22 15.4v2.2c0 2.074 0 3.111-.659 3.756S19.621 22 17.5 22s-3.182 0-3.841-.644C13 20.71 13 19.674 13 17.6z" opacity=".5"></path><path fill="currentColor" d="M2 8.6c0 2.074 0 3.111.659 3.756S4.379 13 6.5 13s3.182 0 3.841-.644C11 11.71 11 10.674 11 8.6V6.4c0-2.074 0-3.111-.659-3.756S8.621 2 6.5 2s-3.182 0-3.841.644C2 3.29 2 4.326 2 6.4zm11-3.1c0-1.087 0-1.63.171-2.06a2.3 2.3 0 0 1 1.218-1.262C14.802 2 15.327 2 16.375 2h2.25c1.048 0 1.573 0 1.986.178c.551.236.99.69 1.218 1.262c.171.43.171.973.171 2.06s0 1.63-.171 2.06a2.3 2.3 0 0 1-1.218 1.262C20.198 9 19.673 9 18.625 9h-2.25c-1.048 0-1.573 0-1.986-.178a2.3 2.3 0 0 1-1.218-1.262C13 7.13 13 6.587 13 5.5"></path><path fill="currentColor" d="M2 18.5c0 1.087 0 1.63.171 2.06a2.3 2.3 0 0 0 1.218 1.262c.413.178.938.178 1.986.178h2.25c1.048 0 1.573 0 1.986-.178c.551-.236.99-.69 1.218-1.262c.171-.43.171-.973.171-2.06s0-1.63-.171-2.06a2.3 2.3 0 0 0-1.218-1.262C9.198 15 8.673 15 7.625 15h-2.25c-1.048 0-1.573 0-1.986.178c-.551.236-.99.69-1.218 1.262C2 16.87 2 17.413 2 18.5" opacity=".5"></path></svg>,
            to: '/admin/dashboard'
        },
        {
            name: 'Products',
            icon: <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M5.777 18.265v-7.97c0-.683 0-1.025-.132-1.326c-.131-.3-.378-.523-.871-.968l-.186-.167C3.532 6.882 3.004 6.405 3 5.716c-.004-.69.464-1.122 1.401-1.988q.214-.197.418-.362c.472-.378 1.138-.792 1.648-1.09a2.05 2.05 0 0 1 1.567-.205l.49.129c.389.102.727.353.949.703c.6.948 1.564 1.423 2.527 1.423V22c-1.467 0-2.724-.148-3.716-.33c-1.073-.198-1.61-.296-2.058-.858c-.45-.562-.45-1.224-.45-2.547" clipRule="evenodd"></path><path fill="currentColor" d="M18.223 18.265v-7.97c0-.683 0-1.025.132-1.326c.131-.3.378-.523.871-.968l.186-.167c1.056-.952 1.584-1.429 1.588-2.118c.004-.69-.465-1.122-1.401-1.988a8 8 0 0 0-.418-.362c-.472-.378-1.138-.792-1.648-1.09a2.05 2.05 0 0 0-1.567-.205l-.49.129a1.6 1.6 0 0 0-.949.703c-.6.948-1.564 1.423-2.527 1.423V22c1.467 0 2.724-.148 3.716-.33c1.073-.198 1.61-.296 2.059-.858c.448-.562.448-1.224.448-2.547" opacity=".5"></path></svg>,
            to: '/admin/products'
        },
        {
            name: 'Category',
            icon: <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 15.998v-6c0-2.828 0-4.242-.879-5.121C19.353 4.109 18.175 4.012 16 4H8c-2.175.012-3.353.109-4.121.877C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122" opacity=".5"></path><path fill="currentColor" d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></path><path fill="currentColor" fillRule="evenodd" d="M6.25 10.5A.75.75 0 0 1 7 9.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M6.25 14a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75m-3.5 3.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75" clipRule="evenodd"></path></svg>,
            to: '/admin/category'
        },
        {
            name: 'Orders',
            icon: <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4.083 11.894c.439-2.34.658-3.511 1.491-4.203C6.408 7 7.598 7 9.98 7h4.04c2.383 0 3.573 0 4.407.691c.833.692 1.052 1.862 1.491 4.203l.75 4c.617 3.292.926 4.938.026 6.022S18.12 23 14.771 23H9.23c-3.349 0-5.024 0-5.923-1.084c-.9-1.084-.591-2.73.026-6.022z" opacity=".5"></path><path fill="currentColor" d="M9.75 5.985a2.25 2.25 0 0 1 4.5 0v1c.566 0 1.062.002 1.5.015V5.985a3.75 3.75 0 1 0-7.5 0V7c.438-.013.934-.015 1.5-.015zm.128 9.765a2.251 2.251 0 0 0 4.245 0a.75.75 0 1 1 1.414.5a3.751 3.751 0 0 1-7.073 0a.75.75 0 0 1 1.414-.5"></path></svg>,
            to: '/admin/orders'
        },
        {
            name: 'Reviews',
            icon: <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m13.629 20.472l-.542.916c-.483.816-1.69.816-2.174 0l-.542-.916c-.42-.71-.63-1.066-.968-1.262c-.338-.197-.763-.204-1.613-.219c-1.256-.021-2.043-.098-2.703-.372a5 5 0 0 1-2.706-2.706C2 14.995 2 13.83 2 11.5v-1c0-3.273 0-4.91.737-6.112a5 5 0 0 1 1.65-1.651C5.59 2 7.228 2 10.5 2h3c3.273 0 4.91 0 6.113.737a5 5 0 0 1 1.65 1.65C22 5.59 22 7.228 22 10.5v1c0 2.33 0 3.495-.38 4.413a5 5 0 0 1-2.707 2.706c-.66.274-1.447.35-2.703.372c-.85.015-1.275.022-1.613.219c-.338.196-.548.551-.968 1.262" opacity=".5"></path><path fill="currentColor" d="M10.99 14.308c-1.327-.978-3.49-2.84-3.49-4.593c0-2.677 2.475-3.677 4.5-1.609c2.025-2.068 4.5-1.068 4.5 1.609c0 1.752-2.163 3.615-3.49 4.593c-.454.335-.681.502-1.01.502s-.556-.167-1.01-.502"></path></svg>,
            to: '/admin/reviews'
        },
        {
            name: 'Customers',
            icon: <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"></path><path fill="currentColor" d="M19.5 7.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-15 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0" opacity=".4"></path><path fill="currentColor" d="M18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5"></path><path fill="currentColor" d="M22 16.5c0 1.38-1.79 2.5-4 2.5s-4-1.12-4-2.5s1.79-2.5 4-2.5s4 1.12 4 2.5m-20 0C2 17.88 3.79 19 6 19s4-1.12 4-2.5S8.21 14 6 14s-4 1.12-4 2.5" opacity=".4"></path></svg>,
            to: '/admin/customers'
        },
    ]


    const pathname = useLocation();

    return (
        <>
            <nav className={`${isOpen ? 'w-25 px-3' : 'w-80 px-6'} adminNavbar pt-6 pb-4 flex-col bg-brand sticky top-0 h-screen overflow-y-auto duration-500 group z-50`}>
                {/* ----------------- Logo ---------------- */}
                <div className='flex items-center justify-between px-2 pb-6 mb-6 text-white border-b border-white/5'>
                    {
                        isOpen ?
                            <Link href={'/'} className='opacity-100 duration-500 mx-auto'>
                                <img className='w-10 transform hover:scale-110 transition-transform' src={"/assets/logoSmall.png"} alt="logo" />
                            </Link>
                            :
                            <Link href={'/'} className='px-2'>
                                <img className='h-9 transform hover:scale-105 transition-transform' src={"/assets/Logo.png"} alt="logo" />
                            </Link>
                    }
                    {
                        !isOpen &&
                        <div onClick={() => setIsOpen(!isOpen)} className='w-10 h-10 rounded-2xl hover:bg-white/10 flex items-center justify-center cursor-pointer duration-300 text-white/50 hover:text-white border border-white/5 bg-white/5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M18 3a3 3 0 0 1 2.995 2.824L21 6v12a3 3 0 0 1-2.824 2.995L18 21H6a3 3 0 0 1-2.995-2.824L3 18V6a3 3 0 0 1 2.824-2.995L6 3zm0 2H9v14h9a1 1 0 0 0 .993-.883L19 18V6a1 1 0 0 0-.883-.993zm-4.387 4.21l.094.083l2 2a1 1 0 0 1 .083 1.32l-.083.094l-2 2a1 1 0 0 1-1.497-1.32l.083-.094L13.585 12l-1.292-1.293a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.32-.083"></path></svg>
                        </div>
                    }
                </div>

                {/* ----------------- NavLinks ---------------- */}
                <div className='flex flex-col gap-2'>
                    {
                        navLinks.map((item, i) => {
                            const isActive = pathname === item.to;
                            return (
                                <div key={i} className="relative group/item">
                                    <Link
                                        href={item.to}
                                        className={`
            flex items-center gap-3.5 px-4 py-4 rounded-xl transition-all duration-300 font-medium text-[15px]
            ${isActive
                                                ? "bg-accent/10 text-white/60"
                                                : "text-white/60 hover:bg-white/5 hover:text-white"
                                            }
            ${isOpen ? "justify-center px-0" : "justify-start"}
          `}
                                    >
                                        {isActive && (
                                            <div
                                                className={`absolute ${isOpen ? "-left-3" : "-left-6"
                                                    } top-1/2 -translate-y-1/2 w-1.5 h-12 bg-accent rounded-r-sm shadow-lg shadow-accent/40`}
                                            />
                                        )}

                                        <span
                                            className={`${isOpen ? "text-2xl" : "text-xl"} ${isActive ? "text-accent" : "text-inherit"
                                                } transition-colors`}
                                        >
                                            {item.icon}
                                        </span>

                                        {!isOpen && <span className="tracking-tight">{item.name}</span>}
                                    </Link>
                                </div>
                            );
                        })
                    };
                </div>

                {/* ----------------- Dashboard Insights ---------------- */}
                <div className={`mt-6 pt-6 border-t border-white/5 ${isOpen ? 'items-center' : 'px-2'} flex flex-col gap-3`}>
                    {!isOpen && <h2 className='text-white/40 font-medium text-[10px] uppercase tracking-[0.3em] mb-2'>Insights</h2>}

                    {/* Today's Revenue */}
                    <div className={`group bg-white/5 rounded-2xl p-4 flex flex-col gap-1 border border-white/5 transition-all hover:bg-white/10 cursor-pointer ${isOpen ? 'w-10 h-10 items-center justify-center p-0' : 'w-full'}`}>
                        {isOpen ?
                            <div className='w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(21,93,252,0.6)]'></div>
                            :
                            <>
                                <span className='text-white/30 text-[9px] uppercase font-semibold tracking-widest group-hover:text-accent duration-300'>Revenue Today</span>
                                <div className='flex items-baseline gap-1.5'>
                                    <span className='text-white text-lg font-black font-space leading-none'>$1,240.50</span>
                                    <span className='text-success text-[10px] font-bold'>+12%</span>
                                </div>
                            </>
                        }
                    </div>

                    {/* Pending Orders */}
                    <div className={`group bg-white/5 rounded-2xl p-4 flex flex-col gap-1 border border-white/5 transition-all hover:bg-white/10 cursor-pointer ${isOpen ? 'w-10 h-10 items-center justify-center p-0' : 'w-full'}`}>
                        {isOpen ?
                            <div className='w-2 h-2 rounded-full bg-error animate-bounce'></div>
                            :
                            <>
                                <div className='flex items-center justify-between'>
                                    <span className='text-white/30 text-[9px] uppercase font-semibold tracking-widest group-hover:text-error duration-300'>Pending Orders</span>
                                    <div className='w-1.5 h-1.5 rounded-full bg-error shadow-[0_0_6px_rgba(239,68,68,0.5)]'></div>
                                </div>
                                <div className='flex items-baseline gap-1.5'>
                                    <span className='text-white text-lg font-black font-space leading-none'>24</span>
                                    <span className='text-white/20 text-[10px] font-medium'>Shipments</span>
                                </div>
                            </>
                        }
                    </div>

                    {/* Stock Alerts (Optional) */}
                    {!isOpen && (
                        <div className='mt-2 px-3 py-3 rounded-xl bg-error/5 border border-error/10'>
                            <p className='text-error text-[11px] font-semibold leading-tight'>
                                ⚠️ 3 Products are low in stock.
                            </p>
                        </div>
                    )}
                </div>


                {/* Mobile/Open Toggle icon for compact mode */}
                {isOpen && (
                    <div onClick={() => setIsOpen(false)} className='mt-5 mb-10 w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center cursor-pointer text-white/40 hover:bg-accent hover:text-white transition-all mx-auto shadow-lg hover:shadow-accent/40'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M18 3a3 3 0 0 1 2.995 2.824L21 6v12a3 3 0 0 1-2.824 2.995L18 21H6a3 3 0 0 1-2.995-2.824L3 18V6a3 3 0 0 1 2.824-2.995L6 3zm0 2H9v14h9a1 1 0 0 0 .993-.883L19 18V6a1 1 0 0 0-.883-.993zm-4.387 4.21l.094.083l2 2a1 1 0 0 1 .083 1.32l-.083.094l-2 2a1 1 0 0 1-1.497-1.32l.083-.094L13.585 12l-1.292-1.293a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.32-.083"></path></svg>
                    </div>
                )}
            </nav >
        </>
    )
}

export default Navbar