import React from 'react';

// 1. Definición de la Interfaz (puede estar en el mismo archivo o importarse)
interface WordCountDisplayProps {
  text: string;
  wordLimit: number;
}

/**
 * Recorta la cadena de texto para mostrar solo las primeras N palabras, 
 * añadiendo puntos suspensivos si el texto es más largo.
 * @param {string} fullText - La cadena de texto completa.
 * @param {number} limit - El límite de palabras.
 * @returns {string} El texto recortado.
 */
const truncateText = (fullText: string, limit: number): string => {
    // Verificación básica: Si no hay texto o el límite no es un número válido.
    if (!fullText || limit <= 0) {
        return "";
    }
    
    // Divide el texto por espacios/saltos de línea y filtra para palabras no vacías
    const words: string[] = fullText.trim().split(/\s+/).filter(word => word.length > 0);
    
    // Si el texto es más corto que el límite, devuelve el original
    if (words.length <= limit) {
        return fullText;
    }
    
    // Recorta el array de palabras
    const truncatedWords: string[] = words.slice(0, limit);
    
    // Une las palabras y añade los tres puntos
    return truncatedWords.join(" ") + "...";
};


/**
 * Componente que muestra un texto truncado a un límite de palabras.
 * @param {WordCountDisplayProps} props - El texto y el límite de palabras.
 */
const WordCountDisplay: React.FC<WordCountDisplayProps> = ({ text, wordLimit }) => {
    
    const shortText: string = truncateText(text, wordLimit);

    return (
        <p className="text-muted-foreground mb-4 text-justify">
            {shortText}
        </p>
    );
};

export default WordCountDisplay;