import { useId, useState, type FormEvent } from 'react'
import { useStore } from '../../store/storeContext'
import styles from './Newsletter.module.scss'

export function Newsletter() {
  const { subscribeNewsletter } = useStore()
  const titleId = useId()
  const nameId = useId()
  const emailId = useId()
  const termsId = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [feedback, setFeedback] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!subscribeNewsletter(name, email)) {
      setFeedback(`O e-mail ${email} já está inscrito na newsletter.`)
      return
    }

    setFeedback(`Inscrição confirmada. As novidades vão chegar em ${email}.`)
    setName('')
    setEmail('')
    setHasAcceptedTerms(false)
  }

  return (
    <section id="newsletter" className={styles.newsletter} aria-labelledby={titleId}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id={titleId} className={styles.title}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles.text}>
            Receba ofertas, lançamentos e conteúdos exclusivos direto no seu e-mail.
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <label htmlFor={nameId} className="visually-hidden">
              Nome
            </label>
            <input
              id={nameId}
              className={styles.input}
              type="text"
              name="name"
              placeholder="Digite seu nome"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor={emailId} className="visually-hidden">
              E-mail
            </label>
            <input
              id={emailId}
              className={styles.input}
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit" className={styles.submit}>
              Inscrever
            </button>
          </div>
          <div className={styles.terms}>
            <input
              id={termsId}
              className={styles.checkbox}
              type="checkbox"
              name="terms"
              required
              checked={hasAcceptedTerms}
              onChange={(event) => setHasAcceptedTerms(event.target.checked)}
            />
            <label htmlFor={termsId}>
              Aceito os{' '}
              <a href="/termos" className={styles.termsLink}>
                termos e condições
              </a>
            </label>
          </div>
          <p className={styles.feedback} role="status">
            {feedback}
          </p>
        </form>
      </div>
    </section>
  )
}
