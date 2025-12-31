import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaBriefcase, FaEdit, FaEye, FaUsers, FaChartBar } from 'react-icons/fa';

const MyJobs = () => {
    const jobs = [
        { id: 'J001', title: 'YouTube View & Sub', workersNeeded: 500, workersDone: 245, status: 'active', price: 0.02 },
        { id: 'J002', title: 'Mobile App Beta Test', workersNeeded: 50, workersDone: 50, status: 'completed', price: 0.50 },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-base-200 py-12 px-4 shadow-inner text-base-content">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-4xl font-black flex items-center gap-4">
                            <FaBriefcase className="text-primary" /> My Posted Jobs
                        </h1>
                        <button className="btn btn-primary rounded-2xl shadow-lg shadow-primary/20">
                            Create New Job
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {jobs.map(job => (
                            <div key={job.id} className="bg-base-100 p-8 rounded-[2rem] shadow-2xl border border-base-content/5 relative overflow-hidden group">
                                <div className={`absolute top-0 right-0 p-4 font-black uppercase text-[10px] tracking-tighter ${job.status === 'active' ? 'bg-secondary text-secondary-content' : 'bg-success text-success-content'}`}>
                                    {job.status}
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs opacity-50 font-black mb-1">JOB ID: {job.id}</p>
                                        <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{job.title}</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-base-200 p-4 rounded-2xl">
                                            <p className="text-[10px] opacity-50 font-bold flex items-center gap-1 uppercase">
                                                <FaUsers /> Progress
                                            </p>
                                            <p className="text-xl font-black">{job.workersDone} / {job.workersNeeded}</p>
                                        </div>
                                        <div className="bg-base-200 p-4 rounded-2xl">
                                            <p className="text-[10px] opacity-50 font-bold flex items-center gap-1 uppercase">
                                                <FaChartBar /> Spent
                                            </p>
                                            <p className="text-xl font-black">${(job.workersDone * job.price).toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-1000"
                                            style={{ width: `${(job.workersDone / job.workersNeeded) * 100}%` }}
                                        ></div>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <button className="btn btn-sm btn-ghost bg-base-200 rounded-xl flex-1 gap-2"><FaEye /> View</button>
                                        <button className="btn btn-sm btn-ghost bg-base-200 rounded-xl flex-1 gap-2"><FaEdit /> Edit</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MyJobs;
