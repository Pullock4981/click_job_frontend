import React from 'react';
import Layout from '../components/layout/Layout';
import { FaTicketAlt, FaPlus, FaQuestionCircle, FaLifeRing, FaCommentDots } from 'react-icons/fa';

const Support = () => {
    return (
        <Layout>
            <div className="bg-base-200 py-3 md:py-10 px-3 md:px-8">
                <div className="max-w-4xl mx-auto space-y-4 md:space-y-10">
                    {/* Header Card */}
                    <div className="bg-base-100 p-3 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] shadow-xl border border-primary/5">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                                <div className="p-2.5 md:p-4 bg-secondary text-white rounded-xl md:rounded-3xl shadow-xl shadow-secondary/30 flex-shrink-0">
                                    <FaTicketAlt size={20} className="md:size-6" />
                                </div>
                                <h1 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tight md:tracking-tighter">My <span className="text-secondary">Tickets</span></h1>
                            </div>

                            <button className="btn btn-primary rounded-xl h-10 md:h-14 md:rounded-2xl shadow-lg shadow-primary/20 w-full md:w-auto font-black text-xs md:text-sm">
                                <FaPlus /> Create Ticket
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                        <div className="bg-base-100 p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-xl flex items-center gap-4 md:gap-6 border border-base-content/5 group hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                            <div className="p-3 md:p-4 bg-primary/10 text-primary rounded-xl group-hover:bg-white/20 group-hover:text-white"><FaQuestionCircle size={24} md={32} /></div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold">Knowledge Base</h3>
                                <p className="text-xs md:text-sm opacity-60 group-hover:opacity-80">Find answers to common questions.</p>
                            </div>
                        </div>
                        <div className="bg-base-100 p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-xl flex items-center gap-4 md:gap-6 border border-base-content/5 group hover:bg-secondary hover:text-white transition-all duration-300 cursor-pointer">
                            <div className="p-3 md:p-4 bg-secondary/10 text-secondary rounded-xl group-hover:bg-white/20 group-hover:text-white"><FaCommentDots size={24} md={32} /></div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold">Live Chat</h3>
                                <p className="text-xs md:text-sm opacity-60 group-hover:opacity-80">Talk to our support team live.</p>
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
