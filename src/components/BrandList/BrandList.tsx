import { useId } from 'react'
import { FEATURED_BRANDS } from '../../data/storeContent'
import { Logo } from '../Logo/Logo'
import { SectionTitle } from '../SectionTitle/SectionTitle'
import styles from './BrandList.module.scss'

export function BrandList() {
  const titleId = useId()

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <SectionTitle id={titleId} withLines={false}>
        Navegue por marcas
      </SectionTitle>
      <ul className={styles.list}>
        {FEATURED_BRANDS.map(({ label, href }) => (
          <li key={href}>
            <a href={href} className={styles.brand}>
              <span aria-hidden="true">
                <Logo className={styles.brandLogo} />
              </span>
              <span className="visually-hidden">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
