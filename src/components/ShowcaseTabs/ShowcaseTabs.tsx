import type { ShowcaseTab } from '../../data/storeContent'
import styles from './ShowcaseTabs.module.scss'

interface ShowcaseTabsProps {
  tabs: ShowcaseTab[]
  activeTabId: ShowcaseTab['id']
  onChange: (tabId: ShowcaseTab['id']) => void
}

export function ShowcaseTabs({ tabs, activeTabId, onChange }: ShowcaseTabsProps) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.tabs} aria-label="Filtrar produtos por categoria">
        {tabs.map(({ id, label }) => (
          <li key={id} className={styles.item}>
            <button
              type="button"
              className={styles.tab}
              aria-pressed={activeTabId === id}
              onClick={() => onChange(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
