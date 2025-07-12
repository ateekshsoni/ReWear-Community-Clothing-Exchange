import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ItemDetail from './pages/ItemDetail';
import SuccessStories from './SuccessStories';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import HowItWorks from './pages/HowItWorks';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/item-detail" element={<ItemDetail />} />
          <Route path="/success-stories" element={<SuccessStories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
