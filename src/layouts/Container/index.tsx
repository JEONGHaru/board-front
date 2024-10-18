import React from 'react'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { AUTH_PATH } from 'constant';

//          component: Layout          //
export default function Container() {
  
  //          state: Path Name state        //
  const { pathname } = useLocation(); 
    
  //          render: Layout Rendering         //
  return (
    <>
        <Header />
        <Outlet />
        {pathname !== AUTH_PATH() && <Footer />}
    </>
  )
}
