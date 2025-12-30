import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiGift } from 'react-icons/hi';

const ReferralBadgeSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body items-center text-center p-12">
              <div className="mb-6">
                <HiGift className="w-16 h-16 text-primary mx-auto" />
              </div>
              
              <h2 className="text-4xl font-bold mb-4 text-base-content">
                YOU CAN EARN 5% MORE BY REFERRAL
              </h2>
              
              <p className="text-lg text-base-content/70 mb-8 max-w-2xl">
                Hello sir, you can now earn more by referring your friends. You will get 5% commission from your referral's Deposit & 5% from your referral's each completed task.
              </p>
              
              <Link to="/referral" className="btn btn-primary btn-lg">
                Start Now
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralBadgeSection;

