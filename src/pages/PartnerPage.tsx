import { ButtonLink } from '../components/Button/Button'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { PARTNER_BANNERS } from '../data/storeContent'
import { NotFoundPage } from './NotFoundPage'
import pageStyles from './Page.module.scss'
import styles from './PartnerPage.module.scss'

interface PartnerPageProps {
  partnerId: string
}

export function PartnerPage({ partnerId }: PartnerPageProps) {
  const partner = PARTNER_BANNERS.find(({ id }) => id === partnerId)

  if (!partner) return <NotFoundPage />

  const otherPartners = PARTNER_BANNERS.filter(({ id }) => id !== partner.id)

  return (
    <div className={pageStyles.page}>
      <PageHeader title={partner.name} description={partner.description} breadcrumbs={[{ label: 'Parceiros', href: '/categorias' }]} />
      <div className={styles.layout}>
        <img
          className={styles.image}
          srcSet={`${partner.image.small} 640w, ${partner.image.large} 1248w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={partner.image.small}
          alt={partner.image.alt}
          width={640}
          height={359}
        />
        <div className={pageStyles.prose}>
          {partner.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className={pageStyles.actions}>
            <ButtonLink href="/produtos">Ver produtos</ButtonLink>
            {otherPartners.map(({ id, name }) => (
              <ButtonLink key={id} href={`/parceiros/${id}`} variant="secondary">
                Conhecer {name.toLowerCase()}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
