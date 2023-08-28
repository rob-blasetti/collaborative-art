import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Import getFunctions and httpsCallable from the correct module

import '../style/SignUp.css'; // Import your custom stylesheet for SignUp component

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [bahaiId, setBahaiId] = useState('');
  const auth = getAuth();
  
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);

      // user.updateProfile({
      //   displayName: firstName,
      // });

      const functions = getFunctions();
      const setCustomClaimsFunction = httpsCallable(functions, 'setCustomUserClaims');
      await setCustomClaimsFunction({
        uid: user.uid,
        firstName: firstName,
        bahaiID: bahaiId,
      });

      console.log('Custom claims set successfully.');

    } catch (error) {
      console.error(error);
      // Handle error
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
