import { ButtonLink } from '../components/Button/Button'
import { CategoryList } from '../components/CategoryList/CategoryList'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { ProductListing } from '../components/ProductListing/ProductListing'
import { DEPARTMENTS, TECHNOLOGY_DEPARTMENT_ID } from '../data/storeContent'
import { NotFoundPage } from './NotFoundPage'
import pageStyles from './Page.module.scss'

interface DepartmentPageProps {
  departmentId: string
}

export function DepartmentPage({ departmentId }: DepartmentPageProps) {
  const department = DEPARTMENTS.find(({ id }) => id === departmentId)

  if (!department) return <NotFoundPage />

  return (
    <>
      <div className={pageStyles.pageTop}>
        <PageHeader title={department.label} breadcrumbs={[{ label: 'Departamentos', href: '/categorias' }]} />
      </div>
      <CategoryList activeCategoryId={department.id} isCurrentPage />
      <div className={pageStyles.page}>
        <ProductListing
          key={department.id}
          selectProducts={(products) =>
            products.filter((product) => department.id === TECHNOLOGY_DEPARTMENT_ID && product.category !== null)
          }
          emptyTitle={`${department.label} chega em breve`}
          emptyDescription="Estamos preparando este departamento. Enquanto isso, confira as ofertas de tecnologia."
          emptyAction={
            <>
              <ButtonLink href={`/departamentos/${TECHNOLOGY_DEPARTMENT_ID}`}>Ver tecnologia</ButtonLink>
              <ButtonLink href="/categorias" variant="secondary">
                Outros departamentos
              </ButtonLink>
            </>
          }
        />
      </div>
    </>
  )
}
