export const formatDateTime = (dateString?: string | Date) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Casablanca",

  });
};


export const formatDate = (dateString?: string | Date) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


export const getProjectDuration = (startDate: string | null | undefined, endDate: string | null | undefined): string => {
  const start = new Date(startDate || "");
  const end = new Date(endDate || "");

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid dates";
  }

  const diffInDays = Math.ceil(
    Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
  }

  const weeks = Math.ceil(diffInDays / 7);

  return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
};