import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  return (
    <Card className="p-6 bg-gradient-subtle border-border shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className={`text-sm ${color}`}>{change}</p>
        </div>
        <div className={`p-3 rounded-full ${color.includes('success') ? 'bg-success/10' : 'bg-primary/10'}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function DashboardStats() {
  const stats = [
    {
      title: "Receita Total",
      value: "R$ 342.500",
      change: "+12% vs mês passado",
      icon: <DollarSign className="h-6 w-6 text-success" />,
      color: "text-success",
    },
    {
      title: "Oportunidades Ativas",
      value: "24",
      change: "+3 novas esta semana",
      icon: <Target className="h-6 w-6 text-primary" />,
      color: "text-primary",
    },
    {
      title: "Taxa de Conversão",
      value: "68%",
      change: "+5% vs mês passado",
      icon: <TrendingUp className="h-6 w-6 text-success" />,
      color: "text-success",
    },
    {
      title: "Novos Leads",
      value: "156",
      change: "+18% esta semana",
      icon: <Users className="h-6 w-6 text-primary" />,
      color: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}