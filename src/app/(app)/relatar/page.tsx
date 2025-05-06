'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Megaphone, MapPin, ImagePlus, Send, UploadCloud, LocateFixed } from 'lucide-react';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const reportFormSchema = z.object({
  title: z.string().min(5, { message: 'O título deve ter pelo menos 5 caracteres.' }).max(100, { message: 'O título não pode ter mais de 100 caracteres.' }),
  description: z.string().min(20, { message: 'A descrição deve ter pelo menos 20 caracteres.' }).max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres.' }),
  disasterType: z.string({ required_error: 'Por favor, selecione o tipo de desastre.' }),
  locationManual: z.string().optional(),
  useCurrentLocation: z.boolean().default(false).optional(),
  image: z.any().optional(), // For file upload
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

// Mock disaster types for the select dropdown
const disasterTypes = [
  { id: 'enchente', name: 'Enchente / Alagamento' },
  { id: 'deslizamento', name: 'Deslizamento de Terra' },
  { id: 'incendio', name: 'Incêndio Florestal / Urbano' },
  { id: 'vendaval', name: 'Vendaval / Tempestade Forte' },
  { id: 'seca', name: 'Seca Extrema' },
  { id: 'calor_extremo', name: 'Onda de Calor Extremo' },
  { id: 'granizo', name: 'Chuva de Granizo' },
  { id: 'outro', name: 'Outro Tipo de Desastre' },
];

export default function ReportSubmissionPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: '',
      description: '',
      useCurrentLocation: true,
    },
  });

  const watchUseCurrentLocation = form.watch('useCurrentLocation');

  useEffect(() => {
    if (watchUseCurrentLocation) {
      handleGetCurrentLocation();
    } else {
      setCurrentLocation(null);
      setLocationError(null);
      form.setValue('locationManual', ''); // Clear manual location if switching
    }
  }, [watchUseCurrentLocation]);


  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        form.setError('image', { type: 'manual', message: 'A imagem não pode exceder 5MB.' });
        setPreviewImage(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        form.setValue('image', file);
        form.clearErrors('image');
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      form.setValue('image', undefined);
    }
  };

  const handleGetCurrentLocation = () => {
    setLocationError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          form.setValue('locationManual', `Lat: ${position.coords.latitude.toFixed(5)}, Lon: ${position.coords.longitude.toFixed(5)} (Automático)`);
          form.clearErrors('locationManual');
        },
        (error) => {
          setLocationError(`Erro ao obter localização: ${error.message}. Por favor, insira manualmente.`);
          setCurrentLocation(null);
          form.setValue('useCurrentLocation', false); // Uncheck if error
        }
      );
    } else {
      setLocationError('Geolocalização não é suportada por este navegador.');
      setCurrentLocation(null);
      form.setValue('useCurrentLocation', false); // Uncheck if not supported
    }
  };

  async function onSubmit(data: ReportFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    console.log('Form data:', data);
    if (currentLocation && data.useCurrentLocation) {
      console.log('Current Location:', currentLocation);
    }
    
    // Basic offline check simulation
    if (!navigator.onLine) {
      toast({
        title: 'Modo Offline',
        description: 'Seu relato foi salvo e será enviado assim que a conexão for restaurada.',
        variant: 'default', // Consider a specific 'offline' variant if desired
      });
      // Here you would typically save to IndexedDB or localStorage
      // For now, just reset form and indicate success
      setTimeout(() => {
        form.reset();
        setPreviewImage(null);
        setCurrentLocation(null);
        setLocationError(null);
        setIsSubmitting(false);
      }, 1500);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: 'Relato Enviado com Sucesso!',
      description: 'Obrigado por sua contribuição. Seu relato está sendo processado.',
    });
    form.reset();
    setPreviewImage(null);
    setCurrentLocation(null);
    setLocationError(null);
    setIsSubmitting(false);
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-3xl">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mx-auto mb-4">
            <Megaphone className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Relatar uma Ocorrência</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Ajude sua comunidade compartilhando informações sobre desastres ou riscos climáticos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Título do Relato</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Rua alagada no Bairro Sol Nascente" {...field} className="text-base p-3" />
                    </FormControl>
                    <FormDescription>
                      Um título breve e descritivo para a ocorrência.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="disasterType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Tipo de Desastre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-base p-3 h-auto">
                          <SelectValue placeholder="Selecione o tipo de desastre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {disasterTypes.map(type => (
                          <SelectItem key={type.id} value={type.id} className="text-base py-2">
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Descrição Detalhada</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o que está acontecendo, áreas afetadas, riscos, se há pessoas precisando de ajuda, etc."
                        className="resize-y min-h-[120px] text-base p-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Card className="bg-muted/30 p-4">
                <FormLabel className="text-base block mb-2">Localização da Ocorrência</FormLabel>
                <FormField
                  control={form.control}
                  name="useCurrentLocation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-base">
                        Usar minha localização atual
                      </FormLabel>
                       <Button type="button" variant="ghost" size="icon" onClick={handleGetCurrentLocation} disabled={!field.value} className={!field.value ? 'opacity-50' : ''}>
                          <LocateFixed className="h-5 w-5"/>
                          <span className="sr-only">Atualizar localização</span>
                       </Button>
                    </FormItem>
                  )}
                />
                {locationError && <p className="text-sm text-destructive mb-2">{locationError}</p>}

                <FormField
                  control={form.control}
                  name="locationManual"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Ou digite o endereço completo" 
                          {...field} 
                          className="text-base p-3" 
                          disabled={watchUseCurrentLocation && !!currentLocation}
                        />
                      </FormControl>
                       <FormDescription>
                        {currentLocation && watchUseCurrentLocation 
                          ? `Localização atual: Lat: ${currentLocation.lat.toFixed(5)}, Lon: ${currentLocation.lon.toFixed(5)}` 
                          : 'Se não usar a localização atual, forneça o endereço ou ponto de referência.'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>


              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Foto da Ocorrência (Opcional)</FormLabel>
                    <FormControl>
                      <>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 p-6 border-dashed hover:border-primary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <UploadCloud className="h-6 w-6 text-muted-foreground" />
                          <span className="text-muted-foreground">Clique para selecionar uma imagem (Max 5MB)</span>
                        </Button>
                        <input 
                          type="file" 
                          accept="image/*" 
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleImageChange} 
                        />
                      </>
                    </FormControl>
                    {previewImage && (
                      <div className="mt-4 relative w-full max-w-xs mx-auto aspect-video rounded-md overflow-hidden border">
                        <Image src={previewImage} alt="Pré-visualização da imagem" layout="fill" objectFit="cover" />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full text-lg p-6" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Send className="mr-2 h-5 w-5 animate-pulse" /> Enviando Relato...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Enviar Relato
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
