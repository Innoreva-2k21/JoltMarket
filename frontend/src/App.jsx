import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Update from './Pages/Update/Update';
import { CartProvider } from './Context/CartManager/CartManager';
import Byer from './Pages/Byer/Byer';
import Seller from './Pages/Seller/Seller';
import { auth } from './firebase/firebase';
import './App.css';
import Cart from './Pages/MyCart/Cart';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if there's no user
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    // If there's no user in localStorage, sign out of Firebase on load
    if (!localStorage.getItem('user')) {
      auth.signOut();
    }

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
  };
  const location = useLocation();
  const showNavbar = user && location.pathname !== '/';
  const showFooter = user && location.pathname !== '/';
  return (
    <div className='bg-[#f4f4fb] min-h-screen flex flex-col'>
      {showNavbar && <Navbar onLogout={handleLogout} />}
      <div className="flex-grow dark:bg-black">
      <Routes >
        {user ? (
         <>
          <Route path="/" element={<Home onLogout={handleLogout} />} />
          <Route path="/Byer" element={<Byer onLogout={handleLogout} />} />
          <Route path="/Seller" element={<Seller onLogout={handleLogout} />} />
          <Route path="/Update/:id" element={<Update onLogout={handleLogout} />} />
          <Route path="/Cart" element={<Cart onLogout={handleLogout} />} />
          </>

        ) : (
          <Route path="/" element={<Login onLogin={setUser} />} />
        )}
      </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <CartProvider>
    <Router>
      <App />
    </Router>
    </CartProvider>
  );
}
