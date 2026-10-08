const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate))
}
