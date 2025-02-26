import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Profile from './pages/Profile.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PreviousPayment from './pages/PreviousPayment.tsx';
import Order from './pages/Order.tsx';
import NotFound from './pages/NotFound.tsx';
import Cart from './pages/Wishlist.tsx';
import { useState } from 'react';
import Navbar from './components/Navbar/NavBar.tsx';
import About from './pages/About.tsx';
import PreviousOrders from './pages/PreviousOrders.tsx';
import AddReview from './components/Reviews/AddReview.tsx';
import EditProfile from './pages/EditProfile.tsx';
import ProductDetailPage from "../../frontend/src/pages/ProductDetails.tsx";
import Layout2 from './components/Contents/Layout';

const Layout = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(""); // Store search input

  // Define routes where the navbar should NOT be displayed
  const hideNavbarRoutes = ['*'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && (
        <>
          {/* Remove the extra PlanToOrderProvider here */}
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </>
      )}
          <Routes>
            <Route path='/' element={<div className='mt-20'> <App searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> </div>} />
            <Route path='/profile/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/payment' element={<ProtectedRoute><div className='mt-20'><PreviousPayment /></div></ProtectedRoute>} />
            <Route path='/order' element={<ProtectedRoute><div className='mt-20'><Order /></div></ProtectedRoute>} />
            <Route path='/cart' element={<ProtectedRoute><div className='mt-20'><Cart /></div></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/about' element={<div className='mt-20'><About/></div>} />
            <Route path='/previousorder' element={<ProtectedRoute><div className='mt-20'><PreviousOrders/></div></ProtectedRoute>} />
            <Route path='*' element={<div className='mt-20'><NotFound /></div>} />
            <Route path='/review' element={<ProtectedRoute><AddReview/></ProtectedRoute>} />
            <Route path='/editProfile' element={<ProtectedRoute><div className='mt-20'><EditProfile/></div></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><Layout2> <div className='mt-20'><ProductDetailPage /></div></Layout2></ProtectedRoute>} />
            <Route path='/signin' element={ <div className=''><SignIn /></div>} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
    </>
    
  );
};

createRoot(document.getElementById('root')!).render(
  // Single Provider at the top level
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
);
