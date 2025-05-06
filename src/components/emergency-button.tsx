'use client';

import { useState } from 'react';
import { PhoneOutgoing, AlertTriangle, Shield, Ambulance } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface EmergencyContact {
  name: string;
  number: string;
  icon: React.ElementType;
  description: string;
}

const emergencyContacts: EmergencyContact[] = [
  { name: 'Polícia Militar', number: '190', icon: Shield, description: 'Para emergências policiais e segurança pública.' },
  { name: 'SAMU', number: '192', icon: Ambulance, description: 'Para emergências médicas e de saúde.' },
  { name: 'Corpo de Bombeiros', number: '193', icon: AlertTriangle, description: 'Para incêndios, resgates e desastres.' },
];

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="destructive"
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-xl animate-pulse"
        aria-label="Botão de Emergência"
        onClick={() => setIsOpen(true)}
      >
        <PhoneOutgoing className="h-8 w-8" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-destructive">Contatos de Emergência</DialogTitle>
            <DialogDescription className="text-center mt-2">
              Em caso de emergência, ligue para um dos números abaixo. Mantenha a calma e forneça informações claras.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.name} className="flex flex-col items-start p-4 border rounded-lg shadow-sm bg-card">
                <div className="flex items-center gap-3 mb-2">
                  <contact.icon className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <p className="text-2xl font-bold text-accent">{contact.number}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                <Button asChild className="w-full" variant="outline">
                  <a href={`tel:${contact.number}`} aria-label={`Ligar para ${contact.name}: ${contact.number}`}>
                    <PhoneOutgoing className="mr-2 h-4 w-4" /> Ligar para {contact.number}
                  </a>
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
