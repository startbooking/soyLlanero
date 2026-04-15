
import { useState, useEffect, useMemo } from 'react';
import { translations } from '@/utils/translations';

// Tipos para el sistema de internacionalización
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isActive: boolean;
  isDefault: boolean;
}

export interface TranslationContext {
  currentLanguage: string;
  availableLanguages: Language[];
  t: (key: string, params?: Record<string, string>) => string;
  changeLanguage: (languageCode: string) => void;
  isLanguageLoading: boolean;
}

// Idiomas disponibles
const AVAILABLE_LANGUAGES: Language[] = [
  {
    code: 'es',
    name: 'Español',
    nativeName: 'Español',
    flag: '🇪🇸',
    isActive: true,
    isDefault: true
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    isActive: true,
    isDefault: false
  },
  {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
    isActive: true,
    isDefault: false
  }
];

// Hook personalizado para internacionalización
export const useI18n = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Obtener idioma del localStorage o usar el predeterminado
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage && AVAILABLE_LANGUAGES.find(lang => lang.code === savedLanguage)) {
        return savedLanguage;
      }
      
      // Detectar idioma del navegador
      const browserLanguage = navigator.language.slice(0, 2);
      if (AVAILABLE_LANGUAGES.find(lang => lang.code === browserLanguage)) {
        return browserLanguage;
      }
    }
    
    return 'es'; // Idioma predeterminado
  });

  const [isLanguageLoading, setIsLanguageLoading] = useState(false);

  // Guardar idioma seleccionado en localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', currentLanguage);
    }
  }, [currentLanguage]);

  // Función para cambiar idioma
  const changeLanguage = async (languageCode: string) => {
    if (languageCode === currentLanguage) return;
    
    setIsLanguageLoading(true);
    
    // Simular carga de traducciones desde el servidor
    // En una implementación real, aquí cargarías las traducciones desde la API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCurrentLanguage(languageCode);
    setIsLanguageLoading(false);
  };

  // Función de traducción con interpolación de parámetros
  const t = useMemo(() => {
    return (key: string, params: Record<string, string> = {}) => {
      // Navegar por el objeto de traducciones usando la clave
      const keys = key.split('.');
      let value: any = translations[currentLanguage as keyof typeof translations] || translations.es;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Si no se encuentra la traducción, intentar con el idioma predeterminado
          value = translations.es;
          for (const fallbackKey of keys) {
            if (value && typeof value === 'object' && fallbackKey in value) {
              value = value[fallbackKey];
            } else {
              value = key; // Devolver la clave si no se encuentra traducción
              break;
            }
          }
          break;
        }
      }
      
      // Si no es string, devolver la clave
      if (typeof value !== 'string') {
        return key;
      }
      
      // Interpolación de parámetros
      let translatedValue = value;
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translatedValue = translatedValue.replace(new RegExp(`\\{\\{${paramKey}\\}\\}`, 'g'), paramValue);
      });
      
      return translatedValue;
    };
  }, [currentLanguage]);

  // Obtener idiomas activos
  const availableLanguages = useMemo(() => {
    return AVAILABLE_LANGUAGES.filter(lang => lang.isActive);
  }, []);

  return {
    currentLanguage,
    availableLanguages,
    t,
    changeLanguage,
    isLanguageLoading
  };
};

// Hook para obtener información del idioma actual
export const useCurrentLanguage = () => {
  const { currentLanguage, availableLanguages } = useI18n();
  
  const currentLanguageInfo = useMemo(() => {
    return availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0];
  }, [currentLanguage, availableLanguages]);
  
  return currentLanguageInfo;
};

// Utilidad para formatear números según el idioma
export const useNumberFormat = () => {
  const { currentLanguage } = useI18n();
  
  const formatNumber = useMemo(() => {
    return (number: number, options?: Intl.NumberFormatOptions) => {
      const locale = currentLanguage === 'es' ? 'es-CO' : 
                   currentLanguage === 'en' ? 'en-US' : 
                   'fr-FR';
      
      return new Intl.NumberFormat(locale, options).format(number);
    };
  }, [currentLanguage]);
  
  const formatCurrency = useMemo(() => {
    return (amount: number, currency: string = 'COP') => {
      const locale = currentLanguage === 'es' ? 'es-CO' : 
                   currentLanguage === 'en' ? 'en-US' : 
                   'fr-FR';
      
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
  }, [currentLanguage]);
  
  return { formatNumber, formatCurrency };
};

// Utilidad para formatear fechas según el idioma
export const useDateFormat = () => {
  const { currentLanguage } = useI18n();
  
  const formatDate = useMemo(() => {
    return (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const locale = currentLanguage === 'es' ? 'es-CO' : 
                   currentLanguage === 'en' ? 'en-US' : 
                   'fr-FR';
      
      return new Intl.DateTimeFormat(locale, options).format(dateObj);
    };
  }, [currentLanguage]);
  
  const formatRelativeTime = useMemo(() => {
    return (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
      
      const locale = currentLanguage === 'es' ? 'es-CO' : 
                   currentLanguage === 'en' ? 'en-US' : 
                   'fr-FR';
      
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      
      if (diffInSeconds < 60) {
        return rtf.format(-diffInSeconds, 'second');
      } else if (diffInSeconds < 3600) {
        return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
      } else if (diffInSeconds < 86400) {
        return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
      } else {
        return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
      }
    };
  }, [currentLanguage]);
  
  return { formatDate, formatRelativeTime };
};
