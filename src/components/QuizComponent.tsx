import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QuizComponentProps {
  onComplete: (needsHelp: boolean) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 'distant',
      french: 'My child seems distant and avoids conversations',
      darija: 'ولدي ولا بنتي ولى بعيد وما كيهضرش معايا'
    },
    {
      id: 'sad',
      french: 'I notice that he/she seems sad without apparent reason',
      darija: 'كنشوفو حزين بلا سبب واضح'
    },
    {
      id: 'grades',
      french: 'His/her grades have dropped recently',
      darija: 'النقط ديالو نقصو هاد الفترة'
    },
    {
      id: 'behavior',
      french: 'His/her behavior has changed (aggression, isolation)',
      darija: 'تصرفاتو تبدلو (عدوانية، عزلة)'
    },
    {
      id: 'help',
      french: 'I don\'t know how to help him/her',
      darija: 'ما عرفتش كيفاش نعاونو'
    }
  ];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      const yesCount = Object.values(newAnswers).filter(Boolean).length;
      const needsHelp = yesCount >= 3;
      
      if (needsHelp) {
        toast.success("We recommend professional support");
      } else {
        toast.info("Some resources might be useful for you");
      }
      
      onComplete(needsHelp);
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-reviva-purple/10 rounded-2xl p-8 shadow-lg animate-fade-in">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-reviva-charcoal/60 dark:text-white/60">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-reviva-teal font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-reviva-teal h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-reviva-purple dark:text-white mb-4">
            {questions[currentQuestion].french}
          </h3>
          <p className="text-lg text-reviva-charcoal/70 dark:text-white/70" 
             style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
            {questions[currentQuestion].darija}
          </p>
        </div>

        {/* Answer Buttons */}
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => handleAnswer(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors dark:bg-red-900/30 dark:text-red-300"
          >
            <CheckCircle className="h-5 w-5" />
            Yes
          </button>
          <button 
            onClick={() => handleAnswer(false)}
            className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors dark:bg-green-900/30 dark:text-green-300"
          >
            <XCircle className="h-5 w-5" />
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
