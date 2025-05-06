
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, BookOpen, Brain, Award, ChevronRight, X, Lightbulb, AlertTriangle, GraduationCap } from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from 'next/image';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface TrailModule {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  estimatedTime: string;
  contentPages: { title: string; content: string | React.ReactNode; type: 'text' | 'image' | 'video_embed', dataAiHint?: string }[];
  quiz: QuizQuestion[];
  reward: string; // e.g., 'Medalha de Preparo para Enchentes'
  isCompleted?: boolean; // To be fetched from user data
  progress?: number; // 0-100
}

// Placeholder icons if lucide-react doesn't have them
const Waves = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cn("h-6 w-6", className)}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM7.5 12c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5S7.5 14.48 7.5 12zm2.5-0.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-4 4c1.38 0 2.5-1.12 2.5-2.5S8.38 11 7 11s-2.5 1.12-2.5 2.5S5.62 16 7 16zm10 0c1.38 0 2.5-1.12 2.5-2.5S18.38 11 17 11s-2.5 1.12-2.5 2.5.92 2.5 2.5 2.5zM12 6.5c-1.38 0-2.5 1.12-2.5 2.5S10.62 11.5 12 11.5s2.5-1.12 2.5-2.5S13.38 6.5 12 6.5z"/>
  </svg>
); // Simple wave icon
import { cn } from "@/lib/utils" // Ensure cn is imported for Waves icon

const mockModules: TrailModule[] = [
  {
    id: 'flood-prep',
    title: 'Prevenção e Ação em Enchentes',
    description: 'Aprenda como se preparar, agir durante e se recuperar de enchentes e alagamentos.',
    icon: Waves, 
    estimatedTime: '45 min',
    contentPages: [
      { title: 'O que Causa Enchentes?', content: 'Enchentes são causadas por chuvas intensas, transbordamento de rios, rompimento de barragens ou sistemas de drenagem ineficientes...', type: 'text' },
      { title: 'Antes da Enchente', content: 'Tenha um kit de emergência, conheça rotas de fuga, eleve móveis e eletrodomésticos...', type: 'text' },
      { title: 'Durante a Enchente', content: 'Evite áreas alagadas, desligue a energia, procure locais seguros e elevados...', type: 'text' },
      { title: 'Imagem: Kit de Emergência', content: 'https://picsum.photos/seed/kit/600/400', type: 'image', dataAiHint: 'emergency kit' },
      { title: 'Após a Enchente', content: 'Cuidado com água contaminada, verifique a estrutura da casa, limpe e desinfete tudo...', type: 'text' },
    ],
    quiz: [
      { id: 'q1', question: 'Qual a primeira ação ao perceber risco de enchente em casa?', options: ['Salvar os móveis', 'Desligar a energia elétrica', 'Ligar para os bombeiros'], correctAnswer: 'Desligar a energia elétrica', explanation: 'Desligar a energia elétrica previne choques e curtos-circuitos, que são riscos imediatos em enchentes.' },
      { id: 'q2', question: 'O que NÃO se deve fazer durante uma enchente?', options: ['Atravessar áreas alagadas a pé ou de carro', 'Procurar abrigo em local elevado', 'Acompanhar notícias e alertas oficiais'], correctAnswer: 'Atravessar áreas alagadas a pé ou de carro', explanation: 'Águas de enchente podem esconder buracos, detritos e ter correntezas fortes, além de estarem contaminadas.' },
    ],
    reward: 'Medalha de Especialista em Enchentes',
    isCompleted: false,
    progress: 0,
  },
  {
    id: 'landslide-safety',
    title: 'Segurança em Deslizamentos',
    description: 'Identifique sinais de risco, saiba como agir e o que fazer após um deslizamento de terra.',
    icon: AlertTriangle,
    estimatedTime: '30 min',
    contentPages: [
      { title: 'Sinais de Risco', content: 'Rachaduras em paredes, inclinação de árvores/postes, água barrenta são sinais de alerta...', type: 'text' },
      { title: 'Evitando Áreas de Risco', content: 'Não construa em encostas íngremes, mantenha a vegetação nativa...', type: 'text' },
    ],
    quiz: [
      { id: 'q1', question: 'Qual destes é um sinal de risco de deslizamento?', options: ['Chuva fraca e contínua', 'Aparecimento de rachaduras no solo ou paredes', 'Vento forte'], correctAnswer: 'Aparecimento de rachaduras no solo ou paredes', explanation: 'Rachaduras indicam movimentação do solo, um precursor comum de deslizamentos.' },
    ],
    reward: 'Certificado de Vigilância em Encostas',
    isCompleted: true,
    progress: 100,
  },
  // Add more modules
];

export default function EducationalTrailsPage() {
  const [modules, setModules] = useState<TrailModule[]>(mockModules);
  const [selectedModule, setSelectedModule] = useState<TrailModule | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [showQuizExplanation, setShowQuizExplanation] = useState<Record<string, boolean>>({});


  const startModule = (module: TrailModule) => {
    setSelectedModule(module);
    setCurrentPage(0);
    setQuizAnswers({});
    setQuizScore(null);
    setShowQuizExplanation({});
  };

  const nextPage = () => {
    if (selectedModule && currentPage < selectedModule.contentPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (selectedModule && currentPage === selectedModule.contentPages.length -1) {
      // Reached end of content, go to quiz
      setCurrentPage(selectedModule.contentPages.length);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const submitQuiz = () => {
    if (!selectedModule) return;
    let score = 0;
    const newShowExplanations: Record<string, boolean> = {};
    selectedModule.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score++;
      }
      newShowExplanations[q.id] = true; // Show all explanations after submission
    });
    setQuizScore(score);
    setShowQuizExplanation(newShowExplanations);

    // Update module completion status (mock)
    if(score / selectedModule.quiz.length >= 0.7) { // Example: 70% to pass
        const updatedModules = modules.map(m => m.id === selectedModule.id ? {...m, isCompleted: true, progress: 100} : m);
        setModules(updatedModules);
    }
  };
  
  const resetModule = () => {
    setSelectedModule(null);
    setCurrentPage(0);
    setQuizAnswers({});
    setQuizScore(null);
    setShowQuizExplanation({});
  };

  if (selectedModule) {
    const currentContent = selectedModule.contentPages[currentPage];
    const isQuizPage = currentPage === selectedModule.contentPages.length;

    return (
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <selectedModule.icon className="h-8 w-8 mr-3 text-primary" />
              <CardTitle className="text-2xl">{selectedModule.title}</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={resetModule} aria-label="Fechar módulo">
              <X className="h-6 w-6" />
            </Button>
          </div>
          {!isQuizPage && currentContent && <CardDescription className="mt-1">{currentContent.title} (Página {currentPage + 1}/{selectedModule.contentPages.length})</CardDescription>}
          {isQuizPage && <CardDescription className="mt-1">Quiz Final</CardDescription>}
        </CardHeader>
        <CardContent className="p-6 min-h-[300px]">
          {!isQuizPage && currentContent && (
            <div>
              {currentContent.type === 'text' && <p className="text-lg leading-relaxed">{currentContent.content}</p>}
              {currentContent.type === 'image' && typeof currentContent.content === 'string' && (
                <Image 
                  src={currentContent.content} 
                  alt={currentContent.title} 
                  width={600} height={400} 
                  className="rounded-md shadow-sm mx-auto" 
                  data-ai-hint={selectedModule.contentPages[currentPage].dataAiHint || 'educational content'}
                />
              )}
              {/* Add video embed handling here */}
            </div>
          )}
          {isQuizPage && (
            <div className="space-y-6">
              {selectedModule.quiz.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-lg shadow-sm bg-muted/30">
                  <p className="font-semibold text-lg mb-3">{index + 1}. {q.question}</p>
                  <RadioGroup 
                    onValueChange={(value) => handleQuizAnswer(q.id, value)} 
                    value={quizAnswers[q.id]}
                    className="space-y-2"
                    disabled={quizScore !== null}
                  >
                    {q.options.map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                        <Label htmlFor={`${q.id}-${opt}`} className="text-base font-normal">{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {quizScore !== null && showQuizExplanation[q.id] && (
                    <div className={`mt-3 p-3 rounded-md text-sm ${quizAnswers[q.id] === q.correctAnswer ? 'bg-green-100 dark:bg-green-900 border-green-500' : 'bg-red-100 dark:bg-red-900 border-red-500'} border`}>
                      <p className="font-semibold">
                        {quizAnswers[q.id] === q.correctAnswer ? 'Correto!' : 'Incorreto.'}
                        {quizAnswers[q.id] !== q.correctAnswer && ` A resposta correta é: ${q.correctAnswer}`}
                      </p>
                      {q.explanation && <p className="mt-1">{q.explanation}</p>}
                    </div>
                  )}
                </div>
              ))}
              {quizScore !== null ? (
                <div className="text-center p-4 border rounded-lg bg-primary/10">
                  <h3 className="text-2xl font-bold text-primary">Quiz Concluído!</h3>
                  <p className="text-xl mt-2">Sua pontuação: {quizScore} de {selectedModule.quiz.length}</p>
                  {(quizScore / selectedModule.quiz.length >= 0.7) && (
                     <div className="mt-3 flex items-center justify-center text-green-600">
                        <Award className="h-6 w-6 mr-2"/> 
                        <p className="font-semibold">Parabéns! Você ganhou: {selectedModule.reward}</p>
                     </div>
                  )}
                   {(quizScore / selectedModule.quiz.length < 0.7) && (
                     <p className="mt-3 text-accent font-semibold">Você precisa acertar mais questões para ganhar a recompensa. Tente novamente!</p>
                  )}
                </div>
              ) : (
                <Button onClick={submitQuiz} className="w-full" size="lg">Enviar Respostas</Button>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-6 border-t">
          <Button variant="outline" onClick={prevPage} disabled={currentPage === 0}>Anterior</Button>
          {isQuizPage ? (
             <Button onClick={resetModule}>Voltar aos Módulos</Button>
          ) : (
            <Button onClick={nextPage}>
              {currentPage === selectedModule.contentPages.length - 1 ? 'Ir para o Quiz' : 'Próximo'} <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center mb-8">
        <GraduationCap className="h-10 w-10 mr-4 text-primary" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Trilhas Educacionais</h1>
          <p className="text-lg text-muted-foreground mt-1">Aprenda como se proteger e agir em diversas situações de risco.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map(module => (
          <Card key={module.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center mb-3">
                <module.icon className="h-10 w-10 mr-3 text-primary" />
                <CardTitle className="text-xl">{module.title}</CardTitle>
              </div>
              <CardDescription className="h-16 line-clamp-3">{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground mb-1">Tempo estimado: {module.estimatedTime}</div>
              {module.isCompleted ? (
                <div className="flex items-center text-green-600 font-semibold mt-2">
                  <CheckCircle className="h-5 w-5 mr-2" /> Concluído!
                </div>
              ) : (
                <div className="mt-2">
                  <Progress value={module.progress || 0} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{module.progress || 0}% completo</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => startModule(module)} className="w-full" disabled={module.isCompleted}>
                {module.isCompleted ? 'Revisar Módulo' : 'Iniciar Módulo'}
              </Button>
            </CardFooter>
          </Card>
        ))}
         {/* Placeholder for new modules or coming soon */}
        <Card className="flex flex-col items-center justify-center shadow-lg border-dashed border-2 p-6 text-center bg-muted/30 hover:border-primary transition-colors">
            <Lightbulb className="h-12 w-12 text-primary mb-4"/>
            <CardTitle className="text-xl mb-2">Novas Trilhas em Breve!</CardTitle>
            <CardDescription>Estamos preparando mais conteúdo educativo para você. Fique de olho!</CardDescription>
        </Card>
      </div>
    </div>
  );
}
