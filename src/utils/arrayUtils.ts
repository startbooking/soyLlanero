/**
 * Implementa el algoritmo Fisher-Yates (Knuth) para mezclar un array.
 * @template T El tipo de los elementos del array.
 * @param array El array a mezclar. Nota: ESTA FUNCIÓN MUTA el array original.
 * @returns El array original mutado (ahora mezclado).
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const arrayCopy = [...array];

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
};