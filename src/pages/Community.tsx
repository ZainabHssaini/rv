import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { RegisterPopup } from "@/components/RegisterPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Users, BookOpen, Lightbulb, Heart, Search, Plus, TrendingUp, Calendar, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook


const Community = () => {

  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get user data from localStorage

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewAll, setViewAll] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const { toast } = useToast(); // Initialize the toast function
  const [newPostCategory, setNewPostCategory] = useState("Question"); // Valeur par défaut
  const [discussions, setDiscussions] = useState<any[]>([
  {
    id: 1,
      title: "Comment gérer le stress pendant un hackathon ?",
      author: "Marie L.",
      replies: 12,
      category: "Question",
      time: "il y a 2h",
      isHot: true
    },
    {
      id: 2,
      title: "Recherche mentor en développement web",
      author: "Thomas K.",
      replies: 5,
      category: "Question",
      time: "il y a 4h",
      isHot: false
    },
    {
      id: 3,
      title: "Partage d'expérience : Mon premier ideathon",
      author: "Sarah M.",
      replies: 18,
      category: "Expérience",
      time: "il y a 6h",
      isHot: true
    },
    {
      id: 4,
      title: "Outils recommandés pour la gestion de projet",
      author: "Alex P.",
      replies: 25,
      category: "Idée",
      time: "il y a 1j",
      isHot: false
  }
]);

const postToFirebase = async (newPost: any) => {
  await addDoc(collection(db, "discussions"), newPost);
};


  const handlePostSubmit = async () => {
    if (!newPostText.trim()) {
      toast({
        title: "Post cannot be empty",
        description: "Please enter some text before submitting.",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      id: Date.now(), // ou laisse Firebase générer l'id
      title: newPostText,
      author: user.firstname + user.lastname || "Unknown", // à remplacer par user réel si dispo
      replies: 0,
      category: newPostCategory,
      time: "Just now",
      isHot: false,
    };

    try {
      await postToFirebase(newPost);
      setDiscussions((prev) => [...prev, newPost]);
      console.log("Post submitted");
      toast({
        title: "Post submitted",
        description: "Your post has been successfully added to the community.",
      });
      setNewPostText(""); // Réinitialiser le champ de texte
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  participants: number;
}
  const upcomingEvents= [
    {
      id: 1,
      title: "Design Thinking Workshop",
      date: "March 15, 2023",
      time: "2PM - 5PM",
      location: "Innovation Space, Paris",
      category: "Workshop",
      participants: 24
    },
    {
      id: 2,
      title: "Annual Hackathon",
      date: "April 22-24, 2023",
      time: "9AM - 7PM",
      location: "Conference Center, Lyon",
      category: "Competition",
      participants: 120
    },
    {
      id: 3,
      title: "Generative AI Conference",
      date: "May 5, 2023",
      time: "6PM - 8PM",
      location: "Online",
      category: "Conference",
      participants: 85
    }
  ];

  const resources = [
    {
      title: "Innovation Wellness Guide",
      type: "PDF",
      downloads: 1250,
      category: "Wellness",
      fileUrl: "/pdfs/PHAB_InnovationGuide_web.pdf"
    },
    {
      title: "Creative Brainstorming Techniques",
      type: "Video",
      downloads: 890,
      category: "Creativity",
      fileUrl: "https://www.youtube.com/watch?v=FkvCBUvH6Zc"
    },
    {
      title: "Pitch Deck Template",
      type: "Template",
      downloads: 2100,
      category: "Business",
      fileUrl: "https://pitch.com/templates/collections/Pitch-deck"
    },
    {
      title: "Pre-Hackathon Checklist",
      type: "Checklist",
      downloads: 650,
      category: "Preparation",
      fileUrl: "https://docs.scs.community/community/hackathons/checklist/"
    }
  ];

  

  const handleRegisterClick = (e: React.MouseEvent, event: Event) => {
      e.preventDefault();
      setSelectedEvent(event);
      setShowPopup(true);
    };
  
    const handlePopupClose = () => {
      setShowPopup(false);
      setSelectedEvent(null);
    };

    

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Question": return "bg-blue-100 text-blue-800";
      case "Idée": return "bg-yellow-100 text-yellow-800";
      case "Expérience": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const downloadResource = (fileUrl: string, fileName: string) => {
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName || 'download.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

useEffect(() => {
  const fetchDiscussions = async () => {
    const snapshot = await getDocs(collection(db, "discussions"));
    const firebasePosts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setDiscussions((prevDiscussions) => {
      // Extraire les ids existants
      const existingIds = new Set(prevDiscussions.map(d => d.id));

      // Filtrer les posts Firestore pour ne garder que ceux pas dans prevDiscussions
      const newUniquePosts = firebasePosts.filter(post => !existingIds.has(post.id));

      // Retourner la concaténation (mockées + posts Firestore non dupliqués)
      return [...prevDiscussions, ...newUniquePosts];
    });
  };

  fetchDiscussions();
}, []);




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">Interactive </span>
              <span className="bg-gradient-to-r from-[#35a79b] to-[#279692] bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Exchange, learn and grow together in our welcoming community of innovators
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#35a79b] mb-2">2,847</div>
              <div className="text-gray-600">Active members</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#35a79b] mb-2">156</div>
              <div className="text-gray-600">Discussions today</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#35a79b] mb-2">43</div>
              <div className="text-gray-600">Available mentors</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#35a79b] mb-2">1,250</div>
              <div className="text-gray-600">Shared resources</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* New Post Section */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Share with the community</h3>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Ask a question, share your experience or seek advice..."
                    className="min-h-[100px]"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {["Question", "Idea", "Experience"].map((cat) => (
                        <Button
                          key={cat}
                          variant={newPostCategory === cat ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNewPostCategory(cat)}
                        >
                          {cat === "Question" && <MessageCircle className="w-4 h-4 mr-2" />}
                          {cat === "Idea" && <Lightbulb className="w-4 h-4 mr-2" />}
                          {cat === "Experience" && <Heart className="w-4 h-4 mr-2" />}
                          {cat}
                        </Button>
                      ))}
                    </div>
                    <Button className="bg-[#35a79b] hover:bg-[#279692] text-white"
                      onClick={() => handlePostSubmit()}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Discussions */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Recent Discussions</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Popular
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {(viewAll ? discussions : discussions.slice(0, 4)).map((discussion) => (

                    <div key={discussion.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-800 hover:text-[#35a79b] cursor-pointer">
                              {discussion.title}
                            </h4>
                            {discussion.isHot && (
                              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">🔥 Hot</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>By {discussion.author}</span>
                            <span>{discussion.time}</span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {discussion.replies} replies
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                          {discussion.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button variant="outline" className="border-[#35a79b] text-[#35a79b] hover:bg-[#35a79b] hover:text-white"
                  onClick={() => setViewAll(true)}>
                    View all discussions
                  </Button>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events Section */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#35a79b]" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          event.category === "Workshop" ? "bg-blue-100 text-blue-800" :
                          event.category === "Competition" ? "bg-purple-100 text-purple-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {event.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-500">
                          {event.participants} registered participants
                        </span>
                        <Button size="sm" className="bg-[#35a79b] hover:bg-[#279692] text-white"
                        onClick={(e) => handleRegisterClick(e, event)}
                        >
                          Register
                        </Button>
                        
                      </div>
                    </div>
                  ))}
                </div>
                <a href="/sol/Marathon">
                  <Button variant="outline" className="w-full mt-4 border-[#35a79b] text-[#35a79b] hover:bg-[#35a79b] hover:text-white">
                    View all events
                  </Button>
                </a>
              </Card>
              {/* Register Popup - placed outside the main content */}
              {showPopup && selectedEvent && (
                <RegisterPopup 
                  event={selectedEvent}
                  onClose={handlePopupClose} 
                />
              )}

              {/* Resources Section */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-[#35a79b]" />
                  Popular Resources
                </h3>
                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => downloadResource(resource.fileUrl, resource.title)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">{resource.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.downloads} downloads</span>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {resource.category}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Community;