import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api.js';
import { API_ENDPOINTS } from '../../config/api.js';

const StatsSection = () => {
  const [stats, setStats] = useState({
    jobPosted: 0,
    totalUser: 0,
    taskDone: 0,
    paid: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.PUBLIC_STATS);
      setStats(response.data || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    { label: 'Job Posted', value: stats.jobPosted, color: 'primary' },
    { label: 'Total User', value: stats.totalUser, color: 'secondary' },
    { label: 'Task Done', value: stats.taskDone, color: 'accent' },
    { label: 'Paid', value: stats.paid, color: 'success' },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card bg-base-200 shadow-xl text-center"
            >
              <div className="card-body">
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <>
                    <div className={`text-4xl font-bold ${item.color === 'primary' ? 'text-primary' :
                        item.color === 'secondary' ? 'text-secondary' :
                          item.color === 'accent' ? 'text-accent' :
                            'text-success'
                      }`}>
                      {item.value.toLocaleString()}
                    </div>
                    <div className="text-base-content/70 font-medium">
                      {item.label}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

