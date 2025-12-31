import React from 'react';
import Layout from '../components/layout/Layout';
import { FaCrown, FaCheck, FaRocket, FaGem } from 'react-icons/fa';

const Premium = () => {
    const plans = [
        {
            name: 'Basic',
            price: 'Free',
            icon: <FaRocket className="text-gray-400" />,
            features: ['Standard Support', '5 Jobs per day', 'Basic Earnings', 'Community Access'],
            buttonText: 'Current Plan',
            current: true
        },
        {
            name: 'Pro',
            price: '$9.99/mo',
            icon: <FaGem className="text-blue-500" />,
            features: ['Priority Support', 'Unlimited Jobs', '10% Bonus Earnings', 'Ad-free Experience', 'Custom Badges'],
            buttonText: 'Upgrade Now',
            current: false,
            recommended: true
        },
        {
            name: 'Elite',
            price: '$24.99/mo',
            icon: <FaCrown className="text-yellow-500" />,
            features: ['24/7 VIP Support', 'Early Access to Jobs', '25% Bonus Earnings', 'Account Manager', 'Exclusive VIP Events'],
            buttonText: 'Go Elite',
            current: false
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-base-200 py-12 px-4">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-primary">Upgrade to Premium</h1>
                    <p className="text-lg opacity-70">Get more jobs, higher earnings, and exclusive features.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div key={index} className={`relative bg-base-100 rounded-3xl p-8 shadow-2xl border-2 transition-all hover:scale-105 ${plan.recommended ? 'border-primary ring-4 ring-primary/10' : 'border-base-content/5'}`}>
                            {plan.recommended && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">Recommended</span>
                            )}
                            <div className="text-4xl mb-4">{plan.icon}</div>
                            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                            <div className="text-3xl font-black mb-6">{plan.price}</div>

                            <ul className="space-y-4 mb-8 text-left">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <FaCheck className="text-success" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`btn w-full rounded-xl font-bold ${plan.current ? 'btn-ghost border-base-content/10' : 'btn-primary shadow-lg shadow-primary/20'}`}>
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Premium;
