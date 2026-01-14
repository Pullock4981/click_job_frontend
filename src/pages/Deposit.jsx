import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaGem, FaBitcoin, FaTimes, FaWallet } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const Deposit = () => {
    const { user, refreshUser } = useAuth();
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
    const [transactionId, setTransactionId] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [proofImage, setProofImage] = useState(null);

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
        if (method === 'bKash' || method === 'Nagad' || method === 'Rocket') {
            setSelectedCurrency(method);
            setShowBkashModal(true);
        } else {
            toast.error(`Payment method ${method} is not available in demo mode`);
        }
    };

    const handleConfirmDeposit = async () => {
        try {
            if (!transactionId) {
                toast.error('Please enter Transaction ID');
                return;
            }

            const res = await api.post('/wallet/deposit', {
                amount: parseFloat(depositAmount),
                paymentMethod: selectedCurrency,
                referenceId: transactionId,
                metadata: {
                    phone: bkashNumber,
                    proof: proofImage,
                }
            });

            if (res.success) {
                toast.success('Deposit request submitted successfully! Funds will be added after verification.');
                setShowBkashModal(false);
                setShowCryptoPaymentModal(false);
                setDepositAmount('');
                setTransactionId('');
                setBkashNumber('');
                setProofImage(null);
                refreshUser();
            }
        } catch (err) {
            toast.error(err.message || 'Deposit failed');
        }
    };

    const handleProofUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            toast.loading('Uploading proof...', { id: 'upload' });
            const res = await api.upload('/upload/single', file);
            if (res.success) {
                setProofImage(res.data.url);
                toast.success('Proof uploaded!', { id: 'upload' });
            }
        } catch (err) {
            toast.error(err.message || 'Upload failed', { id: 'upload' });
        }
    };

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8">
                <div className="bg-primary h-48 md:h-56 w-full flex items-center px-4 md:px-8">
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-base-200 dark:bg-base-900 rounded-lg shadow-sm border border-base-content/5 p-6 md:p-8">
                                <h2 className="text-primary font-bold text-xl mb-8 flex items-center gap-3">
                                    <FaWallet className="text-primary" /> Deposit Methods
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div
                                        onClick={handleInstantDeposit}
                                        className="bg-base-100 dark:bg-base-800 rounded-xl p-6 text-center hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-primary/20 group"
                                    >
                                        <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <FaGem className="text-white text-2xl" />
                                        </div>
                                        <h3 className="text-base-content font-bold text-sm">Instant Deposit</h3>
                                        <p className="text-[10px] text-base-content/50 mt-2 font-bold uppercase tracking-widest">Nagad / bKash / Rocket</p>
                                    </div>

                                    <div
                                        onClick={handleCryptoDeposit}
                                        className="bg-base-100 dark:bg-base-800 rounded-xl p-6 text-center hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-primary/20 group"
                                    >
                                        <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <FaBitcoin className="text-white text-3xl" />
                                        </div>
                                        <h3 className="text-base-content font-bold text-sm">Crypto Deposit</h3>
                                        <p className="text-[10px] text-base-content/50 mt-2 font-bold uppercase tracking-widest">USDT / LTC / TRX</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/90 rounded-lg p-8 text-white shadow-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-bold uppercase tracking-widest opacity-80">Current Deposit Balance</p>
                                    <p className="text-3xl font-black">${user?.depositBalance?.toFixed(3) || '0.000'}</p>
                                </div>
                                <div className="h-px bg-white/20 w-full"></div>
                                <p className="text-[13px] opacity-90 leading-relaxed font-medium">
                                    Deposited funds can be used to post jobs or buy premium plans.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white dark:bg-base-900 rounded-lg shadow-sm border border-gray-100 dark:border-base-content/5 p-8 self-start">
                                <h3 className="text-primary dark:text-gray-200 font-bold text-lg mb-6">Convert Balance (Coming Soon)</h3>
                                <div className="space-y-4">
                                    <div className="bg-gray-50 dark:bg-base-200 rounded-lg p-4">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Earning Balance</p>
                                        <p className="text-2xl font-black text-gray-700 dark:text-gray-200">${user?.earningBalance?.toFixed(3) || '0.000'}</p>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Amount to convert (Min $1)"
                                        disabled
                                        className="w-full bg-[#EAEEF3]/50 dark:bg-base-200/50 border-none rounded p-4 text-[13px] text-gray-400 cursor-not-allowed font-medium"
                                    />
                                    <button disabled className="w-full bg-gray-300 dark:bg-gray-700 text-white font-bold py-4 rounded-lg cursor-not-allowed uppercase tracking-widest text-xs">
                                        Convert to Wallet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deposit Modal */}
            {showDepositModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-base-800 rounded-2xl w-full max-w-md p-6 relative">
                        <button onClick={() => setShowDepositModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><FaTimes /></button>
                        <h3 className="text-xl font-bold mb-6">Deposit Amount</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Amount (USD)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-50 dark:bg-base-900 border border-gray-200 dark:border-white/5 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Enter amount (Min $1)"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                />
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="checkbox checkbox-primary checkbox-xs" />
                                <span className="text-xs text-gray-500">I agree to the deposit terms and conditions</span>
                            </label>
                            <button
                                onClick={handleContinueToPayment}
                                disabled={!depositAmount || parseFloat(depositAmount) < 1 || !agreedToTerms}
                                className="btn btn-primary w-full"
                            >Continue to Payment</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Method Selection */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-base-800 rounded-2xl w-full max-w-md p-6 relative">
                        <button onClick={() => setShowPaymentModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><FaTimes /></button>
                        <h3 className="text-xl font-bold mb-6">Select Payment Method</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {['bKash', 'Nagad', 'Rocket'].map(method => (
                                <button key={method} onClick={() => handlePaymentMethod(method)} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-base-900 rounded-xl hover:bg-gray-100 transition-colors group">
                                    <span className="font-bold">{method}</span>
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
                                        <FaGem className="text-primary text-xs" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showBkashModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-base-800 rounded-2xl w-full max-w-md p-6 relative">
                        <button onClick={() => setShowBkashModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><FaTimes /></button>
                        <h3 className="text-xl font-bold mb-4">Complete Payment</h3>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6 border border-yellow-100 dark:border-yellow-900/30">
                            <p className="text-xs text-yellow-700 dark:text-yellow-500 font-medium">
                                Send <strong>{parseFloat(depositAmount) * 120} BDT</strong> to our <strong>{selectedCurrency} Personal Number: 01700000000</strong> using "Send Money" option.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your {selectedCurrency} Number</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 dark:bg-base-900 border border-gray-200 rounded-lg p-3 outline-none"
                                    placeholder="017XXXXXXXX"
                                    value={bkashNumber}
                                    onChange={(e) => setBkashNumber(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Transaction ID</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 dark:bg-base-900 border border-gray-200 dark:border-white/5 rounded-lg p-3 outline-none"
                                    placeholder="TRX1234567"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Payment Proof (Screenshot)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProofUpload}
                                        className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                    />
                                </div>
                                {proofImage && (
                                    <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                                        <img src={proofImage} alt="Proof" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <button onClick={handleConfirmDeposit} disabled={!transactionId || !bkashNumber} className="btn btn-primary w-full">Confirm Deposit</button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Deposit;
