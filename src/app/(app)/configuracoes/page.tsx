'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, User, Bell, Palette, ShieldCheck, Languages, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock user settings data
interface UserSettings {
  name: string;
  email: string;
  receiveEmailNotifications: boolean;
  receivePushNotifications: boolean;
  alertRadiusKm: number; // For location-based alerts
  language: 'pt-BR' | 'en-US' | 'es-ES';
  theme: 'system' | 'light' | 'dark';
  twoFactorAuthEnabled: boolean;
}

const initialSettings: UserSettings = {
  name: 'Usuário Exemplo',
  email: 'usuario@exemplo.com',
  receiveEmailNotifications: true,
  receivePushNotifications: true,
  alertRadiusKm: 10,
  language: 'pt-BR',
  theme: 'system',
  twoFactorAuthEnabled: false,
};


export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSwitchChange = (field: keyof Pick<UserSettings, 'receiveEmailNotifications' | 'receivePushNotifications' | 'twoFactorAuthEnabled'>, checked: boolean) => {
    setSettings(prev => ({ ...prev, [field]: checked }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    console.log('Saving settings:', settings);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Configurações Salvas!',
      description: 'Suas preferências foram atualizadas com sucesso.',
    });
    setIsSaving(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <header className="flex items-center mb-8">
        <Settings className="h-10 w-10 mr-4 text-primary" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Configurações</h1>
          <p className="text-lg text-muted-foreground mt-1">Gerencie suas preferências de conta, notificações e mais.</p>
        </div>
      </header>

      <div className="space-y-8">
        {/* Profile Settings */}
        <Card id="perfil">
          <CardHeader>
            <CardTitle className="flex items-center"><User className="mr-2 h-6 w-6 text-primary"/> Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-base">Nome Completo</Label>
                <Input id="name" value={settings.name} onChange={(e) => handleInputChange('name', e.target.value)} className="mt-1 text-base p-3"/>
              </div>
              <div>
                <Label htmlFor="email" className="text-base">Endereço de E-mail</Label>
                <Input id="email" type="email" value={settings.email} onChange={(e) => handleInputChange('email', e.target.value)} className="mt-1 text-base p-3"/>
              </div>
            </div>
             {/* Add more profile fields like password change, phone, etc. */}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card id="notificacoes">
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2 h-6 w-6 text-primary"/> Notificações</CardTitle>
            <CardDescription>Escolha como você deseja receber alertas e atualizações.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="emailNotifications" className="text-base font-medium">Notificações por E-mail</Label>
                <p className="text-sm text-muted-foreground">Receber alertas importantes e novidades por e-mail.</p>
              </div>
              <Switch id="emailNotifications" checked={settings.receiveEmailNotifications} onCheckedChange={(checked) => handleSwitchChange('receiveEmailNotifications', checked)} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
               <div>
                <Label htmlFor="pushNotifications" className="text-base font-medium">Notificações Push (Celular/Desktop)</Label>
                <p className="text-sm text-muted-foreground">Receber alertas em tempo real no seu dispositivo.</p>
              </div>
              <Switch id="pushNotifications" checked={settings.receivePushNotifications} onCheckedChange={(checked) => handleSwitchChange('receivePushNotifications', checked)} />
            </div>
            <div>
              <Label htmlFor="alertRadius" className="text-base">Raio de Alerta por Localização (km)</Label>
              <Input 
                id="alertRadius" 
                type="number" 
                min="1" max="100" 
                value={settings.alertRadiusKm} 
                onChange={(e) => handleInputChange('alertRadiusKm', parseInt(e.target.value, 10))} 
                className="mt-1 text-base p-3 w-32"
              />
              <p className="text-sm text-muted-foreground mt-1">Define a área para receber alertas baseados na sua localização.</p>
            </div>
          </CardContent>
        </Card>

        {/* Appearance and Language Settings */}
        <Card id="aparencia_idioma">
          <CardHeader>
            <CardTitle className="flex items-center"><Palette className="mr-2 h-6 w-6 text-primary"/> Aparência e <Languages className="ml-1 mr-2 h-6 w-6 text-primary"/> Idioma</CardTitle>
            <CardDescription>Personalize a aparência do aplicativo e selecione seu idioma preferido.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="theme" className="text-base">Tema</Label>
                 <Select value={settings.theme} onValueChange={(value: UserSettings['theme']) => handleInputChange('theme', value)}>
                  <SelectTrigger className="mt-1 text-base p-3 h-auto">
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system" className="text-base py-2">Padrão do Sistema</SelectItem>
                    <SelectItem value="light" className="text-base py-2">Claro</SelectItem>
                    <SelectItem value="dark" className="text-base py-2">Escuro</SelectItem>
                  </SelectContent>
                </Select>
                {/* Actual theme switching logic would be implemented with context/localStorage */}
              </div>
              <div>
                <Label htmlFor="language" className="text-base">Idioma</Label>
                <Select value={settings.language} onValueChange={(value: UserSettings['language']) => handleInputChange('language', value)}>
                  <SelectTrigger className="mt-1 text-base p-3 h-auto">
                    <SelectValue placeholder="Selecione um idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR" className="text-base py-2">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US" className="text-base py-2">English (US)</SelectItem>
                    <SelectItem value="es-ES" className="text-base py-2">Español (España)</SelectItem>
                  </SelectContent>
                </Select>
                 {/* Actual i18n logic would be implemented here */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card id="seguranca">
          <CardHeader>
            <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-6 w-6 text-primary"/> Segurança</CardTitle>
            <CardDescription>Gerencie as configurações de segurança da sua conta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center justify-between p-4 border rounded-lg">
               <div>
                <Label htmlFor="twoFactorAuth" className="text-base font-medium">Autenticação de Dois Fatores (2FA)</Label>
                <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta.</p>
              </div>
              <Switch id="twoFactorAuth" checked={settings.twoFactorAuthEnabled} onCheckedChange={(checked) => handleSwitchChange('twoFactorAuthEnabled', checked)} />
            </div>
             {/* Placeholder for password change */}
             <Button variant="outline">Alterar Senha</Button>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-8">
          <Button onClick={handleSaveSettings} disabled={isSaving} size="lg" className="text-base px-8 py-3">
            {isSaving ? (
              <>
                <Save className="mr-2 h-5 w-5 animate-spin" /> Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" /> Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
