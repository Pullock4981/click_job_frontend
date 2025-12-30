import { motion } from 'framer-motion';

const ReferralFAQ = () => {
    const faqs = [
        {
            q: "How do I get my own personalized Referral Link & Statistics?",
            a: "Once you create an account and log in, you can find your unique referral link in your dashboard or profile settings."
        },
        {
            q: "Where can I place my link?",
            a: "You can place your link on social media, blogs, forums, or send it directly to people interested in microjobs."
        },
        {
            q: "Will the commission be added to my money balance?",
            a: "Yes, all referral earnings are automatically credited to your main wallet balance, which you can withdraw."
        },
        {
            q: "How focused is my earnings?",
            a: "The more active users you refer, the more you earn. There is no cap on how much you can generate from commissions."
        },
        {
            q: "How much will I earn?",
            a: "You earn 5% of every deposit your referral makes and 5% of the value of every task they successfully complete."
        },
        {
            q: "What are the Terms and Conditions?",
            a: "Our terms include rules against self-referral and spamming. Please review the full T&C page for more details."
        },
        {
            q: "What are the Warranties?",
            a: "We guarantee that all valid referral commissions will be tracked accurately and paid out according to our system rules."
        }
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-wider sticky top-32 text-base-content">
                            FREQUENTLY <br /> ASKED QUESTIONS
                        </h2>
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="collapse collapse-plus bg-base-200 shadow-sm"
                            >
                                <input type="radio" name="my-accordion-3" defaultChecked={index === 0} />
                                <div className="collapse-title text-lg font-bold text-base-content">
                                    {faq.q}
                                </div>
                                <div className="collapse-content text-base-content/70 font-medium">
                                    <p>{faq.a}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReferralFAQ;
