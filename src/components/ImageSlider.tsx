import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppConfig } from "@/contexts/AppConfigContext";

export const ImageSlider = () => {
  const { appImagesSlider = [] } = useAppConfig();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = appImagesSlider.length;

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // Gestión del temporizador con pausa
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    timerRef.current = setInterval(handleNext, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, handleNext, isPaused]);

  if (total === 0) {
    return (
      <div className="h-60 flex items-center justify-center bg-muted rounded-lg text-muted-foreground italic">
        No hay imágenes disponibles.
      </div>
    );
  }

  return (
    <section 
      className="relative h-[60vh] md:h-[75vh] overflow-hidden rounded-xl shadow-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <div className="relative w-full h-full" aria-live="polite">
        {appImagesSlider.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
            }`}
            aria-hidden={index !== current}
          >
            <img
              src={slide.slide_image_url}
              alt={slide.slide_title || "Imagen de slider"}
              className="w-full h-full object-cover select-none"
              fetchpriority={index === 0 ? "high" : "low"}
            />
            
            {/* Overlay Gradiente para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Contenido Textual */}
            <div className="absolute bottom-12 left-6 md:left-12 right-6 text-white max-w-3xl">
              <h3 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-lg tracking-tight">
                {slide.slide_title}
              </h3>
              <p className="text-lg md:text-2xl text-white/90 drop-shadow-md font-light">
                {slide.slide_subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación - Solo visible si hay más de 1 imagen */}
      {total > 1 && (
        <>
          <div className="absolute inset-y-0 left-4 z-20 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full h-12 w-12 transition-all opacity-0 group-hover:opacity-100"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-8 h-8" />
              <span className="sr-only">Anterior</span>
            </Button>
          </div>

          <div className="absolute inset-y-0 right-4 z-20 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full h-12 w-12 transition-all opacity-0 group-hover:opacity-100"
              onClick={handleNext}
            >
              <ChevronRight className="w-8 h-8" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>

          {/* Indicadores (Dots) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 px-4 py-2 rounded-full backdrop-blur-sm bg-black/10">
            {appImagesSlider.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className="relative h-2 transition-all duration-300"
                style={{ width: index === current ? "24px" : "8px" }}
                aria-label={`Ir a slide ${index + 1}`}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-colors ${
                    index === current ? "bg-white" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};