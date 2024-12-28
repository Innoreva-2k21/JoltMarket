import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Update from "./Pages/Update/Update";
import { CartProvider } from "./Context/CartManager/CartManager";
import Byer from "./Pages/Byer/Byer";
import Seller from "./Pages/Seller/Seller";
import { auth } from "./firebase/firebase";
import "./App.css";
import Cart from "./Pages/MyCart/Cart";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      auth.signOut();
    }

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.name}!`);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      localStorage.removeItem("user");
      toast.success("Successfully logged out");
      navigate("/");
      toast.info("Please log in to continue");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };
  const location = useLocation();
  const showNavbar = user && location.pathname !== "/";
  const showFooter = user && location.pathname !== "/";
  return (
    <div className="bg-[#f4f4fb] min-h-screen flex flex-col">
      {showNavbar && <Navbar onLogout={handleLogout} />}
      <div className="flex-grow dark:bg-black">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home onLogout={handleLogout} />} />
              <Route path="/Byer" element={<Byer onLogout={handleLogout} />} />
              <Route
                path="/Seller"
                element={<Seller onLogout={handleLogout} />}
              />
              <Route
                path="/Update/:id"
                element={<Update onLogout={handleLogout} />}
              />
              <Route path="/Cart" element={<Cart onLogout={handleLogout} />} />
            </>
          ) : (
            <Route path="/" element={<Login onLogin={setUser} />} />
          )}
        </Routes>
      </div>
      {showFooter && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
