import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Headphones, Clock, Calendar, Heart, Share2, ArrowRight, User } from 'lucide-react';
import { toast } from "sonner";
import {Podcast, fetchPodcasts} from "@/services/podcastsService"; 
import { link } from 'fs';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

// Liste des blogs
const blogPosts = [
  {
    id: 'blog1',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Anxiety',
    date: 'May 11, 2023',
    readTime: '5',
    title: 'Anxiety Management Techniques',
    excerpt: 'Discover practical strategies to manage anxiety in everyday situations, from breathing exercises to cognitive reframing techniques that can help reduce stress.',
    author: {
      name: 'Dr. Karim Moussaoui',
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  },
  {
    id: 'blog2',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Relationships',
    date: 'May 12, 2023',
    readTime: '6',
    title: 'Building Healthy Relationships',
    excerpt: 'Learn the foundations of healthy relationships, including effective communication, setting boundaries, and nurturing trust with partners, family and friends.',
    author: {
      name: 'Dr. Leila Tazi',
      image: 'https://randomuser.me/api/portraits/women/23.jpg'
    }
  },
  {
    id: 'blog3',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Sleep',
    date: 'May 13, 2023',
    readTime: '7',
    title: 'Sleep and Mental Health',
    excerpt: 'Explore the deep connection between sleep quality and mental wellbeing, with science-backed tips to improve your sleep hygiene and wake up refreshed.',
    author: {
      name: 'Dr. Youssef El Mansouri',
      image: 'https://randomuser.me/api/portraits/men/24.jpg'
    }
  },
  {
    id: 'blog4',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Meditation',
    date: 'May 14, 2023',
    readTime: '8',
    title: 'Meditation for Beginners',
    excerpt: 'Start your meditation journey with these accessible techniques designed for beginners. Learn how to quiet your mind even if you ve never meditated before.',
    author: {
      name: 'Dr. Nadia Chaoui',
      image: 'https://randomuser.me/api/portraits/women/25.jpg'
    }
  },
  {
    id: 'blog5',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Stress',
    date: 'March 11, 2025',
    readTime: '9',
    title: 'Stress Relief Strategies',
    excerpt: 'Incorporate these proven stress management techniques into your daily routine to reduce stress levels and improve your overall mental wellbeing.',
    author: {
      name: 'Dr. Omar Benjelloun',
      image: 'https://randomuser.me/api/portraits/men/26.jpg'
    }
  },
  {
    id: 'blog6',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Self-Care',
    date: 'May 16, 2023',
    readTime: '10',
    title: 'Self-Care Practices',
    excerpt: 'Discover how small, consistent self-care habits can lead to significant improvements in your mental health and overall quality of life.',
    author: {
      name: 'Dr. Fatima Zohra',
      image: 'https://randomuser.me/api/portraits/women/27.jpg'
    }
  }
];

// Liste des podcasts
const podcastEpisodes = [
  {
    id: 'podcast1',
    title: 'The Science of Happiness',
    episode: 11,
    duration: '28',
    progress: 35,
    currentTime: '9:45',
    host: 'Dr. Younes Belkadi'
  },
  {
    id: 'podcast2',
    title: 'Overcoming Depression',
    episode: 12,
    duration: '32',
    progress: 45,
    currentTime: '14:24',
    host: 'Dr. Samira El Fassi'
  },
  {
    id: 'podcast3',
    title: 'Mindfulness in Daily Life',
    episode: 13,
    duration: '35',
    progress: 55,
    currentTime: '19:15',
    host: 'Dr. Mehdi Ouazzani'
  },
  {
    id: 'podcast4',
    title: 'Emotional Intelligence',
    episode: 14,
    duration: '40',
    progress: 65,
    currentTime: '26:00',
    host: 'Dr. Zineb Amrani'
  },
  {
    id: 'podcast5',
    title: 'Anxiety in the Modern World',
    episode: 15,
    duration: '33',
    progress: 25,
    currentTime: '8:15',
    host: 'Dr. Hamid El Idrissi'
  },
  {
    id: 'podcast6',
    title: 'Sleep Science and Good Habits',
    episode: 16,
    duration: '38',
    progress: 15,
    currentTime: '5:42',
    host: 'Dr. Ibtissam Lahlou'
  }
];

// Post vedette (featured post)
const featuredPost = {
  id: 'featured',
  image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  title: 'Finding Peace in a Busy World: Mindfulness Techniques for Daily Life',
  excerpt: 'Discover simple yet powerful mindfulness practices that can help you stay centered, reduce anxiety, and find moments of calm even during your busiest days. Learn how to incorporate these techniques into your daily routine for better mental health.',
  author: {
    name: 'Dr. Amina Benali',
    image: 'https://randomuser.me/api/portraits/women/40.jpg',
    title: 'Clinical Psychologist'
  },
  date: 'May 15, 2023'
};

const BlogsPodcastsPage = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllPodcasts, setShowAllPodcasts] = useState(false);
  // State to track active tab
  const [activeTab, setActiveTab] = useState('blogs');
  
  // State to track liked posts
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  // Function to handle like button click
  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      toast.info("Removed from favorites");
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast.success("Added to favorites");
    }
  };

  // Function to handle share button click
  const handleShare = (title: string) => {
    toast.success(`Sharing "${title}" with your friends`);
  };

  // Function to handle read more button click
  const handleReadMore = (title: string) => {
    toast.info(`Opening "${title}"`);
  };

  // Function to handle play podcast button click
  const handlePlayPodcast = (title: string) => {
    toast.success(`Playing "${title}"`);
  };

  const formatDuration = (ms: number): string  => {;
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // Pad seconds with leading zero if needed
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  const [selectedBlog, setSelectedBlog] = useState<null | typeof blogPosts[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openBlogModal = (blog: typeof blogPosts[0]) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeBlogModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedBlog(null);
    }, 300); // Match this with your transition duration
  };

  useEffect(() => {
    const loadPodcasts = async () => {
      if (activeTab !== 'podcasts') return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchPodcasts();
        let response_array = data.items;
        console.log(response_array[0]);
        let resultat = response_array.map((item: any) => {
          let parsedTitle = item.track.name.split(' (Episode ');
          return {
            id: item.track.id,
            imageURL: item.track.album.images[0].url,
            title: parsedTitle[0],
            episode: parseInt(parsedTitle[1].split(')')[0]),
            duration: formatDuration(item.track.duration_ms), // Convert milliseconds to minutes
            progress: 0, // Placeholder for progress
            currentTime: '0:00', // Placeholder for current time
            host: item.track.artists[0].name,
            link: item.track.external_urls.spotify, // Spotify link
          };
        });
        setPodcasts(resultat);
        console.log(resultat);
      } catch (err) {
        setError('Erreur de chargement');
        toast.error('Impossible de charger les podcasts');
      } finally {
        setIsLoading(false);
      }
    };
  
    loadPodcasts();
  }, [activeTab]);

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
            <button 
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === 'blogs' 
                  ? 'bg-reviva-teal text-white' 
                  : 'text-reviva-charcoal dark:text-white hover:bg-reviva-mint/50'
              }`}
              onClick={() => setActiveTab('blogs')}
            >
              Blogs
            </button>
            <button 
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === 'podcasts' 
                  ? 'bg-reviva-teal text-white' 
                  : 'text-reviva-charcoal dark:text-white hover:bg-reviva-mint/50'
              }`}
              onClick={() => setActiveTab('podcasts')}
            >
              Podcasts
            </button>
          </div>
        </div>
        
        {activeTab === 'blogs' && (
          <>
            {/* Featured Post */}
            <div className="mb-16 animate-fade-in">
              <div className="bg-gradient-to-r from-reviva-mint/50 to-reviva-beige/50 dark:from-reviva-purple/30 dark:to-reviva-teal/30 rounded-2xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="lg:col-span-2">
                    <img 
                      src={featuredPost.image} 
                      alt="Woman sitting with laptop practicing mindfulness" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-reviva-teal/20 text-reviva-deep-teal text-sm font-medium px-3 py-1 rounded-full">
                        Featured
                      </span>
                      <span className="text-sm text-reviva-charcoal/60 dark:text-white/60 flex items-center gap-1">
                        <Calendar size={14} /> {featuredPost.date}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-reviva-purple dark:text-white mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-reviva-charcoal/80 dark:text-white/80 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <img 
                          src={featuredPost.author.image} 
                          alt="Author" 
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-reviva-charcoal dark:text-white">{featuredPost.author.name}</p>
                          <p className="text-sm text-reviva-charcoal/60 dark:text-white/60">{featuredPost.author.title}</p>
                        </div>
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <button 
                          className="p-2 rounded-full hover:bg-white/20 transition-colors"
                          onClick={() => handleLike(featuredPost.id)}
                          aria-label="Like this article"
                        >
                          <Heart 
                            size={20} 
                            className={likedPosts.includes(featuredPost.id) ? "text-red-500 fill-red-500" : "text-reviva-teal"} 
                          />
                        </button>
                        <button 
                          className="p-2 rounded-full hover:bg-white/20 transition-colors"
                          onClick={() => handleShare(featuredPost.title)}
                          aria-label="Share this article"
                        >
                          <Share2 size={20} className="text-reviva-teal" />
                        </button>
                        <button 
                          className="reviva-button ml-2"
                          onClick={() => handleReadMore(featuredPost.title)}
                        >
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
                <button 
                  className="text-reviva-teal hover:text-reviva-deep-teal dark:hover:text-reviva-mint transition-colors font-medium flex items-center gap-1"
                  onClick={() => toast.info("Viewing all articles")}
                >
                  View All <ArrowRight size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((blog) => (
                  <div key={blog.id} className="reviva-card bg-white dark:bg-reviva-purple/10 animate-scale-in">
                    <div className="relative mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover transition-transform hover:scale-105 duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-reviva-teal/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-reviva-charcoal/60 dark:text-white/60 mb-2">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime} min read</span>
                    </div>
                    <h3 className="text-xl font-bold text-reviva-purple dark:text-white mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-reviva-mint/30 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <img 
                          src={blog.author.image}
                          alt={blog.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-reviva-charcoal dark:text-white">{blog.author.name}</span>
                      </div>
                      <button 
                          className="text-reviva-teal hover:text-reviva-deep-teal transition-colors font-medium text-sm"
                          onClick={() => openBlogModal(blog)}
                        >
                          Read More
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'podcasts' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-reviva-purple dark:text-white">
              {isLoading ? 'Chargement...' : 'Popular Podcasts'}
              </h2>
              <button 
                className="text-reviva-teal hover:text-reviva-deep-teal dark:hover:text-reviva-mint transition-colors font-medium flex items-center gap-1"
                onClick={() => {
                  setShowAllPodcasts(true);
                  toast.info("Showing all podcasts");
                }}
                disabled={isLoading}>
                View All <ArrowRight size={16} />
              </button>
            </div>

            {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-300">
              {error}
              <button 
                onClick={() => {
                  setError(null);
                  setPodcasts([]);
                }} 
                className="ml-4 text-sm reviva-button"
              >
                Réessayer
              </button>
            </div>
          )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
        // Squelettes de chargement
        Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex gap-4 p-4 bg-white dark:bg-reviva-purple/10 rounded-xl animate-pulse">
            <div className="shrink-0 w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="pt-4">
                <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        // Affichage des podcasts
        (showAllPodcasts ? podcasts : podcasts.slice(0, 6)).map((podcast) => (
          <div key={podcast.id} className="flex gap-4 p-4 bg-white dark:bg-reviva-purple/10 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in">
            {/* Contenu existant inchangé */}
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-reviva-mint to-reviva-teal flex items-center justify-center">
                {/* <Headphones size={36} className="text-white" /> */}
                <img 
                  src={podcast.imageURL} 
                  alt={podcast.title} 
                  className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-reviva-charcoal/60 dark:text-white/60 mb-1">
                      <span>Episode {podcast.episode}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {podcast.duration} min</span>
                    </div>
                    <h3 className="text-lg font-bold text-reviva-purple dark:text-white mb-1">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-3">
                      Host {podcast.host} discusses practical strategies for improving mental health with guest experts.
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <button 
                        className="bg-reviva-teal text-white p-2 rounded-full hover:bg-reviva-deep-teal transition-colors"
                        onClick={() => handlePlayPodcast(podcast.title)}
                        aria-label="Play podcast"
                      >
                        <a href={podcast.link} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </a>
                      </button>
                      <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full flex-1">
                        <div 
                          className="h-1 bg-reviva-teal rounded-full" 
                          style={{ width: `${podcast.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-reviva-charcoal/60 dark:text-white/60">{podcast.currentTime}</span>
                    </div>
                  </div>
                </div>
              )))}
            </div>
            {/* Bouton "Show Less" conditionnel */}
            {!isLoading && podcasts.length > 6 && showAllPodcasts && (
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setShowAllPodcasts(false)}
                  className="reviva-button"
                >
                  Show Less
                </button>
              </div>
            )}
              </div>
        )}

            {/* Blog Detail Modal */}
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeBlogModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-reviva-purple/90 text-left align-middle shadow-xl transition-all">
                    {selectedBlog && (
                      <div className="relative">
                        {/* Close Button */}
                        <button
                          onClick={closeBlogModal}
                          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-reviva-charcoal/80 hover:bg-gray-100 dark:hover:bg-reviva-charcoal transition-colors"
                          aria-label="Close"
                        >
                          <X className="text-reviva-charcoal dark:text-white" />
                        </button>

                        {/* Hero Image */}
                        <div className="h-64 md:h-80 w-full relative overflow-hidden">
                          <img
                            src={selectedBlog.image}
                            alt={selectedBlog.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-reviva-teal text-white text-xs font-medium px-2 py-1 rounded-full">
                                {selectedBlog.category}
                              </span>
                              <span className="text-sm flex items-center gap-1">
                                <Calendar size={14} /> {selectedBlog.date}
                              </span>
                            </div>
                            <Dialog.Title
                              as="h3"
                              className="text-2xl md:text-3xl font-bold mb-2"
                            >
                              {selectedBlog.title}
                            </Dialog.Title>
                            <div className="flex items-center gap-2">
                              <img
                                src={selectedBlog.author.image}
                                alt={selectedBlog.author.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="text-sm font-medium">
                                {selectedBlog.author.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 md:p-8">
                          <div className="prose dark:prose-invert max-w-none">
                            <p className="text-lg mb-4">{selectedBlog.excerpt}</p>
                            
                            {/* Expanded content */}
                            <div className="space-y-4">
                              <p>In this comprehensive guide, we explore practical techniques to help you manage daily stressors and improve your mental wellbeing. These methods have been clinically proven to reduce anxiety and promote relaxation.</p>
                              
                              <h3 className="text-xl font-bold text-reviva-purple dark:text-reviva-mint mt-6 mb-3">
                                Understanding {selectedBlog.category}
                              </h3>
                              <p>Before diving into solutions, it's important to understand what {selectedBlog.category.toLowerCase()} really is and how it affects both mind and body.</p>
                              
                              <h3 className="text-xl font-bold text-reviva-purple dark:text-reviva-mint mt-6 mb-3">
                                Practical Techniques
                              </h3>
                              <ul className="list-disc pl-5 space-y-2">
                                <li>Deep breathing exercises to calm the nervous system</li>
                                <li>Cognitive behavioral techniques to reframe negative thoughts</li>
                                <li>Mindfulness practices to stay present</li>
                                <li>Physical exercises that reduce stress hormones</li>
                                <li>Dietary adjustments that support mental health</li>
                              </ul>
                              
                              <h3 className="text-xl font-bold text-reviva-purple dark:text-reviva-mint mt-6 mb-3">
                                Case Study
                              </h3>
                              <p>Sarah, a 32-year-old marketing executive, struggled with {selectedBlog.category.toLowerCase()} for years before implementing these techniques. Within 8 weeks, she reported a 60% reduction in symptoms.</p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-8 flex items-center justify-between border-t border-reviva-mint/30 dark:border-white/10 pt-6">
                            <div className="flex items-center gap-3">
                              <button
                                className={`p-2 rounded-full hover:bg-reviva-mint/20 transition-colors flex items-center gap-1 ${
                                  likedPosts.includes(selectedBlog.id)
                                    ? 'text-red-500'
                                    : 'text-reviva-charcoal dark:text-white'
                                }`}
                                onClick={() => {
                                  handleLike(selectedBlog.id);
                                  toast.success(
                                    likedPosts.includes(selectedBlog.id)
                                      ? "Removed from favorites"
                                      : "Added to favorites"
                                  );
                                }}
                              >
                                <Heart
                                  size={20}
                                  className={
                                    likedPosts.includes(selectedBlog.id)
                                      ? 'fill-current'
                                      : ''
                                  }
                                />
                                <span className="text-sm">Save</span>
                              </button>
                              <button
                                className="p-2 rounded-full hover:bg-reviva-mint/20 transition-colors flex items-center gap-1 text-reviva-charcoal dark:text-white"
                                onClick={() => {
                                  handleShare(selectedBlog.title);
                                  toast.success(`Sharing "${selectedBlog.title}"`);
                                }}
                              >
                                <Share2 size={20} />
                                <span className="text-sm">Share</span>
                              </button>
                            </div>
                            <button
                              className="reviva-button"
                              onClick={() => {
                                // This would link to the full article page in a real implementation
                                toast.info(`Opening full article: ${selectedBlog.title}`);
                                closeBlogModal();
                              }}
                            >
                              Continue Reading
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>

      <Footer />
    </div>
  );
};

export default BlogsPodcastsPage;