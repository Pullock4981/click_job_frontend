import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaMapMarkerAlt, FaSortAmountDown, FaGift, FaTv, FaCheckCircle, FaLaptop } from 'react-icons/fa';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'admin') {
            navigate('/admin');
        }
    }, [user, navigate]);
    const INITIAL_LOAD = 30;
    const [visibleJobsCount, setVisibleJobsCount] = useState(INITIAL_LOAD);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [sortBy, setSortBy] = useState('newest');

    // Extended mock data for demonstration
    const baseJobs = [
        { id: 1, title: 'Watching YouTube video 🎁', category: 'TOP JOB', icon: <FaTv />, location: 'Bangladesh', price: 0.024, target: 2754, current: 2728 },
        { id: 2, title: 'Watch full video 🤓', category: 'TOP JOB', icon: <FaTv />, location: 'Bangladesh', price: 0.028, target: 4774, current: 4724 },
        { id: 3, title: 'Full video watching bd', category: 'TOP JOB', icon: <FaTv />, location: 'Bangladesh', price: 0.030, target: 6264, current: 6045 },
        { id: 4, title: 'Full video watch 🥳 🥳', category: 'TOP JOB', icon: <FaTv />, location: 'International', price: 0.030, target: 6130, current: 5764 },
        { id: 5, title: 'YouTube Video Watch', category: '', icon: <FaTv />, location: 'International', price: 0.025, target: 110, current: 68 },
        { id: 6, title: 'Facebook Page Follow 👍', category: 'SOCIAL', icon: <FaCheckCircle />, location: 'Bangladesh', price: 0.015, target: 1000, current: 400 },
        { id: 7, title: 'Instagram Reels Like ❤️', category: 'SOCIAL', icon: <FaCheckCircle />, location: 'International', price: 0.012, target: 2000, current: 1700 },
        { id: 8, title: 'Website Traffic 🌐', category: 'WEB', icon: <FaLaptop />, location: 'International', price: 0.050, target: 10000, current: 2000 },
    ];

    // Generate 60 jobs for testing pagination
    const [allJobs] = useState(() => {
        let jobs = [];
        for (let i = 0; i < 60; i++) {
            const base = baseJobs[i % baseJobs.length];
            jobs.push({
                ...base,
                id: i + 1,
                // Randomize progress slightly for variety
                current: Math.floor(Math.random() * base.target)
            });
        }
        return jobs;
    });

    const filteredJobs = allJobs.filter(job => {
        const categoryMatch = selectedCategory === 'All' || job.category === selectedCategory || (selectedCategory === 'TOP JOB' && job.category === 'TOP JOB');
        const locationMatch = selectedLocation === 'All' || job.location === selectedLocation;
        return categoryMatch && locationMatch;
    });

    const currentJobs = filteredJobs.slice(0, visibleJobsCount);

    const handleLoadMore = () => {
        setVisibleJobsCount(prev => prev + INITIAL_LOAD);
    };

    return (
        <Layout showFooter={true}>
            <div className="bg-base-100 dark:bg-base-100 min-h-screen">

                {/* Banner Ad Section */}
                <div className="bg-primary dark:bg-base-100 h-40 md:h-56 w-full relative transition-colors duration-300">
                    <div className="container mx-auto px-4 pt-4 md:pt-6 flex justify-center">
                        <div className="bg-base-100 rounded-xl shadow-2xl p-0.5 max-w-sm md:max-w-md w-full relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full bg-base-100/10 text-center py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-widest z-10">Paid Ad</div>
                            <img
                                src="https://via.placeholder.com/600x250?text=Premium+Sponsors"
                                alt="Promotion"
                                className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                <div className="mx-auto px-2 xs:px-3 md:px-8 -mt-10 md:-mt-16 relative z-10 pb-20">
                    <div className="bg-base-200 dark:bg-base-200/50 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-base-content/10 dark:border-white/5">


                        {/* Filters & Sorting Bar */}
                        <div className="p-4 md:p-6 flex flex-wrap items-center gap-3">
                            <div className="dropdown">
                                <label tabIndex={0} className="btn btn-primary text-white font-bold rounded-lg px-6">
                                    Select Category
                                </label>

                                <ul tabIndex={0} className="dropdown-content z-[20] menu p-1 shadow-2xl bg-base-100 rounded-xl w-52 mt-2 border border-base-300">
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedCategory('All')}>All Categories</button></li>
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedCategory('TOP JOB')}>Top Jobs</button></li>
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedCategory('SOCIAL')}>Social Media</button></li>
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedCategory('WEB')}>Web Traffic</button></li>
                                </ul>
                            </div>

                            <div className="dropdown">
                                <label tabIndex={0} className="btn btn-primary text-white font-bold rounded-lg px-6">
                                    Select Location
                                </label>

                                <ul tabIndex={0} className="dropdown-content z-[20] menu p-1 shadow-2xl bg-base-100 rounded-xl w-52 mt-2 border border-base-300">
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedLocation('All')}>All Locations</button></li>
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedLocation('Bangladesh')}>Bangladesh</button></li>
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedLocation('International')}>International</button></li>
                                </ul>
                            </div>

                            <div className="ml-auto">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="flex items-center gap-1 font-bold text-base-content dark:text-accent cursor-pointer">
                                        Sort <span className="text-primary">▼</span>
                                    </label>

                                    <ul tabIndex={0} className="dropdown-content z-[20] menu p-1 shadow-2xl bg-base-100 rounded-xl w-40 mt-2 border border-base-300">
                                        <li><button className="text-sm py-2 font-bold" onClick={() => setSortBy('newest')}>Newest</button></li>
                                        <li><button className="text-sm py-2 font-bold" onClick={() => setSortBy('highest_paying')}>Highest Pay</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Jobs List */}
                        <div className="px-4 md:px-8 pb-8 space-y-4">
                            {currentJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-base-100 dark:bg-base-100 rounded-xl p-4 md:p-6 shadow-sm border border-base-content/5 flex flex-col md:flex-row items-center gap-4 transition-all hover:shadow-md cursor-pointer group"
                                >

                                    {/* Left Border Accent for Selection */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="flex-1 w-full">
                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                            <h3 className="text-lg md:text-xl font-bold text-base-content">
                                                {job.title}
                                            </h3>

                                            {job.category === 'TOP JOB' && (
                                                <span className="bg-[#AAF4DB] text-[#0D7A5C] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                                    TOP JOB
                                                </span>
                                            )}
                                        </div>

                                        {/* Progress Bar Row */}
                                        <div className="flex flex-col items-center w-full max-w-md mx-auto md:mx-0">
                                            <span className="text-[10px] font-bold text-base-content/50 mb-1">
                                                {job.current} OF {job.target}
                                            </span>
                                            <div className="h-1.5 w-full bg-base-200 dark:bg-base-300 rounded-full overflow-hidden">

                                                <div
                                                    className="h-full bg-[#17A55D] rounded-full"
                                                    style={{ width: `${(job.current / job.target) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right flex flex-col items-end shrink-0">
                                        <div className="text-2xl font-black text-[#17A55D] flex items-baseline gap-1">
                                            {job.price.toFixed(3)}
                                            <span className="text-xs font-bold text-[#17A55D] italic">s</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* More Job Button */}
                        {visibleJobsCount < filteredJobs.length && (
                            <div className="pb-12 flex justify-center">
                                <button
                                    onClick={handleLoadMore}
                                    className="btn btn-primary text-white font-bold rounded-lg px-10 h-12 shadow-lg hover:scale-105 transition-all text-base normal-case"

                                >
                                    More Job
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
