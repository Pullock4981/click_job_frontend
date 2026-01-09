import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import { API_ENDPOINTS } from '../../config/api';

const ReferralDashboard = () => {
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({ totalReferrals: 0 });
    const [referralLink, setReferralLink] = useState('');

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                // Fetch stats
                const statsRes = await api.get(API_ENDPOINTS.REFERRAL_EARNINGS);
                if (statsRes.success) {
                    setStats(statsRes.data);
                }

                // Fetch referral code/link
                const codeRes = await api.get(API_ENDPOINTS.MY_REFERRAL_CODE);
                if (codeRes.success) {
                    setReferralLink(codeRes.data.referralLink);
                } else {
                    // Fallback link if endpoint fails
                    const referralId = user?.referralCode || user?._id || user?.id || '49097';
                    setReferralLink(`${window.location.origin}/register?ref=${referralId}`);
                }
            } catch (error) {
                console.error('Error fetching referral data:', error);
                // Fallback link on error
                const referralId = user?.referralCode || user?._id || user?.id || '49097';
                setReferralLink(`${window.location.origin}/register?ref=${referralId}`);
            }
        };

        fetchReferralData();
    }, [user]);

    const handleCopy = () => {
        if (!referralLink) return;
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        toast.success('Referral link copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8">


            {/* Header Section matching the site theme */}
            <div className="bg-primary h-48 md:h-56 w-full flex items-center px-4 md:px-8">
                {/* Header space could be used for breadcrumbs but kept clean like the image */}
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 pb-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Card - Affiliate Link Section (Span 7/12) */}
                    <div className="lg:col-span-7 bg-base-200 rounded-lg shadow-sm border border-base-content/5 overflow-hidden flex flex-col">
                        <div className="p-6">
                            <h3 className="text-base-content/80 font-bold text-sm mb-4 uppercase tracking-wide">Your Affiliate Link</h3>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    readOnly
                                    value={referralLink || 'Loading...'}
                                    className="w-full bg-base-100 border-none rounded p-3 pr-12 text-[13px] text-base-content/60 font-medium focus:ring-0"

                                />
                                <button
                                    onClick={handleCopy}
                                    className="absolute right-3 text-gray-400 hover:text-primary transition-colors disabled:opacity-50"
                                    disabled={!referralLink}
                                    title="Copy to clipboard"
                                >
                                    {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                                </button>
                            </div>
                        </div>

                        {/* Info Box matching the site theme */}
                        <div className="px-6 pb-6 mt-auto">
                            <div className="bg-primary/90 rounded-lg p-8 text-white space-y-4 shadow-inner">
                                <div className="text-base font-bold">
                                    {stats.totalReferrals} User joined by your reffer link.
                                </div>
                                <div className="text-[15px] font-bold text-yellow-300">
                                    If you activate the account at your referral then you will get instant 0.10$ bonus in your earning balance.
                                </div>
                                <div className="text-[13px] opacity-90 leading-relaxed font-medium">
                                    Hello sir, you can now earn more by referring your friends. You will Get 1% referral's commission for each DEPOSIT & you will get 1% TASK commission from your referrals each completed task.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Card - Affiliate Program Status (Span 5/12) */}
                    <div className="lg:col-span-5 bg-white dark:bg-base-100 rounded-lg shadow-sm border border-gray-100 dark:border-base-content/5 p-8 self-start">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-gray-700 dark:text-gray-200 font-bold text-base tracking-tight">Affiliate Program</h3>
                            <span className="bg-[#C8FADC] text-[#00A34E] text-[10px] font-black px-2.5 py-1 rounded tracking-wider shadow-sm">
                                ACTIVATED
                            </span>
                        </div>
                        <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                            Post your affiliate link on blogs, websites, forums, social media or write Workupjob review - Refer new members (Freelancers & Business Owner) and earn commission revenue!
                        </p>
                    </div>
                </div>

                {/* Bottom Links/Footer area inside content */}
                <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest gap-4 border-t border-gray-100 dark:border-base-content/5">
                    <p>© 2026 CLICK JOB</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="hover:text-primary transition-colors">About Us</button>
                        <button className="hover:text-primary transition-colors">Privacy Policy</button>
                        <button className="hover:text-primary transition-colors">FAQ</button>
                        <button className="hover:text-primary transition-colors">Terms of Use</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralDashboard;
