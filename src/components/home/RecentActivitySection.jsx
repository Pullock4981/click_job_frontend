import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api.js';
import { API_ENDPOINTS } from '../../config/api.js';
import { formatTimeAgo } from '../../utils/helpers.js';

const RecentActivitySection = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.RECENT_ACTIVITY, {
        params: { limit: 10 },
      });
      setActivities(response.data.activities || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
            Recent Activity
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-12">
                          <span className="text-lg">
                            {activity.userName?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-base-content">
                          {activity.userName}
                        </p>
                        {activity.progress && (
                          <p className="text-sm text-base-content/70">
                            {activity.progress}
                          </p>
                        )}
                        {activity.amount && (
                          <p className="text-sm font-medium text-success">
                            ${activity.amount}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-base-content/50">
                        {activity.timeAgo}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-base-content/70">No recent activity</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentActivitySection;

