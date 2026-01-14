import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import {
    FaUser, FaEnvelope, FaWallet, FaShieldAlt, FaCamera,
    FaHistory, FaChartPie, FaCheckCircle, FaTimesCircle,
    FaClock, FaCoins, FaBriefcase, FaUserCheck, FaMapMarkerAlt,
    FaSignOutAlt, FaCog, FaSpinner, FaGlobe, FaArrowLeft, FaTrash
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [isManaging, setIsManaging] = useState(false);

    // Form states for Management
    const [accountData, setAccountData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        age: user?.age || '',
        country: user?.country || 'Bangladesh'
    });
    const [aboutMe, setAboutMe] = useState(user?.bio || '');
    const [securityCode, setSecurityCode] = useState('');
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users/dashboard');
            if (response.success) {
                setDashboardData(response.data);
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            toast.error(err.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put('/users/profile', {
                name: accountData.name,
                age: accountData.age,
                country: accountData.country,
                bio: aboutMe
            });
            if (res.success) {
                updateUser(res.data.user);
                toast.success('Information updated successfully!');
            }
        } catch (err) {
            toast.error(err.message || 'Update failed');
        }
    };

    const handleSaveSecurityCode = async () => {
        if (!securityCode) return toast.error('Please enter a code');
        try {
            const res = await api.put('/users/profile', { securityCode });
            if (res.success) {
                toast.success('Security code saved!');
                setSecurityCode('');
            }
        } catch (err) {
            toast.error(err.message || 'Failed to save code');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        try {
            const res = await api.put('/users/change-password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            if (res.success) {
                toast.success('Password changed successfully!');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (err) {
            toast.error(err.message || 'Password change failed');
        }
    };

    const handleImageSelect = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                toast.loading('Uploading image...', { id: 'upload' });
                const res = await api.upload('/upload/single', file);
                if (res.success) {
                    // Update profile with new image URL
                    const updateRes = await api.put('/users/profile', { profilePicture: res.data.url });
                    if (updateRes.success) {
                        updateUser(updateRes.data.user);
                        toast.success('Profile picture updated!', { id: 'upload' });
                    }
                }
            } catch (err) {
                toast.error(err.message || 'Upload failed', { id: 'upload' });
            }
        };
        input.click();
    };

    if (loading) {
        return (
            <Layout showFooter={true}>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <FaSpinner className="animate-spin text-4xl text-primary" />
                        <p className="text-sm font-bold opacity-50 uppercase tracking-widest">Loading Dashboard...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    const {
        totalWorking = { taskAttend: 0, satisfied: 0, notSatisfied: 0, pending: 0, paymentReceived: 0, lastTask: null },
        totalJob = { validJobsPosted: 0, totalDeposit: 0, paid: 0, jobOver: 0 },
        charts = { workingStatus: { satisfied: 0, unsatisfied: 0, pending: 0 }, jobStatus: { satisfied: 0, notSatisfied: 0, notRated: 0 }, jobSatisfactionPercentage: 0 },
        accountHealth = { percentage: 100, activeWarnings: 0 },
        loginHistory = { currentIP: 'Unknown', history: [] }
    } = dashboardData || {};

    const workingStats = [
        { label: 'Task Attend', value: totalWorking.taskAttend, color: 'text-primary' },
        { label: 'Satisfied', subLabel: 'Approved in task', value: totalWorking.satisfied, color: 'text-green-500' },
        { label: 'Not Satisfied', subLabel: 'Rejected in task prove', value: totalWorking.notSatisfied, color: 'text-red-500' },
        { label: 'Pending', subLabel: 'In review for rating', value: totalWorking.pending, color: 'text-blue-400' },
        { label: 'Payment Received', value: `$${totalWorking.paymentReceived?.toFixed(2) || '0.00'}`, color: 'text-base-content/80' },
        { label: 'Last Task', value: totalWorking.lastTask ? new Date(totalWorking.lastTask).toLocaleDateString() : '-', color: 'text-base-content/40' },
    ];

    const jobStats = [
        { label: 'Valid Jobs Posted', value: totalJob.validJobsPosted, color: 'text-green-500' },
        { label: 'Total Deposit', value: `$${totalJob.totalDeposit?.toFixed(2) || '0.00'}`, color: 'text-base-content/80' },
        { label: 'Paid', value: `$${totalJob.paid?.toFixed(2) || '0.00'}`, color: 'text-base-content/80' },
        { label: 'Job Over', value: totalJob.jobOver, color: 'text-red-500' },
    ];

    const getInitials = (name) => {
        if (!name) return 'UN';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Dashboard View
    if (!isManaging) {
        return (
            <Layout showFooter={true}>
                <div className="min-h-screen bg-base-100 dark:bg-base-900 pb-12 transition-all duration-300">
                    <div className="bg-[#5BADE3] h-48 md:h-56 w-full relative"></div>
                    <div className="max-w-7xl mx-auto px-2 xs:px-4 md:px-8 -mt-32 md:-mt-40 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-7 space-y-6">
                                <div className="bg-base-200 dark:bg-base-200/50 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-base-content/5">
                                    <div className="p-5 border-b border-base-content/5 bg-base-300/30">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">Overview</p>
                                        <h3 className="text-base-content font-black text-xl tracking-tight mt-1">Total Working</h3>
                                    </div>
                                    <div className="divide-y divide-base-content/5">
                                        {workingStats.map((stat, i) => (
                                            <div key={i} className="flex justify-between items-center p-5 hover:bg-base-300/20 transition-all group">
                                                <div className="transform group-hover:translate-x-1 transition-transform">
                                                    <p className="text-sm font-bold text-base-content/70">{stat.label}</p>
                                                    {stat.subLabel && <p className="text-[10px] text-base-content/30 font-black uppercase tracking-wider mt-0.5">{stat.subLabel}</p>}
                                                </div>
                                                <p className={`text-sm font-black transition-colors ${stat.color}`}>{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-base-200 dark:bg-base-200/50 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-base-content/5">
                                    <div className="p-5 border-b border-base-content/5 bg-base-300/30">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">Overview</p>
                                        <h3 className="text-base-content font-black text-xl tracking-tight mt-1">Total Job</h3>
                                    </div>
                                    <div className="divide-y divide-base-content/5">
                                        {jobStats.map((stat, i) => (
                                            <div key={i} className="flex justify-between items-center p-5 hover:bg-base-300/20 transition-all group">
                                                <p className="text-sm font-bold text-base-content/70 transform group-hover:translate-x-1 transition-transform">{stat.label}</p>
                                                <p className={`text-sm font-black transition-colors ${stat.color}`}>{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-base-200 dark:bg-base-200/50 rounded-xl shadow-lg border border-base-content/5 p-8 text-center transition-colors">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 mb-8">Working Status</h4>
                                        <div className="w-40 h-40 mx-auto relative flex items-center justify-center">
                                            <div className="w-full h-full rounded-full border-[18px] border-base-300/50"></div>
                                            <div className="absolute inset-0 rounded-full border-[18px] border-primary border-t-transparent border-r-transparent animate-pulse opacity-10"></div>
                                            <div className="absolute flex flex-col items-center">
                                                <FaChartPie className="text-primary/20 text-3xl mb-1" />
                                                <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mt-1">Pending</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 mt-8 text-[9px] font-black uppercase tracking-tighter opacity-40">
                                            <div className="flex flex-col items-center gap-1">Satisfied</div>
                                            <div className="flex flex-col items-center gap-1">Unstatisfied</div>
                                            <div className="flex flex-col items-center gap-1">Pending</div>
                                        </div>
                                    </div>
                                    <div className="bg-base-200 dark:bg-base-200/50 rounded-xl shadow-lg border border-base-content/5 p-8 text-center transition-colors">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 mb-8">Job Status</h4>
                                        <div className="w-40 h-40 mx-auto relative flex items-center justify-center">
                                            <div className="w-full h-full rounded-full border-[18px] border-base-300"></div>
                                            <div className="absolute inset-0 rounded-full border-[18px] border-green-500 border-b-transparent border-l-transparent transform rotate-45"></div>
                                            <p className="absolute text-5xl font-black text-green-500/80 drop-shadow-sm">{totalJob.validJobsPosted}</p>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 mt-8 text-[9px] font-black uppercase tracking-tighter opacity-40">
                                            <div className="flex flex-col items-center gap-1">Satisfied</div>
                                            <div className="flex flex-col items-center gap-1">Rejected</div>
                                            <div className="flex flex-col items-center gap-1">Not Rated</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-5 space-y-6">
                                <div className="bg-base-200 dark:bg-base-100 rounded-3xl shadow-2xl border border-base-content/5 overflow-hidden text-center p-10 relative group transition-all hover:translate-y-[-4px]">
                                    <div className="relative inline-block mb-8">
                                        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[6px] border-base-300 shadow-2xl overflow-hidden bg-[#5BADE3] flex items-center justify-center mx-auto transition-transform group-hover:scale-105">
                                            {user?.profilePicture ? (
                                                <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-4xl font-black text-white">{getInitials(user?.name)}</span>
                                            )}
                                        </div>
                                        <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-[4px] border-base-200 rounded-full animate-pulse shadow-lg"></div>
                                    </div>
                                    <h2 className="text-3xl font-black text-base-content mb-1 tracking-tight">{user?.name || 'User Name'}</h2>
                                    <div className="bg-base-300/50 dark:bg-base-300 rounded-full px-5 py-1.5 inline-block mb-8">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">0 Reviews (0)</p>
                                    </div>
                                    <div className="space-y-3 mb-10 text-base-content/40 dark:text-base-content/30">
                                        <p className="text-xs font-black uppercase tracking-wider">Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '12/31/2025'}</p>
                                        <p className="text-[11px] font-black text-green-500 uppercase tracking-widest mt-2 animate-bounce">I'm online</p>
                                        <p className="text-sm font-black text-base-content mt-2 transition-colors">User ID: <span className="text-primary">{user?.numericId || '-----'}</span></p>
                                        <div className="flex items-center justify-center gap-2 text-xs font-bold mt-4">
                                            <FaMapMarkerAlt className="text-[#5BADE3]" />
                                            <span className="uppercase tracking-widest">{user?.country || 'Global'} - {user?.role || 'admin'}</span>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest mt-1">Default Account</p>
                                    </div>
                                    <button
                                        onClick={() => setIsManaging(true)}
                                        className="btn w-full bg-[#5BADE3] hover:bg-[#4A9CD2] border-none text-white font-black uppercase tracking-widest text-xs h-14 rounded-2xl shadow-xl shadow-[#5BADE3]/20 transition-all hover:scale-[1.02]"
                                    >
                                        Manage Profile
                                    </button>
                                </div>
                                <div className="bg-[#5BADE3] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group transition-all hover:translate-y-[-4px]">
                                    <div className="absolute -right-8 -bottom-8 text-white/10 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                                        <FaBriefcase size={160} />
                                    </div>
                                    <div className="relative flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60">Job Satisfaction</p>
                                            <p className="text-6xl font-black mt-1">{charts.jobSatisfactionPercentage || 0}%</p>
                                            <div className="flex items-center gap-2 mt-6 text-xs font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full w-fit">
                                                <FaClock className="text-[10px]" /> {totalJob.validJobsPosted || 0} Jobs Posted
                                            </div>
                                        </div>
                                        <div className="bg-white/20 p-5 rounded-[2rem] backdrop-blur-xl border border-white/20 shadow-inner group-hover:rotate-12 transition-transform">
                                            <FaBriefcase className="text-3xl" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-base-200 dark:bg-base-200/50 backdrop-blur-md rounded-3xl shadow-xl border border-base-content/5 p-10">
                                    <div className="flex justify-between items-end mb-6">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30">Account Health</p>
                                            <h4 className="text-4xl font-black text-base-content mt-2">{accountHealth.percentage || 100}%</h4>
                                        </div>
                                    </div>
                                    <div className="h-2.5 w-full bg-base-300 dark:bg-base-300/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${accountHealth.percentage || 100}%` }}></div>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-base-content/5 text-center">
                                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5BADE3]">You have no warnings :)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 bg-base-200 dark:bg-base-200/50 backdrop-blur-md rounded-2xl shadow-xl border border-base-content/5 overflow-hidden transition-colors">
                            <div className="p-5 bg-base-300/30 border-b border-base-content/5 font-black text-[10px] uppercase tracking-[0.3em] text-base-content/30">Login History</div>
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <FaGlobe className="text-[#5BADE3]" />
                                    <p className="text-xs font-black text-base-content tracking-widest uppercase">Current IP: <span className="text-primary">{loginHistory.currentIP}</span></p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12">
                                    {loginHistory.history?.map((log, i) => (
                                        <div key={i} className="flex items-center gap-4 text-[11px] font-bold text-base-content/50 group transition-all">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#5BADE3]/40 group-hover:bg-[#5BADE3] group-hover:scale-125 transition-all"></div>
                                            <span className="font-black text-base-content/80 min-w-[100px]">IP: {log.ip}</span>
                                            <span className="opacity-60">at {new Date(log.loginAt || log.createdAt).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Manage Profile View
    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-base-100 dark:bg-base-900 pb-12 transition-all duration-300">
                {/* Header Blue Background */}
                <div className="bg-[#5BADE3] h-48 md:h-56 w-full relative flex items-center justify-start px-4 md:px-12">
                    <button
                        onClick={() => setIsManaging(false)}
                        className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-md"
                    >
                        <FaArrowLeft /> Back to Dashboard
                    </button>
                </div>

                <div className="max-w-6xl mx-auto px-2 xs:px-4 md:px-8 -mt-24 md:-mt-32 relative z-10 space-y-6">

                    {/* Top Avatar Card */}
                    <div className="bg-base-100 dark:bg-base-800 rounded-xl shadow-xl border border-base-content/5 p-10 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full border-[6px] border-base-300 shadow-xl overflow-hidden bg-[#5BADE3] flex items-center justify-center mb-6">
                            {user?.profilePicture ? (
                                <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl font-black text-white">{getInitials(user?.name)}</span>
                            )}
                        </div>
                        <button
                            onClick={handleImageSelect}
                            className="bg-base-200 hover:bg-base-300 text-base-content/60 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all"
                        >
                            <FaCamera /> Select new image
                        </button>
                    </div>

                    <h2 className="text-xl font-black text-base-content px-1 transition-colors">Edit profile</h2>

                    {/* Account Information Card */}
                    <div className="bg-base-100 dark:bg-base-800 rounded-xl shadow-xl border border-base-content/5 overflow-hidden">
                        <div className="p-5 border-b border-base-content/5 bg-base-200/30">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 transition-colors">Account Information</h3>
                        </div>
                        <div className="p-8">
                            <form onSubmit={handleUpdateInfo} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 transition-colors">Full name (ID, Passport or Legal Name)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-[#5BADE3]/20 transition-colors"
                                        value={accountData.name}
                                        onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 transition-colors">Email address</label>
                                    <input
                                        type="email"
                                        readOnly
                                        disabled
                                        className="w-full bg-[#EAEEF3] dark:bg-base-200 opacity-60 border-none rounded-lg p-4 text-sm text-gray-500 font-bold cursor-not-allowed"
                                        value={accountData.email}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 transition-colors">Age</label>
                                    <input
                                        type="number"
                                        className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-[#5BADE3]/20 transition-colors"
                                        value={accountData.age}
                                        onChange={(e) => setAccountData({ ...accountData, age: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 transition-colors">Country</label>
                                    <select
                                        className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-[#5BADE3]/20"
                                        value={accountData.country}
                                        onChange={(e) => setAccountData({ ...accountData, country: e.target.value })}
                                    >
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 transition-colors">About Me</label>
                                    <textarea
                                        rows="4"
                                        className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-[#5BADE3]/20 transition-colors resize-none"
                                        placeholder="Content Creator"
                                        value={aboutMe}
                                        onChange={(e) => setAboutMe(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        className="bg-[#5BADE3] hover:bg-[#4A9CD2] text-white font-black uppercase tracking-widest text-[10px] px-8 py-3 rounded-lg shadow-lg shadow-[#5BADE3]/20 transition-all"
                                    >
                                        Update Information
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Security Code Card */}
                    <div className="bg-base-100 dark:bg-base-800 rounded-xl shadow-xl border border-base-content/5 overflow-hidden">
                        <div className="p-5 border-b border-base-content/5 bg-base-200/30">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 transition-colors">Security Code: For Password Recovery</h3>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 transition-colors">Write your security code</label>
                                <input
                                    type="text"
                                    placeholder="TRX1"
                                    className="max-w-md w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-[#5BADE3]/20 transition-colors"
                                    value={securityCode}
                                    onChange={(e) => setSecurityCode(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleSaveSecurityCode}
                                className="bg-[#5BADE3] hover:bg-[#4A9CD2] text-white font-black uppercase tracking-widest text-[10px] px-8 py-3 rounded-lg shadow-lg shadow-[#5BADE3]/20 transition-all"
                            >
                                Save security Code
                            </button>
                        </div>
                    </div>

                    {/* Account Password Card */}
                    <div className="bg-base-100 dark:bg-base-800 rounded-xl shadow-xl border border-base-content/5 overflow-hidden">
                        <div className="p-5 border-b border-base-content/5 bg-base-200/30 font-black text-[10px] uppercase tracking-[0.2em] text-base-content/40 transition-colors">Account Password</div>
                        <div className="p-8">
                            <form onSubmit={handleChangePassword} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 transition-colors">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="Current Password"
                                        className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-[#5BADE3]/20 transition-colors"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 transition-colors">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-[#5BADE3]/20 transition-colors"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 transition-colors">Confirm New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password Again"
                                            className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-[#5BADE3]/20 transition-colors"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#5BADE3] hover:bg-[#4A9CD2] text-white font-black uppercase tracking-widest text-[10px] px-8 py-3 rounded-lg shadow-lg shadow-[#5BADE3]/20 transition-all"
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Delete Account Button */}
                    <div className="pt-8">
                        <button className="flex items-center gap-2 text-red-500/50 hover:text-red-500 font-black uppercase tracking-widest text-[10px] border border-red-500/10 hover:border-red-500/50 px-6 py-2 rounded-lg transition-all">
                            <FaTrash /> Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
