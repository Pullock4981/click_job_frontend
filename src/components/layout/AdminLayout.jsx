import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    FaUsers, FaUserShield, FaBullhorn, FaCogs, FaTools,
    FaAd, FaTicketAlt, FaGem, FaBriefcase, FaWallet, FaMoneyBillWave,
    FaShareAlt, FaChartLine, FaChevronDown, FaChevronRight, FaSignOutAlt, FaHome,
    FaTachometerAlt, FaUser, FaBuilding, FaLayerGroup, FaImage, FaDollarSign, FaList, FaArrowRight, FaWrench, FaCog,
    FaUserCog
} from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import Logo from '../common/Logo';

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    // Default closed on mobile, open on desktop
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
    const [openMenus, setOpenMenus] = useState({});
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const toggleMenu = (label) => {
        setOpenMenus(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    // Responsive sidebar handling
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close dropdown and mobile sidebar on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
            if (window.innerWidth <= 1024 && sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.menu-toggle-btn')) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const adminMenuItems = [
        { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/admin' },
        {
            icon: <FaUsers />, label: 'User Manage', hasSubmenu: true,
            subItems: [
                { label: 'User', path: '/admin/users', icon: <FaUser /> },
                { label: 'Duplicate User', path: '/admin/users/duplicate', icon: <FaUser /> },
                { label: 'Verified User', path: '/admin/users/verified', icon: <FaUser /> },
                { label: 'Unverified User', path: '/admin/users/unverified', icon: <FaUser /> },
                { label: 'Document Verify Request', path: '/admin/users/verify-requests', icon: <FaUser /> }
            ]
        },
        { icon: <FaUserShield />, label: 'Admin Account Manage', path: '/admin/accounts' },
        {
            icon: <FaBuilding />, label: 'Company & Notice Board', hasSubmenu: true,
            subItems: [
                { label: 'About Us', path: '/admin/about' },
                { label: 'Header & Notice Info', path: '/admin/notice-info' },
                { label: 'Counter Info', path: '/admin/counter-info' },
                { label: 'Contact Information', path: '/admin/contact-info' },
                { label: 'Contact Message', path: '/admin/contact-messages' },
                { label: 'Google Ads', path: '/admin/google-ads' },
                { label: 'Policy', path: '/admin/policy' }
            ]
        },
        { icon: <FaLayerGroup />, label: 'Service', path: '/admin/services' },
        {
            icon: <FaImage />, label: 'Advertisement Manage', hasSubmenu: true,
            subItems: [
                { label: 'Ads Rate', path: '/admin/ads/rate' },
                { label: 'Ads List', path: '/admin/ads/list' },
                { label: 'Click Earn Ads', path: '/admin/ads/click-earn' }
            ]
        },
        {
            icon: <FaDollarSign />, label: 'Lottery Manage', hasSubmenu: true,
            subItems: [
                { label: 'Lottery List', path: '/admin/lottery/list' }
            ]
        },
        {
            icon: <FaDollarSign />, label: 'Premium Package', hasSubmenu: true,
            subItems: [
                { label: 'Package List', path: '/admin/package/list' },
                { label: 'Premium User', path: '/admin/premium-users' }
            ]
        },
        {
            icon: <FaList />, label: 'Job Manage', hasSubmenu: true,
            subItems: [
                { label: 'Approval Job List', path: '/admin/jobs/approval' },
                { label: 'Delete Rquest Jobs', path: '/admin/jobs/delete-requests' },
                { label: 'Job Work List', path: '/admin/jobs/work-list' }
            ]
        },
        {
            icon: <FaDollarSign />, label: 'Deposit Manage', hasSubmenu: true,
            subItems: [
                { label: 'Deposit Account', path: '/admin/deposit/accounts' },
                { label: 'Deposit List', path: '/admin/deposit/list' }
            ]
        },
        {
            icon: <FaDollarSign />, label: 'Withdraw Manage', hasSubmenu: true,
            subItems: [
                { label: 'Withdraw Method', path: '/admin/withdraw/methods' },
                { label: 'Withdraw List', path: '/admin/withdraw/list' }
            ]
        },
        {
            icon: <FaDollarSign />, label: 'SMM Manage', hasSubmenu: true,
            subItems: [
                { label: 'Category', path: '/admin/smm/category' },
                { label: 'Service', path: '/admin/smm/service' },
                { label: 'SMM Request', path: '/admin/smm/requests' }
            ]
        },
        {
            icon: <FaChartLine />, label: 'Top User & Headline', hasSubmenu: true,
            specialStyle: 'bg-[#D1F2EB] text-[#117A65]',
            subItems: [
                { label: 'Main Headline', path: '/admin/headline/main' },
                { label: 'Task Prove Headline', path: '/admin/headline/task-prove' },
                { label: 'Applied Task Headline', path: '/admin/headline/applied-task' },
                { label: 'Top Worker', path: '/admin/top/workers' },
                { label: 'Top Job Poster', path: '/admin/top/posters' },
                { label: 'Boost Service', path: '/admin/boost-service' },
                { label: 'Top Deposit User', path: '/admin/top/depositors' },
                { label: 'Top Best User', path: '/admin/top/best' },
                { label: 'Top Referral User', path: '/admin/top/referrals' }
            ]
        },
        {
            icon: <FaWrench />, label: 'System Setting', hasSubmenu: true,
            subItems: [
                { label: 'Referred Distibution', path: '/admin/setting/referral' },
                { label: 'Job Category', path: '/admin/setting/job-category' },
                { label: 'Job Sub Category', path: '/admin/setting/job-sub-category' },
                { label: 'Country', path: '/admin/setting/country' },
                { label: 'Location Zone', path: '/admin/setting/location-zone' },
                { label: 'Default Setup', path: '/admin/setting/default' },
                { label: 'Spin Setting', path: '/admin/setting/spin' },
                { label: 'User Message', path: '/admin/setting/messages' },
                { label: 'Custom Script', path: '/admin/setting/scripts' }
            ]
        },
        { icon: <FaCog />, label: 'Setting', path: '/admin/settings' }
    ];

    const isActive = (path) => location.pathname === path;

    // Auto-expand menu based on active route
    useEffect(() => {
        const matchingMenu = adminMenuItems.find(item =>
            item.hasSubmenu && item.subItems.some(sub => location.pathname === sub.path)
        );

        if (matchingMenu) {
            setOpenMenus(prev => ({
                ...prev,
                [matchingMenu.label]: true
            }));
        }
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-[#F4F6F9] flex">
            {/* Sidebar with Overlay for Mobile */}
            <div
                ref={sidebarRef}
                className={`fixed lg:static top-0 left-0 z-50 bg-[#363B41] text-[#AAB2BD] transition-all duration-300 flex-shrink-0 ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'} min-h-screen overflow-y-auto overflow-x-hidden custom-scrollbar border-r border-black/20 shadow-2xl lg:shadow-none`}
            >
                <div className="h-16 flex items-center px-6 gap-3 bg-[#1a1f23] border-b border-black/20 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-[#5BADE3] flex items-center justify-center text-white font-black text-xl">
                        CJ
                    </div>
                    {isSidebarOpen && <span className="font-bold text-white tracking-widest text-lg">CLICK JOB</span>}
                </div>

                <div className="py-2">
                    <ul className="space-y-0.5">
                        {adminMenuItems.map((item, idx) => {
                            const isMenuOpen = openMenus[item.label];

                            return (
                                <li key={idx} className="px-2">
                                    {item.hasSubmenu ? (
                                        <div className="mb-0.5">
                                            <button
                                                onClick={() => isSidebarOpen && toggleMenu(item.label)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold transition-all rounded-md ${item.specialStyle && !isMenuOpen ? item.specialStyle : isMenuOpen ? 'bg-[#434A54] text-white shadow-sm' : 'hover:bg-black/10 hover:text-white'}`}
                                            >
                                                <span className="text-base opacity-90">{item.icon}</span>
                                                {isSidebarOpen && (
                                                    <>
                                                        <span className="flex-1 text-left">{item.label}</span>
                                                        {isMenuOpen ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                                                    </>
                                                )}
                                            </button>
                                            {isSidebarOpen && isMenuOpen && item.subItems && (
                                                <ul className="bg-[#2C3136] mt-1 rounded-md overflow-hidden">
                                                    {item.subItems.map((sub, sIdx) => (
                                                        <li key={sIdx}>
                                                            <Link
                                                                to={sub.path}
                                                                onClick={() => window.innerWidth <= 1024 && setIsSidebarOpen(false)}
                                                                className={`flex items-center gap-3 px-8 py-2.5 text-[12px] font-bold transition-all hover:text-white ${isActive(sub.path) ? 'text-white bg-[#5BADE3]' : 'text-gray-400 hover:bg-black/10'}`}
                                                            >
                                                                <span className="text-[10px] opacity-60">{sub.icon || <FaArrowRight />}</span>
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
                                            onClick={() => window.innerWidth <= 1024 && setIsSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold transition-all rounded-md ${isActive(item.path) ? 'bg-[#5BADE3] text-white shadow-md' : 'hover:bg-black/10 hover:text-white'}`}
                                        >
                                            <span className="text-base opacity-90">{item.icon}</span>
                                            {isSidebarOpen && <span>{item.label}</span>}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                {/* Navbar */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-6 border-b border-gray-100 sticky top-0 z-40 shrink-0">
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="menu-toggle-btn text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all"
                        >
                            <HiMenuAlt2 size={24} />
                        </button>
                        <nav className="hidden xs:flex items-center gap-2 text-sm text-gray-400 font-bold uppercase tracking-wider">
                            <span className="hidden sm:inline"><Link to="/dashboard" className="hover:text-[#5BADE3] flex items-center gap-1"><FaHome /> Home</Link></span>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                        {/* User Section */}
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        >
                            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-[#5daae3] p-0.5 overflow-hidden flex-shrink-0">
                                <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                                    <FaUser className="text-[#bdc3c7]" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end leading-none">
                                <span className="text-[14px] md:text-[17px] font-bold text-[#34495e] truncate max-w-[80px] md:max-w-none">{user?.name || 'Admin'}</span>
                                <span className="hidden md:inline text-[12px] text-[#bdc3c7] font-black uppercase tracking-[0.1em] mt-1">Admin Control</span>
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        {isUserDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-md shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="py-1 divide-y divide-gray-50">
                                    <Link to="/admin/profile" className="flex items-center gap-3 px-6 py-4 text-[15px] text-[#34495e] hover:bg-gray-50 transition-colors font-medium">
                                        <FaUser className="text-[#34495e] text-lg" />
                                        Profile
                                    </Link>
                                    <Link to="/admin/settings" className="flex items-center gap-3 px-6 py-4 text-[15px] text-[#34495e] hover:bg-gray-50 transition-colors font-medium">
                                        <FaUserCog className="text-[#34495e] text-xl" />
                                        Settings
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-6 py-4 text-[15px] text-[#34495e] hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        <FaSignOutAlt className="text-[#34495e] text-lg font-black" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {children}
                </main>
            </div>

            {/* Backdrop for Mobile Sidebar */}
            {window.innerWidth <= 1024 && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;
