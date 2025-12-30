import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ReferralHero = () => {
    return (
        <section className="pt-24 pb-16 bg-base-100 overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2.5 bg-primary/10 dark:bg-primary/20 px-4 py-1.5 rounded-full border border-primary/20 dark:border-primary/40 mb-6 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.2em]">Affiliate Program 2.0</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-base-content leading-tight mb-4"
                    >
                        EARN <span className="text-primary">5% MORE</span> WITH <br className="hidden md:block" />
                        OUR REFERRAL PROGRAM
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg text-base-content/60 mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        Earn money on referrals who join Click Job. Get 5% of each Deposit and 5% for each successfully completed Task by your referrals.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        <Link to="/register" className="btn btn-primary text-primary-content px-10 rounded-full shadow-lg hover:scale-105 transition-all border-none text-base font-bold">
                            Get Referral Link
                        </Link>

                        {/* Swirly line decoration */}
                        <div className="hidden md:block relative w-32 h-12">
                            <svg className="w-full h-full text-secondary opacity-30" viewBox="0 0 100 40" fill="none">
                                <path d="M5 35 Q 25 5, 50 20 T 95 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1,4" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </section>
    );
};

export default ReferralHero;
