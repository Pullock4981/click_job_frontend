import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaUserPlus, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const AdminAccountManage = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ open: false, type: 'add', data: null });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        type: '', // Default empty for 'Select One'
        status: 'Active',
        image: null
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const response = await api.get(API_ENDPOINTS.ADMIN_ACCOUNTS);
            // Check for backend response structure: { success: true, data: [...] }
            const data = response.data.data || (Array.isArray(response.data) ? response.data : []);
            setAdmins(Array.isArray(data) ? data : []);
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error.message || 'Failed to fetch admins');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (type, data = null) => {
        setModal({ open: true, type, data });
        if (type === 'edit' && data) {
            setFormData({
                name: data.name,
                email: data.email,
                phone: data.phone || '',
                password: '',
                confirmPassword: '',
                type: data.type,
                status: data.status,
                image: null
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                type: '',
                status: 'Active',
                image: null
            });
        }
    };

    const handleCloseModal = () => {
        setModal({ open: false, type: 'add', data: null });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (modal.type === 'add' && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Logic to send data to backend. Use FormData for file upload.
            const dataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                dataToSend.append(key, formData[key]);
            });

            if (modal.type === 'add') {
                const response = await api.post(API_ENDPOINTS.ADMIN_ACCOUNTS, dataToSend);
                setAdmins([...admins, response.data]);
            } else {
                const response = await api.put(`${API_ENDPOINTS.ADMIN_ACCOUNTS}/${modal.data.id}`, dataToSend);
                setAdmins(admins.map(ad => ad.id === modal.data.id ? response.data : ad));
            }
            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            try {
                await api.delete(`${API_ENDPOINTS.ADMIN_ACCOUNTS}/${id}`);
                setAdmins(admins.filter(a => a.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="bg-[#28a745] text-white p-4 rounded-t-md shadow-sm flex justify-between items-center">
                    <h1 className="text-xl font-normal">All Admin</h1>
                    <button
                        onClick={() => handleOpenModal('add')}
                        className="bg-[#17a2b8] hover:bg-[#138496] text-white px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                        <FaPlus size={12} /> New Admin
                    </button>
                </div>

                <div className="bg-white rounded-b-md shadow-md p-6">
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            <strong className="font-bold">Error:</strong> {error} - Please try refreshing the page or contact support if this persists.
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="p-3 border border-gray-200 w-16">Sl</th>
                                    <th className="p-3 border border-gray-200">Name</th>
                                    <th className="p-3 border border-gray-200">Email</th>
                                    <th className="p-3 border border-gray-200">Type</th>
                                    <th className="p-3 border border-gray-200">Status</th>
                                    <th className="p-3 border border-gray-200 w-32">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-10">
                                            <span className="loading loading-spinner loading-lg text-primary"></span>
                                        </td>
                                    </tr>
                                ) : admins.length > 0 ? (
                                    admins.map((admin, index) => (
                                        <tr key={admin.id} className="hover:bg-gray-50 text-[13px] text-gray-600">
                                            <td className="p-3 border border-gray-200 align-middle font-medium">{index + 1}</td>
                                            <td className="p-3 border border-gray-200 align-middle font-medium text-gray-800">{admin.name}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{admin.email}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{admin.type}</td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white ${admin.status === 'Active' ? 'bg-[#28a745]' : 'bg-[#dc3545]'}`}>
                                                    {admin.status}
                                                </span>
                                            </td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <div className="flex gap-1.5">
                                                    <button
                                                        onClick={() => handleDelete(admin.id)}
                                                        className="bg-[#dc3545] text-white w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-red-700 transition-colors shadow-sm"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={13} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenModal('edit', admin)}
                                                        className="bg-[#28a745] text-white w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-green-700 transition-colors shadow-sm"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-20 text-gray-500">
                                            No admins found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-[800px] mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header matching screenshot */}
                        <div className="px-6 py-4 flex justify-between items-center bg-[#28a745] text-white">
                            <div className="flex items-center gap-2">
                                <FaUserPlus size={20} />
                                <h3 className="text-lg font-normal">{modal.type === 'add' ? 'New Admin' : 'Edit Admin'}</h3>
                            </div>
                            <button onClick={handleCloseModal} className="text-white/80 hover:text-white font-bold text-xl transition-colors">&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Admin Type */}
                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Admin Type</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-[4px] px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="">---Select One---</option>
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter User Name"
                                        className="w-full border border-gray-300 rounded-[4px] px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter Role email"
                                        className="w-full border border-gray-300 rounded-[4px] px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Phone</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Phone Number" // Adjusted placeholder
                                        className="w-full border border-gray-300 rounded-[4px] px-3 py-2.5 text-sm bg-blue-50/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Min 6 characters"
                                        className="w-full border border-gray-300 rounded-[4px] px-3 py-2.5 text-sm bg-blue-50/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter Confirm Password"
                                        className="w-full border border-gray-300 rounded-[4px] px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Image</label>
                                    <div className="flex">
                                        <div className="flex-1 border border-gray-300 border-r-0 rounded-l-[4px] px-3 py-2.5 text-sm text-gray-500 bg-white">
                                            {formData.image ? formData.image.name : 'Choose file'}
                                        </div>
                                        <label className="bg-gray-200 border border-gray-300 text-gray-700 px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-gray-300 transition-colors">
                                            Browse
                                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                        </label>
                                        <button type="button" className="bg-[#e9ecef] border border-l-0 border-gray-300 text-gray-700 px-4 py-2.5 text-sm font-medium rounded-r-[4px] hover:bg-gray-300 transition-colors">
                                            Upload
                                        </button>
                                    </div>
                                    {/* Preview if any */}
                                    {formData.image && (
                                        <div className="mt-2">
                                            <span className="text-xs text-green-600">Selected: {formData.image.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-8 flex justify-between items-center border-t border-gray-100 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-[4px] text-sm font-medium hover:bg-gray-50 transition-colors bg-white shadow-sm"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2.5 bg-[#007bff] text-white rounded-[4px] text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminAccountManage;
