import { useState } from 'react';
import { Link } from 'react-router-dom';

interface RegisterPopupProps {
  event: {
    id: number;
    title: string;
  };
  onClose: () => void;
}

export const RegisterPopup = ({ event, onClose }: RegisterPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Added email field
    age: '',
    city: '',
    isInTeam: false,
    numberOfTeammates: 1,
    teammates: ['']
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTeammateCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
    const newTeammates = Array(count).fill('').map((_, i) => 
      i < formData.teammates.length ? formData.teammates[i] : ''
    );
    
    setFormData(prev => ({
      ...prev,
      numberOfTeammates: count,
      teammates: newTeammates
    }));
  };

  const handleTeammateNameChange = (index: number, value: string) => {
    const newTeammates = [...formData.teammates];
    newTeammates[index] = value;
    
    setFormData(prev => ({
      ...prev,
      teammates: newTeammates
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.age || !formData.city) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.isInTeam && formData.teammates.some(name => !name.trim())) {
      alert('Please enter all teammate names');
      return;
    }

    // Prepare submission data
    const submissionData = {
      eventId: event.id,
      participant: {
        name: formData.name,
        email: formData.email, // Include email in submission
        age: formData.age,
        city: formData.city
      },
      teamMembers: formData.isInTeam ? formData.teammates : []
    };

    console.log('Registration data:', submissionData);
    
    // Simulate API call
    try {
      // await api.registerForEvent(submissionData);
      setIsSubmitted(true); // Show success message
      setTimeout(() => {
        onClose(); // Close popup after 3 seconds
        setIsSubmitted(false); // Reset for next time
      }, 3000);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
          <div className="text-green-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Registration Successful!</h3>
          <p className="text-gray-600 mb-4">You will receive a confirmation email shortly.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1d858d] text-white rounded-md hover:bg-[#10566e] focus:outline-none focus:ring-2 focus:ring-[#1d858d]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#1d858d]">Register for {event.title}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d858d]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d858d]"
              placeholder="your@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="12"
                max="99"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d858d]"
                placeholder="Your age"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d858d]"
                placeholder="Your city"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isInTeam"
              name="isInTeam"
              checked={formData.isInTeam}
              onChange={handleChange}
              className="h-4 w-4 text-[#1d858d] focus:ring-[#1d858d] border-gray-300 rounded"
            />
            <label htmlFor="isInTeam" className="ml-2 block text-sm text-gray-700">
              Are you participating as part of a team?
            </label>
          </div>

          {formData.isInTeam && (
            <div className="space-y-4">
              <div>
                <label htmlFor="numberOfTeammates" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Teammates (1-10) *
                </label>
                <input
                  type="number"
                  id="numberOfTeammates"
                  name="numberOfTeammates"
                  min="1"
                  max="10"
                  value={formData.numberOfTeammates}
                  onChange={handleTeammateCountChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d858d]"
                />
              </div>

              {formData.teammates.map((teammate, index) => (
                <div key={index}>
                  <label htmlFor={`teammate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Teammate {index + 1} Name *
                  </label>
                  <input
                    type="text"
                    id={`teammate-${index}`}
                    value={teammate}
                    onChange={(e) => handleTeammateNameChange(index, e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d858d]"
                    placeholder={`Teammate ${index + 1} name`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1d858d] text-white rounded-md hover:bg-[#10566e] focus:outline-none focus:ring-2 focus:ring-[#1d858d]"
            >
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};