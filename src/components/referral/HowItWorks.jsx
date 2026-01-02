import { motion } from 'framer-motion';

const HowItWorks = () => {
    const steps = [
        {
            num: "1",
            title: "Register",
            desc: "Login or Register your personal account"
        },
        {
            num: "2",
            title: "Get Link",
            desc: "Get referral links in your profile or on Share & Earn pages"
        },
        {
            num: "3",
            title: "Share",
            desc: "Share your referral link wherever your audience is located"
        },
        {
            num: "4",
            title: "Earn",
            desc: "Get 5% for each referral's Deposit and Task done"
        }
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-24">
                    <h2 className="text-3xl md:text-6xl font-black text-base-content mb-4 tracking-tight uppercase">HOW IT WORKS</h2>
                    <p className="text-base-content/60 text-xl font-medium">Simple steps to start your earning journey.</p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative lg:px-10">
                    {/* Connector line for desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-[4px] bg-gradient-to-r from-primary/5 via-primary/40 to-primary/5 -z-0 -translate-y-[80px]"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="flex-1 flex flex-col items-center text-center relative z-10 group"
                        >
                            <div className="w-24 h-24 rounded-[2rem] bg-base-200 border-2 border-primary/20 flex items-center justify-center text-5xl font-black text-primary mb-8 shadow-2xl group-hover:scale-110 group-hover:shadow-primary/20 transition-all duration-500 relative">
                                {step.num}
                                <div className="absolute inset-0 bg-primary/10 rounded-[2rem] animate-pulse -z-10 group-hover:scale-125 transition-transform"></div>
                            </div>
                            <h4 className="text-2xl font-black text-base-content mb-3 group-hover:text-primary transition-colors">{step.title}</h4>
                            <p className="text-base-content/60 text-lg max-w-[220px] leading-relaxed font-medium">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
