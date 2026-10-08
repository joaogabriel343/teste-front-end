import { useId, useState } from 'react'
import { USER_SHORTCUTS } from '../../data/storeContent'
import { Icon } from '../Icon/Icon'
import { Logo } from '../Logo/Logo'
import { MainNav } from '../MainNav/MainNav'
import { SearchForm } from '../SearchForm/SearchForm'
import { TopBar } from '../TopBar/TopBar'
import styles from './Header.module.scss'

interface HeaderProps {
  cartItemCount: number
}

export function Header({ cartItemCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navId = useId()
  const cartLabel = cartItemCount === 1 ? 'Carrinho, 1 item' : `Carrinho, ${cartItemCount} itens`

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
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} />
        </button>
        <a href="/" className={styles.logoLink} aria-label="Econverse, página inicial">
          <Logo />
        </a>
        <SearchForm className={styles.search} />
        <ul className={styles.shortcuts}>
          {USER_SHORTCUTS.map(({ label, href, icon }) => (
            <li key={href}>
              <a href={href} className={styles.shortcut} aria-label={label} title={label}>
                <Icon name={icon} />
              </a>
            </li>
          ))}
          <li>
            <a href="/carrinho" className={styles.shortcut} aria-label={cartLabel} title="Carrinho">
              <Icon name="cart" />
              {cartItemCount > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </a>
          </li>
        </ul>
      </div>
      <MainNav id={navId} isOpen={isMenuOpen} />
    </header>
  )
}
