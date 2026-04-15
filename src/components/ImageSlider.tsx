
import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppConfig } from "@/contexts/AppConfigContext";

export const ImageSlider = () => {
  const { appImagesSlider } = useAppConfig();
  const [currentImage, setCurrentImage] = useState(0);

  const images = appImagesSlider || [];
  const totalImages = images.length;

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const goToNext = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    if (totalImages === 0) return; // No iniciar el temporizador si no hay imágenes

    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [totalImages, goToNext]);

  if (totalImages === 0) {
    return <div className="h-60 flex items-center justify-center text-4xl text-gray-500">No hay imágenes disponibles.</div>;
  }

  return (
    <div className="relative h-[75vh] overflow-hidden rounded-lg">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.slide_image_url}
              alt={image.slide_title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-4xl font-bold mb-2">{image.slide_title}</h3>
              <p className="text-2xl opacity-90">{image.slide_subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
        onClick={goToNext}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};
