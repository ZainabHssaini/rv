
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  color: string;
  index: number;
  href?: string; // Optional href for navigation
}

const FeatureCard = ({ icon: Icon, title, description, buttonText, color, index, href }: FeatureCardProps) => {

     const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const handleClick = () => {
    if (href) {
      navigate(href); // Navigue vers l'URL spécifiée
    }
  };
  
  return (
    <div 
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2 animate-fade-in"
      style={{ 
        animationDelay: `${index * 150}ms`,
        '--hover-color': color 
      } as React.CSSProperties}
    >
      {/* Icon */}
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon 
          size={32} 
          style={{ color }} 
          className="group-hover:rotate-12 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[var(--hover-color)] transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed mb-6 text-sm">
        {description}
      </p>

      {/* Button */}
      <Button 
        className="w-full font-semibold py-3 rounded-xl transition-all duration-300 border-2 group-hover:scale-105"
        style={{ 
          backgroundColor: color,
          borderColor: color,
          color: 'white'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = color;
          e.currentTarget.style.color = 'white';
        }}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default FeatureCard;