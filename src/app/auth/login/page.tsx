'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus, ShieldAlert, Mail, Lock, User as UserIcon, Calendar, MapPin as MapPinIcon } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
// import { signIn } from 'next-auth/react'; // Example for NextAuth, adjust if using Firebase Auth directly

// Placeholder for Google/Facebook icons if not using a library like react-icons
const GoogleIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2"><path fill="#4285F4" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.75 8.36,4.73 12.19,4.73C15.19,4.73 17.5,6.14 18.32,7.35L20.42,5.39C18.88,3.93 16.27,2.77 12.19,2.77C6.45,2.77 2,7.17 2,12C2,16.83 6.45,21.23 12.19,21.23C17.68,21.23 21.54,17.55 21.54,12.33C21.54,11.76 21.48,11.43 21.35,11.1Z"/></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2"><path fill="#1877F2" d="M12 2.04C6.48 2.04 2 6.52 2 12.06C2 17.06 5.69 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.81C10.44 7.31 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.31 21.21 22 17.06 22 12.06C22 6.52 17.52 2.04 12 2.04Z"/></svg>;


export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const { toast } = useToast();

  // Form states (simplified, use react-hook-form for production)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');


  const handleEmailPasswordAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (isLoginView) {
      // Handle Login
      console.log('Login attempt:', { email, password });
      // Example: const result = await signIn('credentials', { redirect: false, email, password });
      // if (result?.error) toast({ title: 'Erro de Login', description: result.error, variant: 'destructive' });
      // else router.push('/painel');
      toast({ title: 'Login Simulado', description: 'Funcionalidade de login em desenvolvimento.' });
    } else {
      // Handle Registration
      if (password !== confirmPassword) {
        toast({ title: 'Erro de Cadastro', description: 'As senhas não coincidem.', variant: 'destructive' });
        setIsLoading(false);
        return;
      }
      console.log('Registration attempt:', { name, email, password, age, location });
      // Example: const result = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(...) });
      toast({ title: 'Cadastro Simulado', description: 'Funcionalidade de cadastro em desenvolvimento.' });
    }

    setTimeout(() => setIsLoading(false), 1500); // Simulate API call
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    console.log(`Attempting ${provider} login...`);
    // Example: await signIn(provider, { callbackUrl: '/painel' });
    toast({ title: `Login com ${provider} Simulado`, description: `Funcionalidade em desenvolvimento.` });
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-background to-background p-4">
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-foreground hover:text-primary transition-colors">
          <ShieldAlert className="h-7 w-7 text-primary" />
          <span className="font-semibold text-xl">ClimAssist</span>
      </Link>
      <Card className="w-full max-w-md shadow-2xl">
        <Tabs defaultValue="login" onValueChange={(value) => setIsLoginView(value === 'login')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="py-3 text-base"><LogIn className="mr-2 h-5 w-5"/>Entrar</TabsTrigger>
            <TabsTrigger value="register" className="py-3 text-base"><UserPlus className="mr-2 h-5 w-5"/>Cadastrar</TabsTrigger>
          </TabsList>
          
          {/* Login Tab */}
          <TabsContent value="login">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Bem-vindo de Volta!</CardTitle>
              <CardDescription>Acesse sua conta para continuar ajudando sua comunidade.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="login-email" type="email" placeholder="seuemail@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 py-3 text-base"/>
                  </div>
                </div>
                <div>
                  <Label htmlFor="login-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="login-password" type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 py-3 text-base"/>
                  </div>
                </div>
                <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleSocialLogin('google')} disabled={isLoading} className="py-3 text-base">
                  <GoogleIcon /> Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin('facebook')} disabled={isLoading} className="py-3 text-base">
                  <FacebookIcon /> Facebook
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center text-sm">
              <Link href="/auth/resetar-senha" passHref className="text-primary hover:underline">
                Esqueceu sua senha?
              </Link>
               <p className="mt-4 text-muted-foreground">
                Não tem uma conta?{' '}
                <Button variant="link" onClick={() => setIsLoginView(false)} className="p-0 h-auto text-primary" aria-controls="tabs-register-trigger">
                   Cadastre-se
                </Button>
              </p>
            </CardFooter>
          </TabsContent>

          {/* Registration Tab */}
          <TabsContent value="register">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Crie sua Conta</CardTitle>
              <CardDescription>Junte-se à ClimAssist e faça a diferença.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
                <div>
                  <Label htmlFor="register-name">Nome Completo</Label>
                   <div className="relative">
                     <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                     <Input id="register-name" placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)} required className="pl-10 py-3 text-base"/>
                   </div>
                </div>
                <div>
                  <Label htmlFor="register-email">E-mail</Label>
                   <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="register-email" type="email" placeholder="seuemail@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 py-3 text-base"/>
                  </div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="register-age">Idade</Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="register-age" type="number" placeholder="Sua idade" value={age} onChange={(e) => setAge(e.target.value)} required className="pl-10 py-3 text-base"/>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="register-location">Localidade</Label>
                        <div className="relative">
                            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="register-location" placeholder="Cidade, UF" value={location} onChange={(e) => setLocation(e.target.value)} required className="pl-10 py-3 text-base"/>
                        </div>
                    </div>
                </div>
                <div>
                  <Label htmlFor="register-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="register-password" type="password" placeholder="Crie uma senha forte" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 py-3 text-base"/>
                  </div>
                </div>
                 <div>
                  <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="register-confirm-password" type="password" placeholder="Repita sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="pl-10 py-3 text-base"/>
                  </div>
                </div>
                <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
                  {isLoading ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </form>
            </CardContent>
             <CardFooter className="flex flex-col items-center text-sm">
              <p className="text-muted-foreground">
                Já tem uma conta?{' '}
                 <Button variant="link" onClick={() => setIsLoginView(true)} className="p-0 h-auto text-primary" aria-controls="tabs-login-trigger">
                    Faça login
                </Button>
              </p>
               <p className="mt-4 text-xs text-muted-foreground text-center">
                Ao se cadastrar, você concorda com nossos{' '}
                <Link href="/termos" className="underline hover:text-primary">Termos de Serviço</Link> e{' '}
                <Link href="/privacidade" className="underline hover:text-primary">Política de Privacidade</Link>.
              </p>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
       <p className="mt-8 text-center text-sm text-muted-foreground">
        Visitantes podem navegar, mas só usuários logados podem interagir completamente.
        <br />
        <Link href="/" className="underline hover:text-primary">Voltar para a página inicial como visitante</Link>
      </p>
    </div>
  );
}
