import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Users, BookOpen, Lightbulb, Heart, Search, Plus, TrendingUp, Calendar, MapPin, Clock } from "lucide-react";

const Community = () => {
  const discussions = [
    {
      id: 1,
      title: "Comment gérer le stress pendant un hackathon ?",
      author: "Marie L.",
      replies: 12,
      category: "Bien-être",
      time: "il y a 2h",
      isHot: true
    },
    {
      id: 2,
      title: "Recherche mentor en développement web",
      author: "Thomas K.",
      replies: 5,
      category: "Mentorat",
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
      category: "Ressources",
      time: "il y a 1j",
      isHot: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Atelier de Design Thinking",
      date: "15 Mars 2023",
      time: "14h - 17h",
      location: "Espace Innovation, Paris",
      category: "Atelier",
      participants: 24
    },
    {
      id: 2,
      title: "Hackathon Annuel",
      date: "22-24 Avril 2023",
      time: "9h - 19h",
      location: "Centre de Conférences, Lyon",
      category: "Compétition",
      participants: 120
    },
    {
      id: 3,
      title: "Conférence sur l'IA Générative",
      date: "5 Mai 2023",
      time: "18h - 20h",
      location: "En ligne",
      category: "Conférence",
      participants: 85
    }
  ];

  const resources = [
    {
      title: "Guide du bien-être en innovation",
      type: "PDF",
      downloads: 1250,
      category: "Bien-être"
    },
    {
      title: "Techniques de brainstorming créatif",
      type: "Vidéo",
      downloads: 890,
      category: "Créativité"
    },
    {
      title: "Template de pitch deck",
      type: "Template",
      downloads: 2100,
      category: "Business"
    },
    {
      title: "Checklist pré-hackathon",
      type: "Liste",
      downloads: 650,
      category: "Préparation"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Bien-être": return "bg-green-100 text-green-800";
      case "Mentorat": return "bg-blue-100 text-blue-800";
      case "Expérience": return "bg-purple-100 text-purple-800";
      case "Ressources": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">Communauté </span>
              <span className="bg-gradient-to-r from-[#35a79b] to-[#279692] bg-clip-text text-transparent">
                Interactive
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Échangez, apprenez et grandissez ensemble dans notre communauté bienveillante d'innovateurs
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#35a79b] mb-2">2,847</div>
              <div className="text-gray-600">Membres actifs</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#35a79b] mb-2">156</div>
              <div className="text-gray-600">Discussions aujourd'hui</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#35a79b] mb-2">43</div>
              <div className="text-gray-600">Mentors disponibles</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#35a79b] mb-2">1,250</div>
              <div className="text-gray-600">Ressources partagées</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* New Post Section */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Partager avec la communauté</h3>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Posez une question, partagez votre expérience ou demandez des conseils..."
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Question
                      </Button>
                      <Button variant="outline" size="sm">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Idée
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        Expérience
                      </Button>
                    </div>
                    <Button className="bg-[#35a79b] hover:bg-[#279692] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Publier
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Discussions */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Discussions récentes</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Populaires
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Rechercher
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {discussions.map((discussion) => (
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
                            <span>Par {discussion.author}</span>
                            <span>{discussion.time}</span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {discussion.replies} réponses
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
                  <Button variant="outline" className="border-[#35a79b] text-[#35a79b] hover:bg-[#35a79b] hover:text-white">
                    Voir toutes les discussions
                  </Button>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Événements à Venir - Nouvelle Section */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#35a79b]" />
                  Événements à Venir
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
                          event.category === "Atelier" ? "bg-blue-100 text-blue-800" :
                          event.category === "Compétition" ? "bg-purple-100 text-purple-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {event.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-500">
                          {event.participants} participants inscrits
                        </span>
                        <Button size="sm" className="bg-[#35a79b] hover:bg-[#279692] text-white">
                          S'inscrire
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <a href = "/sol/Marathon">
                  <Button variant="outline" className="w-full mt-4 border-[#35a79b] text-[#35a79b] hover:bg-[#35a79b] hover:text-white">
                    Voir tous les événements
                  </Button>
                </a>
              </Card>

              {/* Resources Section */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-[#35a79b]" />
                  Ressources Populaires
                </h3>
                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">{resource.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.downloads} téléchargements</span>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {resource.category}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-[#35a79b] text-[#35a79b] hover:bg-[#35a79b] hover:text-white">
                  Explorer toutes les ressources
                </Button>
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