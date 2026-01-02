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
import Premium from './pages/Premium.jsx';
import PostJob from './pages/PostJob.jsx';
import MyTasks from './pages/MyTasks.jsx';
import AcceptedTasks from './pages/AcceptedTasks.jsx';
import MyWork from './pages/MyWork.jsx';
import MyJobs from './pages/MyJobs.jsx';
import Notifications from './pages/Notifications.jsx';
import Deposit from './pages/Deposit.jsx';
import TransactionsHistory from './pages/TransactionsHistory.jsx';
import Advertisement from './pages/Advertisement.jsx';
import Support from './pages/Support.jsx';
import PlayAndEarn from './pages/PlayAndEarn.jsx';
import Profile from './pages/Profile.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Wallet from './pages/Wallet.jsx';

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
          <Route path="/share" element={<ReferralProgram />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
          <Route path="/premium" element={<PrivateRoute><Premium /></PrivateRoute>} />
          <Route path="/post-job" element={<PrivateRoute><PostJob /></PrivateRoute>} />
          <Route path="/my-work" element={<PrivateRoute><Navigate to="/my-work/tasks" /></PrivateRoute>} />
          <Route path="/my-work/tasks" element={<PrivateRoute><MyTasks /></PrivateRoute>} />
          <Route path="/my-work/accepted" element={<PrivateRoute><AcceptedTasks /></PrivateRoute>} />
          <Route path="/my-jobs" element={<PrivateRoute><MyJobs /></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><TransactionsHistory /></PrivateRoute>} />
          <Route path="/ads" element={<PrivateRoute><Advertisement /></PrivateRoute>} />
          <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
          <Route path="/play" element={<PrivateRoute><PlayAndEarn /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
          <Route path="/top-depositors" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="/top-workers" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="/top-job-posters" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="/top-refer" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="/top-users" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

