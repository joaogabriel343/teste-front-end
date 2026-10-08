import { STORE_CATEGORIES } from '../../data/storeContent'
import { staggerDelay } from '../../utils/staggerDelay'
import { Icon } from '../Icon/Icon'
import styles from './CategoryList.module.scss'

interface CategoryListProps {
  activeCategoryId?: string
  isCurrentPage?: boolean
}

export function CategoryList({ activeCategoryId, isCurrentPage = false }: CategoryListProps) {
  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <h2 id="categories-title" className="visually-hidden">
        Departamentos
      </h2>
      <ul className={styles.list}>
        {STORE_CATEGORIES.map(({ id, label, icon }, index) => {
          const isActive = activeCategoryId === id
          return (
            <li key={id} style={staggerDelay(index)}>
              <a
                href={`/departamentos/${id}`}
                className={styles.category}
                data-active={isActive}
                aria-current={isActive && isCurrentPage ? 'page' : undefined}
              >
                <span className={styles.iconBox}>
                  <Icon name={icon} size={56} strokeWidth={1.25} />
                </span>
                <span className={styles.label}>{label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
