import type { ReactNode } from 'react'
import styles from './SectionTitle.module.scss'

interface SectionTitleProps {
  id: string
  children: ReactNode
  action?: ReactNode
  withLines?: boolean
}

export function SectionTitle({ id, children, action, withLines = true }: SectionTitleProps) {
  return (
    <div className={styles.wrapper}>
      <h2 id={id} className={styles.title} data-lines={withLines}>
        {children}
      </h2>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
