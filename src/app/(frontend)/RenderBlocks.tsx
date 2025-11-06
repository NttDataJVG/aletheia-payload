'use client'

import React from 'react'
import Button from '@/components/Button'
// import Card from '@/components/Card'
// import Input from '@/components/Input'

const componentsMap: Record<string, React.FC<any>> = {
  Button,
  // Card,
  // Input,
}

export default function RenderBlocks({ content }: { content: any[] }) {
  if (!content) return null

  return (
    <div>
      {content.map((block, index) => {
        if (block.blockType === 'text') {
          return <p key={index}>{block.content}</p>
        }

        if (block.blockType === 'component_example') {
          const selectedComponent = block.component?.componentFile
          const ComponentToRender = componentsMap[selectedComponent]

          if (!ComponentToRender) {
            return (
              <div key={index} style={{ color: 'red' }}>
                ⚠️ No se encontró el componente: {selectedComponent}
              </div>
            )
          }

          return (
            <div
              key={index}
              style={{
                margin: '1rem 0',
                border: '1px solid #ddd',
                padding: '1rem',
                borderRadius: '8px',
              }}
            >
              <h3>{block.component?.name}</h3>
              <p>{block.component?.description}</p>
              <ComponentToRender text={block.text_example || 'Botón de ejemplo'} />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
