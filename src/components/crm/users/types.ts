export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  department?: string;
  createdAt: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}