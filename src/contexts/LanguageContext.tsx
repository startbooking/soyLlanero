// src/contexts/LanguageContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define el tipo para el contexto del idioma
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

// Crea el contexto con un valor por defecto (se sobrescribirá por el Provider)
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define las props para el proveedor del contexto
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Estado para el idioma, inicializado con "es" o desde localStorage si existe
  const [language, setLanguage] = useState(() => {
    // Intentar cargar el idioma del localStorage
    const savedLanguage = localStorage.getItem('appLanguage');
    return savedLanguage || 'es'; // "es" como idioma por defecto
  });

  // Guardar el idioma en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para consumir el contexto del idioma
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};