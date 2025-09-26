import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Opportunity, OpportunityInteraction } from "./PipelineBoard";
import { AddInteractionDialog } from "./AddInteractionDialog";
import { InteractionHistory } from "./InteractionHistory";
import { Building, User, Calendar, Clock, X, CheckCircle, MessageSquare } from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onMarkAsLost: (opportunityId: string, reason: string) => void;
  onMarkAsWon: (opportunityId: string) => void;
  onAddInteraction: (opportunityId: string, interaction: Omit<OpportunityInteraction, 'id' | 'date' | 'completed'>) => void;
  onMarkInteractionCompleted: (opportunityId: string, interactionId: string) => void;
}

export function OpportunityCard({ opportunity, onMarkAsLost, onMarkAsWon, onAddInteraction, onMarkInteractionCompleted }: OpportunityCardProps) {
  const [isLossDialogOpen, setIsLossDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [lossReason, setLossReason] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', opportunity.id);
  };

  const handleMarkAsLost = () => {
    if (lossReason.trim()) {
      onMarkAsLost(opportunity.id, lossReason);
      setIsLossDialogOpen(false);
      setLossReason('');
    }
  };

  const getStatusBadge = () => {
    switch (opportunity.status) {
      case 'perdida':
        return (
          <Badge variant="destructive" className="text-xs">
            Perdida
          </Badge>
        );
      case 'ganha':
        return (
          <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">
            Ganha
          </Badge>
        );
      case 'em-andamento':
      default:
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
            Em andamento
          </Badge>
        );
    }
  };

  return (
    <Card 
      className={`p-4 cursor-move transition-all duration-200 hover:shadow-medium ${
        opportunity.isLost 
          ? 'opacity-60 bg-muted border-pipeline-lost' 
          : 'bg-card hover:shadow-soft border-border'
      }`}
      draggable={!opportunity.isLost && opportunity.status === 'em-andamento'}
      onDragStart={handleDragStart}
    >
      {/* Status Badge */}
      <div className="mb-3">
        {getStatusBadge()}
      </div>

      {/* Header with value and action buttons */}
      <div className="flex items-start justify-between mb-3">
        <div className="font-semibold text-lg text-primary">
          {formatCurrency(opportunity.value)}
        </div>
        
        <div className="flex gap-1">
          {/* História/Interações */}
          <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-blue-600"
                title="Ver histórico e adicionar interações"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Histórico - {opportunity.company}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Interações</h4>
                  <AddInteractionDialog 
                    onAddInteraction={(interaction) => {
                      onAddInteraction(opportunity.id, interaction);
                    }}
                  />
                </div>
                <InteractionHistory 
                  interactions={opportunity.interactions}
                  onMarkAsCompleted={(interactionId) => onMarkInteractionCompleted(opportunity.id, interactionId)}
                />
              </div>
            </DialogContent>
          </Dialog>

          {opportunity.status === 'em-andamento' && (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-green-600"
                onClick={() => onMarkAsWon(opportunity.id)}
                title="Marcar como Ganha"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Dialog open={isLossDialogOpen} onOpenChange={setIsLossDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    title="Marcar como Perdida"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Marcar como Perdida</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Label htmlFor="reason">Motivo da perda (obrigatório)</Label>
                    <Textarea
                      id="reason"
                      placeholder="Ex: Preço muito alto, optou pela concorrência..."
                      value={lossReason}
                      onChange={(e) => setLossReason(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsLossDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={handleMarkAsLost}
                        disabled={!lossReason.trim()}
                      >
                        Marcar como Perdida
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>

      {/* Company and Contact */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{opportunity.company}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{opportunity.contactName}</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              Criado em {formatDate(opportunity.createdAt)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              {opportunity.timeInStage} dias nesta etapa
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Responsável:</span>
          <Badge variant="secondary" className="text-xs">
            {opportunity.responsible}
          </Badge>
        </div>
      </div>

      {/* Loss reason if applicable */}
      {opportunity.isLost && opportunity.lossReason && (
        <div className="mt-3 p-2 bg-destructive/10 rounded-md border border-destructive/20">
          <p className="text-xs text-destructive font-medium">Motivo da perda:</p>
          <p className="text-xs text-destructive/80">{opportunity.lossReason}</p>
        </div>
      )}
    </Card>
  );
}