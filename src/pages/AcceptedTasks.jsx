import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaCheckCircle } from 'react-icons/fa';

const AcceptedTasks = () => {
    const [tasks, setTasks] = useState([]);

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8">
                {/* Header Section */}
                <div className="bg-primary h-48 md:h-56 w-full"></div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto px-2 xs:px-4 md:px-8 -mt-32 md:-mt-40 pb-20 relative z-10">
                    <div className="bg-base-200 dark:bg-base-200/50 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-base-content/10 dark:border-white/5">

                        <div className="p-6 md:p-8">
                            <h2 className="text-xl md:text-2xl font-black text-base-content mb-8 flex items-center gap-3">
                                <FaCheckCircle className="text-primary" /> Accepted Tasks
                            </h2>

                            <div className="bg-base-100 rounded-xl shadow-sm border border-base-content/5 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-base-300/50 text-[10px] font-black uppercase text-base-content/40 tracking-[0.1em] border-b border-base-content/5">
                                            <tr>
                                                <th className="px-6 py-5 whitespace-nowrap">Task Name</th>
                                                <th className="px-6 py-5 whitespace-nowrap text-center">Proves</th>
                                                <th className="px-6 py-5 whitespace-nowrap text-center">Time</th>
                                                <th className="px-6 py-5 whitespace-nowrap text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.length > 0 ? (
                                                tasks.map((task, i) => (
                                                    <tr key={i} className="hover:bg-base-200/50 transition-colors border-b border-base-content/5 last:border-0">
                                                        {/* Task entries would go here */}
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-24 text-center">
                                                        <div className="flex flex-col items-center justify-center opacity-40">
                                                            <div className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-base-content/60">
                                                                You Have No Accepted Jobs
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AcceptedTasks;
