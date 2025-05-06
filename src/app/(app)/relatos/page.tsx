'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ListChecks, MapPin, CalendarDays, Image as ImageIcon, UserCircle, MessageSquare, ThumbsUp, ThumbsDown, Filter, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from '@/components/ui/textarea'; // Assuming Textarea component exists

// Mock data for reports
interface Report {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  location: string;
  timestamp: string;
  user: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  type: 'Enchente' | 'Deslizamento' | 'Incêndio' | 'Outro';
  upvotes: number;
  comments: number;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Rua Alagada no Bairro X',
    description: 'A rua principal do bairro X está completamente alagada após as chuvas intensas. Carros não conseguem passar e algumas casas foram atingidas. Necessário auxílio urgente.',
    imageUrl: 'https://picsum.photos/seed/flood1/400/300',
    location: 'Bairro X, Cidade Y, Estado Z',
    timestamp: '2024-07-28T14:30:00Z',
    user: 'Maria Silva',
    status: 'Aprovado',
    type: 'Enchente',
    upvotes: 15,
    comments: 3,
  },
  {
    id: '2',
    title: 'Poste caído na Av. Principal',
    description: 'Um poste de energia elétrica caiu na Avenida Principal, bloqueando a via e causando falta de luz na região. Risco de acidentes.',
    imageUrl: 'https://picsum.photos/seed/pole/400/300',
    location: 'Av. Principal, Cidade Y, Estado Z',
    timestamp: '2024-07-28T10:15:00Z',
    user: 'João Souza',
    status: 'Pendente',
    type: 'Outro',
    upvotes: 5,
    comments: 1,
  },
  {
    id: '3',
    title: 'Foco de incêndio em mata próxima',
    description: 'Avistado foco de incêndio em área de mata próxima à rodovia. Chamas se espalhando rapidamente devido ao vento.',
    location: 'Rodovia BR-000, Km 10, Cidade A',
    timestamp: '2024-07-27T18:00:00Z',
    user: 'Carlos Pereira',
    status: 'Aprovado',
    type: 'Incêndio',
    upvotes: 22,
    comments: 5,
  },
  {
    id: '4',
    title: 'Deslizamento de terra em encosta',
    description: 'Parte de uma encosta cedeu atingindo uma residência. Felizmente não há feridos, mas a área está instável.',
    imageUrl: 'https://picsum.photos/seed/landslide1/400/300',
    location: 'Morro da Esperança, Cidade B',
    timestamp: '2024-07-29T08:00:00Z',
    user: 'Ana Costa',
    status: 'Rejeitado', // Example of a rejected report
    type: 'Deslizamento',
    upvotes: 2,
    comments: 0,
  },
];

export default function ReportsListPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // TODO: Add filtering and sorting states

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusBadgeVariant = (status: Report['status']) => {
    switch (status) {
      case 'Aprovado': return 'default'; // Default usually green or primary
      case 'Pendente': return 'secondary'; // Secondary usually blue or gray
      case 'Rejeitado': return 'destructive'; // Destructive usually red
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="h-8 bg-muted rounded w-24"></div>
              <div className="h-6 bg-muted rounded w-16"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
          <ListChecks className="h-8 w-8 mr-3 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Relatos da Comunidade</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filtrar
          </Button>
          <Button asChild>
            <Link href="/relatar">
              <PlusCircle className="mr-2 h-4 w-4" /> Novo Relato
            </Link>
          </Button>
        </div>
      </div>

      {reports.length === 0 ? (
         <Card className="col-span-full flex flex-col items-center justify-center py-12">
           <CardContent className="text-center">
             <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
             <p className="text-xl font-semibold text-muted-foreground">Nenhum relato encontrado.</p>
             <p className="text-muted-foreground mt-2">Seja o primeiro a compartilhar uma ocorrência!</p>
           </CardContent>
         </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              {report.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={report.imageUrl}
                    alt={report.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    data-ai-hint="disaster report image"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl mb-1">{report.title}</CardTitle>
                  <Badge variant={getStatusBadgeVariant(report.status)}>{report.status}</Badge>
                </div>
                <CardDescription className="text-sm text-muted-foreground">Tipo: {report.type}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground line-clamp-3 mb-3">{report.description}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1.5" /> {report.location}
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1.5" /> {new Date(report.timestamp).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center">
                    <UserCircle className="h-3 w-3 mr-1.5" /> {report.user}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="flex gap-3 text-muted-foreground">
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <ThumbsUp className="h-4 w-4 mr-1" /> {report.upvotes}
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <MessageSquare className="h-4 w-4 mr-1" /> {report.comments}
                  </Button>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl">{report.title}</AlertDialogTitle>
                       <div className="flex justify-between items-center text-sm text-muted-foreground pt-1">
                          <span>Tipo: {report.type}</span>
                          <Badge variant={getStatusBadgeVariant(report.status)}>{report.status}</Badge>
                        </div>
                      {report.imageUrl && (
                        <div className="relative h-60 w-full mt-2 rounded-md overflow-hidden">
                          <Image src={report.imageUrl} alt={report.title} layout="fill" objectFit="cover" data-ai-hint="disaster detail image" />
                        </div>
                      )}
                      <AlertDialogDescription className="pt-2 text-base text-foreground">
                        {report.description}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="text-sm text-muted-foreground space-y-1 my-4">
                      <p><MapPin className="inline h-4 w-4 mr-1.5" /> <strong>Local:</strong> {report.location}</p>
                      <p><CalendarDays className="inline h-4 w-4 mr-1.5" /> <strong>Data:</strong> {new Date(report.timestamp).toLocaleString('pt-BR')}</p>
                      <p><UserCircle className="inline h-4 w-4 mr-1.5" /> <strong>Reportado por:</strong> {report.user}</p>
                    </div>
                    
                    {/* Placeholder for moderation if admin/volunteer */}
                    {/* For this example, let's assume admin view */}
                    {report.status === 'Pendente' && (
                      <div className="mt-4 p-4 border rounded-md bg-secondary/30">
                        <h4 className="font-semibold mb-2">Ações de Moderação:</h4>
                        <div className="flex gap-2">
                          <Button size="sm" variant="default">Aprovar</Button>
                          <Button size="sm" variant="destructive">Rejeitar</Button>
                        </div>
                      </div>
                    )}

                    {/* Comment Section Placeholder */}
                    <div className="mt-4">
                        <h4 className="font-semibold mb-2 text-foreground">Comentários ({report.comments})</h4>
                        {/* Placeholder for comments list */}
                        <div className="text-sm text-muted-foreground p-4 border rounded-md bg-muted/50">
                            Em breve: seção de comentários aqui.
                        </div>
                        <Textarea placeholder="Adicionar um comentário..." className="mt-2"/>
                        <Button size="sm" className="mt-2">Enviar Comentário</Button>
                    </div>

                    <AlertDialogFooter className="mt-6">
                      <AlertDialogCancel>Fechar</AlertDialogCancel>
                      {/* <AlertDialogAction>Interagir</AlertDialogAction> */}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
