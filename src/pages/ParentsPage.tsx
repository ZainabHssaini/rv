import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Users, Calendar, BookOpen, Play, Download } from 'lucide-react';
import QuizComponent from '@/components/QuizComponent';
import CardPsychologistComponent from '@/components/CardPsychologistComponent';
import BookingComponent from '@/components/BookingComponent';
import TextTranslateComponent from '@/components/TextTranslateComponent';
import AudioPlayerComponent from '@/components/AudioPlayerComponent';

const ParentsPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const psychologists = [
    {
      id: 1,
      name: "Dr. Amina Benali",
      specialty: "Adolescent Psychology",
      image: "https://randomuser.me/api/portraits/women/40.jpg",
      rating: 4.9,
      reviews: 156,
      price: 150,
      languages: ["English", "Darija", "French"]
    },
    {
      id: 2,
      name: "Dr. Karim Moussaoui",
      specialty: "Family Therapy",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4.8,
      reviews: 142,
      price: 180,
      languages: ["English", "Darija"]
    },
    {
      id: 3,
      name: "Dr. Leila Tazi",
      specialty: "Parent-Child Communication",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      rating: 4.9,
      reviews: 189,
      price: 160,
      languages: ["English", "Darija", "Berber"]
    }
  ];

  const resources = [
    {
      id: 1,
      title: "How to talk to your teenager",
      titleAr: "كيفاش نهضر مع ولدي المراهق",
      type: "Article",
      duration: "5 min",
      downloadUrl: "/pdfs/parler-ado.pdf"
    },
    {
      id: 2,
      title: "When should you see a psychologist?",
      titleAr: "إمتى نمشي للطبيب النفسي؟",
      type: "Video",
      duration: "12 min",
      downloadUrl: "/pdfs/consulter-psy.pdf"
    },
    {
      id: 3,
      title: "Managing teenage crises",
      titleAr: "كيفاش نتعامل مع نوبات المراهقة",
      type: "Guide",
      duration: "8 min",
      downloadUrl: "/pdfs/crises-ado.pdf"
    }
  ];

  const handleBooking = (psychologist) => {
    setSelectedPsychologist(psychologist);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-reviva-mint/30 dark:bg-reviva-teal/30 rounded-full mb-6">
              <Heart className="h-8 w-8 text-reviva-teal dark:text-reviva-mint" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-reviva-purple mb-6">
              Reviva – <span className="text-reviva-teal">Parents Space</span>
            </h1>
            
            <TextTranslateComponent 
              frenchText="Does your teenager seem distant, sad, misunderstood? You don't know how to help them? We are here to support you."
              darijaText="ولدك ولا بنتك ولى ساكت/ة بزاف؟ كتحس ما بقيتيش كتفهمو؟ راك ماشي بوحدك."
            />
            
            <div className="mt-8">
              <AudioPlayerComponent 
                audioText="ولدك ولا بنتك ولى ساكت/ة بزاف؟ كتحس ما بقيتيش كتفهمو؟ راك ماشي بوحدك."
                label="Listen to the message in Darija"
              />
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-reviva-purple mb-4">
                Do you recognize yourself?
              </h2>
              <p className="text-lg text-reviva-charcoal/80 dark:text-white/80">
                Answer this short quiz to better understand your situation
              </p>
            </div>
            
            {!showQuiz ? (
              <div className="text-center">
                <button 
                  onClick={() => setShowQuiz(true)}
                  className="reviva-button inline-flex items-center gap-2"
                >
                  <Users className="h-5 w-5" />
                  Start the quiz
                </button>
              </div>
            ) : (
              <QuizComponent 
                onComplete={(needsHelp) => {
                  setQuizCompleted(true);
                  if (needsHelp) {
                    document.getElementById('psychologists')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            )}
          </div>
        </section>

        {/* Psychologists Section */}
        <section id="psychologists" className="container mx-auto px-4 md:px-6 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-reviva-purple mb-4">
              Our Specialized Psychologists
            </h2>
            <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
              Qualified professionals to support you in your relationship with your teenager
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {psychologists.map((psychologist) => (
              <CardPsychologistComponent 
                key={psychologist.id}
                psychologist={psychologist}
                onBook={() => handleBooking(psychologist)}
              />
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-reviva-purple mb-4">
              Resources for Parents
            </h2>
            <p className="text-lg text-reviva-charcoal/80 dark:text-white/80">
              Articles and practical guides to better understand your teenager
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="reviva-card bg-white dark:bg-reviva-purple/10 animate-scale-in">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-reviva-mint/30 rounded-lg">
                    {resource.type === 'Video' ? <Play className="h-5 w-5 text-reviva-teal" /> : <BookOpen className="h-5 w-5 text-reviva-teal" />}
                  </div>
                  <span className="text-xs bg-reviva-beige/50 text-reviva-deep-teal px-2 py-1 rounded-full">
                    {resource.duration}
                  </span>
                </div>
                
                <TextTranslateComponent 
                  frenchText={resource.title}
                  darijaText={resource.titleAr}
                  showToggle={true}
                />
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-reviva-mint/30">
                  <span className="text-sm text-reviva-charcoal/60 dark:text-white/60">
                    {resource.type}
                  </span>
                  <a 
                    href={resource.downloadUrl}
                    download
                    className="text-reviva-teal hover:text-reviva-deep-teal transition-colors flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {showBooking && selectedPsychologist && (
        <BookingComponent 
          psychologist={selectedPsychologist}
          onClose={() => {
            setShowBooking(false);
            setSelectedPsychologist(null);
          }}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default ParentsPage;
