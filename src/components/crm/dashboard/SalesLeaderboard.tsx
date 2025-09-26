import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Users } from "lucide-react";

interface SalesPersonLeaderboard {
  id: string;
  name: string;
  email: string;
  department: string;
  totalSales: number;
  totalValue: number;
  averageTicket: number;
  conversionRate: number;
  position: number;
}

// Mock data expandido para a tabela
const mockLeaderboard: SalesPersonLeaderboard[] = [
  {
    id: "1",
    name: "Ana Costa",
    email: "ana.costa@empresa.com",
    department: "Vendas",
    totalSales: 12,
    totalValue: 85000,
    averageTicket: 7083,
    conversionRate: 75,
    position: 1,
  },
  {
    id: "2", 
    name: "Carlos Lima",
    email: "carlos.lima@empresa.com",
    department: "Vendas",
    totalSales: 8,
    totalValue: 33000,
    averageTicket: 4125,
    conversionRate: 65,
    position: 2,
  },
  {
    id: "3",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    department: "Vendas",
    totalSales: 5,
    totalValue: 22000,
    averageTicket: 4400,
    conversionRate: 55,
    position: 3,
  },
  {
    id: "4",
    name: "Maria Santos",
    email: "maria.santos@empresa.com", 
    department: "Vendas",
    totalSales: 3,
    totalValue: 15000,
    averageTicket: 5000,
    conversionRate: 45,
    position: 4,
  },
];

export function SalesLeaderboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getPositionBadge = (position: number) => {
    switch (position) {
      case 1:
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">🥇 1º</Badge>;
      case 2:
        return <Badge className="bg-gray-400/10 text-gray-400 border-gray-400/20">🥈 2º</Badge>;
      case 3:
        return <Badge className="bg-amber-600/10 text-amber-600 border-amber-600/20">🥉 3º</Badge>;
      default:
        return <Badge variant="outline">{position}º</Badge>;
    }
  };

  const getConversionColor = (rate: number) => {
    if (rate >= 70) return "text-success";
    if (rate >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="bg-gradient-subtle border-border shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Lista Completa de Vendedores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Posição</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-center">Vendas</TableHead>
                <TableHead className="text-center">Valor Total</TableHead>
                <TableHead className="text-center">Ticket Médio</TableHead>
                <TableHead className="text-center">Conversão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboard.map((salesperson) => (
                <TableRow key={salesperson.id} className="hover:bg-muted/50">
                  <TableCell>
                    {getPositionBadge(salesperson.position)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">
                        {salesperson.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {salesperson.email}
                      </div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {salesperson.department}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="font-medium">{salesperson.totalSales}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="font-semibold text-success">
                      {formatCurrency(salesperson.totalValue)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-foreground">
                      {formatCurrency(salesperson.averageTicket)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={`flex items-center justify-center gap-1 font-medium ${getConversionColor(salesperson.conversionRate)}`}>
                      <TrendingUp className="h-4 w-4" />
                      {salesperson.conversionRate}%
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Resumo estatístico */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-primary">
              {mockLeaderboard.reduce((sum, s) => sum + s.totalSales, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total de Vendas</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-success">
              {formatCurrency(mockLeaderboard.reduce((sum, s) => sum + s.totalValue, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Faturamento Total</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-warning">
              {formatCurrency(
                mockLeaderboard.reduce((sum, s) => sum + s.averageTicket, 0) / mockLeaderboard.length
              )}
            </div>
            <div className="text-sm text-muted-foreground">Ticket Médio Geral</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-foreground">
              {Math.round(mockLeaderboard.reduce((sum, s) => sum + s.conversionRate, 0) / mockLeaderboard.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Conversão Média</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}