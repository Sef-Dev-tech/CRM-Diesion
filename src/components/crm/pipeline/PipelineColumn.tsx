import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OpportunityCard } from "./OpportunityCard";
import { Opportunity } from "./PipelineBoard";

interface PipelineColumnProps {
  stage: {
    id: string;
    name: string;
    color: string;
  };
  opportunities: Opportunity[];
  totalValue: number;
  onMoveOpportunity: (opportunityId: string, newStage: Opportunity['stage']) => void;
  onMarkAsLost: (opportunityId: string, reason: string) => void;
  onMarkAsWon: (opportunityId: string) => void;
}

export function PipelineColumn({ 
  stage, 
  opportunities, 
  totalValue, 
  onMoveOpportunity, 
  onMarkAsLost,
  onMarkAsWon 
}: PipelineColumnProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const activeOpportunities = opportunities.filter(opp => !opp.isLost);
  const lostOpportunities = opportunities.filter(opp => opp.isLost);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const opportunityId = e.dataTransfer.getData('text/plain');
    onMoveOpportunity(opportunityId, stage.id as Opportunity['stage']);
  };

  return (
    <div className="min-w-80 flex-shrink-0">
      <Card className="h-full bg-card shadow-soft border-border">
        {/* Column Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: `hsl(var(--${stage.color}))` }}
              />
              <h3 className="font-medium text-foreground">{stage.name}</h3>
            </div>
            <Badge variant="secondary" className="bg-muted">
              {activeOpportunities.length}
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Total: {formatCurrency(totalValue)}
          </div>
        </div>

        {/* Opportunities List */}
        <div 
          className="p-4 space-y-3 min-h-96"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Active Opportunities */}
          {activeOpportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onMarkAsLost={onMarkAsLost}
              onMarkAsWon={onMarkAsWon}
            />
          ))}

          {/* Lost Opportunities */}
          {lostOpportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onMarkAsLost={onMarkAsLost}
              onMarkAsWon={onMarkAsWon}
            />
          ))}

          {/* Empty State */}
          {opportunities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Nenhuma oportunidade nesta etapa</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}