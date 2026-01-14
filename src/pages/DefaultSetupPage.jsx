import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';

const DefaultSetupPage = () => {
    const [settings, setSettings] = useState({
        welcomeBonus: 0,
        dollarRate: 0,
        jobFeePercentage: 0,
        withdrawFee: 0,
        withdrawMinimum: 0,
        adminMainWallet: 0,
        screenshotCharge: 0,
        screenshotChargeStatus: 'Active'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.APP_SETTINGS);
            if (res.data?.data) setSettings(res.data.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleUpdate = async (fieldGroups) => {
        try {
            const dataToUpdate = {};
            fieldGroups.forEach(field => {
                dataToUpdate[field] = settings[field];
            });
            await api.put(API_ENDPOINTS.APP_SETTINGS, dataToUpdate);
            toast.success('Settings updated successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update settings');
        }
    };

    if (loading) return <AdminLayout><div className="p-10 text-center">Loading...</div></AdminLayout>;

    const Card = ({ title, children, fields }) => (
        <div className="bg-white rounded shadow-sm overflow-hidden border border-gray-100 h-full">
            <div className="bg-[#007bff] text-white p-3 font-bold text-sm">{title}</div>
            <div className="p-4 space-y-4">
                {children}
                <button
                    onClick={() => handleUpdate(fields)}
                    className="bg-[#28a745] text-white px-4 py-1.5 rounded text-xs font-bold shadow-sm hover:bg-green-600 transition-colors"
                >
                    Update
                </button>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Default Setup</h1>
                    <div className="text-xs text-blue-500">Home / All Default Setup</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Welcome Bonus */}
                    <Card title="Welcome Bonus" fields={['welcomeBonus']}>
                        <div>
                            <label className="block text-xs font-bold mb-1">Bonus($)</label>
                            <input
                                type="number"
                                value={settings.welcomeBonus}
                                onChange={e => setSettings({ ...settings, welcomeBonus: e.target.value })}
                                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </Card>

                    {/* Dollar Rate */}
                    <Card title="Dollar Rate" fields={['dollarRate']}>
                        <div>
                            <label className="block text-xs font-bold mb-1">Rate(BDT)</label>
                            <input
                                type="number"
                                value={settings.dollarRate}
                                onChange={e => setSettings({ ...settings, dollarRate: e.target.value })}
                                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </Card>

                    {/* Per Job Fee */}
                    <Card title="Per Job Fee" fields={['jobFeePercentage']}>
                        <div>
                            <label className="block text-xs font-bold mb-1">Fee(%)</label>
                            <input
                                type="number"
                                value={settings.jobFeePercentage}
                                onChange={e => setSettings({ ...settings, jobFeePercentage: e.target.value })}
                                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </Card>

                    {/* Balance Withdraw Setup */}
                    <Card title="Balance Withdraw Setup" fields={['withdrawFee', 'withdrawMinimum']}>
                        <div>
                            <label className="block text-xs font-bold mb-1">Fee</label>
                            <input
                                type="number"
                                value={settings.withdrawFee}
                                onChange={e => setSettings({ ...settings, withdrawFee: e.target.value })}
                                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
                            />
                            <label className="block text-xs font-bold mb-1">Minimum($)</label>
                            <input
                                type="number"
                                value={settings.withdrawMinimum}
                                onChange={e => setSettings({ ...settings, withdrawMinimum: e.target.value })}
                                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </Card>

                    {/* Admin Main Wallet */}
                    <Card title="Admin Main Wallet" fields={['adminMainWallet']}>
                        <div>
                            <label className="block text-xs font-bold mb-1">Main Balance</label>
                            <input
                                type="number"
                                value={settings.adminMainWallet}
                                onChange={e => setSettings({ ...settings, adminMainWallet: e.target.value })}
                                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </Card>

                    {/* Screenshot Charge Setup */}
                    <Card title="Screenshoot Charge Setup" fields={['screenshotCharge', 'screenshotChargeStatus']}>
                        <div>
                            <label className="block text-xs font-bold mb-1">Fee</label>
                            <input
                                type="number"
                                step="0.001"
                                value={settings.screenshotCharge}
                                onChange={e => setSettings({ ...settings, screenshotCharge: e.target.value })}
                                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
                            />
                            <label className="block text-xs font-bold mb-1">Status</label>
                            <select
                                value={settings.screenshotChargeStatus}
                                onChange={e => setSettings({ ...settings, screenshotChargeStatus: e.target.value })}
                                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DefaultSetupPage;
