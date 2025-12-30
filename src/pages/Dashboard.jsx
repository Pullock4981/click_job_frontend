import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaMapMarkerAlt, FaSortAmountDown } from 'react-icons/fa';
import Layout from '../components/layout/Layout';

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const itemsPerPage = 9;

    const [allJobs] = useState([
        { id: 1, title: 'Need YouTube watch time', category: 'TOP JOB', icon: '📖', location: 'Bangladesh', price: 0.026, date: '2023-12-30', target: 4575, current: 2735 },
        { id: 2, title: 'Full video watching bd', category: 'TOP JOB', icon: '🎬', location: 'Bangladesh', price: 0.030, date: '2023-12-29', target: 4505, current: 4290 },
        { id: 3, title: 'YouTube Video Watch', category: 'TOP JOB', icon: '✅', location: 'International', price: 0.025, date: '2023-12-28', target: 3000, current: 2300 },
        { id: 4, title: 'YouTube video watch', category: 'TOP JOB', icon: '📺', location: 'International', price: 0.025, date: '2023-12-27', target: 501, current: 151 },
        { id: 5, title: 'Need full watch', category: 'TOP JOB', icon: '🍱', location: 'Bangladesh', price: 0.032, date: '2023-12-26', target: 5000, current: 4536 },
        { id: 6, title: 'Facebook Page Follow', category: 'SOCIAL', icon: '👍', location: 'Bangladesh', price: 0.015, date: '2023-12-25', target: 1000, current: 400 },
        { id: 7, title: 'Instagram Reels Like', category: 'SOCIAL', icon: '📸', location: 'International', price: 0.012, date: '2023-12-24', target: 2000, current: 1700 },
        { id: 8, title: 'Telegram Group Join', category: 'SOCIAL', icon: '✈️', location: 'International', price: 0.020, date: '2023-12-23', target: 500, current: 250 },
        { id: 9, title: 'Tiktok Video Share', category: 'SOCIAL', icon: '🎵', location: 'Bangladesh', price: 0.018, date: '2023-12-22', target: 800, current: 520 },
        { id: 10, title: 'Website Traffic', category: 'WEB', icon: '🌐', location: 'International', price: 0.050, date: '2023-12-21', target: 10000, current: 2000 },
        { id: 11, title: 'App Install & Review', category: 'APP', icon: '📱', location: 'International', price: 0.080, date: '2023-12-20', target: 100, current: 10 },
        { id: 12, title: 'Twitter Retweet', category: 'SOCIAL', icon: '🐦', location: 'International', price: 0.015, date: '2023-12-19', target: 400, current: 368 },
    ]);

    const filteredJobs = allJobs.filter(job => {
        const categoryMatch = selectedCategory === 'All' || job.category === selectedCategory;
        const locationMatch = selectedLocation === 'All' || job.location === selectedLocation;
        return categoryMatch && locationMatch;
    }).sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'highest_paying') return b.price - a.price;
        return 0;
    });

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Layout showFooter={false}>
            <div className="min-h-screen bg-base-200 dark:bg-base-100">
                {/* Blue Banner Section */}
                <div className="bg-primary dark:bg-base-100 h-64 w-full relative transition-colors duration-300">
                    <div className="container mx-auto px-4 pt-8 flex justify-center">
                        <div className="bg-base-100 rounded-xl shadow-2xl p-1 max-w-md w-full relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full bg-base-100/10 text-center py-1 text-[10px] font-bold uppercase tracking-widest">Paid</div>
                            <img
                                src="https://via.placeholder.com/600x300?text=Win+Bet+Cash+Agent"
                                alt="Promotion"
                                className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-20 relative z-10 pb-20">
                    <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden min-h-[600px] border border-base-content/10 dark:border-white/5">

                        {/* Filters & Sorting Bar */}
                        <div className="bg-base-200/60 p-4 flex flex-wrap items-center gap-3">
                            <div className="dropdown">
                                <label tabIndex={0} className="btn btn-primary btn-sm text-white font-bold rounded-lg gap-2 shadow-md">
                                    <FaFilter className="text-[10px]" /> {selectedCategory === 'All' ? 'Select Category' : selectedCategory}
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[20] menu p-2 shadow-2xl bg-base-100 rounded-xl w-48 mt-2 border border-base-300">
                                    <li><button onClick={() => setSelectedCategory('All')}>All Categories</button></li>
                                    <li><button onClick={() => setSelectedCategory('TOP JOB')}>Top Jobs</button></li>
                                    <li><button onClick={() => setSelectedCategory('SOCIAL')}>Social Media</button></li>
                                    <li><button onClick={() => setSelectedCategory('WEB')}>Web Traffic</button></li>
                                    <li><button onClick={() => setSelectedCategory('APP')}>App Tasks</button></li>
                                </ul>
                            </div>

                            <div className="dropdown">
                                <label tabIndex={0} className="btn btn-primary btn-sm text-white font-bold rounded-lg gap-2 shadow-md">
                                    <FaMapMarkerAlt className="text-[10px]" /> {selectedLocation === 'All' ? 'Select Location' : selectedLocation}
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[20] menu p-2 shadow-2xl bg-base-100 rounded-xl w-48 mt-2 border border-base-300">
                                    <li><button onClick={() => setSelectedLocation('All')}>All Locations</button></li>
                                    <li><button onClick={() => setSelectedLocation('Bangladesh')}>Bangladesh</button></li>
                                    <li><button onClick={() => setSelectedLocation('International')}>International</button></li>
                                </ul>
                            </div>

                            <div className="ml-auto dropdown dropdown-end">
                                <label tabIndex={0} className="flex items-center gap-2 text-primary dark:text-accent font-bold cursor-pointer hover:opacity-80 transition-opacity">
                                    <span>Sort: {sortBy === 'highest_paying' ? 'Highest Pay' : 'Newest'}</span>
                                    <FaSortAmountDown />
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[20] menu p-2 shadow-2xl bg-base-100 rounded-xl w-40 mt-2 border border-base-300">
                                    <li><button onClick={() => setSortBy('newest')}>Newest First</button></li>
                                    <li><button onClick={() => setSortBy('highest_paying')}>Highest Paying</button></li>
                                </ul>
                            </div>
                        </div>

                        {/* Jobs Grid */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="group bg-base-200/50 dark:bg-base-200/30 hover:bg-base-200 dark:hover:bg-base-200/50 border border-base-content/5 dark:border-white/5 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-2xl">
                                            {job.icon}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-success flex items-center justify-end gap-1">
                                                <span>{job.price.toFixed(3)}</span>
                                                <span className="text-[10px] uppercase opacity-70">s</span>
                                            </div>
                                            <span className="badge badge-success badge-sm text-[9px] text-white font-black tracking-tighter uppercase rounded px-1.5 h-4 italic">
                                                {job.category}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-base text-base-content group-hover:text-primary transition-colors mb-4 line-clamp-1">
                                        {job.title}
                                    </h3>

                                    {/* Progress Section */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold text-base-content/50 uppercase">
                                            <span>Progress</span>
                                            <span>{job.current} / {job.target}</span>
                                        </div>
                                        <div className="h-2 w-full bg-base-300 dark:bg-base-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-success to-success/70 rounded-full transition-all duration-1000"
                                                style={{ width: `${(job.current / job.target) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-center">
                                        <button className="btn btn-primary btn-sm btn-block rounded-lg font-bold text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            Work Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="p-8 flex justify-center border-t border-base-300/50">
                            <div className="join gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        className={`join-item btn btn-md rounded-xl font-bold ${currentPage === i + 1
                                            ? 'btn-primary text-white'
                                            : 'btn-ghost text-base-content/60 bg-base-200/50 hover:bg-primary/10'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
