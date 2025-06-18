import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Users, Lightbulb, Search, Plus, UserPlus, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Entrepreneur = () => {
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
    quote: "Social entrepreneurship isn't just about business - it's about changing lives. Reviva helped me understand that true leadership means empowering others while solving real community problems.",
    author: "Dr. Amina Belkhir",
    role: "Director, Moroccan Center for Social Innovation",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    project: "Social Leadership Program"
  },
  {
    id: 2,
    quote: "As a single mother, I never dreamed I could start a business. Reviva's community believed in me - now my artisan cooperative employs 32 women preserving traditional crafts.",
    author: "Samira El Idrissi",
    role: "Founder, Heritage Hands",
    image: "https://images.unsplash.com/photo-1551836022-d5d44eef8b76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    project: "Traditional Craft Preservation"
  },
  {
    id: 3,
    quote: "The mentorship I found through Reviva helped scale my urban farming project from 1 rooftop to 12 locations across Casablanca, creating green jobs in food deserts.",
    author: "Omar Benjelloun",
    role: "Urban Agriculture Innovator",
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    project: "City Harvest Initiative"
  },
  {
    id: 4,
    quote: "After my burnout, Reviva didn't just help me recover - it helped me rebuild with purpose. Today I lead mental health workshops for other entrepreneurs.",
    author: "Lina Touahri",
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
              <Button variant="outline" className="border-[#1d858d] text-[#1d858d] hover:bg-[#1d858d] hover:text-white">
                See More
              </Button>
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

                  <Button className="w-full bg-[#1d858d] hover:bg-[#10566e] text-white">
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
              <Button variant="outline" className="border-[#279692] text-[#279692] hover:bg-[#279692] hover:text-white">
                View All Projects
              </Button>
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

                  <Button className="w-full bg-[#279692] hover:bg-[#1b6d80] text-white">
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