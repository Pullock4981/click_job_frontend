import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';

const SpinSettingPage = () => {
    const [settings, setSettings] = useState({
        parts: Array(7).fill({ bg: '#ffffff', mark: 0 }),
        dailyMaxSpin: 0,
        status: 'Active'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.SPIN_SETTINGS);
            if (res.data?.data) {
                // Ensure there are 7 parts
                const parts = res.data.data.parts || [];
                while (parts.length < 7) parts.push({ bg: '#ffffff', mark: 0 });
                setSettings({ ...res.data.data, parts: parts.slice(0, 7) });
            }
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handlePartChange = (index, field, value) => {
        const newParts = [...settings.parts];
        newParts[index] = { ...newParts[index], [field]: value };
        setSettings({ ...settings, parts: newParts });
    };

    const handleUpdate = async () => {
        try {
            await api.put(API_ENDPOINTS.SPIN_SETTINGS, settings);
            toast.success('Spin settings updated');
        } catch (err) {
            console.error(err);
            toast.error('Update failed');
        }
    };

    if (loading) return <AdminLayout><div className="p-10 text-center">Loading...</div></AdminLayout>;

    const partNames = ["One", "Two", "Three", "Four", "Five", "Six", "Seven"];

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Spin Setting</h1>
                    <div className="text-xs text-blue-500">Home / Color Setup</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">System Color Setup</div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            {settings.parts.map((part, idx) => (
                                <React.Fragment key={idx}>
                                    <div>
                                        <label className="block text-xs font-bold mb-1">Part {partNames[idx]} BG:</label>
                                        <input
                                            type="text"
                                            value={part.bg}
                                            onChange={e => handlePartChange(idx, 'bg', e.target.value)}
                                            className="w-full border rounded p-2 text-sm focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1">Part {partNames[idx]} Mark:</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            value={part.mark}
                                            onChange={e => handlePartChange(idx, 'mark', e.target.value)}
                                            className="w-full border rounded p-2 text-sm focus:outline-none"
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                            <div>
                                <label className="block text-xs font-bold mb-1">Daily Maximum Spin :</label>
                                <input
                                    type="number"
                                    value={settings.dailyMaxSpin}
                                    onChange={e => setSettings({ ...settings, dailyMaxSpin: e.target.value })}
                                    className="w-full border rounded p-2 text-sm focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Status</label>
                                <select
                                    value={settings.status}
                                    onChange={e => setSettings({ ...settings, status: e.target.value })}
                                    className="w-full border rounded p-2 text-sm focus:outline-none"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleUpdate}
                            className="bg-[#28a745] text-white px-6 py-2 rounded text-xs font-bold shadow-md flex items-center gap-2 hover:bg-green-600 uppercase"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SpinSettingPage;
