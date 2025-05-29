# Poker Showdown ♠️

**Poker Showdown** is an online multiplayer poker app built with **Django** and **React** that lets users play poker against bots or in real-time against each other.

---

## 📄 Features

* 🔑 **Authentication system** (JWT)
* ♟ Play **against AI bot**
* 👥 Real-time rooms for **multiplayer poker** *(WIP)*
* ✨ Animated card dealing and sound effects
* 🌐 Deployed to Render: [Live Demo]([(https://poker-4gmu.onrender.com/)])

---

## 🔧 Tech Stack

### Backend:

* Django 5.2 + Django Rest Framework
* JWT Authentication (SimpleJWT)
* CORS + Whitenoise for static serving

### Frontend:

* React + React Router
* Fetch + Axios API layer
* Animations with CSS and JS

---

## ⚖️ Project Structure

```
app/
├── backend/            # Django backend
├── frontend/           # React frontend
│   ├── build/          # Compiled React for deployment
├── poker/              # Poker game logic
├── users/              # Custom user model + auth views
├── manage.py
├── render.yaml         # Render deployment config
└── requirements.txt
```

---

## 📅 Development

### 1. Clone the project

```bash
git clone https://github.com/6igsm0ke/poker.git
cd poker
```

### 2. Backend setup

```bash
cd app
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm start
```

---

## ✨ Unique Approaches

* Backend-rendered React: `index.html` served from `frontend/build`
* Sound effects and timed animation using `setTimeout`
* Token-based `PrivateRoute` handling with refresh logic in Axios interceptor

---

## 🚫 Known Issues

* Multiplayer room logic in development
* Manifest.json returns 404 in some environments (can be fixed by static path config)
* Refresh token storage could be further secured with HttpOnly cookies

---

## ❓ Why This Stack?

* Django for robust backend logic and REST APIs
* React for dynamic, fast frontends
* JWT for scalable token-based authentication
* Render.com for easy full-stack deployment

---

## ⚡ How to Contribute

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

## ✉️ Contact

Feel free to reach out via GitHub or email for any questions or collaborations.

---

Made with ♥️ by [6igsm0ke](https://github.com/6igsm0ke)
