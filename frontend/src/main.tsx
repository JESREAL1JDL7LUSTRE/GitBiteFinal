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
import { PlanToOrderProvider } from './components/PopUps/Context/PlanToOrderContext.tsx';
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
      <div className="min-h-screen">
        <Routes>
          <Route path='/' element={<App searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path='/profile/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/payment' element={<ProtectedRoute><PreviousPayment /></ProtectedRoute>} />
          <Route path='/order' element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/about' element={<About/>} />
          <Route path='/previousorder' element={<ProtectedRoute><PreviousOrders/></ProtectedRoute>} />
          <Route path='*' element={<NotFound />} />
          <Route path='/review' element={<ProtectedRoute><AddReview/></ProtectedRoute>} />
          <Route path='/editProfile' element={<ProtectedRoute><EditProfile/></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><Layout2><ProductDetailPage /></Layout2></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  // Single Provider at the top level
  <PlanToOrderProvider>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </PlanToOrderProvider>
);
