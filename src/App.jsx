import React, { useState } from 'react';
import Login from './pages/Login';
import NavBar from './pages/Dashboard'; // This is your renamed "Dashboard.jsx"
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="App">
      {isLoggedIn ? (
        /* Using NavBar to match your renamed file */
        <NavBar onLogout={handleLogout} /> 
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;