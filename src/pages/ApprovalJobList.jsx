import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const ApprovalJobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.APPROVAL_JOBS);
            // api.js interceptor unwraps response, so res IS the body { success: true, data: [...] }
            setJobs(res.data || []);
        } catch (err) {
            console.error(err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (window.confirm('Approve this job?')) {
            try {
                await api.put(`${API_ENDPOINTS.APPROVAL_JOBS.replace('/approval', '/approve')}/${id}`);
                fetchJobs();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleReject = async (id) => {
        const reason = window.prompt('Enter rejection reason:');
        if (reason) {
            try {
                await api.put(`${API_ENDPOINTS.APPROVAL_JOBS.replace('/approval', '/reject')}/${id}`, { reason });
                fetchJobs();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-normal text-gray-800 uppercase">Approval Job List</h1>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">Approval Job List</div>
                    <div className="p-4">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700 uppercase">
                                        <th className="p-3 border">ID</th>
                                        <th className="p-3 border">Title</th>
                                        <th className="p-3 border">Category</th>
                                        <th className="p-3 border">Budget</th>
                                        <th className="p-3 border">Employer</th>
                                        <th className="p-3 border">Status</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] text-gray-600">
                                    {loading ? (
                                        <tr><td colSpan="7" className="p-10 text-center uppercase">Loading...</td></tr>
                                    ) : jobs?.length > 0 ? (
                                        jobs.map((job, idx) => (
                                            <tr key={job._id} className="hover:bg-gray-50 border-b">
                                                <td className="p-3 border">{idx + 1}</td>
                                                <td className="p-3 border font-bold text-blue-600 max-w-[200px] truncate">{job.title}</td>
                                                <td className="p-3 border uppercase">{job.category}</td>
                                                <td className="p-3 border font-bold text-green-600">${job.budget?.toFixed(2)}</td>
                                                <td className="p-3 border">
                                                    <div>{job.employer?.name}</div>
                                                    <div className="text-[9px] text-gray-400 lowercase">{job.employer?.email}</div>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold uppercase">Pending</span>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <div className="flex justify-center gap-1">
                                                        <button onClick={() => handleApprove(job._id)} className="bg-[#28a745] text-white p-1.5 rounded" title="Approve"><FaCheck size={10} /></button>
                                                        <button onClick={() => handleReject(job._id)} className="bg-[#dc3545] text-white p-1.5 rounded" title="Reject"><FaTimes size={10} /></button>
                                                        <button className="bg-[#17a2b8] text-white p-1.5 rounded" title="View"><FaEye size={10} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="7" className="p-10 text-center uppercase">No pending jobs for approval</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ApprovalJobList;
