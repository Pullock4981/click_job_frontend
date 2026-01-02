import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

const AcceptedTasks = () => {
    const [tasks, setTasks] = useState([]);

    return (
        <Layout showFooter={true}>
            <div className="bg-primary dark:bg-base-100 h-40 md:h-56 w-full relative"></div>

            <div className="mx-auto px-4 md:px-8 -mt-20 relative z-10 pb-20 flex justify-center">
                <div className="w-full max-w-5xl bg-white dark:bg-base-800 rounded-xl shadow-2xl overflow-hidden border border-base-200 dark:border-white/5">
                    <div className="p-6 md:p-8">
                        <h2 className="text-xl font-bold text-[#2c3e50] dark:text-white mb-6">
                            Accepted Task
                        </h2>

                        <div className="overflow-x-auto border rounded-lg border-gray-100 dark:border-white/10">
                            <table className="w-full text-left">
                                <thead className="bg-[#f8fafc] dark:bg-base-900/50 border-b border-gray-100 dark:border-white/10 text-[10px] font-black uppercase text-gray-500 tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Task Name</th>
                                        <th className="px-6 py-4 text-center">Proves</th>
                                        <th className="px-6 py-4 text-center">Time</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="4" className="px-6 py-24 text-center text-gray-400 text-sm font-medium">
                                            You Have No Accepted jobs
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AcceptedTasks;
