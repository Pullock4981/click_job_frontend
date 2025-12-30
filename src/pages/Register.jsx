import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Layout from '../components/layout/Layout.jsx';
import { HiUser, HiMail, HiLockClosed, HiShieldCheck } from 'react-icons/hi';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        agree: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.agree) {
            setError('Please agree to the Terms of Service and Privacy Policy');
            return;
        }

        setLoading(true);
        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role
        });

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Registration failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-base-100 flex flex-col">
                {/* Page Title */}
                <div className="py-12 bg-base-100 flex justify-center items-center">
                    <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight uppercase">
                        Create An <span className="text-primary">Account</span>
                    </h1>
                </div>

                {/* Main Content Area with decorative background */}
                <div className="flex-grow relative flex items-center justify-center py-16 px-4 overflow-hidden">
                    {/* Decorative Background - Split style from screenshot */}
                    <div className="absolute inset-x-0 bottom-0 top-[30%] bg-primary/5 dark:bg-base-200"></div>

                    {/* Floating Circles Decoration */}
                    <div className="absolute top-[40%] left-[5%] w-64 h-64 border-[40px] border-primary/5 rounded-full hidden lg:block"></div>
                    <div className="absolute bottom-[5%] right-[2%] w-96 h-96 border-[60px] border-primary/5 rounded-full hidden lg:block"></div>

                    <div className="container mx-auto max-w-6xl relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                            {/* Left Side Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 space-y-8 text-center lg:text-left"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                                        <div className="w-8 h-1 bg-primary rounded-full"></div>
                                        <h3 className="text-xl font-bold text-primary uppercase tracking-widest">Sign Up</h3>
                                    </div>
                                    <h2 className="text-3xl font-black text-base-content leading-snug">
                                        For a better experience, join our professional community.
                                    </h2>
                                </div>
                                <p className="text-base-content/70 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    While using our Service, we may require you to provide us with certain personally identifiable information.
                                    With our user-friendly platform and comprehensive job listings, finding the perfect remote gig has never been easier.
                                </p>
                                <div className="bg-base-200/50 p-6 rounded-2xl border border-primary/10 inline-block text-left">
                                    <p className="font-bold text-base-content flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> All payouts are made in money
                                    </p>
                                    <p className="text-base-content/60 mt-2">Get paid quickly and securely with Click Job.</p>
                                </div>
                            </motion.div>

                            {/* Right Side Form Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full max-w-lg"
                            >
                                <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-primary/10">
                                    {/* Card Header */}
                                    <div className="bg-primary p-6 text-center">
                                        <h3 className="text-xl font-black text-primary-content tracking-wide uppercase">
                                            Sign up with Your Real credentials
                                        </h3>
                                    </div>

                                    {/* Form Body */}
                                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6 bg-base-100 dark:bg-base-300/50 backdrop-blur-sm">
                                        {/* Role Selector Tabs */}
                                        <div className="flex bg-base-200 p-1.5 rounded-2xl mb-8">
                                            <button
                                                type="button"
                                                onClick={() => setFormData(p => ({ ...p, role: 'user' }))}
                                                className={`flex-1 py-3 rounded-xl text-sm font-black uppercase transition-all ${formData.role === 'user' ? 'bg-primary text-white shadow-lg' : 'text-base-content/50 hover:text-base-content'}`}
                                            >
                                                I'm a Worker
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData(p => ({ ...p, role: 'employer' }))}
                                                className={`flex-1 py-3 rounded-xl text-sm font-black uppercase transition-all ${formData.role === 'employer' ? 'bg-primary text-white shadow-lg' : 'text-base-content/50 hover:text-base-content'}`}
                                            >
                                                I'm an Employer
                                            </button>
                                        </div>

                                        {error && (
                                            <div className="alert alert-error text-sm rounded-xl py-3 animate-shake">
                                                <span>{error}</span>
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            {/* Name Field */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-base-content pl-2">Real Name (for internal verification only)</label>
                                                <div className="relative group">
                                                    <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl group-focus-within:scale-110 transition-transform" />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        placeholder="Enter your full name"
                                                        className="input input-bordered w-full pl-12 h-14 bg-base-200/50 focus:bg-base-100 rounded-2xl border-2 border-transparent focus:border-primary transition-all font-medium text-base-content"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-base-content pl-2">Email Address</label>
                                                <div className="relative group">
                                                    <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl group-focus-within:scale-110 transition-transform" />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        placeholder="example@mail.com"
                                                        className="input input-bordered w-full pl-12 h-14 bg-base-200/50 focus:bg-base-100 rounded-2xl border-2 border-transparent focus:border-primary transition-all font-medium text-base-content"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Password Field */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-base-content pl-2">Password</label>
                                                <div className="relative group">
                                                    <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl group-focus-within:scale-110 transition-transform" />
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        required
                                                        placeholder="••••••••"
                                                        className="input input-bordered w-full pl-12 h-14 bg-base-200/50 focus:bg-base-100 rounded-2xl border-2 border-transparent focus:border-primary transition-all font-medium text-base-content"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mock Captcha Placeholder */}
                                        <div className="bg-base-200/80 p-4 rounded-xl border border-base-content/10 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <input type="checkbox" className="checkbox checkbox-primary w-6 h-6 rounded-md" />
                                                <span className="text-sm font-medium text-base-content/80">I am not a robot</span>
                                            </div>
                                            <div className="text-center">
                                                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-6 mx-auto opacity-50" />
                                                <span className="text-[8px] uppercase font-bold text-base-content/40">reCAPTCHA</span>
                                            </div>
                                        </div>

                                        {/* Terms Agreement */}
                                        <div className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    name="agree"
                                                    className="checkbox checkbox-primary rounded-md"
                                                    checked={formData.agree}
                                                    onChange={handleChange}
                                                />
                                                <span className="label-text text-sm font-medium text-base-content/70">
                                                    I agree to Click Job <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                                                </span>
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn btn-primary w-full h-14 rounded-2xl text-lg font-black uppercase text-primary-content shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                                        >
                                            {loading ? <span className="loading loading-spinner"></span> : 'Create Account'}
                                        </button>

                                        <p className="text-center text-sm font-bold text-base-content/60">
                                            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
                                        </p>
                                    </form>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
