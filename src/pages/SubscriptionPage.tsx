import { Button } from '../components/Button/Button'
import { ConfirmButton } from '../components/ConfirmButton/ConfirmButton'
import { Icon } from '../components/Icon/Icon'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { SUBSCRIPTION_PLANS } from '../data/pageContent'
import { useStore } from '../store/storeContext'
import { useUi } from '../store/uiContext'
import { formatDate } from '../utils/formatDate'
import { formatPrice } from '../utils/formatPrice'
import pageStyles from './Page.module.scss'
import styles from './SubscriptionPage.module.scss'

export function SubscriptionPage() {
  const { subscription, subscribePlan, cancelPlan } = useStore()
  const { notify } = useUi()
  const activePlan = SUBSCRIPTION_PLANS.find(({ id }) => id === subscription?.planId)

  return (
    <div className={pageStyles.page}>
      <PageHeader
        title="Assinatura Econverse+"
        description="Frete expresso, ofertas antecipadas e benefícios exclusivos em todas as compras."
      />
      {activePlan && subscription && (
        <div className={`${pageStyles.successBox} ${styles.activeBox}`}>
          <Icon name="check" size={22} strokeWidth={2.25} />
          <div className={styles.activeText}>
            <p>
              Você assina o plano {activePlan.name} desde {formatDate(subscription.startedAt)}.
            </p>
            <ConfirmButton
              label="Cancelar assinatura"
              confirmLabel="Confirmar cancelamento"
              question="Cancelar a assinatura agora?"
              onConfirm={() => {
                cancelPlan()
                notify('Assinatura cancelada.')
              }}
            />
          </div>
        </div>
      )}
      <ul className={styles.plans}>
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isActive = plan.id === activePlan?.id
          return (
            <li key={plan.id} className={styles.plan} data-active={isActive}>
              <h2 className={styles.planName}>{plan.name}</h2>
              <p className={styles.planPrice}>
                {formatPrice(plan.priceInCents)} <span className={styles.period}>{plan.period}</span>
              </p>
              <ul className={styles.benefits}>
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className={styles.benefit}>
                    <Icon name="check" size={18} strokeWidth={2.25} className={styles.benefitIcon} />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button
                fullWidth
                variant={isActive ? 'secondary' : 'primary'}
                disabled={isActive}
                onClick={() => {
                  subscribePlan(plan.id)
                  notify(`Assinatura ${plan.name} ativada.`)
                }}
              >
                {isActive ? 'Plano atual' : activePlan ? 'Trocar para este plano' : 'Assinar agora'}
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
