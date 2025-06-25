import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AllUsers from '../pages/AllUsers'
import CreateUsers from '../pages/CreateUsers'

const CustomRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateUsers />} />
        <Route path="/all-users" element={<AllUsers />} />
      </Routes>
    </>
  );
}

export default CustomRoutes