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
      <ApiProvider api={api}>
        <RouterProvider router={myRoute} />
      </ApiProvider>
    </>
  )
}

export default App