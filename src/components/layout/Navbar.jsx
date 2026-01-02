import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import ThemeToggle from '../common/ThemeToggle.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { FaUser, FaWallet, FaUsers, FaLifeRing, FaMoon, FaSun, FaRunning } from 'react-icons/fa';
import { HiChartBar } from 'react-icons/hi';
import Logo from '../common/Logo.jsx';

const Navbar = ({ toggleSidebar }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className={`navbar ${isAuthenticated ? 'bg-primary dark:bg-base-100 h-16 px-4 md:px-6' : 'bg-base-100 h-20 px-4'} shadow-xl sticky top-0 z-50 transition-all duration-300 border-b border-white/10 dark:border-white/5`}>
      {!isAuthenticated ? (
        <div className="container mx-auto flex items-center h-full">
          <div className="navbar-start">
            <Logo />
          </div>

          <div className="navbar-center hidden lg:flex flex-1 justify-center gap-10">
            <Link to="/" className="font-bold text-base-content hover:text-primary transition-all duration-300 whitespace-nowrap">Home</Link>
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
          <div className="flex-1 flex items-center justify-end gap-1.5 xs:gap-3 sm:gap-4 md:gap-6 text-white min-w-0">
            {/* Earning Balance Pilled */}
            <div className="flex items-center gap-1 bg-white/5 dark:bg-white/10 backdrop-blur-md px-1.5 xs:px-2 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 transition-all hover:bg-white/20 flex-shrink-0">
              <span className="hidden min-[500px]:inline text-[8px] md:text-[10px] text-white/50 font-black uppercase tracking-widest">Earning</span>
              <span className="text-[10px] sm:text-xs md:text-sm font-black text-white">$0.200</span>
            </div>

            {/* Deposit Balance Pilled */}
            <div className="flex items-center gap-1 bg-[#2ECC71] dark:bg-[#27AE60] px-1.5 xs:px-2 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg transition-all hover:scale-105 border border-white/10 flex-shrink-0">
              <span className="hidden min-[500px]:inline text-[8px] md:text-[10px] text-white/90 font-black uppercase tracking-widest">Deposit</span>
              <span className="text-[10px] sm:text-xs md:text-sm font-black text-white">$0.021</span>
            </div>

            {/* Notification & ID */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
              <ThemeToggle />
              <div className="relative cursor-pointer p-1 xs:p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-all">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span className="absolute top-0.5 right-0.5 xs:top-1 xs:right-1 bg-red-500 text-[6px] xs:text-[7px] md:text-[8px] text-white w-2.5 h-2.5 xs:w-3 xs:h-3 md:w-3.5 md:h-3.5 rounded-full flex items-center justify-center border border-primary font-black animate-pulse">1</span>
              </div>
            </div>

            {/* Share Badge */}
            <div className="hidden xl:flex items-center bg-blue-600/80 px-3 py-1.5 rounded-md gap-1.5 border border-white/20">
              <span className="text-[11px] font-bold text-white whitespace-nowrap">Share 62K</span>
            </div>

            {/* User Profile */}
            <div className={`dropdown dropdown-end ml-1 ${isProfileMenuOpen ? 'dropdown-open' : ''}`}>
              <div
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full border-2 border-white ring-2 ring-blue-400 overflow-hidden bg-blue-100 flex items-center justify-center">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shohag" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="text-sm font-bold text-white tracking-wide">{user?.name || 'Shohag Hosen'}</div>
                </div>
              </div>

              <ul className="dropdown-content mt-4 z-[50] p-0 shadow-2xl bg-base-100 rounded-xl w-64 overflow-hidden border border-base-300 animate-in fade-in slide-in-from-top-2">
                {/* Header */}
                <li className="px-5 py-4 bg-base-200/50 border-b border-base-300">
                  <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest leading-none">Hello, {user?.name?.split(' ')[0] || 'Shohag'} {user?.name?.split(' ')[1] || 'Hosen'}</span>
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
                      onClick={() => setIsProfileMenuOpen(false)}
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
                    to="/support"
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
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors group text-left"
                  >
                    <div className="w-6 flex justify-center text-base-content group-hover:text-primary">
                      {theme === 'light' ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
                    </div>
                    <span className="text-sm font-semibold text-base-content/80 group-hover:text-base-content">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
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

