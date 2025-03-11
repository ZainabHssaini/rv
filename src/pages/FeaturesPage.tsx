
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturesSection from '@/components/FeaturesSection';
import { ArrowRight, Brain, Shield, Heart, MessageCircle, Video, Calendar, Users, BarChart, Smile } from 'lucide-react';

const FeaturesPage = () => {
  const featureCategories = [
    {
      title: "Mental Health Support",
      description: "Comprehensive tools for your emotional wellbeing journey",
      icon: <Brain className="h-10 w-10 text-reviva-teal" />,
      features: [
        {
          title: "AI Chatbot Support",
          description: "Get guidance, self-help exercises, and resources from our intelligent mental health chatbot.",
          icon: <MessageCircle className="h-6 w-6 text-reviva-teal" />,
          link: "/chatbot"
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
          title: "Virtual Therapy Sessions",
          description: "Connect with licensed therapists through secure video consultations from anywhere.",
          icon: <Video className="h-6 w-6 text-reviva-teal" />,
          link: "/therapy"
        },
        {
          title: "Easy Scheduling",
          description: "Book in-person or online therapy sessions with our intuitive appointment system.",
          icon: <Calendar className="h-6 w-6 text-reviva-teal" />,
          link: "/therapy"
        }
      ]
    },
    {
      title: "Community & Engagement",
      description: "Build positive habits through connection and fun",
      icon: <Heart className="h-10 w-10 text-reviva-teal" />,
      features: [
        {
          title: "Support Groups",
          description: "Join moderated virtual groups to connect with others facing similar challenges.",
          icon: <Users className="h-6 w-6 text-reviva-teal" />,
          link: "/therapy#support-groups"
        },
        {
          title: "Pet Game",
          description: "Care for a virtual pet while building healthy mental habits and earning rewards.",
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
                Comprehensive Mental Health Support
              </h1>
              <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
                Reviva combines AI technology, professional therapy, and community support to provide a complete mental wellness platform.
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
            
            <div className="glass-card dark:glass-card-dark rounded-2xl p-8 max-w-3xl mx-auto animate-scale-in">
              <div className="flex items-start gap-6">
                <div className="hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
                    alt="Cat" 
                    className="w-32 h-32 object-cover rounded-full border-4 border-white dark:border-reviva-purple/20"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-reviva-purple mb-3">
                    Your Mental Health Journey Starts Here
                  </h3>
                  <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
                    Reviva provides a safe, supportive environment for you to explore mental health resources, connect with professionals, and build healthy habits.
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
