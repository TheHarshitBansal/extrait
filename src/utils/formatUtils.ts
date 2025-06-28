export const formatFileNameAsTitle = (fileName: string): string => {
  // Remove file extension and replace underscores with spaces
  const title = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
  return title.charAt(0).toUpperCase() + title.slice(1);
}