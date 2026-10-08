import type { ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/iconPaths'
import styles from './EmptyState.module.scss'

interface EmptyStateProps {
  icon: IconName
  title: string
  description: ReactNode
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <span className={styles.iconCircle}>
        <Icon name={icon} size={32} />
      </span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
