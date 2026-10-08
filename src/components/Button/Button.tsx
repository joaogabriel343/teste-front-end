import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonStyleProps {
  variant?: ButtonVariant
  fullWidth?: boolean
}

function buildClassName({ variant = 'primary', fullWidth = false }: ButtonStyleProps, className?: string) {
  return [styles.button, styles[variant], fullWidth && styles.fullWidth, className].filter(Boolean).join(' ')
}

type ButtonProps = ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant, fullWidth, className, type = 'button', ...buttonProps }: ButtonProps) {
  return <button type={type} className={buildClassName({ variant, fullWidth }, className)} {...buttonProps} />
}

type ButtonLinkProps = ButtonStyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function ButtonLink({ variant, fullWidth, className, ...anchorProps }: ButtonLinkProps) {
  return <a className={buildClassName({ variant, fullWidth }, className)} {...anchorProps} />
}
