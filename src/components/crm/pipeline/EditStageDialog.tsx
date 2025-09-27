import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PipelineStage, StageFormData } from "./types";
import { Edit2 } from "lucide-react";

const stageSchema = z.object({
  name: z.string().min(1, "Nome da etapa é obrigatório"),
  description: z.string().optional(),
  color: z.string().min(1, "Selecione uma cor"),
});

const STAGE_COLORS = [
  { id: 'pipeline-lead', name: 'Azul Claro', color: 'hsl(197, 71%, 73%)' },
  { id: 'pipeline-qualified', name: 'Verde', color: 'hsl(142, 76%, 36%)' },
  { id: 'pipeline-proposal', name: 'Amarelo', color: 'hsl(38, 92%, 50%)' },
  { id: 'pipeline-negotiation', name: 'Roxo', color: 'hsl(271, 81%, 56%)' },
  { id: 'pipeline-closed', name: 'Verde Escuro', color: 'hsl(120, 93%, 29%)' },
  { id: 'pipeline-lost', name: 'Vermelho', color: 'hsl(0, 84%, 60%)' },
];

interface EditStageDialogProps {
  stage: PipelineStage;
  onUpdateStage: (stageId: string, data: StageFormData) => void;
}

export function EditStageDialog({ stage, onUpdateStage }: EditStageDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<StageFormData>({
    resolver: zodResolver(stageSchema),
    defaultValues: {
      name: stage.name,
      description: stage.description || "",
      color: stage.color,
    },
  });

  const onSubmit = (data: StageFormData) => {
    onUpdateStage(stage.id, data);
    setOpen(false);
    toast({
      title: "Etapa atualizada",
      description: "As informações da etapa foram atualizadas com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Etapa</DialogTitle>
          <DialogDescription>
            Atualize as informações da etapa do pipeline.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Etapa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Contato Inicial" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o que acontece nesta etapa"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor da Etapa</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STAGE_COLORS.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color.color }}
                            />
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Atualizar Etapa</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}