// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Home from './components/Home.jsx';
import SideNav from './components/SideNav/SideNav.jsx';
import Login from './components/logreg/Login.jsx';
import Register from './components/logreg/Register.jsx';
import Forgot from './components/logreg/Forgot.jsx';
import Password from './components/logreg/Password.jsx';
import GameList from './components/GameLibrary/GameList.jsx';
import Emulator from './components/Emulator/Emulator.jsx'

function App() {
  return (
        <Routes basename = '/'>
            <Route exact path="/" element={<Home />} />
            <Route path="/Emulator" element={<Emulator />} />
            <Route path="/GameList" element={<GameList />} />
            <Route path="/SideNav" element={<SideNav />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Forgot" element={<Forgot />} />
            <Route path="/Password" element={<Password />} />
        </Routes>
  );
}

export default App;
