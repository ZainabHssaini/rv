import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle, Landmark, Banknote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaymentProofUpload from '@/components/PaymentProofUpload';

const BankTransfer = () => {
  const [userStatus, setUserStatus] = useState<'student' | 'employee' | null>(null);
  const [transferConfirmed, setTransferConfirmed] = useState(false);
  const { toast } = useToast();

  const ribInfo = {
    bankName: "FRVIVA",
    iban: "FR76 3000 3000 1100 0000 0123 456",
    bic: "FRVIFR21XXX",
    accountHolder: "REVIVA SAS",
    address: "Av. Ibn Sina, Agdal 10090 Rabat"
  };

  const session = {
    name: "Séance individuelle",
    studentPrice: 100,
    employeePrice: 150
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié !",
      description: `${label} copié dans le presse-papiers`,
      variant: "success"
    });
  };

  const handleConfirmTransfer = () => {
    setTransferConfirmed(true);
    toast({
      title: "Virement confirmé !",
      description: "Merci de télécharger votre preuve de paiement ci-dessous",
      variant: "success"
    });
  };

  const price = userStatus === 'student' ? session.studentPrice : session.employeePrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
            <Banknote className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-teal-800 mb-2">Virement Bancaire</h1>
          <p className="text-teal-600 max-w-md mx-auto">Effectuez votre paiement en toute sécurité</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* RIB Information */}
          <Card className="border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <Landmark className="w-6 h-6" />
                <span>Coordonnées Bancaires</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                {/* Account Holder */}
                <div className="p-4 bg-teal-50 rounded-lg">
                  <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-1">Titulaire</p>
                  <p className="font-semibold text-gray-800">{ribInfo.accountHolder}</p>
                </div>
                
                {/* IBAN */}
                <div className="p-4 bg-teal-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-1">IBAN</p>
                      <p className="font-mono text-gray-800 text-sm">{ribInfo.iban}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(ribInfo.iban, "IBAN")}
                      className="text-teal-600 hover:bg-teal-100"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* BIC */}
                <div className="p-4 bg-teal-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-1">BIC</p>
                      <p className="font-mono text-gray-800 text-sm">{ribInfo.bic}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(ribInfo.bic, "BIC")}
                      className="text-teal-600 hover:bg-teal-100"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Address */}
                <div className="p-4 bg-teal-50 rounded-lg">
                  <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-1">Adresse</p>
                  <p className="text-gray-800 text-sm">{ribInfo.address}</p>
                </div>

                {/* Note */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Important :</span> Merci d'indiquer votre nom en référence de virement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Selection and Pricing */}
          <div className="space-y-6">
            <Card className="border border-[#1d858d]/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-[#10566e] text-white rounded-t-lg">
                <CardTitle>Sélection du statut</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={userStatus === 'student' ? 'default' : 'outline'}
                    onClick={() => setUserStatus('student')}
                    className={`h-auto py-4 ${userStatus === 'student' 
                      ? 'bg-[#279692] hover:bg-[#1b6d80] text-white' 
                      : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">Étudiant</div>
                      <div className="text-sm mt-1">{session.studentPrice} €</div>
                    </div>
                  </Button>
                  
                  <Button
                    variant={userStatus === 'employee' ? 'default' : 'outline'}
                    onClick={() => setUserStatus('employee')}
                    className={`h-auto py-4 ${userStatus === 'employee' 
                      ? 'bg-[#10566e] hover:bg-[#1d858d] text-white' 
                      : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">Employé</div>
                      <div className="text-sm mt-1">{session.employeePrice} €</div>
                    </div>
                  </Button>
                </div>

                {userStatus && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Séance individuelle</p>
                      <p className="text-2xl font-bold text-[#35a79b] mt-2">
                        {price} €
                      </p>
                      <Badge 
                        variant={userStatus === 'student' ? 'secondary' : 'default'} 
                        className="mt-2 bg-[#279692] hover:bg-[#1b6d80] text-white"
                      >
                        Tarif {userStatus === 'student' ? 'étudiant' : 'employé'}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {userStatus && (
              <Card className="border border-[#1d858d]/20 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {!transferConfirmed ? (
                    <Button 
                      onClick={handleConfirmTransfer}
                      className="w-full bg-gradient-to-r from-[#279692] to-[#10566e] hover:from-[#1b6d80] hover:to-[#1d858d] text-white shadow-md"
                      size="lg"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Confirmer le virement
                    </Button>
                  ) : (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-center">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-700">Virement confirmé</p>
                      <p className="text-sm text-green-600">Téléchargez votre preuve ci-dessous</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Payment Proof Upload */}
        {transferConfirmed && (
          <div className="mt-8 animate-fade-in">
            <PaymentProofUpload />
          </div>
        )}
      </div>
    </div>
  );
};

export default BankTransfer;