import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Users } from "lucide-react";

interface SalesPersonGoal {
  id: string;
  name: string;
  goal: number;
  achieved: number;
  percentage: number;
}

interface TeamGoal {
  totalGoal: number;
  totalAchieved: number;
  percentage: number;
}

const mockSalesPersonGoals: SalesPersonGoal[] = [
  {
    id: "1",
    name: "Ana Silva",
    goal: 150000,
    achieved: 125000,
    percentage: 83.3
  },
  {
    id: "2", 
    name: "Carlos Santos",
    goal: 120000,
    achieved: 98000,
    percentage: 81.7
  },
  {
    id: "3",
    name: "Marina Costa", 
    goal: 180000,
    achieved: 195000,
    percentage: 108.3
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    goal: 140000,
    achieved: 118000,
    percentage: 84.3
  }
];

const teamGoal: TeamGoal = {
  totalGoal: 590000,
  totalAchieved: 536000,
  percentage: 90.8
};

export function SalesGoals() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-success";
    if (percentage >= 80) return "bg-warning";
    return "bg-primary";
  };

  const getBadgeVariant = (percentage: number) => {
    if (percentage >= 100) return "default" as const;
    if (percentage >= 80) return "secondary" as const;
    return "outline" as const;
  };

  return (
    <div className="space-y-6">
      {/* Meta Geral da Equipe */}
      <Card className="bg-gradient-subtle border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Meta Geral da Equipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{formatCurrency(teamGoal.totalAchieved)}</p>
                <p className="text-sm text-muted-foreground">
                  Meta: {formatCurrency(teamGoal.totalGoal)}
                </p>
              </div>
              <Badge variant={getBadgeVariant(teamGoal.percentage)} className="text-lg px-3 py-1">
                {teamGoal.percentage.toFixed(1)}%
              </Badge>
            </div>
            <Progress 
              value={teamGoal.percentage} 
              className="h-3"
            />
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">
                Faltam {formatCurrency(teamGoal.totalGoal - teamGoal.totalAchieved)} para atingir a meta
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metas Individuais */}
      <Card className="bg-gradient-subtle border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Metas Individuais dos Vendedores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSalesPersonGoals.map((person) => (
              <div key={person.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(person.achieved)} / {formatCurrency(person.goal)}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getBadgeVariant(person.percentage)}>
                    {person.percentage.toFixed(1)}%
                  </Badge>
                </div>
                <Progress 
                  value={person.percentage > 100 ? 100 : person.percentage}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}