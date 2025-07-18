// 🔧 Main App Component with React Router
// Central component that handles routing, SEO, and global state

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import hooks and components
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute, SEO } from './components';

// Import pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

// Import global CSS
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            {/* Global SEO */}
            <SEO />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Placeholder redirects for now */}
              <Route path="/browse" element={<Navigate to="/dashboard" replace />} />
              <Route path="/list-item" element={<Navigate to="/dashboard" replace />} />
              <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
              <Route path="/swaps" element={<Navigate to="/dashboard" replace />} />
              <Route path="/messages" element={<Navigate to="/dashboard" replace />} />
            
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            {/* Toast notifications with improved styling */}
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastClassName="custom-toast"
              bodyClassName="custom-toast-body"
              progressClassName="custom-toast-progress"
            />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
