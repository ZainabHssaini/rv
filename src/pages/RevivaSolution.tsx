import FeatureCard from "@/components/FeatureCard";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Users2, Calendar, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const RevivaSolution = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Users,
      title: "Entrepreneur",
      description: "Pitch your idea or join an existing team. Our AI automatically suggests compatible individuals to form innovative teams.",
      buttonText: "Discover",
      color: "#1d858d",
      href: "/sol/entrepreneur",
      gradient: "from-[#1d858d] to-[#10566e]"
    },
    {
      icon: Calendar,
      title: "Marathon",
      description: "Participate in innovation marathons, hackathons, and ideathons. Register individually or as a group and track your results in real-time.",
      buttonText: "Participate",
      color: "#279692",
      href: "/sol/marathon",
      gradient: "from-[#279692] to-[#1d858d]"
    },
    {
      icon: Users2,
      title: "Community",
      description: "Join an interactive community to exchange ideas, ask questions, share experiences, and find professional mentorship.",
      buttonText: "Join",
      color: "#35a79b",
      href: "/sol/Community",
      gradient: "from-[#35a79b] to-[#279692]"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal overflow-hidden">
      <Navbar />

      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#1d858d] opacity-10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse" as const,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto mt-12">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
          <div className="inline-flex items-center justify-center mb-4">
  <Sparkles className="text-[#FFD700] mr-2" size={24} />
  <span className="text-lg font-bold text-reviva-purple">REVIVE YOURSELF — from darkness to purpose</span>
  <Sparkles className="text-[#FFD700] ml-2" size={24} />
</div>

            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-4xl md:text-5xl font-bold text-reviva-purple mb-4">Mental Wellness </span>
              <span className="bg-gradient-to-r from-[#1d858d] to-[#35a79b] bg-clip-text text-transparent relative">
                Solutions
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r "
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
            </h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Discover our complete ecosystem to support your mental well-being and foster collaborative innovation
            </motion.p>
          </motion.div>

          {/* Reviva Solution Section */}
          <div className="mb-16">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold md:text-5xl text-reviva-purple mb-4 relative inline-block">
                Reviva Solution
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r "
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our 3 main features designed to create a collaborative and human-centered space
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <FeatureCard
                    {...feature}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    
      <Footer />
    </div>
  );
};

export default RevivaSolution;