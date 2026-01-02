import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const FindGreatWorkSection = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-base-content">
            So what are you waiting for?
          </h2>

          <h3 className="text-3xl font-semibold mb-8 text-primary">
            Find Great Work
          </h3>

          <Link
            to="/register"
            className="btn btn-primary btn-lg inline-flex items-center gap-2 group"
          >
            Start Now
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FindGreatWorkSection;

