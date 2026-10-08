import { Fragment } from 'react'
import { Layout } from './components/Layout/Layout'
import { AppRoutes } from './router/AppRoutes'
import { useRouter } from './router/routerContext'

export function App() {
  const { location } = useRouter()

  return (
    <Layout>
      <Fragment key={location.pathname}>
        <AppRoutes />
      </Fragment>
    </Layout>
  )
}
