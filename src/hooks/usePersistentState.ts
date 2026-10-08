import { useEffect, useRef, useState } from 'react'
import { readStorage, STORAGE_PREFIX, writeStorage } from '../utils/storage'

export function usePersistentState<T>(key: string, initialValue: T) {
  const initialValueRef = useRef(initialValue)
  const [value, setValue] = useState<T>(() => readStorage(key, initialValue))

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_PREFIX + key) return
      setValue(readStorage(key, initialValueRef.current))
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  return [value, setValue] as const
}
