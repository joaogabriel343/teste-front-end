import { Icon } from '../Icon/Icon'
import styles from './QuantitySelector.module.scss'

interface QuantitySelectorProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
}

export function QuantitySelector({ value, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  return (
    <div className={styles.selector} role="group" aria-label="Quantidade">
      <button
        type="button"
        className={styles.button}
        aria-label="Diminuir quantidade"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Icon name="minus" size={18} strokeWidth={2} />
      </button>
      <output className={styles.value} aria-live="polite">
        {String(value).padStart(2, '0')}
      </output>
      <button
        type="button"
        className={styles.button}
        aria-label="Aumentar quantidade"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Icon name="plus" size={18} strokeWidth={2} />
      </button>
    </div>
  )
}
