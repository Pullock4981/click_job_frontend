import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';

const HeroSection = () => {
  // Enhanced floating cubes animation with different patterns
  const cubeVariants1 = {
    animate: {
      y: [0, -30, 0],
      rotate: [0, 10, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const cubeVariants2 = {
    animate: {
      y: [0, -25, 0],
      rotate: [0, -8, 8, 0],
      scale: [1, 1.03, 1],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const cubeVariants3 = {
    animate: {
      y: [0, -35, 0],
      rotate: [0, 12, -8, 0],
      scale: [1, 1.08, 1],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const cubeVariants4 = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, -10, 10, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Floating particles animation
  const particleVariants = {
    animate: {
      y: [0, -100, 0],
      x: [0, 20, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="min-h-[60vh] lg:min-h-[80vh] flex items-center bg-gradient-to-br from-base-100 via-base-200 to-base-100 dark:from-base-100 dark:via-base-200 dark:to-base-300 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-primary/20 dark:border-neutral/20"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-14 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 relative z-10"
          >
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-4 -left-4 text-primary opacity-50"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <HiSparkles className="w-8 h-8" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-base-content dark:text-neutral leading-tight relative"
            >
              Best Microjob & Freelancing Site To Make Money Online
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-base-content/80 dark:text-neutral/80 font-medium"
            >
              Small Gigs. Big Results.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base lg:text-lg text-base-content/70 dark:text-neutral/70 underline decoration-primary dark:decoration-accent"
            >
              We Are Waiting For You!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="btn btn-lg btn-primary text-white inline-flex items-center gap-2 group shadow-lg hover:shadow-xl transition-all"
              >
                Earn Money
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Animated 3D cubes */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 lg:h-[500px]"
          >
            {/* Floating particles background - High visibility for dark mode */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                variants={particleVariants}
                animate="animate"
                className="absolute w-2 h-2 bg-primary dark:bg-accent rounded-full blur-[1px] shadow-[0_0_10px_rgba(254,217,125,0.8)]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transition: {
                    delay: i * 0.15,
                  },
                }}
              />
            ))}

            {/* Large primary blue cube */}
            <motion.div
              variants={cubeVariants1}
              animate="animate"
              className="absolute bottom-20 right-20 w-32 h-32 bg-primary rounded-lg shadow-2xl dark:shadow-[0_0_40px_rgba(91,173,227,0.6),0_0_10px_rgba(91,173,227,0.8)] opacity-100 transition-all cursor-pointer border border-white/10"
              style={{
                transform: 'perspective(1000px) rotateX(15deg) rotateY(-15deg)',
              }}
              whileHover={{ scale: 1.1, zIndex: 10, filter: 'brightness(1.3)' }}
            />

            {/* Medium secondary teal cube */}
            <motion.div
              variants={cubeVariants2}
              animate="animate"
              className="absolute top-10 right-32 w-24 h-24 bg-secondary rounded-lg shadow-2xl dark:shadow-[0_0_35px_rgba(129,216,191,0.6),0_0_10px_rgba(129,216,191,0.8)] opacity-100 transition-all cursor-pointer border border-white/10"
              style={{
                transform: 'perspective(1000px) rotateX(-10deg) rotateY(20deg)',
              }}
              whileHover={{ scale: 1.15, zIndex: 10, filter: 'brightness(1.3)' }}
            />

            {/* Medium accent yellow cube */}
            <motion.div
              variants={cubeVariants3}
              animate="animate"
              className="absolute top-32 right-10 w-28 h-28 bg-accent rounded-lg shadow-2xl dark:shadow-[0_0_35px_rgba(254,217,125,0.6),0_0_10px_rgba(254,217,125,0.8)] opacity-100 transition-all cursor-pointer border border-white/10"
              style={{
                transform: 'perspective(1000px) rotateX(20deg) rotateY(10deg)',
              }}
              whileHover={{ scale: 1.12, zIndex: 10, filter: 'brightness(1.3)' }}
            />

            {/* Small primary cube variation */}
            <motion.div
              variants={cubeVariants4}
              animate="animate"
              className="absolute bottom-10 right-40 w-20 h-20 bg-primary rounded-lg shadow-2xl dark:shadow-[0_0_30px_rgba(91,173,227,0.4),0_0_10px_rgba(91,173,227,0.6)] opacity-100 transition-all cursor-pointer border border-white/10"
              style={{
                transform: 'perspective(1000px) rotateX(-15deg) rotateY(-25deg)',
              }}
              whileHover={{ scale: 1.2, zIndex: 10, filter: 'brightness(1.3)' }}
            />

            {/* Enhanced swirly arrows with glow effect */}
            <motion.svg
              className="absolute top-5 right-5 w-16 h-16 text-success drop-shadow-lg"
              viewBox="0 0 100 100"
              initial={{ rotate: 0, opacity: 0.8 }}
              animate={{
                rotate: 360,
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 20 50 Q 50 20, 80 50"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <path
                d="M 70 45 L 80 50 L 70 55"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            </motion.svg>

            <motion.svg
              className="absolute bottom-32 left-10 w-20 h-20 text-success drop-shadow-lg"
              viewBox="0 0 100 100"
              initial={{ rotate: 0, opacity: 0.8 }}
              animate={{
                rotate: -360,
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.15, 1],
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <defs>
                <filter id="glow2">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 50 20 Q 80 50, 50 80"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow2)"
              />
              <path
                d="M 55 70 L 50 80 L 45 70"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow2)"
              />
            </motion.svg>

            {/* Additional decorative elements */}
            <motion.div
              className="absolute top-1/2 left-1/4 w-3 h-3 bg-accent rounded-full"
              animate={{
                y: [0, -50, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />

            <motion.div
              className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-secondary rounded-full"
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

