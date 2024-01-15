export function getReadableDateTime(dateString: string) {
  return dateString.replace('T', ' ').substring(0, 16);
}