'use client'
import React from 'react'
// import Button from '@/components/Button'
import { BlueButton } from '@/components/BlueButton'
import { RedButton } from '@/components/RedButton'
import { GreenButton } from '@/components/GreenButton'
import './blocks.css'

// Mapa de componentes disponibles
const componentsMap: Record<string, React.FC<any>> = {
  BlueButton,
  RedButton,
  GreenButton,
  // puedes agregar más componentes si los creas (Card, Input, etc.)
}

export default function ComponentExampleBlock({ block }: { block: any }) {
  return (
    <div className="block-component-example">
      <h3>{block.title}</h3>
      {block.text && <p>{block.text}</p>}

      {/* Contenedor negro solo para los botones */}
      <div className="components-black-container">
        {block.components?.map((comp: any, idx: number) => {
          const ComponentToRender = componentsMap[comp.component.componentFile]
          if (!ComponentToRender) return <span key={idx}>Componente no encontrado</span>

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
