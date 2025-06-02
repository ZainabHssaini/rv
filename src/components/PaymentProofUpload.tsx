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
    <Card className="border-green-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
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
                className="border-teal-300 text-teal-600 hover:bg-teal-50"
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileImage className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">{uploadedFile?.name}</p>
                    <p className="text-sm text-green-600">
                      {uploadedFile && (uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isUploaded && (
            <div className="pt-4 border-t">
              <Button 
                onClick={submitProof}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Envoyer la preuve de paiement
              </Button>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Instructions importantes :</h4>
            <ul className="text-sm text-blue-700 space-y-1">
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