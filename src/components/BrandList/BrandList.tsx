import { useId } from 'react'
import { FEATURED_BRANDS } from '../../data/storeContent'
import { SectionTitle } from '../SectionTitle/SectionTitle'
import styles from './BrandList.module.scss'

export function BrandList() {
  const titleId = useId()

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <SectionTitle id={titleId}>Navegue por marcas</SectionTitle>
      <ul className={styles.list}>
        {FEATURED_BRANDS.map(({ label, href }) => (
          <li key={href}>
            <a href={href} className={styles.brand}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
