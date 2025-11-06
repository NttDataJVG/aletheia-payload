'use client'

import React from 'react'

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
  return (
    <section
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundImage: heroBackgroundImage ? `url(${heroBackgroundImage.url})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
      }}
    >
      <h1>{heroTitle}</h1>
      {heroSubtitle && <p>{heroSubtitle}</p>}
      {heroCtaText && heroCtaLink && (
        <a
          href={heroCtaLink}
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          {heroCtaText}
        </a>
      )}
    </section>
  )
}

export default HeroBlock
