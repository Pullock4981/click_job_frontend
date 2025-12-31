import React from 'react';
import Layout from '../components/layout/Layout';
import { FaBell, FaCheck, FaInfoCircle, FaExclamationTriangle, FaTrash } from 'react-icons/fa';

const Notifications = () => {
    const notifications = [
        { id: 1, type: 'success', title: 'Work Approved', body: 'Your submission for "Like Video" has been approved.', time: '2 mins ago' },
        { id: 2, type: 'info', title: 'New Job Available', body: 'A high-paying job in your category was just posted.', time: '1 hour ago' },
        { id: 3, type: 'warning', title: 'Security Alert', body: 'Login detected from a new device.', time: '5 hours ago' },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <div className="p-3 bg-success/10 text-success rounded-xl"><FaCheck /></div>;
            case 'warning': return <div className="p-3 bg-warning/10 text-warning rounded-xl"><FaExclamationTriangle /></div>;
            default: return <div className="p-3 bg-info/10 text-info rounded-xl"><FaInfoCircle /></div>;
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-base-200 py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-4xl font-black flex items-center gap-4">
                            <FaBell className="text-secondary" /> Notifications
                        </h1>
                        <button className="btn btn-ghost text-error gap-2 btn-sm rounded-xl">
                            <FaTrash /> Clear All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {notifications.map(n => (
                            <div key={n.id} className="bg-base-100 p-6 rounded-3xl shadow-xl border border-base-content/5 flex gap-5 group transition-all hover:bg-base-200/50">
                                {getIcon(n.type)}
                                <div className="flex-1">
                                    <h3 className="font-black text-lg">{n.title}</h3>
                                    <p className="text-sm opacity-70 mb-2">{n.body}</p>
                                    <span className="text-[10px] uppercase font-black opacity-30 tracking-widest">{n.time}</span>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="btn btn-ghost btn-circle btn-sm text-error">
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Notifications;
