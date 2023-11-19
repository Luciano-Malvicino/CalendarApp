// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Home from './components/Home.jsx';
import Testt from './components/Testt.jsx';
import Login from './components/logreg/Login.jsx';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Test" element={<Testt />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
