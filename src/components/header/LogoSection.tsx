import { useAppConfig } from "@/contexts/AppConfigContext";

interface LogoSectionProps {
  onHomeClick: () => void;
}

export const LogoSection = ({ onHomeClick }: LogoSectionProps) => {
  const { appConfig } = useAppConfig();
  
  return (
    <div 
      className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
      onClick={onHomeClick}
    >
      {/* Contenedor del Logo */}
      <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 pulse-glow bg-white shadow-sm overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          src={`/images/${appConfig?.app_logo_url}`} 
          alt="Logo" 
        />
      </div>

      {/* Bloque de Texto: Agregamos flex-col y justify-center para evitar que las cajas se estiren */}
      <div className="flex flex-col justify-center select-none">
          <h1 className="text-sm md:text-xl font-extrabold text-sabana transition-colors uppercase leading-none tracking-tight">
            {appConfig?.app_name}
          </h1>
          {appConfig?.app_slogan && (
            <h2 className="text-[9px] md:text-xs font-medium text-sabana/80 leading-tight mt-0.5">
              {appConfig?.app_slogan}
            </h2>
          )}
      </div>
    </div>
  );
};