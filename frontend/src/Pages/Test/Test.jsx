// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRule from './Pages/AddRule/addRule';
import Home from './Pages/Home/Home';
import CheckRule from './Pages/CheckRule/CheckRule';
import Login from './Pages/Login/Login';
import { auth } from './firebase/firebase';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        // Store user information in local storage
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          name: user.displayName,
        }));
      } else {
        // Remove user information from local storage
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/addRule" element={<AddRule />} />
              <Route path="/CheckRule" element={<CheckRule />} />
            </>
          ) : (
            <Route path="/" element={<Login onLogin={setUser} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
