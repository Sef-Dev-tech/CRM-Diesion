import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineBoard } from "@/components/crm/pipeline/PipelineBoard";
import { DashboardStats } from "@/components/crm/dashboard/DashboardStats";
import { BarChart3, Kanban, Users, Building } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Header */}
      <header className="border-b bg-card shadow-soft px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CRM System
            </h1>
            <p className="text-muted-foreground">Sistema completo de gestão de vendas</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 bg-muted">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <Kanban className="h-4 w-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Contas
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Contatos
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
                <DashboardStats />
              </div>
            </TabsContent>

            <TabsContent value="pipeline" className="space-y-6">
              <PipelineBoard />
            </TabsContent>

            <TabsContent value="accounts" className="space-y-6">
              <div className="flex items-center justify-center h-96 bg-card rounded-lg border border-border">
                <div className="text-center">
                  <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Gestão de Contas</h3>
                  <p className="text-muted-foreground">Em breve - Cadastro e gestão de empresas</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6">
              <div className="flex items-center justify-center h-96 bg-card rounded-lg border border-border">
                <div className="text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Gestão de Contatos</h3>
                  <p className="text-muted-foreground">Em breve - Cadastro e gestão de contatos</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
