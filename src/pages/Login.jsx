import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Layout from '../components/layout/Layout.jsx';
import { HiMail, HiLockClosed } from 'react-icons/hi';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
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
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Login failed. Please check your credentials.');
        }
        setLoading(false);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-base-100 flex flex-col">
                {/* Page Title */}
                <div className="py-12 bg-base-100 flex justify-center items-center">
                    <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight uppercase text-center px-4">
                        Welcome to <span className="text-primary">Click Job</span>
                    </h1>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow relative flex items-center justify-center py-16 px-4 overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute inset-x-0 bottom-0 top-[30%] bg-primary/5 dark:bg-base-200"></div>

                    {/* Floating Circles Decoration */}
                    <div className="absolute top-[30%] right-[10%] w-64 h-64 border-[40px] border-primary/5 rounded-full hidden lg:block"></div>
                    <div className="absolute bottom-[15%] left-[5%] w-80 h-80 border-[50px] border-primary/5 rounded-full hidden lg:block"></div>

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
                                        <h3 className="text-xl font-bold text-primary uppercase tracking-widest">Login Account</h3>
                                    </div>
                                    <h2 className="text-3xl font-black text-base-content leading-snug">
                                        Access your account to manage your jobs and earnings.
                                    </h2>
                                </div>
                                <p className="text-base-content/70 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    Click Job, the go-to website for remote job opportunities that can help you earn money quickly and easily.
                                    We have something for everyone. Small Gigs. Big Results.
                                </p>
                            </motion.div>

                            {/* Right Side Form Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full max-w-md"
                            >
                                <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-primary/10">
                                    {/* Card Header */}
                                    <div className="bg-primary p-6 text-center">
                                        <h3 className="text-xl font-black text-primary-content tracking-wide uppercase">
                                            Sign in with your account
                                        </h3>
                                    </div>

                                    {/* Form Body */}
                                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8 bg-base-100 dark:bg-base-300/50 backdrop-blur-sm">
                                        {error && (
                                            <div className="alert alert-error text-sm rounded-xl py-3">
                                                <span>{error}</span>
                                            </div>
                                        )}

                                        <div className="space-y-6">
                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-base-content pl-2">Email Address</label>
                                                <div className="relative group">
                                                    <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl group-focus-within:scale-110 transition-transform" />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        placeholder="Enter your email"
                                                        className="input input-bordered w-full pl-12 h-14 bg-base-200/50 focus:bg-base-100 rounded-2xl border-2 border-transparent focus:border-primary transition-all font-medium text-base-content"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Password Field */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center pr-2">
                                                    <label className="text-sm font-bold text-base-content pl-2">Password</label>
                                                    <Link to="/forgot-password" size="sm" className="text-xs text-primary hover:underline font-bold">Forgot password?</Link>
                                                </div>
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

                                        {/* Remember Me */}
                                        <div className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    name="remember"
                                                    className="checkbox checkbox-primary rounded-md"
                                                    checked={formData.remember}
                                                    onChange={handleChange}
                                                />
                                                <span className="label-text text-sm font-bold text-base-content/70">
                                                    Remember me
                                                </span>
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn btn-primary w-full h-14 rounded-2xl text-lg font-black uppercase text-primary-content shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                                        >
                                            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
                                        </button>

                                        <p className="text-center text-sm font-bold text-base-content/60">
                                            New to Click Job? <Link to="/register" className="text-primary hover:underline">Create new account</Link>
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

export default Login;
