export interface Account {
  id: string;
  companyName: string;
  cnpj: string;
  address: string;
  responsible: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  accountId: string;
  leadSource?: string;
  notes?: string;
  createdAt: string;
}