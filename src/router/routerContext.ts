import { createContext, useContext } from 'react'

export interface RouterLocation {
  pathname: string
  search: string
  hash: string
}

export interface NavigateOptions {
  replace?: boolean
}

interface RouterContextValue {
  location: RouterLocation
  navigate: (to: string, options?: NavigateOptions) => void
}

export const RouterContext = createContext<RouterContextValue | null>(null)

export function useRouter(): RouterContextValue {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useRouter precisa estar dentro de RouterProvider')
  return context
}

export function useSearchParam(name: string): string {
  const { location } = useRouter()
  return new URLSearchParams(location.search).get(name) ?? ''
}
