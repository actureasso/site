/**
 * Vérifie si une chaîne est une URL d'image valide pour next/image.
 * next/image exige : chemin relatif commençant par "/" ou URL absolue (http:// / https://).
 */
export function isValidImageSrc(src: string | null | undefined): src is string {
  if (!src || typeof src !== 'string' || src.trim() === '') return false
  const s = src.trim()
  return s.startsWith('/') || s.startsWith('http://') || s.startsWith('https://')
}
