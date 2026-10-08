import { useId, type InputHTMLAttributes } from 'react'
import styles from './Form.module.scss'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export function TextField({ label, hint, className, ...inputProps }: TextFieldProps) {
  const id = useId()
  const hintId = `${id}-hint`

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={styles.control} aria-describedby={hint ? hintId : undefined} {...inputProps} />
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
    </div>
  )
}
