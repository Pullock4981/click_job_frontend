import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaGem, FaBitcoin, FaTimes } from 'react-icons/fa';

const Deposit = () => {
    const [balance, setBalance] = useState(0.021);
    const [amount, setAmount] = useState('');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showBkashModal, setShowBkashModal] = useState(false);
    const [showCryptoModal, setShowCryptoModal] = useState(false);
    const [showCryptoPaymentModal, setShowCryptoPaymentModal] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [cryptoAgreedToTerms, setCryptoAgreedToTerms] = useState(false);
    const [bkashNumber, setBkashNumber] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');

    const handleInstantDeposit = () => {
        setShowDepositModal(true);
    };

    const handleCryptoDeposit = () => {
        setShowCryptoModal(true);
    };

    const handleCryptoContinue = () => {
        if (depositAmount && cryptoAgreedToTerms) {
            setShowCryptoModal(false);
            setShowCryptoPaymentModal(true);
        }
    };

    const handleContinueToPayment = () => {
        if (depositAmount && agreedToTerms) {
            setShowDepositModal(false);
            setShowPaymentModal(true);
        }
    };

    const handlePaymentMethod = (method) => {
        setShowPaymentModal(false);
        if (method === 'bKash') {
            setShowBkashModal(true);
        } else {
            alert(`Processing payment via ${method}`);
            setDepositAmount('');
            setAgreedToTerms(false);
        }
    };

    const handleBkashConfirm = () => {
        if (bkashNumber) {
            alert(`Processing bKash payment for ${depositAmount} USD to ${bkashNumber}`);
            setShowBkashModal(false);
            setBkashNumber('');
            setDepositAmount('');
            setAgreedToTerms(false);
        }
    };

    const handleCryptoPayment = () => {
        if (selectedCurrency) {
            alert(`Processing crypto payment: ${depositAmount} USD in ${selectedCurrency}`);
            setShowCryptoPaymentModal(false);
            setSelectedCurrency('');
            setDepositAmount('');
            setCryptoAgreedToTerms(false);
        }
    };

    return (
        <Layout showFooter={true}>
            <div className="relative bg-[#0a0e27] min-h-screen">
                {/* Animated Network Lines Background */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" className="animate-pulse" />
                        <line x1="80%" y1="30%" x2="20%" y2="70%" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <line x1="30%" y1="10%" x2="70%" y2="90%" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
                    </svg>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                    <div className="particle particle-4"></div>
                    <div className="particle particle-5"></div>
                </div>

                {/* Payment Methods Section */}
                <div className="relative z-10 pt-12 pb-8 px-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                        Bultifore services worldwide
                    </h1>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Instant Deposit */}
                        <div
                            onClick={handleInstantDeposit}
                            className="bg-[#1e3a5f]/60 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-[#2a4a7f]/60 transition-all cursor-pointer border border-blue-500/20"
                        >
                            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                                <FaGem className="text-white text-xl" />
                            </div>
                            <h3 className="text-white font-semibold text-sm">Instant Deposit</h3>
                        </div>

                        {/* bKash Payment */}
                        <div
                            onClick={handleInstantDeposit}
                            className="bg-[#1e3a5f]/60 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-[#2a4a7f]/60 transition-all cursor-pointer border border-blue-500/20"
                        >
                            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-pink-600 to-red-600 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold text-sm">bKash Payment</h3>
                        </div>

                        {/* Crypto Deposit */}
                        <div
                            onClick={handleCryptoDeposit}
                            className="bg-[#1e3a5f]/60 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-[#2a4a7f]/60 transition-all cursor-pointer border border-blue-500/20"
                        >
                            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <FaBitcoin className="text-white text-2xl" />
                            </div>
                            <h3 className="text-white font-semibold text-sm">Crypto Deposit</h3>
                        </div>
                    </div>
                </div>

                {/* Globe and Balance Section with Background Image Overlay */}
                <div className="relative z-10 py-16 px-4">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        {/* Rotating Globe */}
                        <div className="flex justify-center items-center">
                            <div className="relative w-80 h-80 md:w-96 md:h-96">
                                {/* Main Globe Circle */}
                                <div className="absolute inset-0 rotating-globe flex items-center justify-center">
                                    <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden shadow-2xl shadow-blue-500/50">
                                        {/* Simple Blue Circles/Bubbles instead of continents */}
                                        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-400/40 rounded-full blur-sm"></div>
                                        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-blue-300/30 rounded-full blur-sm"></div>
                                        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-blue-400/35 rounded-full blur-sm"></div>
                                        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-300/40 rounded-full blur-sm"></div>

                                        {/* Shine effect */}
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full"></div>
                                    </div>
                                </div>

                                {/* Payment Card Icon */}
                                <div className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 z-20">
                                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl">
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-3">
                                            <div className="text-4xl md:text-5xl text-blue-600 font-bold">$</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 bg-blue-200 rounded w-16 md:w-20"></div>
                                            <div className="h-2 bg-blue-200 rounded w-14 md:w-16"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkmark */}
                                <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 z-20">
                                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                                        <svg className="w-10 h-10 md:w-12 md:h-12 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Balance Convert Form */}
                        <div className="bg-[#1a2942] backdrop-blur-md rounded-2xl p-8 md:p-10 border border-blue-900/50 shadow-2xl">
                            <h2 className="text-white text-xl md:text-2xl font-bold mb-8 text-center">Balance Convert</h2>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-400 text-sm font-semibold tracking-wider">BALANCE</span>
                                        <span className="text-white text-2xl md:text-3xl font-bold">${balance.toFixed(3)}</span>
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Minimum Deposit $1"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full px-5 py-3.5 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm font-medium"
                                    />

                                    <p className="text-red-400 text-xs mt-3 font-medium">
                                        10% will be deducted as a convert fee.
                                    </p>
                                </div>

                                <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-3.5 rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30 uppercase tracking-wide text-sm">
                                    Earning to Deposit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="relative z-10 py-16 md:py-20 px-4 bg-[#0a0e27]/80">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Security Illustration */}
                        <div className="flex justify-center order-2 lg:order-1">
                            <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                                <svg viewBox="0 0 400 400" className="w-full h-full">
                                    {/* Shadow */}
                                    <ellipse cx="200" cy="280" rx="60" ry="20" fill="#3b82f6" opacity="0.2" />

                                    {/* Person Body */}
                                    <rect x="160" y="200" width="80" height="100" rx="10" fill="#ec4899" />

                                    {/* Head */}
                                    <circle cx="200" cy="150" r="40" fill="#fbbf24" />
                                    <path d="M 180 140 Q 180 130 190 130 Q 200 130 200 140" fill="#1f2937" />
                                    <circle cx="185" cy="145" r="3" fill="#1f2937" />
                                    <circle cx="215" cy="145" r="3" fill="#1f2937" />
                                    <path d="M 190 160 Q 200 165 210 160" stroke="#1f2937" strokeWidth="2" fill="none" />

                                    {/* Laptop */}
                                    <rect x="140" y="220" width="120" height="80" rx="5" fill="#5b21b6" />
                                    <rect x="145" y="225" width="110" height="60" fill="#3b82f6" />

                                    {/* Security Icons */}
                                    <circle cx="100" cy="200" r="30" fill="#fbbf24" />
                                    <text x="100" y="210" textAnchor="middle" fontSize="24">🔍</text>

                                    <circle cx="300" cy="180" r="30" fill="#fbbf24" />
                                    <text x="300" y="190" textAnchor="middle" fontSize="24">💬</text>

                                    <circle cx="120" cy="320" r="25" fill="#fbbf24" />
                                    <text x="120" y="328" textAnchor="middle" fontSize="20">🔒</text>

                                    <circle cx="280" cy="320" r="25" fill="#fbbf24" />
                                    <text x="280" y="328" textAnchor="middle" fontSize="20">🔒</text>
                                </svg>
                            </div>
                        </div>

                        {/* Security Text */}
                        <div className="text-white space-y-5 order-1 lg:order-2">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                                Our micro job service prioritizes security with
                            </h2>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="text-cyan-400 mt-1 text-lg">✓</div>
                                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                                        We employ robust authentication protocols, including multi-factor authentication (MFA), to ensure the authenticity of all users. This stringent verification process effectively mitigates the risk of unauthorized access and enhances the overall security of our platform.
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <div className="text-cyan-400 mt-1 text-lg">✓</div>
                                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                                        Your financial transactions are protected by industry-standard encryption and secure payment gateways. We utilize advanced payment processors to guarantee the confidentiality and integrity of your payment information. This not only ensures your peace of mind but also minimizes the potential for fraudulent activities.
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <div className="text-cyan-400 mt-1 text-lg">✓</div>
                                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                                        Our dedicated security team utilizes advanced monitoring tools and techniques to detect, prevent, and address security threats. We maintain constant vigilance over our platform, promptly responding to any suspicious activities or potential breaches. This ongoing effort guarantees a secure and worry-free experience for all users.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Styles */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    
                    @keyframes particle-float {
                        0%, 100% { 
                            transform: translate(0, 0);
                            opacity: 0.3;
                        }
                        50% { 
                            transform: translate(var(--tx), var(--ty));
                            opacity: 0.6;
                        }
                    }
                    
                    .rotating-globe {
                        animation: rotate 20s linear infinite;
                    }
                    
                    .globe-grid {
                        background-image: 
                            repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 36px),
                            repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 36px);
                    }
                    
                    .particle {
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: rgba(59, 130, 246, 0.6);
                        border-radius: 50%;
                        animation: particle-float 8s ease-in-out infinite;
                    }
                    
                    .particle-1 {
                        top: 10%;
                        left: 20%;
                        --tx: 30px;
                        --ty: 40px;
                        animation-delay: 0s;
                    }
                    
                    .particle-2 {
                        top: 30%;
                        right: 15%;
                        --tx: -40px;
                        --ty: 30px;
                        animation-delay: 1.5s;
                    }
                    
                    .particle-3 {
                        bottom: 20%;
                        left: 30%;
                        --tx: 25px;
                        --ty: -35px;
                        animation-delay: 3s;
                    }
                    
                    .particle-4 {
                        top: 50%;
                        left: 10%;
                        --tx: 35px;
                        --ty: 25px;
                        animation-delay: 4.5s;
                    }
                    
                    .particle-5 {
                        bottom: 30%;
                        right: 25%;
                        --tx: -30px;
                        --ty: -40px;
                        animation-delay: 6s;
                    }
                `}} />

                {/* Instant Deposit Modal */}
                {showDepositModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative">
                            {/* Blue Header */}
                            <div className="bg-[#4a90e2] text-white p-6 rounded-t-2xl">
                                <h2 className="text-2xl font-bold text-center">Instant Deposit</h2>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Warning Message */}
                                <div className="mb-6">
                                    <p className="text-red-500 text-sm">
                                        • Always send the exact amount in BDT as shown. If you send less than the minimum required amount, a 50% deduction will be applied.
                                    </p>
                                </div>

                                {/* Amount Input */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-semibold mb-3">
                                        Enter Deposit Amount
                                    </label>
                                    <div className="flex gap-3">
                                        <input
                                            type="number"
                                            placeholder="Amount"
                                            value={depositAmount}
                                            onChange={(e) => setDepositAmount(e.target.value)}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="bg-gray-100 px-6 py-3 rounded-lg flex items-center gap-3 min-w-[200px]">
                                            <span className="text-cyan-500 font-bold text-lg">BDT</span>
                                            <span className="text-gray-600">0 BDT</span>
                                        </div>
                                    </div>
                                    <p className="text-cyan-500 text-sm mt-2">$ 1 = 110 BDT</p>
                                </div>

                                {/* Terms Checkbox */}
                                <div className="mb-6">
                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700 text-sm">
                                            I agree to all Terms of Service and all Policy.
                                        </span>
                                    </label>
                                </div>

                                {/* Continue Button */}
                                <button
                                    onClick={handleContinueToPayment}
                                    disabled={!depositAmount || !agreedToTerms}
                                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue to payment
                                </button>

                                {/* Payment Icons */}
                                <div className="mt-6 flex items-center justify-center gap-4">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ctext x='24' y='30' font-size='20' text-anchor='middle'%3ENagad%3C/text%3E%3C/svg%3E" alt="Nagad" className="h-8" />
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ctext x='24' y='30' font-size='20' text-anchor='middle'%3EbKash%3C/text%3E%3C/svg%3E" alt="bKash" className="h-8" />
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ctext x='24' y='30' font-size='16' text-anchor='middle'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="h-8" />
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ctext x='24' y='30' font-size='12' text-anchor='middle'%3EMastercard%3C/text%3E%3C/svg%3E" alt="Mastercard" className="h-8" />
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setShowDepositModal(false)}
                                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Payment Method Modal */}
                {showPaymentModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
                            {/* Payment Info Header */}
                            <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-green-400 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">W</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 text-sm">Payment To</p>
                                            <p className="text-gray-900 font-bold text-lg">workupjob.com</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-4xl font-bold text-gray-900">{depositAmount || '100'}</p>
                                        <p className="text-gray-600 text-sm">USD</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="p-8">
                                <h3 className="text-gray-900 font-bold text-lg mb-6">• Select Payment Method</h3>

                                <div className="grid grid-cols-2 gap-6">
                                    {/* bKash */}
                                    <button
                                        onClick={() => handlePaymentMethod('bKash')}
                                        className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-2xl hover:border-pink-500 hover:bg-pink-50 transition-all group"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-gray-900">bKash</span>
                                    </button>

                                    {/* Nagad */}
                                    <button
                                        onClick={() => handlePaymentMethod('Nagad')}
                                        className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-gray-900">Nagad</span>
                                    </button>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                    </div>
                )}

                {/* bKash Payment Modal */}
                {showBkashModal && (
                    <div className="fixed inset-0 bg-gray-500/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden">
                            {/* bKash Header */}
                            <div className="bg-white p-6 border-b border-gray-200">
                                <div className="flex items-center justify-center">
                                    <svg className="h-12" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                                        <text x="10" y="40" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#E2136E">
                                            বিকাশ
                                        </text>
                                        <path d="M 160 20 L 180 30 L 160 40 Z" fill="#E2136E" />
                                    </svg>
                                </div>
                            </div>

                            {/* Merchant Info */}
                            <div className="bg-white p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-xl">W</span>
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-bold text-lg">WORKUPJOBDOTCOM-RM59649</p>
                                            <p className="text-gray-500 text-sm">Inv No: Inv_iRAYpN</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-gray-900">৳{Math.round(parseFloat(depositAmount || 100) * 110)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Number Input */}
                            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8">
                                <h3 className="text-white text-xl font-bold text-center mb-6">
                                    Your bKash Account Number
                                </h3>

                                <input
                                    type="tel"
                                    placeholder="e.g 01XXXXXXXXX"
                                    value={bkashNumber}
                                    onChange={(e) => setBkashNumber(e.target.value)}
                                    className="w-full px-6 py-4 rounded-xl text-center text-gray-600 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                />

                                <p className="text-white text-center mt-4 text-sm">
                                    Confirm and proceed, <span className="underline cursor-pointer">terms & conditions</span>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-white p-6 grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => {
                                        setShowBkashModal(false);
                                        setBkashNumber('');
                                    }}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBkashConfirm}
                                    disabled={!bkashNumber || bkashNumber.length < 11}
                                    className="px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 hover:text-white transition-colors"
                                >
                                    Confirm
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="bg-white px-6 pb-6 text-center">
                                <div className="flex items-center justify-center gap-2 text-pink-600 text-sm mb-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span>16247</span>
                                </div>
                                <p className="text-gray-500 text-xs">
                                    © 2026 bKash, All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Crypto Deposit Amount Modal */}
                {showCryptoModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative">
                            {/* Blue Header */}
                            <div className="bg-[#4a90e2] text-white p-6 rounded-t-2xl">
                                <h2 className="text-2xl font-bold text-center">Crypto Deposit</h2>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Amount Input */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-semibold mb-3">
                                        Enter Deposit Amount
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                                    />
                                    <p className="text-gray-500 text-sm mt-2">$ (USD)</p>
                                </div>

                                {/* Terms Checkbox */}
                                <div className="mb-6">
                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={cryptoAgreedToTerms}
                                            onChange={(e) => setCryptoAgreedToTerms(e.target.checked)}
                                            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700 text-sm">
                                            I agree to <span className="text-blue-600 cursor-pointer">all Terms of Service and all Policy</span>.
                                        </span>
                                    </label>
                                </div>

                                {/* Continue Button */}
                                <button
                                    onClick={handleCryptoContinue}
                                    disabled={!depositAmount || !cryptoAgreedToTerms}
                                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue
                                </button>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => {
                                    setShowCryptoModal(false);
                                    setDepositAmount('');
                                    setCryptoAgreedToTerms(false);
                                }}
                                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Crypto Currency Selection Modal */}
                {showCryptoPaymentModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative">
                            {/* Header */}
                            <div className="bg-white p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-xl">W</span>
                                        </div>
                                        <span className="text-gray-900 font-bold text-lg">WORK_UP</span>
                                    </div>
                                    <button className="px-6 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg">
                                        Sign up
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Select currency</h2>
                                <p className="text-lg text-gray-700 mb-6">{depositAmount || '100'} USD</p>

                                {/* Select Network Info */}
                                <div className="mb-6">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Select network</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <span>You pay network fee</span>
                                    </div>
                                </div>

                                {/* Timer */}
                                <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Expiration time</span>
                                    <span className="text-green-600 font-semibold">00:29:44</span>
                                </div>

                                {/* Currency Dropdown */}
                                <div className="mb-4">
                                    <div className="border border-gray-300 rounded-xl p-4">
                                        <button
                                            onClick={() => setSelectedCurrency(selectedCurrency ? '' : 'show')}
                                            className="w-full flex items-center justify-between text-left"
                                        >
                                            <span className="text-gray-700 font-medium">
                                                {selectedCurrency && selectedCurrency !== 'show' ? selectedCurrency : 'Select currency'}
                                            </span>
                                            <svg className={`w-5 h-5 text-gray-400 transition-transform ${selectedCurrency === 'show' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Currency List */}
                                        {selectedCurrency === 'show' && (
                                            <div className="mt-4 space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder="Search"
                                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                />

                                                {[
                                                    { name: 'USDT', icon: '₮', color: 'from-green-400 to-green-500' },
                                                    { name: 'BTC', icon: '₿', color: 'from-orange-400 to-orange-500' },
                                                    { name: 'LTC', icon: 'Ł', color: 'from-blue-400 to-blue-500' },
                                                    { name: 'TRX', icon: 'T', color: 'from-red-400 to-red-500' },
                                                    { name: 'ETH', icon: 'Ξ', color: 'from-purple-400 to-purple-500' }
                                                ].map((currency) => (
                                                    <button
                                                        key={currency.name}
                                                        onClick={() => setSelectedCurrency(currency.name)}
                                                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                                    >
                                                        <div className={`w-10 h-10 bg-gradient-to-br ${currency.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                                                            {currency.icon}
                                                        </div>
                                                        <span className="font-semibold text-gray-900">{currency.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Network Selection (placeholder) */}
                                <div className="mb-6">
                                    <div className="border border-gray-300 rounded-xl p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500">Select network</span>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Proceed Button */}
                                <button
                                    onClick={handleCryptoPayment}
                                    disabled={!selectedCurrency || selectedCurrency === 'show'}
                                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Proceed to the payment
                                </button>

                                {/* Footer Links */}
                                <div className="mt-6 text-center">
                                    <p className="text-xs text-gray-500">
                                        AML Policy
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Please contact us if you have any questions
                                    </p>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => {
                                    setShowCryptoPaymentModal(false);
                                    setSelectedCurrency('');
                                }}
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Deposit;
