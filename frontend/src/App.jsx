// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Home from './components/Home.jsx';
import Testt from './components/Testt.jsx';
import Login from './components/logreg/Login.jsx';
import Register from './components/logreg/Register.jsx';
import Forgot from './components/logreg/Forgot.jsx';
import Password from './components/logreg/Password.jsx';

function App() {
  return (
    <Router>
        <Routes basename = '/'>
          <Route exact path="/" element={<Home />} />
          <Route path="/Test" element={<Testt />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Password" element={<Password />} />
        </Routes>
    </Router>
  );
}

export default App;
