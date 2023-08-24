import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import firebase from './firebase';
import SignUp from './SignUp';
import Login from './Login';
import AccountManagement from './AccountManagement';
import CollaborativeArt from './CollaborativeArt';
import DetailPanel from './DetailPanel';
import './App.css';

const Navbar = ({ user, onLogout }) => {
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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<AccountManagement />} />
          <Route
            path="/"
            element={
              <>
                <DetailPanel
                  month={'Names'}
                  communityName={'Banyule'}
                  donations={'$150'}
                  remainingTiles={17}
                  activeMembers={4}
                />
                <CollaborativeArt />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
