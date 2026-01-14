import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FaCheck, FaTimes, FaEye, FaArrowLeft, FaUserAlt } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const JobWorkReview = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWork, setSelectedWork] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployerWorks();
    }, []);

    const fetchEmployerWorks = async () => {
        try {
            setLoading(true);
            const res = await api.get('/works/employer');
            if (res.success) {
                setWorks(res.data.data || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const res = await api.put(`/works/${id}/approve`, { rating: 5, feedback: 'Great work!' });
            if (res.success) {
                toast.success('Work approved and worker paid!');
                fetchEmployerWorks();
                setSelectedWork(null);
            }
        } catch (err) {
            toast.error(err.message || 'Approval failed');
        }
    };

    const handleReject = async (id) => {
        const reason = window.prompt('Enter rejection reason:');
        if (!reason) return;
        try {
            const res = await api.put(`/works/${id}/reject`, { feedback: reason });
            if (res.success) {
                toast.success('Work rejected');
                fetchEmployerWorks();
                setSelectedWork(null);
            }
        } catch (err) {
            toast.error(err.message || 'Rejection failed');
        }
    };

    return (
        <Layout showFooter={true}>
            <div className="bg-[#1e60d5] h-48 md:h-64 w-full relative flex items-center px-4 md:px-12">
                <button
                    onClick={() => navigate('/my-jobs')}
                    className="btn btn-circle btn-ghost text-white absolute top-4 left-4"
                >
                    <FaArrowLeft />
                </button>
                <h1 className="text-2xl md:text-3xl font-black text-white mt-10 uppercase tracking-tighter">Review Task Proofs</h1>
            </div>

            <div className="mx-auto px-4 md:px-8 -mt-24 relative z-10 pb-20">
                <div className="bg-white dark:bg-base-900 rounded-xl shadow-2xl overflow-hidden border border-base-200 dark:border-white/5">
                    <div className="p-6 md:p-8">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#f8fafc] dark:bg-base-800/50 border-b border-gray-100 dark:border-white/10">
                                    <tr className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                                        <th className="px-4 py-4 uppercase">Worker</th>
                                        <th className="px-4 py-4 uppercase">Job Title</th>
                                        <th className="px-4 py-4 text-center uppercase">Price</th>
                                        <th className="px-4 py-4 text-center uppercase">Status</th>
                                        <th className="px-4 py-4 text-center uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                    {loading ? (
                                        <tr><td colSpan="5" className="p-10 text-center font-bold text-gray-400 uppercase">Loading submissions...</td></tr>
                                    ) : works.length > 0 ? (
                                        works.map((work) => (
                                            <tr key={work._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs"><FaUserAlt /></div>
                                                        <div>
                                                            <div className="text-xs font-bold text-gray-800 dark:text-white uppercase">{work.worker?.name}</div>
                                                            <div className="text-[9px] text-gray-400">ID: #{work.worker?.numericId}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-xs font-medium text-gray-800 dark:text-white truncate max-w-[200px]">
                                                    {work.job?.title}
                                                </td>
                                                <td className="px-4 py-4 text-xs text-center font-black text-emerald-600">
                                                    ${work.paymentAmount?.toFixed(3)}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${work.status === 'approved' ? 'bg-green-100 text-green-700' : work.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                        {work.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => setSelectedWork(work)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded transition-colors"
                                                            title="View Proof"
                                                        >
                                                            <FaEye size={12} />
                                                        </button>
                                                        {work.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(work._id)}
                                                                    className="bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded transition-colors"
                                                                    title="Approve"
                                                                >
                                                                    <FaCheck size={12} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(work._id)}
                                                                    className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded transition-colors"
                                                                    title="Reject"
                                                                >
                                                                    <FaTimes size={12} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="p-10 text-center uppercase font-bold text-gray-400">No work submissions to review</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Proof Modal */}
            {selectedWork && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-base-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-primary text-white">
                            <h3 className="text-xl font-black uppercase tracking-tight">Review Work Proof</h3>
                            <button onClick={() => setSelectedWork(null)} className="text-white/60 hover:text-white transition-colors"><FaTimes size={24} /></button>
                        </div>
                        <div className="p-8 max-h-[70vh] overflow-y-auto space-y-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Proof Text</label>
                                <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl text-sm font-medium border border-gray-100 dark:border-white/5">
                                    {selectedWork.submissionProof || 'No text proof provided.'}
                                </div>
                            </div>

                            {selectedWork.submissionFiles?.length > 0 && (
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Screenshots</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        {selectedWork.submissionFiles.map((file, i) => (
                                            <a key={i} href={file} target="_blank" rel="noreferrer" className="block rounded-xl overflow-hidden border border-gray-100 dark:border-white/5 hover:scale-[1.02] transition-transform">
                                                <img src={file} alt={`Proof ${i + 1}`} className="w-full h-auto" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-8 bg-gray-50 dark:bg-white/5 flex gap-4">
                            <button
                                onClick={() => handleApprove(selectedWork._id)}
                                className="flex-1 btn btn-primary flex items-center gap-2 uppercase font-black"
                            >
                                <FaCheck /> Approve & Pay
                            </button>
                            <button
                                onClick={() => handleReject(selectedWork._id)}
                                className="flex-1 btn btn-error text-white flex items-center gap-2 uppercase font-black"
                            >
                                <FaTimes /> Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default JobWorkReview;
