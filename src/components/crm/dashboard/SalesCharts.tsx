import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";

// Mock data para os gráficos
const monthlyData = [
  { month: "Jan", vendas: 12, valor: 45000 },
  { month: "Fev", vendas: 15, valor: 52000 },
  { month: "Mar", vendas: 8, valor: 38000 },
  { month: "Abr", vendas: 18, valor: 65000 },
  { month: "Mai", vendas: 22, valor: 78000 },
  { month: "Jun", vendas: 25, valor: 85000 },
];

const salesByTeam = [
  { name: "Ana Costa", value: 85000, fill: "hsl(var(--primary))" },
  { name: "Carlos Lima", value: 33000, fill: "hsl(var(--success))" },
  { name: "João Silva", value: 22000, fill: "hsl(var(--warning))" },
  { name: "Maria Santos", value: 15000, fill: "hsl(var(--muted-foreground))" },
];

const chartConfig = {
  vendas: {
    label: "Vendas",
    color: "hsl(var(--primary))",
  },
  valor: {
    label: "Valor",
    color: "hsl(var(--success))",
  },
};

export function SalesCharts() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Gráfico de Vendas Mensais */}
      <Card className="bg-gradient-subtle border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Vendas Mensais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis 
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="vendas" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Tendência de Valores */}
      <Card className="bg-gradient-subtle border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Evolução de Valores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis 
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={formatCurrency}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value, name) => [
                      name === 'valor' ? formatCurrency(Number(value)) : value,
                      name === 'valor' ? 'Valor' : 'Vendas'
                    ]}
                  />} 
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Pizza - Distribuição por Vendedor */}
      <Card className="bg-gradient-subtle border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-warning" />
            Vendas por Vendedor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByTeam}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {salesByTeam.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                  />} 
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Legenda personalizada */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {salesByTeam.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-xs text-muted-foreground truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}