import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddPropertyDialog } from "./AddPropertyDialog";
import { Property, propertyTypeLabels } from "./types";
import { Home, MapPin, Bed, Bath, Car, Grid3X3, List, Building2, Eye } from "lucide-react";

// Import property images
import property1Exterior from "@/assets/property-1-exterior.jpg";
import property1Living from "@/assets/property-1-living.jpg";
import property1Kitchen from "@/assets/property-1-kitchen.jpg";
import property2Exterior from "@/assets/property-2-exterior.jpg";
import property2Living from "@/assets/property-2-living.jpg";
import { ImageGallery } from "./ImageGallery";
// Mock data para imóveis
const mockProperties: Property[] = [
  {
    id: "1",
    type: "apartamento",
    saleValue: 350000,
    condominium: "Residencial Jardim das Flores",
    address: {
      street: "Rua das Palmeiras",
      number: "123",
      complement: "Apt 101",
      neighborhood: "Jardim Botânico",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    },
    characteristics: {
      totalArea: 85,
      bedrooms: 3,
      suites: 1,
      bathrooms: 2,
      parkingSpaces: 1,
      floor: 10
    },
    observations: "Apartamento reformado com vista para o parque",
    photos: [property1Exterior, property1Living, property1Kitchen],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    type: "casa",
    saleValue: 450000,
    address: {
      street: "Rua dos Ipês",
      number: "456",
      neighborhood: "Vila Madalena",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-890"
    },
    characteristics: {
      totalArea: 120,
      bedrooms: 4,
      suites: 2,
      bathrooms: 3,
      parkingSpaces: 2
    },
    observations: "Casa térrea com quintal amplo",
    photos: [property2Exterior, property2Living],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "3",
    type: "comercial",
    saleValue: 800000,
    address: {
      street: "Avenida Paulista",
      number: "1000",
      complement: "Sala 501",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-000"
    },
    characteristics: {
      totalArea: 60,
      bedrooms: 0,
      suites: 0,
      bathrooms: 2,
      parkingSpaces: 2,
      floor: 5
    },
    observations: "Sala comercial em prédio corporativo",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25")
  }
];

export function PropertiesPage() {
  const [properties] = useState<Property[]>(mockProperties);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);

  const openGallery = (photos: string[] = []) => {
    setGalleryPhotos(photos);
    setGalleryOpen(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatAddress = (address: Property['address']) => {
    return `${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ''} - ${address.neighborhood}, ${address.city}/${address.state}`;
  };

  const handlePropertyAdded = () => {
    // Refresh logic would go here
    console.log("Property added, refreshing list...");
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="hover:shadow-md transition-shadow bg-gradient-subtle border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <Badge variant="outline" className="text-xs">
              {propertyTypeLabels[property.type]}
            </Badge>
          </div>
          <div className="text-lg font-bold text-success">
            {formatCurrency(property.saleValue)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            {formatAddress(property.address)}
          </div>
        </div>
        
        {property.condominium && (
          <div className="text-sm">
            <span className="font-medium">Condomínio:</span> {property.condominium}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-primary" />
            <span>{property.characteristics.totalArea} m²</span>
          </div>
          
          {property.characteristics.bedrooms > 0 && (
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-primary" />
              <span>{property.characteristics.bedrooms} dorm.</span>
            </div>
          )}
          
          {property.characteristics.bathrooms > 0 && (
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-primary" />
              <span>{property.characteristics.bathrooms} banh.</span>
            </div>
          )}
          
          {property.characteristics.parkingSpaces > 0 && (
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-primary" />
              <span>{property.characteristics.parkingSpaces} vagas</span>
            </div>
          )}
        </div>
        
        {property.characteristics.suites > 0 && (
          <div className="text-sm">
            <span className="font-medium">Suítes:</span> {property.characteristics.suites}
          </div>
        )}
        
        {property.type === "apartamento" && property.characteristics.floor && (
          <div className="text-sm">
            <span className="font-medium">Andar:</span> {property.characteristics.floor}º
          </div>
        )}
        
        {property.observations && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Obs:</span> {property.observations}
          </div>
        )}
        {property.photos && property.photos.length > 0 && (
          <div className="pt-2">
            <Button variant="outline" size="sm" onClick={() => openGallery(property.photos!)}>
              <Eye className="h-4 w-4 mr-2" /> Visualizar fotos
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Imóveis</h2>
          <p className="text-muted-foreground">
            Gerencie o portfólio de imóveis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <AddPropertyDialog onPropertyAdded={handlePropertyAdded} />
        </div>
      </div>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Quartos</TableHead>
                  <TableHead>Banheiros</TableHead>
                  <TableHead>Vagas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <Badge variant="outline">
                        {propertyTypeLabels[property.type]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium truncate">
                          {property.address.street}, {property.address.number}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {property.address.neighborhood}, {property.address.city}/{property.address.state}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-success">
                      {formatCurrency(property.saleValue)}
                    </TableCell>
                    <TableCell>{property.characteristics.totalArea} m²</TableCell>
                    <TableCell>{property.characteristics.bedrooms}</TableCell>
                    <TableCell>{property.characteristics.bathrooms}</TableCell>
                    <TableCell>{property.characteristics.parkingSpaces}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <ImageGallery open={galleryOpen} onOpenChange={setGalleryOpen} photos={galleryPhotos} />

      {properties.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhum imóvel cadastrado</h3>
          <p className="text-muted-foreground mb-4">
            Comece adicionando seu primeiro imóvel ao sistema.
          </p>
          <AddPropertyDialog onPropertyAdded={handlePropertyAdded} />
        </div>
      )}
    </div>
  );
}