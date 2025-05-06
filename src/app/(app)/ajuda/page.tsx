'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LifeBuoy, Phone, MessageSquare, Share2, MapPin, Shield, HeartHandshake, PawPrint, Siren } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UsefulContact {
  id: string;
  name: string;
  number: string;
  description: string;
  icon: React.ElementType;
  category: 'Emergência' | 'Apoio' | 'Animais';
}

const usefulContacts: UsefulContact[] = [
  { id: '1', name: 'Polícia Militar', number: '190', description: 'Emergências policiais, crimes.', icon: Shield, category: 'Emergência' },
  { id: '2', name: 'SAMU (Saúde)', number: '192', description: 'Emergências médicas.', icon: Siren, category: 'Emergência' },
  { id: '3', name: 'Corpo de Bombeiros', number: '193', description: 'Incêndios, resgates, desastres.', icon: LifeBuoy, category: 'Emergência' },
  { id: '4', name: 'Defesa Civil', number: '199', description: 'Alertas e ações preventivas em desastres.', icon: Shield, category: 'Emergência' },
  { id: '5', name: 'CVV (Apoio Emocional)', number: '188', description: 'Centro de Valorização da Vida, apoio emocional e prevenção do suicídio.', icon: HeartHandshake, category: 'Apoio' },
  { id: '6', name: 'Disque Denúncia (Violência)', number: '181', description: 'Denúncias anônimas sobre diversos crimes.', icon: MessageSquare, category: 'Apoio' },
  { id: '7', name: 'Delegacia de Proteção Animal (Exemplo SP)', number: '0800-600-6428', description: 'Denúncias de maus-tratos a animais (verificar número local).', icon: PawPrint, category: 'Animais' },
];

export default function HelpCenterPage() {
  const [smsNumber, setSmsNumber] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  const { toast } = useToast();

  const handleShareLocation = () => {
    if (!smsNumber) {
      toast({ title: 'Erro', description: 'Por favor, insira um número de telefone para compartilhar a localização.', variant: 'destructive' });
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          const message = `Estou aqui: ${mapsLink}. ${smsMessage || 'Preciso de ajuda!'}`;
          
          // Construct SMS URI (works on mobile devices)
          const smsUri = `sms:${smsNumber}?body=${encodeURIComponent(message)}`;
          window.location.href = smsUri;

          toast({ title: 'Localização Pronta para Envio', description: 'Seu aplicativo de SMS deve abrir com a mensagem.' });
        },
        (error) => {
          toast({ title: 'Erro de Localização', description: `Não foi possível obter sua localização: ${error.message}. Tente novamente.`, variant: 'destructive' });
        }
      );
    } else {
      toast({ title: 'Geolocalização Indisponível', description: 'Seu navegador não suporta geolocalização.', variant: 'destructive' });
    }
  };

  const copyToClipboard = (text: string, contactName: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Número Copiado!', description: `Número de ${contactName} copiado para a área de transferência.` }))
      .catch(() => toast({ title: 'Erro ao Copiar', description: 'Não foi possível copiar o número.', variant: 'destructive' }));
  };

  const filterContactsByCategory = (category: UsefulContact['category']) => {
    return usefulContacts.filter(contact => contact.category === category);
  }

  return (
    <div className="p-4 md:p-6">
      <header className="flex items-center mb-8">
        <LifeBuoy className="h-10 w-10 mr-4 text-primary" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Central de Ajuda</h1>
          <p className="text-lg text-muted-foreground mt-1">Telefones úteis e compartilhamento de localização em emergências.</p>
        </div>
      </header>

      {/* Useful Contacts Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Telefones Úteis</h2>
        
        {['Emergência', 'Apoio', 'Animais'].map(category => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary border-b pb-2">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterContactsByCategory(category as UsefulContact['category']).map(contact => (
                <Card key={contact.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                    <contact.icon className="h-8 w-8 text-accent" />
                    <div>
                      <CardTitle className="text-xl">{contact.name}</CardTitle>
                      <p className="text-2xl font-bold text-foreground mt-1">{contact.number}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <p className="text-sm text-muted-foreground mb-3 min-h-[40px]">{contact.description}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button asChild className="flex-1" variant="default">
                      <a href={`tel:${contact.number}`} aria-label={`Ligar para ${contact.name}: ${contact.number}`}>
                        <Phone className="mr-2 h-4 w-4" /> Ligar
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => copyToClipboard(contact.number, contact.name)}
                    >
                      Copiar Número
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Share Location Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Compartilhar Localização via SMS</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><MapPin className="mr-2 h-6 w-6 text-primary"/> Enviar minha localização</CardTitle>
            <CardDescription>
              Em caso de emergência, envie sua localização atual para um contato via SMS.
              Este recurso utiliza o aplicativo de SMS padrão do seu celular.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="smsNumber" className="text-base">Número de Telefone do Contato (com DDD)</Label>
              <Input
                id="smsNumber"
                type="tel"
                placeholder="Ex: 21999998888"
                value={smsNumber}
                onChange={(e) => setSmsNumber(e.target.value)}
                className="mt-1 text-base p-3"
              />
            </div>
            <div>
              <Label htmlFor="smsMessage" className="text-base">Mensagem Adicional (Opcional)</Label>
              <Input
                id="smsMessage"
                type="text"
                placeholder="Ex: Preciso de ajuda urgente!"
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                className="mt-1 text-base p-3"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleShareLocation} className="w-full text-lg p-6" size="lg">
              <Share2 className="mr-2 h-5 w-5" /> Compartilhar Localização
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
