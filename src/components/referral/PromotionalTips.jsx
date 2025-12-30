import { motion } from 'framer-motion';

const PromotionalTips = () => {
    const tips = [
        {
            title: "Share Your Referral Link",
            desc: "Your personalized referral link is your key to earning commission. Share it on your social media profiles, blog, website, or any other online platform where you have an audience.",
            image: "https://illustrations.popsy.co/amber/shaking-hands.svg"
        },
        {
            title: "Write a Review",
            desc: "Share your experience with Click Job and explain how it has benefited you. Write a comprehensive review that highlights the benefits of the platform, such as ease of use, variety of freelance, and the quality of work delivered.",
            image: "https://illustrations.popsy.co/amber/work-from-home.svg"
        },
        {
            title: "Create an Engaging Promotional Video",
            desc: "If you have video-making skills, you can create a promotional video that showcases the features of Click Job and how it can benefit new members. Share the video on social media and other platforms.",
            image: "https://illustrations.popsy.co/amber/creative-work.svg"
        },
        {
            title: "Engage Your Audience",
            desc: "Encourage your audience to sign up for Click Job by sharing your personal experience with the platform and explaining the benefits of using it. Respond to any questions or concerns they may have.",
            image: "https://illustrations.popsy.co/amber/communication.svg"
        },
        {
            title: "Participate in Online Communities",
            desc: "Join online forums and groups related to freelancing and entrepreneurship. Share your referral link and engage in discussions about Click Job, answering any questions and providing information about the platform.",
            image: "https://illustrations.popsy.co/amber/friends.svg"
        }
    ];

    return (
        <section className="py-24 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight text-base-content">
                        PROMOTIONAL <span className="text-primary">TIPS</span>
                    </h2>
                    <p className="text-base-content/60 text-lg">
                        Maximize your earnings by following these proven strategies to attract more referrals.
                    </p>
                </div>

                <div className="space-y-32">
                    {tips.map((tip, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}
                        >
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex items-center gap-4 bg-primary/20 dark:bg-primary/10 px-6 py-2 rounded-full border border-primary/30 dark:border-primary/50">
                                    <span className="text-primary font-black text-xl">0{index + 1}</span>
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                    <span className="text-sm font-bold uppercase tracking-widest text-primary">Strategy</span>
                                </div>

                                <h3 className="text-3xl md:text-5xl font-black text-base-content leading-tight">
                                    {tip.title}
                                </h3>

                                <p className="text-base-content/80 dark:text-base-content leading-relaxed text-xl max-w-xl">
                                    {tip.desc}
                                </p>

                                <div className="pt-4">
                                    <button className="btn btn-primary rounded-full px-10 font-bold shadow-lg hover:scale-105 transition-transform text-primary-content">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 w-full relative">
                                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden flex items-center justify-center group">
                                    {/* Animated background glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                                    {/* Solid background plate for image visibility in dark mode */}
                                    <div className="absolute inset-4 md:inset-10 bg-white dark:bg-zinc-100 rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"></div>

                                    <motion.img
                                        whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 2 : -2 }}
                                        src={tip.image}
                                        alt={tip.title}
                                        className="w-3/4 h-3/4 object-contain relative z-10 drop-shadow-2xl"
                                    />

                                    {/* Floating decorative elements */}
                                    <div className="absolute top-10 right-10 w-24 h-24 bg-primary/30 blur-[60px] rounded-full animate-pulse"></div>
                                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary/30 blur-[60px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromotionalTips;
