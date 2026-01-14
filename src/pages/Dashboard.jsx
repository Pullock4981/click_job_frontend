import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaMapMarkerAlt, FaSortAmountDown, FaGift, FaTv, FaCheckCircle, FaLaptop } from 'react-icons/fa';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'admin') {
            navigate('/admin');
        }
    }, [user, navigate]);

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await api.get('/jobs');
            if (res.success) {
                setJobs(res.data.jobs || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const categoryMatch = selectedCategory === 'All' || job.category === selectedCategory;
        // In real app, we'd filter by location too
        return categoryMatch;
    });

    return (
        <Layout showFooter={true}>
            <div className="bg-base-100 dark:bg-base-100 min-h-screen">
                <div className="bg-primary dark:bg-base-900 h-40 md:h-56 w-full relative transition-colors duration-300">
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
                    <div className="bg-base-200 dark:bg-base-900 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-base-content/10 dark:border-white/5">
                        <div className="p-4 md:p-6 flex flex-wrap items-center gap-3">
                            <div className="dropdown">
                                <label tabIndex={0} className="btn btn-primary text-white font-bold rounded-lg px-6">
                                    Select Category
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[20] menu p-1 shadow-2xl bg-base-100 rounded-xl w-52 mt-2 border border-base-300">
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedCategory('All')}>All Categories</button></li>
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedCategory('Social')}>Social Media</button></li>
                                    <li><button className="text-sm py-2 font-bold" onClick={() => setSelectedCategory('Youtube')}>Youtube</button></li>
                                </ul>
                            </div>
                            <div className="ml-auto">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="flex items-center gap-1 font-bold text-base-content dark:text-accent cursor-pointer">
                                        Sort <span className="text-primary">▼</span>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content z-[20] menu p-1 shadow-2xl bg-base-100 rounded-xl w-40 mt-2 border border-base-300">
                                        <li><button className="text-sm py-2 font-bold" onClick={() => setSortBy('newest')}>Newest</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 md:px-8 pb-8 space-y-4">
                            {loading ? (
                                <div className="p-10 text-center">Loading jobs...</div>
                            ) : jobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <div
                                        key={job._id}
                                        onClick={() => navigate(`/jobs/${job._id}`)}
                                        className="bg-base-100 dark:bg-base-800 rounded-xl p-4 md:p-6 shadow-sm border border-base-content/5 flex flex-col md:flex-row items-center gap-4 transition-all hover:shadow-md cursor-pointer group relative"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="flex-1 w-full">
                                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                                <h3 className="text-lg md:text-xl font-bold text-base-content">
                                                    {job.title}
                                                </h3>
                                                <span className="bg-[#AAF4DB] text-[#0D7A5C] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                                    {job.category}
                                                </span>
                                            </div>

                                            <div className="flex flex-col items-center w-full max-w-md mx-auto md:mx-0">
                                                <span className="text-[10px] font-bold text-base-content/50 mb-1">
                                                    {job.currentParticipants || 0} OF {job.workerNeed || 0}
                                                </span>
                                                <div className="h-1.5 w-full bg-base-200 dark:bg-base-300 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#17A55D] rounded-full"
                                                        style={{ width: `${((job.currentParticipants || 0) / (job.workerNeed || 1)) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right flex flex-col items-end shrink-0">
                                            <div className="text-2xl font-black text-[#17A55D] flex items-baseline gap-1">
                                                {job.workerEarn?.toFixed(3)}
                                                <span className="text-xs font-bold text-[#17A55D] italic">s</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center uppercase font-bold text-gray-400">No jobs available at the moment</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
