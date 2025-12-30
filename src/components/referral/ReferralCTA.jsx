import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ReferralCTA = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-base-200 dark:bg-base-300 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-xl border border-base-content/5"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] -z-0"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] -z-0"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-base-content mb-6 leading-tight">
                            Don't limit yourself in <br />
                            <span className="text-primary">earning opportunities!</span>
                        </h2>
                        <p className="text-base-content/60 mb-10 text-lg md:text-xl leading-relaxed">
                            Start building your network today and watch your balance grow <br className="hidden md:block" /> with every successful task.
                        </p>
                        <Link to="/register" className="btn btn-primary text-primary-content px-12 h-14 rounded-full shadow-lg hover:scale-105 transition-all text-lg font-black border-none">
                            Get Your Referral Link
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ReferralCTA;
