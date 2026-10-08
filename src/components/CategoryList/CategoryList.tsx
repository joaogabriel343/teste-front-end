import { useState } from 'react'
import { STORE_CATEGORIES } from '../../data/storeContent'
import { Icon } from '../Icon/Icon'
import styles from './CategoryList.module.scss'

export function CategoryList() {
  const [activeCategoryId, setActiveCategoryId] = useState(STORE_CATEGORIES[0].id)

  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <h2 id="categories-title" className="visually-hidden">
        Departamentos
      </h2>
      <ul className={styles.list}>
        {STORE_CATEGORIES.map(({ id, label, icon }) => (
          <li key={id}>
            <button
              type="button"
              className={styles.category}
              aria-pressed={activeCategoryId === id}
              onClick={() => setActiveCategoryId(id)}
            >
              <span className={styles.iconBox}>
                <Icon name={icon} size={40} strokeWidth={1.5} />
              </span>
              <span className={styles.label}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
