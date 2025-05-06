import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, Map, LifeBuoy, AlertTriangle, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-28 relative bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/60 text-primary-foreground">
        <Image
          src="https://picsum.photos/1600/900"
          alt="Comunidade unida em ação climática"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
          data-ai-hint="community resilient climate"
          priority
        />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            ClimAssist
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 sm:text-xl md:text-2xl">
            Sua plataforma de resiliência, ação comunitária e resposta emergencial para riscos climáticos no Brasil.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-8 py-4 text-lg">
              <Link href="/relatar">
                <Megaphone className="mr-2 h-5 w-5" /> Relatar Desastre
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 shadow-lg px-8 py-4 text-lg">
              <Link href="/mapa-alertas">
                <Map className="mr-2 h-5 w-5" /> Ver Alertas
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 shadow-lg px-8 py-4 text-lg">
              <Link href="/ajuda">
                <LifeBuoy className="mr-2 h-5 w-5" /> Pedir Ajuda
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl">
            Como o ClimAssist Pode Ajudar
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Ferramentas e informações para você se preparar, agir e se recuperar de eventos climáticos.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={AlertTriangle}
              title="Alertas em Tempo Real"
              description="Receba notificações sobre enchentes, deslizamentos, ondas de calor e outros riscos na sua região."
              actionHref="/mapa-alertas"
              actionLabel="Ver Mapa de Alertas"
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Relatos Comunitários"
              description="Informe sobre ocorrências, ajude a mapear áreas de risco e contribua para a segurança de todos."
              actionHref="/relatar"
              actionLabel="Fazer um Relato"
            />
            <FeatureCard
              icon={Users}
              title="Ação Comunitária"
              description="Conecte-se com ONGs, voluntários e centros de apoio. Encontre ou ofereça ajuda."
              actionHref="/ong"
              actionLabel="Encontrar Apoio"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Junte-se à Comunidade ClimAssist
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Crie sua conta para acessar todas as funcionalidades, personalizar alertas e participar ativamente.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-8 py-4 text-lg">
              <Link href="/auth/login">
                Criar Conta ou Fazer Login
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
}

function FeatureCard({ icon: Icon, title, description, actionHref, actionLabel }: FeatureCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center">
        <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
          <Icon className="h-10 w-10" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-base mb-6">{description}</CardDescription>
        <Button asChild variant="outline" className="w-full">
          <Link href={actionHref}>
            {actionLabel}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
