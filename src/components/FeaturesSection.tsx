
import { MessageCircle, Video, Calendar, Users, BarChart, Smile } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageCircle className="h-6 w-6 text-reviva-teal" />,
      title: "AI Chatbot Support",
      description: "Get guidance, self-help exercises, and resources from our intelligent mental health chatbot."
    },
    {
      icon: <Video className="h-6 w-6 text-reviva-teal" />,
      title: "Virtual Therapy Sessions",
      description: "Connect with licensed therapists through secure video consultations from anywhere."
    },
    {
      icon: <Calendar className="h-6 w-6 text-reviva-teal" />,
      title: "Easy Scheduling",
      description: "Book in-person or online therapy sessions with our intuitive appointment system."
    },
    {
      icon: <Users className="h-6 w-6 text-reviva-teal" />,
      title: "Support Groups",
      description: "Join moderated virtual groups to connect with others facing similar challenges."
    },
    {
      icon: <BarChart className="h-6 w-6 text-reviva-teal" />,
      title: "Progress Tracking",
      description: "Monitor your mental health journey with mood tracking and personalized insights."
    },
    {
      icon: <Smile className="h-6 w-6 text-reviva-teal" />,
      title: "Anti-Stress Game",
      description: "Care for a virtual pet while building healthy mental habits and earning rewards."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-transparent to-reviva-mint/20 dark:to-reviva-purple/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
            Comprehensive Mental Health Support
          </h2>
          <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
            Reviva combines AI technology, professional therapy, and community support to provide a complete mental wellness platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="reviva-card glass-card dark:glass-card-dark animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-3 bg-reviva-mint/30 dark:bg-reviva-teal/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-reviva-deep-teal mb-2">
                {feature.title}
              </h3>
              <p className="text-reviva-charcoal/80 dark:text-white/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
