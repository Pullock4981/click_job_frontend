# Click Job Frontend

React + Vite frontend for Click Job - Microjob Platform

## 🚀 Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **DaisyUI** - Component Library
- **React Router** - Routing
- **Axios** - HTTP Client
- **Socket.io Client** - Real-time Communication
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **React Hook Form + Zod** - Form Handling
- **Zustand** - State Management
- **Recharts** - Charts

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Server will run on `http://localhost:3000`

## 🎨 Theme System

### Light Theme Colors:
- Primary: `#E2852E`
- Secondary: `#F5C857`
- Accent: `#FFEE91`
- Neutral: `#ABE0F0`

### Dark Theme Colors:
- Primary: `#37353E`
- Secondary: `#44444E`
- Accent: `#715A5A`
- Neutral: `#D3DAD9`

Theme toggle is available in the navbar.

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── common/      # Reusable components
│   └── layout/      # Layout components
├── config/          # Configuration files
│   ├── api.js       # API endpoints
│   └── theme.js     # Theme configuration
├── contexts/        # React contexts
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── services/        # API & Socket services
│   ├── api.js
│   └── socket.js
├── utils/           # Utility functions
│   ├── constants.js
│   └── helpers.js
├── pages/           # Page components (to be created)
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## 🔧 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## ✅ What's Implemented

- ✅ Project setup (Vite + React)
- ✅ Tailwind CSS + DaisyUI configuration
- ✅ Theme system (Light/Dark mode)
- ✅ API service with axios
- ✅ Socket.io client setup
- ✅ Auth context
- ✅ Theme context
- ✅ Basic routing
- ✅ Toast notifications
- ✅ Layout components (Navbar, Layout)
- ✅ Theme toggle component

## 📝 Next Steps

1. Create authentication pages (Login, Register)
2. Create dashboard pages
3. Create job listing and details pages
4. Implement chat functionality
5. Add file upload components
6. Create admin panel
7. Add charts and analytics

## 🔗 Backend API

Backend should be running on `http://localhost:5000`

See `Click_Job_Backend/README.md` for API documentation.

