import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaTasks, FaCheckCircle, FaClock, FaTimesCircle, FaSearch } from 'react-icons/fa';

const MyWork = () => {
    const [status, setStatus] = useState('all');

    const submissions = [
        { id: '101', jobTitle: 'Subscribe and Like Video', price: 0.02, status: 'approved', date: '2023-12-30' },
        { id: '102', jobTitle: 'Follow Instagram Profile', price: 0.015, status: 'pending', date: '2023-12-31' },
        { id: '103', jobTitle: 'Website Registration', price: 0.05, status: 'rejected', date: '2023-12-25' },
    ];

    const getStatusStyle = (s) => {
        switch (s) {
            case 'approved': return 'badge-success';
            case 'pending': return 'badge-warning';
            case 'rejected': return 'badge-error';
            default: return 'badge-ghost';
        }
    };

    return (
        <Layout>
            <div className="bg-base-200 py-3 md:py-10 px-3 md:px-8">
                <div className="max-w-5xl mx-auto space-y-4 md:space-y-10">
                    {/* Header Card */}
                    <div className="bg-base-100 p-3 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] shadow-xl border border-primary/5">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                                <div className="p-2.5 md:p-4 bg-primary text-white rounded-xl md:rounded-3xl shadow-xl shadow-primary/30 flex-shrink-0">
                                    <FaTasks size={20} className="md:size-6" />
                                </div>
                                <h1 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tight md:tracking-tighter">My <span className="text-primary">Tasks</span></h1>
                            </div>

                            <div className="w-full lg:w-auto">
                                <div className="join bg-base-200/50 p-1 rounded-xl md:rounded-2xl shadow-inner flex w-full lg:w-max">
                                    {['all', 'pending', 'approved', 'rejected'].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setStatus(s)}
                                            className={`join-item btn btn-xs md:btn-sm h-10 md:h-12 border-none transition-all flex-1 lg:flex-none px-2 md:px-8 rounded-lg md:rounded-xl ${status === s ? 'btn-primary shadow-lg scale-[1.02]' : 'btn-ghost opacity-60'}`}
                                        >
                                            <span className="capitalize font-black text-[10px] md:text-sm tracking-tighter md:tracking-tight">{s}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {submissions.filter(s => status === 'all' || s.status === status).map(work => (
                            <div key={work.id} className="bg-base-100 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-base-content/5 transition-all hover:border-primary/20">
                                <div className="flex gap-4 items-center flex-1">
                                    <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${getStatusStyle(work.status)} bg-opacity-10 text-lg md:text-xl`}>
                                        {work.status === 'approved' && <FaCheckCircle className="text-success" />}
                                        {work.status === 'pending' && <FaClock className="text-warning" />}
                                        {work.status === 'rejected' && <FaTimesCircle className="text-error" />}
                                    </div>
                                    <div>
                                        <h3 className="text-base md:text-lg font-black leading-tight">{work.jobTitle}</h3>
                                        <p className="text-[10px] md:text-xs opacity-60">Submitted on {work.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-center">
                                        <p className="text-xs opacity-50 uppercase font-black">Earnings</p>
                                        <p className="text-xl font-black text-success">${work.price.toFixed(3)}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`badge ${getStatusStyle(work.status)} p-4 rounded-xl font-bold`}>
                                            {work.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {submissions.length === 0 && (
                        <div className="bg-base-100 p-20 rounded-3xl text-center shadow-xl border-2 border-dashed border-base-content/10">
                            <h2 className="text-2xl font-bold opacity-30">No submissions found.</h2>
                            <p className="opacity-50">Go to find jobs and start earning!</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default MyWork;
