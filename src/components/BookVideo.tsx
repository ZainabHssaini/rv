import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Therapist {
    id: number
    firstname: string
    lastname: string
    title: string
    specialties: string[]
    image: string
    numberOfSessions: number
  } 

const BookVideo = () => {
  const { state } = useLocation()
  const therapist = state?.therapist as Therapist
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // Ajoutez ce log pour debugger
  console.log('Received therapist:', therapist)

  const handleConfirmBooking = () => {
    setShowPopup(true);
    setTimeout(() => {
      navigate('/therapy');
    }, 2000);
  };

  if (!therapist) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-reviva-charcoal/80">
          Aucun thérapeute sélectionné. Veuillez choisir un thérapeute d'abord.
        </div>
        <Link 
          to="/therapy" 
          className="mt-4 inline-block text-reviva-teal hover:text-reviva-deep-teal"
        >
          ← Retour aux thérapeutes
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-reviva-purple mb-8">Réserver une séance vidéo</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
        <div className="flex items-center gap-4">
          <img 
            src={therapist.image}
            alt={`${therapist.firstname} ${therapist.lastname}`} 
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-reviva-charcoal">
               {therapist.firstname} {therapist.lastname}
            </h2>
            <p className="text-reviva-charcoal/80">{therapist.title}</p>
            <p className="text-sm text-reviva-teal mt-1">
              {therapist.numberOfSessions}+ sessions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Date</label>
            <input 
              type="date" 
              className="w-full p-2 border rounded-lg focus:ring-reviva-teal"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Select Time</label>
            <input 
              type="time" 
              className="w-full p-2 border rounded-lg focus:ring-reviva-teal"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Link 
            to="/therapy" 
            className="px-4 py-2 text-reviva-charcoal hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </Link>
          <button 
            className="px-4 py-2 bg-reviva-teal text-white rounded-lg hover:bg-reviva-deep-teal"
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Session booked</h3>
            <p className="mb-2">Your session has been successfully booked.</p>
            <p className="text-sm text-gray-500">Redirecting to therapy page...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookVideo