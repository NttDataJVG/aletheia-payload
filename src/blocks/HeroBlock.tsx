'use client'

import React from 'react'
import './blocks.css'

type HeroBlockProps = {
  heroTitle: string
  heroSubtitle?: string
  heroBackgroundImage?: { url: string }
  heroCtaText?: string
  heroCtaLink?: string
}

const HeroBlock: React.FC<HeroBlockProps> = ({
  heroTitle,
  heroSubtitle,
  heroBackgroundImage,
  heroCtaText,
  heroCtaLink,
}) => {
  const backgroundStyle = heroBackgroundImage
    ? { backgroundImage: `url(${heroBackgroundImage.url})` }
    : {}

  return (
    <section className="hero-block" style={backgroundStyle}>
      <h1>{heroTitle}</h1>
      {heroSubtitle && <p>{heroSubtitle}</p>}
      {heroCtaText && heroCtaLink && (
        <a href={heroCtaLink} className="hero-block__cta">
          {heroCtaText}
        </a>
      )}
    </section>
  )
}

export default HeroBlock
