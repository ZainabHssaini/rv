import React, { useState } from 'react';
import { X, Calendar, Clock, MessageCircle, Phone, MapPin, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import PaymentComponent from '@/components/PaymentComponent';

interface Psychologist {
  id: number;
  name: string;
  specialty: string;
  image: string;
  price: number;
}

interface BookingComponentProps {
  psychologist: Psychologist;
  onClose: () => void;
}

const BookingComponent: React.FC<BookingComponentProps> = ({ 
  psychologist, 
  onClose 
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const availableDates = [
    { value: '2024-01-15', label: 'Lundi 15 Janvier' },
    { value: '2024-01-16', label: 'Mardi 16 Janvier' },
    { value: '2024-01-17', label: 'Mercredi 17 Janvier' },
    { value: '2024-01-18', label: 'Jeudi 18 Janvier' },
    { value: '2024-01-19', label: 'Vendredi 19 Janvier' }
  ];

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const consultationMethods = [
    { 
      id: 'video', 
      icon: MessageCircle, 
      label: 'Visioconférence',
      description: 'Consultation en ligne sécurisée'
    },
    { 
      id: 'phone', 
      icon: Phone, 
      label: 'Appel téléphonique',
      description: 'Consultation par téléphone'
    },
    { 
      id: 'office', 
      icon: MapPin, 
      label: 'Présentiel',
      description: 'Au cabinet à Casablanca'
    }
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedMethod) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    toast.success('Rendez-vous confirmé !');
    onClose();
  };

  if (showPayment) {
    return (
      <PaymentComponent
        amount={psychologist.price}
        description={`Consultation avec ${psychologist.name}`}
        onSuccess={handlePaymentSuccess}
        onCancel={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-reviva-charcoal rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img 
                src={psychologist.image}
                alt={psychologist.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-reviva-purple dark:text-white">
                  Réserver avec {psychologist.name}
                </h2>
                <p className="text-sm text-reviva-charcoal/70 dark:text-white/70">
                  {psychologist.specialty}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-reviva-deep-teal mb-3">
              <Calendar className="inline h-4 w-4 mr-2" />
              Choisir une date
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableDates.map((date) => (
                <button
                  key={date.value}
                  onClick={() => setSelectedDate(date.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedDate === date.value
                      ? 'border-reviva-teal bg-reviva-teal/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-reviva-teal/50'
                  }`}
                >
                  {date.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-reviva-deep-teal mb-3">
              <Clock className="inline h-4 w-4 mr-2" />
              Choisir un horaire
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    selectedTime === time
                      ? 'border-reviva-teal bg-reviva-teal/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-reviva-teal/50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-reviva-deep-teal mb-3">
              Mode de consultation
            </label>
            <div className="space-y-2">
              {consultationMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedMethod === method.id
                        ? 'border-reviva-teal bg-reviva-teal/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-reviva-teal/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-reviva-teal" />
                      <div>
                        <div className="font-medium">{method.label}</div>
                        <div className="text-sm text-reviva-charcoal/60 dark:text-white/60">
                          {method.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 p-4 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
            <h3 className="font-medium text-reviva-deep-teal mb-2">Résumé de votre réservation</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Psychologue:</span>
                <span>{psychologist.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{availableDates.find(d => d.value === selectedDate)?.label || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span>Heure:</span>
                <span>{selectedTime || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span>Mode:</span>
                <span>{consultationMethods.find(m => m.id === selectedMethod)?.label || '-'}</span>
              </div>
              <div className="flex justify-between font-bold text-reviva-teal pt-2 border-t">
                <span>Total:</span>
                <span>{psychologist.price} MAD</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={handleBooking}
              className="flex-1 reviva-button flex items-center justify-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Confirmer et payer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;