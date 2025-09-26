export interface Property {
  id: string;
  type: PropertyType;
  saleValue: number;
  condominium?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  characteristics: {
    totalArea: number;
    bedrooms: number;
    suites: number;
    bathrooms: number;
    parkingSpaces: number;
    floor?: number;
  };
  observations?: string;
  photos?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyType = 
  | "casa"
  | "apartamento" 
  | "terreno"
  | "comercial"
  | "chacara"
  | "sitio";

export const propertyTypeLabels: Record<PropertyType, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  comercial: "Comercial",
  chacara: "Chácara",
  sitio: "Sítio"
};