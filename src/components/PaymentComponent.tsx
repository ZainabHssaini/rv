import React, { useState } from 'react';
import { X, CreditCard, Shield, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentComponentProps {
  amount: number;
  description: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ 
  amount, 
  description, 
  onSuccess, 
  onCancel 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.holderName) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Paiement effectué avec succès !');
      onSuccess();
    }, 3000);
  };

  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-reviva-charcoal rounded-2xl p-8 max-w-md w-full text-center animate-scale-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-reviva-teal mx-auto mb-4"></div>
          <h3 className="text-lg font-bold text-reviva-purple dark:text-white mb-2">
            Traitement du paiement...
          </h3>
          <p className="text-reviva-charcoal/70 dark:text-white/70">
            Veuillez patienter, ne fermez pas cette page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-reviva-charcoal rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-reviva-purple dark:text-white">
              Paiement sécurisé
            </h2>
            <button 
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="mb-6 p-4 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg">
            <h3 className="font-medium text-reviva-deep-teal mb-2">Résumé de la commande</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm">{description}</span>
              <span className="font-bold text-reviva-teal">{amount} MAD</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 text-sm text-reviva-charcoal/60 dark:text-white/60">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Paiement sécurisé SSL</span>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-reviva-deep-teal mb-2">
                Nom du titulaire
              </label>
              <input
                type="text"
                value={formData.holderName}
                onChange={(e) => handleInputChange('holderName', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-reviva-teal"
                placeholder="Nom complet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-reviva-deep-teal mb-2">
                Numéro de carte
              </label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-reviva-teal"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-reviva-deep-teal mb-2">
                  Date d'expiration
                </label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-reviva-teal"
                  placeholder="MM/AA"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-reviva-deep-teal mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-reviva-teal"
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button 
              onClick={onCancel}
              className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={handlePayment}
              className="flex-1 reviva-button flex items-center justify-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Payer {amount} MAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
