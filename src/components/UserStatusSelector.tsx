import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, CircleDollarSign } from 'lucide-react';

interface Session {
  id: string;
  name: string;
  studentPrice: number;
  employeePrice: number;
}

interface UserStatusSelectorProps {
  userStatus: 'student' | 'employee' | null;
  setUserStatus: (status: 'student' | 'employee' | null) => void;
  selectedSession: string;
  setSelectedSession: (session: string) => void;
  sessions: Session[];
}

const UserStatusSelector: React.FC<UserStatusSelectorProps> = ({
  userStatus,
  setUserStatus,
  selectedSession,
  setSelectedSession,
  sessions
}) => {
  return (
    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
        <CardTitle className="text-white flex items-center gap-3">
          <CircleDollarSign className="w-5 h-5" />
          <span>Sélectionnez votre profil et séance</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* User Status Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Votre statut</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={userStatus === 'student' ? 'default' : 'outline'}
              onClick={() => setUserStatus('student')}
              className={`h-auto py-4 ${userStatus === 'student' 
                ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-sm' 
                : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}
            >
              <div className="flex flex-col items-center gap-1">
                <GraduationCap className="w-5 h-5" />
                <span className="font-medium">Étudiant</span>
                <span className="text-xs text-gray-500">Tarifs réduits</span>
              </div>
            </Button>
            
            <Button
              variant={userStatus === 'employee' ? 'default' : 'outline'}
              onClick={() => setUserStatus('employee')}
              className={`h-auto py-4 ${userStatus === 'employee' 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm' 
                : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}
            >
              <div className="flex flex-col items-center gap-1">
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">Employé</span>
                <span className="text-xs text-gray-500">Tarifs standard</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Session Selection */}
        {userStatus && (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            TYPE DE SÉANCE
            </h3>
            <Select onValueChange={setSelectedSession}>
            <SelectTrigger className="border-gray-200 hover:border-gray-300 h-12">
                <SelectValue placeholder="Choisir une séance..." />
            </SelectTrigger>
            <SelectContent className="border-gray-200 rounded-lg shadow-lg">
                {sessions.map((session) => (
                <SelectItem 
                    key={session.id} 
                    value={session.id} 
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                    <div className="flex flex-col gap-2.5">
                        <span className="font-medium text-gray-900 leading-snug">
                        {session.name}
                        </span>
                        <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <span className="inline-block w-2 h-2 rounded-full bg-teal-400"></span>
                            <span>Étudiant:</span>
                            <span className="font-medium text-teal-700">{session.studentPrice}€</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
                            <span>Employé:</span>
                            <span className="font-medium text-blue-700">{session.employeePrice}€</span>
                        </div>
                        </div>
                    </div>
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
        )}

        {/* Price Display */}
        {userStatus && selectedSession && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Votre tarif</p>
              <p className="text-3xl font-bold text-teal-600">
                {userStatus === 'student' 
                  ? sessions.find(s => s.id === selectedSession)?.studentPrice 
                  : sessions.find(s => s.id === selectedSession)?.employeePrice}€
              </p>
              <Badge 
                variant={userStatus === 'student' ? 'secondary' : 'default'} 
                className="text-xs px-2.5 py-0.5"
              >
                {userStatus === 'student' ? 'Tarif étudiant' : 'Tarif employé'}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserStatusSelector;