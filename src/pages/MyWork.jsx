import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FaTasks, FaCheckCircle, FaClock, FaTimesCircle, FaSearch } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const MyWork = () => {
    const [status, setStatus] = useState('all');
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyWork();
    }, []);

    const fetchMyWork = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.MY_WORK);
            if (res.success) {
                setWorks(res.data.works || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (s) => {
        switch (s) {
            case 'approved': return 'bg-success/10 text-success';
            case 'pending': return 'bg-warning/10 text-warning';
            case 'rejected': return 'bg-error/10 text-error';
            default: return 'bg-ghost';
        }
    };

    const filteredWorks = works.filter(w => status === 'all' || w.status === status);

    return (
        <Layout>
            <div className="bg-base-200 py-3 md:py-10 px-3 md:px-8 min-h-screen">
                <div className="max-w-5xl mx-auto space-y-4 md:space-y-10">
                    <div className="bg-base-100 p-3 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] shadow-xl border border-primary/5">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                                <div className="p-2.5 md:p-4 bg-primary text-white rounded-xl md:rounded-3xl shadow-xl shadow-primary/30 flex-shrink-0">
                                    <FaTasks size={20} className="md:size-6" />
                                </div>
                                <h1 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tight md:tracking-tighter">My <span className="text-primary uppercase">Task Prove</span></h1>
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
                        {loading ? (
                            <div className="p-20 text-center uppercase font-bold text-gray-400">Loading your tasks...</div>
                        ) : filteredWorks.length > 0 ? (
                            filteredWorks.map(work => (
                                <div key={work._id} className="bg-base-100 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-base-content/5 transition-all hover:border-primary/20">
                                    <div className="flex gap-4 items-center flex-1">
                                        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${getStatusStyle(work.status)} text-lg md:text-xl`}>
                                            {work.status === 'approved' && <FaCheckCircle />}
                                            {work.status === 'pending' && <FaClock />}
                                            {work.status === 'rejected' && <FaTimesCircle />}
                                        </div>
                                        <div>
                                            <h3 className="text-base md:text-lg font-black leading-tight">{work.job?.title || 'Unknown Job'}</h3>
                                            <p className="text-[10px] md:text-xs opacity-60">Submitted on {new Date(work.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                        <div className="text-center">
                                            <p className="text-xs opacity-50 uppercase font-black">Earnings</p>
                                            <p className="text-xl font-black text-success">${work.reward?.toFixed(3) || '0.000'}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-4 py-2 rounded-xl font-bold uppercase text-[10px] ${getStatusStyle(work.status)}`}>
                                                {work.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-base-100 p-20 rounded-3xl text-center shadow-xl border-2 border-dashed border-base-content/10">
                                <h2 className="text-2xl font-bold opacity-30">No tasks found.</h2>
                                <p className="opacity-50 font-bold uppercase text-xs mt-2">Go to dashboard and start earning!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MyWork;
