import { ButtonLink } from '../components/Button/Button'
import { Icon } from '../components/Icon/Icon'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { FAQ_ITEMS } from '../data/pageContent'
import pageStyles from './Page.module.scss'
import styles from './FaqPage.module.scss'

export function FaqPage() {
  return (
    <div className={pageStyles.page}>
      <PageHeader title="Perguntas frequentes" description="Respostas rápidas para as dúvidas mais comuns." />
      <div className={styles.list}>
        {FAQ_ITEMS.map(({ question, answer }) => (
          <details key={question} className={styles.item}>
            <summary className={styles.question}>
              {question}
              <Icon name="chevronRight" size={20} strokeWidth={2} className={styles.chevron} />
            </summary>
            <p className={styles.answer}>{answer}</p>
          </details>
        ))}
      </div>
      <div className={`${pageStyles.actions} ${styles.footer}`}>
        <p className={pageStyles.muted}>Não encontrou o que procurava?</p>
        <ButtonLink href="/contato" variant="secondary">
          Fale conosco
        </ButtonLink>
      </div>
    </div>
  )
}
