import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { API_ENDPOINTS } from '../config/api';

const MyJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.MY_JOBS);
            if (res.success) {
                setJobs(res.data.jobs || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout showFooter={true}>
            <div className="bg-[#1e60d5] h-48 md:h-64 w-full relative"></div>

            <div className="mx-auto px-4 md:px-8 -mt-24 relative z-10 pb-20">
                <div className="bg-base-100 dark:bg-base-900 rounded-xl shadow-2xl overflow-hidden border border-base-200 dark:border-white/5">
                    <div className="p-6 md:p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-[#2c3e50] dark:text-white uppercase tracking-tight">
                                My Posted Jobs
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#f8fafc] dark:bg-base-800/50 border-b border-gray-100 dark:border-white/10">
                                    <tr className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                                        <th className="px-4 py-4">Job ID</th>
                                        <th className="px-4 py-4">Job Name</th>
                                        <th className="px-4 py-4 text-center">Progress</th>
                                        <th className="px-4 py-4 text-center">Earn/Worker</th>
                                        <th className="px-4 py-4 text-center">Status</th>
                                        <th className="px-4 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                    {loading ? (
                                        <tr><td colSpan="6" className="p-10 text-center font-bold text-gray-400">Loading...</td></tr>
                                    ) : jobs.length > 0 ? (
                                        jobs.map((job, index) => (
                                            <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-4 text-xs font-medium text-gray-600 dark:text-gray-400">
                                                    #{job._id.substring(0, 8)}
                                                </td>
                                                <td className="px-4 py-4 text-xs font-medium text-gray-800 dark:text-white">
                                                    {job.title}
                                                </td>
                                                <td className="px-4 py-4 text-xs text-center font-medium text-gray-600 dark:text-gray-400">
                                                    {job.currentParticipants || 0} / {job.workerNeed || 0}
                                                </td>
                                                <td className="px-4 py-4 text-xs text-center font-medium text-gray-600 dark:text-gray-400">
                                                    ${job.workerEarn?.toFixed(3)}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <span className={`w-2 h-2 rounded-full inline-block ${job.adminStatus === 'approved' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
                                                        <span className={`text-[11px] font-bold uppercase tracking-tighter ${job.adminStatus === 'approved' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                                                            {job.adminStatus}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button className="bg-[#27ae60] hover:bg-emerald-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-sm transition-colors">
                                                            Boost
                                                        </button>
                                                        <button
                                                            onClick={() => navigate('/my-jobs/review')}
                                                            className="bg-[#1e60d5] hover:bg-blue-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-sm transition-colors"
                                                        >
                                                            Proves
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="6" className="p-10 text-center uppercase font-bold text-gray-400">You haven't posted any jobs yet</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-10 space-y-2 border-t border-base-content/5 dark:border-white/5 pt-6">
                            <div className="flex gap-2 text-[11px] font-bold text-red-500 leading-relaxed">
                                <span>•</span>
                                <p>Jobs in the YouTube category must be exclusive to our platform.</p>
                            </div>
                            <div className="flex gap-2 text-[11px] font-bold text-gray-500 leading-relaxed">
                                <span>•</span>
                                <p>Funds are deducted upon job posting and held until job is approved/rejected.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MyJobs;
