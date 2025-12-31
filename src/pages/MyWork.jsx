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
            <div className="min-h-screen bg-base-200 py-12 px-4 text-base-content">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <h1 className="text-4xl font-black flex items-center gap-4">
                            <FaTasks className="text-primary" /> My Submissions
                        </h1>
                        <div className="join bg-base-100 shadow-xl p-1 rounded-2xl">
                            <button onClick={() => setStatus('all')} className={`join-item btn btn-sm rounded-xl ${status === 'all' ? 'btn-primary' : 'btn-ghost'}`}>All</button>
                            <button onClick={() => setStatus('pending')} className={`join-item btn btn-sm rounded-xl ${status === 'pending' ? 'btn-primary' : 'btn-ghost'}`}>Pending</button>
                            <button onClick={() => setStatus('approved')} className={`join-item btn btn-sm rounded-xl ${status === 'approved' ? 'btn-primary' : 'btn-ghost'}`}>Approved</button>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {submissions.filter(s => status === 'all' || s.status === status).map(work => (
                            <div key={work.id} className="bg-base-100 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-base-content/5 transition-all hover:border-primary/20">
                                <div className="flex gap-4 items-center flex-1">
                                    <div className={`p-4 rounded-2xl ${getStatusStyle(work.status)} bg-opacity-10 text-xl`}>
                                        {work.status === 'approved' && <FaCheckCircle className="text-success" />}
                                        {work.status === 'pending' && <FaClock className="text-warning" />}
                                        {work.status === 'rejected' && <FaTimesCircle className="text-error" />}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black">{work.jobTitle}</h3>
                                        <p className="text-xs opacity-60">Submitted on {work.date}</p>
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
