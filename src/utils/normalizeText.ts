export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

export function slugify(text: string): string {
  return normalizeText(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function splitWords(text: string): string[] {
  return normalizeText(text).split(/[^a-z0-9]+/).filter(Boolean)
}

export function containsAnyWord(text: string, words: string[]): boolean {
  const textWords = splitWords(text)
  return words.some((word) => textWords.includes(normalizeText(word)))
}

export function matchesSearch(text: string, query: string): boolean {
  const textWords = splitWords(text)
  return splitWords(query).every((queryWord) => textWords.some((textWord) => textWord.startsWith(queryWord)))
}
