'use client'
import React from 'react'
import { BlueButton } from '@/components/Button/BlueButton'
import { RedButton } from '@/components/Button/RedButton'
import { GreenButton } from '@/components/Button/GreenButton'
import './blocks.css'

// Mapa de componentes SOLO de botones
const buttonComponentsMap: Record<string, React.FC<any>> = {
  BlueButton,
  RedButton,
  GreenButton,
  // añade aquí más botones: PrimaryButton, GhostButton, etc.
}

export default function ButtonExampleBlock({ block }: { block: any }) {
  return (
    <div className="block-component-example">
      <h3>{block.title}</h3>
      {block.text && <p>{block.text}</p>}

      <div className="components-black-container">
        {block.components?.map((comp: any, idx: number) => {
          const key = comp.component?.componentFile
          const ComponentToRender = buttonComponentsMap[key]

          if (!ComponentToRender) {
            return <span key={idx}>Botón no encontrado ({key || 'sin componentFile'})</span>
          }

          return (
            <ComponentToRender
              key={idx}
              text={comp.text_example || block.text || 'Ejemplo'}
              color={comp.color}
            />
          )
        })}
      </div>
    </div>
  )
}
