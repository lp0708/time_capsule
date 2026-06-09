import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateCapsulePage from './pages/CreateCapsulePage';
import CapsuleDetailPage from './pages/CapsuleDetailPage';
import EditCapsulePage from './pages/EditCapsulePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-pattern" />
        <Navbar />
        <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/capsules/new" element={
              <ProtectedRoute><CreateCapsulePage /></ProtectedRoute>
            } />
            <Route path="/capsules/:id" element={
              <ProtectedRoute><CapsuleDetailPage /></ProtectedRoute>
            } />
            <Route path="/capsules/:id/edit" element={
              <ProtectedRoute><EditCapsulePage /></ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;