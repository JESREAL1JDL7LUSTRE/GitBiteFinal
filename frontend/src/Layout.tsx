import App from './App.tsx';
import Profile from './pages/Profile.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import NotFound from './pages/NotFound.tsx';
import Cart from './pages/Wishlist.tsx';
import { useState } from 'react';
import Navbar from './components/Navbar/NavBar.tsx';
import About from './pages/About.tsx';
import PreviousOrders from './pages/PreviousOrders.tsx';
import AddReview from './components/Reviews/AddReview.tsx';
import ProductDetailPage from "../../frontend/src/pages/ProductDetails.tsx";
import Layout2 from './components/Contents/Layout';
import Products from './pages/Products.tsx';
import TermsAndConditions from './pages/TermsAndCondition.tsx';

import { Routes, Route, useLocation } from 'react-router-dom';
import ChangePassword from './pages/ChangePassword.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';

export const Layout = () => {
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
              <Route path='/' element={<div className='mt-20'> <App/> </div>} />
              <Route path='/profile/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/cart' element={<ProtectedRoute><div className='mt-20'><Cart /></div></ProtectedRoute>} />
              <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/changepassword' element={<ProtectedRoute><div className='mt-20'><ChangePassword/></div></ProtectedRoute>}  />
              <Route path='/forgotpassword' element={<div className=''><ForgotPassword/></div>} />
              <Route path='/about' element={<div className='mt-20'><About/></div>} />
              <Route path='/previousorder' element={<ProtectedRoute><div className='mt-20'><PreviousOrders/></div></ProtectedRoute>} />
              <Route path='*' element={<div className='mt-20'><NotFound /></div>} />
              <Route path='/review' element={<ProtectedRoute><AddReview dishId={0}/></ProtectedRoute>} />
              <Route path="/products" element={<Layout2> <div className='mt-24'><Products /></div></Layout2>} />
              <Route path="/product/:id" element={<Layout2> <div className='mt-20'><ProductDetailPage /></div></Layout2>} />
              <Route path='/signin' element={ <div className=''><SignIn /></div>} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/termsandconditions' element={<div className='mt-20'><TermsAndConditions/></div>} />
            </Routes>
      </>
      
    );
  };