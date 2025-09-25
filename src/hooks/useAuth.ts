import { useState } from "react";
import { CurrentUser } from "@/components/crm/users/types";

// Mock do usuário logado - simula um administrador para teste
const mockCurrentUser: CurrentUser = {
  id: "1",
  name: "Admin Sistema",
  email: "admin@empresa.com", 
  role: "admin"
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