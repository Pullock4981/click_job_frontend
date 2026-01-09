import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaTasks, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8">
                {/* Header Section */}
                <div className="bg-primary h-48 md:h-56 w-full"></div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto px-2 xs:px-4 md:px-8 -mt-32 md:-mt-40 pb-20 relative z-10">
                    <div className="bg-base-200 dark:bg-base-200/50 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-base-content/10 dark:border-white/5">

                        {/* Top Announcement Carousel */}
                        <div className="p-4 md:p-6 pb-0">
                            <div className="border border-primary rounded-lg overflow-hidden bg-base-100/50">
                                <div className="relative flex overflow-x-hidden">
                                    <div className="py-2.5 animate-marquee whitespace-nowrap">
                                        <span className="text-primary text-[10px] md:text-sm font-bold px-4">
                                            Hello, each task may take up to 72 hours for rating, so please be patient. Use appropriate and respectful language in job reports. If payment is not received within 96 hours, you can submit a report.
                                        </span>
                                        <span className="text-primary text-[10px] md:text-sm font-bold px-4">
                                            Hello, each task may take up to 72 hours for rating, so please be patient. Use appropriate and respectful language in job reports. If payment is not received within 96 hours, you can submit a report.
                                        </span>
                                    </div>

                                    <div className="absolute top-0 py-2.5 animate-marquee2 whitespace-nowrap">
                                        <span className="text-primary text-[10px] md:text-sm font-bold px-4">
                                            Hello, each task may take up to 72 hours for rating, so please be patient. Use appropriate and respectful language in job reports. If payment is not received within 96 hours, you can submit a report.
                                        </span>
                                        <span className="text-primary text-[10px] md:text-sm font-bold px-4">
                                            Hello, each task may take up to 72 hours for rating, so please be patient. Use appropriate and respectful language in job reports. If payment is not received within 96 hours, you can submit a report.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @keyframes marquee {
                                    0% { transform: translateX(0%); }
                                    100% { transform: translateX(-100%); }
                                }
                                @keyframes marquee2 {
                                    0% { transform: translateX(100%); }
                                    100% { transform: translateX(0%); }
                                }
                                .animate-marquee {
                                    animation: marquee 35s linear infinite;
                                }
                                .animate-marquee2 {
                                    animation: marquee2 35s linear infinite;
                                }
                            `}} />
                        </div>

                        <div className="p-6 md:p-8">
                            <h2 className="text-xl md:text-2xl font-black text-base-content mb-8 flex items-center gap-3">
                                <FaTasks className="text-primary" /> My Works
                            </h2>

                            <div className="bg-base-100 rounded-xl shadow-sm border border-base-content/5 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-base-300/50 text-[10px] font-black uppercase text-base-content/40 tracking-[0.1em] border-b border-base-content/5">
                                            <tr>
                                                <th className="px-6 py-5 whitespace-nowrap">Task Name <span className="ml-1 opacity-50">⇅</span></th>
                                                <th className="px-6 py-5 whitespace-nowrap">Status <span className="ml-1 opacity-50">⇅</span></th>
                                                <th className="px-6 py-5 whitespace-nowrap">Earned <span className="ml-1 opacity-50">⇅</span></th>
                                                <th className="px-6 py-5 whitespace-nowrap">Action</th>
                                                <th className="px-6 py-5 whitespace-nowrap">Date <span className="ml-1 opacity-50">⇅</span></th>
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
                                                    <td colSpan="5" className="px-6 py-24 text-center">
                                                        <div className="flex flex-col items-center justify-center opacity-40">
                                                            <div className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-base-content/60">
                                                                You Have No Task
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="mt-8 text-[11px] text-base-content/40 font-bold italic uppercase tracking-wider text-center md:text-left">
                                Note: 30 Day older Completed Job will got deleted. So your submitted work also delete with that Job.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MyTasks;

