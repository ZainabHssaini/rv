import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle, Landmark, Banknote, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import PaymentProofUpload from '@/components/PaymentProofUpload';

const BankTransfer = () => {
  const [userStatus, setUserStatus] = useState<'student' | 'employee' | null>(null);
  const [transferConfirmed, setTransferConfirmed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const ribInfo = {
    bankName: "Société Générale",
    iban: "022 450 0003160027931962 53",
    accountHolder: "REVIVA SAS",
    address: "Av. Ibn Sina, Agdal 10090 Rabat"
  };

  const session = {
    name: "Individual Session",
    studentPrice: 100,
    employeePrice: 150
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleConfirmTransfer = () => {
    setTransferConfirmed(true);
    toast({
      title: "Transfer confirmed!",
      description: "Please upload your payment proof below",
    });
  };

  const price = userStatus === 'student' ? session.studentPrice : session.employeePrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
            <Banknote className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-teal-800 mb-2">Bank Transfer</h1>
          <p className="text-teal-00 max-w-md mx-auto">Make your payment securely</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bank Details */}
          <Card className="border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <Landmark className="w-6 h-6" />
                <span>Bank Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                {/* Account Holder */}
                <div className="p-4 bg-teal-50 rounded-lg">
                  <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-1">Account Holder</p>
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
                

                {/* Address */}
                <div className="p-4 bg-teal-50 rounded-lg">
                  <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-1">Address</p>
                  <p className="text-gray-800 text-sm">{ribInfo.address}</p>
                </div>

                {/* Note */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-red-700">
                    <span className="font-medium">Important:</span> Please include your name in the transfer reference
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Selection and Pricing */}
          <div className="space-y-6">
            <Card className="border border-[#1d858d]/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-[#10566e] text-white rounded-t-lg">
                <CardTitle>Select Your Status</CardTitle>
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
                      <div className="font-semibold">Student</div>
                      <div className="text-sm mt-1">{session.studentPrice} Dh</div>
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
                      <div className="font-semibold">Employee</div>
                      <div className="text-sm mt-1">{session.employeePrice} Dh</div>
                    </div>
                  </Button>
                </div>

                {userStatus && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Individual Session</p>
                      <p className="text-2xl font-bold text-[#35a79b] mt-2">
                        {price} Dh
                      </p>
                      <Badge 
                        variant={userStatus === 'student' ? 'secondary' : 'default'} 
                        className="mt-2 bg-[#279692] hover:bg-[#1b6d80] text-white"
                      >
                        {userStatus === 'student' ? 'Student' : 'Employee'} Rate
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
                      Confirm Transfer
                    </Button>
                  ) : (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-center">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-700">Transfer Confirmed</p>
                      <p className="text-sm text-green-600">Upload your proof below</p>
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