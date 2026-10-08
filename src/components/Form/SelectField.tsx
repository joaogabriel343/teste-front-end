import { useId, type SelectHTMLAttributes } from 'react'
import styles from './Form.module.scss'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
}

export function SelectField({ label, options, className, ...selectProps }: SelectFieldProps) {
  const id = useId()

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select id={id} className={`${styles.control} ${styles.select}`} {...selectProps}>
        {options.map(({ value, label: optionLabel }) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  )
}
