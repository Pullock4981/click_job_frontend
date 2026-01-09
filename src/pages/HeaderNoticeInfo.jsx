import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const ImageBox = ({ label, fieldKey, data, onChange, onFileChange }) => {
    const item = data[fieldKey] || { url: '', status: 'active' };
    const [preview, setPreview] = useState(item.url || '');

    useEffect(() => {
        setPreview(item.url || '');
    }, [item.url]);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileChange(fieldKey, file);
            // Create local preview
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm border border-gray-100 flex flex-col gap-3">
            <label className="text-xs font-bold text-gray-700">{label}</label>

            {/* File Input */}
            <div className="flex">
                <div className="flex-1 border border-gray-300 border-r-0 rounded-l-[4px] px-3 py-1.5 text-xs text-gray-500 bg-white truncate">
                    {item.file ? item.file.name : 'Choose file'}
                </div>
                <label className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-gray-200 transition-colors">
                    Browse
                    <input type="file" className="hidden" onChange={handleFile} accept="image/*" />
                </label>
            </div>

            {/* Thumbnail */}
            <div className="w-16 h-16 border border-gray-200 rounded flex items-center justify-center bg-gray-50 overflow-hidden">
                {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-[10px] text-gray-400">No Image</span>
                )}
            </div>

            {/* Status Label */}
            <label className="text-xs font-bold text-gray-700 mt-1">{label} Status</label>
            <select
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-green-500"
                value={item.status}
                onChange={(e) => onChange(fieldKey, 'status', e.target.value)}
            >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
    );
};


const HeaderNoticeInfo = () => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    // Initial State structure matching Schema
    const [formData, setFormData] = useState({
        headerTitle: '',
        noticeBoard: '',
        headerImg1: { url: '', status: 'active' },
        headerImg2: { url: '', status: 'active' },
        box1: { url: '', status: 'active' },
        box2: { url: '', status: 'active' },
        box3: { url: '', status: 'active' },
        box4: { url: '', status: 'active' },
        boxBg: { url: '', status: 'active' }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.HEADER_NOTICE);
            if (res.data.success) {
                // Merge with default structure to ensure all fields exist
                // We need to be careful not to overwrite default objects if they are missing in DB
                // But DB create({}) ensures they exist.
                setFormData(prev => ({ ...prev, ...res.data.data }));
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageFieldChange = (key, field, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: { ...prev[key], [field]: value }
        }));
    };

    const handleFileSelection = (key, file) => {
        setFormData(prev => ({
            ...prev,
            [key]: { ...prev[key], file: file } // Store file temporarily
        }));
    };

    const uploadImage = async (file) => {
        const uploadData = new FormData();
        uploadData.append('file', file);
        const res = await api.post('/upload/single', uploadData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data.data.url;
    };

    const handleUpdate = async () => {
        setUpdating(true);
        setError(null);
        try {
            const updatedData = { ...formData };

            // Upload files if any
            const keys = ['headerImg1', 'headerImg2', 'box1', 'box2', 'box3', 'box4', 'boxBg'];

            for (const key of keys) {
                if (updatedData[key].file) {
                    try {
                        const url = await uploadImage(updatedData[key].file);
                        updatedData[key].url = url;
                        delete updatedData[key].file; // Remove file object before sending
                    } catch (uploadErr) {
                        console.error(`Failed to upload ${key}`, uploadErr);
                        alert(`Failed to upload image for ${key}`);
                        return; // Stop update
                    }
                }
            }

            // Remove internal 'file' properties just in case any remained without upload (shouldn't happen)
            keys.forEach(key => {
                if (updatedData[key] && updatedData[key].file) delete updatedData[key].file;
            });

            // Send Update
            const res = await api.put(API_ENDPOINTS.HEADER_NOTICE, updatedData);
            if (res.data.success) {
                setFormData(res.data.data);
                alert('Updated Successfully!');
            }

        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to update');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-[#F4F6F9]">
                {/* Header */}
                <div className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
                    <h1 className="text-lg text-gray-600">Header Info & Notice Board</h1>
                    <div className="text-xs text-blue-500">Home / Header Info</div>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded shadow-sm overflow-hidden">
                        <div className="bg-[#28a745] text-white px-4 py-3 text-sm font-bold">
                            Header Info
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Text Fields */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2">Header Title Text</label>
                                <input
                                    type="text"
                                    name="headerTitle"
                                    value={formData.headerTitle}
                                    onChange={handleTextChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500 font-mono text-xs"
                                    placeholder="Enter HTML or Text"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2">Notice Board</label>
                                <textarea
                                    name="noticeBoard"
                                    value={formData.noticeBoard}
                                    onChange={handleTextChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500 h-20"
                                    placeholder="Enter details."
                                />
                            </div>

                            {/* Images Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ImageBox
                                    label="Header Image One"
                                    fieldKey="headerImg1"
                                    data={formData}
                                    onChange={handleImageFieldChange}
                                    onFileChange={handleFileSelection}
                                />
                                <ImageBox
                                    label="Header Image Two"
                                    fieldKey="headerImg2"
                                    data={formData}
                                    onChange={handleImageFieldChange}
                                    onFileChange={handleFileSelection}
                                />
                                <ImageBox
                                    label="Box One"
                                    fieldKey="box1"
                                    data={formData}
                                    onChange={handleImageFieldChange}
                                    onFileChange={handleFileSelection}
                                />
                                <ImageBox
                                    label="Box Two"
                                    fieldKey="box2"
                                    data={formData}
                                    onChange={handleImageFieldChange}
                                    onFileChange={handleFileSelection}
                                />
                                <ImageBox
                                    label="Box Three"
                                    fieldKey="box3"
                                    data={formData}
                                    onChange={handleImageFieldChange}
                                    onFileChange={handleFileSelection}
                                />
                                <ImageBox
                                    label="Box Four"
                                    fieldKey="box4"
                                    data={formData}
                                    onChange={handleImageFieldChange}
                                    onFileChange={handleFileSelection}
                                />
                                <ImageBox
                                    label="Box BG"
                                    fieldKey="boxBg"
                                    data={formData}
                                    onChange={handleImageFieldChange}
                                    onFileChange={handleFileSelection}
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    onClick={handleUpdate}
                                    disabled={updating}
                                    className="bg-[#28a745] text-white px-6 py-2 rounded text-sm font-bold shadow hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {updating ? (
                                        <>Updating...</>
                                    ) : (
                                        <>
                                            <i className="fa fa-save"></i> Update
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default HeaderNoticeInfo;
