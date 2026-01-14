import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaBook, FaMoneyBillWave, FaBriefcase, FaUserShield } from 'react-icons/fa';

const categories = [
    {
        id: 'general',
        title: 'Getting Started',
        icon: <FaUserShield />,
        faqs: [
            {
                question: "How do I create an account?",
                answer: "Click on the 'Register' button in the top right corner. Fill in your name, email, and password. Confirm your email to activate your account."
            },
            {
                question: "Is account verification required?",
                answer: "Yes, to access all withdrawal features and higher-paying jobs, you need to verify your identity by uploading a valid ID in the Settings > Verification tab."
            }
        ]
    },
    {
        id: 'jobs',
        title: 'Jobs & Tasks',
        icon: <FaBriefcase />,
        faqs: [
            {
                question: "How do I verify a task is done?",
                answer: "When submitting a task, you will usually need to provide a screenshot proof or text evidence as requested by the job poster."
            },
            {
                question: "Why was my task rejected?",
                answer: "Tasks are rejected if the proof is unclear, incorrect, or if you didn't follow the specific instructions. Check the rejection reason in your 'My Work' history."
            }
        ]
    },
    {
        id: 'payments',
        title: 'Payments & Wallet',
        icon: <FaMoneyBillWave />,
        faqs: [
            {
                question: "How do I deposit funds?",
                answer: "Go to your Wallet page, click 'Deposit', and select bKash or Crypto. Follow the on-screen instructions. bKash deposits are usually manual and take a few minutes to verify."
            },
            {
                question: "What is the minimum withdrawal?",
                answer: "The minimum withdrawal limit is $5.00. You can withdraw to bKash, Nagad, or USDT (Crypto)."
            },
            {
                question: "When will I get my payment?",
                answer: "Withdrawal requests are typically processed within 24 hours. During weekends or holidays, it might take slightly longer."
            }
        ]
    },
    {
        id: 'referral',
        title: 'Referral Program',
        icon: <FaBook />,
        faqs: [
            {
                question: "How much can I earn from referrals?",
                answer: "You earn a percentage of every deposit and task completed by your referred users. Check the 'Referral Program' page for current rates."
            }
        ]
    }
];

const KnowledgeBaseSection = () => {
    const [activeCategory, setActiveCategory] = useState('payments');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Knowledge Base</h2>
                <p className="text-gray-500 dark:text-gray-400">Find quick answers to common questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar Categories */}
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveCategory(cat.id);
                                setOpenFaq(null);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm md:text-base ${activeCategory === cat.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-white dark:bg-[#1E293B] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#334155]'
                                }`}
                        >
                            <span className={activeCategory === cat.id ? 'text-white' : 'text-blue-500'}>{cat.icon}</span>
                            {cat.title}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="md:col-span-3">
                    <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                            {categories.find(c => c.id === activeCategory)?.icon}
                            {categories.find(c => c.id === activeCategory)?.title}
                        </h3>

                        <div className="space-y-4">
                            {categories.find(c => c.id === activeCategory)?.faqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flexjustify-between items-center text-left focus:outline-none group flex justify-between"
                                    >
                                        <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {faq.question}
                                        </span>
                                        <span className={`p-2 rounded-full transition-colors ${openFaq === idx ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'text-gray-400'}`}>
                                            {openFaq === idx ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-200 ease-in-out ${openFaq === idx ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-[#0F172A] p-4 rounded-lg">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeBaseSection;
