import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ItemDetail from './pages/ItemDetail';
import SuccessStories from './SuccessStories';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/item-detail" element={<ItemDetail />} />
          <Route path="/success-stories" element={<SuccessStories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
