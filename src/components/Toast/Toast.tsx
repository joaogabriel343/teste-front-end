import { useEffect } from 'react'
import styles from './Toast.module.scss'

const TOAST_DURATION_MS = 4000

interface ToastProps {
  message: string | null
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return

    const timeoutId = window.setTimeout(onDismiss, TOAST_DURATION_MS)
    return () => window.clearTimeout(timeoutId)
  }, [message, onDismiss])

  return (
    <div className={styles.region} role="status">
      {message && <p className={styles.toast}>{message}</p>}
    </div>
  )
}
