
import React, { createContext, useContext, ReactNode } from 'react';
import { useI18n, TranslationContext } from '@/hooks/useI18n';

// Crear el contexto
const I18nContext = createContext<TranslationContext | null>(null);

// Proveedor del contexto
interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const i18nValue = useI18n();
  
  return (
    <I18nContext.Provider value={i18nValue}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook para usar el contexto
export const useI18nContext = (): TranslationContext => {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }
  
  return context;
};

// Componente HOC para traducciones
interface WithTranslationProps {
  t: (key: string, params?: Record<string, string>) => string;
  currentLanguage: string;
  changeLanguage: (languageCode: string) => void;
}

export function withTranslation<P extends object>(
  Component: React.ComponentType<P & WithTranslationProps>
) {
  return function WrappedComponent(props: P) {
    const { t, currentLanguage, changeLanguage } = useI18nContext();
    
    return (
      <Component
        {...props}
        t={t}
        currentLanguage={currentLanguage}
        changeLanguage={changeLanguage}
      />
    );
  };
}

// Componente Trans para traducciones complejas con interpolación JSX
interface TransProps {
  i18nKey: string;
  values?: Record<string, string | number>;
  components?: Record<string, React.ReactElement>;
  fallback?: string;
}

export const Trans: React.FC<TransProps> = ({ 
  i18nKey, 
  values = {}, 
  components = {}, 
  fallback 
}) => {
  const { t } = useI18nContext();
  
  let translatedText = t(i18nKey);
  
  if (translatedText === i18nKey && fallback) {
    translatedText = fallback;
  }
  
  // Interpolación simple de valores
  Object.entries(values).forEach(([key, value]) => {
    translatedText = translatedText.replace(
      new RegExp(`\\{\\{${key}\\}\\}`, 'g'), 
      String(value)
    );
  });
  
  // Interpolación de componentes React
  if (Object.keys(components).length > 0) {
    const parts = translatedText.split(/(\{\{[^}]+\}\})/);
    
    return (
      <>
        {parts.map((part, index) => {
          const componentMatch = part.match(/\{\{([^}]+)\}\}/);
          if (componentMatch && components[componentMatch[1]]) {
            return React.cloneElement(components[componentMatch[1]], { key: index });
          }
          return part;
        })}
      </>
    );
  }
  
  return <>{translatedText}</>;
};
