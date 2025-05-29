import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenService from '../services/tokenService';
import './PlayPage.css';

function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = TokenService.getLocalAccessToken();
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  const handleLogout = () => {
    TokenService.removeTokens();
    navigate('/login');
  };
  return (
    <div className="play-container">
      <h1>Poker Showdown</h1>
      <p className="welcome-subtitle">Сразитесь с ботом или подключитесь к другим игрокам в покер-матче</p>
      <div className="header">
        <button className="logout-btn-right" onClick={handleLogout}>Выйти</button>
      </div>
      <div className="welcome-buttons">
        <button className="play-btn" onClick={() => navigate('/play')}>Играть против бота</button>
        <button className="play-btn" onClick={() => alert('Функция комнат скоро будет добавлена')}>Создать комнату</button>
        <button className="play-btn" onClick={() => navigate('/rules')}>Правила</button>
      </div>
    </div>
  );
}

export default WelcomePage;
