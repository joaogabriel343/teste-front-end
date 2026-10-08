import type { ReactNode } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle'
import type { LinkItem } from '../../data/storeContent'
import styles from './PageHeader.module.scss'

interface PageHeaderProps {
  title: string
  description?: ReactNode
  breadcrumbs?: LinkItem[]
  currentLabel?: string
}

export function PageHeader({ title, description, breadcrumbs = [], currentLabel = title }: PageHeaderProps) {
  usePageTitle(currentLabel)

  return (
    <div className={styles.pageHeader}>
      <nav aria-label="Você está aqui">
        <ol className={styles.breadcrumbs}>
          <li>
            <a href="/" className={styles.crumbLink}>
              Início
            </a>
          </li>
          {breadcrumbs.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.crumbLink}>
                {label}
              </a>
            </li>
          ))}
          <li aria-current="page" className={styles.currentCrumb}>
            {currentLabel}
          </li>
        </ol>
      </nav>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
