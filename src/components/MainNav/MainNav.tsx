import { MAIN_NAVIGATION } from '../../data/storeContent'
import { Icon } from '../Icon/Icon'
import styles from './MainNav.module.scss'

interface MainNavProps {
  id: string
  isOpen: boolean
}

export function MainNav({ id, isOpen }: MainNavProps) {
  return (
    <nav id={id} className={styles.nav} data-open={isOpen} aria-label="Categorias principais">
      <ul className={styles.list}>
        {MAIN_NAVIGATION.map(({ label, href, highlighted, icon }) => (
          <li key={href}>
            <a href={href} className={styles.link} data-highlighted={highlighted ?? false}>
              {icon && <Icon name={icon} size={18} className={styles.linkIcon} />}
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
