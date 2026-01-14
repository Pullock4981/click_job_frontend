import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaUndo, FaRedo, FaSave } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const CounterItem = ({ label, fieldKey, data, onChange, onFileChange }) => {
    const item = data[fieldKey] || { text: '', count: 0, status: 'active', show: 'live', icon: '' };
    const editorRef = useRef(null);
    const [preview, setPreview] = useState(item.icon || '');

    useEffect(() => {
        setPreview(item.icon || '');
    }, [item.icon]);

    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileChange(fieldKey, file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    return (
        <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-end p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
            {/* Text Editor */}
            <div className="flex-1 w-full max-w-sm">
                <label className="block text-xs font-bold text-gray-700 mb-1">{label} Text</label>
                <div className="flex flex-wrap gap-1 bg-gray-100 p-1 border border-gray-300 border-b-0 rounded-t-sm">
                    <button type="button" onClick={() => execCmd('undo')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaUndo size={10} /></button>
                    <button type="button" onClick={() => execCmd('redo')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaRedo size={10} /></button>
                    <div className="w-[1px] bg-gray-300 mx-1 h-3 self-center"></div>
                    <button type="button" onClick={() => execCmd('bold')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaBold size={10} /></button>
                    <button type="button" onClick={() => execCmd('italic')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaItalic size={10} /></button>
                    <button type="button" onClick={() => execCmd('underline')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaUnderline size={10} /></button>
                    <button type="button" onClick={() => execCmd('strikeThrough')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaStrikethrough size={10} /></button>
                    <div className="w-[1px] bg-gray-300 mx-1 h-3 self-center"></div>
                    <button type="button" onClick={() => execCmd('justifyLeft')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaAlignLeft size={10} /></button>
                    <button type="button" onClick={() => execCmd('justifyCenter')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaAlignCenter size={10} /></button>
                    <button type="button" onClick={() => execCmd('justifyRight')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaAlignRight size={10} /></button>
                </div>
                <div
                    ref={editorRef}
                    className="w-full border border-gray-300 rounded-b-sm px-3 py-2 h-20 overflow-y-auto focus:outline-none focus:border-green-500 text-xs bg-white"
                    contentEditable
                    suppressContentEditableWarning={true}
                    dangerouslySetInnerHTML={{ __html: item.text }}
                    onBlur={(e) => onChange(fieldKey, 'text', e.target.innerHTML)}
                ></div>
            </div>

            {/* Count */}
            <div className="w-full xl:w-40">
                <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
                <input
                    type="number"
                    value={item.count}
                    onChange={(e) => onChange(fieldKey, 'count', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-green-500 bg-white"
                />
            </div>

            {/* Status */}
            <div className="w-full xl:w-40">
                <label className="block text-xs font-bold text-gray-700 mb-1">{label} Status</label>
                <select
                    value={item.status}
                    onChange={(e) => onChange(fieldKey, 'status', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-green-500 bg-white"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Show */}
            <div className="w-full xl:w-40">
                <label className="block text-xs font-bold text-gray-700 mb-1">Show</label>
                <select
                    value={item.show}
                    onChange={(e) => onChange(fieldKey, 'show', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-green-500 bg-white"
                >
                    <option value="live">Live</option>
                    <option value="hidden">Hidden</option>
                </select>
            </div>

            {/* Icon */}
            <div className="w-full xl:flex-1 min-w-[200px]">
                <label className="block text-xs font-bold text-gray-700 mb-1">{label} Icon</label>
                <div className="flex">
                    <div className="flex-1 border border-gray-300 border-r-0 rounded-l-[4px] px-3 py-2 text-[10px] text-gray-500 bg-white truncate h-8">
                        {item.file ? item.file.name : 'Choose file'}
                    </div>
                    <label className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-2 text-[10px] font-medium cursor-pointer hover:bg-gray-200 transition-colors h-8">
                        Browse
                        <input type="file" className="hidden" onChange={handleFile} accept="image/*" />
                    </label>
                </div>
                <div className="mt-2 w-10 h-10 border border-gray-200 rounded flex items-center justify-center bg-white overflow-hidden">
                    {preview ? (
                        <img src={preview} alt="Icon" className="w-full h-full object-contain p-1" />
                    ) : (
                        <span className="text-[10px] text-gray-400">Icon</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const CounterInfoPage = () => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({
        totalJobs: { text: 'Job Posted', count: 0, status: 'active', show: 'live', icon: '' },
        totalUsers: { text: 'Total User', count: 0, status: 'active', show: 'live', icon: '' },
        taskDone: { text: 'Task Done', count: 0, status: 'active', show: 'live', icon: '' },
        paid: { text: 'Paid $', count: 0, status: 'active', show: 'live', icon: '' }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.COUNTER_INFO);
            if (res.data.success) {
                setFormData(prev => ({ ...prev, ...res.data.data }));
            }
        } catch (err) {
            console.error('Failed to fetch counter info', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key, field, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: { ...prev[key], [field]: value }
        }));
    };

    const handleFileChange = (key, file) => {
        setFormData(prev => ({
            ...prev,
            [key]: { ...prev[key], file: file }
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
        try {
            const updatedData = { ...formData };
            const keys = ['totalJobs', 'totalUsers', 'taskDone', 'paid'];

            for (const key of keys) {
                if (updatedData[key].file) {
                    try {
                        const url = await uploadImage(updatedData[key].file);
                        updatedData[key].icon = url;
                        delete updatedData[key].file;
                    } catch (e) {
                        console.error(`Upload failed for ${key}`, e);
                        alert(`Upload failed for ${key}`);
                        setUpdating(false);
                        return;
                    }
                }
            }

            const res = await api.put(API_ENDPOINTS.COUNTER_INFO, updatedData);
            if (res.data.success) {
                setFormData(res.data.data);
                alert('Updated Successfully!');
            }
        } catch (err) {
            console.error('Update failed', err);
            alert('Failed to update.');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-[#F4F6F9]">
                {/* Header Section */}
                <div className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
                    <h1 className="text-lg text-gray-600">Counter Info</h1>
                    <div className="text-xs text-blue-500">Home / Counter Info</div>
                </div>

                <div className="p-4 md:p-6">
                    <div className="bg-white rounded shadow-sm overflow-hidden">
                        <div className="bg-[#28a745] text-white px-4 py-3 text-sm font-bold">
                            Counter Info
                        </div>

                        <div className="divide-y divide-gray-100">
                            {loading ? (
                                <div className="p-10 text-center text-gray-500">Loading...</div>
                            ) : (
                                <>
                                    <CounterItem
                                        label="Total Job"
                                        fieldKey="totalJobs"
                                        data={formData}
                                        onChange={handleChange}
                                        onFileChange={handleFileChange}
                                    />
                                    <CounterItem
                                        label="Total User"
                                        fieldKey="totalUsers"
                                        data={formData}
                                        onChange={handleChange}
                                        onFileChange={handleFileChange}
                                    />
                                    <CounterItem
                                        label="Task Done"
                                        fieldKey="taskDone"
                                        data={formData}
                                        onChange={handleChange}
                                        onFileChange={handleFileChange}
                                    />
                                    <CounterItem
                                        label="Paid"
                                        fieldKey="paid"
                                        data={formData}
                                        onChange={handleChange}
                                        onFileChange={handleFileChange}
                                    />
                                </>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="p-4 bg-gray-50 flex border-t border-gray-100">
                            <button
                                onClick={handleUpdate}
                                disabled={updating || loading}
                                className="bg-[#28a745] text-white px-6 py-2 rounded text-sm font-bold shadow hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                <FaSave /> {updating ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CounterInfoPage;
