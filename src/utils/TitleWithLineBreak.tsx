import React, { Fragment } from 'react';

interface FormattedTitleProps {
  text: string | null | undefined;
}

/**
 * Divide el texto de entrada después del tercer espacio y lo renderiza
 * en el formato: <h1>[Parte 1]</h1> <span>[Parte 2]</span>.
 */
const FormattedTitle: React.FC<FormattedTitleProps> = ({ text }) => {
  // Texto de ejemplo: "Cluster de Turismo de Villavicencio y el Meta"
  if (!text) {
    return null; // or <div></div>, or a default string, depending on your UI needs
  }
  // 1. Dividir la cadena por espacios
  const words = text.split(' '); 
  
  // 2. Definir el punto de división (después del tercer espacio = antes de la cuarta palabra, índice 3)
  const splitIndex = 3; 

  // 3. Obtener la primera parte (hasta la tercera palabra, índice 0, 1, 2)
  const firstPart = words.slice(0, splitIndex).join(' '); // "Cluster de Turismo"
  
  // 4. Obtener la segunda parte (desde la cuarta palabra, índice 3 en adelante)
  const secondPart = words.slice(splitIndex).join(' ');   // "de Villavicencio y el Meta"

  // Si el texto es demasiado corto, renderiza todo en el h1
  if (words.length <= splitIndex) {
    return <h1>{text}</h1>;
  }

  return (
    <div className="text-left"> 
      {/* Primer segmento: <h1> */}
      <h1 className="text-xl font-bold text-blue-900 transition-colors uppercase leading-5">
        {firstPart}
      </h1>
      
      {/* Segundo segmento: <p> */}
      <p className="text-xs font-bold text-blue-700 mt-1 lowercase">
          {secondPart}
      </p>
    </div>
  );
};

export default FormattedTitle;