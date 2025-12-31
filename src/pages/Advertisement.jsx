import React from 'react';
import Layout from '../components/layout/Layout';
import { FaAd, FaBullhorn, FaMousePointer, FaEye, FaPlusCircle } from 'react-icons/fa';

const Advertisement = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-base-200 py-12 px-4 text-base-content">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl font-black flex items-center gap-4 mb-2">
                                <FaAd className="text-blue-500" /> Advertise with Us
                            </h1>
                            <p className="opacity-70">Boost your brand by showing ads to our active workers.</p>
                        </div>
                        <button className="btn btn-primary rounded-2xl h-14 px-8 font-black shadow-xl shadow-primary/20 gap-3">
                            <FaPlusCircle /> Create Campaign
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-content/5 text-center">
                            <div className="p-4 bg-orange-500/10 text-orange-500 rounded-2xl w-fit mx-auto mb-6"><FaBullhorn size={32} /></div>
                            <h3 className="text-xl font-bold mb-2">Banner Ads</h3>
                            <p className="text-sm opacity-60 mb-6">Display your banners on our high-traffic dashboard pages.</p>
                            <p className="text-2xl font-black text-primary">$0.50<span className="text-xs opacity-50 font-normal">/1k views</span></p>
                        </div>
                        <div className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-content/5 text-center">
                            <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl w-fit mx-auto mb-6"><FaMousePointer size={32} /></div>
                            <h3 className="text-xl font-bold mb-2">PTC Ads</h3>
                            <p className="text-sm opacity-60 mb-6">Guaranteed visits to your website or landing pages.</p>
                            <p className="text-2xl font-black text-primary">$0.01<span className="text-xs opacity-50 font-normal">/click</span></p>
                        </div>
                        <div className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-content/5 text-center">
                            <div className="p-4 bg-purple-500/10 text-purple-500 rounded-2xl w-fit mx-auto mb-6"><FaEye size={32} /></div>
                            <h3 className="text-xl font-bold mb-2">Video Ads</h3>
                            <p className="text-sm opacity-60 mb-6">Promote your YouTube or social media videos directly.</p>
                            <p className="text-2xl font-black text-primary">$2.00<span className="text-xs opacity-50 font-normal">/1k views</span></p>
                        </div>
                    </div>

                    <div className="bg-base-100 p-12 rounded-[3rem] shadow-2xl border border-base-content/5 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-4">Want a custom package?</h2>
                            <p className="opacity-70 mb-8 max-w-xl mx-auto">We offer special discounts for long-term partners and large-scale campaigns. Contact our sales team for a custom quote.</p>
                            <button className="btn btn-outline btn-primary rounded-xl px-10 h-14">Talk to Sales</button>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -skew-y-6 translate-y-20"></div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Advertisement;
