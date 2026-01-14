import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { FaClock, FaCheckCircle, FaExclamationTriangle, FaCloudUploadAlt, FaArrowLeft, FaTimesCircle } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, refreshUser } = useAuth();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Work submission states
    const [proofText, setProofText] = useState('');
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchJobDetail();
    }, [id]);

    const fetchJobDetail = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/jobs/${id}`);
            if (res.success) {
                setJob(res.data.job);
            }
        } catch (err) {
            toast.error('Job not found');
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + files.length > (job?.requiredScreenshots || 1)) {
            toast.error(`Only ${job?.requiredScreenshots || 1} screenshots allowed`);
            return;
        }
        setFiles([...files, ...selectedFiles]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmitWork = async (e) => {
        e.preventDefault();
        if (submitting) return;

        if (!proofText && job?.requiredScreenshots === 0) {
            toast.error('Please provide some proof');
            return;
        }

        if (files.length < (job?.requiredScreenshots || 0)) {
            toast.error(`Please upload at least ${job?.requiredScreenshots} screenshots`);
            return;
        }

        try {
            setSubmitting(true);

            // Upload multiple files
            let screenshotUrls = [];
            if (files.length > 0) {
                toast.loading('Uploading screenshots...', { id: 'submit-work' });
                const uploadRes = await api.upload('/upload/multiple', files, 'files');
                if (uploadRes.success) {
                    screenshotUrls = uploadRes.data.urls;
                }
            }

            const res = await api.post(`/works/${id}/submit`, {
                submissionMessage: proofText,
                submissionProof: screenshotUrls[0] || '', // Using first as main proof if field expects string
                submissionFiles: screenshotUrls
            });

            if (res.success) {
                toast.success('Work submitted successfully!', { id: 'submit-work' });
                refreshUser();
                navigate('/my-work/tasks');
            }
        } catch (err) {
            toast.error(err.message || 'Submission failed', { id: 'submit-work' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-base-900">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        </Layout>
    );

    if (!job) return null;

    return (
        <Layout showFooter={true}>
            <div className="bg-base-200 dark:bg-base-900 min-h-screen pb-20 transition-colors duration-300">
                {/* Header Section */}
                <div className="bg-primary dark:bg-primary/80 h-48 md:h-64 w-full relative flex items-center px-4 md:px-12 shadow-lg">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-circle btn-ghost text-white absolute top-4 left-4 hover:bg-white/20"
                    >
                        <FaArrowLeft />
                    </button>
                    <div className="text-white mt-10 w-full max-w-6xl mx-auto">
                        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2 text-white">{job.title}</h1>
                        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest opacity-90">
                            <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">JobID: #{job._id.substring(0, 8)}</span>
                            <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">Category: {job.category}</span>
                            <span className="bg-[#AAF4DB] text-[#0D7A5C] px-3 py-1 rounded-lg font-black border border-[#0D7A5C]/20">Earn: ${job.workerEarn?.toFixed(3)}</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-10 md:-mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                    {/* Left: Job Info */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-base-100 dark:bg-[#1E293B] rounded-[2rem] shadow-xl p-6 md:p-12 border border-base-content/5 dark:border-white/5 transition-colors">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#2c3e50] dark:text-white mb-8 border-b border-base-200 dark:border-white/10 pb-4">
                                Job Instructions
                            </h2>
                            <div className="space-y-6">
                                {job.taskInstructions?.map((inst, idx) => (
                                    <div key={idx} className="flex gap-6 items-start group">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-content flex items-center justify-center font-black shrink-0 transition-transform group-hover:scale-110">
                                            {idx + 1}
                                        </div>
                                        <p className="text-sm md:text-base font-medium text-base-content/80 dark:text-gray-300 leading-relaxed pt-2">
                                            {inst}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-3xl border border-yellow-200 dark:border-yellow-700/30 flex gap-4">
                                <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-500 shrink-0 text-xl" />
                                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200 italic">
                                    Warning: Submitting fake proofs will lead to permanent account suspension. Make sure to follow all steps carefully.
                                </p>
                            </div>
                        </div>

                        {/* Submission Form */}
                        <div className="bg-base-100 dark:bg-[#1E293B] rounded-[2rem] shadow-xl p-6 md:p-12 border border-base-content/5 dark:border-white/5 transition-colors">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#2c3e50] dark:text-white mb-8 border-b border-base-200 dark:border-white/10 pb-4">
                                Submit Work Proof
                            </h2>
                            <form onSubmit={handleSubmitWork} className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 dark:text-gray-400 mb-4 ml-1">Type your proof details</label>
                                    <textarea
                                        className="w-full bg-base-200 dark:bg-base-900 border-none rounded-2xl p-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none min-h-[150px] transition-colors dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600"
                                        placeholder="Enter usernames, email or specific text proofs mentioned in instructions..."
                                        value={proofText}
                                        onChange={(e) => setProofText(e.target.value)}
                                        required={job.requiredScreenshots === 0}
                                    ></textarea>
                                </div>

                                {job.requiredScreenshots > 0 && (
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 dark:text-gray-400 mb-4 ml-1">
                                            Upload Screenshots ({files.length}/{job.requiredScreenshots})
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                            {files.map((file, idx) => (
                                                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group border-2 border-primary/20 dark:border-primary/40 bg-base-200 dark:bg-base-900">
                                                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(idx)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                    >
                                                        <FaTimesCircle />
                                                    </button>
                                                </div>
                                            ))}
                                            {files.length < job.requiredScreenshots && (
                                                <label className="aspect-video rounded-xl border-2 border-dashed border-base-content/20 dark:border-white/20 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-base-200 dark:hover:bg-base-800 transition-all bg-base-100 dark:bg-transparent">
                                                    <FaCloudUploadAlt className="text-3xl text-primary/40 dark:text-primary/60" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-base-content/40 dark:text-gray-500">Upload Screenshot</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`w-full btn btn-primary btn-lg rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-4 transition-all text-white ${submitting ? 'loading' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                                >
                                    {submitting ? 'Submitting Proof...' : 'Submit Work Proof'}
                                    {!submitting && <FaCheckCircle />}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right: User/Stats */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-base-100 dark:bg-[#1E293B] rounded-[2rem] shadow-xl p-8 border border-base-content/5 dark:border-white/5 transition-colors sticky top-24">
                            <div className="text-center mb-8">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/40 dark:text-gray-400 mb-10">Reward Amount</p>
                                <h3 className="text-[60px] font-black text-primary leading-none tracking-tighter mb-2">${job.workerEarn?.toFixed(3)}</h3>
                                <p className="text-[10px] font-black text-success uppercase tracking-[0.2em] bg-success/10 py-1 px-2 rounded inline-block">Guaranteed Payment</p>
                            </div>

                            <div className="h-px bg-base-200 dark:bg-white/10 w-full mb-8"></div>

                            <div className="space-y-6 dark:text-gray-300">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-base-content/40 dark:text-gray-500 uppercase tracking-widest">Available Spots</span>
                                    <span className="font-black text-base-content dark:text-gray-200">{(job.workerNeed || 0) - (job.currentParticipants || 0)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-base-content/40 dark:text-gray-500 uppercase tracking-widest">Time to finish</span>
                                    <span className="font-black text-base-content dark:text-gray-200">Within {job.estimatedDays || 1} Days</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-base-content/40 dark:text-gray-500 uppercase tracking-widest">Proof Needed</span>
                                    <span className="font-black text-base-content dark:text-gray-200">{job.requiredScreenshots} Screenshot(s)</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-base-content/40 dark:text-gray-500 uppercase tracking-widest">Your ID</span>
                                    <span className="font-black text-primary">#{user?.numericId}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#67B1E6] dark:bg-[#2c5282] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group hidden md:block">
                            <FaClock className="absolute -right-10 -bottom-10 size-40 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                            <div className="relative">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-8">Approval Rate</p>
                                <h4 className="text-5xl font-black tracking-tight mb-4">98.5%</h4>
                                <p className="text-[11px] font-bold opacity-80 leading-relaxed uppercase tracking-wider">Most workers get paid within 24 hours of submission.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default JobDetail;
