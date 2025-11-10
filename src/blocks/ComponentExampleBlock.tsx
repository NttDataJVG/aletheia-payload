'use client'
import React from 'react'
import Button from '@/components/Button'
import './blocks.css'

const componentsMap: Record<string, React.FC<any>> = {
  Button,
  // Puedes agregar más componentes aquí
}

export default function ComponentExampleBlock({ block }: { block: any }) {
  const selectedComponent = block.component?.componentFile
  const ComponentToRender = componentsMap[selectedComponent]

  if (!ComponentToRender) {
    return <div className="block-error">No se encontró el componente: {selectedComponent}</div>
  }

  return (
    <div className="block-component-example">
      <h3>{block.component?.name}</h3>
      {block.component?.description && <p>{block.component.description}</p>}
      <ComponentToRender text={block.text_example || 'Botón de ejemplo'} />
    </div>
  )
}
