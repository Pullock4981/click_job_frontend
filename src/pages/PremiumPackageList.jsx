import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaPlus, FaEdit, FaSave } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const PremiumPackageList = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', duration: 0, cost: 0, feature: '' });
    const [features, setFeatures] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.PREMIUM_PACKAGES);
            setPackages(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setPackages([]);
        } finally {
            setLoading(false);
        }
    };

    const addFeature = () => {
        if (formData.feature.trim()) {
            setFeatures([...features, formData.feature.trim()]);
            setFormData({ ...formData, feature: '' });
        }
    };

    const removeFeature = (index) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const payload = {
                name: formData.name,
                duration: formData.duration,
                cost: formData.cost,
                features: features
            };
            await api.post(API_ENDPOINTS.PREMIUM_PACKAGES, payload);
            setFormData({ name: '', duration: 0, cost: 0, feature: '' });
            setFeatures([]);
            fetchPackages();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this package?')) {
            try {
                await api.delete(`${API_ENDPOINTS.PREMIUM_PACKAGES}/${id}`);
                fetchPackages();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Premium Package</h1>
                    <div className="text-xs text-blue-500">Home / All Packages</div>
                </div>

                {/* New Package Form */}
                <div className="bg-white rounded shadow-md overflow-hidden mb-6">
                    <div className="bg-[#007bff] text-white p-3 font-bold text-sm">New Package</div>
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <div>
                                <label className="block text-xs font-bold mb-1">Name</label>
                                <input type="text" placeholder="Enter name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Duration (Days)</label>
                                <input type="number" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Cost</label>
                                <input type="number" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-bold mb-1">Feature</label>
                            <div className="flex gap-2">
                                <input type="text" value={formData.feature} onChange={e => setFormData({ ...formData, feature: e.target.value })} className="flex-1 border rounded p-2 text-sm" placeholder="Enter feature" />
                                <button type="button" onClick={addFeature} className="bg-[#17a2b8] text-white px-3 py-1 rounded text-xs font-bold">New</button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {features.map((f, i) => (
                                    <span key={i} className="bg-gray-100 text-[10px] px-2 py-1 rounded-full flex items-center gap-2">
                                        {f} <button type="button" onClick={() => removeFeature(i)} className="text-red-500"><FaTrash size={8} /></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button type="submit" disabled={submitting} className="bg-[#28a745] text-white px-6 py-2 rounded text-xs font-bold flex items-center gap-1 shadow-md">
                            <FaSave /> {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>

                {/* Package List Table */}
                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Packages</div>
                    <div className="p-4">
                        <div className="mb-4 flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                            <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                        <th className="p-3 border">Name</th>
                                        <th className="p-3 border">Duration</th>
                                        <th className="p-3 border">Cost</th>
                                        <th className="p-3 border">Features</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs text-gray-600">
                                    {loading ? (
                                        <tr><td colSpan="5" className="p-10 text-center">Loading...</td></tr>
                                    ) : packages?.length > 0 ? (
                                        packages.map((pkg) => (
                                            <tr key={pkg._id} className="hover:bg-gray-50">
                                                <td className="p-3 border font-medium text-blue-600">{pkg.name}</td>
                                                <td className="p-3 border">{pkg.duration} days</td>
                                                <td className="p-3 border font-bold">{pkg.cost} $</td>
                                                <td className="p-3 border">
                                                    <ol className="list-decimal list-inside space-y-1">
                                                        {pkg.features?.map((f, idx) => (
                                                            <li key={idx}>{f}</li>
                                                        ))}
                                                    </ol>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <div className="flex justify-center gap-1">
                                                        <button className="bg-[#17a2b8] text-white p-1.5 rounded"><FaEdit size={10} /></button>
                                                        <button onClick={() => handleDelete(pkg._id)} className="bg-[#dc3545] text-white p-1.5 rounded"><FaTrash size={10} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="p-10 text-center">No data available in table</td></tr>
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

export default PremiumPackageList;
