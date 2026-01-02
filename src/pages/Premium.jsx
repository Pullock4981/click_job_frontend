import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaCheckCircle } from 'react-icons/fa';

const Premium = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBalance, setSelectedBalance] = useState('Earning Balance');

    const handleConfirm = () => {
        // Handle logic here
        setIsModalOpen(false);
        alert('Subscription purchase functionality will be integrated soon!');
    };

    return (
        <Layout showFooter={true}>
            <div className="bg-primary dark:bg-base-100 h-40 md:h-56 w-full relative">
                <div className="container mx-auto px-4 pt-4 md:pt-6 flex justify-center">
                    {/* Placeholder for top banner if needed, matching dashboard style */}
                </div>
            </div>

            <div className="mx-auto px-4 md:px-8 -mt-20 relative z-10 pb-20 flex justify-center">
                <div className="w-full max-w-2xl bg-white dark:bg-base-300 rounded-xl shadow-xl overflow-hidden border border-base-200 dark:border-white/5">
                    {/* Green Header */}
                    <div className="bg-[#00C875] py-5 px-6 text-center">
                        <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
                            1 MONTH Premium Subscription
                        </h2>
                    </div>

                    {/* Features List */}
                    <div className="p-8 md:p-12">
                        <ul className="space-y-6 max-w-md mx-auto">
                            <li className="flex items-center gap-3 text-[#3498db] dark:text-blue-400 font-medium">
                                <FaCheckCircle className="text-lg shrink-0" />
                                <span>No WorkUpJob Advertisement</span>
                            </li>
                            <li className="flex items-center gap-3 text-[#3498db] dark:text-blue-400 font-medium">
                                <FaCheckCircle className="text-lg shrink-0" />
                                <span>No Third Party Advertisement</span>
                            </li>
                            <li className="flex items-center gap-3 text-[#3498db] dark:text-blue-400 font-medium">
                                <FaCheckCircle className="text-lg shrink-0" />
                                <span>Top Job Access <span className="text-red-500 italic text-sm font-black">* NEW</span></span>
                            </li>
                            <li className="flex items-center gap-3 text-[#3498db] dark:text-blue-400 font-medium">
                                <span className="text-lg shrink-0">-</span>
                                <span>More Coming</span>
                            </li>
                        </ul>

                        <div className="divider my-8"></div>

                        {/* Buy Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="btn bg-[#1e60d5] hover:bg-[#1a54bb] border-none text-white font-bold rounded-lg px-8 py-3 h-auto normal-case text-base shadow-sm hover:scale-105 transition-all"
                            >
                                Buy Subscription at $5
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-base-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 md:p-8">
                            <h3 className="text-xl font-bold text-[#2c3e50] dark:text-white mb-8">
                                Are you confirm to buy Premium Subscription?
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-lg font-medium text-[#2c3e50] dark:text-gray-300 mb-2">
                                        Select Balance
                                    </label>
                                    <select
                                        className="select select-bordered w-full h-12 bg-white dark:bg-base-900 text-[#2c3e50] dark:text-white border-blue-500/30 focus:border-blue-500 rounded-lg font-medium"
                                        value={selectedBalance}
                                        onChange={(e) => setSelectedBalance(e.target.value)}
                                    >
                                        <option value="Earning Balance">Earning Balance</option>
                                        <option value="Deposit Balance">Deposit Balance</option>
                                    </select>
                                </div>

                                <div className="border rounded-lg overflow-hidden border-gray-100 dark:border-white/10">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 dark:bg-base-900/50 border-b border-gray-100 dark:border-white/10">
                                            <tr>
                                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500">Duration</th>
                                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-500">Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">1 Month</td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">5 USD</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-3 justify-end uppercase font-black">
                                <button
                                    onClick={handleConfirm}
                                    className="btn bg-[#00C875] hover:bg-[#00ad66] border-none text-white px-6 rounded-lg h-12 normal-case"
                                >
                                    Yes, Confirm
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn bg-[#0d213f] hover:bg-[#0a1b32] border-none text-white px-6 rounded-lg h-12 normal-case"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Premium;
