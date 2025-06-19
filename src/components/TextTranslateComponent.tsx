import React, { useState } from 'react';
import { Languages } from 'lucide-react';

interface TextTranslateComponentProps {
  frenchText: string;
  darijaText: string;
  showToggle?: boolean;
}

const TextTranslateComponent: React.FC<TextTranslateComponentProps> = ({ 
  frenchText, 
  darijaText, 
  showToggle = false 
}) => {
  const [isArabic, setIsArabic] = useState(false);

  return (
    <div className="text-center">
      <div className="mb-4">
        <p className={`text-lg md:text-xl text-reviva-charcoal/80 dark:text-white/80 max-w-4xl mx-auto leading-relaxed ${
          isArabic ? 'font-serif text-xl' : ''
        }`}>
          {isArabic ? darijaText : frenchText}
        </p>
      </div>
      
      {showToggle && (
        <button 
          onClick={() => setIsArabic(!isArabic)}
          className="inline-flex items-center gap-2 text-sm text-reviva-teal hover:text-reviva-deep-teal transition-colors"
        >
          <Languages className="h-4 w-4" />
          {isArabic ? 'View in English' : 'view in darija'}
        </button>
      )}
    </div>
  );
};

export default TextTranslateComponent;
