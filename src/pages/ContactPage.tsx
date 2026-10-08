import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button/Button'
import { SelectField } from '../components/Form/SelectField'
import { TextAreaField } from '../components/Form/TextAreaField'
import { TextField } from '../components/Form/TextField'
import { Icon } from '../components/Icon/Icon'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { CONTACT_TOPICS } from '../data/pageContent'
import { useStore } from '../store/storeContext'
import type { ContactMessage, ContactTopicId } from '../types/store'
import { formatDate } from '../utils/formatDate'
import pageStyles from './Page.module.scss'
import styles from './ContactPage.module.scss'

interface ContactPageProps {
  topicId: ContactTopicId
}

export function ContactPage({ topicId }: ContactPageProps) {
  const topic = CONTACT_TOPICS[topicId]
  const { profile, contactMessages, sendContactMessage } = useStore()
  const [lastMessage, setLastMessage] = useState<ContactMessage | null>(null)
  const [formKey, setFormKey] = useState(0)
  const topicMessages = contactMessages.filter((message) => message.topic === topicId)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = sendContactMessage({
      topic: topicId,
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      subject: String(formData.get('subject')),
      message: String(formData.get('message')),
    })
    setLastMessage(message)
    setFormKey((current) => current + 1)
  }

  return (
    <div className={pageStyles.page}>
      <PageHeader title={topic.title} description={topic.description} />
      <div className={pageStyles.twoColumns}>
        <form className={`${pageStyles.panel} ${styles.form}`} onSubmit={handleSubmit}>
          {lastMessage && (
            <p className={pageStyles.successBox} role="status">
              <Icon name="check" size={22} strokeWidth={2.25} />
              Mensagem enviada. Seu protocolo é {lastMessage.protocol}.
            </p>
          )}
          <div key={formKey} className={pageStyles.formGrid}>
            <TextField label="Nome" name="name" autoComplete="name" required defaultValue={profile.name} />
            <TextField
              label="E-mail"
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue={profile.email}
            />
            <SelectField
              className={pageStyles.fullRow}
              label="Assunto"
              name="subject"
              options={topic.subjects.map((subject) => ({ value: subject, label: subject }))}
            />
            <TextAreaField
              className={pageStyles.fullRow}
              label={topic.messageLabel}
              name="message"
              required
              minLength={10}
            />
          </div>
          <div className={pageStyles.actions}>
            <Button type="submit">Enviar mensagem</Button>
          </div>
        </form>
        <aside className={styles.history} aria-labelledby="contact-history">
          <h2 id="contact-history" className={pageStyles.panelTitle}>
            Mensagens enviadas
          </h2>
          {topicMessages.length === 0 ? (
            <p className={pageStyles.muted}>As mensagens que você enviar por aqui vão aparecer nesta lista.</p>
          ) : (
            <ul className={styles.messages}>
              {topicMessages.map((message) => (
                <li key={message.protocol} className={styles.message}>
                  <p className={styles.messageSubject}>{message.subject}</p>
                  <p className={pageStyles.muted}>
                    Protocolo {message.protocol}, {formatDate(message.sentAt)}
                  </p>
                  <p className={styles.messageText}>{message.message}</p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  )
}
