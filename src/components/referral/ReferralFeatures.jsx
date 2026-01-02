import { motion } from 'framer-motion';
import { HiTrendingUp, HiDocumentText, HiChartBar, HiLink, HiCreditCard, HiUserGroup } from 'react-icons/hi';

const ReferralFeatures = () => {
    const features = [
        {
            icon: <HiTrendingUp className="text-orange-500 w-8 h-8" />,
            title: "Deposit Commission",
            desc: "Earn 5% of each Deposit made by your referral"
        },
        {
            icon: <HiDocumentText className="text-emerald-500 w-8 h-8" />,
            title: "Task Commission",
            desc: "Earn 5% for each successful Task completed by your referral"
        },
        {
            icon: <HiChartBar className="text-blue-500 w-8 h-8" />,
            title: "Convenient Statistics",
            desc: "Detailed statistics with information on each referral"
        },
        {
            icon: <HiLink className="text-purple-500 w-8 h-8" />,
            title: "Easy Creation",
            desc: "Easy creation of a referral link"
        },
        {
            icon: <HiCreditCard className="text-pink-500 w-8 h-8" />,
            title: "Instant Payments",
            desc: "Commission payments directly to your balance"
        },
        {
            icon: <HiUserGroup className="text-yellow-500 w-8 h-8" />,
            title: "Unlimited Referrals",
            desc: "Unlimited number of referrals"
        }
    ];

    return (
        <section className="py-24 bg-base-100 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-6xl font-black text-base-content mb-4 tracking-tight">FEATURES</h2>
                    <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-10 rounded-[2rem] bg-base-200/50 border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 inline-block p-4 rounded-2xl bg-base-100 shadow-xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-base-content/60 text-lg leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReferralFeatures;
