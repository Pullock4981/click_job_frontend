import React, { useState, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../contexts/AuthContext';

const PlayAndEarn = () => {
    const { updateUser } = useAuth();
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);
    const wheelRef = useRef(null);

    const segments = [
        { amount: "0.0004", color: "#00728c" }, // Teal
        { amount: "0.0001", color: "#e91e63" }, // Pink
        { amount: "0.0003", color: "#ff9800" }, // Orange
        { amount: "0.0001", color: "#f06292" }, // Magenta-ish
        { amount: "0.0002", color: "#4caf50" }, // Green
        { amount: "0.0002", color: "#64b5f6" }, // Blue
        { amount: "0.0001", color: "#ec407a" }, // Darker Pink
        { amount: "0.0001", color: "#f48fb1" }  // Lighter Pink
    ];

    const handleSpin = async () => {
        if (isSpinning) return;

        try {
            setIsSpinning(true);
            setResult(null);

            // 1. Get result from backend
            const response = await api.post(API_ENDPOINTS.SPIN_WHEEL);

            if (response.success) {
                const { index, amount, walletBalance } = response.data;

                // 2. Calculate rotation
                // Each segment is 45 degrees
                // To center segment 'index' at the top (which is where we assume the pointer is)
                // The segments are drawn clockwise starting from the right (0 deg) usually in CSS conical gradients
                // But let's assume segment 0 starts at 0 deg and goes to 45 deg.
                // To put segment 'index' at the top (pointing at 12 o'clock relative to the container)
                // We need to rotate the wheel.

                const extraSpins = 5; // 5 full rotations
                const segmentAngle = 360 / segments.length;

                // We want segment 'index' to line up with the pointer at 12 o'clock (270 degrees in standard math, but 0 in CSS transform if pointer is there)
                // The new rotation should be: current rotation + full circles + adjustment
                // Formula: (extraSpins * 360) + (360 - (index * segmentAngle)) - (segmentAngle / 2)
                // We add it to current rotation to keep spinning forward
                const targetRotation = (extraSpins * 360) + (360 - (index * segmentAngle)) - (segmentAngle / 2);
                const nextRotation = rotation + (360 - (rotation % 360)) + targetRotation;

                setRotation(nextRotation);

                // 3. Wait for animation to finish (5 seconds)
                setTimeout(() => {
                    setIsSpinning(false);
                    setResult(amount);
                    toast.success(`Congratulations! You earned $${amount}`);

                    // Update user balance in context
                    updateUser({ walletBalance });
                }, 5000);
            } else {
                setIsSpinning(false);
                toast.error(response.message || 'Failed to spin');
            }
        } catch (error) {
            setIsSpinning(false);
            console.error('Spin error:', error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8 pb-12">


                {/* Blue Header Section */}
                <div className="bg-primary h-48 md:h-56 w-full"></div>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto px-4 -mt-32 md:-mt-40">
                    <div className="bg-base-200 rounded-lg shadow-sm overflow-hidden border border-base-content/5">
                        {/* Title Bar */}
                        <div className="p-6 border-b border-base-content/5">
                            <h2 className="text-primary font-bold text-lg md:text-xl">Spin and Earn</h2>
                        </div>


                        {/* Spinner Section */}
                        <div className="flex-1 flex flex-col justify-center items-center py-16 px-4 relative">

                            {/* Pointer Indicator */}
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-40">
                                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-500 drop-shadow-md"></div>
                            </div>

                            {/* The Wheel */}
                            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
                                <div
                                    ref={wheelRef}
                                    className="w-full h-full rounded-full border-4 border-gray-100 dark:border-base-200 relative overflow-hidden transition-transform duration-[5000ms] ease-[cubic-bezier(0.15,0,0.15,1)] shadow-2xl"
                                    style={{
                                        transform: `rotate(${rotation}deg)`,
                                        background: `conic-gradient(
                                            ${segments.map((s, i) => `${s.color} ${i * 45}deg ${(i + 1) * 45}deg`).join(', ')}
                                        )`
                                    }}
                                >
                                    {/* Labels */}
                                    {segments.map((s, i) => (
                                        <div
                                            key={i}
                                            className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 origin-bottom flex items-start justify-center pt-10"
                                            style={{ transform: `translateX(-50%) rotate(${i * 45 + 22.5}deg)` }}
                                        >
                                            <span className="text-white font-black text-sm md:text-lg tracking-wider" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                                {s.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Center Spin Button */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-[#00728c] rounded-full border-4 border-white dark:border-base-100 shadow-xl flex items-center justify-center z-50">
                                    <button
                                        onClick={handleSpin}
                                        disabled={isSpinning}
                                        className="w-full h-full text-white font-black text-xs md:text-sm hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                                    >
                                        {isSpinning ? '...' : 'SPIN'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer inside content area */}
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[11px] text-base-content/40 font-bold uppercase tracking-widest gap-4">
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

            <style jsx="true">{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </Layout>
    );
};

export default PlayAndEarn;
