import type { ReactNode } from 'react'
import styles from './SectionTitle.module.scss'

interface SectionTitleProps {
  id: string
  children: ReactNode
  action?: ReactNode
}

export function SectionTitle({ id, children, action }: SectionTitleProps) {
  return (
    <div className={styles.wrapper}>
      <h2 id={id} className={styles.title}>
        {children}
      </h2>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
