import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineBoard } from "@/components/crm/pipeline/PipelineBoard";
import { DashboardStats } from "@/components/crm/dashboard/DashboardStats";
import { SalesTeamStats } from "@/components/crm/dashboard/SalesTeamStats";
import { SalesRanking } from "@/components/crm/dashboard/SalesRanking";
import { SalesCharts } from "@/components/crm/dashboard/SalesCharts";
import { SalesLeaderboard } from "@/components/crm/dashboard/SalesLeaderboard";
import { SalesGoals } from "@/components/crm/dashboard/SalesGoals";
import { AccountsPage } from "@/components/crm/accounts/AccountsPage";
import { ContactsPage } from "@/components/crm/contacts/ContactsPage";
import { PropertiesPage } from "@/components/crm/properties/PropertiesPage";
import { UsersPage } from "@/components/crm/users/UsersPage";
import { useAuth } from "@/hooks/useAuth";
import { BarChart3, Kanban, Users, Building, UserCheck, Home } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Index = () => {
  const { isAdmin } = useAuth();
  
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
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className={`grid w-full ${isAdmin ? 'max-w-3xl grid-cols-6' : 'max-w-2xl grid-cols-5'} bg-muted`}>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <Kanban className="h-4 w-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Imóveis
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Contas
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Contatos
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="users" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Usuários
              </TabsTrigger>
            )}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
                <DashboardStats />
              </div>
              
              <div>
                <SalesCharts />
              </div>
              
              <div>
                <SalesGoals />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <SalesRanking />
                </div>
                <div>
                  <SalesTeamStats />
                </div>
              </div>
              
              <div>
                <SalesLeaderboard />
              </div>
            </TabsContent>

            <TabsContent value="pipeline" className="space-y-6">
              <PipelineBoard />
            </TabsContent>

            <TabsContent value="properties" className="space-y-6">
              <PropertiesPage />
            </TabsContent>

            <TabsContent value="accounts" className="space-y-6">
              <AccountsPage />
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6">
              <ContactsPage />
            </TabsContent>

            {isAdmin && (
              <TabsContent value="users" className="space-y-6">
                <UsersPage />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
