import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AddInteractionDialog } from "@/components/crm/pipeline/AddInteractionDialog";
import { InteractionHistory } from "@/components/crm/pipeline/InteractionHistory";
import { StageHistoryTimeline } from "@/components/crm/pipeline/StageHistoryTimeline";
import { 
  ArrowLeft, 
  Building, 
  User, 
  Calendar, 
  DollarSign, 
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock data - em uma aplicação real viria de uma API
const mockOpportunity = {
  id: '1',
  contactName: 'João Silva',
  company: 'Empresa ABC Ltda',
  email: 'joao@empresaabc.com',
  phone: '(11) 99999-1111',
  value: 15000,
  stage: 'qualified' as 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed',
  status: 'em-andamento' as 'em-andamento' | 'perdida' | 'ganha',
  isLost: false,
  createdAt: '2024-01-15',
  responsible: 'Ana Costa',
  timeInStage: 3,
  stageHistory: [
    {
      id: '1',
      stage: 'lead' as 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed',
      enteredAt: '2024-06-26T09:00:00Z',
      leftAt: '2024-06-28T14:30:00Z',
      daysInStage: 2,
      movedBy: 'Ana Costa',
    },
    {
      id: '2',
      stage: 'qualified' as 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed',
      enteredAt: '2024-06-28T14:30:00Z',
      movedBy: 'Ana Costa',
      previousStage: 'lead' as 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed',
    }
  ],
  interactions: [
    {
      id: '1',
      type: 'call' as 'call' | 'email' | 'meeting' | 'note' | 'reminder',
      description: 'Ligação inicial para apresentar a empresa e entender necessidades do cliente.',
      date: '2024-01-15T10:30:00Z',
      completed: true,
    },
    {
      id: '2',
      type: 'reminder' as 'call' | 'email' | 'meeting' | 'note' | 'reminder',
      description: 'Ligar novamente para cliente amanhã às 14h para apresentar proposta comercial.',
      date: '2024-01-16T10:00:00Z',
      scheduledFor: '2024-01-17T14:00:00Z',
      completed: false,
    },
    {
      id: '3',
      type: 'email' as 'call' | 'email' | 'meeting' | 'note' | 'reminder',
      description: 'Enviado material institucional da empresa por e-mail.',
      date: '2024-01-16T15:30:00Z',
      completed: true,
    }
  ],
};

const stageLabels = {
  lead: 'Lead',
  qualified: 'Qualificado',
  proposal: 'Proposta',
  negotiation: 'Negociação',
  closed: 'Fechado'
};

const statusLabels = {
  'em-andamento': 'Em Andamento',
  'perdida': 'Perdida',
  'ganha': 'Ganha'
};

export function OpportunityDetail() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(mockOpportunity);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const addInteraction = (interactionData: any) => {
    const newInteraction = {
      ...interactionData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      completed: !interactionData.scheduledFor,
    };

    setOpportunity(prev => ({
      ...prev,
      interactions: [...prev.interactions, newInteraction]
    }));
  };

  const markInteractionCompleted = (interactionId: string) => {
    setOpportunity(prev => ({
      ...prev,
      interactions: prev.interactions.map(interaction =>
        interaction.id === interactionId 
          ? { ...interaction, completed: true }
          : interaction
      )
    }));
  };

  const getStatusBadge = () => {
    const status = opportunity.status;
    switch (status) {
      case 'perdida':
        return <Badge variant="destructive">{statusLabels.perdida}</Badge>;
      case 'ganha':
        return <Badge className="bg-green-600 hover:bg-green-700 text-white">{statusLabels.ganha}</Badge>;
      case 'em-andamento':
      default:
        return <Badge className="bg-blue-600 hover:bg-blue-700 text-white">{statusLabels['em-andamento']}</Badge>;
    }
  };

  const getPendingInteractions = () => {
    return opportunity.interactions.filter(interaction => 
      interaction.scheduledFor && !interaction.completed &&
      new Date(interaction.scheduledFor) >= new Date()
    );
  };

  const getOverdueInteractions = () => {
    return opportunity.interactions.filter(interaction => 
      interaction.scheduledFor && !interaction.completed &&
      new Date(interaction.scheduledFor) < new Date()
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Pipeline
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{opportunity.company}</h1>
              <p className="text-muted-foreground">{opportunity.contactName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge()}
            <Badge variant="secondary">{stageLabels[opportunity.stage]}</Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Principais */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Informações do Cliente</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{opportunity.contactName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{opportunity.contactName}</p>
                    <p className="text-sm text-muted-foreground">{opportunity.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{opportunity.company}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{opportunity.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{opportunity.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{formatCurrency(opportunity.value)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Criado em {formatDate(opportunity.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{opportunity.timeInStage} dias nesta etapa</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground">Responsável</p>
                  <Badge variant="secondary" className="mt-1">{opportunity.responsible}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Alertas */}
            {(getPendingInteractions().length > 0 || getOverdueInteractions().length > 0) && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>Alertas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {getOverdueInteractions().map(interaction => (
                    <div key={interaction.id} className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                      <AlertCircle className="h-4 w-4" />
                      <span>Atrasado: {interaction.description}</span>
                    </div>
                  ))}
                  {getPendingInteractions().map(interaction => (
                    <div key={interaction.id} className="flex items-center space-x-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                      <Clock className="h-4 w-4" />
                      <span>Agendado: {interaction.description}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Área Principal com Abas */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="historico" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="historico">Interações</TabsTrigger>
                <TabsTrigger value="movimentacao">Movimentação</TabsTrigger>
                <TabsTrigger value="contatos">Contatos</TabsTrigger>
                <TabsTrigger value="produtos">Produtos</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
              </TabsList>

              <TabsContent value="historico" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Atividades na Conta</CardTitle>
                      <AddInteractionDialog onAddInteraction={addInteraction} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <InteractionHistory 
                      interactions={opportunity.interactions}
                      onMarkAsCompleted={markInteractionCompleted}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="movimentacao" className="mt-4">
                <StageHistoryTimeline 
                  stageHistory={opportunity.stageHistory}
                  currentStage={opportunity.stage}
                />
              </TabsContent>

              <TabsContent value="contatos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contatos Relacionados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum contato adicional cadastrado</p>
                      <Button variant="outline" className="mt-2">
                        Adicionar Contato
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="produtos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Produtos/Serviços</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum produto ou serviço associado</p>
                      <Button variant="outline" className="mt-2">
                        Associar Produto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum documento anexado</p>
                      <Button variant="outline" className="mt-2">
                        Anexar Documento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}