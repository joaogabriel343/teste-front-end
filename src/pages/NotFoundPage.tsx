import { ButtonLink } from '../components/Button/Button'
import { EmptyState } from '../components/EmptyState/EmptyState'
import { usePageTitle } from '../hooks/usePageTitle'
import pageStyles from './Page.module.scss'

export function NotFoundPage() {
  usePageTitle('Página não encontrada')

  return (
    <div className={`${pageStyles.page} ${pageStyles.notFound}`}>
      <h1 className="visually-hidden">Página não encontrada</h1>
      <EmptyState
        icon="search"
        title="Não encontramos esta página"
        description="O endereço pode ter mudado ou não existir mais. Use a busca ou volte para o início."
        action={
          <>
            <ButtonLink href="/">Voltar para o início</ButtonLink>
            <ButtonLink href="/categorias" variant="secondary">
              Ver categorias
            </ButtonLink>
          </>
        }
      />
    </div>
  )
}
