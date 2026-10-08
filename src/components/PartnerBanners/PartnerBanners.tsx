import { PARTNER_BANNERS } from '../../data/storeContent'
import styles from './PartnerBanners.module.scss'

interface PartnerBannersProps {
  label: string
}

export function PartnerBanners({ label }: PartnerBannersProps) {
  return (
    <section className={styles.section} aria-label={label}>
      <ul className={styles.list}>
        {PARTNER_BANNERS.map(({ id, title, description, cta, image }) => (
          <li key={id} className={styles.banner}>
            <img
              className={styles.image}
              srcSet={`${image.small} 640w, ${image.large} 1248w`}
              sizes="(min-width: 768px) 50vw, 100vw"
              src={image.small}
              alt={image.alt}
              width={640}
              height={359}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.content}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.description}>{description}</p>
              <a href={cta.href} className={styles.cta}>
                {cta.label}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
