
export const defaultColors = [
  "#000000", // Black
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#EF4444", // Red
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#6366F1", // Indigo
];

export const downloadQRCode = (dataUrl: string, filename: string = "qrcode") => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const isValidUrl = (url: string): boolean => {
  try {
    // Add http:// if no protocol is specified
    const urlToCheck = url.startsWith("http://") || url.startsWith("https://") 
      ? url 
      : `https://${url}`;
    
    new URL(urlToCheck);
    return true;
  } catch (e) {
    return false;
  }
};

export const formatTextAsUrl = (text: string): string => {
  if (isValidUrl(text)) {
    return text.startsWith("http://") || text.startsWith("https://") 
      ? text 
      : `https://${text}`;
  }
  return text;
};
