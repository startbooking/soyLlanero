import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import { useAppConfig } from "@/contexts/AppConfigContext";

interface TopBarProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const TopBar = ({ currentLanguage, onLanguageChange }: TopBarProps) => {
  const { appConfig } = useAppConfig();
  const languages = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  const openSocialMedia = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const rawPhone = appConfig?.company_phone;
  const formattedPhone = formatPhoneNumber(rawPhone);
  return (
    <div className="bg-white/50 backdrop-blur-md text-black-700 px-1 md:px-4 text-xs fixed top-0 left-0 right-0 z-50 hover:bg-green/20">
      <div className="px-2 md:px-5 mx-auto flex justify-between items-center">
        {/* Información de contacto - Solo iconos en móvil */}
        <div className="flex items-center gap-2 md:gap-6">
          <div>
            <a className="flex items-center gap-2 flex" href={`tel:${appConfig?.company_phone}`}>
              <Phone className="w-5 h-5" />
              <span className="hidden md:inline">
                {formattedPhone}
              </span>
            </a>
          </div>
          <div>
            <a  className="flex items-center gap-2" href={`mail:${appConfig?.company_email}`}>

            <Mail className="w-5 h-5" />
            <span className="hidden md:inline">
              {appConfig?.company_email}
            </span>
            </a>
          </div>
        </div>

        {/* Redes sociales e idiomas - Sin WhatsApp */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1">
            {appConfig?.facebook_url && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-2 text-black hover:bg-black/20 sr-only"
                
                onClick={() =>
                  openSocialMedia(
                    appConfig?.facebook_url
                  )
                }
              >
                <Facebook className="w-5 h-5" />
              </Button>
            )}
            {appConfig?.instagram_url && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-black hover:bg-black/20 sr-only"
                onClick={() =>
                  openSocialMedia(
                    appConfig?.instagram_url
                  )
                }
              >
                <Instagram className="w-5 h-5" />
              </Button>
            )}
            {appConfig?.youtube_url && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-black hover:bg-black/20 sr-only"
                onClick={() =>
                  openSocialMedia(
                    appConfig?.youtube_url
                  )
                }
              >
                <Youtube className="w-5 h-5" />
              </Button>
            )}
            {appConfig?.linkedin_url && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-black hover:bg-black/20 sr-only"
                onClick={() =>
                  openSocialMedia(
                    appConfig?.linkedin_url
                  )
                }
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Selector de idioma */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className="h-8 p-2 text-black hover:bg-black/20 sr-only"
                aria-label="Abrir menú de opciones"
              >
                <Languages className="w-5 h-5 mr-1" />
                <span className="hidden md:inline sr-only">
                  {
                    languages.find((lang) => lang.code === currentLanguage)
                      ?.flag
                  }
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => onLanguageChange(language.code)}
                  className="h-8 p-2 cursor-pointer sr-only"
                >
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
