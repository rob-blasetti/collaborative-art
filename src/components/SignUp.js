import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import '../style/SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bahaiId, setBahaiId] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSignUp = async () => {
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

      console.log('User signed up successfully!', user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
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
    </div>
  );
};

export default SignUp;
