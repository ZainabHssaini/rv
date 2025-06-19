import React, { useState } from 'react';
import { X, Calendar, Clock, MessageCircle, Phone, CreditCard, Upload } from 'lucide-react';
import { toast } from 'sonner';
import PaymentComponent from '@/components/PaymentComponent';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const consultationMethods = [
    { 
      id: 'video', 
      icon: MessageCircle, 
      label: 'Video consultation',
      description: 'Secure online consultation'
    },
    { 
      id: 'phone', 
      icon: Phone, 
      label: 'Phone call',
      description: 'Consultation by phone'
    }
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedMethod) {
      toast.error('Please fill in all fields');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    toast.success('Appointment confirmed!');
    onClose();
  };

  if (showPayment) {
    return (
      <PaymentComponent
        amount={psychologist.price}
        description={`Consultation with ${psychologist.name}`}
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
                  Book with {psychologist.name}
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
              Choose a date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date < new Date() || date.getDay() === 0 || date.getDay() === 6
                  }
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-reviva-deep-teal mb-3">
              <Clock className="inline h-4 w-4 mr-2" />
              Choose a time
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
              Consultation method
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
            <h3 className="font-medium text-reviva-deep-teal mb-2">Booking summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Psychologist:</span>
                <span>{psychologist.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{selectedDate ? format(selectedDate, "PPP") : '-'}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{selectedTime || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span>Method:</span>
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
              Cancel
            </button>
            <button 
              onClick={handleBooking}
              className="flex-1 reviva-button flex items-center justify-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Confirm and pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;
