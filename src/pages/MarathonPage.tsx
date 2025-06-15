import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';
import { Link } from 'react-router-dom';

const MarathonPage = () => {
  const events = [
    {
      id: 1,
      title: "Green Tech Hackathon 2024",
      description: "48 hours to develop sustainable and environmentally friendly technological solutions",
      date: "March 15-17, 2024",
      duration: "48 hours",
      location: "Paris, Station F",
      participants: "120/200 participants",
      categories: ["Environment", "Tech", "AI"],
      prizes: ["€5000", "€3000", "€1000"],
      deadline: "Register before March 10, 2024",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      status: "Open for registration",
      color: "bg-[#1d858d]"
    },
    {
      id: 2,
      title: "Mental Health Ideathon",
      description: "Generate innovative ideas to improve mental well-being and access to psychological care",
      date: "March 22-23, 2024",
      duration: "2 days",
      location: "Lyon, Innovation Campus",
      participants: "85/150 participants",
      categories: ["Health", "Innovation", "Social"],
      prizes: ["€3000", "€2000", "€500"],
      deadline: "Register before March 18, 2024",
      image: "https://images.unsplash.com/photo-1491841573635-49f3530cb6f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      status: "Coming soon",
      color: "bg-[#35a79b]"
    },
    {
      id: 3,
      title: "Tech For Good Marathon",
      description: "Develop technological solutions with positive social impact",
      date: "January 10-12, 2024",
      duration: "72 hours",
      location: "Lyon, France",
      participants: "65/100 participants",
      categories: ["Tech", "Social", "Education"],
      prizes: ["€4000", "€2000", "€1000"],
      deadline: "Register before January 5, 2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      status: "Upcoming",
      color: "bg-[#10566e]"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-reviva-purple mb-4">
          Innovation <span className="text-reviva-teal">Marathon</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-600">
          Participate in unique events and push the boundaries of creativity
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/createEvent" 
            className="bg-[#1d858d] text-white hover:bg-[#10566e] px-8 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Create an Event
          </Link>
          <Link 
            to="#events" 
            className="bg-transparent border-2 border-[#1d858d] text-[#1d858d] hover:bg-[#1d858d] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Discover Events
          </Link>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#10566e]">Upcoming Events</h2>
          <Link 
            to="/createEvent" 
            className="bg-[#1d858d] hover:bg-[#10566e] text-white px-6 py-2 rounded-lg flex items-center transition-colors"
          >
            <span>+ Create Event</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {events.map(event => (
            <div 
              key={event.id} 
              className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1b6d80] mb-2">{event.title}</h3>
                      <p className="text-gray-700 mb-4">{event.description}</p>
                    </div>
                    <span className={`
                      relative px-3 py-1 rounded-full text-xs font-semibold 
                      ${event.color.replace('bg', 'text')} 
                      ${event.color} bg-opacity-10
                      border ${event.color.replace('bg', 'border')} border-opacity-30
                      shadow-sm
                      whitespace-nowrap
                      overflow-hidden
                      group
                    `}>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                      {event.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.duration}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {event.participants}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {event.categories.map((category, index) => (
                        <span key={index} className="bg-[#1d858d] bg-opacity-10 text-[#1d858d] text-xs px-2 py-1 rounded">
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <span className="font-medium">Prizes:</span>
                      {event.prizes.map((prize, index) => (
                        <span key={index} className="font-bold text-[#10566e]">
                          {prize}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 italic">{event.deadline}</p>
                    <Link 
                      to={`/marathon/${event.id}`} 
                      className="bg-[#1d858d] hover:bg-[#10566e] text-white px-6 py-2 rounded-lg flex items-center transition-colors"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-12 text-center">
          <button className="bg-white text-[#1d858d] border-2 border-[#1d858d] hover:bg-[#1d858d] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Show More Events
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MarathonPage;