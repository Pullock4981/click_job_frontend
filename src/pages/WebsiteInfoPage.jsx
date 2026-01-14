import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';

const WebsiteInfoPage = () => {
    const [info, setInfo] = useState({
        applicationTitle: '',
        siteEmail: '',
        mobileNo: '',
        phoneNo: '',
        rejectRatio: 100,
        userBlockRatio: 0,
        minimumJobCost: 0.01,
        minWorkerAds: 5,
        minDurationAds: 5,
        minCostPerWorkerAds: 0.001,
        minCostPerDurationAds: 0.001,
        referralDepositCommission: 0,
        referralEarningCommission: 0,
        lotterySystem: 'Active',
        instantVerify: 'Inactive',
        needUserVerification: 'No',
        workAutoApprove: 24,
        referralNotice: '',
        lotteryNotice: '',
        instantDepositNote: '',
        accountVerifyNote: '',
        description: '',
        metaKeyword: '',
        metaDescription: '',
        address: '',
        googleMap: '',
        favicon: '',
        logo: '',
        facebookGroup: '',
        youtube: '',
        telegram: ''
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.WEBSITE_INFO);
            if (res.data?.data) setInfo(res.data.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            await api.put(API_ENDPOINTS.WEBSITE_INFO, info);
            toast.success('Website info updated successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update info');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <AdminLayout><div className="p-10 text-center">Loading...</div></AdminLayout>;

    const InputField = ({ label, value, field, type = "text", step }) => (
        <div className="w-full">
            <label className="block text-xs font-bold mb-1.5 uppercase text-gray-700">{label}</label>
            <input
                type={type}
                step={step}
                value={value}
                onChange={e => setInfo({ ...info, [field]: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
        </div>
    );

    const SelectField = ({ label, value, field, options }) => (
        <div className="w-full">
            <label className="block text-xs font-bold mb-1.5 uppercase text-gray-700">{label}</label>
            <select
                value={value}
                onChange={e => setInfo({ ...info, [field]: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );

    const TextareaField = ({ label, value, field, rows = 3 }) => (
        <div className="w-full">
            <label className="block text-xs font-bold mb-1.5 uppercase text-gray-700">{label}</label>
            <textarea
                rows={rows}
                value={value}
                onChange={e => setInfo({ ...info, [field]: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
        </div>
    );

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Website Info</h1>
                    <div className="text-xs text-blue-500">Home / Update Info</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm tracking-wide">Website Info Update</div>
                    <form onSubmit={handleUpdate} className="p-6 space-y-8">
                        {/* Section 1: Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <InputField label="Application Title" value={info.applicationTitle} field="applicationTitle" />
                            <InputField label="Site Email" value={info.siteEmail} field="siteEmail" type="email" />
                            <InputField label="Mobile No." value={info.mobileNo} field="mobileNo" />
                            <InputField label="Phone No." value={info.phoneNo} field="phoneNo" />
                            <InputField label="Reject Ratio" value={info.rejectRatio} field="rejectRatio" type="number" />
                            <InputField label="User Block Ratio" value={info.userBlockRatio} field="userBlockRatio" type="number" />
                            <InputField label="Minimum Job Cost" value={info.minimumJobCost} field="minimumJobCost" type="number" step="0.01" />
                        </div>

                        {/* Section 2: Ads Settings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-gray-100">
                            <InputField label="Minimum Worker for Ads" value={info.minWorkerAds} field="minWorkerAds" type="number" />
                            <InputField label="Minimum Duration for Ads" value={info.minDurationAds} field="minDurationAds" type="number" />
                            <InputField label="Minimum Cost Per Worker for Ads" value={info.minCostPerWorkerAds} field="minCostPerWorkerAds" type="number" step="0.001" />
                            <InputField label="Min Cost Per Duration (Sec) for Ads" value={info.minCostPerDurationAds} field="minCostPerDurationAds" type="number" step="0.001" />
                        </div>

                        {/* Section 3: Commissions & Logic */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                            <InputField label="Referral Deposit Commision" value={info.referralDepositCommission} field="referralDepositCommission" type="number" />
                            <InputField label="Referral Earning Commision" value={info.referralEarningCommission} field="referralEarningCommission" type="number" />
                            <SelectField label="Lottery System" value={info.lotterySystem} field="lotterySystem" options={['Active', 'Inactive']} />
                            <SelectField label="Instant Verfy" value={info.instantVerify} field="instantVerify" options={['Active', 'Inactive']} />
                            <SelectField label="Need User Verification" value={info.needUserVerification} field="needUserVerification" options={['Yes', 'No']} />
                            <InputField label="Work Auto Approve (Hours)" value={info.workAutoApprove} field="workAutoApprove" type="number" />
                        </div>

                        {/* Section 4: Notices */}
                        <div className="space-y-6 pt-4 border-t border-gray-100">
                            <TextareaField label="Referral Notice" value={info.referralNotice} field="referralNotice" />
                            <TextareaField label="Lottery Notice" value={info.lotteryNotice} field="lotteryNotice" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextareaField label="Instant Deposit Note" value={info.instantDepositNote} field="instantDepositNote" />
                                <TextareaField label="Account Verify Note" value={info.accountVerifyNote} field="accountVerifyNote" />
                            </div>
                        </div>

                        {/* Section 5: Metadata & Address */}
                        <div className="space-y-6 pt-4 border-t border-gray-100">
                            <TextareaField label="Description" value={info.description} field="description" rows={2} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextareaField label="Meta Keyword" value={info.metaKeyword} field="metaKeyword" rows={2} />
                                <TextareaField label="Meta Description" value={info.metaDescription} field="metaDescription" rows={2} />
                                <TextareaField label="Address" value={info.address} field="address" rows={2} />
                                <TextareaField label="Google Map (Embed Link/HTML)" value={info.googleMap} field="googleMap" rows={2} />
                            </div>
                        </div>

                        {/* Section 6: Assets */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase text-gray-700">Old Favicon Image</label>
                                {info.favicon ? (
                                    <img src={info.favicon} alt="Favicon" className="w-12 h-12 border p-1 rounded bg-gray-50 object-contain" />
                                ) : (
                                    <div className="w-12 h-12 border border-dashed rounded flex items-center justify-center text-gray-400 text-[10px]">No Image</div>
                                )}
                                <InputField label="Favicon URL" value={info.favicon} field="favicon" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase text-gray-700">Old Logo Image</label>
                                {info.logo ? (
                                    <img src={info.logo} alt="Logo" className="h-12 border p-1 rounded bg-gray-50 object-contain max-w-[200px]" />
                                ) : (
                                    <div className="w-24 h-12 border border-dashed rounded flex items-center justify-center text-gray-400 text-[10px]">No Logo</div>
                                )}
                                <InputField label="Logo URL" value={info.logo} field="logo" />
                            </div>
                        </div>

                        {/* Section 7: Social */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100 pb-4">
                            <InputField label="Facebook Group" value={info.facebookGroup} field="facebookGroup" />
                            <InputField label="Youtube" value={info.youtube} field="youtube" />
                            <InputField label="Telegram" value={info.telegram} field="telegram" />
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={updating}
                                className="bg-[#28a745] text-white px-8 py-2.5 rounded text-xs font-bold shadow-md uppercase hover:bg-green-600 transition-all flex items-center gap-2"
                            >
                                {updating ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default WebsiteInfoPage;
