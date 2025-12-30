import { motion } from 'framer-motion';
import { HiBriefcase, HiUserGroup, HiCurrencyDollar } from 'react-icons/hi';

const ServicesSection = () => {
  const services = [
    {
      icon: <HiBriefcase className="w-12 h-12" />,
      title: 'WORK',
      description: 'Select jobs you like, Complete these tasks, Explore required tasks, Send required proofs',
      color: 'primary',
    },
    {
      icon: <HiUserGroup className="w-12 h-12" />,
      title: 'JOB',
      description: 'Post your job on your desire, Set requirements & Estimated Budget, Rate each task, Reach to Thousand workers',
      color: 'secondary',
    },
    {
      icon: <HiCurrencyDollar className="w-12 h-12" />,
      title: 'EARN/DEPOSIT',
      description: 'Select Payment Method, Set your amount, Place your order, Get Payment/Deposit Fund',
      color: 'accent',
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-base-content">
            We Provide Best
          </h2>
          <h3 className="text-3xl font-semibold text-primary">Services</h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="card-body items-center text-center">
                <div className={`mb-4 ${
                  service.color === 'primary' ? 'text-primary' :
                  service.color === 'secondary' ? 'text-secondary' :
                  'text-accent'
                }`}>
                  {service.icon}
                </div>
                <h4 className="card-title text-2xl mb-4">{service.title}</h4>
                <p className="text-base-content/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

