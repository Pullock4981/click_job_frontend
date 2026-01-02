import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
    const [notifications] = useState([
        {
            id: 1,
            type: 'PASSWORD_CHANGED',
            message: 'You change your password recently',
            date: '2025-12-27 22:34:44'
        },
        {
            id: 2,
            type: 'JOB_MODIFIED',
            message: 'Your Job ID: 255135 Successfully present your job in a more standard way.',
            date: '2025-12-21 22:52:57'
        },
        {
            id: 3,
            type: 'JOB_APPROVED',
            message: 'Your Job ID: 255135 Approved with Worker Need 43',
            date: '2025-12-21 22:40:19'
        },
        {
            id: 4,
            type: 'JOB_MODIFIED',
            message: 'Your Job ID: 255135 Successfully present your job in a more standard way.',
            date: '2025-12-21 22:40:16'
        },
        {
            id: 5,
            type: 'JOB_REJECT',
            message: 'Job ID: 255135 Rejected & Refunded for "Dear sir please select your video length (1 8) minutes+subscribe category and post again. Re-apply again from \'My Jobs\'"',
            date: '2025-12-21 22:36:47'
        },
        {
            id: 6,
            type: 'PASSWORD_CHANGED',
            message: 'You change your password recently',
            date: '2025-12-21 22:29:55'
        },
        {
            id: 7,
            type: 'JOB_APPROVED',
            message: 'Your Job ID: 241672 Approved with Worker Need 30',
            date: '2025-11-09 19:54:09'
        }
    ]);

    return (
        <Layout showFooter={true}>
            {/* Blue Header Section */}
            <div className="bg-[#1e60d5] h-16 md:h-20 w-full relative"></div>

            <div className="mx-auto px-4 md:px-8 -mt-6 relative z-10 pb-20">
                <div className="bg-white dark:bg-base-900 rounded-xl shadow-2xl overflow-hidden border border-base-200 dark:border-white/5">
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
