import { useId, useState, type FormEvent } from 'react'
import { useRouter, useSearchParam } from '../../router/routerContext'
import { Icon } from '../Icon/Icon'
import styles from './SearchForm.module.scss'

const SEARCH_PATH = '/busca'

interface SearchFormProps {
  className?: string
}

export function SearchForm({ className }: SearchFormProps) {
  const inputId = useId()
  const { location, navigate } = useRouter()
  const currentQuery = useSearchParam('q')
  const [draft, setDraft] = useState<{ source: string; value: string } | null>(null)
  const querySource = `${location.pathname}${location.search}`
  const value = draft?.source === querySource ? draft.value : location.pathname === SEARCH_PATH ? currentQuery : ''

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = value.trim()
    navigate(query ? `${SEARCH_PATH}?q=${encodeURIComponent(query)}` : SEARCH_PATH)
    setDraft(null)
  }

  return (
    <form
      className={[styles.searchForm, className].filter(Boolean).join(' ')}
      role="search"
      action={SEARCH_PATH}
      method="get"
      onSubmit={handleSubmit}
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
        value={value}
        onChange={(event) => setDraft({ source: querySource, value: event.target.value })}
      />
      <button type="submit" className={styles.submit} aria-label="Buscar">
        <Icon name="search" size={20} />
      </button>
    </form>
  )
}
