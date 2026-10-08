import { useEffect, useRef, type ReactNode } from 'react'
import { useRouter } from '../../router/routerContext'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Newsletter } from '../Newsletter/Newsletter'
import { ProductModal } from '../ProductModal/ProductModal'
import { Toast } from '../Toast/Toast'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { location } = useRouter()
  const mainRef = useRef<HTMLElement>(null)
  const previousPathnameRef = useRef(location.pathname)

  useEffect(() => {
    const hasPathChanged = previousPathnameRef.current !== location.pathname
    previousPathnameRef.current = location.pathname

    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
      return
    }

    if (hasPathChanged) {
      window.scrollTo({ top: 0 })
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [location])

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" ref={mainRef} tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <Newsletter />
      <Footer />
      <ProductModal />
      <Toast />
    </>
  )
}
