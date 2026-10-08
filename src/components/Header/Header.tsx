import { useId, useState } from 'react'
import { USER_SHORTCUTS } from '../../data/storeContent'
import { useRouter } from '../../router/routerContext'
import { useStore } from '../../store/storeContext'
import { Icon } from '../Icon/Icon'
import { Logo } from '../Logo/Logo'
import { MainNav } from '../MainNav/MainNav'
import { SearchForm } from '../SearchForm/SearchForm'
import { TopBar } from '../TopBar/TopBar'
import styles from './Header.module.scss'

function formatBadge(count: number): string {
  return count > 99 ? '99+' : String(count)
}

function describeCount(label: string, count: number): string {
  if (count === 0) return label
  return count === 1 ? `${label}, 1 item` : `${label}, ${count} itens`
}

export function Header() {
  const { cartItemCount, favorites } = useStore()
  const { location } = useRouter()
  const [menuPathname, setMenuPathname] = useState<string | null>(null)
  const navId = useId()
  const isMenuOpen = menuPathname === location.pathname
  const badgeCounts: Record<string, number> = { '/favoritos': favorites.length }

  return (
    <header className={styles.header}>
      <TopBar />
      <div className={styles.main}>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={isMenuOpen}
          aria-controls={navId}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuPathname(isMenuOpen ? null : location.pathname)}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} />
        </button>
        <a href="/" className={styles.logoLink} aria-label="econverse, página inicial">
          <Logo />
        </a>
        <SearchForm className={styles.search} />
        <ul className={styles.shortcuts}>
          {USER_SHORTCUTS.map(({ label, href, icon }) => {
            const count = badgeCounts[href] ?? 0
            return (
              <li key={href}>
                <a
                  href={href}
                  className={styles.shortcut}
                  aria-label={describeCount(label, count)}
                  aria-current={location.pathname === href ? 'page' : undefined}
                  title={label}
                >
                  <Icon name={icon} size={26} strokeWidth={1.5} />
                  {count > 0 && (
                    <span key={count} className={styles.badge} aria-hidden="true">
                      {formatBadge(count)}
                    </span>
                  )}
                </a>
              </li>
            )
          })}
          <li>
            <a
              href="/carrinho"
              className={styles.shortcut}
              aria-label={describeCount('Carrinho', cartItemCount)}
              aria-current={location.pathname === '/carrinho' ? 'page' : undefined}
              title="Carrinho"
            >
              <Icon name="cart" size={26} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span key={cartItemCount} className={styles.badge} aria-hidden="true">
                  {formatBadge(cartItemCount)}
                </span>
              )}
            </a>
          </li>
        </ul>
      </div>
      <MainNav id={navId} isOpen={isMenuOpen} currentPathname={location.pathname} />
    </header>
  )
}
