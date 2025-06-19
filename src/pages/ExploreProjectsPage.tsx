import { useEffect, useState } from 'react';
import { Search, Filter, Users, Star, Clock, Flame, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ExploreProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const mockprojects = [
  {
    id: 1,
    name: 'EcoDelivery Network',
    description: 'Sustainable last-mile delivery solution using electric vehicles',
    category: 'Sustainability',
    skills: ['Logistics', 'EV Tech', 'App Development'],
    popularity: 95,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isTrending: true
  },
  {
    id: 2,
    name: 'HealthAI Companion',
    description: 'AI-powered personal health assistant with predictive analytics',
    category: 'Health Tech',
    skills: ['Machine Learning', 'Mobile Dev', 'UI/UX'],
    popularity: 88,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    isTrending: true
  },
  {
    id: 3,
    name: 'EduPlay Platform',
    description: 'Gamified learning platform for K-12 education',
    category: 'EdTech',
    skills: ['Game Dev', 'Education', 'Frontend'],
    popularity: 76,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    isTrending: false
  },
  {
    id: 4,
    name: 'SmartFarm IoT',
    description: 'IoT solution for precision agriculture and crop monitoring',
    category: 'AgriTech',
    skills: ['IoT', 'Data Science', 'Hardware'],
    popularity: 82,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    isTrending: false
  }
];

    // const mockprojects = [];

const [projects, setProjects] = useState<any[]>(mockprojects);


 function getRecency(createdAt: string): string {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (weeks < 5) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}





  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const fetchedProjects: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProjects.push({ id: doc.id, ...doc.data() });
      });

      setProjects((prevProjects) => [...prevProjects, ...fetchedProjects]);
    } catch (error) {
      console.error("Error fetching projects from Firestore:", error);
    }
  };

  fetchProjects();
}, []);

const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'trending' && project.isTrending) || 
                         project.category.toLowerCase().includes(activeFilter);
    
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal overflow-hidden">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[#10566e] mb-4">
                    Discover <span className="text-[#1d858d]">Innovative Projects</span>
                </h1>
                <p className="text-xl text-[#1b6d80] max-w-2xl mx-auto">
                    Find exciting projects that match your skills and interests
                </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-12">
                <div className="relative max-w-2xl mx-auto mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#279692]" />
                    <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-[#35a79b] focus:ring-2 focus:ring-[#1d858d] focus:border-[#1b6d80] shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    <Button
                    variant={activeFilter === 'all' ? 'default' : 'outline'}
                    className={activeFilter === 'all' ? 'bg-[#1d858d] hover:bg-[#10566e]' : 'text-[#1b6d80] border-[#35a79b]'}
                    onClick={() => setActiveFilter('all')}
                    >
                    All Projects
                    </Button>
                    <Button
                    variant={activeFilter === 'trending' ? 'default' : 'outline'}
                    className={`flex items-center gap-1 ${activeFilter === 'trending' ? 'bg-[#279692] hover:bg-[#1b6d80]' : 'text-[#1b6d80] border-[#35a79b]'}`}
                    onClick={() => setActiveFilter('trending')}
                    >
                    <Flame className="w-4 h-4" />
                    Trending
                    </Button>
                    {['Tech', 'Health', 'Education', 'Sustainability'].map((cat) => (
                    <Button
                        key={cat}
                        variant={activeFilter === cat.toLowerCase() ? 'default' : 'outline'}
                        className={activeFilter === cat.toLowerCase() ? `bg-[#1d858d] hover:bg-[#10566e]` : 'text-[#1b6d80] border-[#35a79b]'}
                        onClick={() => setActiveFilter(cat.toLowerCase())}
                    >
                        {cat}
                    </Button>
                    ))}
                </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-[#35a79b]">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#e0f2f1] text-[#10566e] mb-2">
                            {project.category}
                            </span>
                            {project.isTrending && (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#fff3e0] text-[#e65100] ml-2">
                                Trending
                            </span>
                            )}
                        </div>
                        <div className="flex items-center text-[#ffb74d]">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 text-sm font-medium">{project.popularity}</span>
                        </div>
                        </div>

                        <h3 className="text-xl font-bold text-[#10566e] mb-2 group-hover:text-[#1d858d] transition-colors">
                        {project.name}
                        </h3>
                        <p className="text-[#1b6d80] mb-4">{project.description}</p>

                        <div className="mb-6">
                        <p className="text-sm text-[#279692] mb-2">Skills needed:</p>
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(project.skills) && project.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-[#e0f2f1] text-[#10566e] text-xs rounded">
                                {skill}
                            </span>
                            ))}
                        </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-[#1b6d80]">
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>3-5 members</span>
                        </div>
                        <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{getRecency(project.createdAt)}</span>
                        </div>
                        </div>
                    </div>

                    <div className="px-6 pb-6">
                        <Button className="w-full bg-[#1d858d] hover:bg-[#10566e]"
                        onClick={() => setSelectedProject(project)}
                        >
                        View Project Details
                        </Button>
                    </div>
                    </Card>
                ))}
                </div>

                {/* Project Details Dialog */}
                <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                  {selectedProject && (
                    <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-[#10566e]">
                          {selectedProject.name}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#e0f2f1] text-[#10566e]">
                            {selectedProject.category}
                          </span>
                          {selectedProject.isTrending && (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#fff3e0] text-[#e65100]">
                              Trending
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="font-medium text-[#1d858d] mb-1">Description</h3>
                          <p className="text-gray-700">{selectedProject.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#279692]" />
                            <span>3-5 members</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#279692]" />
                            <span>{getRecency(selectedProject.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#ffb74d] fill-[#ffb74d]" />
                            <span>Popularity: {selectedProject.popularity}/100</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-[#1d858d] mb-2">Skills Needed</h3>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(selectedProject.skills) && selectedProject.skills.map((skill: string) => (
                              <span key={skill} className="px-2 py-1 bg-[#e0f2f1] text-[#10566e] text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedProject(null)}
                            className="text-[#1d858d] border-[#1d858d] hover:bg-[#e0f2f1]"
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
                {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <Search className="mx-auto w-12 h-12 text-[#35a79b] mb-4" />
                    <h3 className="text-xl font-medium text-[#10566e]">No projects found</h3>
                    <p className="text-[#1b6d80] mt-2">Try adjusting your search or filters</p>
                </div>
                )}
            </div>
        </div>
        
    </div>
  );
};

export default ExploreProjectsPage;