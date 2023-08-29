import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login, SignUp, Donate, About } from '../components';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/donate" component={Donate} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
