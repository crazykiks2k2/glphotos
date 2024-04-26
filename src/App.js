import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="navbar-brand">Google Photos</h1>
        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Search..." />
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/upload" className="nav-link">Upload</Link>
          <Link to="/secure-upload" className="nav-link">Secure Upload</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
