import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaSave, FaTimes, FaEnvelope, FaComments, FaShareAlt, FaFacebook, FaTelegram, FaInstagram } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const ContactInfoManage = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        emailSupport: '',
        liveChat: { time: '', details: '' },
        socialMedia: { facebook: '', telegram: '', instagram: '' }
    });

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        try {
            setLoading(true);
            const response = await api.get(API_ENDPOINTS.CONTACT_INFO);
            const data = response.data.data;
            setInfo(data);
            setFormData({
                title: data.title,
                description: data.description,
                emailSupport: data.emailSupport,
                liveChat: data.liveChat,
                socialMedia: data.socialMedia
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(API_ENDPOINTS.CONTACT_INFO, formData);
            setInfo(response.data.data);
            setIsModalOpen(false);
            alert('Contact information updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to update contact information.');
        }
    };

    if (loading) return (
        <AdminLayout>
            <div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 border-[#28a745] border-t-transparent rounded-full animate-spin"></div></div>
        </AdminLayout>
    );

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="bg-[#28a745] text-white p-4 rounded-t-lg shadow-md">
                    <h1 className="text-xl font-normal">Contact Information</h1>
                </div>

                <div className="bg-white rounded-b-lg shadow-xl p-6">
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#28a745] text-white p-2 rounded hover:bg-green-700 transition-all shadow-md group border border-green-600/20"
                            title="Edit"
                        >
                            <FaEdit size={16} />
                        </button>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        {/* Title Section */}
                        <div className="text-center md:text-left border-l-4 border-[#28a745] pl-6 py-2">
                            <h2 className="text-4xl font-extrabold text-[#2c3e50] mb-2">{info?.title}</h2>
                            <p className="text-lg text-gray-500 max-w-2xl">{info?.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Email Support */}
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1 duration-300">
                                <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                    <FaEnvelope size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Email Support</h3>
                                <p className="text-blue-600 font-medium break-all">{info?.emailSupport}</p>
                            </div>

                            {/* Live Chat */}
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1 duration-300">
                                <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                    <FaComments size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Live Chat</h3>
                                <p className="text-gray-600 text-sm mb-1 font-bold">Available: {info?.liveChat?.time}</p>
                                <p className="text-gray-500 text-sm italic">{info?.liveChat?.details}</p>
                            </div>

                            {/* Social Media */}
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1 duration-300">
                                <div className="w-14 h-14 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                                    <FaShareAlt size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Social Media</h3>
                                <div className="space-y-3">
                                    {info?.socialMedia?.facebook && (
                                        <a href={info.socialMedia.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#1877F2] hover:underline font-medium">
                                            <FaFacebook /> Facebook
                                        </a>
                                    )}
                                    {info?.socialMedia?.telegram && (
                                        <a href={info.socialMedia.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#0088cc] hover:underline font-medium">
                                            <FaTelegram /> Telegram
                                        </a>
                                    )}
                                    {info?.socialMedia?.instagram && (
                                        <a href={info.socialMedia.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#E4405F] hover:underline font-medium">
                                            <FaInstagram /> Instagram
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
                            <div className="bg-[#28a745] text-white px-8 py-4 flex justify-between items-center">
                                <h3 className="text-xl font-bold">Edit Contact Information</h3>
                                <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform bg-white/10 p-2 rounded-full">
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleSave} className="p-8 overflow-y-auto max-h-[80vh] custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-[#28a745] transition-all bg-gray-50"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 h-24 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-[#28a745] transition-all bg-gray-50"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Support Email</label>
                                        <input
                                            type="email"
                                            value={formData.emailSupport}
                                            onChange={(e) => setFormData({ ...formData, emailSupport: e.target.value })}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-[#28a745] transition-all bg-gray-50"
                                            required
                                        />
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <h4 className="font-black text-[12px] text-gray-400 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Live Chat</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 mb-1">Time</label>
                                                <input
                                                    type="text"
                                                    value={formData.liveChat.time}
                                                    onChange={(e) => setFormData({ ...formData, liveChat: { ...formData.liveChat, time: e.target.value } })}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 mb-1">Details</label>
                                                <input
                                                    type="text"
                                                    value={formData.liveChat.details}
                                                    onChange={(e) => setFormData({ ...formData, liveChat: { ...formData.liveChat, details: e.target.value } })}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <h4 className="font-black text-[12px] text-gray-400 mb-4 uppercase tracking-widest border-b border-gray-200 pb-2">Social Links</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 mb-1">Facebook</label>
                                                <input
                                                    type="url"
                                                    value={formData.socialMedia.facebook}
                                                    onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, facebook: e.target.value } })}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 mb-1">Telegram</label>
                                                <input
                                                    type="url"
                                                    value={formData.socialMedia.telegram}
                                                    onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, telegram: e.target.value } })}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 mb-1">Instagram</label>
                                                <input
                                                    type="url"
                                                    value={formData.socialMedia.instagram}
                                                    onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, instagram: e.target.value } })}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 font-bold text-sm text-gray-500 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 bg-[#28a745] text-white rounded-xl hover:bg-green-700 font-bold text-sm shadow-lg shadow-green-500/30 flex items-center gap-2 transition-all"
                                    >
                                        <FaSave /> Update Information
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ContactInfoManage;
