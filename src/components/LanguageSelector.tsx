
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check, Loader2 } from 'lucide-react';
import { useI18nContext } from '@/contexts/I18nContext';
import { useCurrentLanguage } from '@/hooks/useI18n';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'outline',
  size = 'default',
  showLabel = true,
  className
}) => {
  const { availableLanguages, changeLanguage, isLanguageLoading } = useI18nContext();
  const currentLanguage = useCurrentLanguage();

  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    default: 'h-9 px-3 text-sm',
    lg: 'h-10 px-4 text-base'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className={cn(
            'gap-2 font-medium transition-all duration-200',
            sizeClasses[size],
            isLanguageLoading && 'opacity-70 cursor-not-allowed',
            className
          )}
          disabled={isLanguageLoading}
        >
          {isLanguageLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span className="text-lg">{currentLanguage.flag}</span>
              {showLabel && (
                <>
                  <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
                  <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
                </>
              )}
              <Globe className="w-4 h-4 opacity-70" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2"
        sideOffset={4}
      >
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'focus:bg-accent focus:text-accent-foreground',
              currentLanguage.code === language.code && 'bg-primary/10 text-primary'
            )}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex-1">
              <div className="font-medium">{language.nativeName}</div>
              <div className="text-xs text-muted-foreground">{language.name}</div>
            </div>
            {currentLanguage.code === language.code && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Componente compacto para espacios reducidos
export const CompactLanguageSelector: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { availableLanguages, changeLanguage, isLanguageLoading } = useI18nContext();
  const currentLanguage = useCurrentLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={cn(
            'w-10 h-10 p-0 rounded-full hover:bg-accent',
            isLanguageLoading && 'opacity-70',
            className
          )}
          disabled={isLanguageLoading}
        >
          {isLanguageLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <span className="text-lg">{currentLanguage.flag}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-40">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="flex items-center gap-2"
          >
            <span>{language.flag}</span>
            <span className="font-medium">{language.code.toUpperCase()}</span>
            {currentLanguage.code === language.code && (
              <Check className="w-4 h-4 ml-auto text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
