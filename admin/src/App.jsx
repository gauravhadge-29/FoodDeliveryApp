import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';

const App = () => {

  const url = "http://localhost:4000"
  return (
    <div className="app">
      <Navbar />
      <ToastContainer />
      <div className="app-content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path='/add' element={<Add />} />
            <Route path='/list' element={<List />} />
            <Route path='/orders' element={<Orders />} url={url} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
