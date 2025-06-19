import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturesSection from '@/components/FeaturesSection';
import { ArrowRight, Brain, Shield, Heart, Video, Calendar, Users, BarChart, Smile, Star, Sparkles, Crown } from 'lucide-react';

const FeaturesPage = () => {
  const featureCategories = [
    {
      title: "Therapeutic Support",
      description: "Comprehensive tools for your emotional wellness journey",
      icon: <Brain className="h-10 w-10 text-reviva-teal" />,
      features: [
        {
          title: "Virtual Therapy Sessions",
          description: "Connect with licensed therapists through secure video consultations from anywhere.",
          icon: <Video className="h-6 w-6 text-reviva-teal" />,
          link: "/therapy"
        },
        {
          title: "Progress Tracking",
          description: "Monitor your mental health journey with mood tracking and personalized insights.",
          icon: <BarChart className="h-6 w-6 text-reviva-teal" />,
          link: "/mood-tracker"
        }
      ]
    },
    {
      title: "Professional Therapy",
      description: "Connect with qualified therapists on your terms",
      icon: <Shield className="h-10 w-10 text-reviva-teal" />,
      features: [
        {
          title: "Easy Booking",
          description: "Schedule in-person or online therapy sessions with our intuitive booking system.",
          icon: <Calendar className="h-6 w-6 text-reviva-teal" />,
          link: "/therapy"
        },
        {
          title: "Support Groups",
          description: "Join moderated virtual groups to connect with others facing similar challenges.",
          icon: <Users className="h-6 w-6 text-reviva-teal" />,
          link: "/therapy#support-groups"
        }
      ]
    },
    {
      title: "Parent Space",
      description: "Dedicated resources for supporting your children",
      icon: <Heart className="h-10 w-10 text-reviva-teal" />,
      features: [
        {
          title: "Parental Guidance",
          description: "Tips and strategies to support your children's and teens' mental health.",
          icon: <Users className="h-6 w-6 text-reviva-teal" />,
          link: "/parents"
        },
        {
          title: "Kids' Learning Game",
          description: "A safe, playful environment to help children develop emotional wellbeing.",
          icon: <Smile className="h-6 w-6 text-reviva-teal" />,
          link: "/pet-game"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="py-12 md:py-20 bg-gradient-to-b from-reviva-mint/20 to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center justify-center p-2 bg-reviva-mint/30 rounded-full mb-4">
                <Brain className="h-6 w-6 text-reviva-teal" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-reviva-purple mb-4">
                Complete Mental Wellness Support
              </h1>
              <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
                Reviva combines technology, professional therapy and community support to offer a comprehensive mental wellness platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-16 mb-12">
              {featureCategories.map((category, idx) => (
                <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                    <div className="p-4 md:p-6 bg-reviva-mint/30 dark:bg-reviva-teal/10 rounded-full flex items-center justify-center">
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-reviva-deep-teal mb-2 text-center md:text-left">
                        {category.title}
                      </h2>
                      <p className="text-reviva-charcoal/80 dark:text-white/80 text-center md:text-left">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.features.map((feature, featureIdx) => (
                      <a 
                        key={featureIdx} 
                        href={feature.link}
                        className="glass-card dark:glass-card-dark p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group animate-scale-in"
                        style={{ animationDelay: `${(idx * 150) + (featureIdx * 100)}ms` }}
                      >
                        <div className="p-3 bg-reviva-mint/30 dark:bg-reviva-teal/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-medium text-reviva-deep-teal mb-2 group-hover:text-reviva-teal transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
                          {feature.description}
                        </p>
                        <div className="flex items-center text-reviva-teal font-medium">
                          Explore <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Reviva Solutions with Moroccan cultural touch */}
            <div className="bg-gradient-to-r from-reviva-mint/30 via-reviva-beige/40 to-reviva-mint/30 dark:from-reviva-purple/20 dark:via-reviva-teal/20 dark:to-reviva-purple/20 rounded-3xl p-8 mb-12 animate-scale-in border border-reviva-mint/50">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-4">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
                  Reviva Solutions - حلول ريفيفا
                </h2>
                <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-2xl mx-auto">
                  Culturally-adapted solutions for personalized support in our community
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card dark:glass-card-dark p-6 rounded-2xl text-center border border-reviva-mint/30">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-reviva-deep-teal mb-3">
                    Culturally-Sensitive Therapy
                  </h3>
                  <p className="text-reviva-charcoal/80 dark:text-white/80">
                    Therapeutic approach respecting local values and traditions
                  </p>
                </div>
                
                <div className="glass-card dark:glass-card-dark p-6 rounded-2xl text-center border border-reviva-mint/30">
                  <div className="p-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-reviva-deep-teal mb-3">
                    Family-Centered Support
                  </h3>
                  <p className="text-reviva-charcoal/80 dark:text-white/80">
                    Approach recognizing the importance of family in our society
                  </p>
                </div>
                
                <div className="glass-card dark:glass-card-dark p-6 rounded-2xl text-center border border-reviva-mint/30">
                  <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-reviva-deep-teal mb-3">
                    Holistic Wellbeing
                  </h3>
                  <p className="text-reviva-charcoal/80 dark:text-white/80">
                    Blending traditional practices with modern approaches
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card dark:glass-card-dark rounded-2xl p-8 max-w-3xl mx-auto animate-scale-in">
              <div className="flex items-start gap-6">
                <div className="hidden md:block">
                  <img 
                    src="/image/sante.png"
                    alt="Cat" 
                    className="w-32 h-32 object-cover rounded-full border-4 border-white dark:border-reviva-purple/20"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-reviva-purple mb-3">
                    Your Mental Wellness Journey Starts Here
                  </h3>
                  <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
                    Reviva provides a safe, caring environment to explore mental health resources, connect with professionals, and develop healthy habits.
                  </p>
                  <button className="reviva-button animate-pulse-gentle">
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;