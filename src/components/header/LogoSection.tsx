import { Home } from "lucide-react";
import { useAppConfig } from "@/contexts/AppConfigContext";
import TitleWithLineBreak from "@/utils/TitleWithLineBreak";

interface LogoSectionProps {
  onHomeClick: () => void;
}

export const LogoSection = ({ onHomeClick }: LogoSectionProps) => {
  const { appConfig } = useAppConfig();
  // console.log(appConfig)
  return (
    <div 
      className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
      onClick={onHomeClick}
    >
      <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 pulse-glow">
        <img className="rounded-lg" src={`/images/${appConfig?.app_logo_url}`} alt="" />
      </div>
      <div className="hidden md:block">
          <h1 className="text-xl font-bold text-sabana transition-colors uppercase leading-5">
            { appConfig?.app_name}
          </h1>
          <h2 className="text-sm font-bold text-sabana/70 ">{appConfig?.app_slogan}</h2>
      </div>
      <div className="hidden md:block">
      </div>
    </div>
  );
};