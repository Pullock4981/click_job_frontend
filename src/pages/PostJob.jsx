import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaPlusCircle, FaImage, FaLink, FaInfoCircle } from 'react-icons/fa';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Social Media',
        description: '',
        requirements: '',
        targetWorkers: 100,
        workerPrice: 0.02,
        thumbnail: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Job submitted successfully (Demo)');
    };

    const totalCost = (formData.targetWorkers * formData.workerPrice * 1.1).toFixed(2); // 10% platform fee

    return (
        <Layout>
            <div className="min-h-screen bg-base-200 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-content/5">
                        <div className="bg-primary p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                                    <FaPlusCircle /> Post a New Job
                                </h1>
                                <p className="opacity-80">Reach thousands of workers in minutes.</p>
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <FaPlusCircle size={120} />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label font-bold">Job Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Subscribe to my YouTube channel"
                                        className="input input-bordered rounded-xl bg-base-200/50 border-none focus:ring-2 ring-primary"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label font-bold">Category</label>
                                    <select
                                        className="select select-bordered rounded-xl bg-base-200/50 border-none focus:ring-2 ring-primary"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Social Media</option>
                                        <option>Website Traffic</option>
                                        <option>App Install</option>
                                        <option>Content Writing</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label font-bold">Description & Instructions</label>
                                <div className="form-control">
                                    <textarea
                                        className="textarea textarea-bordered rounded-xl h-32 bg-base-200/50 border-none focus:ring-2 ring-primary"
                                        placeholder="What do the workers need to do step by step?"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label font-bold">Target Workers</label>
                                    <input
                                        type="number"
                                        className="input input-bordered rounded-xl bg-base-200/50 border-none focus:ring-2 ring-primary"
                                        value={formData.targetWorkers}
                                        onChange={(e) => setFormData({ ...formData, targetWorkers: e.target.value })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label font-bold">Price per Worker ($)</label>
                                    <input
                                        type="number"
                                        step="0.001"
                                        className="input input-bordered rounded-xl bg-base-200/50 border-none focus:ring-2 ring-primary"
                                        value={formData.workerPrice}
                                        onChange={(e) => setFormData({ ...formData, workerPrice: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Estimated Total Cost</span>
                                    <span className="text-primary text-2xl font-black">${totalCost}</span>
                                </div>
                                <p className="text-xs opacity-60 mt-2 flex items-center gap-2">
                                    <FaInfoCircle /> Includes 10% platform fee and verification services.
                                </p>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block rounded-xl h-14 text-lg font-black shadow-xl shadow-primary/20">
                                Publish Job Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PostJob;
