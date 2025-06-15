import { useState } from 'react';
import { Lightbulb, Users, Code, Palette, Rocket, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';

const CreateProjectPage = () => {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    category: '',
    skillsNeeded: []
  });

  const categories = [
    { name: 'Technology', icon: <Code className="w-5 h-5" /> },
    { name: 'Design', icon: <Palette className="w-5 h-5" /> },
    { name: 'Startup', icon: <Rocket className="w-5 h-5" /> }
  ];

  const skills = ['React', 'Node.js', 'UI/UX', 'Marketing', 'AI/ML', 'Mobile Development'];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9fa] to-[#e0f2f1]">
        <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
            {/* Progress Bar */}
            <div className="relative mb-12">
            <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                    ${step >= i ? 'bg-[#1d858d] text-white' : 'bg-gray-200 text-[#1b6d80]'}`}>
                    {i === 4 ? <Check /> : i}
                    </div>
                    <span className="text-sm mt-2 text-[#1b6d80]">
                    {['Concept', 'Details', 'Skills', 'Review'][i-1]}
                    </span>
                </div>
                ))}
            </div>
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
                <div 
                className="h-full bg-[#279692] transition-all duration-500" 
                style={{ width: `${(step-1)*33.33}%` }}
                ></div>
            </div>
            </div>

            {/* Step Content */}
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-[#35a79b]">
            {step === 1 && (
                <div className="text-center">
                <Lightbulb className="w-16 h-16 mx-auto text-[#1d858d] mb-6" />
                <h2 className="text-3xl font-bold text-[#10566e] mb-4">What's Your Big Idea?</h2>
                <p className="text-[#1b6d80] mb-8 max-w-lg mx-auto">
                    Start by giving your project a name and a short description that captures its essence.
                </p>
                
                <div className="space-y-6 max-w-md mx-auto">
                    <div>
                    <label className="block text-left text-[#10566e] mb-2">Project Name</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-lg border border-[#35a79b] focus:ring-2 focus:ring-[#1d858d] focus:border-[#10566e]"
                        placeholder="e.g. Eco-Friendly Delivery App"
                        value={projectData.name}
                        onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                    />
                    </div>
                    
                    <div>
                    <label className="block text-left text-[#10566e] mb-2">Description</label>
                    <textarea 
                        className="w-full px-4 py-3 rounded-lg border border-[#35a79b] focus:ring-2 focus:ring-[#1d858d] focus:border-[#10566e]"
                        rows={4}
                        placeholder="Describe your project vision..."
                        value={projectData.description}
                        onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                    ></textarea>
                    </div>
                </div>
                </div>
            )}

            {step === 2 && (
                <div>
                <h2 className="text-3xl font-bold text-center text-[#10566e] mb-8">Project Category</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                    <Card 
                        key={cat.name}
                        className={`p-6 text-center cursor-pointer transition-all hover:shadow-lg border-[#35a79b] ${projectData.category === cat.name ? 'border-2 border-[#1d858d]' : ''}`}
                        onClick={() => setProjectData({...projectData, category: cat.name})}
                    >
                        <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-[#1d858d]">
                        {cat.icon}
                        </div>
                        <h3 className="font-semibold text-lg text-[#10566e]">{cat.name}</h3>
                    </Card>
                    ))}
                </div>
                </div>
            )}

            {step === 3 && (
                <div>
                <h2 className="text-3xl font-bold text-center text-[#10566e] mb-8">Required Skills</h2>
                <p className="text-[#1b6d80] text-center mb-8">Select the skills you need for your project</p>
                
                <div className="flex flex-wrap gap-3 justify-center">
                    {skills.map(skill => (
                    <Button
                        key={skill}
                        variant={projectData.skillsNeeded.includes(skill) ? 'default' : 'outline'}
                        className={projectData.skillsNeeded.includes(skill) ? 'bg-[#1d858d] hover:bg-[#10566e]' : 'text-[#1b6d80] border-[#35a79b] hover:bg-[#e0f2f1]'}
                        onClick={() => {
                        const newSkills = projectData.skillsNeeded.includes(skill)
                            ? projectData.skillsNeeded.filter(s => s !== skill)
                            : [...projectData.skillsNeeded, skill];
                        setProjectData({...projectData, skillsNeeded: newSkills});
                        }}
                    >
                        {skill}
                    </Button>
                    ))}
                </div>
                </div>
            )}

            {step === 4 && (
                <div className="text-center">
                <Check className="w-16 h-16 mx-auto text-[#35a79b] mb-6" />
                <h2 className="text-3xl font-bold text-[#10566e] mb-4">Ready to Launch!</h2>
                <p className="text-[#1b6d80] mb-8 max-w-lg mx-auto">
                    Our AI will now analyze your project and suggest the perfect team members.
                </p>
                
                <div className="bg-[#f0f9fa] p-6 rounded-lg text-left max-w-md mx-auto mb-8 border border-[#35a79b]">
                    <h3 className="font-semibold text-lg mb-4 text-[#10566e]">Project Summary</h3>
                    <p className="text-[#1b6d80]"><span className="font-medium text-[#10566e]">Name:</span> {projectData.name}</p>
                    <p className="text-[#1b6d80]"><span className="font-medium text-[#10566e]">Category:</span> {projectData.category}</p>
                    <p className="text-[#1b6d80]"><span className="font-medium text-[#10566e]">Skills Needed:</span> {projectData.skillsNeeded.join(', ')}</p>
                </div>
                </div>
            )}

            <div className="flex justify-between mt-12">
                <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={step === 1}
                className="text-[#1b6d80] border-[#35a79b] hover:bg-[#e0f2f1]"
                >
                Back
                </Button>
                
                {step < 4 ? (
                <Button className="bg-[#1d858d] hover:bg-[#10566e]">
                    Continue
                </Button>
                ) : (
                <Button className="bg-gradient-to-r from-[#1d858d] to-[#10566e]">
                    <Rocket className="w-5 h-5 mr-2" />
                    Launch Project
                </Button>
                )}
            </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;