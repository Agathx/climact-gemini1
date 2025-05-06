'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCircle, ListChecks, Award, Settings, Edit3, BarChart3, Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock Data
interface UserReport {
  id: string;
  title: string;
  date: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  type: string;
}

const mockUserReports: UserReport[] = [
  { id: 'r1', title: 'Alagamento na Rua das Palmeiras', date: '2024-07-25', status: 'Aprovado', type: 'Enchente' },
  { id: 'r2', title: 'Árvore caída bloqueando via', date: '2024-07-20', status: 'Pendente', type: 'Outro' },
  { id: 'r3', title: 'Falta de água no bairro Industrial', date: '2024-06-15', status: 'Rejeitado', type: 'Seca' },
];

interface CompletedTrail {
  id: string;
  title: string;
  dateCompleted: string;
  certificateUrl?: string; // URL to download certificate
  badgeIcon: React.ElementType; // Icon for the badge
}

const mockCompletedTrails: CompletedTrail[] = [
  { id: 't1', title: 'Prevenção e Ação em Enchentes', dateCompleted: '2024-07-01', certificateUrl: '#', badgeIcon: Award },
  { id: 't2', title: 'Primeiros Socorros Básicos', dateCompleted: '2024-06-20', badgeIcon: Award },
];

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  profilePictureUrl?: string; // Optional profile picture
  location: string;
  age: number;
}

const mockUserProfile: UserProfile = {
  name: 'Usuário Exemplo',
  email: 'usuario@exemplo.com',
  joinDate: '2024-05-01',
  profilePictureUrl: 'https://picsum.photos/seed/user1/200/200', // Placeholder
  location: 'Rio de Janeiro, RJ',
  age: 30,
};


export default function UserDashboardPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userReports, setUserReports] = useState<UserReport[]>([]);
  const [completedTrails, setCompletedTrails] = useState<CompletedTrail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setUserProfile(mockUserProfile);
      setUserReports(mockUserReports);
      setCompletedTrails(mockCompletedTrails);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: UserReport['status']) => {
    switch (status) {
      case 'Aprovado': return 'text-green-600';
      case 'Pendente': return 'text-yellow-600';
      case 'Rejeitado': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
         {/* Skeleton for Profile Card */}
        <Card className="animate-pulse">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-muted"></div>
            <div>
              <div className="h-6 bg-muted rounded w-48 mb-2"></div>
              <div className="h-4 bg-muted rounded w-64"></div>
            </div>
          </CardHeader>
        </Card>
        {/* Skeleton for Tabs */}
        <Card className="animate-pulse">
          <CardHeader><div className="h-8 bg-muted rounded w-1/3"></div></CardHeader>
          <CardContent>
            <div className="h-10 bg-muted rounded w-full mb-4"></div>
            <div className="h-20 bg-muted rounded w-full"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userProfile) {
    // Handle case where user data couldn't be loaded, or redirect to login
    return (
      <div className="p-4 md:p-6 text-center">
        <p>Erro ao carregar dados do usuário. Por favor, <Link href="/auth/login" className="text-primary underline">faça login</Link> novamente.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-2">
        <div className="flex items-center">
            <UserCircle className="h-10 w-10 mr-3 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Painel do Usuário</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/configuracoes">
            <Settings className="mr-2 h-4 w-4" /> Configurações
          </Link>
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-primary/5 via-background to-background">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            <Image
              src={userProfile.profilePictureUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=random&size=128`}
              alt={`Foto de ${userProfile.name}`}
              width={112}
              height={112}
              className="rounded-full border-4 border-primary/50 shadow-md"
              data-ai-hint="user avatar"
            />
          </div>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold text-primary">{userProfile.name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-1">{userProfile.email}</CardDescription>
            <p className="text-sm text-muted-foreground mt-2">Membro desde: {new Date(userProfile.joinDate).toLocaleDateString('pt-BR')}</p>
            <p className="text-sm text-muted-foreground">Localidade: {userProfile.location} | Idade: {userProfile.age} anos</p>
          </div>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 sm:static sm:ml-auto">
            <Edit3 className="h-5 w-5" />
            <span className="sr-only">Editar Perfil</span>
          </Button>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-4">
          <TabsTrigger value="reports" className="py-3"><ListChecks className="mr-2 h-5 w-5" />Meus Relatos</TabsTrigger>
          <TabsTrigger value="trails" className="py-3"><Award className="mr-2 h-5 w-5" />Minhas Trilhas</TabsTrigger>
          <TabsTrigger value="stats" className="py-3 md:hidden_"><BarChart3 className="mr-2 h-5 w-5"/>Estatísticas (Em breve)</TabsTrigger> {/* Hidden on md for 2-col layout */}
        </TabsList>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Relatos Enviados</CardTitle>
              <CardDescription>Acompanhe o status dos seus relatos e suas contribuições.</CardDescription>
            </CardHeader>
            <CardContent>
              {userReports.length > 0 ? (
                <ul className="space-y-4">
                  {userReports.map(report => (
                    <li key={report.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h3 className="font-semibold text-lg">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">Tipo: {report.type} | Data: {new Date(report.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <p className={`font-medium mt-2 sm:mt-0 text-sm px-3 py-1 rounded-full ${getStatusColor(report.status)} bg-${getStatusColor(report.status).replace('text-', '')}/10`}>
                        Status: {report.status}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-8">Você ainda não enviou nenhum relato.</p>
              )}
            </CardContent>
             <CardFooter>
                <Button asChild variant="default">
                    <Link href="/relatar">
                        <ListChecks className="mr-2 h-4 w-4" /> Novo Relato
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="trails">
          <Card>
            <CardHeader>
              <CardTitle>Trilhas Educacionais Concluídas</CardTitle>
              <CardDescription>Veja seus certificados e medalhas conquistadas.</CardDescription>
            </CardHeader>
            <CardContent>
              {completedTrails.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedTrails.map(trail => (
                    <Card key={trail.id} className="p-4 text-center bg-secondary/20 hover:shadow-md transition-shadow">
                      <trail.badgeIcon className="h-16 w-16 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold text-md mb-1">{trail.title}</h3>
                      <p className="text-xs text-muted-foreground">Concluído em: {new Date(trail.dateCompleted).toLocaleDateString('pt-BR')}</p>
                      {trail.certificateUrl && (
                        <Button asChild variant="link" size="sm" className="mt-2">
                          <a href={trail.certificateUrl} target="_blank" rel="noopener noreferrer">Ver Certificado</a>
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Você ainda não completou nenhuma trilha.</p>
              )}
            </CardContent>
             <CardFooter>
                <Button asChild variant="default">
                    <Link href="/educacional">
                        <Award className="mr-2 h-4 w-4" /> Ver Trilhas
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Suas Estatísticas e Impacto</CardTitle>
              <CardDescription>Veja como suas contribuições estão ajudando a comunidade (em breve).</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4"/>
              <p className="text-muted-foreground">Funcionalidade em desenvolvimento. Volte em breve!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

       <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center"><Bell className="mr-2 h-6 w-6 text-primary"/> Configurações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="notifications" className="text-base">Notificações de Alerta</Label>
              <Link href="/configuracoes#notificacoes" className="text-sm text-primary hover:underline">Gerenciar</Link>
           </div>
           <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="language" className="text-base">Idioma</Label>
              <Link href="/configuracoes#idioma" className="text-sm text-primary hover:underline">Mudar Idioma</Link>
           </div>
        </CardContent>
      </Card>

    </div>
  );
}
