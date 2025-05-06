'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Filter, List, Layers, AlertTriangle, Zap, ThermometerSun, Waves } from 'lucide-react';
import Image from 'next/image';

// Mock data for disaster types and alerts
const disasterTypes = [
  { id: 'all', name: 'Todos os Tipos', icon: Layers },
  { id: 'flood', name: 'Enchente', icon: Waves },
  { id: 'landslide', name: 'Deslizamento', icon: AlertTriangle },
  { id: 'heatwave', name: 'Calor Extremo', icon: ThermometerSun },
  { id: 'storm', name: 'Tempestade', icon: Zap },
];

interface Alert {
  id: string;
  type: string;
  title: string;
  location: string;
  coordinates: { lat: number; lng: number };
  severity: 'Baixa' | 'Média' | 'Alta';
  timestamp: string;
  description: string;
}

const mockAlerts: Alert[] = [
  { id: '1', type: 'flood', title: 'Alagamento na Zona Sul', location: 'Rio de Janeiro, RJ', coordinates: { lat: -22.9068, lng: -43.1729 }, severity: 'Alta', timestamp: '2024-07-28T10:00:00Z', description: 'Fortes chuvas causaram alagamentos em diversas ruas da Zona Sul. Evite a região.' },
  { id: '2', type: 'landslide', title: 'Risco de Deslizamento', location: 'Petrópolis, RJ', coordinates: { lat: -22.5051, lng: -43.1794 }, severity: 'Média', timestamp: '2024-07-28T11:30:00Z', description: 'Solo instável devido às chuvas. Sirenes foram acionadas em áreas de risco.' },
  { id: '3', type: 'heatwave', title: 'Onda de Calor Intenso', location: 'Cuiabá, MT', coordinates: { lat: -15.6014, lng: -56.0979 }, severity: 'Alta', timestamp: '2024-07-27T14:00:00Z', description: 'Temperaturas acima de 40°C. Hidrate-se e evite exposição ao sol.' },
  { id: '4', type: 'flood', title: 'Cheia do Rio Tietê', location: 'São Paulo, SP', coordinates: { lat: -23.5505, lng: -46.6333 }, severity: 'Média', timestamp: '2024-07-28T09:15:00Z', description: 'Nível do rio subindo rapidamente. Alerta para áreas ribeirinhas.' },
];


export default function AlertMapPage() {
  const [selectedDisasterType, setSelectedDisasterType] = useState('all');
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false); // Placeholder for map SDK loading

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedDisasterType === 'all') {
      setFilteredAlerts(mockAlerts);
    } else {
      setFilteredAlerts(mockAlerts.filter(alert => alert.type === selectedDisasterType));
    }
    setSelectedAlert(null); // Clear selected alert when filter changes
  }, [selectedDisasterType]);

  const handleMarkerClick = (alert: Alert) => {
    setSelectedAlert(alert);
  };

  const getDisasterIcon = (type: string) => {
    const disaster = disasterTypes.find(dt => dt.id === type);
    return disaster ? disaster.icon : AlertTriangle;
  };

  return (
    <div className="flex flex-col h-full gap-4 md:flex-row p-4">
      {/* Map Area */}
      <Card className="flex-grow md:w-2/3 shadow-lg relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <CardTitle className="text-xl flex items-center"><MapPin className="mr-2 h-6 w-6 text-primary" /> Mapa de Alertas Ativos</CardTitle>
          {/* Placeholder for future map layer controls or search */}
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-70px)]"> {/* Adjust height considering header */}
          {!mapLoaded ? (
            <div className="flex items-center justify-center h-full bg-muted/50">
              <p className="text-muted-foreground text-lg">Carregando mapa...</p>
            </div>
          ) : (
            <div className="w-full h-full bg-muted relative">
              {/* Placeholder for Map SDK Integration (e.g., Mapbox, Google Maps) */}
              <Image 
                src="https://picsum.photos/seed/map/1200/800" 
                alt="Mapa com alertas de desastres" 
                layout="fill"
                objectFit="cover"
                data-ai-hint="map disaster"
              />
              {/* Render mock markers */}
              {filteredAlerts.map(alert => {
                const Icon = getDisasterIcon(alert.type);
                // Position markers randomly for mock display. In a real map, use alert.coordinates
                const randomTop = `${Math.random() * 80 + 10}%`;
                const randomLeft = `${Math.random() * 80 + 10}%`;
                return (
                  <Button
                    key={alert.id}
                    variant="ghost"
                    size="icon"
                    className={`absolute p-1 rounded-full shadow-md 
                                ${alert.severity === 'Alta' ? 'bg-destructive hover:bg-destructive/90' : 
                                 alert.severity === 'Média' ? 'bg-accent hover:bg-accent/90' : 
                                 'bg-primary hover:bg-primary/90'} text-white`}
                    style={{ top: randomTop, left: randomLeft, transform: 'translate(-50%, -50%)' }}
                    onClick={() => handleMarkerClick(alert)}
                    aria-label={`Alerta: ${alert.title}`}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sidebar / Info Panel */}
      <div className="md:w-1/3 flex flex-col gap-4">
        <Card className="shadow-md">
          <CardHeader className="p-4 border-b">
            <CardTitle className="text-lg flex items-center"><Filter className="mr-2 h-5 w-5 text-primary"/> Filtros</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Select value={selectedDisasterType} onValueChange={setSelectedDisasterType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de Desastre" />
              </SelectTrigger>
              <SelectContent>
                {disasterTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center">
                      <type.icon className="mr-2 h-4 w-4" />
                      {type.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedAlert ? (
          <Card className="shadow-md flex-grow overflow-y-auto">
            <CardHeader className="p-4 border-b bg-card sticky top-0 z-10">
              <CardTitle className="text-lg flex items-center">
                {React.createElement(getDisasterIcon(selectedAlert.type), { className: "mr-2 h-5 w-5 text-primary" })}
                Detalhes do Alerta
              </CardTitle>
              <CardDescription>{selectedAlert.title}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <p><strong>Localização:</strong> {selectedAlert.location}</p>
              <p><strong>Severidade:</strong> <span className={`${
                selectedAlert.severity === 'Alta' ? 'text-destructive' :
                selectedAlert.severity === 'Média' ? 'text-accent' :
                'text-primary'
              } font-semibold`}>{selectedAlert.severity}</span></p>
              <p><strong>Horário:</strong> {new Date(selectedAlert.timestamp).toLocaleString('pt-BR')}</p>
              <p><strong>Descrição:</strong> {selectedAlert.description}</p>
              <Button className="w-full mt-2">
                Ver Mais Informações
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md flex-grow flex items-center justify-center bg-muted/30">
            <CardContent className="text-center p-4">
              <List className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                {filteredAlerts.length > 0 ? 'Selecione um alerta no mapa para ver os detalhes.' : 'Nenhum alerta encontrado para o filtro selecionado.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
