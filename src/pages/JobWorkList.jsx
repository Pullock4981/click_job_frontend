import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const JobWorkList = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorks();
    }, []);

    const fetchWorks = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.JOB_WORKS);
            setWorks(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setWorks([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-normal text-gray-800">Worked Job List</h1>
                    <div className="text-[11px] text-blue-500 lowercase">Home / All Worked Job List</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Worked Job List</div>
                    <div className="p-4 text-[11px]">
                        <div className="mb-4 flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                            <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                        <th className="p-3 border">#Task ID</th>
                                        <th className="p-3 border">Worker</th>
                                        <th className="p-3 border">Job Owner</th>
                                        <th className="p-3 border">Title</th>
                                        <th className="p-3 border text-center">Verify Work</th>
                                        <th className="p-3 border text-center">Status</th>
                                        <th className="p-3 border">Date Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="7" className="p-10 text-center uppercase">Loading...</td></tr>
                                    ) : works?.length > 0 ? (
                                        works.map((work, idx) => (
                                            <tr key={work._id} className="hover:bg-gray-50 border-b">
                                                <td className="p-3 border">{idx + 10}</td>
                                                <td className="p-3 border">
                                                    <div className="font-bold text-blue-600">{work.worker?.name}</div>
                                                    <div className="text-[9px] text-gray-400">({work.worker?._id?.substring(0, 8)})</div>
                                                </td>
                                                <td className="p-3 border">
                                                    <div className="font-bold text-gray-700 lowercase">{work.employer?.name || 'N/A'}</div>
                                                    <div className="text-[9px] text-gray-400">(JobID: {work.job?._id?.substring(0, 8)})</div>
                                                </td>
                                                <td className="p-3 border font-bold text-gray-800">{work.job?.title}</td>
                                                <td className="p-3 border text-center">
                                                    <button className="bg-[#dc3545] text-white px-3 py-1 rounded text-[10px] font-bold">Verify</button>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${work.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                        {work.status === 'approved' ? 'Satisfied' : work.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 border text-gray-500">
                                                    {new Date(work.createdAt).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="7" className="p-10 text-center uppercase">No worked jobs available</td></tr>
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

export default JobWorkList;
