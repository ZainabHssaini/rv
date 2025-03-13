
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Video, MessageSquare, CheckCircle, Star, Users, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

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

const TherapyPage = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');
  
  const therapists: any[] = [
    {
      id: 1,
      lastname: "Dr. Yousfi",
      firstname: "Ihssan",
      title: "Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Trauma"],
      rating: 4.9,
      numberOfSessions: 324,
      image: "/reviva/woman (1).png" ,
      nextAvailable: true
    },
    {
      id: 2,
      lastname: "Dr.hakour",
      firstname: "Sami",
      title: "Psychiatrist",
      specialties: ["Mood Disorders", "Medication Management", "Anxiety"],
      rating: 4.8,
      numberOfSessions: 287,
      image: "/reviva/man.png" ,
      nextAvailable: true
    },
    {
      id: 3,
      lastname: "Dr.EL Bouchikhi",
      firstname: "Inass",
      title: "Family Therapist",
      specialties: ["Relationships", "Family Counseling", "Couples Therapy"],
      rating: 4.7,
      numberOfSessions: 198,
      image: "/reviva/woman (1).png" ,
      nextAvailable: false
    }
  ];
  
  const supportGroups = [
    {
      id: 1,
      title: "Anxiety Support Circle",
      description: "A safe space for sharing experiences and coping strategies for anxiety.",
      members: 24,
      nextSession: "Tomorrow at 6:00 PM",
      topics: ["General Anxiety", "Social Anxiety", "Panic Attacks"]
    },
    {
      id: 2,
      title: "Mindfulness Practice Group",
      description: "Weekly guided mindfulness sessions to help manage stress and improve well-being.",
      members: 32,
      nextSession: "Wednesday at 7:30 PM",
      topics: ["Meditation", "Breathing Techniques", "Present-Moment Awareness"]
    },
    {
      id: 3,
      title: "Grief & Loss Support",
      description: "A compassionate community for those experiencing grief and navigating loss.",
      members: 18,
      nextSession: "Friday at 5:00 PM",
      topics: ["Bereavement", "Coping Strategies", "Emotional Processing"]
    }
  ];

  useEffect(() => {
    console.log('Sending therapists data to the server...');
    sendTherapistsData();
  }, []);

  const sendTherapistsData = async () => {
    for(let t of therapists){
        console.log(JSON.stringify(t))
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


  const getAllData = async () => {
    console.log('Fetching all therapists data...');
    try {
      const response = await fetch('http://localhost:8082/therapists/');
      const data = await response.json();
      console.log(data);
      // for(let t of data){
      //   therapists.push(t);
      // }
      therapists.clear();

      console.log(therapists);
    } catch (error) {
      console.error(error);
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
                  <button className="reviva-button w-full md:w-auto animate-pulse-gentle">
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
                    {therapists.map((therapist) => (
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
                            <button className="flex-1 px-4 py-2 bg-reviva-teal text-white rounded-lg font-medium flex items-center justify-center">
                              <Video className="h-4 w-4 mr-1" /> Book Video
                            </button>
                            <button className="flex-1 px-4 py-2 border border-reviva-teal text-reviva-teal rounded-lg font-medium flex items-center justify-center">
                              <MessageSquare className="h-4 w-4 mr-1" /> Chat
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <button onClick={getAllData} className="px-6 py-3 bg-white dark:bg-reviva-charcoal border border-reviva-teal text-reviva-teal rounded-lg font-medium hover:bg-reviva-mint/10 transition-colors">
                      View All Therapists
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
                          
                          <button className="w-full px-4 py-2 bg-reviva-teal text-white rounded-lg font-medium mt-2">
                            Join Group
                          </button>
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
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TherapyPage;
