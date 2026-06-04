import React from 'react';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import LayoutOne from './layout/LayoutOne';
import Home from './pages/Home';
import AuthLayout from './layout/AuthLayout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { api } from './api';
import { Toaster } from 'react-hot-toast';


const App = () => {
  const myRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<LayoutOne />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='/auth' element={<AuthLayout />}>
        <Route path='/auth/signin' element={<Signin />} />
        <Route path='/auth/signup' element={<Signup />} />
      </Route>
    </Route>
  ));

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'custom-toast',
          duration: 3000,


          success: {
            className: 'custom-toast custom-toast-success',
            iconTheme: {
              primary: '#22C55E',
            },
          },
          error: {
            className: 'custom-toast custom-toast-error',
            iconTheme: {
              primary: '#EF4444',
            },
          },
          loading: {
            className: 'custom-toast custom-toast-loading',
            iconTheme: {
              primary: '#6D28D9',
            },
          },
        }}
      />
      <ApiProvider api={api}>
        <RouterProvider router={myRoute} />
      </ApiProvider>
    </>
  )
}

export default App