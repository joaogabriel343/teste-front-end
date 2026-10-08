import { useId } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './SearchForm.module.scss'

interface SearchFormProps {
  className?: string
}

export function SearchForm({ className }: SearchFormProps) {
  const inputId = useId()

  return (
    <form
      className={[styles.searchForm, className].filter(Boolean).join(' ')}
      role="search"
      action="/busca"
      method="get"
    >
      <label htmlFor={inputId} className="visually-hidden">
        Buscar produtos
      </label>
      <input
        id={inputId}
        className={styles.input}
        type="search"
        name="q"
        placeholder="O que você está buscando?"
        autoComplete="off"
      />
      <button type="submit" className={styles.submit} aria-label="Buscar">
        <Icon name="search" size={20} />
      </button>
    </form>
  )
}
