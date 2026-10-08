import { Icon } from '../components/Icon/Icon'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { DEPARTMENTS, FEATURED_BRANDS } from '../data/storeContent'
import pageStyles from './Page.module.scss'
import styles from './CategoriesPage.module.scss'

const SHORTCUTS = [
  { label: 'Ofertas do dia', href: '/ofertas' },
  { label: 'Lançamentos', href: '/lancamentos' },
  { label: 'Todos os produtos', href: '/produtos' },
  { label: 'Assinatura Econverse+', href: '/assinatura' },
]

export function CategoriesPage() {
  return (
    <div className={pageStyles.page}>
      <PageHeader title="Todas as categorias" description="Escolha um departamento, uma marca ou um atalho." />
      <div className={pageStyles.stack}>
        <section aria-labelledby="departments-title">
          <h2 id="departments-title" className={styles.sectionTitle}>
            Departamentos
          </h2>
          <ul className={styles.departmentGrid}>
            {DEPARTMENTS.map(({ id, label, icon }) => (
              <li key={id}>
                <a href={`/departamentos/${id}`} className={styles.department}>
                  <Icon name={icon} size={32} strokeWidth={1.5} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="brands-title">
          <h2 id="brands-title" className={styles.sectionTitle}>
            Marcas
          </h2>
          <ul className={styles.chips}>
            {FEATURED_BRANDS.map(({ id, label, href }) => (
              <li key={id}>
                <a href={href} className={styles.chip}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="shortcuts-title">
          <h2 id="shortcuts-title" className={styles.sectionTitle}>
            Atalhos
          </h2>
          <ul className={styles.chips}>
            {SHORTCUTS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.chip}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
