import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddContactDialog } from "./AddContactDialog";
import { EditContactDialog } from "./EditContactDialog";
import { Contact, Account } from "../accounts/types";
import { User, Mail, Phone, Building2, Grid3X3, List } from "lucide-react";

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

const mockContacts: Contact[] = [
  {
    id: '1',
    fullName: 'João Silva',
    email: 'joao@empresaabc.com',
    phone: '(11) 99999-1111',
    accountId: '1',
    leadSource: 'Website',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    fullName: 'Maria Santos',
    email: 'maria@techsolutions.com',
    phone: '(11) 99999-2222',
    accountId: '2',
    leadSource: 'Indicação',
    createdAt: '2024-01-10',
  },
];

export function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [accounts] = useState<Account[]>(mockAccounts);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const addContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = (contactId: string, contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { ...contact, ...contactData }
          : contact
      )
    );
  };

  const getAccountName = (accountId: string) => {
    return accounts.find(acc => acc.id === accountId)?.companyName || 'Conta não encontrada';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Gestão de Contatos</h1>
            <p className="text-muted-foreground">Gerencie todos os contatos cadastrados</p>
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
            <AddContactDialog accounts={accounts} onAddContact={addContact} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Contatos</p>
                <p className="text-2xl font-semibold">{contacts.length}</p>
              </div>
              <User className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contatos Ativos</p>
                <p className="text-2xl font-semibold">{contacts.length}</p>
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

        {/* Contacts List */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map(contact => (
              <Card key={contact.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">{contact.fullName}</h3>
                    {contact.leadSource && (
                      <Badge variant="outline" className="text-xs">
                        {contact.leadSource}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{contact.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{getAccountName(contact.accountId)}</span>
                    </div>
                  </div>
                  
                  {contact.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {contact.notes}
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Criado em {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                    <EditContactDialog contact={contact} accounts={accounts} onUpdateContact={updateContact} />
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
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map(contact => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.fullName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{getAccountName(contact.accountId)}</TableCell>
                    <TableCell>
                      {contact.leadSource && (
                        <Badge variant="outline" className="text-xs">
                          {contact.leadSource}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <EditContactDialog contact={contact} accounts={accounts} onUpdateContact={updateContact} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Empty State */}
        {contacts.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum contato cadastrado</h3>
            <p className="text-muted-foreground mb-4">
              Comece cadastrando seu primeiro contato
            </p>
            <AddContactDialog accounts={accounts} onAddContact={addContact} />
          </div>
        )}
      </div>
    </div>
  );
}