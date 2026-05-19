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

  // Configuración de redes sociales para evitar repetición
  const socialPlatforms = [
    { id: 'facebook', icon: Facebook, url: appConfig?.facebook_url },
    { id: 'instagram', icon: Instagram, url: appConfig?.instagram_url },
    { id: 'youtube', icon: Youtube, url: appConfig?.youtube_url },
    { id: 'linkedin', icon: Linkedin, url: appConfig?.linkedin_url },
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formattedPhone = formatPhoneNumber(appConfig?.company_phone);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 text-slate-700 h-8 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Contact Info */}
        <div className="flex items-center gap-4 md:gap-6 text-xs font-medium">
          {appConfig?.company_phone && (
            <a
              className="flex items-center gap-2 hover:text-green-600 transition-colors"
              href={`tel:${appConfig.company_phone}`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">{formattedPhone}</span>
            </a>
          )}
          {appConfig?.company_email && (
            <a
              className="flex items-center gap-2 hover:text-green-600 transition-colors"
              href={`mailto:${appConfig.company_email}`}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden md:inline">{appConfig.company_email}</span>
            </a>
          )}
        </div>
        {/* Actions (Social & Language) */}
        <div className="flex items-center gap-2">
          {/* Social Media Loop */}
          <div className="hidden sm:flex items-center border-r pr-2 mr-2 gap-1">
            {socialPlatforms.map((platform) => platform.url && (
              <Button
                key={platform.id}
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-slate-100"
                onClick={() => handleSocialClick(platform.url!)}
              >
                <platform.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-2 hover:bg-slate-100"
              >
                <Languages className="w-4 h-4" />
                <span className="text-xs uppercase font-bold">
                  {languages.find(l => l.code === currentLanguage)?.flag}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className="flex items-center gap-2 cursor-pointer text-xs"
                >
                  <span>{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </div>
  );
};