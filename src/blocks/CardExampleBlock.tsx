'use client'
import React from 'react'
import './blocks.css'

// IMPORTA LAS CARDS QUE CREE AQUI
// import { PrimaryCard } from '@/components/PrimaryCard'
// import { InfoCard } from '@/components/InfoCard'

// Mapa de componentes SOLO de cards
const cardComponentsMap: Record<string, React.FC<any>> = {
  // PrimaryCard,
  // InfoCard,
  // añade aquí más cards cuando las crees
}

export default function CardExampleBlock({ block }: { block: any }) {
  return (
    <div className="block-component-example">
      <h3>{block.title}</h3>
      {block.text && <p>{block.text}</p>}

      <div className="components-black-container">
        {block.components?.map((comp: any, idx: number) => {
          const key = comp.component?.componentFile
          const ComponentToRender = cardComponentsMap[key]

          if (!ComponentToRender) {
            return <span key={idx}>Card no encontrada ({key || 'sin componentFile'})</span>
          }

          return (
            <ComponentToRender
              key={idx}
              text={comp.text_example || block.text || 'Ejemplo'}
              // pasa aquí las props que necesite tu Card (title, description, etc.)
            />
          )
        })}
      </div>
    </div>
  )
}
