import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useHistory

import '../style/SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bahaiId, setBahaiId] = useState('');
  const [isActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userMetadata, setUserMetadata] = useState({});

  let navigate = useNavigate();

  const handleSignUp = async () => {  
    setLoading(true); // Start loading
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in metadata
      const userData = {
        firstName,
        lastName,
        bahaiID: bahaiId,
        isActive: isActive
      };

      await updateProfile(user, {
        displayName: JSON.stringify(userData),
      });

      setUser(user);
      setUserMetadata(userData);
      setLoading(false);

      console.log('User signed up successfully!', user);
      navigate('/');
    } catch (error) {
      setLoading(false); // End loading
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      {loading ? (
      <div className="loading">Signing up...</div>  // Loading message
      ) : (
      <div className="signup-form">
      <input
          type="text"
          className="signup-input"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="signup-input"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          className="signup-input"
          placeholder="Bahai ID"
          value={bahaiId}
          onChange={(e) => setBahaiId(e.target.value)}
        />
        <input
          type="email"
          className="signup-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="signup-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
      </div>
      )}
    </div>
  );
};

export default SignUp;
