import React, { useState, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { FaImage, FaLink, FaAd, FaPalette } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const AdsNew = () => {
    const [title, setTitle] = useState('');
    const [destination, setDestination] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const pricing = [
        { days: 1, price: 6 },
        { days: 2, price: 10 },
        { days: 3, price: 15 },
        { days: 4, price: 20 },
        { days: 5, price: 25 },
        { days: 6, price: 30 },
        { days: 7, price: 33 },
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !destination || !selectedDuration || !image) {
            toast.error('Please fill all fields and select a banner image');
            return;
        }

        setLoading(true);
        try {
            // 1. Upload Image
            const formData = new FormData();
            formData.append('file', image);
            const uploadRes = await api.post(API_ENDPOINTS.UPLOAD_SINGLE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (!uploadRes.success) {
                throw new Error('Image upload failed');
            }

            // 2. Create Advertisement
            const adData = {
                title,
                link: destination,
                image: uploadRes.data.secureUrl,
                position: 'banner', // Default to banner for this page
                durationDays: selectedDuration.days,
                price: selectedDuration.price,
                // In a real app, you'd also handle payment here
            };

            const response = await api.post(API_ENDPOINTS.ADVERTISEMENTS, adData);
            if (response.success) {
                toast.success('Advertisement submitted successfully and pending approval!');
                // Reset form
                setTitle('');
                setDestination('');
                setSelectedDuration(null);
                setImage(null);
                setImagePreview(null);
            }
        } catch (error) {
            console.error('Error creating ad:', error);
            toast.error(error.message || 'Error submitting advertisement');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8">

                {/* Header Section */}
                <div className="bg-primary h-48 md:h-56 w-full"></div>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto px-4 -mt-32 md:-mt-40 pb-20">
                    <div className="bg-base-200 rounded-lg shadow-sm overflow-hidden border border-base-content/5">
                        {/* Title Bar */}
                        <div className="p-6 border-b border-base-content/5">
                            <h2 className="text-primary font-bold text-lg">Advertisement</h2>
                        </div>


                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            {/* Ads Title */}
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Ads Title</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaAd /></span>
                                    <input
                                        type="text"
                                        placeholder="Ads Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-base-200 dark:bg-base-200 border border-base-content/10 rounded p-4 pl-12 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"

                                    />
                                </div>
                            </div>

                            {/* Target Destination */}
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Target Destination</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaLink /></span>
                                    <input
                                        type="url"
                                        placeholder="https://demo.com/"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-base-200 border border-gray-100 dark:border-base-content/10 rounded p-4 pl-12 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Pricing Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pricing.map((item) => (
                                    <div
                                        key={item.days}
                                        onClick={() => setSelectedDuration(item)}
                                        className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-all ${selectedDuration?.days === item.days
                                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                            : 'border-base-content/10 hover:border-base-content/20'
                                            }`}

                                    >
                                        <div className="flex items-center gap-3">
                                            <FaImage className="text-gray-400" />
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{item.days} Day{item.days > 1 ? 's' : ''}</span>
                                        </div>
                                        <span className="text-sm font-black text-gray-800 dark:text-gray-100">${item.price}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Banner Image Note & Button */}
                            <div className="space-y-4">
                                <p className="text-blue-500 font-bold text-xs italic">
                                    *Image resolution max- width (1000px) & max- height (500px) ( allow only jpg , png )
                                </p>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />

                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="flex items-center gap-2 bg-gray-100 dark:bg-base-200 hover:bg-gray-200 dark:hover:bg-base-300 px-6 py-3 rounded text-sm font-bold text-gray-600 dark:text-gray-300 transition-colors"
                                    >
                                        <FaImage /> {image ? 'Change Banner image' : 'Select Banner image'}
                                    </button>

                                    {imagePreview && (
                                        <div className="relative group">
                                            <img src={imagePreview} alt="Preview" className="h-12 w-20 object-cover rounded border border-gray-200" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                                <button type="button" onClick={() => { setImage(null); setImagePreview(null); }} className="text-white text-xs">Remove</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded shadow-md transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer inside content area */}
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest gap-4">
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
        </Layout>
    );
};

export default AdsNew;
