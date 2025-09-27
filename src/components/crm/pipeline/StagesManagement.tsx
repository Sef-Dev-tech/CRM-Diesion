import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { AddStageDialog } from "./AddStageDialog";
import { EditStageDialog } from "./EditStageDialog";
import { PipelineStage, StageFormData } from "./types";
import { 
  GripVertical, 
  Settings, 
  Trash2,
  AlertCircle,
  ArrowUp,
  ArrowDown 
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data das etapas baseado no pipeline atual
const mockStages: PipelineStage[] = [
  {
    id: 'lead',
    name: 'Lead',
    color: 'pipeline-lead',
    order: 1,
    description: 'Primeiro contato com o prospect',
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: 'qualified',
    name: 'Qualificado',
    color: 'pipeline-qualified',
    order: 2,
    description: 'Lead qualificado com potencial de compra',
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: 'proposal',
    name: 'Proposta',
    color: 'pipeline-proposal',
    order: 3,
    description: 'Proposta enviada ao cliente',
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: 'negotiation',
    name: 'Negociação',
    color: 'pipeline-negotiation',
    order: 4,
    description: 'Em processo de negociação',
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: 'closed',
    name: 'Fechado',
    color: 'pipeline-closed',
    order: 5,
    description: 'Negócio fechado com sucesso',
    isActive: true,
    createdAt: '2024-01-01',
  },
];

const STAGE_COLOR_MAP: Record<string, string> = {
  'pipeline-lead': 'hsl(197, 71%, 73%)',
  'pipeline-qualified': 'hsl(142, 76%, 36%)',
  'pipeline-proposal': 'hsl(38, 92%, 50%)',
  'pipeline-negotiation': 'hsl(271, 81%, 56%)',
  'pipeline-closed': 'hsl(120, 93%, 29%)',
  'pipeline-lost': 'hsl(0, 84%, 60%)',
};

export function StagesManagement() {
  const [stages, setStages] = useState<PipelineStage[]>(mockStages);
  const { toast } = useToast();

  const addStage = (stageData: StageFormData) => {
    const newStage: PipelineStage = {
      id: `stage_${Date.now()}`,
      name: stageData.name,
      color: stageData.color,
      description: stageData.description,
      order: stages.length + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setStages(prev => [...prev, newStage]);
  };

  const updateStage = (stageId: string, stageData: StageFormData) => {
    setStages(prev => 
      prev.map(stage => 
        stage.id === stageId 
          ? { ...stage, ...stageData }
          : stage
      )
    );
  };

  const toggleStageActive = (stageId: string) => {
    setStages(prev =>
      prev.map(stage =>
        stage.id === stageId
          ? { ...stage, isActive: !stage.isActive }
          : stage
      )
    );
    
    const stage = stages.find(s => s.id === stageId);
    toast({
      title: stage?.isActive ? "Etapa desativada" : "Etapa ativada",
      description: `A etapa "${stage?.name}" foi ${stage?.isActive ? 'desativada' : 'ativada'}.`,
    });
  };

  const moveStage = (stageId: string, direction: 'up' | 'down') => {
    const currentIndex = stages.findIndex(s => s.id === stageId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === stages.length - 1)
    ) {
      return;
    }

    const newStages = [...stages];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap stages
    [newStages[currentIndex], newStages[targetIndex]] = [newStages[targetIndex], newStages[currentIndex]];
    
    // Update order
    newStages.forEach((stage, index) => {
      stage.order = index + 1;
    });

    setStages(newStages);
    toast({
      title: "Ordem atualizada",
      description: "A ordem das etapas foi atualizada.",
    });
  };

  const deleteStage = (stageId: string) => {
    setStages(prev => prev.filter(stage => stage.id !== stageId));
    const stage = stages.find(s => s.id === stageId);
    toast({
      title: "Etapa excluída",
      description: `A etapa "${stage?.name}" foi excluída.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Gestão de Etapas</h1>
            <p className="text-muted-foreground">Configure as etapas do pipeline de vendas</p>
          </div>
          <AddStageDialog onAddStage={addStage} />
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Etapas</p>
                <p className="text-2xl font-semibold">{stages.length}</p>
              </div>
              <Settings className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Etapas Ativas</p>
                <p className="text-2xl font-semibold">{stages.filter(s => s.isActive).length}</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Ativo
              </Badge>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Etapas Inativas</p>
                <p className="text-2xl font-semibold">{stages.filter(s => !s.isActive).length}</p>
              </div>
              <Badge variant="outline">Inativo</Badge>
            </div>
          </Card>
        </div>

        {/* Stages Table */}
        <Card>
          <CardHeader>
            <CardTitle>Etapas do Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Ordem</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Cor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Criação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stages
                  .sort((a, b) => a.order - b.order)
                  .map((stage, index) => (
                  <TableRow key={stage.id}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{stage.order}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{stage.name}</TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate">{stage.description || 'Sem descrição'}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: STAGE_COLOR_MAP[stage.color] }}
                        />
                        <span className="text-sm capitalize">{stage.color.replace('pipeline-', '')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={stage.isActive}
                          onCheckedChange={() => toggleStageActive(stage.id)}
                        />
                        <Badge variant={stage.isActive ? "default" : "secondary"}>
                          {stage.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(stage.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStage(stage.id, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStage(stage.id, 'down')}
                          disabled={index === stages.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <EditStageDialog stage={stage} onUpdateStage={updateStage} />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-destructive" />
                                Excluir Etapa
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir a etapa "{stage.name}"? 
                                Esta ação não pode ser desfeita e pode afetar oportunidades existentes.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteStage(stage.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Empty State */}
        {stages.length === 0 && (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma etapa configurada</h3>
            <p className="text-muted-foreground mb-4">
              Configure as etapas do seu pipeline de vendas
            </p>
            <AddStageDialog onAddStage={addStage} />
          </div>
        )}
      </div>
    </div>
  );
}