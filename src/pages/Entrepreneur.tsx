import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Users, Lightbulb, Search, Plus, UserPlus, Star } from "lucide-react";

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
      </div>
      <Footer />
    </div>
  );
};

export default Entrepreneur;