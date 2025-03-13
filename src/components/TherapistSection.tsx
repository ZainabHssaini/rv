
import { Calendar, Star, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const TherapistSection = () => {
  const therapists = [
    {
      name: "Dr. Sami Chakour",
      specialty: "Anxiety & Depression",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQEiNgd7qj2XNQ/profile-displayphoto-shrink_200_200/B4EZP0Zw6sGcAY-/0/1734972215894?e=1747267200&v=beta&t=9ostmp6_91pEtaTEVQeJJfLJib86o1FCRmN5-0pRSZk",
      rating: 4.9,
      reviews: 128,
      nextAvailable: "Today"
    },
    {
      name: "Dr. Ihssan Yousfi",
      specialty: "Trauma Recovery",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFVBnOGUCju2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714003455639?e=1747267200&v=beta&t=wqrNmcrUf8wOW1ncnKiVdFBNJ16WrFQQG7LZ8myZJ98",
      rating: 4.8,
      reviews: 93,
      nextAvailable: "Tomorrow"
    },
    {
      name: "Dr. Inasse El Bouchikhi",
      specialty: "Relationship Counseling",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFSEDP7BaeMKA/profile-displayphoto-shrink_200_200/B4EZQ48u.8G4Ac-/0/1736122233315?e=1747267200&v=beta&t=8CCmYEIZiXpCiE-bs_4H9ggfo4ocIzdHWTBevEeQOFM",
      rating: 4.9,
      reviews: 156,
      nextAvailable: "In 2 days"
    }

  ];

  

  return (
    <section id="therapy" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
            Connect with Licensed Therapists
          </h2>
          <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
            Schedule private consultations with our network of professional therapists specializing in various mental health areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {therapists.map((therapist, index) => (
            <div 
              key={index}
              className="reviva-card glass-card dark:glass-card-dark animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={therapist.image} 
                  alt={therapist.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-reviva-mint"
                />
                <div>
                  <h3 className="text-lg font-medium text-reviva-deep-teal">{therapist.name}</h3>
                  <p className="text-sm text-reviva-charcoal/70 dark:text-white/70">{therapist.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{therapist.rating}</span>
                </div>
                <span className="mx-2 text-reviva-charcoal/40 dark:text-white/40">•</span>
                <span className="text-sm text-reviva-charcoal/70 dark:text-white/70">{therapist.reviews} reviews</span>
              </div>
              
              <div className="flex items-center mb-4">
                <Calendar className="h-4 w-4 text-reviva-teal mr-2" />
                <span className="text-sm">Next available: <span className="font-medium">{therapist.nextAvailable}</span></span>
              </div>
              
              <button className="w-full py-2 rounded-lg border border-reviva-teal text-reviva-teal hover:bg-reviva-teal hover:text-white transition-colors flex items-center justify-center">
                Book Consultation
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center text-reviva-teal hover:text-reviva-deep-teal transition-colors font-medium">
            View all therapists <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TherapistSection;
