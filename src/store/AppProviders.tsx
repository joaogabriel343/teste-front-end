import type { ReactNode } from 'react'
import { RouterProvider } from '../router/RouterProvider'
import { CatalogProvider } from './CatalogProvider'
import { StoreProvider } from './StoreProvider'
import { UiProvider } from './UiProvider'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <RouterProvider>
      <StoreProvider>
        <CatalogProvider>
          <UiProvider>{children}</UiProvider>
        </CatalogProvider>
      </StoreProvider>
    </RouterProvider>
  )
}
