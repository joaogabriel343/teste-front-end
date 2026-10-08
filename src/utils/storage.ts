export const STORAGE_PREFIX = 'econverse:'

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_PREFIX + key)
    return rawValue === null ? fallback : (JSON.parse(rawValue) as T)
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T): boolean {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function clearStorage(): boolean {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => window.localStorage.removeItem(key))
    return true
  } catch {
    return false
  }
}
