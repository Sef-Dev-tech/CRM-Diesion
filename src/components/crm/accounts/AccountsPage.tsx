import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddAccountDialog } from "./AddAccountDialog";
import { Account } from "./types";
import { Building2, MapPin, User, Grid3X3, List } from "lucide-react";

const mockAccounts: Account[] = [
  {
    id: '1',
    companyName: 'Empresa ABC Ltda',
    cnpj: '12.345.678/0001-90',
    address: 'Rua das Flores, 123, São Paulo, SP, 01234-567',
    responsible: 'Ana Costa',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    companyName: 'Tech Solutions',
    cnpj: '98.765.432/0001-10',
    address: 'Av. Paulista, 456, São Paulo, SP, 01310-100',
    responsible: 'Carlos Lima',
    createdAt: '2024-01-02',
  },
];

export function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const addAccount = (accountData: Omit<Account, 'id' | 'createdAt'>) => {
    const newAccount: Account = {
      ...accountData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Gestão de Contas</h1>
            <p className="text-muted-foreground">Gerencie todas as empresas cadastradas</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('cards')}
                className="h-8 px-2"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <AddAccountDialog onAddAccount={addAccount} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Contas</p>
                <p className="text-2xl font-semibold">{accounts.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contas Ativas</p>
                <p className="text-2xl font-semibold">{accounts.length}</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Ativo
              </Badge>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Este Mês</p>
                <p className="text-2xl font-semibold">2</p>
              </div>
              <div className="text-sm text-green-600">+100%</div>
            </div>
          </Card>
        </div>

        {/* Accounts List */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map(account => (
              <Card key={account.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">{account.companyName}</h3>
                    <Badge variant="outline" className="text-xs">
                      Ativa
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{account.cnpj || 'CNPJ não informado'}</span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{account.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 flex-shrink-0" />
                      <span>{account.responsible}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Criado em {new Date(account.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map(account => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.companyName}</TableCell>
                    <TableCell>{account.cnpj || 'Não informado'}</TableCell>
                    <TableCell className="max-w-xs truncate">{account.address}</TableCell>
                    <TableCell>{account.responsible}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        Ativa
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(account.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Empty State */}
        {accounts.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma conta cadastrada</h3>
            <p className="text-muted-foreground mb-4">
              Comece cadastrando sua primeira empresa
            </p>
            <AddAccountDialog onAddAccount={addAccount} />
          </div>
        )}
      </div>
    </div>
  );
}