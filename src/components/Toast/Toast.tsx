import { useEffect } from 'react'
import { useUi } from '../../store/uiContext'
import { Icon } from '../Icon/Icon'
import styles from './Toast.module.scss'

const TOAST_DURATION_MS = 5000

export function Toast() {
  const { toast, dismissToast } = useUi()

  useEffect(() => {
    if (!toast) return

    const timeoutId = window.setTimeout(dismissToast, TOAST_DURATION_MS)
    return () => window.clearTimeout(timeoutId)
  }, [toast, dismissToast])

  return (
    <div className={styles.region} role="status">
      {toast && (
        <div key={toast.id} className={styles.toast}>
          <Icon name="check" size={20} strokeWidth={2.25} className={styles.icon} />
          <p className={styles.text}>{toast.text}</p>
          {toast.action && (
            <a href={toast.action.href} className={styles.action} onClick={dismissToast}>
              {toast.action.label}
            </a>
          )}
          <button type="button" className={styles.close} aria-label="Fechar aviso" onClick={dismissToast}>
            <Icon name="close" size={18} strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  )
}
