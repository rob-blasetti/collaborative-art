import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Import your Home component
import Login from './Login'; // Import your Login component
import Signup from './SignUp'; // Import your Signup component

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Home} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
