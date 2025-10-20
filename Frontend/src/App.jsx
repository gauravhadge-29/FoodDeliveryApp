import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import { Route,Routes } from 'react-router-dom'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <>
    <ToastContainer />
    {showLogin?<LoginPopUp setShowLogin={setShowLogin} /> : <></>}
   <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/order' element={<PlaceOrder />} />
    </Routes>
   </div>
   <Footer/>
   </>
  )
}

export default App
