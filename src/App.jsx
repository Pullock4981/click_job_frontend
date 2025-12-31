import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import { useTheme } from './contexts/ThemeContext.jsx';
import Layout from './components/layout/Layout.jsx';
import HeroSection from './components/home/HeroSection.jsx';
import StatsSection from './components/home/StatsSection.jsx';
import RecentActivitySection from './components/home/RecentActivitySection.jsx';
import ServicesSection from './components/home/ServicesSection.jsx';
import ReferralBadgeSection from './components/home/ReferralBadgeSection.jsx';
import FindGreatWorkSection from './components/home/FindGreatWorkSection.jsx';
import ReferralProgram from './pages/ReferralProgram.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// Home page with all sections
const Home = () => (
  <Layout>
    <HeroSection />
    <StatsSection />
    <RecentActivitySection />
    <ServicesSection />
    <ReferralBadgeSection />
    <FindGreatWorkSection />
  </Layout>
);


import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" />;

  return children;
};

const Terms = () => (
  <Layout>
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p>Terms of Service content will be updated soon.</p>
    </div>
  </Layout>
);

const Privacy = () => (
  <Layout>
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>Privacy Policy content will be updated soon.</p>
    </div>
  </Layout>
);

function App() {
  const { isAuthenticated, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div data-theme={theme} className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/referral" element={<ReferralProgram />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

