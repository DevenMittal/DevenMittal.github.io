export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(date);
}

export function formatMonth(month: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', timeZone: 'UTC',
  }).format(new Date(`${month}-01T00:00:00Z`));
}
