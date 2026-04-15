
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoomImageSliderProps {
  images: string[];
  roomName: string;
}

export const RoomImageSlider = ({ images, roomName }: RoomImageSliderProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(timer);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-[60vh] bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Sin imágenes disponibles</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative w-full h-[60vh] overflow-hidden rounded-lg">
        <img 
          src={images[currentImage]} 
          alt={`${roomName} - Imagen ${currentImage + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* Controles de navegación */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-8 w-8"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-8 w-8"
              onClick={goToNext}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Indicador de posición */}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {currentImage + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentImage 
                  ? "border-primary shadow-md" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => goToImage(index)}
            >
              <img 
                src={image} 
                alt={`${roomName} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
