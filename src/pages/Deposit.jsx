import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaGem, FaBitcoin, FaTimes, FaWallet } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const Deposit = () => {
    const { user, refreshUser } = useAuth();

    // Modal States
    const [showInstantModal, setShowInstantModal] = useState(false);
    const [showBkashModal, setShowBkashModal] = useState(false);
    const [showCryptoModal, setShowCryptoModal] = useState(false);
    const [showGatewayModal, setShowGatewayModal] = useState(false);
    const [showBkashPGWModal, setShowBkashPGWModal] = useState(false); // New bKash PGW simulation
    const [showPaymentEntryModal, setShowPaymentEntryModal] = useState(false);

    // Form States
    const [depositAmount, setDepositAmount] = useState('');
    const [convertAmount, setConvertAmount] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [bkashNumber, setBkashNumber] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('bKash');
    const [proofImage, setProofImage] = useState(null);
    const [gatewayMethod, setGatewayMethod] = useState(null);

    // Handlers
    const handleInstantDeposit = () => {
        setDepositAmount('');
        setAgreedToTerms(false);
        setSelectedCurrency('Instant'); // Track source
        setShowInstantModal(true);
    };

    const handleBkashPayment = () => {
        setDepositAmount('');
        setAgreedToTerms(false);
        setSelectedCurrency('bKash');
        setShowBkashModal(true);
    };

    const handleCryptoDeposit = () => {
        setDepositAmount('');
        setAgreedToTerms(false);
        setSelectedCurrency('Crypto');
        setShowCryptoModal(true);
    };

    const handleProceedToPayment = () => {
        if (!depositAmount || !agreedToTerms) return;

        // Close init modals
        setShowInstantModal(false);
        setShowBkashModal(false);
        setShowCryptoModal(false);
        setGatewayMethod(null);

        // Routing logic
        if (selectedCurrency === 'bKash') {
            setShowBkashPGWModal(true);
        } else {
            setShowGatewayModal(true);
        }
    };

    // From PGW -> Verify
    const handleBkashPGWConfirm = () => {
        // Validation could go here (e.g. check if number entered)
        // For simulation, just proceed
        setShowBkashPGWModal(false);
        setShowPaymentEntryModal(true);
    };

    const handleNextVerify = () => {
        setShowGatewayModal(false);
        setShowPaymentEntryModal(true);
    };

    const handleConvertBalance = async () => {
        if (!convertAmount || parseFloat(convertAmount) < 1) {
            toast.error('Minimum conversion amount is $1');
            return;
        }

        try {
            const res = await api.post('/wallet/convert', { amount: parseFloat(convertAmount) });
            if (res.success) {
                toast.success(res.message);
                setConvertAmount('');
                refreshUser();
            }
        } catch (err) {
            toast.error(err.message || 'Conversion failed');
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
                paymentMethod: gatewayMethod || selectedCurrency,
                referenceId: transactionId,
                metadata: {
                    phone: bkashNumber,
                    proof: proofImage,
                }
            });

            if (res.success) {
                toast.success('Deposit submitted! Funds will be added after verification.');
                setShowPaymentEntryModal(false);
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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    return (
        <Layout showFooter={true}>
            {/* Same Hero & Convert Sections - preserving existing code */}
            <div className="min-h-screen bg-[#0F172A] -m-2 xs:-m-3 md:-m-8 pb-20">
                <div className="bg-[#0F172A] pt-16 pb-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-20 right-20 w-1 h-30 bg-white/20 rotate-45"></div>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-12 relative z-10">Bultifore services worldwide</h1>
                    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        <div onClick={handleInstantDeposit} className="bg-[#1E293B] rounded-lg p-8 hover:bg-[#253248] transition-all cursor-pointer border border-white/5 shadow-xl group">
                            <div className="w-16 h-16 mx-auto mb-6 bg-[#0F172A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner"><FaGem className="text-red-500 text-2xl" /></div>
                            <h3 className="text-white font-medium text-lg">Instant Deposit</h3>
                        </div>
                        <div onClick={handleBkashPayment} className="bg-[#1E293B] rounded-lg p-8 hover:bg-[#253248] transition-all cursor-pointer border border-white/5 shadow-xl group">
                            <div className="w-16 h-16 mx-auto mb-6 bg-[#E2136E] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg"><FaGem className="text-white text-2xl" /></div>
                            <h3 className="text-white font-medium text-lg">bKash Payment</h3>
                        </div>
                        <div onClick={handleCryptoDeposit} className="bg-[#1E293B] rounded-lg p-8 hover:bg-[#253248] transition-all cursor-pointer border border-white/5 shadow-xl group">
                            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border-4 border-blue-500"><FaBitcoin className="text-orange-500 text-3xl" /></div>
                            <h3 className="text-white font-medium text-lg">Crypto Deposit</h3>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 mt-20">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#172138] to-[#1E293B] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center"><FaGem className="text-9xl text-blue-500 animate-pulse" /></div>
                        <div className="relative z-10 w-full md:w-1/2 flex justify-center">
                            <div className="w-64 h-64 md:w-80 md:h-80 relative">
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="relative w-full h-full border border-blue-500/30 rounded-full flex items-center justify-center overflow-hidden bg-[#0F172A]/50 backdrop-blur-sm">
                                    <div className="absolute inset-0 bg-[url('https://cdn-icons-png.flaticon.com/512/44/44386.png')] bg-cover opacity-50 bg-center filter invert"></div>
                                    <div className="bg-white p-6 rounded-xl shadow-2xl relative transform rotate-[-10deg]">
                                        <div className="flex flex-col gap-2"><div className="h-2 w-24 bg-blue-200 rounded"></div><div className="h-2 w-16 bg-blue-100 rounded"></div><FaGem className="text-blue-500 text-4xl mt-2 mx-auto" /></div>
                                    </div>
                                    <div className="absolute bottom-10 right-10 bg-[#00C875] text-white p-3 rounded-full shadow-lg"><FaWallet /></div>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 w-full md:w-1/2 max-w-md">
                            <div className="bg-[#162032] p-8 rounded-2xl border border-white/5 shadow-2xl">
                                <h3 className="text-white font-bold text-center mb-8">Balance Convert</h3>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-400 font-bold tracking-widest text-xs">BALANCE</span>
                                    <span className="text-white font-bold text-xl">${user?.earningBalance?.toFixed(3) || '0.000'}</span>
                                </div>
                                <div className="mb-2"><input type="number" placeholder="Minimum Deposit $1" className="w-full bg-white text-gray-800 rounded-full px-6 py-4 outline-none font-bold text-sm" value={convertAmount} onChange={(e) => setConvertAmount(e.target.value)} /></div>
                                <p className="text-red-500 text-[10px] mb-6">10% will be deducted as a convert fee.</p>
                                <button onClick={handleConvertBalance} className="w-full bg-[#00A3D6] hover:bg-[#008cb9] text-white font-bold py-4 rounded-full uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20 transition-all">Earning to Deposit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Instant Deposit Modal */}
            {showInstantModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500/90 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl w-full max-w-4xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
                        <button onClick={() => setShowInstantModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-blue-600 mb-2">Instant Deposit</h2>
                            <p className="text-red-500 text-xs font-medium">• Always send the exact amount in BDT as shown. If you send less than the minimum required amount, a 50% deduction will be applied.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2">Enter Deposit Amount</label>
                                <div className="relative">
                                    <input type="number" className="w-full border border-gray-200 rounded p-3 pl-4 outline-none focus:border-blue-500 text-black font-bold" placeholder="Amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                                    <span className="absolute right-4 top-3 text-gray-400 font-bold text-sm">$</span>
                                </div>
                            </div>
                            <div>
                                <div className="bg-gray-100 rounded p-3 h-full flex flex-col justify-center relative">
                                    <div className="flex justify-between items-center text-gray-600 font-bold"><span className="text-green-500">BDT</span><span>{depositAmount ? (parseFloat(depositAmount) * 110).toFixed(0) : '0'} BDT</span></div>
                                </div>
                                <p className="text-[10px] text-green-500 font-bold mt-1 text-right">$ 1 = 110 BDT</p>
                            </div>
                        </div>
                        <div className="mb-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="w-5 h-5 border-gray-300 rounded text-pink-500 focus:ring-pink-500 checkbox checkbox-primary" />
                                <span className="text-sm text-gray-500">I agree to all Terms of Service and all Policy.</span>
                            </label>
                        </div>
                        <div className="text-left">
                            <button onClick={handleProceedToPayment} disabled={!depositAmount || !agreedToTerms} className="px-12 py-3 bg-[#E2136E] hover:bg-[#C20E5C] text-white font-bold rounded shadow-lg transition-all mb-8 disabled:opacity-50 disabled:cursor-not-allowed">Continue to payment</button>
                        </div>
                        <div className="flex justify-center gap-6 grayscale opacity-60">
                            <div className="font-black text-xl italic tracking-tighter">bKash</div>
                            <div className="font-black text-xl italic tracking-tighter">Rocket</div>
                            <div className="font-black text-xl italic tracking-tighter">Nagad</div>
                            <div className="font-black text-xl italic tracking-tighter">VISA</div>
                        </div>
                    </div>
                </div>
            )}

            {/* bKash Payment Modal */}
            {showBkashModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500/90 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl w-full max-w-4xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
                        <button onClick={() => setShowBkashModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button>
                        <div className="text-center mb-10"><h2 className="text-3xl font-bold text-blue-600">Bkash Payment</h2></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2">Enter Deposit Amount</label>
                                <div className="relative">
                                    <input type="number" className="w-full border border-gray-200 rounded p-3 pl-4 outline-none focus:border-blue-500 text-black font-bold" placeholder="Amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                                    <span className="absolute right-4 top-3 text-gray-400 font-bold text-sm">$</span>
                                </div>
                            </div>
                            <div>
                                <div className="bg-gray-100 rounded p-3 h-full flex flex-col justify-center relative">
                                    <div className="flex justify-between items-center text-gray-600 font-bold"><span className="text-green-500">BDT</span><span>{depositAmount ? (parseFloat(depositAmount) * 110).toFixed(0) : '0'} BDT</span></div>
                                </div>
                                <div className="flex justify-between mt-1"><p className="text-[10px] text-green-500 font-bold">$ 1 = 110 BDT</p><p className="text-[10px] text-green-500 font-bold">+With 1.9% Fee</p></div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="w-5 h-5 border-gray-300 rounded text-pink-500 focus:ring-pink-500 checkbox checkbox-primary" />
                                <span className="text-sm text-gray-500">I agree to all Terms of Service and all Policy.</span>
                            </label>
                        </div>
                        <div className="text-left">
                            <button onClick={handleProceedToPayment} disabled={!depositAmount || !agreedToTerms} className="px-12 py-3 bg-[#E2136E] hover:bg-[#C20E5C] text-white font-bold rounded shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Continue to payment</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Crypto Deposit Modal */}
            {showCryptoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500/90 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl w-full max-w-4xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
                        <button onClick={() => setShowCryptoModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><FaTimes size={20} /></button>
                        <div className="text-center mb-10"><h2 className="text-2xl font-bold text-[#4F46E5]">Crypto Deposit</h2></div>
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-gray-500 mb-2">Enter Deposit Amount</label>
                            <div className="relative">
                                <input type="number" className="w-full border border-gray-200 rounded p-3 pl-4 outline-none focus:border-blue-500 text-black font-bold" placeholder="Amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                                <span className="absolute right-4 top-3 text-gray-400 font-bold text-sm">$</span>
                            </div>
                        </div>
                        <div className="mb-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="w-5 h-5 border-gray-300 rounded text-pink-500 focus:ring-pink-500 checkbox checkbox-primary" />
                                <span className="text-sm text-gray-500">I agree to all Terms of Service and all Policy.</span>
                            </label>
                        </div>
                        <div className="text-left">
                            <button onClick={handleProceedToPayment} disabled={!depositAmount || !agreedToTerms} className="px-10 py-3 bg-[#E2136E] hover:bg-[#C20E5C] text-white font-bold rounded shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Continue</button>
                        </div>
                    </div>
                </div>
            )}

            {/* bKash PGW Simulation Modal */}
            {showBkashPGWModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white w-full max-w-sm overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="bg-white p-4 border-b border-gray-200">
                            <div className="flex justify-center mb-4">
                                {/* bKash Logo Placeholder - using Text if image not available */}
                                <div className="text-[#E2136E] text-2xl font-black italic">
                                    bKash<span className="text-xl">🕊️</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start text-xs text-gray-600">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full border border-green-500 flex items-center justify-center"><span className="text-green-600 font-bold">W</span></div>
                                    <div>
                                        <p className="font-bold text-gray-800">WORKUPJOBDOTCOM-RM59649</p>
                                        <p className="text-[10px] text-gray-400">Inv No: Inv_q0VanZ</p>
                                    </div>
                                </div>
                                <div className="font-bold text-lg text-gray-800">
                                    ৳{(parseFloat(depositAmount) * 110 * 1.019).toFixed(0)}
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="bg-[#E2136E] p-8 text-center text-white h-72 flex flex-col justify-center relative">
                            <p className="mb-4">Your bKash Account Number</p>
                            <input
                                type="text"
                                placeholder="e.g 01XXXXXXXXX"
                                className="w-full p-3 rounded text-center text-black outline-none font-bold"
                                value={bkashNumber}
                                onChange={(e) => setBkashNumber(e.target.value)}
                            />
                            <p className="text-[10px] mt-4 opacity-80">Confirm and proceed, <span className="underline cursor-pointer font-bold">terms & conditions</span></p>
                        </div>

                        {/* Footer Buttons */}
                        <div className="grid grid-cols-2">
                            <button onClick={() => setShowBkashPGWModal(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-600 py-4 font-bold uppercase text-sm border-r border-gray-300">Cancel</button>
                            <button onClick={handleBkashPGWConfirm} className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 font-bold uppercase text-sm">Confirm</button>
                        </div>
                        <div className="bg-white py-2 text-center">
                            <a href="tel:16247" className="text-[#E2136E] font-bold text-xs flex items-center justify-center gap-1">📞 16247</a>
                            <p className="text-[10px] text-gray-400 mt-1">© 2026 bKash, All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Generic Gateway Modal (Nagad / Instant fallback) */}
            {showGatewayModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl w-full max-w-md p-0 overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="bg-[#FFE8B6] p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-green-500 p-1">
                                    <span className="font-bold text-green-600 text-xl">W</span>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase">Payment To</div>
                                    <div className="font-bold text-gray-800">workupjob.com</div>
                                </div>
                            </div>
                            <div className="text-right border-l border-gray-400 pl-4">
                                <div className="text-xl font-bold">{depositAmount}</div>
                                <div className="text-xs font-bold text-gray-500">USD</div>
                            </div>
                        </div>

                        <div className="p-6">
                            <p className="font-bold text-gray-700 mb-4">• Select Payment Method</p>

                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setGatewayMethod('bKash')}
                                    className={`p-2 border rounded-lg hover:bg-gray-50 transition-all ${gatewayMethod === 'bKash' ? 'ring-2 ring-pink-500 bg-pink-50' : ''}`}
                                >
                                    {/* Placeholder for bKash Logo */}
                                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-1">
                                        <FaGem className="text-pink-600" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600 block text-center">bKash</span>
                                </button>
                                <button
                                    onClick={() => setGatewayMethod('Nagad')}
                                    className={`p-2 border rounded-lg hover:bg-gray-50 transition-all ${gatewayMethod === 'Nagad' ? 'ring-2 ring-orange-500 bg-orange-50' : ''}`}
                                >
                                    {/* Placeholder for Nagad Logo */}
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-1">
                                        <FaGem className="text-orange-500" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600 block text-center">Nagad</span>
                                </button>
                            </div>

                            {/* bKash Instructions */}
                            {gatewayMethod === 'bKash' && (
                                <div className="bg-[#E2136E] text-white p-6 rounded-lg shadow-lg">
                                    <h4 className="font-bold text-sm mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
                                        • Send Tk according to below rules
                                    </h4>
                                    <ul className="space-y-3 text-sm font-medium">
                                        <li>• 1. Select 'Cash Out'</li>
                                        <li className="flex flex-wrap items-center gap-2">
                                            • 2. Enter Below Number
                                            <div className="bg-black/20 px-2 py-1 rounded flex items-center gap-2">
                                                <span className="font-mono font-bold">01878650098</span>
                                                <button onClick={() => copyToClipboard('01878650098')} className="hover:text-yellow-300"><FaWallet /></button>
                                            </div>
                                        </li>
                                        <li>• 3. Enter Amount <span className="font-bold">{(parseFloat(depositAmount) * 110).toFixed(0)} Tk</span></li>
                                        <li>• 4. Complete and Copy The TrxID</li>
                                    </ul>
                                    <button onClick={handleNextVerify} className="w-auto mt-6 bg-[#FFC107] hover:bg-[#FFB300] text-black font-bold py-2 px-6 rounded shadow-lg float-right">
                                        Next: Verify
                                    </button>
                                    <div className="clear-both"></div>
                                </div>
                            )}

                            {/* Nagad Instructions */}
                            {gatewayMethod === 'Nagad' && (
                                <div className="bg-[#F7931A] text-white p-6 rounded-lg shadow-lg">
                                    <h4 className="font-bold text-sm mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
                                        • Send Tk according to below rules
                                    </h4>
                                    <ul className="space-y-3 text-sm font-medium">
                                        <li>• 1. Select 'Cash Out'</li>
                                        <li className="flex flex-wrap items-center gap-2">
                                            • 2. Enter Below Number
                                            <div className="bg-black/20 px-2 py-1 rounded flex items-center gap-2">
                                                <span className="font-mono font-bold">01608499959</span>
                                                <button onClick={() => copyToClipboard('01608499959')} className="hover:text-gray-800"><FaWallet /></button>
                                            </div>
                                        </li>
                                        <li>• 3. Enter Amount <span className="font-bold">{(parseFloat(depositAmount) * 110).toFixed(0)} Tk</span></li>
                                        <li>• 4. Complete and Copy The TrxID</li>
                                    </ul>
                                    <button onClick={handleNextVerify} className="w-auto mt-6 bg-[#2D3748] hover:bg-[#1A202C] text-white font-bold py-2 px-6 rounded shadow-lg float-right">
                                        Next: Verify
                                    </button>
                                    <div className="clear-both"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Verify Modal aka Payment Entry */}
            {showPaymentEntryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-base-800 rounded-2xl w-full max-w-md p-6 relative">
                        <button onClick={() => setShowPaymentEntryModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><FaTimes /></button>
                        <h3 className="text-xl font-bold mb-4">Complete Payment</h3>

                        {/* Summary of what to expect */}
                        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-sm text-gray-600">
                            Please enter the Transaction ID/Number from your <strong>{gatewayMethod || selectedCurrency}</strong> payment of <strong>{(parseFloat(depositAmount) * 110).toFixed(0)} Tk</strong>.
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Wallet Number</label>
                                <input type="text" className="w-full bg-gray-50 dark:bg-base-900 border border-gray-200 rounded-lg p-3 outline-none" placeholder="017XXXXXXXX" value={bkashNumber} onChange={(e) => setBkashNumber(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Transaction ID</label>
                                <input type="text" className="w-full bg-gray-50 dark:bg-base-900 border border-gray-200 rounded-lg p-3 outline-none" placeholder="TRX..." value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Proof</label>
                                <input type="file" onChange={handleProofUpload} className="text-xs" />
                            </div>
                            {proofImage && <img src={proofImage} className="w-20 h-20 object-cover rounded" alt="proof" />}

                            <button onClick={handleConfirmDeposit} disabled={!transactionId} className="btn btn-primary w-full">Confirm Deposit</button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Deposit;
