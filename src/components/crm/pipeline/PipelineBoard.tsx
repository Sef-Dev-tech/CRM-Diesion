import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PipelineColumn } from "./PipelineColumn";
import { OpportunityCard } from "./OpportunityCard";
import { AddOpportunityDialog } from "./AddOpportunityDialog";
import { Account, Contact } from "../accounts/types";
import { useAuth } from "@/hooks/useAuth";

export interface OpportunityInteraction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'reminder';
  description: string;
  date: string;
  scheduledFor?: string; // Para agendamentos futuros
  completed: boolean;
}

export interface StageHistory {
  id: string;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  enteredAt: string;
  leftAt?: string;
  daysInStage?: number;
  movedBy: string;
  previousStage?: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
}

export interface Opportunity {
  id: string;
  contactName: string;
  company: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  status: 'em-andamento' | 'perdida' | 'ganha';
  isLost: boolean;
  createdAt: string;
  responsible: string;
  timeInStage: number; // days
  lossReason?: string;
  interactions: OpportunityInteraction[];
  stageHistory: StageHistory[];
}

const PIPELINE_STAGES = [
  { id: 'lead', name: 'Lead', color: 'pipeline-lead' },
  { id: 'qualified', name: 'Qualificado', color: 'pipeline-qualified' },
  { id: 'proposal', name: 'Proposta', color: 'pipeline-proposal' },
  { id: 'negotiation', name: 'Negociação', color: 'pipeline-negotiation' },
  { id: 'closed', name: 'Fechado', color: 'pipeline-closed' },
] as const;

// Mock data
const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    contactName: 'João Silva',
    company: 'Empresa ABC Ltda',
    value: 15000,
    stage: 'lead',
    status: 'em-andamento',
    isLost: false,
    createdAt: '2024-01-15',
    responsible: 'Ana Costa',
    timeInStage: 3,
    stageHistory: [
      {
        id: '1',
        stage: 'lead',
        enteredAt: '2024-01-15T09:00:00Z',
        movedBy: 'Ana Costa',
      }
    ],
    interactions: [
      {
        id: '1',
        type: 'call',
        description: 'Ligação inicial para apresentar a empresa e entender necessidades.',
        date: '2024-01-15T10:30:00Z',
        completed: true,
      },
      {
        id: '2',
        type: 'reminder',
        description: 'Ligar novamente para cliente amanhã às 14h para apresentar proposta.',
        date: '2024-01-16T10:00:00Z',
        scheduledFor: '2024-01-17T14:00:00Z',
        completed: false,
      }
    ],
  },
  {
    id: '2',
    contactName: 'Maria Santos',
    company: 'Tech Solutions',
    value: 25000,
    stage: 'qualified',
    status: 'em-andamento',
    isLost: false,
    createdAt: '2024-01-10',
    responsible: 'Carlos Lima',
    timeInStage: 7,
    stageHistory: [
      {
        id: '2',
        stage: 'lead',
        enteredAt: '2024-01-10T10:00:00Z',
        leftAt: '2024-01-12T14:00:00Z',
        daysInStage: 2,
        movedBy: 'Carlos Lima',
      },
      {
        id: '3',
        stage: 'qualified',
        enteredAt: '2024-01-12T14:00:00Z',
        movedBy: 'Carlos Lima',
        previousStage: 'lead',
      }
    ],
    interactions: [
      {
        id: '3',
        type: 'meeting',
        description: 'Reunião para apresentação da solução e demonstração do produto.',
        date: '2024-01-12T15:00:00Z',
        completed: true,
      }
    ],
  },
  {
    id: '3',
    contactName: 'Pedro Oliveira',
    company: 'Inovações XYZ',
    value: 40000,
    stage: 'proposal',
    status: 'em-andamento',
    isLost: false,
    createdAt: '2024-01-05',
    responsible: 'Ana Costa',
    timeInStage: 12,
    stageHistory: [
      {
        id: '4',
        stage: 'lead',
        enteredAt: '2024-01-05T11:00:00Z',
        leftAt: '2024-01-07T16:00:00Z',
        daysInStage: 2,
        movedBy: 'Ana Costa',
      },
      {
        id: '5',
        stage: 'qualified',
        enteredAt: '2024-01-07T16:00:00Z',
        leftAt: '2024-01-09T10:00:00Z',
        daysInStage: 2,
        movedBy: 'Ana Costa',
        previousStage: 'lead',
      },
      {
        id: '6',
        stage: 'proposal',
        enteredAt: '2024-01-09T10:00:00Z',
        movedBy: 'Ana Costa',
        previousStage: 'qualified',
      }
    ],
    interactions: [],
  },
  {
    id: '4',
    contactName: 'Lucas Ferreira',
    company: 'Digital Corp',
    value: 8000,
    stage: 'proposal',
    status: 'perdida',
    isLost: true,
    createdAt: '2024-01-08',
    responsible: 'Carlos Lima',
    timeInStage: 10,
    lossReason: 'Preço muito alto',
    stageHistory: [
      {
        id: '7',
        stage: 'lead',
        enteredAt: '2024-01-08T13:00:00Z',
        leftAt: '2024-01-09T15:00:00Z',
        daysInStage: 1,
        movedBy: 'Carlos Lima',
      },
      {
        id: '8',
        stage: 'qualified',
        enteredAt: '2024-01-09T15:00:00Z',
        leftAt: '2024-01-11T09:00:00Z',
        daysInStage: 2,
        movedBy: 'Carlos Lima',
        previousStage: 'lead',
      },
      {
        id: '9',
        stage: 'proposal',
        enteredAt: '2024-01-11T09:00:00Z',
        movedBy: 'Carlos Lima',
        previousStage: 'qualified',
      }
    ],
    interactions: [
      {
        id: '4',
        type: 'note',
        description: 'Cliente informou que o orçamento estava acima do esperado.',
        date: '2024-01-10T11:00:00Z',
        completed: true,
      }
    ],
  },
  {
    id: '5',
    contactName: 'Sandra Almeida',
    company: 'StartUp Tech',
    value: 30000,
    stage: 'closed',
    status: 'ganha',
    isLost: false,
    createdAt: '2024-01-01',
    responsible: 'Ana Costa',
    timeInStage: 15,
    stageHistory: [
      {
        id: '10',
        stage: 'lead',
        enteredAt: '2024-01-01T08:00:00Z',
        leftAt: '2024-01-03T12:00:00Z',
        daysInStage: 2,
        movedBy: 'Ana Costa',
      },
      {
        id: '11',
        stage: 'qualified',
        enteredAt: '2024-01-03T12:00:00Z',
        leftAt: '2024-01-08T14:00:00Z',
        daysInStage: 5,
        movedBy: 'Ana Costa',
        previousStage: 'lead',
      },
      {
        id: '12',
        stage: 'proposal',
        enteredAt: '2024-01-08T14:00:00Z',
        leftAt: '2024-01-12T10:00:00Z',
        daysInStage: 4,
        movedBy: 'Ana Costa',
        previousStage: 'qualified',
      },
      {
        id: '13',
        stage: 'negotiation',
        enteredAt: '2024-01-12T10:00:00Z',
        leftAt: '2024-01-15T16:00:00Z',
        daysInStage: 3,
        movedBy: 'Ana Costa',
        previousStage: 'proposal',
      },
      {
        id: '14',
        stage: 'closed',
        enteredAt: '2024-01-15T16:00:00Z',
        movedBy: 'Ana Costa',
        previousStage: 'negotiation',
      }
    ],
    interactions: [
      {
        id: '5',
        type: 'email',
        description: 'Envio do contrato assinado e confirmação do início do projeto.',
        date: '2024-01-16T09:00:00Z',
        completed: true,
      }
    ],
  },
  {
    id: '6',
    contactName: 'Roberto Mendes',
    company: 'Sistemas Avançados Ltda',
    value: 55000,
    stage: 'negotiation',
    status: 'em-andamento',
    isLost: false,
    createdAt: '2024-01-12',
    responsible: 'Admin Sistema',
    timeInStage: 5,
    stageHistory: [
      {
        id: '15',
        stage: 'lead',
        enteredAt: '2024-01-12T08:00:00Z',
        leftAt: '2024-01-13T16:00:00Z',
        daysInStage: 1,
        movedBy: 'Admin Sistema',
      },
      {
        id: '16',
        stage: 'qualified',
        enteredAt: '2024-01-13T16:00:00Z',
        leftAt: '2024-01-15T10:00:00Z',
        daysInStage: 2,
        movedBy: 'Admin Sistema',
        previousStage: 'lead',
      },
      {
        id: '17',
        stage: 'proposal',
        enteredAt: '2024-01-15T10:00:00Z',
        leftAt: '2024-01-17T14:00:00Z',
        daysInStage: 2,
        movedBy: 'Admin Sistema',
        previousStage: 'qualified',
      },
      {
        id: '18',
        stage: 'negotiation',
        enteredAt: '2024-01-17T14:00:00Z',
        movedBy: 'Admin Sistema',
        previousStage: 'proposal',
      }
    ],
    interactions: [
      {
        id: '6',
        type: 'meeting',
        description: 'Reunião de negociação final com decisores da empresa.',
        date: '2024-01-17T15:00:00Z',
        completed: true,
      }
    ],
  },
];

const mockAccounts: Account[] = [
  {
    id: '1',
    companyName: 'Empresa ABC Ltda',
    cnpj: '12.345.678/0001-90',
    address: 'Rua das Flores, 123, São Paulo, SP, 01234-567',
    responsible: 'Ana Costa',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    companyName: 'Tech Solutions',
    cnpj: '98.765.432/0001-10',
    address: 'Av. Paulista, 456, São Paulo, SP, 01310-100',
    responsible: 'Carlos Lima',
    createdAt: '2024-01-02',
  },
];

const mockContacts: Contact[] = [
  {
    id: '1',
    fullName: 'João Silva',
    email: 'joao@empresaabc.com',
    phone: '(11) 99999-1111',
    accountId: '1',
    leadSource: 'Website',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    fullName: 'Maria Santos',
    email: 'maria@techsolutions.com',
    phone: '(11) 99999-2222',
    accountId: '2',
    leadSource: 'Indicação',
    createdAt: '2024-01-10',
  },
];

export function PipelineBoard() {
  const { currentUser, isAdmin } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);

  // Filtrar oportunidades baseado no papel do usuário
  const filteredOpportunities = isAdmin 
    ? opportunities 
    : opportunities.filter(opp => opp.responsible === currentUser?.name);

  const addOpportunity = (opportunityData: Omit<Opportunity, 'id' | 'status' | 'isLost' | 'createdAt' | 'timeInStage' | 'interactions' | 'stageHistory'>) => {
    const now = new Date().toISOString();
    const newOpportunity: Opportunity = {
      ...opportunityData,
      id: Date.now().toString(),
      status: 'em-andamento',
      isLost: false,
      createdAt: new Date().toISOString().split('T')[0],
      timeInStage: 0,
      interactions: [],
      stageHistory: [
        {
          id: Date.now().toString(),
          stage: opportunityData.stage,
          enteredAt: now,
          movedBy: opportunityData.responsible,
        }
      ],
    };
    setOpportunities(prev => [...prev, newOpportunity]);
  };

  const moveOpportunity = (opportunityId: string, newStage: Opportunity['stage']) => {
    const now = new Date().toISOString();
    
    setOpportunities(prev => 
      prev.map(opp => {
        if (opp.id === opportunityId) {
          // Calcular dias no estágio atual
          const currentStageHistory = opp.stageHistory[opp.stageHistory.length - 1];
          const daysInCurrentStage = Math.floor(
            (new Date(now).getTime() - new Date(currentStageHistory.enteredAt).getTime()) / (1000 * 60 * 60 * 24)
          );

          // Atualizar histórico do estágio atual
          const updatedStageHistory = [
            ...opp.stageHistory.slice(0, -1),
            {
              ...currentStageHistory,
              leftAt: now,
              daysInStage: daysInCurrentStage,
            },
            // Adicionar novo estágio
            {
              id: Date.now().toString(),
              stage: newStage,
              enteredAt: now,
              movedBy: opp.responsible,
              previousStage: opp.stage,
            }
          ];

          return { 
            ...opp, 
            stage: newStage, 
            timeInStage: 0,
            stageHistory: updatedStageHistory
          };
        }
        return opp;
      })
    );
  };

  const markAsLost = (opportunityId: string, reason: string) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === opportunityId 
          ? { ...opp, isLost: true, status: 'perdida', lossReason: reason }
          : opp
      )
    );
  };

  const markAsWon = (opportunityId: string) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === opportunityId 
          ? { ...opp, status: 'ganha', stage: 'closed' }
          : opp
      )
    );
  };

  const addInteraction = (opportunityId: string, interactionData: Omit<OpportunityInteraction, 'id' | 'date' | 'completed'>) => {
    const newInteraction: OpportunityInteraction = {
      ...interactionData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      completed: !interactionData.scheduledFor, // Se não tem agendamento, já está completo
    };

    setOpportunities(prev => prev.map(opp => 
      opp.id === opportunityId 
        ? { ...opp, interactions: [...opp.interactions, newInteraction] }
        : opp
    ));
  };

  const markInteractionCompleted = (opportunityId: string, interactionId: string) => {
    setOpportunities(prev => prev.map(opp => 
      opp.id === opportunityId 
        ? {
            ...opp, 
            interactions: opp.interactions.map(interaction =>
              interaction.id === interactionId 
                ? { ...interaction, completed: true }
                : interaction
            )
          }
        : opp
    ));
  };

  const getOpportunitiesByStage = (stage: string) => {
    return filteredOpportunities.filter(opp => opp.stage === stage);
  };

  const getTotalValue = (stage: string) => {
    return filteredOpportunities
      .filter(opp => opp.stage === stage && !opp.isLost)
      .reduce((sum, opp) => sum + opp.value, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Pipeline de Vendas</h1>
            <p className="text-muted-foreground">Gerencie suas oportunidades no funil de vendas</p>
          </div>
          <AddOpportunityDialog onAddOpportunity={addOpportunity} />
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="p-6">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map(stage => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              opportunities={getOpportunitiesByStage(stage.id)}
              totalValue={getTotalValue(stage.id)}
              onMoveOpportunity={moveOpportunity}
              onMarkAsLost={markAsLost}
              onMarkAsWon={markAsWon}
              onAddInteraction={addInteraction}
              onMarkInteractionCompleted={markInteractionCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
}