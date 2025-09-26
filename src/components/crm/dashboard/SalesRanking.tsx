import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Target } from "lucide-react";

interface SalesPersonRanking {
  id: string;
  name: string;
  email: string;
  department: string;
  totalSales: number;
  totalValue: number;
  position: number;
}

// Mock data baseado nos vendedores existentes
const mockSalesRanking: SalesPersonRanking[] = [
  {
    id: "1",
    name: "Ana Costa",
    email: "ana.costa@empresa.com",
    department: "Vendas",
    totalSales: 12,
    totalValue: 85000,
    position: 1,
  },
  {
    id: "2", 
    name: "Carlos Lima",
    email: "carlos.lima@empresa.com",
    department: "Vendas",
    totalSales: 8,
    totalValue: 33000,
    position: 2,
  },
  {
    id: "3",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    department: "Vendas",
    totalSales: 5,
    totalValue: 22000,
    position: 3,
  },
  {
    id: "4",
    name: "Maria Santos",
    email: "maria.santos@empresa.com", 
    department: "Vendas",
    totalSales: 3,
    totalValue: 15000,
    position: 4,
  },
];

export function SalesRanking() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Target className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case 2:
        return "bg-gray-400/10 text-gray-400 border-gray-400/20";
      case 3:
        return "bg-amber-600/10 text-amber-600 border-amber-600/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="bg-gradient-subtle border-border shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Ranking de Vendedores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockSalesRanking.map((salesperson) => (
            <div
              key={salesperson.id}
              className="flex items-center justify-between p-4 rounded-lg bg-card border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={`px-3 py-1 ${getRankColor(salesperson.position)}`}
                >
                  {getRankIcon(salesperson.position)}
                  #{salesperson.position}
                </Badge>
                
                <div>
                  <h4 className="font-medium text-foreground">{salesperson.name}</h4>
                  <p className="text-sm text-muted-foreground">{salesperson.email}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-success">
                  {formatCurrency(salesperson.totalValue)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {salesperson.totalSales} vendas
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}