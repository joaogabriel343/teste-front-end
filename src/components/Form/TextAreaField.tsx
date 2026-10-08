import { useId, type TextareaHTMLAttributes } from 'react'
import styles from './Form.module.scss'

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export function TextAreaField({ label, className, ...textAreaProps }: TextAreaFieldProps) {
  const id = useId()

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <textarea id={id} className={`${styles.control} ${styles.textarea}`} {...textAreaProps} />
    </div>
  )
}
