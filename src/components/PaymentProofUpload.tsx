import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, CheckCircle, FileImage, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PaymentProofUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setIsUploaded(true);
        toast({
          title: "Fichier téléchargé !",
          description: "Votre preuve de paiement a été ajoutée avec succès",
        });
      } else {
        toast({
          title: "Format non supporté",
          description: "Veuillez télécharger une image (PNG, JPG, JPEG)",
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
      toast({
        title: "Preuve de paiement envoyée !",
        description: "Nous traiterons votre demande dans les plus brefs délais",
      });
    }
  };

  return (
    <Card className="border-[#e0f7fa] shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#1d858d] to-[#35a79b] text-white">
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Preuve de paiement
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-gray-600">
            Veuillez télécharger une capture d'écran de votre virement bancaire comme preuve de paiement.
          </p>
          
          {!isUploaded ? (
            <div className="border-2 border-dashed border-[#b2ebf2] rounded-lg p-8 text-center hover:border-[#35a79b] transition-colors">
              <Upload className="w-12 h-12 mx-auto text-[#b2ebf2] mb-4" />
              <p className="text-gray-600 mb-4">
                Glissez-déposez votre capture d'écran ici ou cliquez pour parcourir
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
                Choisir un fichier
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Formats acceptés : PNG, JPG, JPEG (Max 5MB)
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
                Envoyer la preuve de paiement
              </Button>
            </div>
          )}

          <div className="bg-[#e3f2fd] border border-[#bbdefb] rounded-lg p-4">
            <h4 className="font-semibold text-[#0d47a1] mb-2">Instructions importantes :</h4>
            <ul className="text-sm text-[#1976d2] space-y-1">
              <li>• Assurez-vous que le montant exact soit visible</li>
              <li>• Le nom du bénéficiaire (REVIVA SAS) doit être lisible</li>
              <li>• La date et l'heure du virement doivent être visibles</li>
              <li>• Votre nom en tant qu'expéditeur doit apparaître</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentProofUpload;