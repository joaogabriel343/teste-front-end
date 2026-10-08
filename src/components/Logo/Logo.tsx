import styles from './Logo.module.scss'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={[styles.logo, className].filter(Boolean).join(' ')}>
      <span className={styles.symbol} aria-hidden="true">
        e
      </span>
      econverse
    </span>
  )
}
