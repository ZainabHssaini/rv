import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, CheckCircle, FileImage, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const PaymentProofUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setIsUploaded(true);
        toast({
          title: "File uploaded!",
          description: "Your payment proof has been successfully added",
        });
      } else {
        toast({
          title: "Unsupported format",
          description: "Please upload an image (PNG, JPG, JPEG)",
          variant: "destructive"
        });
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
  };

  const submitProof = () => {
    if (uploadedFile) {
      // Show success dialog
      setShowSuccessDialog(true);
      
      // Optional: Show toast notification
      toast({
        title: "Success",
        description: "Your payment proof has been successfully submitted",
      });
    }
  };

  return (
    <>
      <Card className="border-[#e0f7fa] shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#1d858d] to-[#35a79b] text-white">
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Payment Proof
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-gray-600">
              Please upload a screenshot of your bank transfer as payment proof.
            </p>
            
            {!isUploaded ? (
              <div className="border-2 border-dashed border-[#b2ebf2] rounded-lg p-8 text-center hover:border-[#35a79b] transition-colors">
                <Upload className="w-12 h-12 mx-auto text-[#b2ebf2] mb-4" />
                <p className="text-gray-600 mb-4">
                  Drag and drop your screenshot here or click to browse
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="proof-upload"
                />
                <Button
                  variant="outline"
                  className="border-[#35a79b] text-[#1d858d] hover:bg-[#e0f7fa]"
                  onClick={() => document.getElementById('proof-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Accepted formats: PNG, JPG, JPEG (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="bg-[#e8f5e9] border border-[#c8e6c9] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#c8e6c9] rounded-lg flex items-center justify-center">
                      <FileImage className="w-5 h-5 text-[#1d858d]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1d858d]">{uploadedFile?.name}</p>
                      <p className="text-sm text-[#35a79b]">
                        {uploadedFile && (uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#35a79b]" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-[#ff7043] hover:text-[#e64a19] hover:bg-[#ffebee]"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isUploaded && (
              <div className="pt-4 border-t border-[#e0f7fa]">
                <Button 
                  onClick={submitProof}
                  className="w-full bg-gradient-to-r from-[#1d858d] to-[#35a79b] hover:from-[#10566e] hover:to-[#1b6d80] text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Payment Proof
                </Button>
              </div>
            )}

            <div className="bg-[#e3f2fd] border border-[#bbdefb] rounded-lg p-4">
              <h4 className="font-semibold text-[#0d47a1] mb-2">Important Instructions:</h4>
              <ul className="text-sm text-[#ff0000] space-y-1">
                <li>• Ensure the exact amount is visible</li>
                <li>• The beneficiary name (REVIVA SAS) must be readable</li>
                <li>• The transfer date and time must be visible</li>
                <li>• Your name as the sender must appear</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <AlertDialogTitle className="text-center">Proof Submitted Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              We have received your payment proof. It will be processed shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction className="bg-[#1d858d] hover:bg-[#10566e]">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PaymentProofUpload;