'use client'
import React from 'react'
import Button from '@/components/Button'
import { BlueButton } from '@/components/BlueButton'
import { RedButton } from '@/components/RedButton'
import { GreenButton } from '@/components/GreenButton'
import './blocks.css'

// Mapa de componentes disponibles
const componentsMap: Record<string, React.FC<any>> = {
  Button,
  BlueButton,
  RedButton,
  GreenButton,
  // puedes agregar más componentes si los creas (Card, Input, etc.)
}

export default function ComponentExampleBlock({ block }: { block: any }) {
  const selectedComponent = block.component?.componentFile
  const ComponentToRender = componentsMap[selectedComponent]

  if (!ComponentToRender) {
    return (
      <div className="block-error">
        No se encontró el componente: <b>{selectedComponent}</b>
      </div>
    )
  }

  return (
    <div className="block-component-example">
      <h3>{block.component?.name}</h3>
      {block.component?.description && <p>{block.component.description}</p>}
      <ComponentToRender text={block.text_example || 'Botón de ejemplo'} />
    </div>
  )
}
