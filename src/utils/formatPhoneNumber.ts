// src/utils/formatPhoneNumber.ts

/**
 * Formatea un número de teléfono limpiando caracteres no deseados
 * y aplicando el formato "+XX xxx xxx xxxx" (código de país de 2 dígitos y 10 dígitos restantes)
 * o "+XX xxx xxx xxxx" (código de país de 2 dígitos, 3, 3, y 4 dígitos restantes).
 *
 * @param phone El número de teléfono.
 * @returns El número formateado con espacios, o el número original limpio si no coincide con el formato, o null.
 */
export const formatPhoneNumber = (phone: string | null | undefined): string | null => {
  if (!phone) {
    return null;
  }

  // 1. Limpia el número: Mantiene solo dígitos y el '+' inicial.
  const cleaned = phone.replace(/[^\d+]/g, '');

  // 2. Patrón de coincidencia: +XX XXX XXX XXXX (2+3+3+4 = 12 dígitos después del '+')
  // Este es un formato común que maneja +XX y 10 dígitos locales.
  const match = cleaned.match(/^(\+\d{2})(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    // Retorna el número formateado con espacios: "+XX XXX XXX XXXX"
    console.log(`${match[1]} ${match[2]} ${match[3]} ${match[4]}`)
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  
  // 3. Patrón de coincidencia alternativo (e.g., +XX XXX XXXX) si el anterior no aplica.
  // Puedes añadir más patrones aquí si necesitas cubrir varios países.
  // Si tu patrón anterior (+57 681 5000) era suficiente, úsalo:
  const oldMatch = cleaned.match(/^(\+\d{2})(\d{3})(\d{4})$/);
  if (oldMatch) {
    return `${oldMatch[1]} ${oldMatch[2]} ${oldMatch[3]}`;
  }

  // Si no coincide con ningún formato, retorna el número limpio original
  return cleaned;
};