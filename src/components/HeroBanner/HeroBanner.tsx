import heroBanner1440 from '../../assets/images/hero-banner-1440.webp'
import heroBanner1920 from '../../assets/images/hero-banner-1920.webp'
import heroBannerMobile from '../../assets/images/hero-banner-mobile-720.webp'
import styles from './HeroBanner.module.scss'

interface HeroBannerProps {
  ctaHref: string
}

export function HeroBanner({ ctaHref }: HeroBannerProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <picture>
        <source media="(min-width: 768px)" srcSet={`${heroBanner1440} 1440w, ${heroBanner1920} 1920w`} sizes="100vw" />
        <img
          className={styles.image}
          src={heroBannerMobile}
          alt=""
          width={720}
          height={800}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          Venha conhecer nossas promoções
        </h1>
        <p className={styles.subtitle}>
          <strong>50% Off</strong> nos produtos
        </p>
        <a href={ctaHref} className={styles.cta}>
          Ver produto
        </a>
      </div>
    </section>
  )
}
