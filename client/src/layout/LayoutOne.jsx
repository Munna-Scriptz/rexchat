import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/navbar/Navbar'

const LayoutOne = () => {
  return (
    <section className='flex gap-6'>
      <Navbar />
      <Outlet />
    </section>
  )
}

export default LayoutOne