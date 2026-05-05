import { Business } from "@/interface/interface";

export const useBusinessActions = () => {
  
  const handleNavigation = (business: { latitude?: string; longitude?: string; name: string }) => {
    const dest = business.latitude && business.longitude
      ? `${business.latitude},${business.longitude}`
      : encodeURIComponent(`${business.name} Villavicencio`);
    
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}`, '_blank');
  };

  const handleContact = (phone?: string) => {
    if (!phone) return;
    // Limpia el número de símbolos y espacios
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const handleCall = (phone?: string) => {
    if (!phone) return;
    window.location.href = `tel:${phone}`;
  };

  return { handleNavigation, handleContact, handleCall };
};