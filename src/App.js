import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import firebase from './firebase'; 
import { 
  SignUp, Login, AccountManagement, CollaborativeArt, AdminPanel, DetailPanel 
} from './components';
import { 
  getBahaiMonth, getBahaiCommunity, getDonationsAmount,
  getRemainingTiles, getActiveMembers
} from './helpers.js';
import './style/App.css';

const Navbar = ({ user, userMetadata, onLogout }) => {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <Link to="/">Collaborative.World</Link>
        </div>
        <div className="navbar__menu">
          {user ? (
            <>
              <div className="navbar__account">
                <span>{user.email}</span>
              </div>
              <div className="navbar__account">
                <span>{userMetadata.firstName}</span>
              </div>
              <div className="navbar__account">
                <span>{userMetadata.bahaiID}</span>
              </div>
              <button className="navbar__logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const isAdmin = user && user.email === 'rblasett@gmail.com';
  const [userMetadata, setUserMetadata] = useState({});

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      
      if (currentUser && currentUser.displayName) {
        const parsedData = JSON.parse(currentUser.displayName);
        console.log(parsedData)
        setUserMetadata(parsedData);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar user={user} userMetadata={userMetadata} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<AccountManagement />} />
          <Route
            path="/"
            element={
              <>
                <DetailPanel
                  month={getBahaiMonth()}
                  communityName={getBahaiCommunity()}
                  donations={getDonationsAmount()}
                  remainingTiles={getRemainingTiles()}
                  activeMembers={getActiveMembers()}
                />
                <CollaborativeArt />
                <AdminPanel isAdmin={isAdmin} />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
