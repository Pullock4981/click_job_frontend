import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaSave, FaUndo, FaBold, FaItalic, FaUnderline, FaListOl, FaListUl, FaAlignCenter, FaAlignLeft, FaAlignRight, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const PolicySection = ({ type, label }) => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [policyData, setPolicyData] = useState({ title: '', content: '' });
    const editorRef = useRef(null);

    useEffect(() => {
        fetchPolicy();
    }, [type]);

    const fetchPolicy = async () => {
        try {
            setLoading(true);
            const res = await api.get(`${API_ENDPOINTS.COMPANY_CONTENT}/${type}`);
            if (res.data.success) {
                setPolicyData(res.data.data);
            }
        } catch (err) {
            console.error(`Failed to fetch ${type}`, err);
        } finally {
            setLoading(false);
        }
    };

    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const handleUpdate = async () => {
        try {
            setUpdating(true);
            const content = editorRef.current.innerHTML;
            const res = await api.put(`${API_ENDPOINTS.COMPANY_CONTENT}/${type}`, {
                title: policyData.title,
                content: content
            });
            if (res.data.success) {
                alert(`${label} updated successfully!`);
            }
        } catch (err) {
            console.error(`Update failed for ${type}`, err);
            alert(`Failed to update ${label}`);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="bg-white rounded shadow-sm overflow-hidden mb-6 border border-gray-100">
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#28a745] rounded-full"></span>
                    {label}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleUpdate}
                        disabled={updating || loading}
                        className="bg-[#28a745] text-white p-2 rounded hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50"
                        title="Update"
                    >
                        {updating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <FaCheck size={14} />}
                    </button>
                    <button
                        onClick={fetchPolicy}
                        className="bg-[#dc3545] text-white p-2 rounded hover:bg-red-700 transition-colors shadow-sm"
                        title="Reset"
                    >
                        <FaTimes size={14} />
                    </button>
                </div>
            </div>

            <div className="p-4">
                {loading ? (
                    <div className="h-64 flex items-center justify-center text-gray-400">Loading...</div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Policy Title</label>
                            <input
                                type="text"
                                value={policyData.title}
                                onChange={(e) => setPolicyData({ ...policyData, title: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#28a745] bg-gray-50/50"
                                placeholder={`Enter ${label} Title`}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Policy Content</label>
                            <div className="border border-gray-300 rounded overflow-hidden">
                                <div className="bg-white p-2 flex flex-wrap gap-1 border-b border-gray-200 sticky top-0 z-10">
                                    <button type="button" onClick={() => execCmd('bold')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Bold"><FaBold size={12} /></button>
                                    <button type="button" onClick={() => execCmd('italic')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Italic"><FaItalic size={12} /></button>
                                    <button type="button" onClick={() => execCmd('underline')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Underline"><FaUnderline size={12} /></button>
                                    <div className="w-[1px] bg-gray-200 mx-1 h-6 self-center"></div>
                                    <button type="button" onClick={() => execCmd('insertUnorderedList')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Unordered List"><FaListUl size={12} /></button>
                                    <button type="button" onClick={() => execCmd('insertOrderedList')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Ordered List"><FaListOl size={12} /></button>
                                    <div className="w-[1px] bg-gray-200 mx-1 h-6 self-center"></div>
                                    <button type="button" onClick={() => execCmd('justifyLeft')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Align Left"><FaAlignLeft size={12} /></button>
                                    <button type="button" onClick={() => execCmd('justifyCenter')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Align Center"><FaAlignCenter size={12} /></button>
                                    <button type="button" onClick={() => execCmd('justifyRight')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Align Right"><FaAlignRight size={12} /></button>
                                </div>
                                <div
                                    ref={editorRef}
                                    className="w-full h-80 overflow-y-auto px-4 py-3 focus:outline-none text-gray-800 text-sm bg-white"
                                    contentEditable
                                    suppressContentEditableWarning={true}
                                    dangerouslySetInnerHTML={{ __html: policyData.content }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const PolicyManage = () => {
    return (
        <AdminLayout>
            <div className="min-h-screen bg-[#F4F6F9]">
                <div className="bg-white p-4 flex justify-between items-center border-b border-gray-100 mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Policy Management</h1>
                    <div className="text-xs text-blue-500 font-medium">Home / Policy</div>
                </div>

                <div className="max-w-6xl mx-auto p-4 md:p-6 pb-20">
                    <PolicySection type="privacy-policy" label="Privacy Policy" />
                    <PolicySection type="refund-policy" label="Refund Policy" />
                    <PolicySection type="terms-conditions" label="Terms & Conditions" />
                </div>
            </div>
        </AdminLayout>
    );
};

export default PolicyManage;
