import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StageHistory } from "./PipelineBoard";
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  CheckCircle,
  Circle,
  User
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface StageHistoryTimelineProps {
  stageHistory: StageHistory[];
  currentStage: string;
}

const stageLabels = {
  lead: 'Lead',
  qualified: 'Qualificado', 
  proposal: 'Proposta',
  negotiation: 'Negociação',
  closed: 'Fechado'
};

const stageColors = {
  lead: 'bg-gray-100 text-gray-800 border-gray-200',
  qualified: 'bg-blue-100 text-blue-800 border-blue-200',
  proposal: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  negotiation: 'bg-orange-100 text-orange-800 border-orange-200',
  closed: 'bg-green-100 text-green-800 border-green-200'
};

export function StageHistoryTimeline({ stageHistory, currentStage }: StageHistoryTimelineProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (days: number | undefined) => {
    if (!days) return '';
    if (days === 0) return 'menos de 1 dia';
    if (days === 1) return '1 dia';
    return `${days} dias`;
  };

  const getTimeInCurrentStage = (enteredAt: string) => {
    try {
      return formatDistanceToNow(new Date(enteredAt), { 
        addSuffix: false, 
        locale: ptBR 
      });
    } catch {
      return 'tempo indeterminado';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Histórico de Movimentação</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stageHistory.map((history, index) => {
            const isCurrentStage = history.stage === currentStage && !history.leftAt;
            const isCompleted = !!history.leftAt;
            
            return (
              <div key={history.id} className="relative">
                {/* Linha conectora */}
                {index < stageHistory.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200" />
                )}
                
                <div className="flex items-start space-x-3">
                  {/* Ícone do status */}
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle className="h-8 w-8 text-green-500 bg-white rounded-full" />
                    ) : isCurrentStage ? (
                      <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Circle className="h-4 w-4 text-white fill-current" />
                      </div>
                    ) : (
                      <Circle className="h-8 w-8 text-gray-300" />
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={stageColors[history.stage as keyof typeof stageColors]}>
                        {stageLabels[history.stage as keyof typeof stageLabels]}
                      </Badge>
                      
                      {isCurrentStage && (
                        <Badge variant="secondary" className="text-xs">
                          Estágio Atual
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Entrou em: {formatDate(history.enteredAt)}
                        </span>
                      </div>

                      {history.leftAt && (
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="h-4 w-4" />
                          <span>
                            Saiu em: {formatDate(history.leftAt)}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          Tempo no estágio: {
                            isCurrentStage 
                              ? getTimeInCurrentStage(history.enteredAt)
                              : formatDuration(history.daysInStage)
                          }
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Responsável: {history.movedBy}</span>
                      </div>

                      {history.previousStage && (
                        <div className="text-xs text-muted-foreground italic">
                          Movido de: {stageLabels[history.previousStage as keyof typeof stageLabels]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo */}
        <div className="mt-6 pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Total de estágios:</span> {stageHistory.length}
              </div>
              <div>
                <span className="font-medium">Tempo total:</span> {
                  (() => {
                    const totalDays = stageHistory.reduce((sum, stage) => {
                      if (stage.daysInStage !== undefined) {
                        return sum + stage.daysInStage;
                      } else if (stage.stage === currentStage) {
                        // Calcular dias no estágio atual
                        const days = Math.floor(
                          (new Date().getTime() - new Date(stage.enteredAt).getTime()) / (1000 * 60 * 60 * 24)
                        );
                        return sum + days;
                      }
                      return sum;
                    }, 0);
                    return formatDuration(totalDays);
                  })()
                }
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}