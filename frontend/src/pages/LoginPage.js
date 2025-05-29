import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TokenService from '../services/tokenService';
import './AuthForm.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://poker-xdhq.onrender.com/api/v1/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.access) {
        TokenService.updateLocalAccessToken(data.access);
        TokenService.updateLocalRefreshToken(data.refresh);
        navigate('/welcome');
      } else {
        alert('Ошибка входа: ' + JSON.stringify(data));
      }
    } catch (err) {
      alert('Ошибка запроса: ' + err.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Вход</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Войти</button>
      <p style={{ marginTop: '10px' }}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </form>
  );
}

export default LoginPage;
