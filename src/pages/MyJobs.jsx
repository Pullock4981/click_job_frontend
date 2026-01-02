import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

const MyJobs = () => {
    const [jobs] = useState([
        { id: '256125', name: 'YouTube video watch', progress: '43 of 43', cost: '$0.030', status: 'Active' },
        { id: '241672', name: 'YouTube Video Watch', progress: '30 of 30', cost: '$0.030', status: 'Active' },
        { id: '241003', name: 'YouTube Subscribe', progress: '40 of 40', cost: '$0.022', status: 'Active' },
        { id: '239850', name: 'Facebook Video like', progress: '155 of 155', cost: '$0.020', status: 'Active' },
        { id: '239455', name: 'Facebook Video like', progress: '155 of 155', cost: '$0.020', status: 'Active' },
        { id: '239167', name: 'Facebook Video like', progress: '151 of 151', cost: '$0.020', status: 'Active' },
        { id: '235161', name: 'Facebook Video like', progress: '150 of 150', cost: '$0.020', status: 'Active' },
        { id: '233550', name: 'Facebook Video Like', progress: '150 of 150', cost: '$0.020', status: 'Active' },
        { id: '183544', name: 'YouTube Video watch and Subscribe', progress: '82 of 82', cost: '$0.022', status: 'Active' },
    ]);

    return (
        <Layout showFooter={true}>
            {/* Blue Header Section */}
            <div className="bg-[#1e60d5] h-48 md:h-64 w-full relative"></div>

            <div className="mx-auto px-4 md:px-8 -mt-24 relative z-10 pb-20">
                <div className="bg-white dark:bg-base-900 rounded-xl shadow-2xl overflow-hidden border border-base-200 dark:border-white/5">
                    <div className="p-6 md:p-8">
                        {/* Page Title */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-[#2c3e50] dark:text-white">
                                My Jobs
                            </h2>
                        </div>

                        {/* Jobs Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#f8fafc] dark:bg-base-800/50 border-b border-gray-100 dark:border-white/10">
                                    <tr className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                                        <th className="px-4 py-4">Job ID ↑↓</th>
                                        <th className="px-4 py-4">Job Name ↑↓</th>
                                        <th className="px-4 py-4 text-center">Progress ↑↓</th>
                                        <th className="px-4 py-4 text-center">Cost ↑↓</th>
                                        <th className="px-4 py-4 text-center">Status ↑↓</th>
                                        <th className="px-4 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                    {jobs.map((job, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-4 text-xs font-medium text-gray-600 dark:text-gray-400">
                                                {job.id}
                                            </td>
                                            <td className="px-4 py-4 text-xs font-medium text-gray-800 dark:text-white">
                                                {job.name}
                                            </td>
                                            <td className="px-4 py-4 text-xs text-center font-medium text-gray-600 dark:text-gray-400">
                                                {job.progress}
                                            </td>
                                            <td className="px-4 py-4 text-xs text-center font-medium text-gray-600 dark:text-gray-400">
                                                {job.cost}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                                                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-tighter">
                                                        {job.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="bg-[#27ae60] hover:bg-emerald-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-sm transition-colors min-w-[55px]">
                                                        Boost
                                                    </button>
                                                    <button className="bg-[#27ae60] hover:bg-emerald-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-sm transition-colors min-w-[70px]">
                                                        Top Job
                                                    </button>
                                                    <button className="bg-[#27ae60] hover:bg-emerald-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-sm transition-colors min-w-[60px]">
                                                        Proves
                                                    </button>
                                                    <button className="bg-[#1e60d5] hover:bg-blue-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-sm transition-colors min-w-[65px]">
                                                        Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination placeholder matching the blue circle design */}
                        <div className="mt-8 flex justify-end">
                            <div className="bg-[#1e60d5] text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-blue-500/20 cursor-pointer">
                                1
                            </div>
                        </div>

                        {/* Footer Notices */}
                        <div className="mt-10 space-y-2 border-t border-gray-100 dark:border-white/5 pt-6">
                            <div className="flex gap-2 text-[11px] font-bold text-red-500 leading-relaxed">
                                <span>•</span>
                                <p>Jobs in the YouTube category must be exclusive to our platform. Posting them on other platforms at the same time may lead to rejection and account ban.</p>
                            </div>
                            <div className="flex gap-2 text-[11px] font-bold text-red-500 leading-relaxed">
                                <span>•</span>
                                <p>Jobs marked as Completed for over 30 days will be automatically deleted, including all proofs and related data.</p>
                            </div>
                            <div className="flex gap-2 text-[11px] font-bold text-red-500 leading-relaxed">
                                <span>•</span>
                                <p>Any Top Job that is not updated within 7 days will be removed from the Top Job section.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MyJobs;
