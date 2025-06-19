import React from 'react';
import { Star, Calendar, MessageCircle, Phone, MapPin } from 'lucide-react';

interface Psychologist {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  languages: string[];
}

interface CardPsychologistComponentProps {
  psychologist: Psychologist;
  onBook: () => void;
}

const CardPsychologistComponent: React.FC<CardPsychologistComponentProps> = ({ 
  psychologist, 
  onBook 
}) => {
  return (
    <div className="reviva-card bg-white dark:bg-reviva-purple/10 animate-scale-in">
      <div className="flex items-center mb-4">
        <img 
          src={psychologist.image} 
          alt={psychologist.name}
          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-reviva-mint"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-reviva-deep-teal">
            {psychologist.name}
          </h3>
          <p className="text-sm text-reviva-charcoal/70 dark:text-white/70">
            {psychologist.specialty}
          </p>
        </div>
      </div>

      <div className="flex items-center mb-3">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 text-sm font-medium">{psychologist.rating}</span>
        </div>
        <span className="mx-2 text-reviva-charcoal/40 dark:text-white/40">•</span>
        <span className="text-sm text-reviva-charcoal/70 dark:text-white/70">
          {psychologist.reviews} avis
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-reviva-charcoal/60 dark:text-white/60 mb-2">
          Langues parlées:
        </p>
        <div className="flex flex-wrap gap-1">
          {psychologist.languages.map((lang, index) => (
            <span 
              key={index}
              className="text-xs bg-reviva-beige/50 text-reviva-deep-teal px-2 py-1 rounded-full"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4 p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-reviva-charcoal/60 dark:text-white/60">
            Consultation (30 min)
          </span>
          <span className="font-bold text-reviva-teal text-lg">
            {psychologist.price} MAD
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-reviva-charcoal/70 dark:text-white/70">
          <MessageCircle className="h-4 w-4 mr-2 text-reviva-teal" />
          Visioconférence
        </div>
        <div className="flex items-center text-sm text-reviva-charcoal/70 dark:text-white/70">
          <Phone className="h-4 w-4 mr-2 text-reviva-teal" />
          Appel téléphonique
        </div>
        <div className="flex items-center text-sm text-reviva-charcoal/70 dark:text-white/70">
          <MapPin className="h-4 w-4 mr-2 text-reviva-teal" />
          Présentiel (Casablanca)
        </div>
      </div>

      <button 
        onClick={onBook}
        className="w-full reviva-button flex items-center justify-center gap-2"
      >
        <Calendar className="h-4 w-4" />
        Réserver une séance
      </button>
    </div>
  );
};

export default CardPsychologistComponent;
