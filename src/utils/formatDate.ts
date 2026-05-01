export const formatDate = (date: any) => {
    if (!date) return "---";
    const d = new Date(date);
    return format(d, "dd MMM, yyyy", { locale: es });
  };