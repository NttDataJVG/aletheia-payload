'use client'
import React from 'react'
import Image from 'next/image'
import './blocks.css'

type IconExampleBlockProps = {
  block: any
}

export default function IconExampleBlock({ block }: IconExampleBlockProps) {
  const icons = block.icons || []

  return (
    <div className="block-icon-example">
      {/* Título del bloque */}
      {block.title && <h3>{block.title}</h3>}

      {/* Texto opcional (intro del grupo de iconos) */}
      {block.text && <p>{block.text}</p>}

      <div className="icons-container">
        {icons.map((item: any, idx: number) => {
          const iconDoc = item.icon

          if (!iconDoc) return null

          // Si vienes con depth > 0, iconDoc será el objeto completo del upload.
          // Payload suele exponer `url`; si no, ajusta esto a tu config.
          const src =
            typeof iconDoc === 'string'
              ? '' // caso raro si no has populado; aquí podrías construir la URL a mano si quieres
              : iconDoc.url || ''

          if (!src) {
            return (
              <div key={idx} className="icon-card">
                <span>Icono sin URL</span>
              </div>
            )
          }

          return (
            <div key={idx} className="icon-card">
              <div className="icon-image-wrapper">
                <Image src={src} alt={iconDoc.name || 'Icono'} width={40} height={40} />
              </div>

              <div className="icon-text-wrapper">
                {/* Nombre del icono (del doc de la colección icons) */}
                {iconDoc.name && <p className="icon-name">{iconDoc.name}</p>}

                {/* Texto de uso que metiste en el bloque (item.usage) */}
                {item.usage && <p className="icon-usage">{item.usage}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
