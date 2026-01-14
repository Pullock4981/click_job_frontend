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
import AdminUsers from './pages/AdminUsers.jsx';
import DuplicateUser from './pages/DuplicateUser.jsx';
import VerifiedUsers from './pages/VerifiedUsers.jsx';
import UnverifiedUsers from './pages/UnverifiedUsers.jsx';
import DocumentVerifyRequest from './pages/DocumentVerifyRequest.jsx';
import AdminAccountManage from './pages/AdminAccountManage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import HeaderNoticeInfo from './pages/HeaderNoticeInfo.jsx';
import CounterInfo from './pages/CounterInfo.jsx';
import ContactInfoManage from './pages/ContactInfoManage.jsx';
import ContactMessages from './pages/ContactMessages.jsx';
import GoogleAdsManage from './pages/GoogleAdsManage.jsx';
import PolicyManage from './pages/PolicyManage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AdsRatePage from './pages/AdsRatePage.jsx';
import AdsListPage from './pages/AdsListPage.jsx';
import ClickEarnAdsPage from './pages/ClickEarnAdsPage.jsx';
import LotteryPage from './pages/LotteryPage.jsx';
import PremiumPackageList from './pages/PremiumPackageList.jsx';
import PremiumUsers from './pages/PremiumUsers.jsx';
import ApprovalJobList from './pages/ApprovalJobList.jsx';
import DeleteRequestJobList from './pages/DeleteRequestJobList.jsx';
import JobWorkList from './pages/JobWorkList.jsx';
import DepositAccountPage from './pages/DepositAccountPage.jsx';
import DepositListPage from './pages/DepositListPage.jsx';
import WithdrawMethodPage from './pages/WithdrawMethodPage.jsx';
import WithdrawListPage from './pages/WithdrawListPage.jsx';
import SMMCategoryPage from './pages/SMMCategoryPage.jsx';
import SMMServicePage from './pages/SMMServicePage.jsx';
import SMMRequestPage from './pages/SMMRequestPage.jsx';
import HeadlineManager from './pages/HeadlineManager.jsx';
import TopWorkerPage from './pages/TopWorkerPage.jsx';
import TopJobPosterPage from './pages/TopJobPosterPage.jsx';
import TopUserReportPage from './pages/TopUserReportPage.jsx';
import ReferralDistributionPage from './pages/ReferralDistributionPage.jsx';
import JobCategoryPage from './pages/JobCategoryPage.jsx';
import JobSubCategoryPage from './pages/JobSubCategoryPage.jsx';
import CountryPage from './pages/CountryPage.jsx';
import LocationZonePage from './pages/LocationZonePage.jsx';
import DefaultSetupPage from './pages/DefaultSetupPage.jsx';
import SpinSettingPage from './pages/SpinSettingPage.jsx';
import UserMessagePage from './pages/UserMessagePage.jsx';
import CustomScriptPage from './pages/CustomScriptPage.jsx';
import WebsiteInfoPage from './pages/WebsiteInfoPage.jsx';
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
import AdsNew from './pages/AdsNew.jsx';
import AdsHistory from './pages/AdsHistory.jsx';
import JobDetail from './pages/JobDetail.jsx';
import JobWorkReview from './pages/JobWorkReview.jsx';
import LiveSupport from './pages/LiveSupport.jsx';


import Ticket from './pages/Ticket.jsx';

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
  const { isAuthenticated, user, loading } = useAuth();
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
          <Route path="/referral" element={<ReferralProgram />} />
          <Route path="/share" element={<ReferralProgram />} />
          <Route path="/live-support" element={<LiveSupport />} />
          <Route
            path="/login"
            element={isAuthenticated ? (user?.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />) : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? (user?.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />) : <Register />}
          />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute adminOnly={true}><AdminUsers /></PrivateRoute>} />
          <Route path="/admin/users/duplicate" element={<PrivateRoute adminOnly={true}><DuplicateUser /></PrivateRoute>} />
          <Route path="/admin/users/verified" element={<PrivateRoute adminOnly={true}><VerifiedUsers /></PrivateRoute>} />
          <Route path="/admin/users/unverified" element={<PrivateRoute adminOnly={true}><UnverifiedUsers /></PrivateRoute>} />
          <Route path="/admin/users/verify-requests" element={<PrivateRoute adminOnly={true}><DocumentVerifyRequest /></PrivateRoute>} />
          <Route path="/admin/accounts" element={<PrivateRoute adminOnly={true}><AdminAccountManage /></PrivateRoute>} />
          <Route path="/admin/about-us" element={<PrivateRoute adminOnly={true}><AboutUs /></PrivateRoute>} />
          <Route path="/admin/notice-info" element={<PrivateRoute adminOnly={true}><HeaderNoticeInfo /></PrivateRoute>} />
          <Route path="/admin/counter-info" element={<PrivateRoute adminOnly={true}><CounterInfo /></PrivateRoute>} />
          <Route path="/admin/contact-info" element={<PrivateRoute adminOnly={true}><ContactInfoManage /></PrivateRoute>} />
          <Route path="/admin/contact-messages" element={<PrivateRoute adminOnly={true}><ContactMessages /></PrivateRoute>} />
          <Route path="/admin/google-ads" element={<PrivateRoute adminOnly={true}><GoogleAdsManage /></PrivateRoute>} />
          <Route path="/admin/policy" element={<PrivateRoute adminOnly={true}><PolicyManage /></PrivateRoute>} />
          <Route path="/admin/services" element={<PrivateRoute adminOnly={true}><ServicesPage /></PrivateRoute>} />
          <Route path="/admin/ads-rate" element={<PrivateRoute adminOnly={true}><AdsRatePage /></PrivateRoute>} />
          <Route path="/admin/ads-list" element={<PrivateRoute adminOnly={true}><AdsListPage /></PrivateRoute>} />
          <Route path="/admin/click-earn-ads" element={<PrivateRoute adminOnly={true}><ClickEarnAdsPage /></PrivateRoute>} />
          <Route path="/admin/lottery-list" element={<PrivateRoute adminOnly={true}><LotteryPage /></PrivateRoute>} />
          <Route path="/admin/package/list" element={<PrivateRoute adminOnly={true}><PremiumPackageList /></PrivateRoute>} />
          <Route path="/admin/premium-users" element={<PrivateRoute adminOnly={true}><PremiumUsers /></PrivateRoute>} />
          <Route path="/admin/jobs/approval" element={<PrivateRoute adminOnly={true}><ApprovalJobList /></PrivateRoute>} />
          <Route path="/admin/jobs/delete-requests" element={<PrivateRoute adminOnly={true}><DeleteRequestJobList /></PrivateRoute>} />
          <Route path="/admin/jobs/works" element={<PrivateRoute adminOnly={true}><JobWorkList /></PrivateRoute>} />
          <Route path="/admin/deposit/accounts" element={<PrivateRoute adminOnly={true}><DepositAccountPage /></PrivateRoute>} />
          <Route path="/admin/deposit/list" element={<PrivateRoute adminOnly={true}><DepositListPage /></PrivateRoute>} />
          <Route path="/admin/withdraw/methods" element={<PrivateRoute adminOnly={true}><WithdrawMethodPage /></PrivateRoute>} />
          <Route path="/admin/withdraw/list" element={<PrivateRoute adminOnly={true}><WithdrawListPage /></PrivateRoute>} />
          <Route path="/admin/smm/category" element={<PrivateRoute adminOnly={true}><SMMCategoryPage /></PrivateRoute>} />
          <Route path="/admin/smm/service" element={<PrivateRoute adminOnly={true}><SMMServicePage /></PrivateRoute>} />
          <Route path="/admin/smm/requests" element={<PrivateRoute adminOnly={true}><SMMRequestPage /></PrivateRoute>} />
          <Route path="/admin/headline/main" element={<PrivateRoute adminOnly={true}><HeadlineManager type="main" title="Main Headline" /></PrivateRoute>} />
          <Route path="/admin/headline/task-prove" element={<PrivateRoute adminOnly={true}><HeadlineManager type="task-prove" title="Task Prove Headline" /></PrivateRoute>} />
          <Route path="/admin/headline/applied-task" element={<PrivateRoute adminOnly={true}><HeadlineManager type="applied-task" title="Applied Task Headline" /></PrivateRoute>} />
          <Route path="/admin/top/workers" element={<PrivateRoute adminOnly={true}><TopWorkerPage /></PrivateRoute>} />
          <Route path="/admin/top/posters" element={<PrivateRoute adminOnly={true}><TopJobPosterPage /></PrivateRoute>} />
          <Route path="/admin/boost-service" element={<PrivateRoute adminOnly={true}><HeadlineManager type="boost-service" title="Boost Service Headline" /></PrivateRoute>} />
          <Route path="/admin/top/depositors" element={<PrivateRoute adminOnly={true}><TopUserReportPage type="top-deposit" title="Top 10 Deposit User" reportEndpoint="top-depositors" columnLabel="AMOUNT" columnValueKey="amount" formatValue={(val) => `$ ${val.toFixed(2)}`} /></PrivateRoute>} />
          <Route path="/admin/top/best" element={<PrivateRoute adminOnly={true}><TopUserReportPage type="top-best" title="Top 10 Best Users" reportEndpoint="top-best-users" columnLabel="AMOUNT" columnValueKey="amount" formatValue={(val) => `$ ${val.toFixed(2)}`} /></PrivateRoute>} />
          <Route path="/admin/top/referrals" element={<PrivateRoute adminOnly={true}><TopUserReportPage type="top-referral" title="Top 10 Refer" reportEndpoint="top-referrers" columnLabel="JOINED" columnValueKey="referralCount" formatValue={(val) => `${val} user`} /></PrivateRoute>} />
          <Route path="/admin/setting/referral" element={<PrivateRoute adminOnly={true}><ReferralDistributionPage /></PrivateRoute>} />
          <Route path="/admin/setting/job-category" element={<PrivateRoute adminOnly={true}><JobCategoryPage /></PrivateRoute>} />
          <Route path="/admin/setting/job-sub-category" element={<PrivateRoute adminOnly={true}><JobSubCategoryPage /></PrivateRoute>} />
          <Route path="/admin/setting/country" element={<PrivateRoute adminOnly={true}><CountryPage /></PrivateRoute>} />
          <Route path="/admin/setting/location-zone" element={<PrivateRoute adminOnly={true}><LocationZonePage /></PrivateRoute>} />
          <Route path="/admin/setting/default" element={<PrivateRoute adminOnly={true}><DefaultSetupPage /></PrivateRoute>} />
          <Route path="/admin/setting/spin" element={<PrivateRoute adminOnly={true}><SpinSettingPage /></PrivateRoute>} />
          <Route path="/admin/setting/messages" element={<PrivateRoute adminOnly={true}><UserMessagePage /></PrivateRoute>} />
          <Route path="/admin/setting/scripts" element={<PrivateRoute adminOnly={true}><CustomScriptPage /></PrivateRoute>} />
          <Route path="/admin/settings" element={<PrivateRoute adminOnly={true}><WebsiteInfoPage /></PrivateRoute>} />
          <Route path="/premium" element={<PrivateRoute><Premium /></PrivateRoute>} />
          <Route path="/post-job" element={<PrivateRoute><PostJob /></PrivateRoute>} />
          <Route path="/my-work" element={<PrivateRoute><Navigate to="/my-work/tasks" /></PrivateRoute>} />
          <Route path="/my-work/tasks" element={<PrivateRoute><MyTasks /></PrivateRoute>} />
          <Route path="/my-work/accepted" element={<PrivateRoute><AcceptedTasks /></PrivateRoute>} />
          <Route path="/my-jobs" element={<PrivateRoute><MyJobs /></PrivateRoute>} />
          <Route path="/my-jobs/review" element={<PrivateRoute><JobWorkReview /></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
          <Route path="/jobs/:id" element={<PrivateRoute><JobDetail /></PrivateRoute>} />

          <Route path="/transactions" element={<Navigate to="/transactions/deposit" />} />
          <Route path="/transactions/withdraw" element={<PrivateRoute><TransactionsHistory type="withdraw" /></PrivateRoute>} />
          <Route path="/transactions/deposit" element={<PrivateRoute><TransactionsHistory type="deposit" /></PrivateRoute>} />
          <Route path="/transactions/history" element={<Navigate to="/transactions/deposit" />} />

          <Route path="/ads" element={<PrivateRoute><Advertisement /></PrivateRoute>} />
          <Route path="/ads/new" element={<PrivateRoute><AdsNew /></PrivateRoute>} />
          <Route path="/ads/history" element={<PrivateRoute><AdsHistory /></PrivateRoute>} />

          <Route path="/ticket" element={<PrivateRoute><Ticket /></PrivateRoute>} />
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

