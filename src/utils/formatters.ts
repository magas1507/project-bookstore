export function formatDate(date: Date | string | null): string {
  if (!date) return 'N/A';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function printSeparator(): void {
  console.log('─'.repeat(50));
}

export function printHeader(title: string): void {
  console.log('\n' + '*'.repeat(50));
  console.log(`  ${title}`);
  console.log('*'.repeat(50));
}