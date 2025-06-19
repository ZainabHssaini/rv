import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { X, Clock, MessageCircle, Phone, CreditCard, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { 
  Calendar, 
  Video, 
  MessageSquare, 
  CheckCircle, 
  Star, 
  Users, 
  ChevronDown, 
  ChevronUp,
  PlayCircle,
  HeartPulse,
  BookOpen,
  Activity,
  Share2,
  Bookmark
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MeetButton from '@/components/MeetButton';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/router';

import { Podcast } from "@/services/podcastsService";

type Therapist = {
  id: number;
  lastname: string;
  firstname: string;
  title: string;
  specialties: string[];
  rating: number;
  numberOfSessions: number;
  image: string;
  nextAvailable: boolean;
};

type SupportGroup = {
  id: number;
  title: string;
  description: string;
  members: number;
  nextSession: string;
  topics: string[];
  meetLink: string;
};
type TherapeuticModel = {
  id: number;
  title: string;
  description: string;
  steps: string[];
  duration: string;
  image?: string;
  price?: number;
};

const TherapyPage = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');
  const [displayedTherapists, setDisplayedTherapists] = useState<Therapist[]>([]);
  const [showAllTherapists, setShowAllTherapists] = useState(false);

  const therapeuticModels: TherapeuticModel[] = [
    {
      id: 1,
      title: "Stress Management Protocol",
      description: "Evidence-based techniques to reduce and manage stress",
      steps: [
        "Identify your stress triggers",
        "Practice diaphragmatic breathing daily",
        "Implement time management strategies",
        "Engage in regular physical activity",
        "Maintain a consistent sleep schedule",
        "Practice mindfulness meditation"
      ],
      duration: "4-8 weeks",
      image: "/image/stress-management.jpg",
      price: 100
    },
    {
      id: 2,
      title: "Cognitive Behavioral Therapy (CBT) Model",
      description: "Identify and change negative thought patterns",
      steps: [
        "Recognize automatic negative thoughts",
        "Challenge cognitive distortions",
        "Develop alternative balanced thoughts",
        "Behavioral activation techniques",
        "Gradual exposure to feared situations",
        "Relapse prevention planning"
      ],
      duration: "6-12 weeks",
      image: "/image/CBT.jpg",
      price: 150
    },
    {
      id: 3,
      title: "Sleep Hygiene Program",
      description: "Improve sleep quality through behavioral changes",
      steps: [
        "Establish consistent sleep schedule",
        "Create optimal sleep environment",
        "Limit screen time before bed",
        "Reduce caffeine and alcohol intake",
        "Implement relaxation techniques",
        "Use bed only for sleep and intimacy"
      ],
      duration: "3-4 weeks",
      image: "/image/sleep.jpg",
      price: 100
    },
    {
      id: 4,
      title: "Emotion Regulation Skills",
      description: "DBT-based techniques for managing intense emotions",
      steps: [
        "Identify and label emotions",
        "Practice mindfulness of current emotion",
        "Use opposite action technique",
        "Implement self-soothing strategies",
        "Build positive experiences",
        "Apply distress tolerance skills"
      ],
      duration: "8-12 weeks",
      image: "/image/emotion.jpg",
      price: 100
    },
    {
      id: 5,
      title: "Mindfulness-Based Stress Reduction",
      description: "Cultivate present-moment awareness to reduce stress",
      steps: [
        "Daily body scan meditation",
        "Mindful breathing exercises",
        "Walking meditation practice",
        "Mindful eating techniques",
        "Loving-kindness meditation",
        "Integration into daily activities"
      ],
      duration: "8 weeks",
      image: "/image/reduce-stress.jpg",
      price: 120
    },
    {
      id: 6,
      title: "Trauma Recovery Model",
      description: "Phased approach to trauma processing and healing",
      steps: [
        "Establish safety and stabilization",
        "Process traumatic memories",
        "Cognitive restructuring",
        "Emotional regulation skills",
        "Rebuild interpersonal connections",
        "Post-traumatic growth integration"
      ],
      duration: "12+ weeks",
      image: "/image/trauma.jpg",
      price: 150
    }
  ];
  
  const allTherapists: Therapist[] = [
    {
      id: 1,
      lastname: "Dr. Yousfi",
      firstname: "Ihssan",
      title: "Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Trauma"],
      rating: 4.9,
      numberOfSessions: 324,
      image: "/reviva/woman (1).png",
      nextAvailable: true
    },
    {
      id: 2,
      lastname: "Dr. Hakour",
      firstname: "Sami",
      title: "Psychiatrist",
      specialties: ["Mood Disorders", "Medication Management", "Anxiety"],
      rating: 4.8,
      numberOfSessions: 287,
      image: "/reviva/man.png",
      nextAvailable: true
    },
    {
      id: 3,
      lastname: "Dr. El Bouchikhi",
      firstname: "Inass",
      title: "Family Therapist",
      specialties: ["Relationships", "Family Counseling", "Couples Therapy"],
      rating: 4.7,
      numberOfSessions: 198,
      image: "/reviva/woman (1).png",
      nextAvailable: false
    },
    {
      id: 4,
      lastname: "Dr. Benjelloun",
      firstname: "Karim",
      title: "Cognitive Behavioral Therapist",
      specialties: ["OCD", "Phobias", "Stress Management"],
      rating: 4.8,
      numberOfSessions: 156,
      image: "/reviva/man.png",
      nextAvailable: true
    },
    {
      id: 5,
      lastname: "Dr. El Mansouri",
      firstname: "Fatima",
      title: "Child Psychologist",
      specialties: ["ADHD", "Autism", "Childhood Trauma"],
      rating: 4.9,
      numberOfSessions: 210,
      image: "/reviva/woman (1).png",
      nextAvailable: false
    },
    {
      id: 6,
      lastname: "Dr. Alaoui",
      firstname: "Mehdi",
      title: "Addiction Specialist",
      specialties: ["Substance Abuse", "Behavioral Addictions", "Relapse Prevention"],
      rating: 4.7,
      numberOfSessions: 187,
      image: "/reviva/man.png",
      nextAvailable: true
    },
    {
      id: 7,
      lastname: "Dr. Zahidi",
      firstname: "Amina",
      title: "Psychoanalyst",
      specialties: ["Personality Disorders", "Self-Esteem", "Identity Issues"],
      rating: 4.6,
      numberOfSessions: 132,
      image: "/reviva/woman (1).png",
      nextAvailable: true
    },
    {
      id: 8,
      lastname: "Dr. Cherkaoui",
      firstname: "Omar",
      title: "Trauma Specialist",
      specialties: ["PTSD", "EMDR", "Grief Counseling"],
      rating: 4.9,
      numberOfSessions: 245,
      image: "/reviva/man.png",
      nextAvailable: false
    }
  ];

  const supportGroups: SupportGroup[] = [
    {
      id: 1,
      title: "Anxiety Support Circle",
      description: "A safe space for sharing experiences and coping strategies for anxiety.",
      members: 24,
      nextSession: "Tomorrow at 6:00 PM",
      topics: ["General Anxiety", "Social Anxiety", "Panic Attacks"],
      meetLink: "https://meet.google.com/epz-enrt-vpv"
    },
    {
      id: 2,
      title: "Mindfulness Practice Group",
      description: "Weekly guided mindfulness sessions to help manage stress and improve well-being.",
      members: 32,
      nextSession: "Wednesday at 7:30 PM",
      topics: ["Meditation", "Breathing Techniques", "Present-Moment Awareness"],
      meetLink: "https://meet.google.com/epz-enrt-vpv"
    },
    {
      id: 3,
      title: "Grief & Loss Support",
      description: "A compassionate community for those experiencing grief and navigating loss.",
      members: 18,
      nextSession: "Friday at 5:00 PM",
      topics: ["Bereavement", "Coping Strategies", "Emotional Processing"],
      meetLink: "https://meet.google.com/epz-enrt-vpv"
    }
  ];

  useEffect(() => {
    setDisplayedTherapists(allTherapists.slice(0, 3));
    sendTherapistsData();
  }, []);

  const sendTherapistsData = async () => {
    for(let t of allTherapists){
      try {
        const response = await fetch('http://localhost:8082/therapists/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(t)
        });
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const navigate = useNavigate();



  
  const toggleTherapistsView = async () => {
    if (showAllTherapists) {
      setDisplayedTherapists(allTherapists.slice(0, 3));
      setShowAllTherapists(false);
    } else {
      try {
        const response = await fetch('http://localhost:8082/therapists/');
        if (response.ok) {
          const backendTherapists = await response.json();
          setDisplayedTherapists([...allTherapists, ...backendTherapists]);
        } else {
          setDisplayedTherapists(allTherapists);
        }
        setShowAllTherapists(true);
      } catch (error) {
        console.error(error);
        setDisplayedTherapists(allTherapists);
        setShowAllTherapists(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="py-12 bg-gradient-to-b from-reviva-mint/20 to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-3xl md:text-5xl font-bold text-reviva-purple mb-4">
                Professional Therapy Services
              </h1>
              <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
                Connect with licensed therapists through secure video consultations or join supportive group sessions to improve your mental well-being.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto glass-card dark:glass-card-dark rounded-2xl overflow-hidden mb-16 animate-scale-in">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-reviva-deep-teal mb-4">
                    Your Journey to Better Mental Health
                  </h2>
                  <p className="text-reviva-charcoal/80 dark:text-white/80 mb-6">
                    Our qualified therapists provide personalized support for your unique mental health needs. Book a session today.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Secure video sessions from anywhere</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Licensed, experienced therapists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Flexible scheduling options</span>
                    </li>
                  </ul>
                  <button 
                    className="reviva-button w-full md:w-auto animate-pulse-gentle"
                    onClick={() => {
                      const element = document.getElementById("individual-therapy");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Book Your First Session
                  </button>
                </div>
                <div className="md:w-1/2 relative min-h-[300px]">
                  <img 
                    src="/reviva/3.jpg" 
                    alt="Therapy session" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-center mb-8">
                <div className="p-1 bg-reviva-mint/20 dark:bg-reviva-charcoal rounded-lg">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('individual')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === 'individual'
                          ? 'bg-reviva-teal text-white'
                          : 'hover:bg-reviva-mint/30 dark:hover:bg-reviva-teal/10'
                      }`}
                    >
                      Individual Therapy
                    </button>
                    <button
                      onClick={() => setActiveTab('group')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === 'group'
                          ? 'bg-reviva-teal text-white'
                          : 'hover:bg-reviva-mint/30 dark:hover:bg-reviva-teal/10'
                      }`}
                    >
                      Support Groups
                    </button>
                  </div>
                </div>
              </div>
              
              {activeTab === 'individual' ? (
                <div id="individual-therapy" className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-reviva-purple mb-6 text-center">
                    Our Therapists
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedTherapists.map((therapist) => (
                      <div key={therapist.id} className="glass-card dark:glass-card-dark rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in">
                        <div className="relative">
                          <img 
                            src={therapist.image} 
                            alt={therapist.lastname} 
                            className="w-full h-48 object-cover"
                          />
                          {therapist.nextAvailable ? (
                            <div className="absolute top-3 right-3 bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                              Available Today
                            </div>
                          ) : (
                            <div className="absolute top-3 right-3 bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400 px-2 py-1 rounded-full text-xs font-medium">
                              Next Available: Tomorrow
                            </div>
                          )}
                        </div>
                        
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-reviva-deep-teal mb-1">
                            {therapist.lastname} {therapist.firstname}
                          </h3>
                          <p className="text-sm text-reviva-charcoal/70 dark:text-white/70 mb-3">
                            {therapist.title}
                          </p>
                          
                          <div className="flex items-center mb-3">
                            <div className="flex items-center mr-3">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{therapist.rating}</span>
                            </div>
                            <div className="text-sm text-reviva-charcoal/70 dark:text-white/70">
                              {therapist.numberOfSessions}+ sessions
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-1">Specialties:</div>
                            <div className="flex flex-wrap gap-1">
                              {therapist.specialties.map((specialty, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs bg-reviva-mint/30 text-reviva-deep-teal dark:bg-reviva-teal/10 dark:text-reviva-mint px-2 py-0.5 rounded-full"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-4">
                            <Link
                              to="/book"
                              state={{ therapist }}
                              className="px-4 py-2 bg-reviva-teal text-white rounded-lg flex items-center gap-2"
                            >
                              <Video className="h-4 w-4" />
                              Book Video
                            </Link>
                            
                            <Link 
                              to="/chat" 
                              className="flex-1 px-4 py-2 border border-reviva-teal text-reviva-teal rounded-lg font-medium flex items-center justify-center hover:bg-reviva-beige/10 transition-colors"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" /> 
                              Chat
                            </Link>
                          </div>  
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <button 
                      onClick={toggleTherapistsView}
                      className="px-6 py-3 bg-white dark:bg-reviva-charcoal border border-reviva-teal text-reviva-teal rounded-lg font-medium hover:bg-reviva-mint/10 transition-colors flex items-center justify-center mx-auto gap-2"
                    >
                      {showAllTherapists ? (
                        <>
                          <ChevronUp className="h-5 w-5" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-5 w-5" />
                          View All Therapists
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div id="support-groups" className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-reviva-purple mb-6 text-center">
                    Support Groups
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {supportGroups.map((group) => (
                      <div key={group.id} className="glass-card dark:glass-card-dark rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in">
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-reviva-deep-teal mb-2">
                            {group.title}
                          </h3>
                          <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-4">
                            {group.description}
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 text-reviva-teal mr-2" />
                              <span>{group.members} members</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 text-reviva-teal mr-2" />
                              <span>{group.nextSession}</span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-1">Topics:</div>
                            <div className="flex flex-wrap gap-1">
                              {group.topics.map((topic, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs bg-reviva-mint/30 text-reviva-deep-teal dark:bg-reviva-teal/10 dark:text-reviva-mint px-2 py-0.5 rounded-full"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <MeetButton 
                            meetLink={group.meetLink} 
                            className="w-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <button className="px-6 py-3 bg-white dark:bg-reviva-charcoal border border-reviva-teal text-reviva-teal rounded-lg font-medium hover:bg-reviva-mint/10 transition-colors">
                      Browse All Groups
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-reviva-purple mb-8 text-center">
                How It Works
              </h2>
              

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center glass-card dark:glass-card-dark p-6 rounded-xl animate-scale-in">
                  <div className="w-16 h-16 bg-reviva-mint/30 dark:bg-reviva-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-reviva-teal" />
                  </div>
                  <h3 className="text-lg font-medium text-reviva-deep-teal mb-2">1. Book a Session</h3>
                  <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                    Choose a therapist and select a convenient time slot that works for your schedule.
                  </p>
                </div>
                
                <div className="text-center glass-card dark:glass-card-dark p-6 rounded-xl animate-scale-in delay-100">
                  <div className="w-16 h-16 bg-reviva-mint/30 dark:bg-reviva-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="h-8 w-8 text-reviva-teal" />
                  </div>
                  <h3 className="text-lg font-medium text-reviva-deep-teal mb-2">2. Attend Your Session</h3>
                  <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                    Connect via secure video from the comfort of your home or any private space.
                  </p>
                </div>
                
                <div className="text-center glass-card dark:glass-card-dark p-6 rounded-xl animate-scale-in delay-200">
                  <div className="w-16 h-16 bg-reviva-mint/30 dark:bg-reviva-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-reviva-teal" />
                  </div>
                  <h3 className="text-lg font-medium text-reviva-deep-teal mb-2">3. Continue Your Growth</h3>
                  <p className="text-sm text-reviva-charcoal/80 dark:text-white/80">
                    Follow your personalized care plan and schedule follow-up sessions as needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Therapeutic Models Section */}
            <div className="max-w-6xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-reviva-purple mb-8 text-center animate-fade-in">
                <HeartPulse className="h-6 w-6 text-reviva-teal inline mr-3 animate-pulse" />
                Evidence-Based Therapeutic Models
                <HeartPulse className="h-6 w-6 text-reviva-teal inline ml-3 animate-pulse" />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapeuticModels.map((model, index) => (
                  <div 
                    key={model.id} 
                    className="glass-card dark:glass-card-dark p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden group">
                      <img 
                        src={model.image || "/reviva/therapy-default.jpg"} 
                        alt={model.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <h3 className="text-xl font-bold text-white">{model.title}</h3>
                      </div>
                      <div className="absolute top-0 right-0 bg-reviva-teal text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                        {model.duration}
                      </div>
                    </div>
                    
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-4">
                      {model.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 text-reviva-teal mr-2" />
                        Key Steps:
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {model.steps.map((step, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start hover:bg-reviva-mint/10 dark:hover:bg-reviva-teal/10 p-2 rounded transition-colors"
                          >
                            <CheckCircle className="h-4 w-4 text-reviva-teal mr-2 mt-0.5 flex-shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-reviva-mint/20 text-reviva-teal dark:bg-reviva-teal/10 dark:text-reviva-mint px-2 py-1 rounded-full flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {model.duration}
                      </span>
                      <div className="text-lg font-bold text-reviva-purple">
                        {model.price} DH
                      </div>
                    </div>
                    
                    <div className="mt-4">

<button 
  onClick={() => navigate('/virement1')}
  className="flex-1 reviva-button flex items-center justify-center gap-2"
>
  <CreditCard className="h-4 w-4" />
  Buy It
</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Therapist-Recommended Resources */}
            <div className="max-w-4xl mx-auto mt-16 glass-card dark:glass-card-dark p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-reviva-deep-teal mb-6 flex items-center">
                <HeartPulse className="h-6 w-6 text-reviva-teal mr-3" />
                Therapist-Recommended Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-l-4 border-reviva-teal pl-4 py-2">
                  <h3 className="font-medium mb-3">Mobile Apps</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-reviva-teal mr-2" />
                      <span>Headspace (Meditation)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-reviva-teal mr-2" />
                      <span>MoodTools (Depression)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-reviva-teal mr-2" />
                      <span>Daylio (Mood Tracking)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-reviva-purple pl-4 py-2">
                  <h3 className="font-medium mb-3">Books</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 text-reviva-purple mr-2" />
                      <span>The Body Keeps the Score</span>
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 text-reviva-purple mr-2" />
                      <span>Feeling Good by David Burns</span>
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 text-reviva-purple mr-2" />
                      <span>The Happiness Trap</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-reviva-mint pl-4 py-2">
                  <h3 className="font-medium mb-3">Online Programs</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Activity className="h-4 w-4 text-reviva-mint mr-2" />
                      <span>CBT-I for Insomnia</span>
                    </li>
                    <li className="flex items-center">
                      <Activity className="h-4 w-4 text-reviva-mint mr-2" />
                      <span>DBT Skills Training</span>
                    </li>
                    <li className="flex items-center">
                      <Activity className="h-4 w-4 text-reviva-mint mr-2" />
                      <span>Mindfulness-Based CBT</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-reviva-beige/30 dark:bg-reviva-charcoal/50 p-4 rounded-lg">
                <div className="flex items-start">
                  <img 
                    src="/reviva/woman (1).png" 
                    alt="Dr. Yousfi" 
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-sm italic mb-1">
                      "These resources complement our therapy sessions perfectly. I recommend starting with one resource at a time to avoid feeling overwhelmed."
                    </p>
                    <p className="text-sm font-medium">— Dr. Ihssan Yousfi, Clinical Psychologist</p>
                  </div>
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

export default TherapyPage;