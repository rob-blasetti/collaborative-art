import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

const AccountManagement = () => {
  const [newPassword, setNewPassword] = useState('');
  const auth = getAuth();

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      await user.updatePassword(newPassword);
      // Handle successful password change
    } catch (error) {
      // Handle password change error
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Account Management</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default AccountManagement;
