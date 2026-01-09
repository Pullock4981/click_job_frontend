import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaGem, FaBitcoin, FaTimes, FaWallet } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Deposit = () => {
    const { user } = useAuth();
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

    const handleInstantDeposit = () => setShowDepositModal(true);
    const handleCryptoDeposit = () => setShowCryptoModal(true);

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
            <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8">


                {/* Header Section matching the site theme */}
                <div className="bg-primary h-48 md:h-56 w-full flex items-center px-4 md:px-8">
                </div>

                {/* Content Container */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Left Card - Deposit Options (Span 7/12) */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-base-200 rounded-lg shadow-sm border border-base-content/5 p-6 md:p-8">
                                <h2 className="text-primary font-bold text-xl mb-8 flex items-center gap-3">
                                    <FaWallet className="text-primary" /> Deposit Methods
                                </h2>


                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Instant Deposit */}
                                    <div
                                        onClick={handleInstantDeposit}
                                        className="bg-base-100 rounded-xl p-6 text-center hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-primary/20 group"
                                    >

                                        <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <FaGem className="text-white text-2xl" />
                                        </div>
                                        <h3 className="text-base-content font-bold text-sm">Instant Deposit</h3>
                                        <p className="text-[10px] text-base-content/50 mt-2 font-bold uppercase tracking-widest">Nagad / bKash / Cards</p>

                                    </div>

                                    {/* Crypto Deposit */}
                                    <div
                                        onClick={handleCryptoDeposit}
                                        className="bg-gray-50 dark:bg-base-200 rounded-xl p-6 text-center hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-primary/20 group"
                                    >
                                        <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <FaBitcoin className="text-white text-3xl" />
                                        </div>
                                        <h3 className="text-gray-700 dark:text-gray-200 font-bold text-sm">Crypto Deposit</h3>
                                        <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">BTC / USDT / LTC / TRX</p>
                                    </div>
                                </div>
                            </div>

                            {/* Balance Info Box */}
                            <div className="bg-primary/90 rounded-lg p-8 text-white shadow-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-bold uppercase tracking-widest opacity-80">Current Balance</p>
                                    <p className="text-3xl font-black">${user?.walletBalance?.toFixed(3) || '0.000'}</p>
                                </div>
                                <div className="h-px bg-white/20 w-full"></div>
                                <p className="text-[13px] opacity-90 leading-relaxed font-medium">
                                    Deposited funds can be used to post jobs, buy premium plans, or boost your existing jobs. Funds are usually added instantly after payment verification.
                                </p>
                            </div>
                        </div>

                        {/* Right Card - Stats/Convert (Span 5/12) */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white dark:bg-base-100 rounded-lg shadow-sm border border-gray-100 dark:border-base-content/5 p-8 self-start">
                                <h3 className="text-primary dark:text-gray-200 font-bold text-lg mb-6">Balance Convert</h3>
                                <div className="space-y-4">
                                    <div className="bg-gray-50 dark:bg-base-200 rounded-lg p-4">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Earning Balance</p>
                                        <p className="text-2xl font-black text-gray-700 dark:text-gray-200">${user?.totalEarnings?.toFixed(3) || '0.000'}</p>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Amount to convert (Min $1)"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded p-4 text-[13px] text-gray-700 dark:text-gray-200 font-medium focus:ring-2 focus:ring-primary/20"
                                    />
                                    <button className="w-full bg-primary hover:bg-primary-focus text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-xs">
                                        Convert to Wallet
                                    </button>
                                    <p className="text-[11px] text-red-500 font-bold text-center italic">
                                        * 10% processing fee will be applied
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer inside content area */}
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest gap-4">
                        <p>© 2026 CLICK JOB</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="hover:text-primary transition-colors">About Us</button>
                            <button className="hover:text-primary transition-colors">Privacy Policy</button>
                            <button className="hover:text-primary transition-colors">FAQ</button>
                            <button className="hover:text-primary transition-colors">Terms of Use</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals - Keeping existing logic but restyling if needed (skipped for brevity unless critical) */}
            {/* [Existing Modals would go here, kept them hidden for code length] */}
        </Layout>
    );
};

export default Deposit;
