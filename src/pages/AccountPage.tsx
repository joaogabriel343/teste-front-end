import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button/Button'
import { ConfirmButton } from '../components/ConfirmButton/ConfirmButton'
import { CustomerFields } from '../components/CustomerFields/CustomerFields'
import { Icon } from '../components/Icon/Icon'
import type { IconName } from '../components/Icon/iconPaths'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { SUBSCRIPTION_PLANS } from '../data/pageContent'
import { useStore } from '../store/storeContext'
import { useUi } from '../store/uiContext'
import type { CustomerProfile } from '../types/store'
import { normalizeText } from '../utils/normalizeText'
import pageStyles from './Page.module.scss'
import styles from './AccountPage.module.scss'

interface AccountShortcut {
  icon: IconName
  label: string
  value: string
  href: string
}

export function AccountPage() {
  const { profile, orders, favorites, subscription, newsletterSubscribers, saveProfile, clearAllData } = useStore()
  const { notify } = useUi()
  const [draft, setDraft] = useState<CustomerProfile | null>(null)
  const formValue = draft ?? profile
  const planName = SUBSCRIPTION_PLANS.find(({ id }) => id === subscription?.planId)?.name
  const isNewsletterSubscriber =
    profile.email !== '' &&
    newsletterSubscribers.some((subscriber) => normalizeText(subscriber.email) === normalizeText(profile.email))

  const shortcuts: AccountShortcut[] = [
    {
      icon: 'package',
      label: 'Meus pedidos',
      value: orders.length === 1 ? '1 pedido' : `${orders.length} pedidos`,
      href: '/pedidos',
    },
    {
      icon: 'heart',
      label: 'Favoritos',
      value: favorites.length === 1 ? '1 produto' : `${favorites.length} produtos`,
      href: '/favoritos',
    },
    { icon: 'crown', label: 'Assinatura', value: planName ?? 'Não assinante', href: '/assinatura' },
    {
      icon: 'mail',
      label: 'Newsletter',
      value: isNewsletterSubscriber ? 'Inscrito' : 'Não inscrito',
      href: '#newsletter',
    },
  ]

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    saveProfile(formValue)
    setDraft(null)
    notify('Seus dados foram salvos.')
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader
        title={profile.name ? `Olá, ${profile.name.split(' ')[0]}` : 'Minha conta'}
        description="Seus dados ficam salvos somente neste navegador."
        currentLabel="Minha conta"
      />
      <div className={pageStyles.stack}>
        <ul className={styles.shortcuts}>
          {shortcuts.map(({ icon, label, value, href }) => (
            <li key={label}>
              <a href={href} className={styles.shortcut}>
                <Icon name={icon} size={24} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>{label}</span>
                <span className={styles.shortcutValue}>{value}</span>
              </a>
            </li>
          ))}
        </ul>

        <form className={pageStyles.panel} onSubmit={handleSubmit} aria-labelledby="account-profile">
          <h2 id="account-profile" className={pageStyles.panelTitle}>
            Dados pessoais e endereço
          </h2>
          <div className={styles.formBody}>
            <CustomerFields value={formValue} onChange={setDraft} />
            <div className={pageStyles.actions}>
              <Button type="submit" disabled={draft === null}>
                Salvar dados
              </Button>
              {draft !== null && (
                <Button variant="ghost" onClick={() => setDraft(null)}>
                  Descartar alterações
                </Button>
              )}
            </div>
          </div>
        </form>

        <section className={pageStyles.panel} aria-labelledby="account-privacy">
          <h2 id="account-privacy" className={pageStyles.panelTitle}>
            Privacidade
          </h2>
          <p className={`${pageStyles.muted} ${styles.privacyText}`}>
            Apague carrinho, favoritos, pedidos, cadastro, assinatura e mensagens guardados neste navegador.
          </p>
          <ConfirmButton
            label="Apagar meus dados"
            confirmLabel="Apagar tudo"
            question="Esta ação não pode ser desfeita. Continuar?"
            variant="danger"
            onConfirm={() => {
              clearAllData()
              setDraft(null)
              notify('Todos os dados deste navegador foram apagados.')
            }}
          />
        </section>
      </div>
    </div>
  )
}
