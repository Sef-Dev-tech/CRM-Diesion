import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PipelineColumn } from "./PipelineColumn";
import { OpportunityCard } from "./OpportunityCard";

export interface Opportunity {
  id: string;
  contactName: string;
  company: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  isLost: boolean;
  createdAt: string;
  responsible: string;
  timeInStage: number; // days
  lossReason?: string;
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
    isLost: false,
    createdAt: '2024-01-15',
    responsible: 'Ana Costa',
    timeInStage: 3,
  },
  {
    id: '2',
    contactName: 'Maria Santos',
    company: 'Tech Solutions',
    value: 25000,
    stage: 'qualified',
    isLost: false,
    createdAt: '2024-01-10',
    responsible: 'Carlos Lima',
    timeInStage: 7,
  },
  {
    id: '3',
    contactName: 'Pedro Oliveira',
    company: 'Inovações XYZ',
    value: 40000,
    stage: 'proposal',
    isLost: false,
    createdAt: '2024-01-05',
    responsible: 'Ana Costa',
    timeInStage: 12,
  },
  {
    id: '4',
    contactName: 'Lucas Ferreira',
    company: 'Digital Corp',
    value: 8000,
    stage: 'proposal',
    isLost: true,
    createdAt: '2024-01-08',
    responsible: 'Carlos Lima',
    timeInStage: 10,
    lossReason: 'Preço muito alto',
  },
];

export function PipelineBoard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);

  const moveOpportunity = (opportunityId: string, newStage: Opportunity['stage']) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === opportunityId 
          ? { ...opp, stage: newStage, timeInStage: 0 }
          : opp
      )
    );
  };

  const markAsLost = (opportunityId: string, reason: string) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === opportunityId 
          ? { ...opp, isLost: true, lossReason: reason }
          : opp
      )
    );
  };

  const getOpportunitiesByStage = (stage: string) => {
    return opportunities.filter(opp => opp.stage === stage);
  };

  const getTotalValue = (stage: string) => {
    return opportunities
      .filter(opp => opp.stage === stage && !opp.isLost)
      .reduce((sum, opp) => sum + opp.value, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold text-foreground">Pipeline de Vendas</h1>
        <p className="text-muted-foreground">Gerencie suas oportunidades no funil de vendas</p>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}