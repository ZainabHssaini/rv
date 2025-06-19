import React, { useState } from 'react';
import { X, CreditCard, Shield, Check, Upload, FileImage } from 'lucide-react';
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const bankDetails = {
    bankName: "Société Générale",
    rib: "022 450 0003160027931962 53",
    accountHolder: "REVIVA SAS",
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        toast.success('Payment proof uploaded successfully');
      } else {
        toast.error('Please upload an image file');
      }
    }
  };

  const handleSubmitPayment = () => {
    if (!uploadedFile) {
      toast.error('Please upload proof of payment');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment verification
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment verification submitted successfully!');
      onSuccess();
    }, 2000);
  };

  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-reviva-charcoal rounded-2xl p-8 max-w-md w-full text-center animate-scale-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-reviva-teal mx-auto mb-4"></div>
          <h3 className="text-lg font-bold text-reviva-purple dark:text-white mb-2">
            Processing payment verification...
          </h3>
          <p className="text-reviva-charcoal/70 dark:text-white/70">
            Please wait while we verify your payment.
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
              Bank Transfer Payment
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
            <h3 className="font-medium text-reviva-deep-teal mb-2">Order Summary</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm">{description}</span>
              <span className="font-bold text-reviva-teal">{amount} MAD</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 text-sm text-reviva-charcoal/60 dark:text-white/60">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Secure bank transfer</span>
          </div>

          {/* Bank Details */}
          <div className="mb-6 p-4 border border-reviva-teal/30 rounded-lg bg-white dark:bg-reviva-purple/5">
            <h3 className="font-medium text-reviva-deep-teal mb-3">Bank Transfer Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-reviva-charcoal/70 dark:text-white/70">Bank:</span>
                <span className="font-medium">{bankDetails.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-reviva-charcoal/70 dark:text-white/70">RIB:</span>
                <span className="font-mono text-xs">{bankDetails.rib}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-reviva-charcoal/70 dark:text-white/70">Account Holder:</span>
                <span className="font-medium text-xs">{bankDetails.accountHolder}</span>
              </div>
            
              <div className="flex justify-between pt-2 border-t">
                <span className="text-reviva-charcoal/70 dark:text-white/70">Amount:</span>
                <span className="font-bold text-reviva-teal">{amount} MAD</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Instructions:</h4>
            <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>1. Make a bank transfer to the account above</li>
              <li>2. Include the reference: "{description.slice(0, 20)}..."</li>
              <li>3. Take a photo of your transfer receipt</li>
              <li>4. Upload the photo below</li>
            </ol>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-reviva-deep-teal mb-3">
              Upload Payment Proof
            </label>
            
            <div className="border-2 border-dashed border-reviva-teal/30 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="payment-proof"
              />
              
              {!uploadedFile ? (
                <label htmlFor="payment-proof" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-reviva-teal/50 mb-3" />
                  <p className="text-sm text-reviva-charcoal/70 dark:text-white/70">
                    Click to upload your payment receipt
                  </p>
                  <p className="text-xs text-reviva-charcoal/50 dark:text-white/50 mt-1">
                    Supported formats: JPG, PNG, PDF
                  </p>
                </label>
              ) : (
                <div className="space-y-3">
                  <FileImage className="h-12 w-12 mx-auto text-green-600" />
                  <p className="text-sm font-medium text-green-600">
                    {uploadedFile.name}
                  </p>
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Payment receipt preview" 
                      className="max-w-full h-32 object-contain mx-auto rounded border"
                    />
                  )}
                  <label htmlFor="payment-proof" className="text-xs text-reviva-teal cursor-pointer hover:underline">
                    Upload different file
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmitPayment}
              disabled={!uploadedFile}
              className={`flex-1 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                uploadedFile 
                  ? 'reviva-button' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Check className="h-4 w-4" />
              Submit Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;