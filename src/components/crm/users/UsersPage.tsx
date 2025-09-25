import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddUserDialog } from "./AddUserDialog";
import { User } from "./types";
import { Mail, User as UserIcon, Shield, Users as UsersIcon } from "lucide-react";

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin Sistema",
    email: "admin@empresa.com",
    role: "admin",
    department: "TI",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2", 
    name: "João Silva",
    email: "joao.silva@empresa.com",
    role: "user",
    department: "Vendas",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria.santos@empresa.com", 
    role: "user",
    department: "Marketing",
    createdAt: new Date().toISOString(),
  },
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleAddUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'destructive' : 'secondary';
  };

  const getRoleLabel = (role: string) => {
    return role === 'admin' ? 'Administrador' : 'Usuário';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Usuários</h2>
          <p className="text-muted-foreground">Gerencie os usuários do sistema</p>
        </div>
        <AddUserDialog onAddUser={handleAddUser} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <Badge variant={getRoleBadgeVariant(user.role)} className="ml-2">
                  <Shield className="h-3 w-3 mr-1" />
                  {getRoleLabel(user.role)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                
                {user.department && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UsersIcon className="h-4 w-4" />
                    <span>{user.department}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="h-4 w-4" />
                  <span>Criado em {new Date(user.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {users.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UsersIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum usuário cadastrado</h3>
            <p className="text-muted-foreground text-center">
              Comece adicionando o primeiro usuário ao sistema.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}