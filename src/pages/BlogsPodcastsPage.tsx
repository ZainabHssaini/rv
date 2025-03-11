
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Headphones, Clock, Calendar, Heart, Share2 } from 'lucide-react';

const BlogsPodcastsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-reviva-purple mb-4">
            Mental Wellness <span className="text-reviva-teal">Blogs & Podcasts</span>
          </h1>
          <p className="text-lg text-reviva-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
            Discover insightful articles and soothing podcasts to support your mental health journey
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-reviva-mint/30 p-1">
            <button className="px-6 py-2 rounded-full bg-reviva-teal text-white font-medium">
              Blogs
            </button>
            <button className="px-6 py-2 rounded-full text-reviva-charcoal dark:text-white font-medium">
              Podcasts
            </button>
          </div>
        </div>
        
        {/* Featured Post */}
        <div className="mb-16 animate-fade-in">
          <div className="bg-gradient-to-r from-reviva-mint/50 to-reviva-beige/50 dark:from-reviva-purple/30 dark:to-reviva-teal/30 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1569161031678-f19b1752f2d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Featured blog" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="lg:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-reviva-teal/20 text-reviva-deep-teal text-sm font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="text-sm text-reviva-charcoal/60 dark:text-white/60 flex items-center gap-1">
                    <Calendar size={14} /> May 15, 2023
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-reviva-purple dark:text-white mb-4">
                  Finding Peace in a Busy World: Mindfulness Techniques for Daily Life
                </h2>
                <p className="text-reviva-charcoal/80 dark:text-white/80 mb-6">
                  Discover simple yet powerful mindfulness practices that can help you stay centered, 
                  reduce anxiety, and find moments of calm even during your busiest days. Learn how 
                  to incorporate these techniques into your daily routine for better mental health.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" 
                      alt="Author" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-reviva-charcoal dark:text-white">Dr. Sarah Johnson</p>
                      <p className="text-sm text-reviva-charcoal/60 dark:text-white/60">Clinical Psychologist</p>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                      <Heart size={20} className="text-reviva-teal" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                      <Share2 size={20} className="text-reviva-teal" />
                    </button>
                    <button className="reviva-button ml-2">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Grid */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-reviva-purple dark:text-white">Recent Articles</h2>
            <button className="text-reviva-teal hover:text-reviva-deep-teal dark:hover:text-reviva-mint transition-colors font-medium flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="reviva-card bg-white dark:bg-reviva-purple/10 animate-scale-in" style={{ animationDelay: `${(item - 1) * 0.1}s` }}>
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${1570000000000 + item * 100}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
                    alt={`Blog post ${item}`}
                    className="w-full h-48 object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-reviva-teal/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Mental Health
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-reviva-charcoal/60 dark:text-white/60 mb-2">
                  <span className="flex items-center gap-1"><Calendar size={14} /> May {10 + item}, 2023</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {4 + item} min read</span>
                </div>
                <h3 className="text-xl font-bold text-reviva-purple dark:text-white mb-2">
                  {["Anxiety Management Techniques", "Building Healthy Relationships", "Sleep and Mental Health", "Meditation for Beginners", "Stress Relief Strategies", "Self-Care Practices"][item - 1]}
                </h3>
                <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam, felis non euismod commodo, arcu magna faucibus justo...
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-reviva-mint/30 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${20 + item}.jpg`}
                      alt="Author"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-reviva-charcoal dark:text-white">Dr. Alex Brown</span>
                  </div>
                  <button className="text-reviva-teal hover:text-reviva-deep-teal transition-colors font-medium text-sm">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Podcasts Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-reviva-purple dark:text-white">Popular Podcasts</h2>
            <button className="text-reviva-teal hover:text-reviva-deep-teal dark:hover:text-reviva-mint transition-colors font-medium flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-4 p-4 bg-white dark:bg-reviva-purple/10 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${(item - 1) * 0.1}s` }}>
                <div className="shrink-0">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-reviva-mint to-reviva-teal flex items-center justify-center">
                    <Headphones size={36} className="text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-reviva-charcoal/60 dark:text-white/60 mb-1">
                    <span>Episode {10 + item}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {25 + item * 5} min</span>
                  </div>
                  <h3 className="text-lg font-bold text-reviva-purple dark:text-white mb-1">
                    {["The Science of Happiness", "Overcoming Depression", "Mindfulness in Daily Life", "Emotional Intelligence"][item - 1]}
                  </h3>
                  <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-3">
                    Host Dr. Emily Chen discusses practical strategies for improving mental health with guest experts.
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <button className="bg-reviva-teal text-white p-2 rounded-full hover:bg-reviva-deep-teal transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full flex-1">
                      <div className="h-1 bg-reviva-teal rounded-full" style={{ width: `${30 + item * 10}%` }}></div>
                    </div>
                    <span className="text-xs text-reviva-charcoal/60 dark:text-white/60">{item * 7}:45</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogsPodcastsPage;
