import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { FaMapMarkerAlt, FaListUl, FaInfoCircle, FaDollarSign, FaTrash, FaPlus, FaImage, FaExclamationTriangle } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const PostJob = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Location
        selectedZone: 'International',
        hiddenCountries: [],

        // Step 2: Category
        category: 'Ads Click',
        subCategory: '1 Ads click for Youtube Video',

        // Step 3: Job Info
        title: '',
        note: '',
        tasks: [''],
        proof: '',
        thumbnail: null,

        // Step 4: Budget
        workerNeed: 23,
        workerEarn: 0.035,
        requiredScreenshots: 1,
        estimatedDays: 3,
        boostPeriod: 'None',
        scheduleTime: ''
    });

    const zones = ['International', 'Asia', 'USA & Western', 'Africa', 'Europe West', 'Muslim Countries', 'Europe East', 'Latin America'];
    const zoneCountries = {
        'International': ['Albania', 'Pakistan', 'Indonesia', 'India', 'Philippines', 'Romania', 'Egypt', 'Poland', 'Malaysia', 'Nepal', 'Vietnam', 'China', 'Lithuania', 'Morocco', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Sri Lanka', 'Slovenia'],
        'Asia': ['China', 'India', 'Indonesia', 'Japan', 'Korea, Republic of', 'Sri Lanka', 'Malaysia', 'Pakistan', 'Philippines', 'Singapore', 'Thailand', 'Vietnam'],
        'USA & Western': ['United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand', 'Ireland', 'Luxembourg'],
        'Africa': ['Nigeria', 'Egypt', 'South Africa', 'Kenya', 'Ethiopia', 'Ghana', 'Algeria', 'Morocco', 'Tanzania', 'Uganda', 'Zimbabwe', 'Ivory Coast'],
        'Europe West': ['Germany', 'France', 'United Kingdom', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Spain', 'Portugal', 'Italy'],
        'Muslim Countries': ['Saudi Arabia', 'Pakistan', 'Indonesia', 'Egypt', 'Turkey', 'United Arab Emirates', 'Qatar', 'Malaysia', 'Bangladesh', 'Kuwait', 'Oman', 'Iraq'],
        'Europe East': ['Poland', 'Romania', 'Ukraine', 'Czech Republic', 'Hungary', 'Bulgaria', 'Slovakia', 'Lithuania', 'Latvia', 'Estonia', 'Moldova'],
        'Latin America': ['Brazil', 'Mexico', 'Argentina', 'Colombia', 'Chile', 'Peru', 'Venezuela', 'Ecuador', 'Guatemala', 'Cuba', 'Bolivia']
    };

    const categories = ['Ads Click', 'Airdrop Join', 'Answers', 'App Pre Tester', 'Assignment', 'Audio Mack', 'Back Link', 'Blog', 'Comment', 'Computer Programs', 'Discord', 'Edit', 'Facebook', 'Facebook-Invite', 'Fiverr', 'Gmail Account', 'Graphics Design', 'Instagram', 'Kyc Submit', 'Linkedin', 'Medium', 'Mobile Application', 'Need Follower', 'Others', 'Promotion', 'Quora', 'Reddit', 'Reel / Short', 'Refer Program', 'Review', 'Search / Click', 'Share', 'Sign Up', 'Sound Cloud', 'Story', 'Survey', 'Telegram', 'Tik-tok', 'Twitter', 'Typing', 'Views', 'Visitor', 'Website', 'Whats-App', 'Write an Article', 'YouTube / Toffe'];
    const subCategories = ['1 Ads click for Youtube Video', '2 Ads click for Youtube Video', '1 Ads click for Facebook Video', '2 Ads click for Facebook Video', 'Website Ads Click'];

    const addTask = () => setFormData({ ...formData, tasks: [...formData.tasks, ''] });
    const removeTask = (index) => {
        const newTasks = formData.tasks.filter((_, i) => i !== index);
        setFormData({ ...formData, tasks: newTasks });
    };
    const updateTask = (index, value) => {
        const newTasks = [...formData.tasks];
        newTasks[index] = value;
        setFormData({ ...formData, tasks: newTasks });
    };

    const toggleCountry = (country) => {
        const current = formData.hiddenCountries;
        if (current.includes(country)) {
            setFormData({ ...formData, hiddenCountries: current.filter(c => c !== country) });
        } else {
            setFormData({ ...formData, hiddenCountries: [...current, country] });
        }
    };

    const estimatedCost = (formData.workerNeed * formData.workerEarn).toFixed(3);
    const minSpend = 0.80;

    const renderStepHeader = () => (
        <div className="flex justify-between items-center mb-12 max-w-4xl mx-auto relative px-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${(step - 1) * 33.3}%` }}></div>

            {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300 ${step >= s ? 'bg-blue-500 text-white shadow-lg' : 'bg-base-100 dark:bg-base-200 text-gray-400 border-2 border-gray-200 dark:border-white/10'}`}>
                        {s}
                    </div>
                    <span className={`text-[10px] md:text-xs font-bold whitespace-nowrap ${step >= s ? 'text-blue-500' : 'text-gray-400'}`}>
                        {s === 1 ? 'Select Location' : s === 2 ? 'Select Category' : s === 3 ? 'Job Information' : 'Budget & Setting'}
                    </span>
                </div>
            ))}
        </div>
    );

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleThumbnailUpload = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                toast.loading('Uploading thumbnail...', { id: 'upload' });
                const res = await api.upload('/upload/single', file);
                if (res.success) {
                    setFormData({ ...formData, thumbnail: res.data.url });
                    toast.success('Thumbnail uploaded!', { id: 'upload' });
                }
            } catch (err) {
                toast.error(err.message || 'Upload failed', { id: 'upload' });
            }
        };
        input.click();
    };

    const handleSubmit = async () => {
        try {
            const res = await api.post('/jobs', formData);
            if (res.success) {
                toast.success('Job Posted Successfully!');
                navigate('/my-jobs');
            }
        } catch (err) {
            toast.error(err.message || 'Failed to post job');
        }
    };

    return (
        <Layout showFooter={true}>
            <div className="bg-primary dark:bg-base-100 h-40 md:h-56 w-full relative"></div>

            <div className="mx-auto px-4 md:px-8 -mt-20 relative z-10 pb-20">
                <div className="bg-base-100 dark:bg-base-900 rounded-xl shadow-2xl overflow-hidden border border-base-200 dark:border-white/5 p-6 md:p-10 transition-colors">
                    {renderStepHeader()}

                    <div className="min-h-[400px]">
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex flex-wrap gap-2">
                                    {zones.map(zone => (
                                        <button
                                            key={zone}
                                            onClick={() => setFormData({ ...formData, selectedZone: zone, hiddenCountries: [] })}
                                            className={`px-4 py-1.5 rounded text-xs md:text-sm font-bold border transition-all ${formData.selectedZone === zone ? 'bg-[#00C875] border-[#00C875] text-white' : 'bg-base-100 dark:bg-base-200 text-base-content border-base-content/10 hover:border-primary'}`}
                                        >
                                            {zone}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-4 border border-orange-400 rounded-lg inline-block">
                                    <span className="text-orange-500 text-xs md:text-sm font-medium">
                                        *Select countries you want to hide from the selected zone <span className="text-blue-500 font-bold">(optional)</span>
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {(zoneCountries[formData.selectedZone] || []).map(country => (
                                        <button
                                            key={country}
                                            onClick={() => toggleCountry(country)}
                                            className={`px-3 py-1 rounded text-[10px] md:text-xs font-medium border transition-all ${formData.hiddenCountries.includes(country) ? 'bg-red-500 border-red-500 text-white' : 'bg-base-200 dark:bg-base-300 border-transparent text-base-content/70 hover:bg-base-300 dark:hover:bg-base-100'}`}
                                        >
                                            {country}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setFormData({ ...formData, category: cat })}
                                            className={`px-3 py-1.5 rounded text-[10px] md:text-xs font-bold border transition-all ${formData.category === cat ? 'bg-[#00C875] border-[#00C875] text-white' : 'bg-base-100 dark:bg-base-200 text-base-content border-base-content/10 hover:border-primary'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <div className="h-0.5 bg-red-500 w-full"></div>

                                <div>
                                    <h4 className="text-[#00C875] font-bold text-sm mb-4">Select the subcategory</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {subCategories.map(subCat => (
                                            <button
                                                key={subCat}
                                                onClick={() => setFormData({ ...formData, subCategory: subCat })}
                                                className={`px-3 py-1.5 rounded text-[10px] md:text-xs font-bold border transition-all ${formData.subCategory === subCat ? 'bg-blue-500 border-blue-500 text-white shadow-md' : 'bg-base-100 dark:bg-base-200 text-base-content border-base-content/10 hover:border-primary'}`}
                                            >
                                                {subCat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <label className="text-xs font-bold text-[#0D7A5C] mb-2 flex items-center gap-1 italic">• Write an accurate Job Title</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full bg-base-100 dark:bg-base-900 border-b-2 border-gray-200 dark:border-white/10 focus:border-blue-400 py-2 text-sm outline-none transition-all pr-12"
                                            placeholder="Only English"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                        <span className="absolute right-0 bottom-2 text-[10px] text-red-500 font-bold">{formData.title.length} / 50</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-[#0D7A5C] mb-2 block italic">• Note (optional)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-base-100 dark:bg-base-900 border border-gray-200 dark:border-white/10 rounded px-3 py-2 text-xs outline-none focus:border-blue-400 transition-all"
                                        placeholder="Note only you can see"
                                        value={formData.note}
                                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-[#0D7A5C] mb-3 block italic">• What specific tasks need to be Completed</label>
                                    <div className="space-y-3">
                                        {formData.tasks.map((task, idx) => (
                                            <div key={task.id} className="flex gap-2">
                                                <div className="shrink-0 w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    {idx + 1}
                                                </div>
                                                <textarea
                                                    placeholder="Step by step instruction..."
                                                    className="w-full bg-base-100 dark:bg-base-900 border border-base-content/10 p-4 rounded text-xs md:text-sm font-medium focus:border-primary outline-none transition-all min-h-[100px] placeholder:text-base-content/20"
                                                    value={task.instruction}
                                                    onChange={(e) => updateTask(task.id, e.target.value)}
                                                ></textarea>
                                                {formData.tasks.length > 1 && (
                                                    <button
                                                        onClick={() => removeTask(task.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            onClick={addTask}
                                            className="flex items-center gap-2 bg-[#0d213f] text-white px-4 py-2 rounded text-xs font-bold hover:bg-black transition-all"
                                        >
                                            <FaPlus size={10} /> Add Step
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-[#E94E5C] mb-2 block italic">• Required proof the job was Completed</label>
                                    <textarea
                                        className="w-full bg-base-100 dark:bg-base-900 border border-base-content/10 p-4 rounded text-xs md:text-sm font-medium focus:border-primary outline-none transition-all min-h-[120px] placeholder:text-base-content/20"
                                        value={formData.proof}
                                        onChange={(e) => setFormData({ ...formData, proof: e.target.value })}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-[#0D7A5C] mb-2 block italic">• Thumbnail Image (optional)</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={handleThumbnailUpload}
                                            className="flex items-center gap-2 border border-gray-200 dark:border-white/10 px-4 py-2 rounded text-xs font-bold text-base-content/60 hover:bg-base-200 transition-all"
                                        >
                                            <FaImage /> {formData.thumbnail ? 'Change Image' : 'Select Image'}
                                        </button>
                                        {formData.thumbnail && (
                                            <div className="w-12 h-12 rounded overflow-hidden border border-base-content/10">
                                                <img src={formData.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300 grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between gap-10">
                                        <label className="text-sm font-bold text-[#0D7A5C]">Worker Need</label>
                                        <input
                                            type="number"
                                            className="w-48 bg-base-100 dark:bg-base-900 border border-gray-200 dark:border-white/10 rounded px-4 py-3 text-sm focus:border-blue-500 outline-none"
                                            value={formData.workerNeed}
                                            onChange={(e) => setFormData({ ...formData, workerNeed: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-10">
                                        <label className="text-sm font-bold text-[#0D7A5C]">Each worker Earn</label>
                                        <input
                                            type="number"
                                            step="0.001"
                                            className="w-48 bg-base-100 dark:bg-base-900 border border-gray-200 dark:border-white/10 rounded px-4 py-3 text-sm focus:border-blue-500 outline-none"
                                            value={formData.workerEarn}
                                            onChange={(e) => setFormData({ ...formData, workerEarn: parseFloat(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-10">
                                        <label className="text-sm font-bold text-[#0D7A5C]">Require Screenshots</label>
                                        <input
                                            type="number"
                                            className="w-48 bg-base-100 dark:bg-base-900 border border-gray-200 dark:border-white/10 rounded px-4 py-3 text-sm focus:border-blue-500 outline-none"
                                            value={formData.requiredScreenshots}
                                            onChange={(e) => setFormData({ ...formData, requiredScreenshots: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-10">
                                        <label className="text-sm font-bold text-[#0D7A5C]">Estimated Day</label>
                                        <input
                                            type="number"
                                            className="w-48 bg-base-100 dark:bg-base-900 border border-gray-200 dark:border-white/10 rounded px-4 py-3 text-sm focus:border-blue-500 outline-none"
                                            value={formData.estimatedDays}
                                            onChange={(e) => setFormData({ ...formData, estimatedDays: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-10">
                                        <label className="text-sm font-bold text-[#0D7A5C]">Boost Period <span className="text-gray-400 font-medium">(optional)</span></label>
                                        <select
                                            className="w-48 bg-base-100 dark:bg-base-900 border border-gray-200 dark:border-white/10 rounded px-4 py-3 text-sm focus:border-blue-500 outline-none"
                                            value={formData.boostPeriod}
                                            onChange={(e) => setFormData({ ...formData, boostPeriod: e.target.value })}
                                        >
                                            <option value="None">None</option>
                                            <option value="1h">1 Hour</option>
                                            <option value="6h">6 Hours</option>
                                            <option value="12h">12 Hours</option>
                                            <option value="24h">24 Hours</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between gap-10">
                                        <label className="text-sm font-bold text-[#0D7A5C]">Schedule Time <span className="text-gray-400 font-medium">(optional)</span></label>
                                        <input
                                            type="datetime-local"
                                            className="w-48 bg-base-100 dark:bg-base-900 border border-gray-200 dark:border-white/10 rounded px-4 py-3 text-sm focus:border-blue-500 outline-none"
                                            value={formData.scheduleTime}
                                            onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Summary & Budget */}
                                <div className="bg-white dark:bg-base-900 rounded-lg p-6 md:p-10 shadow-lg border border-base-content/5 h-fit sticky top-24">
                                    <h3 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Estimated Job Cost</h3>

                                    <div className="bg-[#FFF0F0] dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/20 mb-4">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Cost</span>
                                        <div className="text-3xl font-black text-[#0D7A5C] dark:text-[#0D7A5C] flex items-baseline gap-1">
                                            <span className="text-base text-gray-400">$</span> {(formData.workerNeed * formData.workerEarn).toFixed(3)}
                                        </div>
                                    </div>
                                    <p className="text-center text-[10px] text-red-500 font-bold italic mb-8">Minimum spend $0.80</p>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={parseFloat(estimatedCost) < minSpend}
                                        className={`btn border-none px-8 rounded-lg font-bold h-12 shadow-md capitalize w-full ${parseFloat(estimatedCost) >= minSpend ? 'bg-[#00C875] text-white hover:bg-[#00ad66]' : 'bg-[#AAF4DB] text-white cursor-not-allowed'}`}
                                    >
                                        Submit Post
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-20 flex justify-end gap-3">
                        {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="btn bg-blue-500 hover:bg-blue-600 border-none text-white px-8 rounded-lg font-bold h-12 shadow-md capitalize"
                            >
                                Back
                            </button>
                        )}
                        {step < 4 ? (
                            <button
                                onClick={nextStep}
                                className="btn bg-blue-500 hover:bg-blue-600 border-none text-white px-8 rounded-lg font-bold h-12 shadow-md capitalize"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className={`btn border-none px-8 rounded-lg font-bold h-12 shadow-md capitalize ${parseFloat(estimatedCost) >= minSpend ? 'bg-[#00C875] text-white hover:bg-[#00ad66]' : 'bg-[#AAF4DB] text-white cursor-not-allowed'}`}
                                disabled={parseFloat(estimatedCost) < minSpend}
                            >
                                Submit Post
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PostJob;
