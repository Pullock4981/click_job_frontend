import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaWallet, FaShieldAlt, FaCamera, FaSave } from 'react-icons/fa';

const Profile = () => {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        alert('Profile update submitted! (Demo)');
        setEditing(false);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-base-200 py-12 px-4 shadow-inner text-base-content">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden border border-base-content/5">
                        {/* Header/Cover */}
                        <div className="h-48 bg-primary relative">
                            <div className="absolute -bottom-16 left-12">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-[2rem] bg-base-100 border-4 border-base-100 shadow-xl overflow-hidden">
                                        <img
                                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=random`}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button className="absolute bottom-2 right-2 p-2 bg-secondary text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaCamera size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="pt-20 px-12 pb-12">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h1 className="text-4xl font-black mb-1">{user?.username}</h1>
                                    <p className="text-sm opacity-60 flex items-center gap-2">
                                        <FaEnvelope /> {user?.email}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setEditing(!editing)}
                                    className={`btn ${editing ? 'btn-ghost' : 'btn-primary'} rounded-2xl px-8 shadow-lg`}
                                >
                                    {editing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-control">
                                    <label className="label font-bold text-xs uppercase tracking-widest opacity-50">Username</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input
                                            type="text"
                                            className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary disabled:opacity-50"
                                            value={formData.username}
                                            disabled={!editing}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label font-bold text-xs uppercase tracking-widest opacity-50">Email Address</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input
                                            type="email"
                                            className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary disabled:opacity-50"
                                            value={formData.email}
                                            disabled={!editing}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {editing && (
                                    <>
                                        <div className="form-control">
                                            <label className="label font-bold text-xs uppercase tracking-widest opacity-50">Current Password</label>
                                            <input
                                                type="password"
                                                className="input input-bordered rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary"
                                                placeholder="Required to save changes"
                                                value={formData.currentPassword}
                                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label font-bold text-xs uppercase tracking-widest opacity-50">New Password</label>
                                            <input
                                                type="password"
                                                className="input input-bordered rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary"
                                                placeholder="Leave blank to keep current"
                                                value={formData.newPassword}
                                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="md:col-span-2 pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                                            <FaWallet className="text-primary mb-3" size={20} />
                                            <p className="text-[10px] uppercase font-black opacity-50">Balance</p>
                                            <p className="text-2xl font-black">${user?.balance?.toFixed(3) || '0.000'}</p>
                                        </div>
                                        <div className="bg-secondary/5 p-6 rounded-3xl border border-secondary/10">
                                            <FaShieldAlt className="text-secondary mb-3" size={20} />
                                            <p className="text-[10px] uppercase font-black opacity-50">Role</p>
                                            <p className="text-2xl font-black capitalize">{user?.role || 'User'}</p>
                                        </div>
                                        <div className="bg-success/5 p-6 rounded-3xl border border-success/10">
                                            <FaSave className="text-success mb-3" size={20} />
                                            <p className="text-[10px] uppercase font-black opacity-50">Verified</p>
                                            <p className="text-2xl font-black">{user?.isVerified ? 'Yes' : 'No'}</p>
                                        </div>
                                    </div>
                                </div>

                                {editing && (
                                    <div className="md:col-span-2 pt-8">
                                        <button type="submit" className="btn btn-primary btn-block rounded-2xl h-14 text-lg font-black shadow-xl shadow-primary/20">
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
