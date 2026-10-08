import { STORE_BENEFITS } from '../../data/storeContent'
import { Icon } from '../Icon/Icon'
import styles from './TopBar.module.scss'

export function TopBar() {
  return (
    <div className={styles.topBar}>
      <ul className={styles.benefits} aria-label="Vantagens da loja">
        {STORE_BENEFITS.map(({ icon, highlight, text, highlightFirst }) => (
          <li key={highlight} className={styles.benefit}>
            <Icon name={icon} size={18} className={styles.icon} />
            <span>
              {highlightFirst ? (
                <>
                  <strong>{highlight}</strong> {text}
                </>
              ) : (
                <>
                  {text} <strong>{highlight}</strong>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
