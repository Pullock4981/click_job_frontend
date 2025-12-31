import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    FaSearch, FaStar, FaPlusCircle, FaBriefcase, FaTasks,
    FaBell, FaWallet, FaShareAlt, FaHistory, FaAd,
    FaTicketAlt, FaGamepad, FaUserShield
} from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import Logo from '../common/Logo';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const { user } = useAuth();

    const menuItems = [
        { icon: <FaSearch />, label: 'Find Jobs', path: '/dashboard' },
        ...(user?.role === 'admin' ? [{ icon: <FaUserShield className="text-secondary" />, label: 'Admin Panel', path: '/admin' }] : []),
        { icon: <FaStar className="text-orange-500" />, label: 'Premium', path: '/premium' },
        { icon: <FaPlusCircle />, label: 'Post New Job', path: '/post-job' },
        { icon: <FaTasks />, label: 'My Work', path: '/my-work', hasSubmenu: true },
        { icon: <FaBriefcase />, label: 'My Jobs', path: '/my-jobs' },
        { icon: <FaBell />, label: 'Notifications', path: '/notifications' },
        { icon: <FaWallet />, label: 'Deposit', path: '/deposit' },
        { icon: <FaShareAlt />, label: 'Share & Earn', path: '/share' },
        { icon: <FaHistory />, label: 'Transactions History', path: '/transactions', hasSubmenu: true },
        { icon: <FaAd />, label: 'Advertisement', path: '/ads', hasSubmenu: true },
        { icon: <FaTicketAlt />, label: 'Ticket', path: '/support' },
        { icon: <FaGamepad />, label: 'Play & Earn', path: '/play' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <aside className={`fixed top-0 left-0 h-full bg-base-100 border-r border-base-content/5 z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-64'}`}>
                {/* Sidebar Header */}
                <div className="h-16 flex items-center px-6 border-b border-base-content/5 gap-3">
                    <Logo className="scale-90" />
                    <button onClick={toggleSidebar} className="lg:hidden ml-auto">
                        <HiMenuAlt2 className="text-2xl" />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="py-4 overflow-y-auto h-[calc(100vh-64px)] custom-scrollbar">
                    <ul className="menu menu-md w-full px-2 gap-1">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all ${location.pathname === item.path
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'text-base-content/70 hover:bg-base-200 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white'
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="flex-1 text-sm">{item.label}</span>
                                    {item.hasSubmenu && (
                                        <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
