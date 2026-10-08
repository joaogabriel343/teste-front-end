import { useEffect } from 'react'

const DEFAULT_PAGE_TITLE = 'Econverse | Tecnologia com ofertas e frete grátis'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Econverse` : DEFAULT_PAGE_TITLE
  }, [title])
}
