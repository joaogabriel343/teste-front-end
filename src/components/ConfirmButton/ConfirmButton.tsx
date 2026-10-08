import { useState } from 'react'
import { Button, type ButtonVariant } from '../Button/Button'
import styles from './ConfirmButton.module.scss'

interface ConfirmButtonProps {
  label: string
  confirmLabel: string
  question: string
  variant?: ButtonVariant
  onConfirm: () => void
}

export function ConfirmButton({ label, confirmLabel, question, variant = 'secondary', onConfirm }: ConfirmButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  if (!isConfirming) {
    return (
      <Button variant={variant} onClick={() => setIsConfirming(true)}>
        {label}
      </Button>
    )
  }

  return (
    <div className={styles.confirm} role="group" aria-label={question}>
      <p className={styles.question}>{question}</p>
      <div className={styles.buttons}>
        <Button
          variant="danger"
          autoFocus
          onClick={() => {
            setIsConfirming(false)
            onConfirm()
          }}
        >
          {confirmLabel}
        </Button>
        <Button variant="ghost" onClick={() => setIsConfirming(false)}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}
