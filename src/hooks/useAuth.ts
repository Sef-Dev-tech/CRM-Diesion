import { useState } from "react";
import { CurrentUser } from "@/components/crm/users/types";

// Mock do usuário logado - troque entre admin e vendedor para testar
const mockCurrentUser: CurrentUser = {
  id: "1",
  name: "Admin Sistema", // Mude para "Ana Costa" ou "Carlos Lima" para testar como vendedor
  email: "admin@empresa.com", 
  role: "admin" // Mude para "user" para testar como vendedor
};

export function useAuth() {
  const [currentUser] = useState<CurrentUser>(mockCurrentUser);
  
  const isAdmin = currentUser?.role === 'admin';
  
  return {
    currentUser,
    isAdmin,
    isAuthenticated: !!currentUser
  };
}