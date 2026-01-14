import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FaBell, FaSpinner } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.NOTIFICATIONS);
            if (res.data?.data) {
                setNotifications(res.data.data.notifications || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout showFooter={true}>
            {/* Blue Header Section */}
            <div className="bg-[#1e60d5] h-16 md:h-20 w-full relative"></div>

            <div className="mx-auto px-4 md:px-8 -mt-6 relative z-10 pb-20">
                <div className="bg-base-100 dark:bg-base-900 rounded-xl shadow-2xl overflow-hidden border border-base-200 dark:border-white/5">
                    <div className="p-6 md:p-8">
                        {/* Page Title */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-[#2c3e50] dark:text-white">
                                Latest notifications
                            </h2>
                        </div>

                        {/* Notifications List */}
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="flex gap-4 items-start p-4 rounded-lg hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 last:border-0"
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                                            <FaBell className="text-emerald-600 dark:text-emerald-400 text-sm" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-1">
                                            <h3 className="text-xs font-bold text-[#1e60d5] dark:text-blue-400 uppercase tracking-wide">
                                                {notification.type.replace(/_/g, ' ')}
                                            </h3>
                                            <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {notification.date}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {notification.message}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Notifications;
