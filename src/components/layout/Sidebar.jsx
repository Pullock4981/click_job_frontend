import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    FaSearch, FaStar, FaPlusCircle, FaBriefcase, FaTasks,
    FaBell, FaWallet, FaShareAlt, FaHistory, FaAd,
    FaTicketAlt, FaGamepad, FaUserShield, FaChevronDown, FaChevronRight
} from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import Logo from '../common/Logo';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const { user } = useAuth();
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (label) => {
        setOpenMenus(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    const menuItems = [
        { icon: <FaSearch />, label: 'Find Jobs', path: '/dashboard' },
        ...(user?.role === 'admin' ? [{ icon: <FaUserShield className="text-secondary" />, label: 'Admin Panel', path: '/admin' }] : []),
        { icon: <FaStar className="text-[#FF6B6B]" />, label: 'Premium', path: '/premium', isPremium: true },
        { icon: <FaPlusCircle />, label: 'Post New Job', path: '/post-job' },
        {
            icon: <FaTasks />,
            label: 'My Work',
            path: '/my-work',
            hasSubmenu: true,
            subItems: [
                { label: 'My Task', path: '/my-work/tasks' },
                { label: 'Accepted Task', path: '/my-work/accepted' }
            ]
        },
        { icon: <FaBriefcase />, label: 'My Jobs', path: '/my-jobs' },
        { icon: <FaBell />, label: 'Notifications', path: '/notifications' },
        { icon: <FaWallet />, label: 'Deposit', path: '/deposit' },
        { icon: <FaShareAlt />, label: 'Share & Earn', path: '/share' },
        {
            icon: <FaHistory />,
            label: 'Transactions History',
            path: '/transactions',
            hasSubmenu: true,
            subItems: [
                { label: 'Withdraw', path: '/transactions/withdraw' },
                { label: 'Deposit', path: '/transactions/deposit' }
            ]
        },
        {
            icon: <FaAd />,
            label: 'Advertisement',
            path: '/ads',
            hasSubmenu: true,
            subItems: [
                { label: 'Add New Ads', path: '/ads/new' },
                { label: 'History', path: '/ads/history' }
            ]
        },
        { icon: <FaTicketAlt />, label: 'Ticket', path: '/support' },
        { icon: <FaGamepad />, label: 'Play & Earn', path: '/play' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <aside className={`fixed top-0 left-0 h-full bg-[#F4F6F8] dark:bg-base-100 border-r border-base-content/5 z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-64'}`}>
                {/* Sidebar Header */}
                <div className="h-16 flex items-center px-6 border-b border-base-content/5 gap-3 bg-white dark:bg-base-100">
                    <Logo className="scale-90" />
                    <button onClick={toggleSidebar} className="lg:hidden ml-auto">
                        <HiMenuAlt2 className="text-2xl" />
                    </button>
                    <button className="hidden lg:block ml-auto">
                        <HiMenuAlt2 className="text-2xl opacity-70" />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="py-4 overflow-y-auto h-[calc(100vh-64px)] custom-scrollbar">
                    <ul className="menu menu-md w-full p-0 gap-0">
                        {menuItems.map((item, index) => {
                            const hasActiveSub = item.subItems?.some(sub => isActive(sub.path));
                            const isMenuOpen = openMenus[item.label] || hasActiveSub;

                            const itemClasses = `flex items-center gap-4 px-6 py-3.5 w-full font-medium transition-all rounded-none justify-start border-none outline-none ${isActive(item.path) || hasActiveSub
                                ? 'bg-primary text-white shadow-md'

                                : item.isPremium
                                    ? 'text-[#FF6B6B] hover:bg-gray-200/50'
                                    : 'text-[#4b5563] dark:text-base-content/70 hover:bg-gray-200/50'
                                }`;

                            return (
                                <li key={index} className="block w-full">
                                    {item.hasSubmenu ? (
                                        <div className="flex flex-col p-0 w-full block">
                                            <button
                                                onClick={() => toggleMenu(item.label)}
                                                className={itemClasses}
                                            >
                                                <span className="w-6 flex justify-center text-lg opacity-80 shrink-0">{item.icon}</span>
                                                <span className="text-sm text-left">{item.label}</span>
                                                <span className="ml-auto pointer-events-none">
                                                    {isMenuOpen ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                                                </span>
                                            </button>

                                            {isMenuOpen && (
                                                <ul className="bg-transparent px-0 py-0.5 space-y-0.5 w-full block">
                                                    {item.subItems.map((sub, sIdx) => (
                                                        <li key={sIdx} className="block w-full">
                                                            <Link
                                                                to={sub.path}
                                                                className={`flex items-center pl-16 py-2.5 text-xs font-medium transition-all rounded-none w-full block ${isActive(sub.path)
                                                                    ? 'text-primary font-bold bg-blue-50/50 dark:bg-blue-900/10'
                                                                    : 'text-[#6b7280] dark:text-base-content/50 hover:bg-gray-200/30'
                                                                    }`}
                                                            >
                                                                {sub.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className={itemClasses}
                                        >
                                            <span className="w-6 flex justify-center text-lg opacity-80 shrink-0">{item.icon}</span>
                                            <span className="text-sm text-left">{item.label}</span>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
