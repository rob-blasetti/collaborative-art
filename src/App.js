import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import firebase from './firebase';
import {
  SignUp, Login, AccountManagement, CollaborativeArt, AdminPanel, DetailPanel, About, Donate, Quote, Navbar
} from './components';
import {
  getBahaiMonth, 
  getBahaiCommunity, 
  getDonationsAmount,
  getRemainingTiles, 
  getActiveMembers
} from './helpers.js';
import './style/App.css';

function App() {
  const [user, setUser] = useState(null);
  const isAdmin = user && user.email === 'rblasett@gmail.com';
  const [userMetadata, setUserMetadata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      
      if (currentUser && currentUser.displayName) {
        const parsedData = JSON.parse(currentUser.displayName);
        console.log(parsedData)
        setUserMetadata(parsedData);
        setLoading(false);
      } else {
        console.log("No user is signed in.");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar user={user} userMetadata={userMetadata} loading={loading} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
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
                <Quote />
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
