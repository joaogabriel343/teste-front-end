import { PageHeader } from '../components/PageHeader/PageHeader'
import { INFO_PAGES } from '../data/pageContent'
import { NotFoundPage } from './NotFoundPage'
import pageStyles from './Page.module.scss'

interface InfoPageProps {
  pageId: string
}

export function InfoPage({ pageId }: InfoPageProps) {
  const content = Object.hasOwn(INFO_PAGES, pageId) ? INFO_PAGES[pageId] : undefined

  if (!content) return <NotFoundPage />

  return (
    <div className={pageStyles.page}>
      <PageHeader title={content.title} description={content.description} />
      <div className={pageStyles.prose}>
        {content.sections.map(({ heading, paragraphs }) => (
          <section key={heading}>
            <h2>{heading}</h2>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
