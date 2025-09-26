import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: string[];
  title?: string;
}

export function ImageGallery({ open, onOpenChange, photos, title = "Fotos do Imóvel" }: ImageGalleryProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {photos && photos.length > 0 ? (
          <div className="relative">
            <Carousel opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {photos.map((src, idx) => (
                  <CarouselItem key={idx} className="md:basis-full">
                    <div className={cn("w-full overflow-hidden rounded-lg border bg-background")}> 
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        src={src}
                        alt={`Foto do imóvel ${idx + 1}`}
                        className="w-full h-[420px] object-cover"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious aria-label="Foto anterior" />
              <CarouselNext aria-label="Próxima foto" />
            </Carousel>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhuma foto disponível para este imóvel.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
