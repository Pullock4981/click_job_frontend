import React from 'react';
import Layout from '../components/layout/Layout';
import { FaTicketAlt, FaPlus, FaQuestionCircle, FaLifeRing, FaCommentDots } from 'react-icons/fa';

const Support = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-base-200 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-4xl font-black flex items-center gap-4">
                            <FaTicketAlt className="text-secondary" /> Help & Support
                        </h1>
                        <button className="btn btn-primary rounded-2xl gap-2 shadow-lg shadow-primary/20">
                            <FaPlus /> Create Ticket
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-base-100 p-8 rounded-3xl shadow-xl flex items-center gap-6 border border-base-content/5 group hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                            <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-white/20 group-hover:text-white"><FaQuestionCircle size={32} /></div>
                            <div>
                                <h3 className="text-xl font-bold">Knowledge Base</h3>
                                <p className="text-sm opacity-60 group-hover:opacity-80">Find answers to common questions.</p>
                            </div>
                        </div>
                        <div className="bg-base-100 p-8 rounded-3xl shadow-xl flex items-center gap-6 border border-base-content/5 group hover:bg-secondary hover:text-white transition-all duration-300 cursor-pointer">
                            <div className="p-4 bg-secondary/10 text-secondary rounded-2xl group-hover:bg-white/20 group-hover:text-white"><FaCommentDots size={32} /></div>
                            <div>
                                <h3 className="text-xl font-bold">Live Chat</h3>
                                <p className="text-sm opacity-60 group-hover:opacity-80">Talk to our support team live.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-base-100 rounded-[2.5rem] shadow-2xl p-8 border border-base-content/5">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                            <FaLifeRing className="text-primary" /> My Recent Tickets
                        </h2>

                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-base-200 rounded-2xl gap-4">
                                <div>
                                    <span className="text-[10px] font-black uppercase opacity-50">Ticket #TK-9921</span>
                                    <h4 className="font-bold text-lg">Unable to withdraw funds</h4>
                                    <p className="text-xs opacity-60">Submitted on Dec 28, 2023</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="badge badge-success rounded-lg font-bold p-3">RESOLVED</span>
                                    <button className="btn btn-sm btn-ghost rounded-xl">View Details</button>
                                </div>
                            </div>

                            <div className="bg-base-200 p-12 rounded-2xl text-center border-2 border-dashed border-base-content/10">
                                <p className="opacity-50 font-bold uppercase tracking-widest text-sm">No new tickets</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Support;
