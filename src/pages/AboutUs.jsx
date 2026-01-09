import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink, FaImage, FaUndo, FaRedo, FaPlus, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const AboutUs = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '', image: '' });
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const editorRef = useRef(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await api.get(`${API_ENDPOINTS.COMPANY_CONTENT}/about-us`);
            setContent(response.data.data || response.data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch content.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (content) {
            setFormData({
                title: content.title || '',
                content: content.content || '',
                image: content.image || ''
            });
            setSelectedFile(null);
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const handleManualUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }
        const url = await handleUploadImage();
        if (url) {
            setFormData(prev => ({ ...prev, image: url }));
            alert('Image Uploaded Successfully!');
        }
    };

    const handleUploadImage = async () => {
        if (!selectedFile) return null;

        try {
            setUploading(true);
            const uploadData = new FormData();
            uploadData.append('file', selectedFile);

            const response = await api.post('/upload/single', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.data.url;
        } catch (error) {
            console.error('Upload failed', error);
            alert('Image upload failed!');
            return null;
        } finally {
            setUploading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get content from div
        const currentContent = editorRef.current ? editorRef.current.innerHTML : formData.content;

        try {
            let imageUrl = formData.image;

            if (selectedFile) {
                const uploadedUrl = await handleUploadImage();
                if (uploadedUrl) {
                    imageUrl = uploadedUrl;
                } else {
                    return; // Stop if upload failed
                }
            }

            const response = await api.put(`${API_ENDPOINTS.COMPANY_CONTENT}/about-us`, {
                ...formData,
                content: currentContent,
                image: imageUrl
            });

            setContent(response.data.data);
            setModalOpen(false);
        } catch (error) {
            console.error(error);
            alert('Failed to update content');
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="bg-[#28a745] text-white p-4 rounded-t-lg shadow-sm">
                    <h1 className="text-xl font-normal">About Us</h1>
                </div>

                <div className="bg-white rounded-b-lg shadow-md p-6">
                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-50 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="p-3 border border-gray-200 w-32">Image</th>
                                    <th className="p-3 border border-gray-200">Details</th>
                                    <th className="p-3 border border-gray-200 w-24 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-10">Loading...</td>
                                    </tr>
                                ) : content ? (
                                    <tr>
                                        <td className="p-3 border border-gray-200 align-top">
                                            {content.image ? (
                                                <img src={content.image} alt="About Us" className="w-24 h-24 object-cover rounded border" />
                                            ) : (
                                                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Image</div>
                                            )}
                                        </td>
                                        <td className="p-3 border border-gray-200 align-top">
                                            <div className="prose max-w-none text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: content.content }}></div>
                                        </td>
                                        <td className="p-3 border border-gray-200 align-top text-center">
                                            <button
                                                onClick={handleEdit}
                                                className="bg-[#28a745] text-white w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-green-700 transition-colors shadow-sm mx-auto"
                                                title="Update"
                                            >
                                                <FaEdit size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-10 text-gray-500">No content found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200">
                    <div className="bg-white rounded shadow-2xl w-full max-w-[500px] h-[90vh] flex flex-col mx-4 overflow-hidden animate-in zoom-in-95 duration-200 border-t-[5px] border-t-[#28a745]">
                        <div className="px-4 py-3 flex justify-between items-center bg-[#28a745] text-white shrink-0">
                            <div className="flex items-center gap-2">
                                <FaPlus />
                                <h3 className="text-[15px] font-bold">Update About Us</h3>
                            </div>
                            <button onClick={handleCloseModal} className="text-white/80 hover:text-white font-bold text-xl">&times;</button>
                        </div>

                        <div className="p-4 overflow-y-auto flex-1 bg-white">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Details</label>

                                    {/* Toolbar */}
                                    <div className="flex flex-wrap gap-1 bg-gray-100 p-1 border border-gray-300 border-b-0 rounded-t-sm">
                                        <button type="button" onClick={() => execCmd('undo')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaUndo size={10} /></button>
                                        <button type="button" onClick={() => execCmd('redo')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaRedo size={10} /></button>
                                        <div className="w-[1px] bg-gray-300 mx-1 h-4 self-center"></div>
                                        <button type="button" onClick={() => execCmd('bold')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaBold size={10} /></button>
                                        <button type="button" onClick={() => execCmd('italic')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaItalic size={10} /></button>
                                        <button type="button" onClick={() => execCmd('underline')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaUnderline size={10} /></button>
                                        <button type="button" onClick={() => execCmd('strikeThrough')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaStrikethrough size={10} /></button>
                                        <div className="w-[1px] bg-gray-300 mx-1 h-4 self-center"></div>
                                        <button type="button" onClick={() => execCmd('justifyLeft')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaAlignLeft size={10} /></button>
                                        <button type="button" onClick={() => execCmd('justifyCenter')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaAlignCenter size={10} /></button>
                                        <button type="button" onClick={() => execCmd('justifyRight')} className="p-1 hover:bg-gray-200 rounded text-gray-600"><FaAlignRight size={10} /></button>
                                    </div>

                                    {/* Editor */}
                                    <div
                                        ref={editorRef}
                                        className="w-full border border-gray-300 rounded-b-sm px-3 py-2 min-h-[300px] max-h-[400px] overflow-y-auto focus:outline-none focus:border-green-500 text-sm"
                                        contentEditable
                                        suppressContentEditableWarning={true}
                                        dangerouslySetInnerHTML={{ __html: formData.content }}
                                        onBlur={(e) => setFormData({ ...formData, content: e.target.innerHTML })}
                                    ></div>
                                </div>

                                {/* Old Image */}
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Old Image</label>
                                    <div className="w-16 h-12 border border-green-500 p-0.5 rounded">
                                        {formData.image ? (
                                            <img src={formData.image} alt="Old" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[8px]">No Img</div>
                                        )}
                                    </div>
                                </div>

                                {/* Feature Image */}
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Feature Image</label>
                                    <div className="flex">
                                        <div className="flex-1 border border-gray-300 border-r-0 rounded-l-[4px] px-3 py-1.5 text-xs text-gray-500 bg-white truncate">
                                            {selectedFile ? selectedFile.name : 'Choose file'}
                                        </div>
                                        <label className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-gray-200 transition-colors">
                                            Browse
                                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleManualUpload}
                                            disabled={uploading}
                                            className="bg-[#e9ecef] border border-l-0 border-gray-300 text-gray-700 px-3 py-1.5 text-xs font-medium rounded-r-[4px] hover:bg-gray-300 transition-colors disabled:opacity-50"
                                        >
                                            {uploading ? '...' : 'Upload'}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">Image will be uploaded on Update.</p>
                                </div>
                            </form>
                        </div>

                        <div className="px-4 py-3 flex justify-between items-center border-t border-gray-100 bg-white shrink-0">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="px-4 py-1.5 border border-gray-300 text-gray-600 rounded-[3px] text-xs font-medium hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={uploading}
                                className="px-4 py-1.5 bg-[#28a745] text-white rounded-[3px] text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {uploading ? 'Uploading...' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AboutUs;
