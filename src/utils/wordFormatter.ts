export function wordFormatter(word: string) {
  const wordFormatted = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

  return wordFormatted
}