import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const DeleteRequestJobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.DELETE_REQUEST_JOBS);
            setJobs(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this job permanently?')) {
            try {
                // Assuming I have a generic delete job route for admin
                await api.delete(`${API_ENDPOINTS.ADMIN_JOBS}/${id}`);
                fetchJobs();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen uppercase">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-normal text-gray-800">Delete Request Job List</h1>
                    <div className="text-[11px] text-blue-500 lowercase">Home / All Delete Request Job List</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Delete Request Job List</div>
                    <div className="p-4 text-[11px] text-gray-600">
                        <div className="mb-4 flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                            <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                        <th className="p-3 border">ID</th>
                                        <th className="p-3 border">Title</th>
                                        <th className="p-3 border">Budget</th>
                                        <th className="p-3 border">Posted By</th>
                                        <th className="p-3 border">Status</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="6" className="p-10 text-center uppercase">Loading...</td></tr>
                                    ) : jobs?.length > 0 ? (
                                        jobs.map((job, idx) => (
                                            <tr key={job._id} className="hover:bg-gray-50">
                                                <td className="p-3 border">{idx + 1}</td>
                                                <td className="p-3 border font-bold text-gray-800">{job.title}</td>
                                                <td className="p-3 border font-bold text-blue-600">${job.budget?.toFixed(2)}</td>
                                                <td className="p-3 border font-bold text-gray-700">{job.employer?.name}</td>
                                                <td className="p-3 border text-center">
                                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-black">APPROVED</span>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <div className="flex justify-center gap-1">
                                                        <button className="bg-[#17a2b8] text-white p-1.5 rounded"><FaEdit size={10} /></button>
                                                        <button onClick={() => handleDelete(job._id)} className="bg-[#dc3545] text-white p-1.5 rounded"><FaTrash size={10} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="6" className="p-10 text-center uppercase">No delete requests available</td></tr>
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

export default DeleteRequestJobList;
