import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, TrendingUp, Target } from "lucide-react";

interface SalesPersonStats {
  id: string;
  name: string;
  email: string;
  department?: string;
  activeOpportunities: number;
  totalValue: number;
}

// Mock data baseado nos usuários e oportunidades existentes
const mockSalesTeamStats: SalesPersonStats[] = [
  {
    id: "1",
    name: "Ana Costa",
    email: "ana.costa@empresa.com",
    department: "Vendas",
    activeOpportunities: 3,
    totalValue: 85000,
  },
  {
    id: "2", 
    name: "Carlos Lima",
    email: "carlos.lima@empresa.com",
    department: "Vendas",
    activeOpportunities: 2,
    totalValue: 33000,
  },
  {
    id: "3",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    department: "Vendas",
    activeOpportunities: 0,
    totalValue: 0,
  },
  {
    id: "4",
    name: "Maria Santos",
    email: "maria.santos@empresa.com", 
    department: "Vendas",
    activeOpportunities: 0,
    totalValue: 0,
  },
];

export function SalesTeamStats() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Equipe de Vendas</h3>
        <p className="text-sm text-muted-foreground">Performance individual dos vendedores</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockSalesTeamStats.map((salesperson) => (
          <Card key={salesperson.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-medium truncate">
                    {salesperson.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground truncate">
                    {salesperson.email}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {salesperson.department && (
                <Badge variant="outline" className="text-xs">
                  {salesperson.department}
                </Badge>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-primary" />
                    <span className="text-xs text-muted-foreground">Oportunidades</span>
                  </div>
                  <span className="text-sm font-medium">
                    {salesperson.activeOpportunities}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-xs text-muted-foreground">Valor Total</span>
                  </div>
                  <span className="text-sm font-medium text-success">
                    {formatCurrency(salesperson.totalValue)}
                  </span>
                </div>
              </div>
              
              {salesperson.activeOpportunities === 0 && (
                <div className="text-center py-2">
                  <p className="text-xs text-muted-foreground">
                    Nenhuma oportunidade ativa
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}