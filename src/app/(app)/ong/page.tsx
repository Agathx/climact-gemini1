'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Home, HeartHandshake, Package, ClipboardList, PlusCircle, Edit, Trash2, MapPin, Phone, LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock Data Structures
interface SupportCenter {
  id: string;
  name: string;
  address: string;
  contact: string;
  type: 'Abrigo' | 'Centro de Doações' | 'Ponto de Apoio';
  capacity?: number; // for shelters
  servicesOffered: string[];
  status: 'Ativo' | 'Inativo' | 'Lotado';
}

interface FamilyRegistration {
  id: string;
  familyName: string;
  contactPerson: string;
  phone: string;
  address: string;
  members: number;
  needs: string[]; // e.g., 'Alimentos', 'Água', 'Roupas', 'Higiene'
  status: 'Aguardando Ajuda' | 'Atendida' | 'Em Acompanhamento';
}

interface KitRequest {
  id: string;
  requesterName: string; // Could be family ID or individual
  kitType: 'Higiene' | 'Alimentação' | 'Primeiros Socorros' | 'Limpeza';
  quantity: number;
  dateRequested: string;
  status: 'Pendente' | 'Em Preparo' | 'Enviado' | 'Entregue';
}

interface Donation {
  id: string;
  donorName: string; // Can be 'Anônimo'
  type: 'Dinheiro' | 'Itens';
  description: string; // e.g., 'R$ 100,00' or '5 cestas básicas'
  date: string;
  status: 'Recebida' | 'Distribuída';
}

const mockSupportCenters: SupportCenter[] = [
  { id: 'sc1', name: 'Abrigo Comunitário Central', address: 'Rua Principal, 123, Centro', contact: '(21) 9999-8888', type: 'Abrigo', capacity: 50, servicesOffered: ['Pernoite', 'Alimentação', 'Apoio Psicológico'], status: 'Ativo' },
  { id: 'sc2', name: 'Ponto de Coleta Bairro Esperança', address: 'Av. das Flores, 456, B. Esperança', contact: 'ong.esperanca@email.com', type: 'Centro de Doações', servicesOffered: ['Recebimento de roupas', 'Alimentos não perecíveis'], status: 'Ativo' },
];

const mockFamilyRegistrations: FamilyRegistration[] = [
  { id: 'f1', familyName: 'Família Silva', contactPerson: 'João Silva', phone: '(21) 8888-7777', address: 'Rua das Acácias, 789', members: 4, needs: ['Alimentos', 'Água', 'Higiene'], status: 'Aguardando Ajuda' },
];

const mockKitRequests: KitRequest[] = [
    { id: 'kr1', requesterName: 'Família Silva', kitType: 'Alimentação', quantity: 2, dateRequested: '2024-07-28', status: 'Pendente' },
    { id: 'kr2', requesterName: 'Voluntário Carlos', kitType: 'Primeiros Socorros', quantity: 5, dateRequested: '2024-07-27', status: 'Entregue' },
];

const mockDonations: Donation[] = [
    { id: 'd1', donorName: 'Empresa Amiga LTDA', type: 'Dinheiro', description: 'R$ 500,00', date: '2024-07-26', status: 'Recebida' },
    { id: 'd2', donorName: 'Maria Oliveira', type: 'Itens', description: '10 Cobertores e 20L de Água', date: '2024-07-25', status: 'Distribuída' },
];


// Form schemas (simplified, use react-hook-form + Zod for real app)
interface SupportCenterFormValues { name: string; address: string; contact: string; type: SupportCenter['type']; capacity?: string; servicesOffered: string; status: SupportCenter['status']; }
interface FamilyFormValues { familyName: string; contactPerson: string; phone: string; address: string; members: string; needs: string; status: FamilyRegistration['status']; }
interface KitRequestFormValues { requesterName: string; kitType: KitRequest['kitType']; quantity: string; status: KitRequest['status']; }
interface DonationFormValues { donorName: string; type: Donation['type']; description: string; status: Donation['status']; }


export default function NgoVolunteerPanelPage() {
  const [activeTab, setActiveTab] = useState('supportCenters');
  const { toast } = useToast();

  // State for listing items (replace with actual data fetching)
  const [supportCenters, setSupportCenters] = useState<SupportCenter[]>(mockSupportCenters);
  const [families, setFamilies] = useState<FamilyRegistration[]>(mockFamilyRegistrations);
  const [kitRequests, setKitRequests] = useState<KitRequest[]>(mockKitRequests);
  const [donations, setDonations] = useState<Donation[]>(mockDonations);

  // State for forms (simplified)
  const [centerForm, setCenterForm] = useState<Partial<SupportCenterFormValues>>({});
  const [familyForm, setFamilyForm] = useState<Partial<FamilyFormValues>>({});
  const [kitForm, setKitForm] = useState<Partial<KitRequestFormValues>>({});
  const [donationForm, setDonationForm] = useState<Partial<DonationFormValues>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null); // Store item being edited


  const handleFormSubmit = async (formType: string) => {
    setIsSubmitting(true);
    // Simulate API call & validation
    await new Promise(resolve => setTimeout(resolve, 1000));

    let successMessage = "Operação realizada com sucesso!";
    switch (formType) {
        case 'center':
            console.log("Submitting Center:", centerForm);
            // Add/update logic for supportCenters array
            if (editingItem) {
                setSupportCenters(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...centerForm, id: item.id, servicesOffered: centerForm.servicesOffered?.split(',') || [] } as SupportCenter : item));
                successMessage = "Centro de apoio atualizado!";
            } else {
                setSupportCenters(prev => [...prev, { ...centerForm, id: `sc${prev.length + 1}`, servicesOffered: centerForm.servicesOffered?.split(',') || [] } as SupportCenter]);
                successMessage = "Novo centro de apoio cadastrado!";
            }
            setCenterForm({});
            break;
        case 'family':
            console.log("Submitting Family:", familyForm);
             if (editingItem) {
                setFamilies(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...familyForm, id: item.id, needs: familyForm.needs?.split(',') || [], members: parseInt(familyForm.members || '0') } as FamilyRegistration : item));
                successMessage = "Cadastro de família atualizado!";
            } else {
                setFamilies(prev => [...prev, { ...familyForm, id: `f${prev.length + 1}`, needs: familyForm.needs?.split(',') || [], members: parseInt(familyForm.members || '0') } as FamilyRegistration]);
                successMessage = "Nova família cadastrada!";
            }
            setFamilyForm({});
            break;
        case 'kit':
            console.log("Submitting Kit Request:", kitForm);
            if (editingItem) {
                setKitRequests(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...kitForm, id: item.id, quantity: parseInt(kitForm.quantity || '0') } as KitRequest : item));
                successMessage = "Solicitação de kit atualizada!";
            } else {
                setKitRequests(prev => [...prev, { ...kitForm, id: `kr${prev.length + 1}`, quantity: parseInt(kitForm.quantity || '0'), dateRequested: new Date().toISOString().split('T')[0] } as KitRequest]);
                successMessage = "Nova solicitação de kit registrada!";
            }
            setKitForm({});
            break;
        case 'donation':
            console.log("Submitting Donation:", donationForm);
            if (editingItem) {
                setDonations(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...donationForm, id: item.id } as Donation : item));
                successMessage = "Doação atualizada!";
            } else {
                setDonations(prev => [...prev, { ...donationForm, id: `d${prev.length + 1}`, date: new Date().toISOString().split('T')[0] } as Donation]);
                successMessage = "Nova doação registrada!";
            }
            setDonationForm({});
            break;
    }
    
    toast({ title: "Sucesso!", description: successMessage });
    setIsSubmitting(false);
    setEditingItem(null); // Clear editing state
  };
  
  const handleEdit = (item: any, formType: string) => {
    setEditingItem(item);
    switch (formType) {
        case 'center': setCenterForm({ ...item, servicesOffered: item.servicesOffered.join(',') }); break;
        case 'family': setFamilyForm({ ...item, needs: item.needs.join(','), members: item.members.toString() }); break;
        case 'kit': setKitForm({ ...item, quantity: item.quantity.toString() }); break;
        case 'donation': setDonationForm(item); break;
    }
    // Optionally, switch to the form tab or open a modal
    // For simplicity, assumes form is visible or user navigates
  };

  const handleDelete = (id: string, formType: string) => {
    // Add confirmation dialog here
    switch (formType) {
        case 'center': setSupportCenters(prev => prev.filter(item => item.id !== id)); break;
        case 'family': setFamilies(prev => prev.filter(item => item.id !== id)); break;
        case 'kit': setKitRequests(prev => prev.filter(item => item.id !== id)); break;
        case 'donation': setDonations(prev => prev.filter(item => item.id !== id)); break;
    }
    toast({ title: "Item Removido", description: "O item foi removido da lista.", variant: "destructive" });
  };

  const renderListItem = (item: any, formType: string) => (
    <Card key={item.id} className="mb-4 shadow-sm">
        <CardHeader className="pb-2">
            <CardTitle className="text-lg">{item.name || item.familyName || `Solicitação: ${item.kitType}` || `Doação: ${item.donorName}`}</CardTitle>
            {item.address && <CardDescription className="text-xs"><MapPin className="inline h-3 w-3 mr-1"/>{item.address}</CardDescription>}
            {item.contact && <CardDescription className="text-xs"><Phone className="inline h-3 w-3 mr-1"/>{item.contact}</CardDescription>}
            {item.phone && <CardDescription className="text-xs"><Phone className="inline h-3 w-3 mr-1"/>{item.phone}</CardDescription>}
        </CardHeader>
        <CardContent className="text-sm space-y-1 py-2">
            {item.type && <p><strong>Tipo:</strong> {item.type}</p>}
            {item.kitType && <p><strong>Tipo de Kit:</strong> {item.kitType}</p>}
            {item.status && <p><strong>Status:</strong> <span className={`font-semibold ${item.status === 'Ativo' || item.status === 'Entregue' || item.status === 'Recebida' ? 'text-green-600' : item.status === 'Pendente' || item.status === 'Aguardando Ajuda' ? 'text-yellow-600' : 'text-red-600'}`}>{item.status}</span></p>}
            {item.capacity && <p><strong>Capacidade:</strong> {item.capacity} pessoas</p>}
            {item.servicesOffered && <p><strong>Serviços:</strong> {item.servicesOffered.join(', ')}</p>}
            {item.members && <p><strong>Membros:</strong> {item.members}</p>}
            {item.needs && <p><strong>Necessidades:</strong> {item.needs.join(', ')}</p>}
            {item.quantity && <p><strong>Quantidade:</strong> {item.quantity}</p>}
            {item.dateRequested && <p><strong>Data da Solicitação:</strong> {new Date(item.dateRequested).toLocaleDateString('pt-BR')}</p>}
            {item.description && <p><strong>Descrição:</strong> {item.description}</p>}
            {item.date && <p><strong>Data:</strong> {new Date(item.date).toLocaleDateString('pt-BR')}</p>}
        </CardContent>
        <CardFooter className="flex justify-end gap-2 py-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(item, formType)}><Edit className="h-3 w-3 mr-1"/> Editar</Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, formType)}><Trash2 className="h-3 w-3 mr-1"/> Excluir</Button>
        </CardFooter>
    </Card>
  );


  return (
    <div className="p-4 md:p-6">
      <header className="flex items-center mb-8">
        <Users className="h-10 w-10 mr-4 text-primary" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Painel ONG / Voluntário</h1>
          <p className="text-lg text-muted-foreground mt-1">Gerencie cadastros, solicitações e doações.</p>
        </div>
      </header>

      {/* Add authentication check here - this panel should be restricted */}
      {/* For demo, assuming user is authenticated and has NGO/Volunteer role */}

      <Tabs defaultValue="supportCenters" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="supportCenters" className="py-3"><Home className="mr-2 h-5 w-5"/>Centros de Apoio</TabsTrigger>
          <TabsTrigger value="familyRegistrations" className="py-3"><HeartHandshake className="mr-2 h-5 w-5"/>Famílias</TabsTrigger>
          <TabsTrigger value="kitRequests" className="py-3"><Package className="mr-2 h-5 w-5"/>Kits</TabsTrigger>
          <TabsTrigger value="donations" className="py-3"><ClipboardList className="mr-2 h-5 w-5"/>Doações</TabsTrigger>
        </TabsList>

        {/* Tab Content for Support Centers */}
        <TabsContent value="supportCenters">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Gerenciar Centros de Apoio
                <Button size="sm" onClick={() => {setEditingItem(null); setCenterForm({}); /* scroll to form or open modal */}}><PlusCircle className="mr-2 h-4 w-4"/> Adicionar Novo</Button>
              </CardTitle>
              <CardDescription>Cadastre e gerencie abrigos, pontos de coleta e centros de apoio.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit('center'); }} className="mb-6 p-4 border rounded-lg space-y-4 bg-muted/20">
                <h3 className="text-lg font-semibold">{editingItem && editingItem.type === 'center' ? 'Editar Centro de Apoio' : 'Novo Centro de Apoio'}</h3>
                {/* Simplified Form for Support Centers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor="centerName">Nome</Label><Input id="centerName" value={centerForm.name || ''} onChange={e => setCenterForm(p => ({...p, name: e.target.value}))} required /></div>
                    <div><Label htmlFor="centerAddress">Endereço</Label><Input id="centerAddress" value={centerForm.address || ''} onChange={e => setCenterForm(p => ({...p, address: e.target.value}))} required /></div>
                    <div><Label htmlFor="centerContact">Contato</Label><Input id="centerContact" value={centerForm.contact || ''} onChange={e => setCenterForm(p => ({...p, contact: e.target.value}))} required /></div>
                    <div>
                        <Label htmlFor="centerType">Tipo</Label>
                        <Select value={centerForm.type} onValueChange={v => setCenterForm(p => ({...p, type: v as SupportCenter['type']}))}>
                            <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
                            <SelectContent><SelectItem value="Abrigo">Abrigo</SelectItem><SelectItem value="Centro de Doações">Centro de Doações</SelectItem><SelectItem value="Ponto de Apoio">Ponto de Apoio</SelectItem></SelectContent>
                        </Select>
                    </div>
                    {centerForm.type === 'Abrigo' && <div><Label htmlFor="centerCapacity">Capacidade (Abrigo)</Label><Input id="centerCapacity" type="number" value={centerForm.capacity || ''} onChange={e => setCenterForm(p => ({...p, capacity: e.target.value}))} /></div>}
                     <div><Label htmlFor="centerServices">Serviços Oferecidos (separados por vírgula)</Label><Input id="centerServices" value={centerForm.servicesOffered || ''} onChange={e => setCenterForm(p => ({...p, servicesOffered: e.target.value}))} /></div>
                    <div>
                        <Label htmlFor="centerStatus">Status</Label>
                        <Select value={centerForm.status} onValueChange={v => setCenterForm(p => ({...p, status: v as SupportCenter['status']}))}>
                            <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                            <SelectContent><SelectItem value="Ativo">Ativo</SelectItem><SelectItem value="Inativo">Inativo</SelectItem><SelectItem value="Lotado">Lotado</SelectItem></SelectContent>
                        </Select>
                    </div>
                </div>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : (editingItem && editingItem.type === 'center' ? 'Atualizar Centro' : 'Cadastrar Centro')}</Button>
                 {editingItem && editingItem.type === 'center' && <Button variant="outline" onClick={() => {setEditingItem(null); setCenterForm({});}}>Cancelar Edição</Button>}
              </form>
              <div className="max-h-[400px] overflow-y-auto pr-2">
                {supportCenters.length > 0 ? supportCenters.map(item => renderListItem(item, 'center')) : <p className="text-muted-foreground text-center">Nenhum centro de apoio cadastrado.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Content for Family Registrations */}
        <TabsContent value="familyRegistrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Gerenciar Cadastro de Famílias
                <Button size="sm" onClick={() => {setEditingItem(null); setFamilyForm({});}}><PlusCircle className="mr-2 h-4 w-4"/> Adicionar Família</Button>
              </CardTitle>
              <CardDescription>Registre e acompanhe famílias que necessitam de ajuda.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simplified Form for Families */}
               <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit('family'); }} className="mb-6 p-4 border rounded-lg space-y-4 bg-muted/20">
                <h3 className="text-lg font-semibold">{editingItem && editingItem.contactPerson ? 'Editar Cadastro de Família' : 'Nova Família'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor="famName">Nome da Família/Responsável</Label><Input id="famName" value={familyForm.familyName || ''} onChange={e => setFamilyForm(p => ({...p, familyName: e.target.value}))} required /></div>
                    <div><Label htmlFor="famContactPerson">Pessoa de Contato</Label><Input id="famContactPerson" value={familyForm.contactPerson || ''} onChange={e => setFamilyForm(p => ({...p, contactPerson: e.target.value}))} /></div>
                    <div><Label htmlFor="famPhone">Telefone</Label><Input id="famPhone" value={familyForm.phone || ''} onChange={e => setFamilyForm(p => ({...p, phone: e.target.value}))} required /></div>
                    <div><Label htmlFor="famAddress">Endereço</Label><Input id="famAddress" value={familyForm.address || ''} onChange={e => setFamilyForm(p => ({...p, address: e.target.value}))} required /></div>
                    <div><Label htmlFor="famMembers">Nº de Membros</Label><Input id="famMembers" type="number" value={familyForm.members || ''} onChange={e => setFamilyForm(p => ({...p, members: e.target.value}))} required /></div>
                    <div><Label htmlFor="famNeeds">Necessidades (separadas por vírgula)</Label><Input id="famNeeds" value={familyForm.needs || ''} onChange={e => setFamilyForm(p => ({...p, needs: e.target.value}))} /></div>
                     <div>
                        <Label htmlFor="famStatus">Status</Label>
                        <Select value={familyForm.status} onValueChange={v => setFamilyForm(p => ({...p, status: v as FamilyRegistration['status']}))}>
                            <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                            <SelectContent><SelectItem value="Aguardando Ajuda">Aguardando Ajuda</SelectItem><SelectItem value="Atendida">Atendida</SelectItem><SelectItem value="Em Acompanhamento">Em Acompanhamento</SelectItem></SelectContent>
                        </Select>
                    </div>
                </div>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : (editingItem && editingItem.contactPerson ? 'Atualizar Família' : 'Cadastrar Família')}</Button>
                {editingItem && editingItem.contactPerson && <Button variant="outline" onClick={() => {setEditingItem(null); setFamilyForm({});}}>Cancelar Edição</Button>}
              </form>
              <div className="max-h-[400px] overflow-y-auto pr-2">
                 {families.length > 0 ? families.map(item => renderListItem(item, 'family')) : <p className="text-muted-foreground text-center">Nenhuma família cadastrada.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Content for Kit Requests */}
        <TabsContent value="kitRequests">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Gerenciar Solicitações de Kits
                        <Button size="sm" onClick={() => {setEditingItem(null); setKitForm({});}}><PlusCircle className="mr-2 h-4 w-4"/> Nova Solicitação</Button>
                    </CardTitle>
                    <CardDescription>Acompanhe pedidos de kits de higiene, alimentação, etc.</CardDescription>
                </CardHeader>
                <CardContent>
                     <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit('kit'); }} className="mb-6 p-4 border rounded-lg space-y-4 bg-muted/20">
                        <h3 className="text-lg font-semibold">{editingItem && editingItem.kitType ? 'Editar Solicitação de Kit' : 'Nova Solicitação de Kit'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><Label htmlFor="kitRequester">Nome do Solicitante/Família</Label><Input id="kitRequester" value={kitForm.requesterName || ''} onChange={e => setKitForm(p => ({...p, requesterName: e.target.value}))} required /></div>
                            <div>
                                <Label htmlFor="kitTypeSelect">Tipo de Kit</Label>
                                <Select value={kitForm.kitType} onValueChange={v => setKitForm(p => ({...p, kitType: v as KitRequest['kitType']}))}>
                                    <SelectTrigger><SelectValue placeholder="Selecione o tipo de kit" /></SelectTrigger>
                                    <SelectContent><SelectItem value="Higiene">Higiene</SelectItem><SelectItem value="Alimentação">Alimentação</SelectItem><SelectItem value="Primeiros Socorros">Primeiros Socorros</SelectItem><SelectItem value="Limpeza">Limpeza</SelectItem></SelectContent>
                                </Select>
                            </div>
                            <div><Label htmlFor="kitQuantity">Quantidade</Label><Input id="kitQuantity" type="number" value={kitForm.quantity || ''} onChange={e => setKitForm(p => ({...p, quantity: e.target.value}))} required /></div>
                            <div>
                                <Label htmlFor="kitStatus">Status</Label>
                                <Select value={kitForm.status} onValueChange={v => setKitForm(p => ({...p, status: v as KitRequest['status']}))}>
                                    <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                                    <SelectContent><SelectItem value="Pendente">Pendente</SelectItem><SelectItem value="Em Preparo">Em Preparo</SelectItem><SelectItem value="Enviado">Enviado</SelectItem><SelectItem value="Entregue">Entregue</SelectItem></SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : (editingItem && editingItem.kitType ? 'Atualizar Solicitação' : 'Registrar Solicitação')}</Button>
                        {editingItem && editingItem.kitType && <Button variant="outline" onClick={() => {setEditingItem(null); setKitForm({});}}>Cancelar Edição</Button>}
                    </form>
                    <div className="max-h-[400px] overflow-y-auto pr-2">
                        {kitRequests.length > 0 ? kitRequests.map(item => renderListItem(item, 'kit')) : <p className="text-muted-foreground text-center">Nenhuma solicitação de kit encontrada.</p>}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        {/* Tab Content for Donations */}
         <TabsContent value="donations">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Gerenciar Doações
                         <Button size="sm" onClick={() => {setEditingItem(null); setDonationForm({});}}><PlusCircle className="mr-2 h-4 w-4"/> Registrar Doação</Button>
                    </CardTitle>
                    <CardDescription>Registre e acompanhe doações recebidas e distribuídas.</CardDescription>
                </CardHeader>
                <CardContent>
                     <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit('donation'); }} className="mb-6 p-4 border rounded-lg space-y-4 bg-muted/20">
                        <h3 className="text-lg font-semibold">{editingItem && editingItem.donorName ? 'Editar Doação' : 'Nova Doação'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><Label htmlFor="donorName">Nome do Doador (ou "Anônimo")</Label><Input id="donorName" value={donationForm.donorName || ''} onChange={e => setDonationForm(p => ({...p, donorName: e.target.value}))} required /></div>
                            <div>
                                <Label htmlFor="donationType">Tipo de Doação</Label>
                                 <Select value={donationForm.type} onValueChange={v => setDonationForm(p => ({...p, type: v as Donation['type']}))}>
                                    <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
                                    <SelectContent><SelectItem value="Dinheiro">Dinheiro</SelectItem><SelectItem value="Itens">Itens</SelectItem></SelectContent>
                                </Select>
                            </div>
                            <div className="md:col-span-2"><Label htmlFor="donationDesc">Descrição (Valor ou Itens)</Label><Textarea id="donationDesc" value={donationForm.description || ''} onChange={e => setDonationForm(p => ({...p, description: e.target.value}))} required /></div>
                            <div>
                                <Label htmlFor="donationStatus">Status</Label>
                                <Select value={donationForm.status} onValueChange={v => setDonationForm(p => ({...p, status: v as Donation['status']}))}>
                                    <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                                    <SelectContent><SelectItem value="Recebida">Recebida</SelectItem><SelectItem value="Distribuída">Distribuída</SelectItem></SelectContent>
                                </Select>
                            </div>
                        </div>
                         <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : (editingItem && editingItem.donorName ? 'Atualizar Doação' : 'Registrar Doação')}</Button>
                        {editingItem && editingItem.donorName && <Button variant="outline" onClick={() => {setEditingItem(null); setDonationForm({});}}>Cancelar Edição</Button>}
                    </form>
                    <div className="max-h-[400px] overflow-y-auto pr-2">
                        {donations.length > 0 ? donations.map(item => renderListItem(item, 'donation')) : <p className="text-muted-foreground text-center">Nenhuma doação registrada.</p>}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
