import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import TokenService from '../services/tokenService';
import './PlayPage.css';

function PlayPage() {
  const [playerCards, setPlayerCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = TokenService.getLocalAccessToken();
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const playSound = (filename) => {
    const audio = new Audio(`/sounds/${filename}`);
    audio.play().catch(() => {});
  };

  const handlePlay = async () => {
    try {
      const res = await API.post('/poker/play/');
      const data = res.data;

      setPlayerCards([]);
      setBotCards([]);
      setResult(null);

      data.player_cards.forEach((card, index) => {
        setTimeout(() => {
          playSound('deal.mp3');
          setPlayerCards(prev => [...prev, card]);
        }, index * 400);
      });

      data.bot_cards.forEach((card, index) => {
        setTimeout(() => {
          playSound('deal.mp3');
          setBotCards(prev => [...prev, card]);
          if (index === data.bot_cards.length - 1) {
            setTimeout(() => {
              setResult({
                player: data.player_combination,
                bot: data.bot_combination,
                winner: data.winner,
              });

              if (data.winner === 'player') playSound('win.mp3');
              else if (data.winner === 'bot') playSound('lose.mp3');
              else playSound('draw.mp3');

            }, 500);
          }
        }, (data.player_cards.length + index) * 400);
      });
    } catch (err) {
      alert('Ошибка запроса: ' + err.message);
    }
  };

  const handleLogout = () => {
    TokenService.removeTokens();
    navigate('/login');
  };

  return (
    <div className="play-container">
      <div className="top-bar">
        <button className="back-btn-left" onClick={() => navigate('/welcome')}>← Назад</button>
        <button className="logout-btn-right" onClick={handleLogout}>Выйти</button>
      </div>

      <h2>Покер против бота</h2>
      <button className="play-btn" onClick={handlePlay}>Играть</button>

      <div className="cards-section">
        <div>
          <h3>Ваши карты</h3>
          <div className="card-container">
            {playerCards.map(card => (
              <img key={card.code} src={card.img} alt={card.code} className="card-deal" />
            ))}
          </div>
        </div>
        <div>
          <h3>Карты бота</h3>
          <div className="card-container">
            {botCards.map(card => (
              <img key={card.code} src={card.img} alt={card.code} className="card-deal" />
            ))}
          </div>
        </div>
      </div>

      {result && (
        <div className="result-text">
          <p><strong>Вы:</strong> {result.player}</p>
          <p><strong>Бот:</strong> {result.bot}</p>
          <h3>Победитель: {result.winner === 'draw' ? 'Ничья' : result.winner === 'player' ? 'Вы!' : 'Бот'}</h3>
        </div>
      )}
    </div>
  );
}

export default PlayPage;
