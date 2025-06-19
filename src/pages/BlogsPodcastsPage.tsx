import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Headphones, Clock, Calendar, Heart, Share2, ArrowRight, User, X } from 'lucide-react';
import { toast } from "sonner";
import {Podcast, fetchPodcasts} from "@/services/podcastsService"; 

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Liste des blogs (avec articles en français, arabe et dialecte marocain)
const blogPosts = [
  {
    id: 'blog1',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Anxiety',
    date: 'May 11, 2023',
    readTime: '5',
    title: 'Anxiety Management Techniques',
    excerpt: 'Discover practical strategies to manage anxiety in everyday situations, from breathing exercises to cognitive reframing techniques that can help reduce stress.',
    content: `
      <h2 class="text-xl font-bold mb-3">Understanding Anxiety</h2>
      <p class="mb-4">Anxiety is a natural response to stress but can become overwhelming. These techniques can help you regain control.</p>
      
      <h3 class="text-lg font-semibold mb-2">Breathing Exercises</h3>
      <p class="mb-4">The 4-7-8 technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 5 times.</p>
      
      <h3 class="text-lg font-semibold mb-2">Cognitive Reframing</h3>
      <p class="mb-4">Challenge negative thoughts by examining evidence for and against them. Ask yourself: "Is this thought realistic?"</p>
      
      <h3 class="text-lg font-semibold mb-2">Grounding Techniques</h3>
      <p class="mb-4">Use the 5-4-3-2-1 method: Name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, 1 thing you taste.</p>
    `,
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
    content: `
      <h2 class="text-xl font-bold mb-3">Communication is Key</h2>
      <p class="mb-4">Active listening and expressing needs clearly are essential for healthy relationships.</p>
      
      <h3 class="text-lg font-semibold mb-2">Active Listening</h3>
      <p class="mb-4">Practice reflective listening by paraphrasing what your partner says: "What I hear you saying is..."</p>
      
      <h3 class="text-lg font-semibold mb-2">Setting Boundaries</h3>
      <p class="mb-4">Clearly communicate your limits using "I" statements: "I feel... when... because..."</p>
    `,
    author: {
      name: 'Dr. Leila Tazi',
      image: 'https://randomuser.me/api/portraits/women/23.jpg'
    }
  },
  // Article en arabe
  {
    id: 'blog-ar1',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'الصحة النفسية',
    date: 'يونيو 1, 2023',
    readTime: '7',
    title: 'إدارة التوتر في الحياة اليومية',
    excerpt: 'اكتشف طرقًا عملية للتعامل مع التوتر في حياتك اليومية باستخدام تقنيات بسيطة وفعالة.',
    content: `
      <h2 class="text-xl font-bold mb-3">فهم التوتر</h2>
      <p class="mb-4">التوتر هو رد فعل طبيعي ولكن يمكن أن يصبح ساحقًا. هذه التقنيات يمكن أن تساعدك على استعادة السيطرة.</p>
      
      <h3 class="text-lg font-semibold mb-2">تمارين التنفس</h3>
      <p class="mb-4">تقنية 4-7-8: شهيق لمدة 4 ثوانٍ، حبس النفس لمدة 7 ثوانٍ، زفير لمدة 8 ثوانٍ. كرر 5 مرات.</p>
      
      <h3 class="text-lg font-semibold mb-2">التأمل</h3>
      <p class="mb-4">خصص 10 دقائق يوميًا للجلوس في مكان هادئ والتركيز على تنفسك.</p>
    `,
    author: {
      name: 'د. أمينة العلوي',
      image: 'https://randomuser.me/api/portraits/women/40.jpg'
    },
    isArabic: true
  },
  // Article en dialecte marocain
  {
    id: 'blog-dz1',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'الصحة د العقل',
    date: 'يونيو 5, 2023',
    readTime: '8',
    title: 'كيفاش نتعاملو معا الضغط ديال الحياة',
    excerpt: 'بزاف د الناس كيعانوا من الضغط ديال الحياة اليومية. هاد المقال غادي يعطيك نصائح عملية.',
    content: `
      <h2 class="text-xl font-bold mb-3">الضغط ديال الحياة</h2>
      <p class="mb-4">الضغط هو شيء طبيعي ولكن كيقد يولي مزعج. هاد النصائح غادي تساعدك.</p>
      
      <h3 class="text-lg font-semibold mb-2">التنفس</h3>
      <p class="mb-4">تقنية 4-7-8: تشد النفس 4 دقايق، تحبسو 7 دقايق، تزفر 8 دقايق. كررها 5 مرات.</p>
      
      <h3 class="text-lg font-semibold mb-2">المشي</h3>
      <p class="mb-4">30 دقيقة ديال المشي كل يوم كاتساعد على تخفيف الضغط.</p>
    `,
    author: {
      name: 'د. يوسف المراكشي',
      image: 'https://randomuser.me/api/portraits/men/30.jpg'
    },
    isArabic: true,
    isDialect: true
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
  }
];

// Post vedette
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
  const [activeTab, setActiveTab] = useState('blogs');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<null | typeof blogPosts[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [currentSharedItem, setCurrentSharedItem] = useState({title: '', url: ''});

  // Fonctions pour gérer les likes
  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      toast.info("Removed from favorites");
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast.success("Added to favorites");
    }
  };

  // Fonctions pour les modals
  const openBlogModal = (blog: typeof blogPosts[0]) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeBlogModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedBlog(null);
    }, 300);
  };

  const openShareModal = (title: string) => {
    setCurrentSharedItem({
      title,
      url: window.location.href
    });
    setShareModalOpen(true);
  };

  // Fonction de partage
  const shareOnSocialMedia = (title: string, url: string, platform: string) => {
    let shareLink = '';
    
    switch(platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
    setShareModalOpen(false);
    toast.success(`Shared on ${platform}`);
  };

  // Formatage de la durée des podcasts
  const formatDuration = (ms: number): string  => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Chargement des podcasts
  useEffect(() => {
    const loadPodcasts = async () => {
      if (activeTab !== 'podcasts') return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchPodcasts();
        let response_array = data.items;
        let resultat = response_array.map((item: any) => {
          let parsedTitle = item.track.name.split(' (Episode ');
          return {
            id: item.track.id,
            imageURL: item.track.album.images[0].url,
            title: parsedTitle[0],
            episode: parseInt(parsedTitle[1].split(')')[0]),
            duration: formatDuration(item.track.duration_ms),
            progress: Math.floor(Math.random() * 100),
            currentTime: '0:00',
            host: item.track.artists[0].name,
            link: item.track.external_urls.spotify,
          };
        });
        setPodcasts(resultat);
      } catch (err) {
        setError('Error loading podcasts');
        toast.error('Unable to load podcasts');
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
                          onClick={() => openShareModal(featuredPost.title)}
                          aria-label="Share this article"
                        >
                          <Share2 size={20} className="text-reviva-teal" />
                        </button>
                        <button 
                          className="reviva-button ml-2"
                          onClick={() => openBlogModal(featuredPost)}
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
                      <div className="flex gap-2">
                        <button 
                          className="p-1 text-reviva-teal hover:text-reviva-deep-teal"
                          onClick={() => openBlogModal(blog)}
                          aria-label="Read more"
                        >
                          <BookOpen size={16} />
                        </button>
                        <button 
                          className="p-1 text-reviva-teal hover:text-reviva-deep-teal"
                          onClick={() => openShareModal(blog.title)}
                          aria-label="Share"
                        >
                          <Share2 size={16} />
                        </button>
                        <button 
                          className={`p-1 ${likedPosts.includes(blog.id) ? 'text-red-500' : 'text-reviva-teal hover:text-reviva-deep-teal'}`}
                          onClick={() => handleLike(blog.id)}
                          aria-label="Like"
                        >
                          <Heart size={16} fill={likedPosts.includes(blog.id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
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
                {isLoading ? 'Loading...' : 'Popular Podcasts'}
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
                  Try Again
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
                    <div className="shrink-0">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-reviva-mint to-reviva-teal flex items-center justify-center">
                        {podcast.imageURL ? (
                          <img 
                            src={podcast.imageURL} 
                            alt={podcast.title} 
                            className="w-full h-full object-cover rounded-lg" 
                          />
                        ) : (
                          <Headphones size={36} className="text-white" />
                        )}
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
                          onClick={() => window.open(podcast.link, '_blank')}
                          aria-label="Play podcast"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
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
                ))
              )}
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
                          <div 
                            className="prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                          />

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
                                  openShareModal(selectedBlog.title);
                                  closeBlogModal();
                                }}
                              >
                                <Share2 size={20} />
                                <span className="text-sm">Share</span>
                              </button>
                            </div>
                            <button
                              className="reviva-button"
                              onClick={() => {
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

        {/* Share Modal */}
        <Transition appear show={shareModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setShareModalOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50" />
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-reviva-charcoal p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Share this article
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Share "{currentSharedItem.title}" on social media
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-4 gap-4">
                      <button
                        onClick={() => shareOnSocialMedia(currentSharedItem.title, currentSharedItem.url, 'facebook')}
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
                        aria-label="Share on Facebook"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </button>

                      <button
                        onClick={() => shareOnSocialMedia(currentSharedItem.title, currentSharedItem.url, 'twitter')}
                        className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors flex items-center justify-center"
                        aria-label="Share on Twitter"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </button>

                      <button
                        onClick={() => shareOnSocialMedia(currentSharedItem.title, currentSharedItem.url, 'linkedin')}
                        className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors flex items-center justify-center"
                        aria-label="Share on LinkedIn"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                      </button>

                      <button
                        onClick={() => shareOnSocialMedia(currentSharedItem.title, currentSharedItem.url, 'whatsapp')}
                        className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center justify-center"
                        aria-label="Share on WhatsApp"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setShareModalOpen(false)}
                      >
                        Close
                      </button>
                    </div>
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