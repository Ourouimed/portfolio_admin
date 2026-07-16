export const formatDate = (dateString?: string | Date) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-EN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour : "2-digit" ,
      minute : "2-digit",
      timeZoneName : "short"
    });
  };