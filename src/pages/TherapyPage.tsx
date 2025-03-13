import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Video, MessageSquare, CheckCircle, Star, Users } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/components/Modal';

const TherapyPage = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');
  const [modalOpen, setModalOpen] = useState(false);
  
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
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12 bg-gradient-to-b from-reviva-mint/20 to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <div className="flex justify-center mb-8">
                <div className="p-1 bg-reviva-mint/20 dark:bg-reviva-charcoal rounded-lg">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('individual')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === 'individual' ? 'bg-reviva-teal text-white' : 'hover:bg-reviva-mint/30 dark:hover:bg-reviva-teal/10'
                      }`}
                    >
                      Individual Therapy
                    </button>
                    <button
                      onClick={() => setActiveTab('group')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === 'group' ? 'bg-reviva-teal text-white' : 'hover:bg-reviva-mint/30 dark:hover:bg-reviva-teal/10'
                      }`}
                    >
                      Support Groups
                    </button>
                  </div>
                </div>
              </div>
              
              {activeTab === 'group' && (
                <div id="support-groups" className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-reviva-purple mb-6 text-center">Support Groups</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {supportGroups.map((group) => (
                      <div key={group.id} className="glass-card dark:glass-card-dark rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in">
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-reviva-deep-teal mb-2">{group.title}</h3>
                          <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-4">{group.description}</p>
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-1">Topics:</div>
                            <div className="flex flex-wrap gap-1">
                              {group.topics.map((topic, idx) => (
                                <span key={idx} className="text-xs bg-reviva-mint/30 text-reviva-deep-teal dark:bg-reviva-teal/10 dark:text-reviva-mint px-2 py-0.5 rounded-full">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button 
                            className="w-full px-4 py-2 bg-reviva-teal text-white rounded-lg font-medium mt-2"
                            onClick={() => setModalOpen(true)}
                          >
                            Join Group
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3 className="text-xl font-bold mb-4">No Available Groups</h3>
          <p className="text-reviva-charcoal/80 dark:text-white/80">Unfortunately, there are no available support groups at the moment. Please check back later.</p>
          <button onClick={() => setModalOpen(false)} className="mt-4 px-4 py-2 bg-reviva-teal text-white rounded-lg font-medium">
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default TherapyPage;
