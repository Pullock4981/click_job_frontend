import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import ThemeToggle from '../common/ThemeToggle.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { FaUser, FaWallet, FaUsers, FaLifeRing, FaMoon, FaSun, FaRunning, FaBell, FaShareAlt } from 'react-icons/fa';
import { HiChartBar } from 'react-icons/hi';
import Logo from '../common/Logo.jsx';
import api from '../../services/api.js';
import { API_ENDPOINTS } from '../../config/api.js';

const Navbar = ({ toggleSidebar }) => {
  const { isAuthenticated, user, logout, refreshUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      // Periodically refresh user balance and notifications
      const interval = setInterval(() => {
        refreshUser();
        fetchNotifications();
      }, 30000); // every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get(API_ENDPOINTS.NOTIFICATIONS + '?limit=5');
      if (res.data) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markAllRead = async () => {
    try {
      await api.put(API_ENDPOINTS.MARK_ALL_READ);
      setUnreadCount(0);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleShare = () => {
    const url = window.location.origin;
    const text = "Join Click Job and start earning!";
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`navbar ${isAuthenticated ? 'bg-primary dark:bg-base-200 h-16 px-4 md:px-6' : 'bg-base-100 h-20 px-4'} shadow-lg sticky top-0 z-50 transition-all duration-300 border-b border-white/5 dark:border-white/5`}>

      {!isAuthenticated ? (
        <div className="container mx-auto flex items-center h-full">
          <div className="navbar-start">
            <Logo />
          </div>

          <div className="navbar-center hidden lg:flex flex-1 justify-center gap-10">
            <Link to="/" className="font-bold text-base-content hover:text-primary transition-all duration-300 whitespace-nowrap">Home</Link>
            <Link to="/live-support" className="font-bold text-base-content hover:text-primary transition-all duration-300 whitespace-nowrap">Live Support</Link>
            <Link to="/referral" className="font-bold text-base-content hover:text-primary transition-all duration-300 whitespace-nowrap">Referral Program</Link>
          </div>

          <div className="navbar-end gap-1 md:gap-4 flex items-center">
            <ThemeToggle />
            <div className="hidden lg:flex gap-2">
              <Link to="/register" className="btn btn-ghost font-bold text-base-content hover:bg-base-200 text-sm">Register</Link>
              <Link to="/login" className="btn btn-primary px-8 rounded-full shadow-lg text-white font-bold text-sm">Login</Link>
            </div>

            {/* Guest Mobile Menu */}
            <div className={`dropdown dropdown-end lg:hidden ${isMobileMenuOpen ? 'dropdown-open' : ''}`}>
              <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={toggleMobileMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-content/10">
                <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
                <li><Link to="/live-support" onClick={closeMobileMenu}>Live Support</Link></li>
                <li><Link to="/referral" onClick={closeMobileMenu}>Referral Program</Link></li>
                <div className="divider my-1"></div>
                <li><Link to="/register" onClick={closeMobileMenu}>Register Account</Link></li>
                <li><Link to="/login" className="text-primary font-black" onClick={closeMobileMenu}>Login Now</Link></li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center h-full">
          {/* Hamburger for Sidebar */}
          <div className="flex items-center lg:hidden">
            <button onClick={toggleSidebar} className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors mr-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Authenticated Header Content - Right Aligned */}
          <div className="flex-1 flex items-center justify-end gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 text-white min-w-0">
            {/* Earning Balance Pilled */}
            <div className="flex items-center gap-1 bg-blue-900/60 dark:bg-black/20 px-2 xs:px-3 md:px-4 py-1.5 rounded-md border border-white/5 transition-all hover:bg-white/10 flex-shrink-0">
              <span className="hidden min-[600px]:inline text-[10px] md:text-[11px] text-white font-bold">Earning:</span>
              <span className="text-[11px] sm:text-xs md:text-sm font-black text-white">${user?.earningBalance?.toFixed(3) || '0.000'}</span>
            </div>

            {/* Deposit Balance Pilled */}
            <div className="flex items-center gap-1 bg-[#008000] px-2 xs:px-3 md:px-4 py-1.5 rounded-md shadow-lg transition-all hover:scale-105 border border-white/10 flex-shrink-0">
              <span className="hidden min-[600px]:inline text-[10px] md:text-[11px] text-white font-bold">Deposit:</span>
              <span className="text-[11px] sm:text-xs md:text-sm font-black text-white">${user?.depositBalance?.toFixed(3) || '0.000'}</span>
              {user?.pendingDeposit > 0 && (
                <span className="text-[9px] md:text-[10px] text-yellow-200 ml-1 font-bold whitespace-nowrap" title="Pending Approval">
                  (+${user.pendingDeposit} Pending)
                </span>
              )}
            </div>


            {/* Notification & ID */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative cursor-pointer p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-all text-blue-200"
                >
                  <FaBell className="w-4 h-4 sm:w-5 sm:h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-[8px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center border border-primary font-bold">{unreadCount}</span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                      <h3 className="text-sm font-bold text-gray-800">You have <span className="text-primary">{unreadCount}</span> new notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div key={notif._id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-[11px] font-black text-gray-800 uppercase tracking-tighter">{notif.type.replace('_', ' ')}</span>
                              <span className="text-[10px] text-gray-400 font-medium">{new Date(notif.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="text-[12px] text-gray-600 leading-snug">{notif.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-400 text-sm font-medium">No notifications yet</div>
                      )}
                    </div>
                    <div className="p-3 bg-gray-50 text-center">
                      <button onClick={markAllRead} className="text-xs font-bold text-primary hover:underline">Read all</button>
                    </div>
                  </div>
                )}
              </div>

              {/* ID Display */}
              <div className="hidden sm:block text-[13px] md:text-sm font-black text-white whitespace-nowrap">
                ID: {user?.numericId || '-----'}
              </div>
            </div>

            {/* Share Badge */}
            <button
              onClick={handleShare}
              className="hidden lg:flex items-center bg-blue-600 px-3 py-1.5 rounded shadow-sm gap-2 border border-white/10 hover:bg-blue-700 transition-colors"
            >
              <FaShareAlt className="text-white text-xs" />
              <span className="text-[11px] font-bold text-white whitespace-nowrap">Share 62K</span>
            </button>

            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* User Profile */}
            <div className={`dropdown dropdown-end ml-1 ${isProfileMenuOpen ? 'dropdown-open' : ''}`}>
              <div
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="avatar">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white ring-2 ring-blue-400/50 overflow-hidden bg-blue-100 flex items-center justify-center transition-transform group-hover:scale-105">
                    <img src={user?.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="hidden min-[1100px]:block">
                  <div className="text-sm font-bold text-white whitespace-nowrap">{user?.name || 'Shohag Hosen'}</div>
                </div>
              </div>

              <ul className="dropdown-content mt-4 z-[50] p-0 shadow-2xl bg-base-100 rounded-xl w-64 overflow-hidden border border-base-300 animate-in fade-in slide-in-from-top-2">
                {/* Header */}
                <li className="px-5 py-4 bg-base-200/50 border-b border-base-300">
                  <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest leading-none">Hello, {user?.name?.split(' ')[0] || 'User'}</span>
                </li>

                <div className="py-1">
                  <li><Link
                    to="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors group"
                  >
                    <div className="w-6 flex justify-center text-base-content group-hover:text-primary"><FaUser className="text-base" /></div>
                    <span className="text-sm font-semibold text-base-content/80 group-hover:text-base-content">My profile</span>
                  </Link></li>

                  {[
                    { label: 'Top Depositor', icon: <HiChartBar className="text-lg" />, path: '/top-depositors' },
                    { label: 'Top Worker', icon: <HiChartBar className="text-lg" />, path: '/top-workers' },
                    { label: 'Top Job Poster', icon: <HiChartBar className="text-lg" />, path: '/top-job-posters' },
                    { label: 'Top Refer', icon: <HiChartBar className="text-lg" />, path: '/top-refer' },
                    { label: 'Top Users', icon: <HiChartBar className="text-lg" />, path: '/top-users' },
                  ].map((item, i) => (
                    <li key={i}><Link
                      to={item.path}
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors group"
                    >
                      <div className="w-6 flex justify-center text-base-content group-hover:text-primary">{item.icon}</div>
                      <span className="text-sm font-semibold text-base-content/80 group-hover:text-base-content">{item.label}</span>
                    </Link></li>
                  ))}

                  <li><Link
                    to="/wallet"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors group"
                  >
                    <div className="w-6 flex justify-center text-base-content group-hover:text-primary"><FaWallet className="text-base" /></div>
                    <span className="text-sm font-semibold text-base-content/80 group-hover:text-base-content">Wallet</span>
                  </Link></li>

                  <li><a
                    href="https://t.me/clickjob"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors group"
                  >
                    <div className="w-6 flex justify-center text-base-content group-hover:text-primary"><FaUsers className="text-lg" /></div>
                    <span className="text-sm font-semibold text-base-content/80 group-hover:text-base-content">Join Telegram</span>
                  </a></li>

                  <li><Link
                    to="/live-support"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors group"
                  >
                    <div className="w-6 flex justify-center text-base-content group-hover:text-primary"><FaLifeRing className="text-lg" /></div>
                    <span className="text-sm font-semibold text-base-content/80 group-hover:text-base-content">Live Support</span>
                  </Link></li>

                  <div className="border-t border-base-300 my-1 mx-4"></div>

                  <li><button
                    onClick={() => {
                      toggleTheme();
                      setIsProfileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors group w-full text-left"
                  >
                    <div className="w-6 flex justify-center text-base-content group-hover:text-primary">
                      {theme === 'light' ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
                    </div>
                    <span className="text-sm font-semibold text-base-content/80 group-hover:text-base-content">
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </button></li>

                  <li><button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-error/5 transition-colors group text-left"
                  >
                    <div className="w-6 flex justify-center text-error"><FaRunning className="text-lg" /></div>
                    <span className="text-sm font-semibold text-error/80 group-hover:text-error">Logout</span>
                  </button></li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

