import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Users, Lightbulb, Search, Plus, UserPlus, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface EntrepreneurProps {
  teamId?: string; // Make it optional with ?
}

const Entrepreneur = ({ teamId }: EntrepreneurProps) => {
const handleInviteClick = () => {
    // Simuler l'envoi de l'invitation
    toast.success("Invitation sent successfully!", {
      description: "Your collaborator will receive an email shortly.",
      action: {
        label: "Undo",
        onClick: () => {
          console.log("Undo invitation");
          toast.info("Invitation cancelled");
        },
      },
    });
  };

const handleJoinClick = async () => {
    const toastId = toast.loading("Processing your request...");
    
    try {
      // Simulate API call to join team
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3;
      
      if (success) {
        toast.success("You've joined the team!", {
          id: toastId,
          description: "You now have access to team resources.",
          action: {
            label: "Leave Team",
            onClick: () => handleLeaveTeam(teamId),
          },
        });
      } else {
        toast.warning("Request requires approval", {
          id: toastId,
          description: "The team admin will review your request.",
          action: {
            label: "Cancel Request",
            onClick: () => handleCancelRequest(teamId),
          },
        });
      }
    } catch (error) {
      toast.error("Failed to join team", {
        id: toastId,
        description: "Please try again later.",
      });
    }
  };

  const leaveTeam = async (teamId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Simulate success
        // resolve(false); // Simulate failure
      }, 1500);
    });
  };

  // Simulate API call to cancel join request
  const cancelJoinRequest = async (teamId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Simulate success
        // resolve(false); // Simulate failure
      }, 1200);
    });
  };

  const handleLeaveTeam = async (teamId: string) => {
    const toastId = toast.loading("Leaving team...");
    
    try {
      const success = await leaveTeam(teamId);
      
      if (success) {
        toast.success(`You've left`, {
          id: toastId,
          description: "You no longer have access to team resources.",
          action: {
            label: "Rejoin",
            onClick: () => handleJoinClick(),
          },
        });
      } else {
        toast.error("Failed to leave team", {
          id: toastId,
          description: "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        id: toastId,
        description: error instanceof Error ? error.message : "Could not leave team",
      });
    }
  };

  const handleCancelRequest = async (teamId: string) => {
    const toastId = toast.loading("Cancelling request...");
    
    try {
      const success = await cancelJoinRequest(teamId);
      
      if (success) {
        toast("Join request cancelled", {
          id: toastId,
          description: `Your request to join has been withdrawn.`,
          action: {
            label: "Request Again",
            onClick: () => handleJoinClick(),
          },
        });
      } else {
        toast.warning("Cancellation failed", {
          id: toastId,
          description: "The request may have already been processed.",
        });
      }
    } catch (error) {
      toast.error("Error cancelling request", {
        id: toastId,
        description: "Please contact support if this persists.",
      });
    }
  };



  const suggestedPeople = [
    {
      id: 1,
      name: "Sarah Martinez",
      role: "Full-Stack Developer",
      skills: ["React", "Node.js", "UI/UX"],
      compatibility: 95,
      avatar: "🧑‍💻"
    },
    {
      id: 2,
      name: "Ahmed Ben Ali",
      role: "Digital Marketing Expert",
      skills: ["SEO", "Social Media", "Analytics"],
      compatibility: 88,
      avatar: "👨‍💼"
    },
    {
      id: 3,
      name: "Emma Dubois",
      role: "Product Designer",
      skills: ["Figma", "Design System", "Prototyping"],
      compatibility: 92,
      avatar: "🎨"
    }
  ];

  const existingTeams = [
    {
      id: 1,
      name: "EcoTech Solutions",
      description: "Mobile application to reduce daily carbon footprint",
      members: 3,
      needsSkills: ["Backend Developer", "Data Analyst"],
      category: "Environment"
    },
    {
      id: 2,
      name: "HealthTracker Pro",
      description: "Health tracking platform with predictive AI",
      members: 2,
      needsSkills: ["ML Engineer", "Mobile Developer"],
      category: "Health"
    },
    {
      id: 3,
      name: "EduConnect",
      description: "Educational social network for students and mentors",
      members: 4,
      needsSkills: ["Frontend Developer", "Community Manager"],
      category: "Education"
    }
  ];
  const testimonials = [
  {
    id: 1,
    quote: "The experience was really nice specially when u are engaging with professionnals I really enjoyed my experience and I hope a lots of people give it a shot",
    author: "Douae Belkhir",
    role: "Student, Owner of small ArgiCare Startup",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    project: "Social Leadership Program"
  },
  {
    id: 2,
    quote: "Reviva 3awnatni bzaaf! bach ncreer l  business dyali o nkbro kter , Mercii REVEVIVA",
    author: "Samira El Idrissi",
    role: "Founder, Heritage Hands",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQGaSotgL0Y6xw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1654257597138?e=1755734400&v=beta&t=bqc-dlin0uxw8p4vF3dwXlx9gFfg3y6Kz3uP97fWJQw",
    project: "Traditional Craft Preservation"
  },
  {
    id: 3,
    quote: "Saraha bonne expérience makontchi metweqa3 anani an9dar nehdar mertah mea une personne li machi mn sohabi wla nas li qrabin lili ms au début de la séance, j’ai ressenti une écoute attentive et un intérêt véritable, ce qui m’a permis de m’ouvrir progressivement au fil de notre conversation",
    author: "Omar Benjelloun",
    role: "Urban Agriculture Innovator",
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    project: "City Harvest Initiative"
  },
  {
    id: 4,
    quote: "Saraha kulshi daz zwine mme ihssan fenna ktkhlik t3awdi ga3 dekshi li mbrztek Je préfère ku kant presentiel hssn rak 3arfa kayn li ma3ndush lwifi kayn li 3ayech mea darhum mybghish ysm3uhSinn it was amazing ",
    author: "Amina Touahri",
    role: "Wellbeing Coach",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    project: "Entrepreneur Mental Health Program"
  },
  {
  id: 5,
    quote: "Reviva did more than improve my wellbeing - it gave me the tools and connections to launch my dream project. From zero to fully-funded in 6 months, with the perfect team by my side!",
    author: "Karim El Fassi",
    role: "Founder, GreenTech Sahara",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    project: "Solar-powered irrigation systems"
  },
  {
    id: 6,
    quote: "The cross-cultural connections I made through Reviva helped me adapt my disability tech solution for three different African markets - something I couldn't have done alone.",
    author: "Dr. Kwame Nkrumah",
    role: "Assistive Technology Specialist",
    image: "https://images.unsplash.com/photo-1546820389-44d77e1f3b31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    project: "Accessible Africa"
  }
];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-4xl md:text-5xl font-bold text-reviva-purple mb-4">Entrepreneur </span>
              <span className="bg-gradient-to-r from-[#1d858d] to-[#35a79b] bg-clip-text text-transparent">
                Space
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Turn your idea into reality or join an innovative team. Our AI connects you with the right people.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-[#1d858d]/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1d858d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-[#1d858d]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Pitch My Idea</h3>
                <p className="text-gray-600 mb-6">
                  Share your vision and let our AI suggest the perfect team to bring your project to life.
                </p>
                <a href="/createProject">
                  <Button className="bg-[#1d858d] hover:bg-[#10566e] text-white px-8 py-3 rounded-xl">
                    <Plus className="w-5 h-5 mr-2" />
                    Create My Project
                  </Button>
                </a>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-[#279692]/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#279692]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-[#279692]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Join a Team</h3>
                <p className="text-gray-600 mb-6">
                  Discover exciting projects that match your skills and join the adventure.
                </p>
                <a href="/exploreProject">
                  <Button className="bg-[#279692] hover:bg-[#1b6d80] text-white px-8 py-3 rounded-xl">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Explore Projects
                  </Button>
                </a>
              </div>
            </Card>
          </div>

          {/* AI Suggestions Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">AI Suggestions For You</h2>
            
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {suggestedPeople.map((person) => (
                <Card key={person.id} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{person.avatar}</div>
                    <h4 className="font-bold text-lg text-gray-800">{person.name}</h4>
                    <p className="text-gray-600 text-sm">{person.role}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Compatibility</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-semibold text-[#1d858d]">{person.compatibility}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#1d858d] to-[#35a79b] h-2 rounded-full"
                        style={{ width: `${person.compatibility}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {person.skills.map((skill, index) => (
                        <span key={index} className="bg-[#1d858d]/10 text-[#1d858d] px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-[#1d858d] hover:bg-[#10566e] text-white"
                  onClick={handleInviteClick}
                  >
                    Invite to Collaborate
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Existing Teams Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Teams Looking for Talent</h2>
             
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {existingTeams.map((team) => (
                <Card key={team.id} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-[#35a79b]/10 text-[#35a79b] px-3 py-1 rounded-full text-xs font-medium">
                        {team.category}
                      </span>
                      <div className="flex items-center text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{team.members} members</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">{team.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{team.description}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Looking for:</p>
                    <div className="flex flex-wrap gap-1">
                      {team.needsSkills.map((skill, index) => (
                        <span key={index} className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs border border-red-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-[#279692] hover:bg-[#1b6d80] text-white"
                  onClick={handleJoinClick}
                  >
                    Join the Team
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        
        </div>
        <div className="mt-24 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Success Stories From Our Community
          </h2>
          
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ 
                  x: `-${currentTestimonial * 100}%`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <Card className="p-8 bg-gradient-to-br from-[#1d858d]/5 to-[#35a79b]/5 border-2 border-[#1d858d]/20 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start mb-6">
                        <div className="relative w-16 h-16 mr-6 rounded-full overflow-hidden">
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                            ))}
                          </div>
                          <blockquote className="text-lg italic text-gray-700 mb-4">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="font-semibold text-gray-800">{testimonial.author}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                          <div className="mt-2 text-xs text-[#1d858d] font-medium">
                            {testimonial.project}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>
            {/* Navigation Arrows */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-[#1d858d]" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-[#1d858d]" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Entrepreneur;