import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import firebase from './firebase';
import {
  SignUp, Login, AccountManagement, CollaborativeArt, AdminPanel, DetailPanel, About, Donate, Quote, Navbar, CommunityPage
} from './components';
import {
  getBahaiMonth, 
  getBahaiCommunity, 
  getDonationsAmount,
  getRemainingTiles, 
  getActiveMembers,
  web3
} from './helpers.js';
import './style/App.css';

function App() {
  const [user, setUser] = useState(null);
  const isAdmin = user && user.email === 'rblasett@gmail.com';
  const [userMetadata, setUserMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState('');
  
    useEffect(() => {
      const loadAccount = async () => {
        try {
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error fetching accounts:', error);
        }
      };
  
      loadAccount();
  
      if (window.ethereum) {
        const handleAccountsChanged = async (accounts) => {
          setAccount(accounts[0]);
        };
  
        const handleChainChanged = () => {
          window.location.reload();
        };
  
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
  
        // Cleanup function to remove listeners
        return () => {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
      } else {
        console.log('MetaMask is not installed');
      }
    }, []);  

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
          <Route path="/community" element={<CommunityPage communityId={'Banyule'}/>} />
          <Route path="/account" element={<AccountManagement />} />
          <Route
            path="/"
            element={
              <>
                <div>
                  <h1>MetaMask Integration</h1>
                  <p>Connected Account: {account}</p>
                </div>
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
