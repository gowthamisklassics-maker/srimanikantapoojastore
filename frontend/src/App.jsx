import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './services/storeContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SideDrawer from './components/SideDrawer';
import QuickEnquiryModal from './components/QuickEnquiryModal';
import StoreMapModal from './components/StoreMapModal';
import FloatingActions from './components/FloatingActions';
import ToastContainer from './components/ToastContainer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Policies from './pages/Policies';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/privacy" element={<Policies />} />
          <Route path="/terms" element={<Policies />} />
          <Route path="/shipping" element={<Policies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <SideDrawer />
        <QuickEnquiryModal />
        <StoreMapModal />
        <FloatingActions />
        <ToastContainer />
      </BrowserRouter>
    </StoreProvider>
  );
}
