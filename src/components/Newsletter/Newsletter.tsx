import { useId, useState, type FormEvent } from 'react'
import styles from './Newsletter.module.scss'

export function Newsletter() {
  const titleId = useId()
  const nameId = useId()
  const emailId = useId()
  const termsId = useId()
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setSubscribedEmail(String(formData.get('email')))
    event.currentTarget.reset()
  }

  return (
    <section className={styles.newsletter} aria-labelledby={titleId}>
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
            />
            <button type="submit" className={styles.submit}>
              Inscrever
            </button>
          </div>
          <div className={styles.terms}>
            <input id={termsId} className={styles.checkbox} type="checkbox" name="terms" required />
            <label htmlFor={termsId}>Aceito os termos e condições</label>
          </div>
          <p className={styles.feedback} role="status">
            {subscribedEmail && `Inscrição confirmada. As novidades vão chegar em ${subscribedEmail}.`}
          </p>
        </form>
      </div>
    </section>
  )
}
