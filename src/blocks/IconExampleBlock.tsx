/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import './blocks.css'

type IconExampleBlockProps = {
  block: any
}

export default function IconExampleBlock({ block }: IconExampleBlockProps) {
  const icons = block.icons || []

  return (
    <div className="block-component-example">
      {block.title && <h3>{block.title}</h3>}
      {block.text && <p>{block.text}</p>}

      {/* Contenedor negro como en ComponentExampleBlock */}
      <div className="components-black-container">
        {icons.map((item: any, idx: number) => {
          const iconDoc = item.icon

          if (!iconDoc) {
            return (
              <span key={idx} className="icon-placeholder">
                Icono no encontrado
              </span>
            )
          }

          const src = iconDoc.url || iconDoc.sizes?.thumbnail?.url

          if (!src) {
            return (
              <span key={idx} className="icon-placeholder">
                Sin imagen
              </span>
            )
          }

          return (
            <img
              key={idx}
              src={src}
              alt={iconDoc.name || `Icono ${idx + 1}`}
              className="icon-inline"
            />
          )
        })}
      </div>
    </div>
  )
}
