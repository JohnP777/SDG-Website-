import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiCallPost } from '../Utilities/ApiCalls';
import './TopBar.css';
import logo from '../Assets/sdg.jpg';

const DropdownArrow = () => (
  <span className="sdg-arrow-bar">
    <svg width="18" height="18" viewBox="0 0 18 18" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <polyline points="4,7 9,12 14,7" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
);

const TopBar = () => {
  // Simulate login state (replace with real logic later)
  const [loggedIn, setLoggedIn] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const actionTimeout = useRef<NodeJS.Timeout | null>(null);
  const userTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Robust hover logic for dropdowns
  const handleActionEnter = () => {
    if (actionTimeout.current) clearTimeout(actionTimeout.current);
    setActionOpen(true);
  };
  const handleActionLeave = () => {
    actionTimeout.current = setTimeout(() => setActionOpen(false), 120);
  };
  const handleUserEnter = () => {
    if (userTimeout.current) clearTimeout(userTimeout.current);
    setUserOpen(true);
  };
  const handleUserLeave = () => {
    userTimeout.current = setTimeout(() => setUserOpen(false), 120);
  };

  useEffect(() => {
    // Check login state from localStorage
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('token-expiry');
    if (token && expiry && Date.now() < new Date(expiry).getTime()) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleSignout = async () => {
    await apiCallPost('api/auth/logout/', {}, true);
    localStorage.removeItem('token');
    localStorage.removeItem('token-expiry');
    localStorage.removeItem('url');
    localStorage.removeItem('userDetails');
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="sdg-topbar-bar">
      <a href="https://sdg.unswzoo.com/" target="_blank" rel="noopener noreferrer" className="sdg-logo-link"><img src={logo} alt="SDG Logo" className="sdg-logo-bar" /></a>
      <nav className="sdg-nav-bar">
        <Link className="sdg-nav-btn-bar" to="/">Home</Link>
        <div className="sdg-divider" />
        <a className="sdg-nav-btn-bar" href="#">About us</a>
        <div className="sdg-divider" />
        <a className="sdg-nav-btn-bar" href="https://sdg.unswzoo.com/sdg_ActionDB/" target="_blank" rel="noopener noreferrer">SDG Actions</a>
        <div className="sdg-divider" />
        <a className="sdg-nav-btn-bar" href="https://sdg.unswzoo.com/sdg_EducationDB/" target="_blank" rel="noopener noreferrer">SDG Educations</a>
        <div className="sdg-divider" />
        <a className="sdg-nav-btn-bar" href="https://sdg.unswzoo.com/search/" target="_blank" rel="noopener noreferrer">Search Keyword</a>
        <div className="sdg-divider" />
        <a className="sdg-nav-btn-bar" href="https://sdgai.unswzoo.com/" target="_blank" rel="noopener noreferrer">AI ChatBot</a>
        <div className="sdg-divider" />
        <div
          className="sdg-dropdown-bar"
          onMouseEnter={handleActionEnter}
          onMouseLeave={handleActionLeave}
        >
          <span className="sdg-nav-btn-bar sdg-dropdown-toggle-bar">
            SDG Action Forms <DropdownArrow />
          </span>
          {actionOpen && (
            <div className="sdg-dropdown-menu-bar">
              <Link className="sdg-dropdown-item-bar" to={loggedIn ? "/teams" : "/signup"}>Your Teams</Link>
              <Link className="sdg-dropdown-item-bar" to={loggedIn ? "/sdg-form" : "/signup"}>Create Action Form</Link>
            </div>
          )}
        </div>
        <div className="sdg-divider" />
        <div
          className="sdg-dropdown-bar"
          onMouseEnter={handleUserEnter}
          onMouseLeave={handleUserLeave}
        >
          <span className="sdg-nav-btn-bar sdg-dropdown-toggle-bar">
            User Account <DropdownArrow />
          </span>
          {userOpen && (
            <div className="sdg-dropdown-menu-bar user-dropdown-bar">
              {!loggedIn ? (
                <>
                  <Link className="sdg-dropdown-item-bar" to="/login">User Login</Link>
                  <Link className="sdg-dropdown-item-bar" to="/signup">User Signup</Link>
                </>
              ) : (
                <>
                  <Link className="sdg-dropdown-item-bar" to="/userprofile">User Profile</Link>
                  <button className="sdg-dropdown-item-bar" onClick={handleSignout}>User Signout</button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default TopBar; 