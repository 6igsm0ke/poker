// src/pages/RulesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RulesPage.css';

function RulesPage() {
  const navigate = useNavigate();

  return (
    <div className="rules-container">
      <button className="back-btn-left" onClick={() => navigate('/welcome')}>← Назад</button>
      <h2>Правила игры</h2>
      <p>
        В этой игре вы играете против бота. Каждому игроку раздается по 5 карт. Победитель определяется по комбинациям покера:
      </p>
      <ul>
        <li><strong>Роял-флеш</strong> – A, K, Q, J, 10 одной масти</li>
        <li><strong>Стрит-флеш</strong> – пять последовательных карт одной масти</li>
        <li><strong>Каре</strong> – четыре карты одного достоинства</li>
        <li><strong>Фулл-хаус</strong> – три карты одного достоинства и пара</li>
        <li><strong>Флеш</strong> – пять карт одной масти</li>
        <li><strong>Стрит</strong> – пять последовательных карт</li>
        <li><strong>Сет</strong> – три одинаковые карты</li>
        <li><strong>Две пары</strong> – две пары одинаковых карт</li>
        <li><strong>Пара</strong> – две одинаковые карты</li>
        <li><strong>Старшая карта</strong> – если ни у кого нет комбинации, побеждает игрок с самой высокой картой</li>
      </ul>
      <p>
        Вы можете нажимать кнопку «Играть», чтобы получить новую раздачу и сравнить результат с ботом. Наслаждайтесь игрой!
      </p>
    </div>
  );
}

export default RulesPage;
