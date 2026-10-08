import { FOOTER_COLUMNS, SOCIAL_LINKS } from '../../data/storeContent'
import { Icon } from '../Icon/Icon'
import { Logo } from '../Logo/Logo'
import styles from './Footer.module.scss'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo className={styles.brandLogo} />
          <p className={styles.about}>
            Tecnologia, casa e estilo em um só lugar, com entrega para todo o Brasil e atendimento de verdade.
          </p>
          <ul className={styles.social}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <li key={href}>
                <a href={href} className={styles.socialLink} aria-label={label} target="_blank" rel="noopener noreferrer">
                  <Icon name={icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {FOOTER_COLUMNS.map(({ title, links }) => (
          <nav key={title} className={styles.column} aria-label={title}>
            <h2 className={styles.columnTitle}>{title}</h2>
            <ul className={styles.links}>
              {links.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={styles.link}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {CURRENT_YEAR} Econverse. Todos os direitos reservados. Preços e condições válidos exclusivamente para compras
          neste site.
        </p>
      </div>
    </footer>
  )
}
