import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { prefersReducedMotion } from '../utils/prefersReducedMotion'
import { RouterContext, type NavigateOptions, type RouterLocation } from './routerContext'

function readLocation(): RouterLocation {
  const { pathname, search, hash } = window.location
  return { pathname, search, hash }
}

function updateWithTransition(update: () => void) {
  if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
    update()
    return
  }
  document.startViewTransition(() => flushSync(update))
}

function isSamePageHashLink(anchor: HTMLAnchorElement): boolean {
  return (
    anchor.hash !== '' &&
    anchor.pathname === window.location.pathname &&
    anchor.search === window.location.search
  )
}

function shouldHandleClick(event: MouseEvent, anchor: HTMLAnchorElement): boolean {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    !anchor.target &&
    !anchor.hasAttribute('download') &&
    anchor.origin === window.location.origin &&
    !isSamePageHashLink(anchor)
  )
}

interface RouterProviderProps {
  children: ReactNode
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [location, setLocation] = useState(readLocation)

  const navigate = useCallback((to: string, { replace = false }: NavigateOptions = {}) => {
    const url = new URL(to, window.location.href)
    const isNewPage = url.pathname !== window.location.pathname || url.search !== window.location.search

    function update() {
      if (replace) {
        window.history.replaceState(null, '', url)
      } else {
        window.history.pushState(null, '', url)
      }
      setLocation(readLocation())
    }

    if (isNewPage) {
      updateWithTransition(update)
    } else {
      update()
    }
  }, [])

  useEffect(() => {
    function handlePopState() {
      updateWithTransition(() => setLocation(readLocation()))
    }

    function handleClick(event: MouseEvent) {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null
      if (!anchor || !shouldHandleClick(event, anchor)) return
      event.preventDefault()
      navigate(anchor.href)
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleClick)
    }
  }, [navigate])

  const value = useMemo(() => ({ location, navigate }), [location, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}
