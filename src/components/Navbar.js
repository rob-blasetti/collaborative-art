import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

const Navbar = ({ user, userMetadata, loading }) => {
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
                <Link to="/">Sacred Canvas</Link>
            </div>
            <Link to="/about">About</Link>
            <Link to="/community">Community</Link>
            <Link to="/donate">Donate</Link>
            <div className="navbar__menu">
            {loading ? 
                (<div className="navbar__loading">Loading...</div>) : (
                    user && user.email && userMetadata.firstName && userMetadata.bahaiID ? (
                    <>
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
                    )
                )}
            </div>
            </div>
        </nav>
        );
    };

export default Navbar;
