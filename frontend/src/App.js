import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PlayPage from './pages/PlayPage';
import WelcomePage from './pages/WelcomePage';
import RulesPage from './pages/RulesPage';
import PrivateRoute from './components/PrivateRoute'; // импортируем
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<PrivateRoute element={<WelcomePage />} />} />
        <Route path="/play" element={<PrivateRoute element={<PlayPage />} />} />
        <Route path="/rules" element={<PrivateRoute element={<RulesPage />} />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
