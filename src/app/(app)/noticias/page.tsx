'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Search, Leaf, ShieldAlert, Send, Eye, MessageCircle } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: 'Sustentabilidade' | 'Mudanças Climáticas' | 'Dicas de Sobrevivência' | 'Notícias Locais';
  date: string;
  source: string; // e.g., 'Fonte: ClimAssist News' or 'Fonte: Agência Brasil'
  views: number;
  comments: number;
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: '5 Maneiras de Reduzir sua Pegada de Carbono em Casa',
    summary: 'Descubra dicas práticas para tornar sua casa mais sustentável e ajudar o meio ambiente no dia a dia.',
    imageUrl: 'https://picsum.photos/seed/sustainability1/400/250',
    category: 'Sustentabilidade',
    date: '2024-07-25',
    source: 'ClimAssist News',
    views: 1250,
    comments: 15
  },
  {
    id: '2',
    title: 'Impacto das Mudanças Climáticas no Litoral Brasileiro',
    summary: 'Estudo recente revela os principais riscos e desafios para as cidades costeiras do Brasil nos próximos anos.',
    imageUrl: 'https://picsum.photos/seed/climatechange1/400/250',
    category: 'Mudanças Climáticas',
    date: '2024-07-22',
    source: 'Instituto Clima e Sociedade',
    views: 2300,
    comments: 42
  },
  {
    id: '3',
    title: 'Kit de Emergência Essencial: O que Não Pode Faltar',
    summary: 'Prepare-se para qualquer eventualidade. Saiba quais itens são cruciais para seu kit de sobrevivência.',
    imageUrl: 'https://picsum.photos/seed/survival1/400/250',
    category: 'Dicas de Sobrevivência',
    date: '2024-07-18',
    source: 'Defesa Civil Nacional',
    views: 3100,
    comments: 28
  },
   {
    id: '4',
    title: 'Alerta de Chuvas Intensas para a Região Sudeste',
    summary: 'Meteorologistas preveem acumulados significativos de chuva para os próximos dias. Fique atento aos comunicados da Defesa Civil.',
    imageUrl: 'https://picsum.photos/seed/localnews1/400/250',
    category: 'Notícias Locais',
    date: '2024-07-29',
    source: 'CEMADEN',
    views: 980,
    comments: 8
  },
];

export default function BlogNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [crimeReportDescription, setCrimeReportDescription] = useState('');
  const [crimeReportLocation, setCrimeReportLocation] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      setArticles(mockArticles);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCrimeReportSubmit = () => {
    if (!crimeReportDescription.trim() || !crimeReportLocation.trim()) {
        toast({
            title: "Erro na Denúncia",
            description: "Por favor, preencha a descrição e a localização do crime ambiental.",
            variant: "destructive",
        });
        return;
    }
    // Simulate API call for anonymous encrypted report
    console.log("Crime Report Submitted (encrypted):", { description: crimeReportDescription, location: crimeReportLocation });
    toast({
        title: "Denúncia Enviada",
        description: "Sua denúncia anônima foi enviada com segurança. Obrigado por sua colaboração.",
    });
    setCrimeReportDescription('');
    setCrimeReportLocation('');
  };

  const getCategoryBadgeVariant = (category: Article['category']) => {
    switch (category) {
      case 'Sustentabilidade': return 'default'; // Usually green
      case 'Mudanças Climáticas': return 'destructive'; // Usually red/orange for alert
      case 'Dicas de Sobrevivência': return 'secondary'; // Usually blue/gray
      case 'Notícias Locais': return 'outline'; // Neutral
      default: return 'outline';
    }
  };


  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="h-10 bg-muted rounded w-1/2 mb-8 animate-pulse"></div>
        <div className="mb-6 h-12 bg-muted rounded w-full animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="h-40 bg-muted rounded-t-lg"></div>
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-12 bg-muted rounded"></div>
              </CardContent>
              <CardFooter>
                <div className="h-8 bg-muted rounded w-24"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center">
          <Newspaper className="h-10 w-10 mr-4 text-primary" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Blog & Notícias</h1>
            <p className="text-lg text-muted-foreground mt-1">Mantenha-se informado sobre sustentabilidade, clima e dicas úteis.</p>
          </div>
        </div>
         <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="bg-accent hover:bg-accent/90">
              <ShieldAlert className="mr-2 h-5 w-5" /> Denunciar Crime Ambiental
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">Denúncia Anônima de Crime Ambiental</AlertDialogTitle>
              <AlertDialogDescription className="mt-2">
                Sua denúncia é importante e será tratada com sigilo. Forneça o máximo de detalhes possível.
                Lembre-se: esta denúncia é criptografada para sua segurança.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="crime-description">Descrição do Crime</Label>
                <Textarea
                  id="crime-description"
                  placeholder="Ex: Desmatamento ilegal, descarte irregular de lixo, pesca predatória..."
                  value={crimeReportDescription}
                  onChange={(e) => setCrimeReportDescription(e.target.value)}
                  className="min-h-[100px] mt-1"
                />
              </div>
              <div>
                <Label htmlFor="crime-location">Localização (O mais preciso possível)</Label>
                <Input
                  id="crime-location"
                  placeholder="Ex: Próximo ao Rio Verde, coordenadas, ponto de referência..."
                  value={crimeReportLocation}
                  onChange={(e) => setCrimeReportLocation(e.target.value)}
                  className="mt-1"
                />
              </div>
              {/* Add optional file upload for evidence here if feasible and secure */}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleCrimeReportSubmit} className="bg-accent hover:bg-accent/80">
                <Send className="mr-2 h-4 w-4" /> Enviar Denúncia
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      <div className="mb-8 relative">
        <Input
          type="search"
          placeholder="Buscar artigos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 text-base p-3 pr-4"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      {filteredArticles.length === 0 ? (
        <Card className="col-span-full flex flex-col items-center justify-center py-12">
           <CardContent className="text-center">
             <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
             <p className="text-xl font-semibold text-muted-foreground">Nenhum artigo encontrado.</p>
             <p className="text-muted-foreground mt-2">Tente um termo de busca diferente ou verifique mais tarde.</p>
           </CardContent>
         </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {filteredArticles.map(article => (
            <Card key={article.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="relative h-48 w-full">
                 <Image
                    src={article.imageUrl}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="article blog news"
                  />
                  <Badge variant={getCategoryBadgeVariant(article.category)} className="absolute top-3 right-3">{article.category}</Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl leading-tight line-clamp-2 hover:text-primary transition-colors">
                  <Link href={`/noticias/${article.id}`}>{article.title}</Link>
                </CardTitle>
                 <p className="text-xs text-muted-foreground pt-1">{new Date(article.date).toLocaleDateString('pt-BR')} - {article.source}</p>
              </CardHeader>
              <CardContent className="flex-grow pb-4">
                <p className="text-sm text-foreground line-clamp-3">{article.summary}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-xs text-muted-foreground border-t pt-3">
                <div className="flex items-center gap-3">
                    <span className="flex items-center"><Eye className="h-3.5 w-3.5 mr-1"/> {article.views}</span>
                    <span className="flex items-center"><MessageCircle className="h-3.5 w-3.5 mr-1"/> {article.comments}</span>
                </div>
                <Link href={`/noticias/${article.id}`} className="text-primary hover:underline font-medium">
                  Leia mais <span aria-hidden="true">&rarr;</span>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

        {/* Placeholder for "Featured" or "Most Read" section */}
        <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Destaques <Leaf className="inline h-6 w-6 text-primary ml-1"/></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Example featured articles - can be dynamic later */}
                {mockArticles.slice(0,2).map(article => (
                     <Card key={`featured-${article.id}`} className="flex items-start gap-4 p-4 shadow-sm hover:bg-muted/30 transition-colors">
                         <Image src={article.imageUrl} alt={article.title} width={100} height={100} className="rounded-md object-cover aspect-square" data-ai-hint="featured article"/>
                         <div>
                             <Badge variant={getCategoryBadgeVariant(article.category)} className="mb-1 text-xs">{article.category}</Badge>
                             <h3 className="font-semibold text-md line-clamp-2 hover:text-primary"><Link href={`/noticias/${article.id}`}>{article.title}</Link></h3>
                             <p className="text-xs text-muted-foreground mt-1">{new Date(article.date).toLocaleDateString('pt-BR')}</p>
                         </div>
                     </Card>
                ))}
            </div>
        </div>

    </div>
  );
}
