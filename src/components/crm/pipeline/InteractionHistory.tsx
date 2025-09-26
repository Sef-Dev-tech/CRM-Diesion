import React from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, Phone, Mail, Calendar, FileText, Bell, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OpportunityInteraction } from "./PipelineBoard";

interface InteractionHistoryProps {
  interactions: OpportunityInteraction[];
  onMarkAsCompleted?: (interactionId: string) => void;
}

const interactionIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: FileText,
  reminder: Bell,
};

const interactionLabels = {
  call: "Ligação",
  email: "E-mail",
  meeting: "Reunião", 
  note: "Anotação",
  reminder: "Lembrete",
};

const interactionColors = {
  call: "bg-blue-500",
  email: "bg-green-500",
  meeting: "bg-purple-500",
  note: "bg-gray-500",
  reminder: "bg-orange-500",
};

export function InteractionHistory({ interactions, onMarkAsCompleted }: InteractionHistoryProps) {
  const sortedInteractions = [...interactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (interactions.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Nenhuma interação registrada ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedInteractions.map((interaction) => {
        const Icon = interactionIcons[interaction.type];
        const isScheduled = interaction.scheduledFor && !interaction.completed;
        const isPastDue = isScheduled && new Date(interaction.scheduledFor) < new Date();
        
        return (
          <Card key={interaction.id} className={cn(
            "relative",
            isScheduled && !interaction.completed && "border-orange-200 bg-orange-50/50",
            isPastDue && "border-red-200 bg-red-50/50"
          )}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                  interactionColors[interaction.type]
                )}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {interactionLabels[interaction.type]}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      {interaction.completed && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {format(parseISO(interaction.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground mb-2">
                    {interaction.description}
                  </p>
                  
                  {interaction.scheduledFor && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          Agendado para: {format(parseISO(interaction.scheduledFor), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                        {isPastDue && (
                          <Badge variant="destructive" className="text-xs ml-2">
                            Atrasado
                          </Badge>
                        )}
                      </div>
                      
                      {!interaction.completed && onMarkAsCompleted && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onMarkAsCompleted(interaction.id)}
                          className="text-xs h-6"
                        >
                          Marcar como concluído
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}